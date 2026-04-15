import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import styled from 'styled-components';

import { Checkbox as DeCheckbox, Modal, UIButton } from 'src/UI';

import EstNetworkFee from 'src/components/EstNetworkFee';
import TokenIcon from 'src/components/Token/icon';
import { INTENT_EXPIRED } from 'src/constants/apiErr';
import { TurboRangeOrderStatus } from 'src/constants/consts';
import { Token } from 'src/constants/interface';
import { Type_DAChains } from 'src/da';
import { useGaEvent, UserCancel } from 'src/providers/useWallet';
import { useDexAccount } from 'src/state/dexAccount/hooks';
import {
  useCreateTurboRangeClaimOrder,
  useCreateTurboRangeClaimTryData,
} from 'src/state/dexAccount/opr/useCreateTurboRangeOrder';
import { usePostIntentTry } from 'src/state/intent/intentService';
import { useCheckTryBalance } from 'src/state/swap/balances/hooks';
import {
  useNavigatePositionAndShowHistory,
  useSaveRecentTrades,
  useTurboRangeProduct,
  useTurboRangeProductCommonSenseSymbol,
} from 'src/state/turboRange/hooks';
import { ThemeType } from 'src/theme';
import digit, { isNumber } from 'src/utils/digit';
import { logTurboRange } from 'src/utils/log/swap';
import message from 'src/utils/message';
import { multiply, plus } from 'src/utils/numberUtils';

import Close from 'js/components/Icons/close';
import { useIntl } from 'js/locals';
import { useModals, useShowModal } from 'js/state/application/hooks';
import { ModalKeys } from 'js/state/application/reducer';

import CommonSenseSymbol from '../commonSenseSymbol';

export default function TurboRangeClaimConfirmModal() {
  const { visible, hide, position } = useModals(
    ModalKeys.turboRangeClaimConfirm
  );
  const { hide: hideDetail } = useModals(ModalKeys.turboRangeDetail);
  const intl = useIntl();
  const [selected, setSelected] = useState<'usdc' | 'both'>('usdc');
  const [tryRespMap, setTryRespMap] = useState<any>({});

  const [refreshIndex, setRefreshIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  const createTryData = useCreateTurboRangeClaimTryData();
  const createOrder = useCreateTurboRangeClaimOrder();
  const postIntentTry = usePostIntentTry();
  const [gasToken, setGasToken] = useState<Token | undefined>(undefined);

  const { baseToken, quoteToken } = position || {};

  const showModal = useShowModal();
  const gaEvent = useGaEvent();
  const product = useTurboRangeProduct(position?.poolAddress);
  const commonSenseSymbol = useTurboRangeProductCommonSenseSymbol(
    position?.poolAddress
  );
  const navigatePositionAndShowHistory = useNavigatePositionAndShowHistory();
  const checkTryBalance = useCheckTryBalance();
  const timer = useRef<NodeJS.Timeout | null>(null);
  const { DAs } = useDexAccount();
  const userDA = useMemo(() => {
    return DAs?.[position?.chain as Type_DAChains]?.address ?? '';
  }, [DAs, position?.chain]);

  const doTry = useCallback(
    (gasToken?: Token) => {
      setGasToken(gasToken);
      const tryData = createTryData({
        convert_to_usdc: selected === 'usdc',
        position,
        product,
        gasToken,
      });
      if (timer.current) clearTimeout(timer.current);
      if (!tryData) return Promise.resolve(undefined);
      return postIntentTry(tryData)
        .then((resp) => {
          setTryRespMap((pre: any) => ({
            ...pre,
            [`${selected}_${gasToken?.code ?? ''}`]: resp,
          }));
          logTurboRange({
            event: 'turbo range claim try success',
            poolAddress: position.poolAddress,
            position: position.positionAddress,
            selected,
            gasToken: gasToken?.code,
          });
          timer.current = setTimeout(() => {
            setRefreshIndex(refreshIndex + 1);
          }, 6000);
          return resp;
        })
        .catch((err) => {
          logTurboRange({
            event: 'turbo range claim try failed',
            poolAddress: position.poolAddress,
            position: position.positionAddress,
            error: err,
            selected,
            gasToken: gasToken?.code,
          });
          message.error(intl.common_err);
          timer.current = setTimeout(() => {
            setRefreshIndex(refreshIndex + 1);
          }, 6000);
          return Promise.reject(err);
        });
    },
    [
      position,
      product,
      postIntentTry,
      refreshIndex,
      intl,
      createTryData,
      selected,
    ]
  );

  useEffect(() => {
    doTry(gasToken);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [doTry]);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  const _baseToken = useMemo(
    () =>
      position?.unclaimed_rewards?.find(
        (token: any) =>
          token.code?.toLowerCase() === baseToken.code?.toLowerCase()
      ),
    [position?.unclaimed_rewards, baseToken]
  );

  const _quoteToken = useMemo(
    () =>
      position?.unclaimed_rewards?.find(
        (token: any) =>
          token.code?.toLowerCase() === quoteToken.code?.toLowerCase()
      ),
    [position?.unclaimed_rewards, quoteToken]
  );

  const baseAmount = _baseToken?.amount || 0;
  const quoteAmount = _quoteToken?.amount || 0;

  const estClaims = useMemo(() => {
    if (selected === 'both') {
      return position?.unclaimed_rewards;
    }
    let baseToQuoteAmount = multiply(baseAmount, product?.currentPrice);
    if (isNumber(product?.swapPoolFee)) {
      baseToQuoteAmount = multiply(
        baseToQuoteAmount,
        1 - Number(product?.swapPoolFee)
      );
    }

    const claimQuoteToken = {
      ...quoteToken,
      amount: digit.formatWithDecimals(
        plus(quoteAmount || 0, baseToQuoteAmount),
        quoteToken.decimals
      ),
    };
    return [claimQuoteToken];
  }, [
    product,
    baseAmount,
    quoteToken,
    quoteAmount,
    selected,
    position?.unclaimed_rewards,
  ]);

  const tryResp = useMemo(() => {
    return tryRespMap[`${selected}_${gasToken?.code ?? ''}`];
  }, [tryRespMap, selected, gasToken]);

  const isTrying = !tryResp;

  const saveRecentTrades = useSaveRecentTrades();

  const checkAndClaim = useCallback(() => {
    if (!checkTryBalance(tryResp, doTry)) {
      return;
    }
    setLoading(true);
    gaEvent('create_turbo_range_claim_order', {
      method: 'pending',
      position: position?.positionAddress,
      userDA,
    });

    logTurboRange({
      event: 'turbo range claim pending',
      position: position?.positionAddress,
      userDA,
    });
    const time = Date.now();
    createOrder({
      estClaims,
      position,
      tryResp,
      product,
    })
      .then((res: any) => {
        hide();
        hideDetail();
        navigatePositionAndShowHistory(time);
        saveRecentTrades({
          positionAddress: position?.positionAddress,
          claimTime: time,
        });
        showModal({
          modal: ModalKeys.turboRangeClaimProgress,
          order: {
            ...res.order,
            status: TurboRangeOrderStatus.processing,
            tryResp,
          },
          intent_id: res.intent_id,
        });
        logTurboRange({
          event: 'turbo range claim success',
          position: position?.positionAddress,
          userDA,
          selected,
          gasToken: gasToken?.code,
        });
        gaEvent('create_turbo_range_claim_order', {
          method: 'success',
          position: position?.positionAddress,
          userDA,
          selected,
          gasToken: gasToken?.code,
        });
      })
      .catch((err: any) => {
        const error = err?.error || err;
        logTurboRange({
          event: 'turbo range claim error',
          position: position?.positionAddress,
          err: error,
          userDA,
          selected,
          gasToken: gasToken?.code,
        });
        gaEvent('create_turbo_range_claim_order', {
          method: 'error',
          position: position?.positionAddress,
          error,
          userDA,
        });
        if (error?.code === INTENT_EXPIRED) {
          return;
        }
        if (error?.code && error?.code !== UserCancel) {
          showModal({
            modal: ModalKeys.tips_intent_error,
            errorCode: error?.code,
          });
        }
        if (err?.order) {
          showModal({
            modal: ModalKeys.turboRangeClaimProgress,
            order: {
              ...err.order,
              status: TurboRangeOrderStatus.failed,
              tryResp,
            },
          });
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [
    tryResp,
    selected,
    gasToken,
    createOrder,
    showModal,
    gaEvent,
    position,
    product,
    estClaims,
    hide,
    navigatePositionAndShowHistory,
    hideDetail,
    checkTryBalance,
    doTry,
    userDA,
    saveRecentTrades,
  ]);

  const bothLabel = useMemo(() => {
    if (Number(quoteAmount) > 0) {
      return intl.turboRange.receive_both;
    }
    return intl.turboRange.receive_TSLA.replace('{TSLA}', commonSenseSymbol);
  }, [intl, commonSenseSymbol, quoteAmount]);

  return (
    <Modal title={null} onClose={hide} opened={visible}>
      <StyledModal className="modal-wrapper">
        <div className="modal-title">
          {intl.turboRange.claim_yield}
          <Close onClick={hide} />
        </div>

        <div className="modal-content" id="turboRangeDetail">
          <div className="tokens">
            {position?.unclaimed_rewards.map((token: any) => (
              <div className="token-item">
                <TokenIcon token={token} size={16} hideChainIcon />
                <div className="token-amount">{token.amount}</div>
                <div className="token-symbol">
                  <CommonSenseSymbol
                    poolAddress={position?.poolAddress}
                    token={token}
                  />
                </div>
              </div>
            ))}
          </div>
          {Number(baseAmount) > 0 && (
            <>
              <DeCheckbox
                className="dg-ratio"
                checked={selected === 'usdc'}
                onChange={(v) => setSelected(v ? 'usdc' : 'both')}
                label={intl.turboRange.convert_TSLA_to_USDC_and_receive_USDC_only
                  .replace('{TSLA}', commonSenseSymbol)
                  .replace('{USDC}', quoteToken.symbol)
                  .replace('{USDC}', quoteToken.symbol)}
              />
              <DeCheckbox
                className="dg-ratio"
                checked={selected === 'both'}
                onChange={(v) => setSelected(v ? 'both' : 'usdc')}
                label={bothLabel}
              />
            </>
          )}

          <div className="item-info" style={{ marginTop: 20 }}>
            <div className="item-info-title">{intl.est_receive}</div>
            <div className="item-info-value est-receive">
              {estClaims.map((token: any) => (
                <div key={token.code}>
                  {token.amount}{' '}
                  <CommonSenseSymbol
                    poolAddress={position?.poolAddress}
                    token={token}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="item-info">
            <div className="item-info-title">{intl.est_network_fee}</div>
            <div className="item-info-value">
              <EstNetworkFee tryResp={tryResp} onSelectPayGasToken={doTry} />
            </div>
          </div>

          <UIButton
            eventName="turbo_range_claim_confirm"
            className="claim-btn"
            loading={isTrying || loading}
            onClick={checkAndClaim}
          >
            {intl.Claim}
          </UIButton>
        </div>
      </StyledModal>
    </Modal>
  );
}

const StyledModal = styled.div`
  padding: 0 20px 30px;

  .modal-title {
    margin-bottom: 10px;
    font-size: 18px;
    line-height: 24px;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
    ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
    align-items: center;
    display: flex;
    justify-content: flex-start;
  }

  .tokens {
    background: ${({ theme }) => theme.bg_white_05};
    border-radius: 8px;
    padding: 15px 10px;
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    .token-item {
      display: flex;
      align-items: center;
      gap: 5px;
      ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
      color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
      font-size: 14px;
      line-height: 20px;
    }
  }

  .mantine-Checkbox-root .mantine-Checkbox-body {
    margin-bottom: 5px;
    align-items: flex-start;
    .mantine-Checkbox-inner {
      margin-top: 2px;
      .mantine-Checkbox-input {
        border-radius: 50%;
      }
    }
    .mantine-Checkbox-label {
      font-size: 14px;
    }
  }

  .item-info {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 10px;
    line-height: 20px;
    margin-bottom: 10px;
    .item-info-title {
      font-size: 14px;
      color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_80};
    }
    .item-info-value {
      font-size: 14px;
      color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
      display: flex;
      align-items: center;
      gap: 5px;

      &.est-receive {
        flex-direction: column;
        align-items: flex-end;
      }
    }
  }
  .mantine-Checkbox-body {
    margin-bottom: 5px;
    .mantine-Checkbox-inner {
      .mantine-Checkbox-input {
        border-radius: 50%;
      }
    }
  }
  .claim-btn {
    width: 100%;
    margin-top: 20px;
  }
`;

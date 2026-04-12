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
  useCreateTurboRangeWithdrawOrder,
  useCreateTurboRangeWithdrawTryData,
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

export default function TurboRangeWithdrawConfirmModal() {
  const { visible, hide, position } = useModals(
    ModalKeys.turboRangeWithdrawConfirm
  );
  const { hide: hideDetail } = useModals(ModalKeys.turboRangeDetail);
  const intl = useIntl();
  const [selected, setSelected] = useState<'usdc' | 'both'>('usdc');
  const [tryRespMap, setTryRespMap] = useState<any>({});
  const [refreshIndex, setRefreshIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [gasToken, setGasToken] = useState<Token | undefined>(undefined);
  const { DAs } = useDexAccount();

  const userDA = useMemo(() => {
    return DAs?.[position?.chain as Type_DAChains]?.address ?? '';
  }, [DAs, position?.chain]);

  const createTryData = useCreateTurboRangeWithdrawTryData();
  const createOrder = useCreateTurboRangeWithdrawOrder();
  const postIntentTry = usePostIntentTry();

  const { baseToken, quoteToken, unclaimed_rewards, unclaimedRewardsValue } =
    position || {};

  const showModal = useShowModal();
  const gaEvent = useGaEvent();
  const product = useTurboRangeProduct(position?.poolAddress);
  const commonSenseSymbol = useTurboRangeProductCommonSenseSymbol(
    position?.poolAddress
  );
  const navigatePositionAndShowHistory = useNavigatePositionAndShowHistory();
  const checkTryBalance = useCheckTryBalance();

  const timer = useRef<NodeJS.Timeout | null>(null);

  const doTry = useCallback(
    (gasToken?: Token) => {
      setGasToken(gasToken);
      if (timer.current) clearTimeout(timer.current);
      const tryData = createTryData({
        position,
        convert_to_usdc: selected === 'usdc',
        product,
        gasToken,
      });
      if (!tryData) return Promise.resolve(undefined);
      return postIntentTry(tryData)
        .then((resp) => {
          setTryRespMap((pre: any) => ({
            ...pre,
            [`${selected}_${gasToken?.code ?? ''}`]: resp,
          }));
          logTurboRange({
            event: 'turbo range withdraw try success',
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
            event: 'turbo range withdraw try failed',
            poolAddress: position.poolAddress,
            position: position.positionAddress,
            error: err,
            selected,
            gasToken: gasToken?.code,
          });
          message.error(intl.common_err);
          return Promise.reject(err);
          // timer.current = setTimeout(() => {
          //   setRefreshIndex(refreshIndex + 1);
          // }, 3000);
        });
    },
    [
      createTryData,
      position,
      selected,
      product,
      postIntentTry,
      refreshIndex,
      intl,
    ]
  );

  useEffect(() => {
    doTry(gasToken);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [doTry]);

  const baseAmount = useMemo(() => {
    const rewardBaseToken = unclaimed_rewards?.find(
      (token: any) =>
        token.code?.toLowerCase() === baseToken.code?.toLowerCase()
    );
    return plus(baseToken?.amount, rewardBaseToken?.amount || '0');
  }, [baseToken, unclaimed_rewards]);

  const quoteAmount = useMemo(() => {
    const rewardQuoteToken = unclaimed_rewards?.find(
      (token: any) =>
        token.code?.toLowerCase() === quoteToken.code?.toLowerCase()
    );
    return plus(quoteToken?.amount, rewardQuoteToken?.amount || '0');
  }, [quoteToken, unclaimed_rewards]);

  const estReceive = useMemo(() => {
    if (selected === 'usdc') {
      let amount = quoteAmount;
      let baseToQuoteAmount = multiply(baseAmount, product?.currentPrice);
      if (isNumber(product?.swapPoolFee)) {
        baseToQuoteAmount = multiply(
          baseToQuoteAmount,
          1 - Number(product?.swapPoolFee)
        );
      }
      amount = plus(amount, baseToQuoteAmount);
      return [
        {
          ...quoteToken,
          amount: digit.formatWithDecimals(amount, quoteToken?.decimals),
        },
      ];
    }
    return [
      { ...baseToken, amount: baseAmount },
      { ...quoteToken, amount: quoteAmount },
    ];
  }, [selected, baseToken, quoteToken, baseAmount, quoteAmount, product]);

  const tryResp = useMemo(() => {
    return tryRespMap[`${selected}_${gasToken?.code ?? ''}`];
  }, [tryRespMap, selected, gasToken]);

  const isTrying = !tryResp;
  const saveRecentTrades = useSaveRecentTrades();

  const checkAndWithdraw = useCallback(() => {
    if (!tryResp || !checkTryBalance(tryResp, doTry)) {
      return;
    }
    setLoading(true);
    gaEvent('create_turbo_range_withdraw_order', {
      method: 'pending',
      position: position?.positionAddress,
      userDA,
    });

    logTurboRange({
      event: 'turbo range withdraw pending',
      position: position?.positionAddress,
      userDA,
    });
    const time = Date.now();
    createOrder({
      estReceive,
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
          withdrawTime: time,
        });
        showModal({
          modal: ModalKeys.turboRangeWithdrawProgress,
          order: {
            ...res.order,
            status: TurboRangeOrderStatus.processing,
            tryResp,
          },
          intent_id: res.intent_id,
        });
        logTurboRange({
          event: 'turbo range withdraw success',
          position: position?.positionAddress,
          userDA,
          selected,
          gasToken: gasToken?.code,
        });
        gaEvent('create_turbo_range_withdraw_order', {
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
          event: 'turbo range withdraw error',
          position: position?.positionAddress,
          err: error,
          userDA,
          selected,
          gasToken: gasToken?.code,
        });
        gaEvent('create_turbo_range_withdraw_order', {
          method: 'error',
          position: position?.positionAddress,
          error,
          userDA,
          selected,
          gasToken: gasToken?.code,
        });
        if (error?.code === INTENT_EXPIRED) {
          return;
        }

        if (error?.code && error?.code !== UserCancel) {
          showModal({
            modal: ModalKeys.tips_intent_error,
            errorCode: error?.code,
          });
          return;
        }

        if (err?.order) {
          showModal({
            modal: ModalKeys.turboRangeWithdrawProgress,
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
    userDA,
    doTry,
    tryResp,
    createOrder,
    showModal,
    gaEvent,
    position,
    product,
    selected,
    gasToken,
    estReceive,
    hide,
    hideDetail,
    navigatePositionAndShowHistory,
    checkTryBalance,
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
          {intl.Withdraw}
          <Close onClick={hide} />
        </div>

        <div className="modal-content" id="turboRangeDetail">
          <div className="tokens">
            <div className="token-item">
              <TokenIcon token={baseToken} size={16} hideChainIcon />
              <div className="token-amount">{baseAmount}</div>
              <div className="token-symbol">
                <CommonSenseSymbol poolAddress={position?.poolAddress} />
              </div>
            </div>
            <div className="token-item">
              <TokenIcon token={quoteToken} size={16} hideChainIcon />
              <div className="token-amount">{quoteAmount}</div>
              <div className="token-symbol">{quoteToken.symbol}</div>
            </div>
            {unclaimedRewardsValue > 0 && (
              <div className="unclaimed-rewards-tips">
                {intl.turboRange.incl_unclaimed_yield}
              </div>
            )}
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
              {estReceive.map((token) => (
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
            eventName="turbo_range_withdraw_confirm"
            className="withdraw-btn"
            loading={isTrying || loading}
            onClick={checkAndWithdraw}
          >
            {unclaimedRewardsValue > 0
              ? intl.turboRange.withdraw_and_claim
              : intl.Withdraw}
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
    gap: 15px;
    .token-item {
      display: flex;
      align-items: center;
      gap: 5px;
      ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
      color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
      font-size: 16px;
      line-height: 20px;
    }
    .tips {
      font-size: 12px;
      color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_80};
      line-height: 16px;
    }
    .unclaimed-rewards-tips {
      font-size: 12px;
      color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_80};
      line-height: 16px;
      margin-top: -5px;
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

  .mantine-Checkbox-root .mantine-Checkbox-body {
    margin-bottom: 5px;
    align-items: flex-start;
    .mantine-Checkbox-inner {
      margin-top: 2px;
    }
    .mantine-Checkbox-label {
      font-size: 14px;
    }
  }

  .withdraw-btn {
    width: 100%;
    margin-top: 20px;
  }
`;

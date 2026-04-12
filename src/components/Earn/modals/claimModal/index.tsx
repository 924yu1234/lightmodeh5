import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

import { Modal, PrimaryBtn } from 'src/UI';

import Close from 'src/components/Icons/close';
import { SwapOrderStatus } from 'src/constants/consts';
import { Token } from 'src/constants/interface';
import { useIntl } from 'src/locals';
import { useGaEvent, useIsAppH5, useWalletOprs } from 'src/providers/useWallet';
import { useModals, useShowModal } from 'src/state/application/hooks';
import { ModalKeys } from 'src/state/application/reducer';
import { useCreateTryData } from 'src/state/dexAccount/opr/useCreateEarnOrder';
import { usePostIntentTry } from 'src/state/intent/intentService';
import { useCheckTryBalance } from 'src/state/swap/balances/hooks';
import { ThemeType } from 'src/theme';
import { logEarn } from 'src/utils/log/swap';
import message from 'src/utils/message';

import ClaimView from './claim';

export default function EarnClaimModal() {
  const intl = useIntl();
  const [loading, setLoading] = useState(false);
  const [isTrying, setIsTrying] = useState(false);
  const postIntentTry = usePostIntentTry();
  const { order, hide, visible } = useModals(ModalKeys.EARN_CLAIM_MODAL);
  const [tryResp, setTryResp] = useState({} as any);
  const { callAppPromise } = useWalletOprs();
  const isAppH5 = useIsAppH5();
  const { createEarnOrder } = useWalletOprs();
  const [gasToken, setGasToken] = useState<Token | undefined>(undefined);
  const showModal = useShowModal();
  const createTryData = useCreateTryData();
  const gaEvent = useGaEvent();
  const checkTryBalance = useCheckTryBalance();

  const doTry = useCallback(
    (gasToken?: Token) => {
      setGasToken(gasToken);
      const tryData = createTryData({
        ...order,
        gasToken,
      });
      if (!tryData) return Promise.resolve(undefined);
      setIsTrying(true);
      return postIntentTry({ ...tryData, tryKey: undefined })
        .then((resp) => {
          setIsTrying(false);
          setTryResp(resp);
          logEarn({
            event: 'earn claim order try success',
            id: order?.id ?? '',
          });
          gaEvent('create_earn_claim_order', {
            method: 'earn claim order try success',
            vault: {
              id: order.id,
            },
          });
          return resp;
        })
        .catch((err) => {
          logEarn({
            event: 'earn claim order try error',
            id: order?.id ?? '',
            err,
          });
          gaEvent('create_earn_claim_order', {
            method: 'try error',
            error: err,
            vault: {
              id: order.id,
            },
          });
          message.error(intl.common_err);
          return Promise.reject(err);
        });
    },
    [order, postIntentTry, createTryData, gaEvent, intl]
  );

  useEffect(() => {
    if (visible) {
      doTry(gasToken);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [doTry, visible]);

  const doSign = useCallback(async () => {
    if (!checkTryBalance(tryResp, doTry)) {
      return;
    }
    setLoading(true);
    let promise;
    if (!isAppH5) {
      logEarn({
        event: 'earn claim order pending',
        id: order?.id ?? '',
        tryResp: null,
      });
      promise = createEarnOrder({
        ...order,
        tryResp,
      }).then((res) => {
        gaEvent('create_earn_claim_order', {
          method: 'sign success',
          vault: {
            id: order?.id ?? '',
          },
        });
        logEarn({
          event: 'earn claim order success',
          vault: {
            id: order?.id ?? '',
          },
        });
        return {
          intent_id: res.intent_id,
        };
      });
    }
    if (isAppH5 && callAppPromise) {
      logEarn({
        event: 'app earn claim order pending',
        id: order?.id ?? '',
      });
      promise = callAppPromise('createCompactIntent', tryResp).then((res) => {
        gaEvent('create_earn_claim_order', {
          method: 'app earn claim sign success',
          vault: {
            id: order?.id ?? '',
          },
        });
        const intent_id = res.intent.intent_id;
        logEarn({
          event: 'app earn claim order success',
          id: order?.id ?? '',
        });
        return {
          intent_id,
        };
      });
    }
    if (promise) {
      promise
        .then((res) => {
          hide();
          logEarn({
            event: 'app earn claim order success',
            id: order?.id ?? '',
          });
          showModal({
            modal: ModalKeys.earnOrderProgress,
            order: { ...order, status: SwapOrderStatus.processing },
            intent_id: res.intent_id,
            tryResp,
            vault: order.vault,
          });
        })
        .catch((err) => {
          gaEvent('create_earn_claim_order', {
            method: 'app earn claim sign error',
            error: err?.error || err,
            vault: {
              id: order?.id ?? '',
            },
          });
          logEarn({
            event: 'app earn claim order error',
            id: order?.id ?? '',
            err: err?.error || err,
          });
        })
        .finally(() => {
          hide();
          setLoading(false);
        });
    } else {
      setLoading(false);
      hide();
    }
  }, [
    tryResp,
    callAppPromise,
    order,
    hide,
    isAppH5,
    showModal,
    createEarnOrder,
    gaEvent,
    checkTryBalance,
    doTry,
  ]);

  const closeModal = () => {
    hide();
  };

  return (
    <Modal title={null} onClose={closeModal} opened={!!visible}>
      <StyledOrder>
        <div className="modal-title">
          {intl.claim_rewards}
          <Close onClick={closeModal} />
        </div>
        <ClaimView
          order={order}
          tryResp={tryResp}
          onSelectPayGasToken={doTry}
        />
        <PrimaryBtn onClick={doSign} loading={loading || isTrying}>
          {intl.Confirm}
        </PrimaryBtn>
      </StyledOrder>
    </Modal>
  );
}

const StyledOrder = styled.div`
  width: 100%;
  padding: 0 20px 30px;
  ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
  display: flex;
  flex-direction: column;
  align-items: center;

  .type {
    font-size: 14px;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff_80};
    line-height: 20px;
    margin-bottom: 6px;
  }
  .amount {
    font-size: 18px;
    ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
    line-height: 24px;
    margin-bottom: 3px;
  }

  .protocol {
    font-size: 14px;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_60};
    line-height: 20px;
    margin-bottom: 30px;
  }

  .item {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 15px;
    .label {
      font-size: 14px;
      color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_80};
      line-height: 20px;
    }
    .value {
      font-size: 14px;
      color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
      line-height: 20px;
      &.gas-fee {
        color: ${({ theme }: { theme: ThemeType }) => theme.green};
      }
    }
  }

  .modal-title {
    margin-bottom: 32px;
  }

  .dg-primary {
    margin-top: 30px;
    width: 100%;
  }
`;

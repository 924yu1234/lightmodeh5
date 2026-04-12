import React, { useCallback, useMemo, useState } from 'react';
import styled from 'styled-components';

import { UIButton } from 'src/UI';

import { INTENT_EXPIRED } from 'src/constants/apiErr';
import { IntentOrderStatus } from 'src/constants/consts';
import { useIntl } from 'src/locals';
import { useGaEvent, useIsAppH5, UserCancel } from 'src/providers/useWallet';
import { useModals, useShowModal } from 'src/state/application/hooks';
import { ModalKeys } from 'src/state/application/reducer';
import { useCreateBridgeUsdcOrder } from 'src/state/dexAccount/opr/useCreateBridgeUsdcOrder';
import useCheckRegion from 'src/state/regionCheck/hooks';
import { useCheckTryBalance } from 'src/state/swap/balances/hooks';
import { isNumber } from 'src/utils/digit';
import { logBridgeUsdc } from 'src/utils/log/swap';
import message from 'src/utils/message';

import AccountCheck from '../Empty/AccountCheck';
import { useBridgeUsdcData } from './dataProvider';

export default function Btn() {
  const intl = useIntl();
  const { hide } = useModals(ModalKeys.bridgeUsdc);
  const createBridgeUsdcOrder = useCreateBridgeUsdcOrder();
  const {
    tryResp,
    amount,
    overBalance,
    fromToken,
    toToken,
    isTrying,
    doTry,
    maxAmount,
    setAmount,
  } = useBridgeUsdcData();
  const checkRegion = useCheckRegion();
  const [loading, setLoading] = useState(false);
  const gaEvent = useGaEvent();
  const showModal = useShowModal();
  const checkTryBalance = useCheckTryBalance();
  const isAppH5 = useIsAppH5();
  const checkAndSubmit = useCallback(() => {
    if (!checkRegion()) {
      return;
    }
    if (!fromToken || !toToken) {
      return;
    }
    if (!checkTryBalance(tryResp, doTry)) {
      return;
    }
    setLoading(true);
    gaEvent('create_turbo_range_deposit_order', {
      method: 'pending',
      fromChain: fromToken?.chain,
      toChain: toToken?.chain,
      amount,
    });

    logBridgeUsdc({
      event: 'bridge usdc pending',
      fromChain: fromToken?.chain,
      toChain: toToken?.chain,
      amount,
    });

    createBridgeUsdcOrder({
      fromToken,
      toToken,
      amount,
      tryResp,
    })
      .then((res: any) => {
        setAmount('');
        if (!isAppH5) {
          hide();
        }
        showModal({
          modal: ModalKeys.bridgeUsdcProgress,
          intent_id: res.intent_id,
          order: {
            ...res.order,
            status: IntentOrderStatus.processing,
            tryResp,
          },
        });
        logBridgeUsdc({
          event: 'bridge usdc success',
          fromChain: fromToken?.chain,
          toChain: toToken?.chain,
          amount,
        });
        gaEvent('create_bridge_usdc_order', {
          method: 'success',
          fromChain: fromToken?.chain,
          toChain: toToken?.chain,
          amount,
        });
      })
      .catch((err) => {
        logBridgeUsdc({
          event: 'bridge usdc error',
          fromChain: fromToken?.chain,
          toChain: toToken?.chain,
          amount,
          err: err?.error || err,
        });
        gaEvent('create_bridge_usdc_order', {
          method: 'error',
          fromChain: fromToken?.chain,
          toChain: toToken?.chain,
          amount,
          error: err?.error || err,
        });
        const code = err?.error?.code || err?.code;
        if (code === INTENT_EXPIRED || code === UserCancel) {
          return;
        }
        if (err?.order) {
          showModal({
            modal: ModalKeys.bridgeUsdcProgress,
            order: {
              ...err.order,
              status: IntentOrderStatus.failed,
              tryResp,
            },
          });
        } else {
          message.error(intl.common_err);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [
    hide,
    amount,
    tryResp,
    showModal,
    isAppH5,
    gaEvent,
    checkRegion,
    createBridgeUsdcOrder,
    fromToken,
    toToken,
    checkTryBalance,
    doTry,
    setAmount,
    setLoading,
    intl,
  ]);

  const disabled = useMemo(() => {
    return (
      !isNumber(amount) ||
      Number(amount) <= 0 ||
      overBalance ||
      !!maxAmount ||
      !fromToken?.code ||
      !toToken?.code
    );
  }, [amount, overBalance, maxAmount, fromToken?.code, toToken?.code]);
  return (
    <StyledBtn>
      <AccountCheck source="bridge_usdc">
        <UIButton
          eventName="bridge_usdc_continue"
          className="btn"
          onClick={checkAndSubmit}
          disabled={disabled || !!tryResp?.showTryAmountError}
          loading={loading || isTrying}
        >
          {intl.Continue}
        </UIButton>
      </AccountCheck>
    </StyledBtn>
  );
}

const StyledBtn = styled.div`
  width: 100%;
  margin-top: 20px;
  .dg-empty {
    padding: 0;
  }
  .btn,
  .empty-btn,
  .dg-ghost {
    width: 100%;
  }
`;

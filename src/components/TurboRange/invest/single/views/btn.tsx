import React, { useCallback, useMemo, useState } from 'react';

import { UIButton } from 'src/UI';

import AccountCheck from 'src/components/Empty/AccountCheck';
import { INTENT_EXPIRED } from 'src/constants/apiErr';
import { TurboRangeOrderStatus } from 'src/constants/consts';
import { useIntl } from 'src/locals';
import { useGaEvent, UserCancel } from 'src/providers/useWallet';
import { useShowModal } from 'src/state/application/hooks';
import { ModalKeys } from 'src/state/application/reducer';
import { useShowTurboRangeFeature } from 'src/state/dexAccount/hooks';
import { useCreateTurboRangeDepositOrder } from 'src/state/dexAccount/opr/useCreateTurboRangeOrder';
import useCheckRegion from 'src/state/regionCheck/hooks';
import { useCheckTryBalance } from 'src/state/swap/balances/hooks';
import { useNavigatePositionAndShowHistory } from 'src/state/turboRange/hooks';
import { checkPermission } from 'src/state/turboRange/utils';
import { isNumber } from 'src/utils/digit';
import { logTurboRange } from 'src/utils/log/swap';
import message from 'src/utils/message';

import { useApyContext } from '../../apyProvider';
import { useInvest } from '../dataProvider';

export default function Btn() {
  const intl = useIntl();
  const { product, maxPrice, minPrice } = useApyContext();
  const {
    amount,
    setShowError,
    tryResp,
    setAmount,
    isTrying,
    overBalance,
    overMax,
    overPriceImpact,
    belowMin,
    doTry,
    userDA,
  } = useInvest();
  const createOrder = useCreateTurboRangeDepositOrder();
  const checkRegion = useCheckRegion();
  const showModal = useShowModal();
  const [loading, setLoading] = useState(false);
  const gaEvent = useGaEvent();
  const showTurboRangeFeature = useShowTurboRangeFeature();
  const navigatePositionAndShowHistory = useNavigatePositionAndShowHistory();
  const checkTryBalance = useCheckTryBalance();

  const checkAndInvest = useCallback(() => {
    if (!checkPermission(product, 'DEPOSIT')) {
      message.warning(intl.Coming_soon);
      return;
    }
    if (!isNumber(amount) || Number(amount) <= 0) {
      setShowError(true);
      return;
    }
    if (overBalance) {
      setShowError(true);
      return;
    }
    if (!checkRegion()) {
      return;
    }
    if (!checkTryBalance(tryResp, doTry)) {
      return;
    }
    if (!showTurboRangeFeature) {
      message.error(intl.beta_test_tips);
      return;
    }

    setLoading(true);
    gaEvent('create_turbo_range_deposit_order', {
      method: 'pending',
      poolAddress: product.poolAddress,
      amount,
      userDA,
    });

    logTurboRange({
      event: 'turbo range deposit pending',
      poolAddress: product.poolAddress,
      amount,
      userDA,
    });
    const time = Date.now();
    createOrder({
      product,
      amount,
      maxPrice,
      minPrice,
      tryResp,
    })
      .then((res: any) => {
        window.hasTurboRangeOrder = true;
        navigatePositionAndShowHistory(time);
        showModal({
          modal: ModalKeys.turboRangeDepositProgress,
          order: {
            ...res.order,
            status: TurboRangeOrderStatus.processing,
            tryResp,
          },
          intent_id: res.intent_id,
        });
        setAmount('');
        logTurboRange({
          event: 'turbo range deposit success',
          poolAddress: product.poolAddress,
          amount,
          userDA,
        });
        gaEvent('create_turbo_range_deposit_order', {
          method: 'success',
          poolAddress: product.poolAddress,
          amount,
          userDA,
        });
      })
      .catch((err) => {
        const error = err?.error || err;
        logTurboRange({
          event: 'turbo range deposit error',
          poolAddress: product.poolAddress,
          amount,
          err: error,
          userDA,
        });
        gaEvent('create_turbo_range_deposit_order', {
          method: 'error',
          poolAddress: product.poolAddress,
          amount,
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
            modal: ModalKeys.turboRangeDepositProgress,
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
    doTry,
    navigatePositionAndShowHistory,
    userDA,
    amount,
    setShowError,
    product,
    maxPrice,
    minPrice,
    tryResp,
    createOrder,
    showModal,
    gaEvent,
    checkRegion,
    setAmount,
    intl,
    overBalance,
    showTurboRangeFeature,
    checkTryBalance,
  ]);

  const disabled = useMemo(() => {
    return !isNumber(amount) || Number(amount) <= 0;
  }, [amount]);

  const tipText = useMemo(() => {
    if (overMax) {
      return intl.turboRange.adjust_the_input_to_proceed;
    }
    if (overBalance) {
      return intl.turboRange.not_enough_balance_to_proceed;
    }
    if (overPriceImpact) {
      return intl.turboRange.adjust_the_input_to_proceed;
    }
    if (disabled) {
      return intl.turboRange.enter_amount_to_continue;
    }
    if (belowMin) {
      return intl.turboRange.adjust_the_input_to_proceed;
    }
    return '';
  }, [overMax, overBalance, disabled, intl, overPriceImpact, belowMin]);

  return (
    <AccountCheck source="turbo_range" signToViewTipsType="common">
      <UIButton
        eventName="btn_turbo_range_invest"
        className={`invest-btn ${tipText ? 'btn-with-tips' : ''}`}
        onClick={checkAndInvest}
        disabled={
          disabled ||
          overMax ||
          overBalance ||
          overPriceImpact ||
          belowMin ||
          !tryResp ||
          !!tryResp?.showTryAmountError
        }
        loading={isTrying || loading}
      >
        {tipText || intl.Continue}
      </UIButton>
    </AccountCheck>
  );
}

import React, { useCallback, useMemo, useState } from 'react';

import { UIButton } from 'src/UI';

import AccountCheck from 'src/components/Empty/AccountCheck';
import { INTENT_EXPIRED } from 'src/constants/apiErr';
import { TurboRangeOrderStatus } from 'src/constants/consts';
import { useIntl } from 'src/locals';
import { useGaEvent } from 'src/providers/useWallet';
import { useModals, useShowModal } from 'src/state/application/hooks';
import { ModalKeys } from 'src/state/application/reducer';
import { useShowTurboRangeFeature } from 'src/state/dexAccount/hooks';
import { useCreateTurboRangeIncreaseInvestmentOrder } from 'src/state/dexAccount/opr/useCreateTurboRangeOrder';
import useCheckRegion from 'src/state/regionCheck/hooks';
import { useCheckTryBalance } from 'src/state/swap/balances/hooks';
import {
  useNavigatePositionAndShowHistory,
  useSaveRecentTrades,
} from 'src/state/turboRange/hooks';
import { checkPermission } from 'src/state/turboRange/utils';
import { isNumber } from 'src/utils/digit';
import { logTurboRange } from 'src/utils/log/swap';
import message from 'src/utils/message';

import { useIncrease } from './dataProvider';

export default function Btn() {
  const intl = useIntl();
  const { hide } = useModals(ModalKeys.turboRangeIncreaseInvestment);
  const { hide: hideDetail } = useModals(ModalKeys.turboRangeDetail);

  const {
    amount,
    setShowError,
    product,
    tryResp,
    setAmount,
    isTrying,
    overBalance,
    overMax,
    overPriceImpact,
    belowMin,
    doTry,
    userDA,
    position,
  } = useIncrease();
  const createIncreaseInvestmentOrder =
    useCreateTurboRangeIncreaseInvestmentOrder();
  const checkRegion = useCheckRegion();
  const showModal = useShowModal();
  const [loading, setLoading] = useState(false);
  const gaEvent = useGaEvent();
  const showTurboRangeFeature = useShowTurboRangeFeature();
  const navigatePositionAndShowHistory = useNavigatePositionAndShowHistory();
  const checkTryBalance = useCheckTryBalance();
  const saveRecentTrades = useSaveRecentTrades();

  const checkAndInvest = useCallback(() => {
    if (!checkPermission(product, 'ADD_DEPOSIT')) {
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
    gaEvent('create_turbo_range_increase_investment_order', {
      method: 'pending',
      poolAddress: product.poolAddress,
      position: position?.positionAddress,
      amount,
      userDA,
    });

    logTurboRange({
      event: 'turbo range increase investment pending',
      poolAddress: product.poolAddress,
      position: position?.positionAddress,
      amount,
      userDA,
    });
    const time = Date.now();
    createIncreaseInvestmentOrder({
      product,
      amount,
      tryResp,
    })
      .then((res: any) => {
        hide();
        hideDetail();

        window.hasTurboRangeOrder = true;
        navigatePositionAndShowHistory(time);
        saveRecentTrades({
          positionAddress: position?.positionAddress,
          increaseTime: time,
        });
        showModal({
          modal: ModalKeys.turboRangeIncreaseProgress,
          order: {
            ...res.order,
            status: TurboRangeOrderStatus.processing,
            tryResp,
          },
          intent_id: res.intent_id,
        });
        setAmount('');
        logTurboRange({
          event: 'turbo range increase investment success',
          poolAddress: product.poolAddress,
          amount,
          userDA,
          position: position?.positionAddress,
        });
        gaEvent('create_turbo_range_increase_investment_order', {
          method: 'success',
          poolAddress: product.poolAddress,
          amount,
          userDA,
          position: position?.positionAddress,
        });
      })
      .catch((err) => {
        logTurboRange({
          event: 'turbo range increase investment error',
          poolAddress: product.poolAddress,
          amount,
          err: err?.error || err,
          position: position?.positionAddress,
          userDA,
        });
        gaEvent('create_turbo_range_increase_investment_order', {
          method: 'error',
          poolAddress: product.poolAddress,
          amount,
          error: err?.error || err,
          position: position?.positionAddress,
          userDA,
        });
        if (err?.error?.code === INTENT_EXPIRED) {
          return;
        }
        if (err?.order) {
          showModal({
            modal: ModalKeys.turboRangeIncreaseProgress,
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
    position,
    doTry,
    navigatePositionAndShowHistory,
    userDA,
    amount,
    setShowError,
    product,
    tryResp,
    createIncreaseInvestmentOrder,
    showModal,
    gaEvent,
    checkRegion,
    setAmount,
    intl,
    overBalance,
    showTurboRangeFeature,
    checkTryBalance,
    saveRecentTrades,
    hide,
    hideDetail,
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
        eventName="btn_turbo_range_increase_investment"
        className={`increase-btn ${tipText ? 'btn-with-tips' : ''}`}
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

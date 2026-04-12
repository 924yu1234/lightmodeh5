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
import { useCreateTurboRangeDualIncreaseInvestmentOrder } from 'src/state/dexAccount/opr/useCreateTurboRangeOrder';
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

import { useDualIncrease } from './dataProvider';

export default function Btn() {
  const intl = useIntl();
  const { hide } = useModals(ModalKeys.turboRangeIncreaseInvestment);
  const { hide: hideDetail } = useModals(ModalKeys.turboRangeDetail);

  const {
    quoteAmount,
    baseAmount,
    setShowError,
    product,
    tryResp,
    overQuoteBalance,
    overBaseBalance,
    overMax,
    overPriceImpact,
    belowQuoteMin,
    doTry,
    userDA,
    isTrying,
    position,
    setQuoteAmount,
    setBaseAmount,
  } = useDualIncrease();

  const createOrder = useCreateTurboRangeDualIncreaseInvestmentOrder();
  const checkRegion = useCheckRegion();
  const showModal = useShowModal();
  const [loading, setLoading] = useState(false);
  const gaEvent = useGaEvent();
  const showTurboRangeFeature = useShowTurboRangeFeature();
  const navigatePositionAndShowHistory = useNavigatePositionAndShowHistory();
  const checkTryBalance = useCheckTryBalance();
  const saveRecentTrades = useSaveRecentTrades();

  const checkAndInvest = useCallback(() => {
    if (!checkPermission(product, 'DUAL_ADD_DEPOSIT')) {
      message.warning(intl.Coming_soon);
      return;
    }

    const hasQuoteInput = isNumber(quoteAmount) && Number(quoteAmount) > 0;
    const hasBaseInput = isNumber(baseAmount) && Number(baseAmount) > 0;

    if (!hasQuoteInput && !hasBaseInput) {
      setShowError(true);
      return;
    }

    if (overQuoteBalance || overBaseBalance) {
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
    gaEvent('create_turbo_range_dual_increase_investment_order', {
      method: 'pending',
      poolAddress: product.poolAddress,
      position: position?.positionAddress,
      quoteAmount: hasQuoteInput ? quoteAmount : '0',
      baseAmount: hasBaseInput ? baseAmount : '0',
      userDA,
    });

    logTurboRange({
      event: 'turbo range dual increase investment pending',
      poolAddress: product.poolAddress,
      position: position?.positionAddress,
      quoteAmount,
      baseAmount,
      userDA,
    });

    const time = Date.now();
    createOrder({
      product,
      quoteAmount,
      baseAmount,
      tryResp,
    })
      .then((res: any) => {
        hide();
        hideDetail();
        setQuoteAmount('');
        setBaseAmount('');
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

        logTurboRange({
          event: 'turbo range dual increase investment success',
          poolAddress: product.poolAddress,
          position: position?.positionAddress,
          quoteAmount,
          baseAmount,
          userDA,
        });
        gaEvent('create_turbo_range_dual_increase_investment_order', {
          method: 'success',
          poolAddress: product.poolAddress,
          position: position?.positionAddress,
          quoteAmount,
          baseAmount,
          userDA,
        });
      })
      .catch((err) => {
        logTurboRange({
          event: 'turbo range dual increase investment error',
          poolAddress: product.poolAddress,
          position: position?.positionAddress,
          quoteAmount,
          baseAmount,
          err: err?.error || err,
          userDA,
        });
        gaEvent('create_turbo_range_dual_increase_investment_order', {
          method: 'error',
          poolAddress: product.poolAddress,
          position: position?.positionAddress,
          quoteAmount,
          baseAmount,
          error: err?.error || err,
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
    setQuoteAmount,
    setBaseAmount,
    position,
    quoteAmount,
    baseAmount,
    setShowError,
    product,
    tryResp,
    createOrder,
    showModal,
    gaEvent,
    checkRegion,
    intl,
    overQuoteBalance,
    overBaseBalance,
    showTurboRangeFeature,
    checkTryBalance,
    doTry,
    userDA,
    hide,
    hideDetail,
    navigatePositionAndShowHistory,
    saveRecentTrades,
  ]);

  const disabled = useMemo(() => {
    const hasQuoteInput = isNumber(quoteAmount) && Number(quoteAmount) > 0;
    const hasBaseInput = isNumber(baseAmount) && Number(baseAmount) > 0;
    return !hasQuoteInput && !hasBaseInput;
  }, [quoteAmount, baseAmount]);

  const tipText = useMemo(() => {
    if (overMax) {
      return intl.turboRange.adjust_the_input_to_proceed;
    }
    if (overQuoteBalance) {
      return intl.turboRange.not_enough_balance_to_proceed;
    }
    if (overBaseBalance) {
      return (
        intl.turboRange?.not_enough_tokenA_balance ||
        `Insufficient ${product.baseToken?.symbol} balance`
      );
    }
    if (overPriceImpact) {
      return intl.turboRange.adjust_the_input_to_proceed;
    }
    if (disabled) {
      return (
        intl.turboRange?.enter_dual_amount_to_continue ||
        'Enter both amounts to continue'
      );
    }
    if (belowQuoteMin) {
      return intl.turboRange.adjust_the_input_to_proceed;
    }
    return '';
  }, [
    overMax,
    overQuoteBalance,
    overBaseBalance,
    disabled,
    intl,
    overPriceImpact,
    belowQuoteMin,
    product.baseToken?.symbol,
  ]);

  return (
    <AccountCheck source="turbo_range" signToViewTipsType="common">
      <UIButton
        eventName="btn_turbo_range_dual_increase_investment"
        className={`increase-btn ${tipText ? 'btn-with-tips' : ''}`}
        onClick={checkAndInvest}
        disabled={
          disabled ||
          overMax ||
          overQuoteBalance ||
          overBaseBalance ||
          overPriceImpact ||
          belowQuoteMin ||
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

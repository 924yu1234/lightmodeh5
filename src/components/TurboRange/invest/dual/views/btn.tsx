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
import { useCreateTurboRangeDualDepositOrder } from 'src/state/dexAccount/opr/useCreateTurboRangeOrder';
import useCheckRegion from 'src/state/regionCheck/hooks';
import { useCheckTryBalance } from 'src/state/swap/balances/hooks';
import { useNavigatePositionAndShowHistory } from 'src/state/turboRange/hooks';
import { checkPermission } from 'src/state/turboRange/utils';
import { isNumber } from 'src/utils/digit';
import { logTurboRange } from 'src/utils/log/swap';
import message from 'src/utils/message';

import { useApyContext } from '../../apyProvider';
import { useDualInvest } from '../dataProvider';

export default function Btn() {
  const intl = useIntl();
  const { product, minPrice, maxPrice } = useApyContext();
  const {
    quoteAmount,
    baseAmount,
    setShowError,
    tryResp,
    overQuoteBalance,
    overBaseBalance,
    overMax,
    overPriceImpact,
    belowQuoteMin,
    doTry,
    userDA,
    isTrying,
    setBaseAmount,
    setQuoteAmount,
  } = useDualInvest();

  const createOrder = useCreateTurboRangeDualDepositOrder();
  const checkRegion = useCheckRegion();
  const showModal = useShowModal();
  const [loading, setLoading] = useState(false);
  const gaEvent = useGaEvent();
  const showTurboRangeFeature = useShowTurboRangeFeature();
  const navigatePositionAndShowHistory = useNavigatePositionAndShowHistory();
  const checkTryBalance = useCheckTryBalance();

  const checkAndInvest = useCallback(() => {
    if (!checkPermission(product, 'DUAL_DEPOSIT')) {
      message.warning(intl.Coming_soon);
      return;
    }

    const hasQuoteInput = isNumber(quoteAmount) && Number(quoteAmount) > 0;
    const hasBaseInput = isNumber(baseAmount) && Number(baseAmount) > 0;

    if (!hasQuoteInput && !hasBaseInput) {
      setShowError(true);
      return;
    }
    if (overQuoteBalance || overBaseBalance || belowQuoteMin) {
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
    gaEvent('create_turbo_range_dual_deposit_order', {
      method: 'pending',
      poolAddress: product.poolAddress,
      quoteAmount,
      baseAmount,
      userDA,
    });

    logTurboRange({
      event: 'turbo range dual deposit pending',
      poolAddress: product.poolAddress,
      quoteAmount,
      baseAmount,
      userDA,
    });

    const time = Date.now();
    createOrder({
      product,
      quoteAmount: hasQuoteInput ? quoteAmount : '0',
      baseAmount: hasBaseInput ? baseAmount : '0',
      maxPrice,
      minPrice,
      tryResp,
    })
      .then((res: any) => {
        window.hasTurboRangeOrder = true;
        navigatePositionAndShowHistory(time);
        setBaseAmount('');
        setQuoteAmount('');
        showModal({
          modal: ModalKeys.turboRangeDepositProgress,
          order: {
            ...res.order,
            status: TurboRangeOrderStatus.processing,
            tryResp,
          },
          intent_id: res.intent_id,
        });

        logTurboRange({
          event: 'turbo range dual deposit success',
          poolAddress: product.poolAddress,
          quoteAmount,
          baseAmount,
          userDA,
        });
        gaEvent('create_turbo_range_dual_deposit_order', {
          method: 'success',
          poolAddress: product.poolAddress,
          quoteAmount,
          baseAmount,
          userDA,
        });
      })
      .catch((err) => {
        const error = err?.error || err;
        logTurboRange({
          event: 'turbo range dual deposit error',
          poolAddress: product.poolAddress,
          quoteAmount,
          baseAmount,
          err: error,
          userDA,
        });
        gaEvent('create_turbo_range_dual_deposit_order', {
          method: 'error',
          poolAddress: product.poolAddress,
          quoteAmount,
          baseAmount,
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
    quoteAmount,
    baseAmount,
    setShowError,
    product,
    maxPrice,
    minPrice,
    tryResp,
    createOrder,
    showModal,
    gaEvent,
    checkRegion,
    intl,
    overQuoteBalance,
    overBaseBalance,
    belowQuoteMin,
    showTurboRangeFeature,
    checkTryBalance,
    setBaseAmount,
    setQuoteAmount,
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
      return intl.insufficient_balance;
    }
    if (overPriceImpact) {
      return intl.turboRange.adjust_the_input_to_proceed;
    }
    if (disabled) {
      return intl.turboRange.enter_amount_to_continue;
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
  ]);

  return (
    <AccountCheck source="turbo_range" signToViewTipsType="common">
      <UIButton
        eventName="btn_turbo_range_dual_invest"
        className={`invest-btn ${tipText ? 'btn-with-tips' : ''}`}
        onClick={checkAndInvest}
        disabled={
          disabled ||
          (!isNumber(quoteAmount) && !isNumber(baseAmount)) ||
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

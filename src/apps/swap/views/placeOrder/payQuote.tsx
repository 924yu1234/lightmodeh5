import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useDebounce } from 'ahooks';

import { Popover } from 'src/UI';

import Close from 'src/components/Icons/close';
import IconWrapper from 'src/components/Icons/IconWrapper';
import SelectUsdc from 'src/components/SelectUsdc';
import { QuoteBalance } from 'src/components/SwapPair/quoteBalance';
import { useCheckSwapOrder } from 'src/state/dexAccount/opr/useCheckSwapOrder';
import { useSelectUsdc, useSwapTradeInfo } from 'src/state/swap/trade/hooks';
import useSwapTradeTypeInput from 'src/state/swap/trade/useTypeInput';
import { isNumber } from 'src/utils/digit';

import Input from 'js/components/Input';
import { SWAP_SELL_AMOUNT_DECIMAL } from 'js/constants/dex';
import { useIntl } from 'js/locals';
import { isEqual, maxEffectiveNumber } from 'js/utils/numberUtils';

import { StyledDropdown, StyledSwapInputs } from './swapPayStyled';

export default function SwapPayQuote() {
  const intl = useIntl();
  const { quoteAmount, usdcToken } = useSwapTradeInfo();
  const selectUsdc = useSelectUsdc();
  const { handleBlurQuoteAmount, handleTypeQuoteAmount } =
    useSwapTradeTypeInput();
  const [showCorrectedValue, setShowCorrectedValue] = useState('');
  const [showCorrectedTips, setShowCorrectedTips] = useState('');
  const [isFocus, setIsFocus] = useState(false);

  const amountDigitOptions = useMemo(() => {
    return { ceil: true, maxDecimals: usdcToken?.decimals };
  }, [usdcToken?.decimals]);

  const { quoteBalanceErr, maxTips } = useCheckSwapOrder();

  const quoteErrorTooltips = useMemo(() => {
    if (quoteBalanceErr) {
      return intl.insufficient_balance;
    }
    if (maxTips) {
      return maxTips;
    }
    return '';
  }, [intl, quoteBalanceErr, maxTips]);

  const throttleShowTips = useDebounce(!!showCorrectedValue, {
    wait: 200,
  });
  const showAmountError = isFocus && !!quoteErrorTooltips;
  const showTipsTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const focus = useCallback(() => {
    setIsFocus(true);
  }, []);

  const blur = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocus(false);
      const _value = e.target.value;
      if (!isNumber(_value)) {
        e.target.value = '';
        if (handleBlurQuoteAmount) handleBlurQuoteAmount(e);
      }
      const formatValue = maxEffectiveNumber(
        _value,
        SWAP_SELL_AMOUNT_DECIMAL,
        amountDigitOptions
      );
      if (showTipsTimerRef.current) clearTimeout(showTipsTimerRef.current);
      if (!isEqual(formatValue, _value) && !quoteErrorTooltips) {
        setShowCorrectedValue(formatValue);
        setShowCorrectedTips('corrected');
        showTipsTimerRef.current = setTimeout(() => {
          setShowCorrectedTips('');
        }, 3000);
      }
      const formatValueForStep = maxEffectiveNumber(
        formatValue,
        SWAP_SELL_AMOUNT_DECIMAL,
        {
          ...amountDigitOptions,
        }
      );
      e.target.value = formatValueForStep;
      if (handleBlurQuoteAmount) handleBlurQuoteAmount(e);
      if (!isEqual(formatValueForStep, formatValue) && !quoteErrorTooltips) {
        setShowCorrectedValue(formatValueForStep || '');
        setShowCorrectedTips('corrected_minStep');
        showTipsTimerRef.current = setTimeout(() => {
          setShowCorrectedValue('');
          setShowCorrectedTips('');
        }, 3000);
      }
    },
    [handleBlurQuoteAmount, amountDigitOptions, quoteErrorTooltips]
  );

  useEffect(() => {
    if (showCorrectedValue) {
      const formatValue = maxEffectiveNumber(
        quoteAmount,
        SWAP_SELL_AMOUNT_DECIMAL,
        {
          ...amountDigitOptions,
        }
      );
      if (formatValue !== showCorrectedValue) {
        setShowCorrectedValue('');
        setShowCorrectedTips('');
      }
    }
  }, [quoteAmount, amountDigitOptions, showCorrectedValue]);

  return (
    <StyledSwapInputs className="swap-input">
      <Popover
        opened={throttleShowTips || showAmountError}
        position="top-end"
        offset={2}
      >
        <Popover.Target>
          <div
            className={`swap-input-inner ${isFocus ? 'focus' : ''} ${
              quoteErrorTooltips ? 'err-border' : ''
            }`}
          >
            <div className="pay-title">{intl.pay}</div>
            <div className="pay-content">
              <div className="pay-vol">
                <div className="input-outer">
                  <Input
                    className="amount-input"
                    pattern="^[0-9]*[.,]?[0-9]*$"
                    placeholder="0"
                    suffix={
                      <SelectUsdc usdc={usdcToken} selectUsdc={selectUsdc} />
                    }
                    value={quoteAmount}
                    onChange={handleTypeQuoteAmount}
                    onFocus={focus}
                    onBlur={blur}
                  />
                </div>
              </div>
            </div>
            <div className="pay-footer">
              <div className="balance">
                <QuoteBalance />
              </div>
            </div>
          </div>
        </Popover.Target>
        {showCorrectedTips && (
          <StyledDropdown>
            {intl.input_auto_corrected_tooltips}
            <IconWrapper
              size={38}
              onClick={() => {
                setShowCorrectedValue('');
              }}
            >
              <Close />
            </IconWrapper>
          </StyledDropdown>
        )}
        {showAmountError && (
          <Popover.Dropdown>{quoteErrorTooltips}</Popover.Dropdown>
        )}
      </Popover>
    </StyledSwapInputs>
  );
}

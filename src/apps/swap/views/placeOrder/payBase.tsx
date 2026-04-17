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
import BaseBalance from 'src/components/SwapPair/baseBalance';
import TokenIcon from 'src/components/Token/icon';
import { useCheckSwapOrder } from 'src/state/dexAccount/opr/useCheckSwapOrder';
import { useCurrentSwapPair } from 'src/state/swap/pair/hooks';
import { useSwapTokenInfo } from 'src/state/swap/tokenInfo/hooks';
import { useSwapTradeInfo } from 'src/state/swap/trade/hooks';
import useSwapTradeTypeInput from 'src/state/swap/trade/useTypeInput';
import digit, { isNumber } from 'src/utils/digit';
import { formatTokenSymbol } from 'src/utils/format';

import Input from 'js/components/Input';
import { SWAP_SELL_AMOUNT_DECIMAL } from 'js/constants/dex';
import { useIntl } from 'js/locals';
import { isEqual, maxEffectiveNumber, multiply } from 'js/utils/numberUtils';

import { StyledToken } from '../../style';
import { StyledDropdown, StyledSwapInputs } from './swapPayStyled';

export default function SwapPayBase() {
  const intl = useIntl();
  const { baseToken } = useCurrentSwapPair();
  const { baseAmount, quoteAmount } = useSwapTradeInfo();
  const { price } = useSwapTokenInfo(baseToken?.id);

  const { handleBlurBaseAmount, handleTypeBaseAmount } =
    useSwapTradeTypeInput();
  const [showCorrectedValue, setShowCorrectedValue] = useState('');
  const [showCorrectedTips, setShowCorrectedTips] = useState('');
  const [isFocus, setIsFocus] = useState(false);

  const amountDigitOptions = useMemo(() => {
    return { ceil: true, maxDecimals: baseToken.decimals };
  }, [baseToken.decimals]);

  const { baseBalanceErr, solTips, btcTips } = useCheckSwapOrder();

  const baseErrorTooltips = useMemo(() => {
    if (solTips) {
      return solTips;
    }
    if (btcTips) {
      return btcTips;
    }
    if (baseBalanceErr) {
      return intl.insufficient_balance;
    }
    return '';
  }, [intl, baseBalanceErr, solTips, btcTips]);

  const baseValue = useMemo(() => {
    if (!price || !baseAmount || !quoteAmount) return '';
    return `$${digit.format(multiply(price, baseAmount), '0,0.##')}`;
  }, [price, baseAmount, quoteAmount]);

  const throttleShowTips = useDebounce(!!showCorrectedValue, {
    wait: 200,
  });
  const showAmountError = isFocus && !!baseErrorTooltips;
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
        if (handleBlurBaseAmount) handleBlurBaseAmount(e);
      }
      const formatValue = maxEffectiveNumber(
        _value,
        SWAP_SELL_AMOUNT_DECIMAL,
        amountDigitOptions
      );
      if (showTipsTimerRef.current) clearTimeout(showTipsTimerRef.current);
      if (!isEqual(formatValue, _value) && !baseErrorTooltips) {
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
      if (handleBlurBaseAmount) handleBlurBaseAmount(e);
      if (!isEqual(formatValueForStep, formatValue) && !baseErrorTooltips) {
        setShowCorrectedValue(formatValueForStep || '');
        setShowCorrectedTips('corrected_minStep');
        showTipsTimerRef.current = setTimeout(() => {
          setShowCorrectedValue('');
          setShowCorrectedTips('');
        }, 3000);
      }
    },
    [handleBlurBaseAmount, amountDigitOptions, baseErrorTooltips]
  );

  useEffect(() => {
    if (showCorrectedValue) {
      const formatValue = maxEffectiveNumber(
        baseAmount,
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
  }, [baseAmount, amountDigitOptions, showCorrectedValue]);

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
              baseErrorTooltips ? 'err-border' : ''
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
                      <StyledToken>
                        <TokenIcon token={baseToken} size={20} />
                        {formatTokenSymbol(baseToken?.symbol ?? '')}
                      </StyledToken>
                    }
                    value={baseAmount}
                    onChange={handleTypeBaseAmount}
                    onFocus={focus}
                    onBlur={blur}
                  />
                </div>
              </div>
            </div>
            <div className="pay-footer">
              <div className="base_value">{baseValue}</div>
              <div className="balance">
                <BaseBalance />
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
          <Popover.Dropdown>{baseErrorTooltips}</Popover.Dropdown>
        )}
      </Popover>
    </StyledSwapInputs>
  );
}

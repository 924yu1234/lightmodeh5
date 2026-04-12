import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useDebounce } from 'ahooks';
import styled from 'styled-components';

import { Popover } from 'src/UI';

import BaseBalance from 'src/components/SwapPair/baseBalance';
import TokenIcon from 'src/components/Token/icon';
import useMessage from 'src/providers/useMessage';
import { useCheckSwapOrder } from 'src/state/dexAccount/opr/useCheckSwapOrder';
import { useCurrentSwapPair } from 'src/state/swap/pair/hooks';
import { useSwapTokenInfo } from 'src/state/swap/tokenInfo/hooks';
import { useSwapTradeInfo } from 'src/state/swap/trade/hooks';
import useSwapTradeTypeInput from 'src/state/swap/trade/useTypeInput';
import { ThemeType } from 'src/theme';
import digit, { isNumber } from 'src/utils/digit';
import { formatTokenSymbol } from 'src/utils/format';

import Input from 'js/components/Input';
import { SWAP_SELL_AMOUNT_DECIMAL } from 'js/constants/dex';
import { useIntl } from 'js/locals';
import { isEqual, maxEffectiveNumber, multiply } from 'js/utils/numberUtils';

import { StyledToken } from '../style';

export default function SwapPayBase() {
  const intl = useIntl();
  const { baseToken } = useCurrentSwapPair();
  const { baseAmount, quoteAmount } = useSwapTradeInfo();
  const { handleBlurBaseAmount, handleTypeBaseAmount } =
    useSwapTradeTypeInput();
  const [showCorrectedValue, setShowCorrectedValue] = useState('');
  const [showCorrectedTips, setShowCorrectedTips] = useState('');
  const [isFocus, setIsFocus] = useState(false);
  const message = useMessage();
  const { price } = useSwapTokenInfo(baseToken?.id);

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
      }
    },
    [handleBlurBaseAmount, amountDigitOptions, baseErrorTooltips]
  );

  const throttleShowTips = useDebounce(showCorrectedValue, {
    wait: 200,
  });

  useEffect(() => {
    if (showCorrectedValue && showCorrectedValue === throttleShowTips) {
      const formatValue = maxEffectiveNumber(
        baseAmount,
        SWAP_SELL_AMOUNT_DECIMAL,
        {
          ...amountDigitOptions,
        }
      );
      if (formatValue === showCorrectedValue) {
        message.warning(intl.input_auto_corrected_tooltips);
        setShowCorrectedValue('');
      }
    }
  }, [
    intl,
    baseAmount,
    amountDigitOptions,
    throttleShowTips,
    showCorrectedValue,
    showCorrectedTips,
    message,
  ]);

  return (
    <StyledSwapInputs className="swap-input">
      <Popover opened={showAmountError} position="top-end" offset={2}>
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
                    inputMode="decimal"
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
        {showAmountError && (
          <Popover.Dropdown>{baseErrorTooltips}</Popover.Dropdown>
        )}
      </Popover>
    </StyledSwapInputs>
  );
}

export const StyledSwapInputs = styled.div`
  margin-top: 15px;
  margin-bottom: 10px;
  min-height: 88px;
  .swap-input-inner {
    background: ${({ theme }) => theme.bg_white_10};
    border-radius: 5px;
    border: 1px solid ${({ theme }) => theme.border_transparent};
    min-height: 85px;
    padding: 8px 12px;
    @media (hover: hover) {
      &:hover {
        border-color: ${(props) => props.theme.inputHoverBorder};
      }
    }
    &.focus {
      border-color: ${({ theme }: { theme: ThemeType }) =>
        theme.inputFocusBorder};
    }
    &.err-border {
      border-color: ${({ theme }: { theme: ThemeType }) => theme.red};
    }
  }
  ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
  .pay-title {
    font-size: 13px;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_60};
    line-height: 18px;
  }
  .pay-content {
    display: flex;
    align-items: center;
    margin-bottom: 8px;
    line-height: 36px;
    .pay-vol {
      font-size: 18px;
      color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_50};
      width: 100%;
      .rc-input-affix-wrapper {
        height: 28px;
        background: ${({ theme }) => theme.bg_transparent};
        padding: 0;
        &:hover {
          border-color: ${({ theme }) => theme.border_transparent};
          &.err-border {
            border-color: ${({ theme }) => theme.border_transparent};
          }
          &.rc-input-affix-wrapper-focused,
          &.rc-input-affix-wrapper:focus {
            border-color: ${({ theme }) => theme.border_transparent};
            &.err-border {
              border-color: ${({ theme }) => theme.border_transparent};
            }
          }
        }
        .rc-input {
          font-size: 18px;
        }
        .rc-input-suffix {
          font-size: 18px;
          color: ${({ theme }: { theme: ThemeType }) => theme.t_f4f};
        }
        &.rc-input-affix-wrapper-focused,
        &.rc-input-affix-wrapper:focus {
          border-color: ${({ theme }) => theme.border_transparent};
          &.err-border {
            border-color: ${({ theme }) => theme.border_transparent};
          }
        }
      }
    }
    .pay-symbol {
      margin-left: 4px;
      font-size: 18px;
      color: ${({ theme }: { theme: ThemeType }) => theme.t_f4f};
    }
  }
  .pay-footer {
    display: flex;
    align-items: center;
    font-size: 13px;
    line-height: 20px;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_60};
    .balance {
      margin-left: auto;
      display: flex;
      align-items: center;
      .balance-num {
        margin: 0 4px;
      }
      .loader {
        margin: 0 4px;
      }
    }
  }
`;

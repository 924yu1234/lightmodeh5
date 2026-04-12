import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import styled from 'styled-components';

import { HoverCard, Input, SegmentedControl } from 'src/UI';

import { useIntl } from 'src/locals';
import { useSwapTradeInfo, useSwapTypeInput } from 'src/state/swap/trade/hooks';
import { ThemeType } from 'src/theme';
import { isNumber } from 'src/utils/digit';
import { divide, multiply } from 'src/utils/numberUtils';

const MIN_SLIPPAGE = 0.01;

export default function SlippageSettings() {
  const intl = useIntl();
  const { maxSlippage } = useSwapTradeInfo();
  const swapInput = useSwapTypeInput();

  const [showCustomInput, setShowCustomInput] = useState(false);
  const [focus, setFocus] = useState(false);
  const [num, setNum] = useState('');

  const MAX_SLIPPAGE = 50;

  // 打开设置
  useEffect(() => {
    if (
      maxSlippage !== '0.002' &&
      maxSlippage !== '0.01' &&
      maxSlippage !== '0.05'
    ) {
      setShowCustomInput(true);
      setNum(multiply(maxSlippage, 100) as string);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const save = useCallback(
    (slippage: string) => {
      swapInput({ fields: [{ field: 'maxSlippage', val: slippage }] });
    },
    [swapInput]
  );

  const validN = useCallback((val: string) => {
    if (!val || !isNumber(val) || Number(val) < MIN_SLIPPAGE)
      return MIN_SLIPPAGE;
    if (Number(val) > MAX_SLIPPAGE) return '50';
    return val;
  }, []);

  const errTips = useMemo(() => {
    if (!showCustomInput) return '';
    if (!num) return intl.min_XXX.replace('XXX', MIN_SLIPPAGE);
    if (!isNumber(num) || Number(num) < MIN_SLIPPAGE) {
      return intl.min_XXX.replace('XXX', MIN_SLIPPAGE);
    }
    if (Number(num) > MAX_SLIPPAGE) {
      return intl.max_XXX.replace('XXX', MAX_SLIPPAGE);
    }
    return '';
  }, [num, intl, showCustomInput]);
  const inputRef = useRef<HTMLInputElement>(null);

  const customInput = (
    <HoverCard position="top-end">
      <HoverCard.Target>
        <Input
          ref={inputRef}
          inputMode="decimal"
          value={num}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const val = e.target.value;
            if (val === '') {
              setNum('');
              return;
            }
            if (isNumber(val) && /^[0-9.]*$/.test(val)) {
              if (parseInt(multiply(val, 100) as any, 10) !== Number(val) * 100)
                return;
              setNum(val);
            }
          }}
          onFocus={() => {
            setFocus(true);
          }}
          onBlur={(e: React.ChangeEvent<HTMLInputElement>) => {
            const val = e.target.value;
            setFocus(false);
            const validVal = validN(val);
            setNum(validVal as string);
            save(divide(validVal, 100) as string);
          }}
        />
      </HoverCard.Target>
      {errTips && (
        <HoverCard.Dropdown style={{ padding: '10px' }}>
          {errTips}
        </HoverCard.Dropdown>
      )}
    </HoverCard>
  );

  return (
    <StyledMaxGasFeeSetting
      className={`slippage-setting-inner ${
        showCustomInput ? 'showCustom' : ''
      }`}
    >
      <SegmentedControl
        data={[
          {
            value: '0.002',
            label: '0.2%',
          },
          {
            value: '0.01',
            label: '1%',
          },
          {
            value: '0.05',
            label: '5%',
          },
          {
            value: 'custom',
            label: (
              <div
                className={`${errTips ? 'err-border' : ''} custom-input ${
                  focus ? 'focus' : ''
                }`}
              >
                {showCustomInput ? customInput : intl['dca.custom']}
              </div>
            ),
          },
        ]}
        value={(showCustomInput ? 'custom' : maxSlippage) as any}
        onChange={(val: string) => {
          if (val === 'custom') {
            setTimeout(() => {
              inputRef.current?.focus();
            }, 0);
            setShowCustomInput(true);
            setNum(multiply(maxSlippage, 100) as string);
          } else {
            setShowCustomInput(false);
            save(val);
          }
        }}
      />
    </StyledMaxGasFeeSetting>
  );
}

const StyledMaxGasFeeSetting = styled.div`
  display: flex;
  margin-top: 12px;
  &.showCustom {
    .mantine-SegmentedControl-root .mantine-SegmentedControl-indicator {
      background: none;
    }
  }
  &.slippage-setting-inner .mantine-SegmentedControl-root {
    min-width: 145px;
    border-radius: 5px;
    .mantine-SegmentedControl-control {
      height: 34px;
      &:before {
        display: none;
      }
      .mantine-SegmentedControl-label {
        line-height: 34px;
        ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
      }
      .custom-input {
        min-width: 75px;
        border: 1px solid ${({ theme }) => theme.border_transparent};
        border-radius: 5px;

        .mantine-Input-wrapper {
          .mantine-Input-input {
            border-color: ${({ theme }) => theme.border_transparent};
            &:focus-within {
              box-shadow: none;
              border-color: ${({ theme }) => theme.border_transparent};
            }
          }
        }

        &:hover {
          border-color: ${({ theme }: { theme: ThemeType }) => theme.blue};
        }
        &.focus {
          border-color: ${({ theme }: { theme: ThemeType }) => theme.blue};
        }
        &.err-border {
          border-color: ${({ theme }) => theme.sell};
        }
      }
      .mantine-Input-wrapper {
        .mantine-Input-input {
          padding: 0 5px;
          text-align: center;
        }
      }
    }
    .mantine-SegmentedControl-indicator {
      height: 34px;
    }
  }
  .mantine-Input-wrapper .mantine-Input-input {
    height: 34px;
    font-size: 14px;
    ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
    text-align: right;

    &[data-disabled] {
      opacity: 0.5;
      border: 1px solid ${(props) => props.theme.border_0e0f12};
      pointer-events: all;
      cursor: not-allowed;
    }
  }
`;

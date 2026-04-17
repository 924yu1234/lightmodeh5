import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react';
import { css } from 'styled-components';

import { Input, PrimaryBtn } from 'src/UI';

import calcAPR from 'src/apps/xstocks/utils/apyCalculatorV2';
import IconMinus from 'src/components/Icons/minus';
import IconPlus from 'src/components/Icons/plus';
import PressWrapper from 'src/components/Input/pressWrapper';
import { useIntl } from 'src/locals';
import {
  formatTurboRangeAPY,
  useCheckPriceRange,
} from 'src/state/turboRange/utils';
import { ThemeType } from 'src/theme';
import digit, { isNumber } from 'src/utils/digit';
import {
  enterNumberCheck,
  isEqual,
  isLessOrEqualThan,
  multiply,
} from 'src/utils/numberUtils';

import ApyBacktest from '../apyBacktest';
import SetPriceRangeChart from './setPriceRangeChart';

interface SetPriceRangeInnerProps {
  currentPrice: any;
  showDecimals: number;
  minPriceProps: any;
  maxPriceProps: any;
  onChange: (val: { minPrice: string; maxPrice: string }) => void;
  product: any;
  aprType: any;
  onClose: () => void;
  visible?: boolean;
}

export interface SetPriceRangeInnerRef {
  closeModal: () => void;
}

const SetPriceRangeInner = forwardRef<
  SetPriceRangeInnerRef,
  SetPriceRangeInnerProps
>(function SetPriceRangeInner(
  {
    currentPrice,
    showDecimals,
    minPriceProps,
    maxPriceProps,
    onChange,
    product,
    aprType,
    onClose,
    visible,
  },
  ref
) {
  const intl = useIntl();

  const [minPrice, setMinPrice] = useState(minPriceProps);
  const [maxPrice, setMaxPrice] = useState(maxPriceProps);
  const [estimatedAPY, setEstimatedAPY] = useState('0');

  useEffect(() => {
    if (visible !== false) {
      setMinPrice(minPriceProps);
      setMaxPrice(maxPriceProps);
    }
  }, [visible, minPriceProps, maxPriceProps]);

  const perecnt1 = useMemo(() => {
    return [
      digit.formatWithDecimals(multiply(currentPrice, 0.99), showDecimals, {
        floor: true,
      }),
      digit.formatWithDecimals(multiply(currentPrice, 1.01), showDecimals, {
        ceil: true,
      }),
    ];
  }, [currentPrice, showDecimals]);

  const isPercent1 = useMemo(() => {
    return isEqual(minPrice, perecnt1[0]) && isEqual(maxPrice, perecnt1[1]);
  }, [minPrice, maxPrice, perecnt1]);
  const perecnt5 = useMemo(() => {
    return [
      digit.formatWithDecimals(multiply(currentPrice, 0.95), showDecimals, {
        floor: true,
      }),
      digit.formatWithDecimals(multiply(currentPrice, 1.05), showDecimals, {
        ceil: true,
      }),
    ];
  }, [currentPrice, showDecimals]);
  const isPercent5 = useMemo(() => {
    return isEqual(minPrice, perecnt5[0]) && isEqual(maxPrice, perecnt5[1]);
  }, [minPrice, maxPrice, perecnt5]);
  const perecnt10 = useMemo(() => {
    return [
      digit.formatWithDecimals(multiply(currentPrice, 0.9), showDecimals, {
        floor: true,
      }),
      digit.formatWithDecimals(multiply(currentPrice, 1.1), showDecimals, {
        ceil: true,
      }),
    ];
  }, [currentPrice, showDecimals]);
  const isPercent10 = useMemo(() => {
    return isEqual(minPrice, perecnt10[0]) && isEqual(maxPrice, perecnt10[1]);
  }, [minPrice, maxPrice, perecnt10]);
  const perecnt20 = useMemo(() => {
    return [
      digit.formatWithDecimals(multiply(currentPrice, 0.8), showDecimals, {
        floor: true,
      }),
      digit.formatWithDecimals(multiply(currentPrice, 1.2), showDecimals, {
        ceil: true,
      }),
    ];
  }, [currentPrice, showDecimals]);

  const isPercent20 = useMemo(() => {
    return isEqual(minPrice, perecnt20[0]) && isEqual(maxPrice, perecnt20[1]);
  }, [minPrice, maxPrice, perecnt20]);

  useEffect(() => {
    if (!isNumber(minPrice) || !isNumber(maxPrice) || !isNumber(currentPrice)) {
      return;
    }
    if (Number(minPrice) >= Number(maxPrice)) {
      return;
    }
    if (!product?.poolUrl) return;
    calcAPR({
      poolId: product?.poolAddress,
      minPrice,
      maxPrice,
      aprType: 'week',
      currentPrice,
    } as any).then((res) => {
      setEstimatedAPY(res?.totalNetAPR as any);
    });
  }, [
    minPrice,
    maxPrice,
    product?.poolAddress,
    currentPrice,
    product?.poolUrl,
    aprType,
  ]);

  const getChangeRate = (accelerationLevel = 1) => {
    const fibonacciSequence = [1, 2, 3, 5, 8, 13, 21, 34];
    const fibIndex = accelerationLevel - 1;
    const multiplier = fibonacciSequence[fibIndex] || 40 * accelerationLevel;
    const baseRate = 0.001;
    return baseRate * multiplier;
  };

  const _setMinPrice = (value: string) => {
    if (isLessOrEqualThan(maxPrice, value)) {
      setMinPrice(maxPrice);
      return;
    }
    if (isLessOrEqualThan(value, 0)) {
      setMinPrice(0);
      return;
    }
    setMinPrice(digit.formatWithDecimals(value, showDecimals, { floor: true }));
  };
  const _setMaxPrice = (value: string) => {
    if (isLessOrEqualThan(value, minPrice)) {
      setMaxPrice(minPrice);
      return;
    }
    setMaxPrice(digit.formatWithDecimals(value, showDecimals, { ceil: true }));
  };

  const { priceRangeError, uniTickError } = useCheckPriceRange(
    minPrice,
    maxPrice,
    product?.poolAddress
  );

  const closeModal = () => {
    onClose();
    if (!isNumber(minPrice) || !isNumber(maxPrice)) {
      return;
    }
    if (!priceRangeError && onChange) {
      onChange({ minPrice, maxPrice });
    }
  };

  useImperativeHandle(ref, () => ({ closeModal }));

  return (
    <>
      <SetPriceRangeChart
        currentPrice={currentPrice}
        minPrice={minPrice}
        maxPrice={maxPrice}
        showDecimals={showDecimals}
      />
      <div className="price-input-sections" data-prevent-drawer-drag>
        {/* Min Price 输入区域 */}
        <div className="price-input-section">
          <div className="price-input-label">{intl.turboRange.min_price}</div>
          <div className="price-input-wrapper">
            <Input
              leftSection={
                <PressWrapper
                  handlePress={(accelerationLevel = 1) => {
                    const changeRate = getChangeRate(accelerationLevel);
                    _setMinPrice(
                      digit.formatWithDecimals(
                        multiply(minPrice, 1 - changeRate),
                        showDecimals,
                        { floor: true }
                      )
                    );
                  }}
                >
                  <IconMinus />
                </PressWrapper>
              }
              rightSection={
                <PressWrapper
                  handlePress={(accelerationLevel = 1) => {
                    const changeRate = getChangeRate(accelerationLevel);
                    _setMinPrice(
                      digit.formatWithDecimals(
                        multiply(minPrice, 1 + changeRate),
                        showDecimals,
                        { ceil: true }
                      )
                    );
                  }}
                >
                  <IconPlus />
                </PressWrapper>
              }
              inputMode="decimal"
              className={
                !isNumber(minPrice) || uniTickError ? 'err-border' : ''
              }
              value={minPrice}
              onChange={(e: any) => {
                setMinPrice(enterNumberCheck(e.target.value));
              }}
              onBlur={(e: any) => {
                const val = e.target.value;
                if (Number(val) > Number(maxPrice) && isNumber(maxPrice)) {
                  setMinPrice(maxPrice);
                  return;
                }
                setMinPrice(
                  digit.formatWithDecimals(val, showDecimals, {
                    floor: true,
                  })
                );
              }}
            />
          </div>
        </div>

        {/* Max Price 输入区域 */}
        <div className="price-input-section">
          <div className="price-input-label">{intl.turboRange.max_price}</div>
          <div className="price-input-wrapper">
            <Input
              leftSection={
                <PressWrapper
                  handlePress={(accelerationLevel = 1) => {
                    const changeRate = getChangeRate(accelerationLevel);
                    _setMaxPrice(
                      digit.formatWithDecimals(
                        multiply(maxPrice, 1 - changeRate),
                        showDecimals,
                        { floor: true }
                      )
                    );
                  }}
                >
                  <IconMinus />
                </PressWrapper>
              }
              rightSection={
                <PressWrapper
                  handlePress={(accelerationLevel = 1) => {
                    const changeRate = getChangeRate(accelerationLevel);
                    _setMaxPrice(
                      digit.formatWithDecimals(
                        multiply(maxPrice, 1 + changeRate),
                        showDecimals,
                        { ceil: true }
                      )
                    );
                  }}
                >
                  <IconPlus />
                </PressWrapper>
              }
              className={
                !isNumber(maxPrice) || uniTickError ? 'err-border' : ''
              }
              inputMode="decimal"
              value={maxPrice}
              onChange={(e: any) => {
                setMaxPrice(enterNumberCheck(e.target.value));
              }}
              onBlur={(e: any) => {
                const val = e.target.value;
                if (Number(val) < Number(minPrice) && isNumber(minPrice)) {
                  setMaxPrice(minPrice);
                  return;
                }
                setMaxPrice(
                  digit.formatWithDecimals(val, showDecimals, {
                    ceil: true,
                  })
                );
              }}
            />
          </div>
        </div>
      </div>
      {priceRangeError && (
        <div className="error-tips">{intl.turboRange.invalid_range}</div>
      )}
      <div className="items">
        <div
          className={`item ${isPercent1 ? 'selected' : ''}`}
          onClick={() => {
            setMinPrice(perecnt1[0]);
            setMaxPrice(perecnt1[1]);
          }}
        >
          ±1%
        </div>
        <div
          className={`item ${isPercent5 ? 'selected' : ''}`}
          onClick={() => {
            setMinPrice(perecnt5[0]);
            setMaxPrice(perecnt5[1]);
          }}
        >
          ±5%
        </div>
        <div
          className={`item ${isPercent10 ? 'selected' : ''}`}
          onClick={() => {
            setMinPrice(perecnt10[0]);
            setMaxPrice(perecnt10[1]);
          }}
        >
          ±10%
        </div>
        <div
          className={`item ${isPercent20 ? 'selected' : ''}`}
          onClick={() => {
            setMinPrice(perecnt20[0]);
            setMaxPrice(perecnt20[1]);
          }}
        >
          ±20%
        </div>
      </div>
      <div className="summary-item">
        <span className="summary-label">{intl.turboRange.price_range}</span>
        <span className="summary-value">
          {minPrice} - {maxPrice}
        </span>
      </div>
      <div className="summary-item">
        <span className="summary-label">{intl.turboRange.apy_7D}</span>
        <span className="summary-value apy-value">
          {formatTurboRangeAPY(estimatedAPY)}
        </span>
      </div>
      <ApyBacktest
        poolAddress={product?.poolAddress}
        minPrice={minPrice}
        maxPrice={maxPrice}
        onChange={({ minPrice, maxPrice }: any) => {
          setMinPrice(minPrice);
          setMaxPrice(maxPrice);
        }}
      />
      <PrimaryBtn
        eventName="turbo_range_set_price_range_close"
        onClick={closeModal}
        className="close-btn"
      >
        {intl.go_back}
      </PrimaryBtn>
    </>
  );
});

export default SetPriceRangeInner;

export const commonStyledSetPriceRangeModal = css`
  .price-input-sections {
    display: flex;
    align-items: center;
    gap: 15px;
  }
  .price-input-section {
    display: flex;
    flex-direction: column;
    .price-input-label {
      ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
      color: ${({ theme }: { theme: ThemeType }) =>
        theme.darkMode ? theme.t_b7b_80 : theme.mutedText};
      font-size: 14px;
      line-height: 18px;
      margin-bottom: 7px;
      text-align: center;
    }
    .price-input-wrapper {
      display: flex;
      align-items: center;
      gap: 4px;
      /* UIInput 外层包裹层需占满中间栏，避免仅 Input 自带 flex 失效 */
      & > [data-prevent-drawer-drag] {
        flex: 1;
        min-width: 0;
      }
      .mantine-Input-wrapper {
        flex: 1;
        height: 44px;
        .mantine-Input-input {
          height: 44px;
          font-size: 16px;
          text-align: center;
        }
      }
      .press-wrapper {
        width: 44px;
        height: 44px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        user-select: none;
        .dg-icon {
          color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_80};
        }
      }
    }
  }
  .items {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 25px;
    margin-bottom: 35px;
    .item {
      cursor: pointer;
      font-size: 14px;
      line-height: 36px;
      height: 36px;
      flex: 1;
      background: ${({ theme }: { theme: ThemeType }) =>
        theme.darkMode ? theme.bg_white_05 : theme.shellSurfaceSecondary};
      border: 1px solid
        ${({ theme }: { theme: ThemeType }) =>
          theme.darkMode ? theme.border_b7b_20 : theme.cardBorder};
      padding: 0 10px;
      text-align: center;
      border-radius: 5px;
      color: ${({ theme }: { theme: ThemeType }) =>
        theme.darkMode ? theme.t_fff : theme.ink};
      &.selected {
        border: 1px solid ${({ theme }) => theme.border_blue};
      }
      &:active,
      &:hover {
        background: ${({ theme }) => theme.bg_blue_10};
        border: 1px solid ${({ theme }) => theme.border_blue};
        border-radius: 5px;
      }
    }
  }
  .error-tips {
    margin-top: 10px;
    ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
    font-size: 14px;
    color: ${({ theme }: { theme: ThemeType }) => theme.red};
  }
  .summary-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    .summary-label {
      ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
      color: ${({ theme }: { theme: ThemeType }) =>
        theme.darkMode ? theme.t_b7b_80 : theme.mutedText};
      font-size: 14px;
      line-height: 20px;
    }
    .summary-value {
      ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
      color: ${({ theme }: { theme: ThemeType }) =>
        theme.darkMode ? theme.t_fff : theme.ink};
      font-size: 14px;
      line-height: 20px;
      &.apy-value {
        color: ${({ theme }: { theme: ThemeType }) => theme.green};
      }
    }
  }
  .apy-backtest {
    margin-top: 15px;
  }
  .close-btn {
    width: 100%;
    margin-top: 30px;
  }
`;

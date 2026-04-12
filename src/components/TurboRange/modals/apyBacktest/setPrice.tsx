import React, { useMemo } from 'react';
import styled from 'styled-components';

import { Input } from 'src/UI';

import IconMinus from 'src/components/Icons/minus';
import IconPlus from 'src/components/Icons/plus';
import PressWrapper from 'src/components/Input/pressWrapper';
import { useIntl } from 'src/locals';
import { useTurboRangeProduct } from 'src/state/turboRange/hooks';
import { useCheckPriceRange } from 'src/state/turboRange/utils';
import { ThemeType } from 'src/theme';
import digit, { isNumber } from 'src/utils/digit';
import {
  enterNumberCheck,
  isEqual,
  isLessOrEqualThan,
  multiply,
} from 'src/utils/numberUtils';

export default function ApyBacktestSetPrice({
  poolAddress,
  minPrice,
  maxPrice,
  setMinPrice,
  setMaxPrice,
}: {
  poolAddress: string;
  minPrice: string;
  maxPrice: string;
  setMinPrice: (value: string) => void;
  setMaxPrice: (value: string) => void;
}) {
  const intl = useIntl();

  const product = useTurboRangeProduct(poolAddress);

  const showDecimals = product.showDecimals;
  const currentPrice = product.currentPrice;

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
      setMinPrice('0');
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
    poolAddress
  );

  return (
    <StyledSetPrice>
      <div className="price-input-sections">
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
      <div className="current-price">
        {intl.turboRange.current_price}
        <div className="current-price-value">{currentPrice}</div>
      </div>
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
    </StyledSetPrice>
  );
}

const StyledSetPrice = styled.div`
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
      color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_80};
      font-size: 14px;
      line-height: 18px;
      margin-bottom: 7px;
      text-align: center;
    }
    .price-input-wrapper {
      display: flex;
      align-items: center;
      gap: 4px;
      .mantine-Input-wrapper {
        flex: 1;
        height: 44px;
        .mantine-Input-input {
          height: 44px;
          text-align: center;
          font-size: 16px;
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
    gap: 18px;
    margin-top: 15px;
    margin-bottom: 35px;
    .item {
      cursor: pointer;
      font-size: 14px;
      line-height: 36px;
      height: 36px;
      min-width: 65px;
      flex: 1;
      background: ${({ theme }) => theme.bg_white_05};
      border: 1px solid ${({ theme }) => theme.border_b7b_20};
      padding: 0 10px;
      text-align: center;
      border-radius: 5px;
      color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
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
  .current-price {
    margin-top: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    font-size: 11px;
    line-height: 16px;
    ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
    color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_80};
    .current-price-value {
      color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
    }
  }
  .error-tips {
    margin-top: 10px;
    ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
    font-size: 14px;
    color: ${({ theme }: { theme: ThemeType }) => theme.red};
  }
`;

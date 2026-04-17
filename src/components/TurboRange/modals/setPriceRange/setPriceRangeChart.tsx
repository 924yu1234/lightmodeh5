/* eslint-disable react/no-array-index-key */
import React, { useMemo } from 'react';
import styled from 'styled-components';

import { useIntl } from 'src/locals';
import { ThemeType } from 'src/theme';
import digit from 'src/utils/digit';

export default function SetPriceRangeChart({
  currentPrice,
  minPrice,
  maxPrice,
  showDecimals,
}: {
  currentPrice: string;
  minPrice: string;
  maxPrice: string;
  showDecimals: number;
}) {
  const intl = useIntl();

  // 计算图表数据
  const chartData = useMemo(() => {
    const currentPriceNum = Number(currentPrice);
    const minPriceNum = Number(minPrice);
    const maxPriceNum = Number(maxPrice);

    const min = Math.min(minPriceNum, currentPriceNum);
    const max = Math.max(currentPriceNum, maxPriceNum);

    // 计算整体价格区间：放大1.8倍，最小价格不低于0
    const rangeCenter = (min + max) / 2;
    const rangeWidth = (max - min) * 1.8;

    const chartMin = rangeCenter - rangeWidth / 2;
    const chartMax = rangeCenter + rangeWidth / 2;
    const chartRange = chartMax - chartMin;

    // 生成5个价格标签
    const priceLabels = [];
    for (let i = 0; i < 5; i++) {
      const price = chartMin + (chartRange * i) / 4;
      priceLabels.push(digit.formatWithDecimals(price, showDecimals));
    }

    // 计算各价格在图表中的位置百分比
    const getPositionPercent = (price: number) => {
      return ((price - chartMin) / chartRange) * 100;
    };

    // 计算相对于当前价格的百分比变化
    let minPricePercent = '0';
    if (currentPriceNum > 0) {
      minPricePercent = (
        ((minPriceNum - currentPriceNum) / currentPriceNum) *
        100
      ).toFixed(0);
      if (minPricePercent === '-0' && minPriceNum < currentPriceNum) {
        minPricePercent = '<-1';
      }
    }

    let maxPricePercent = '0';
    if (currentPriceNum > 0) {
      maxPricePercent = (
        ((maxPriceNum - currentPriceNum) / currentPriceNum) *
        100
      ).toFixed(0);
      if (maxPricePercent === '0' && maxPriceNum > currentPriceNum) {
        maxPricePercent = '<1';
      }
    }

    return {
      chartMin,
      chartMax,
      priceLabels,
      currentPosition: getPositionPercent(currentPriceNum),
      minPosition: getPositionPercent(minPriceNum),
      maxPosition: getPositionPercent(maxPriceNum),
      minPricePercent: `${minPricePercent}%`,
      maxPricePercent: `${maxPricePercent}%`,
    };
  }, [currentPrice, minPrice, maxPrice, showDecimals]);

  return (
    <StyledSetPriceRangeModal className="set-chart">
      {/* 当前价格信息 */}
      <div className="set-chart-title">
        <div className="price-line"></div>
        {intl.turboRange.current_price}
        <div className="price-value">{currentPrice}</div>
      </div>
      {/* 价格范围图表 */}
      <div className="price-range-chart-container">
        {/* 价格范围区域 */}
        <div className="range-area">
          <div
            className="selected-range"
            style={{
              left: `${chartData.minPosition}%`,
              width: `${chartData.maxPosition - chartData.minPosition}%`,
            }}
          />

          <div className="marker-label min-price">
            <div className="marker-text">{intl.turboRange.min_price}</div>
            <div className="marker-percentage">{chartData.minPricePercent}</div>
          </div>
          <div className="marker-label max-price">
            <div className="marker-text">{intl.turboRange.max_price}</div>
            <div className="marker-percentage">{chartData.maxPricePercent}</div>
          </div>

          <div
            className="price-marker min-marker"
            style={{ left: `${chartData.minPosition}%` }}
          >
            <div className="marker-line" />
          </div>
          <div
            className="price-marker max-marker"
            style={{ left: `${chartData.maxPosition}%` }}
          >
            <div className="marker-line" />
          </div>

          {/* Current Price 线 */}
          <div
            className="current-price-line"
            style={{ left: `${chartData.currentPosition}%` }}
          />
        </div>

        {/* 底部价格刻度 */}
        <div className="price-scale">
          {chartData.priceLabels.map((label, index) => (
            <div key={`${label}_${index}`} className="price-tick">
              {label}
            </div>
          ))}
        </div>
      </div>
    </StyledSetPriceRangeModal>
  );
}

const StyledSetPriceRangeModal = styled.div`
  .price-range-chart-container {
    margin-bottom: 15px;
    padding: 10px 0;
  }

  .range-area {
    position: relative;
    height: 50px;

    /* 选中的价格范围区域 */
    .selected-range {
      position: absolute;
      bottom: 0;
      height: 48px;
      background: ${({ theme }: { theme: ThemeType }) => theme.bg_blue_06};
    }

    /* 文案贴区域左右两侧，不以竖线为基准 */
    .marker-label {
      position: absolute;
      top: 50%;
      z-index: 1;
      text-align: center;
      white-space: nowrap;
      padding: 5px;
      border-radius: 5px;
      transform: translateY(-50%);

      &.min-price {
        left: 0;
        text-align: left;
        background: ${(props) => props.theme.bg_buy_10};
        border: 1px solid ${(props) => props.theme.border_buy_50};
      }

      &.max-price {
        right: 0;
        text-align: right;
        background: ${({ theme }) => theme.bg_blue_20};
        border: 1px solid ${(props) => props.theme.border_blue_50};
      }

      .marker-text {
        ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
        color: ${({ theme }: { theme: ThemeType }) =>
          theme.darkMode ? theme.t_fff : theme.ink};
        font-size: 10px;
        line-height: 14px;
        margin-bottom: 2px;
      }

      .marker-percentage {
        ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
        color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b};
        font-size: 10px;
        line-height: 14px;
      }
    }

    /* 竖线仍按价格位置 */
    .price-marker {
      position: absolute;
      top: 0;
      transform: translateX(-50%);

      .marker-line {
        width: 2px;
        height: 50px;
        background: ${({ theme }: { theme: ThemeType }) => theme.bg_4a9eff};
        margin: 0 auto;
      }
    }

    /* 当前价格线 */
    .current-price-line {
      position: absolute;
      width: 1px;
      height: 50px;
      border-left: 1px dashed
        ${({ theme }: { theme: ThemeType }) =>
          theme.darkMode ? theme.t_fff : theme.divider};
    }
  }

  .price-scale {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 0px;
    padding-top: 10px;
    border-top: 1px solid ${({ theme }: { theme: ThemeType }) => theme.divider};

    .price-tick {
      ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
      color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b};
      font-size: 11px;
      line-height: 16px;
      text-align: center;
      flex: 1;

      &:first-child {
        text-align: left;
      }

      &:last-child {
        text-align: right;
      }
    }
  }

  .set-chart-title {
    display: flex;
    align-items: center;
    gap: 5px;
    ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
    color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_80};
    font-size: 11px;
    line-height: 20px;

    .price-line {
      width: 13px;
      height: 1px;
      border-bottom: 1px dashed
        ${({ theme }: { theme: ThemeType }) =>
          theme.darkMode ? theme.t_fff : theme.divider};
    }

    .price-value {
      color: ${({ theme }: { theme: ThemeType }) =>
        theme.darkMode ? theme.t_fff : theme.ink};
    }
  }
`;

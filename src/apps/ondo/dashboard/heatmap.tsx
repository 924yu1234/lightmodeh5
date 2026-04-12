import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useInViewport } from '@mantine/hooks';
import { ResponsiveContainer, Tooltip, Treemap } from 'recharts';
import styled from 'styled-components';

import { useIntl } from 'src/locals';
import { ThemeType, useThemeParams } from 'src/theme';
import digit from 'src/utils/digit';

import { getTreemapColor } from '../color';
import { useOndoStocks } from '../useOndoStocks';
import { getSymbolColor } from '../utils/colors';
import { generateWatermarkCSS } from '../utils/watermark';
import { useOndo } from './dataProvider';

// 自定义 Treemap 内容组件 - 使用React.memo优化
const CustomTreemapContent = React.memo((props: any) => {
  const { depth, x, y, width, height, name, changePercent, type, value } =
    props;

  if (depth !== 1) {
    return null;
  }

  const shouldShowText = width > 60 && height > 40;
  const fillColor = getTreemapColor(type, changePercent);

  // 根据类型决定显示内容
  let displayText = '';
  if (type === 'aum') {
    // AUM显示涨跌幅
    displayText = `${changePercent >= 0 ? '+' : ''}${digit.format(
      changePercent,
      '0.00'
    )}%`;
  } else if (type === 'dex_volume') {
    // Dex Volume显示数值
    if (value >= 1000000) {
      displayText = `$${(value / 1000000).toFixed(0)}M`;
    } else if (value >= 1000) {
      displayText = `$${(value / 1000).toFixed(0)}K`;
    } else {
      displayText = `$${value.toFixed(0)}`;
    }
  } else {
    // Holders显示数值
    displayText = value.toLocaleString();
  }

  let textColor = '#fff';
  if (type === 'aum') {
    if (Math.abs(changePercent) < 0.001) {
      textColor = '#c9c9c9'; // 0%用灰色文字
    } else {
      textColor = changePercent > 0 ? '#42bd7f' : '#f77c80'; // 用浅绿和浅红作为文字颜色，保证可读性
    }
  }

  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill={fillColor}
        stroke="#000"
        strokeWidth={1}
        rx={2}
      />
      {shouldShowText && (
        <>
          <text
            x={x + width / 2}
            y={y + height / 2 - 8}
            textAnchor="middle"
            fill="#fff"
            fontSize="18"
            style={{ textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)' }}
          >
            {name}
          </text>
          <text
            x={x + width / 2}
            y={y + height / 2 + 8}
            textAnchor="middle"
            fill={textColor}
            fontSize="12"
            style={{ textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)' }}
          >
            {displayText}
          </text>
        </>
      )}
    </g>
  );
});

// 自定义工具提示组件 - 使用React.memo优化
const CustomTooltip = React.memo(
  ({ active, payload, formatValue, type }: any) => {
    if (!active || !payload || !payload.length) {
      return null;
    }

    const data = payload[0].payload;
    const changeClass = data.changePercent >= 0 ? 'positive' : 'negative';
    const changeText = `${data.changePercent >= 0 ? '+' : ''}${digit.format(
      data.changePercent,
      '0.00'
    )}%`;

    return (
      <div className="treemap-tooltip">
        <div className="tooltip-title">{data.name}</div>
        <div className="tooltip-value">{formatValue(data.value, type)}</div>
        {type === 'aum' && (
          <div className={`tooltip-change ${changeClass}`}>{changeText}</div>
        )}
      </div>
    );
  }
);

interface TreemapData {
  name: string;
  size: number;
  changePercent: number;
  value: number;
  fill?: string;
  [key: string]: any; // 添加索引签名
}

export default function Heatmap({
  width,
  height,
}: {
  width: number;
  height: number;
}): JSX.Element | null {
  const [type] = useState<string>('aum');
  const { latestAumData } = useOndo();
  const { list } = useOndoStocks();

  const [isVisible, setIsVisible] = useState(false);
  const { ref, inViewport } = useInViewport();

  useEffect(() => {
    if (inViewport && !isVisible) {
      setIsVisible(true);
    }
  }, [inViewport, isVisible]);

  // 优化treemap数据计算，添加缓存机制和maxValue计算
  const { treemapData, maxValue } = useMemo(() => {
    // 预先建立索引映射，提高查找效率
    const aumMap = new Map(
      latestAumData.map((item) => [item.token_symbol, item])
    );

    const items: TreemapData[] = [];

    for (const item of list) {
      const symbol = item.baseToken?.symbol;
      let value = 0;
      const changePercent = item.change || 0;
      value = aumMap.get(symbol)?.aum_usd || 0;

      if (value > 0) {
        items.push({
          name: symbol,
          size: value,
          value,
          changePercent,
          fill: getSymbolColor(symbol),
        });
      }
    }

    const result = items.sort((a, b) => b.size - a.size);
    const maxVal =
      result.length > 0 ? Math.max(...result.map((item) => item.value)) : 0;

    return { treemapData: result, maxValue: maxVal };
  }, [list, latestAumData]);

  // 使用useCallback缓存formatValue函数
  const formatValue = useCallback((value: number, type: string) => {
    if (type === 'aum' || type === 'dex_volume') {
      if (value >= 1000000) {
        return `$${(value / 1000000).toFixed(0)}M`;
      }
      if (value >= 1000) {
        return `$${(value / 1000).toFixed(0)}K`;
      }
      return `$${value.toFixed(0)}`;
    }
    return value.toLocaleString();
  }, []);

  const { isMobile } = useThemeParams();
  const intl = useIntl();

  // 早期返回，避免不必要的渲染
  if (!treemapData.length) {
    return (
      <StyledHeatmap ref={ref}>
        <div className="heatmap-title">{intl.stocks.Stock_Heatmap_AUM}</div>
        <div
          className="heatmap-content"
          style={{
            width: width - (isMobile ? 20 : 32),
            height: height - (isMobile ? 36 : 48),
          }}
        ></div>
      </StyledHeatmap>
    );
  }

  return (
    <StyledHeatmap ref={ref}>
      <div className="heatmap-title">{intl.stocks.Stock_Heatmap_AUM}</div>
      <div
        className="heatmap-content"
        style={{
          width: width - (isMobile ? 20 : 32),
          height: height - (isMobile ? 36 : 48),
        }}
      >
        {isVisible && (
          <ResponsiveContainer
            width={width - (isMobile ? 20 : 32)}
            height={height - (isMobile ? 36 : 48)}
            debounce={200}
            minWidth={200}
            minHeight={200}
          >
            <Treemap
              data={treemapData}
              dataKey="size"
              stroke="#fff"
              content={<CustomTreemapContent type={type} maxValue={maxValue} />}
              isAnimationActive={false}
            >
              <Tooltip
                isAnimationActive={false}
                cursor={false}
                contentStyle={{
                  fontSize: 11,
                  backgroundColor: 'rgba(0, 0, 0, 0.8)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '6px',
                  padding: '8px',
                }}
                content={
                  <CustomTooltip formatValue={formatValue} type={type} />
                }
              />
            </Treemap>
          </ResponsiveContainer>
        )}
      </div>
    </StyledHeatmap>
  );
}

const StyledHeatmap = styled.div`
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.bg_white_08};
  border-radius: 8px;
  padding: ${({ theme }: { theme: ThemeType }) =>
    theme.isMobile ? '10px' : '16px'};

  .heatmap-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 16px;
    font-weight: 600;
    color: ${({ theme }) => theme.t_fff};
    margin-bottom: 16px;
  }

  .heatmap-content {
    width: 100%;
    min-height: 400px;
    ${generateWatermarkCSS({ fontSize: 32 })}

    .loading {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      color: ${(props) => props.theme.t_9aa3b2};
      font-size: 14px;
    }
  }

  .treemap-tooltip {
    background: ${({ theme }) => theme.bg_black_80};
    border: 1px solid ${({ theme }) => theme.border_white_20};
    border-radius: 6px;
    padding: 8px 12px;
    color: ${({ theme }) => theme.t_fff};
    font-size: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);

    .tooltip-title {
      font-weight: 600;
      margin-bottom: 4px;
    }

    .tooltip-value {
      font-size: 14px;
      font-weight: 500;
      margin-bottom: 2px;
    }

    .tooltip-change {
      font-size: 11px;
      font-weight: 600;

      &.positive {
        color: ${(props) => props.theme.t_42bd7f};
      }

      &.negative {
        color: ${(props) => props.theme.t_f77c80};
      }
    }
  }

  /* 响应式调整 */
  @media (max-width: 768px) {
    .heatmap-content {
      min-height: 300px;
    }
  }
`;

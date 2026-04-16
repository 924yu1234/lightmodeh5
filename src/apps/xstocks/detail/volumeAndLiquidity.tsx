/* eslint-disable simple-import-sort/imports */
import dayjs from 'dayjs';
import React, { useMemo, useState, useEffect } from 'react';
import {
  Line,
  Bar,
  ComposedChart,
  ResponsiveContainer,
  Tooltip,
  Legend,
  XAxis,
  YAxis,
} from 'recharts';
import styled from 'styled-components';

import { useThemeParams, ThemeType } from 'src/theme';
import { useIntl } from 'src/locals';
import { useInViewport } from '@mantine/hooks';
import { formatCurrencyAxis } from 'src/utils/format';
import { DexPoolDailyDataApiItem } from '../dashboard/service';
import { useXStockDetail } from './dataProvider';
import { generateWatermarkCSS } from '../utils/watermark';

// 自定义工具提示组件 - 使用React.memo优化
const CustomTooltip = React.memo(({ active, payload, label }: any) => {
  if (!active || !payload || !payload.length) return null;

  return (
    <div className="custom-tooltip">
      <p className="label">{label}</p>
      {payload.map((entry: any) => (
        <p key={entry.dataKey} style={{ color: entry.color }}>
          {entry.name}:{' '}
          {entry.name === 'Dex Liquidity'
            ? formatCurrencyAxis(entry.value)
            : entry.value.toLocaleString()}
        </p>
      ))}
    </div>
  );
});

type ChartRow = {
  date: string; // formatted for x-axis
  timestamp: number; // for sorting
  volume?: number;
  liquidity?: number;
};

function buildChartData(poolDailyData: DexPoolDailyDataApiItem[]): ChartRow[] {
  if (!Array.isArray(poolDailyData) || poolDailyData.length === 0) {
    return [];
  }

  const dataByDate = new Map<string, ChartRow>();

  // 优化数据处理循环
  for (const item of poolDailyData) {
    const day = dayjs(item.date).format('YYYY-MM-DD');
    if (!dataByDate.has(day)) {
      dataByDate.set(day, {
        date: dayjs(day).format('MMM D'),
        timestamp: dayjs(day).valueOf(),
        volume: 0,
        liquidity: 0,
      });
    }
    const row = dataByDate.get(day) as ChartRow;
    row.volume = item.volume > 0 ? item.volume : undefined;
    row.liquidity = item.liquidity > 0 ? item.liquidity : undefined;
  }

  const result = Array.from(dataByDate.values()).sort(
    (a, b) => a.timestamp - b.timestamp
  );

  return result;
}

export default function VolumeAndLiquidity({
  width,
  height,
}: {
  width: number;
  height: number;
}): JSX.Element | null {
  const { poolDailyData } = useXStockDetail();

  // 优化数据处理，添加依赖检查
  const chartData = useMemo(() => {
    if (!poolDailyData || poolDailyData.length === 0) {
      return [];
    }
    return buildChartData(poolDailyData);
  }, [poolDailyData]);

  const { isMobile, darkMode: tooltipThemeDarkMode } = useThemeParams();
  const tooltipTheme = { darkMode: tooltipThemeDarkMode };
  const intl = useIntl();

  const [isVisible, setIsVisible] = useState(false);
  const { ref, inViewport } = useInViewport();
  useEffect(() => {
    if (inViewport && !isVisible) {
      setIsVisible(true);
    }
  }, [inViewport, isVisible]);

  // 早期返回，避免不必要的渲染
  if (!chartData.length) {
    return (
      <Card ref={ref} style={{ width, height }}>
        <div className="card-title">
          {intl.stocks.Trading_Vol_Dex_Liquidity}
        </div>
        <div
          className="chart"
          style={{
            width: width - (isMobile ? 20 : 32),
            height: height - (isMobile ? 36 : 48),
          }}
        ></div>
      </Card>
    );
  }

  return (
    <Card ref={ref} style={{ width, height }}>
      <div className="card-title">{intl.stocks.Trading_Vol_Dex_Liquidity}</div>
      <div
        className="chart"
        style={{
          width: width - (isMobile ? 20 : 32),
          height: height - (isMobile ? 36 : 48),
        }}
      >
        {isVisible && (
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={chartData}
              margin={{ left: 0, right: 0, top: 10, bottom: 0 }}
            >
              <XAxis
                dataKey="date"
                tick={{ fill: '#9aa3b2', fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                yAxisId="left"
                tick={{ fill: '#9aa3b2', fontSize: 12 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={formatCurrencyAxis}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                tick={{ fill: '#9aa3b2', fontSize: 12 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={formatCurrencyAxis}
              />
              <Tooltip
                isAnimationActive={false}
                contentStyle={{
                  fontSize: 11,
                  backgroundColor: tooltipTheme.darkMode
                    ? 'rgba(0, 0, 0, 0.8)'
                    : 'rgba(255, 255, 255, 0.95)',
                  border: tooltipTheme.darkMode
                    ? '1px solid rgba(255, 255, 255, 0.2)'
                    : '1px solid rgba(9, 45, 31, 0.12)',
                  borderRadius: '6px',
                }}
                content={<CustomTooltip />}
              />
              <Legend
                iconType="line"
                iconSize={11}
                wrapperStyle={{ paddingTop: '20px', fontSize: '11px' }}
              />
              <Bar
                yAxisId="left"
                dataKey="volume"
                fill="#0AB9FF"
                name="Trading Volume"
                isAnimationActive={false}
                style={{ cursor: 'default' }}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="liquidity"
                stroke="#FF9000"
                strokeWidth={3}
                dot={false}
                name="Dex Liquidity"
                isAnimationActive={false}
                style={{ cursor: 'default' }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        )}
      </div>
    </Card>
  );
}

const Card = styled.div`
  background: ${({ theme }) => theme.bg_white_08};
  border-radius: 8px;
  padding: ${({ theme }: { theme: ThemeType }) =>
    theme.isMobile ? '10px' : '16px'};

  .card-title {
    font-size: 16px;
    font-weight: 600;
    color: ${({ theme }) => theme.t_fff};
    margin-bottom: 8px;
  }

  .chart {
    width: 100%;
    height: 320px;
    ${generateWatermarkCSS()}
  }

  .custom-tooltip {
    background: ${({ theme }) => theme.bg_black_80};
    border: 1px solid ${({ theme }) => theme.border_white_20};
    border-radius: 6px;
    padding: 8px 12px;
    color: ${({ theme }) => theme.t_fff};
    font-size: 12px;

    .label {
      font-weight: 600;
      margin-bottom: 4px;
    }

    p {
      margin: 2px 0;
    }
  }

  .loading {
    color: ${(props) => props.theme.t_9aa3b2};
    font-size: 12px;
    margin-top: 8px;
  }
`;

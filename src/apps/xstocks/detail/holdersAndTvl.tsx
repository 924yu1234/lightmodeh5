/* eslint-disable simple-import-sort/imports */
import dayjs from 'dayjs';
import React, { useMemo, useState, useEffect } from 'react';
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  Legend,
  XAxis,
  YAxis,
} from 'recharts';
import styled from 'styled-components';

import { ThemeType, useThemeParams } from 'src/theme';
import { useIntl } from 'src/locals';
import { useInViewport } from '@mantine/hooks';
import { formatCurrencyAxis, formatNumberAxis } from 'src/utils/format';
import { DailyHoldersApiItem } from '../dashboard/service';
import { useXStockDetail } from './dataProvider';
import { generateWatermarkCSS } from '../utils/watermark';
import { DailyTokenSupplyForSingleTokenApiItem } from './service';

// 自定义工具提示组件 - 使用React.memo优化
const CustomTooltip = React.memo(({ active, payload, label }: any) => {
  if (!active || !payload || !payload.length) {
  const tooltipTheme = useThemeParams();
    return null;
  }

  return (
    <div className="custom-tooltip">
      <p className="label">{label}</p>
      {payload.map((entry: any) => (
        <p key={entry.dataKey} style={{ color: entry.color }}>
          {entry.name}:{' '}
          {entry.name === 'AUM'
            ? `$${(entry.value / 1000000).toFixed(2)}M`
            : entry.value.toLocaleString()}
        </p>
      ))}
    </div>
  );
});

type ChartRow = {
  date: string; // formatted for x-axis
  timestamp: number; // for sorting
  holders?: number;
  aum?: number;
};

function buildChartData(
  holdersData: DailyHoldersApiItem[],
  dailyTokenSupply: DailyTokenSupplyForSingleTokenApiItem[]
): ChartRow[] {
  if (
    (!Array.isArray(holdersData) || holdersData.length === 0) &&
    (!Array.isArray(dailyTokenSupply) || dailyTokenSupply.length === 0)
  ) {
    return [];
  }

  const dataByDate = new Map<string, ChartRow>();

  // 处理 holders 数据 - 使用for循环优化性能
  if (Array.isArray(holdersData) && holdersData.length > 0) {
    for (const item of holdersData) {
      const day = dayjs(item.date).format('YYYY-MM-DD');
      if (!dataByDate.has(day)) {
        dataByDate.set(day, {
          date: dayjs(day).format('MMM D'),
          timestamp: dayjs(day).valueOf(),
          holders: 0,
          aum: 0,
        });
      }
      const row = dataByDate.get(day) as ChartRow;
      row.holders = Number(item.cumulative_holders) || 0;
    }
  }

  // 处理 aum_usd 数据 - 预先排序并优化循环
  if (Array.isArray(dailyTokenSupply) && dailyTokenSupply.length > 0) {
    // 使用原地排序减少内存分配
    const sortedAumData = [...dailyTokenSupply].sort(
      (a, b) => dayjs(a.date).valueOf() - dayjs(b.date).valueOf()
    );

    for (const item of sortedAumData) {
      const day = dayjs(item.date).format('YYYY-MM-DD');

      if (!dataByDate.has(day)) {
        dataByDate.set(day, {
          date: dayjs(day).format('MMM D'),
          timestamp: dayjs(day).valueOf(),
          holders: 0,
          aum: 0,
        });
      }
      const row = dataByDate.get(day) as ChartRow;
      row.aum = Number(item.aum_usd) || 0;
    }
  }

  // 按时间排序并进行前向填充
  const sortedRows = Array.from(dataByDate.values()).sort(
    (a, b) => a.timestamp - b.timestamp
  );

  // 优化前向填充逻辑
  for (let i = 1; i < sortedRows.length; i++) {
    const currentRow = sortedRows[i];
    const prevRow = sortedRows[i - 1];

    // 批量处理前向填充
    if (currentRow.holders === 0 && Number(prevRow.holders) > 0) {
      currentRow.holders = prevRow.holders;
    }
    if (currentRow.aum === 0 && Number(prevRow.aum) > 0) {
      currentRow.aum = prevRow.aum;
    }
  }

  return sortedRows
    .filter((item) => Number(item.aum) > 0 || Number(item.holders) > 0)
    .map((item) => {
      return {
        ...item,
        aum: Number(item.aum) > 0 ? item.aum : undefined,
        holders: Number(item.holders) > 0 ? item.holders : undefined,
      };
    });
}

export default function HoldersAndTvl({
  width,
  height,
}: {
  width: number;
  height: number;
}): JSX.Element | null {
  const { holdersData, dailyTokenSupply } = useXStockDetail();

  // 优化数据处理，添加依赖检查
  const chartData = useMemo(() => {
    if (
      (!holdersData || holdersData.length === 0) &&
      (!dailyTokenSupply || dailyTokenSupply.length === 0)
    ) {
      return [];
    }
    return buildChartData(holdersData, dailyTokenSupply);
  }, [holdersData, dailyTokenSupply]);

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
        <div className="card-title">{intl.stocks.Token_Holders_AUM}</div>
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
      <div className="card-title">{intl.stocks.Token_Holders_AUM}</div>
      <div
        className="chart"
        style={{
          width: width - (isMobile ? 20 : 32),
          height: height - (isMobile ? 36 : 48),
        }}
      >
        {isVisible && (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
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
                tickFormatter={formatNumberAxis}
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
                  backgroundColor: tooltipTheme.darkMode ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.95)',
                  border: tooltipTheme.darkMode ? '1px solid rgba(255, 255, 255, 0.2)' : '1px solid rgba(9, 45, 31, 0.12)',
                  borderRadius: '6px',
                }}
                content={<CustomTooltip />}
              />
              <Legend
                iconType="line"
                iconSize={11}
                wrapperStyle={{ fontSize: '11px', paddingTop: '20px' }}
              />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="holders"
                stroke="#6739D8"
                strokeWidth={3}
                dot={false}
                name="Token Holders"
                isAnimationActive={false}
                style={{ cursor: 'default' }}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="aum"
                stroke="#04BA6F"
                strokeWidth={3}
                dot={false}
                name="AUM"
                isAnimationActive={false}
                style={{ cursor: 'default' }}
              />
            </LineChart>
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

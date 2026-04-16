/* eslint-disable simple-import-sort/imports */
import React, { useMemo, useState, useEffect } from 'react';
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import styled from 'styled-components';

import { useThemeParams, ThemeType } from 'src/theme';
import { useIntl } from 'src/locals';
import { formatCurrencyAxis } from 'src/utils/format';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useInViewport } from '@mantine/hooks';
import { fetchDailyVolumeByAssets } from '../dashboard/service';
import { generateWatermarkCSS } from '../utils/watermark';

type ChartRow = {
  date: string; // formatted for x-axis
  timestamp: number; // for sorting
  volume: number;
};

function buildChartData(apiData: any[]): ChartRow[] {
  if (!Array.isArray(apiData) || apiData.length === 0) {
    return [];
  }

  const dataByDate = new Map<string, ChartRow>();

  // 优化数据处理循环
  for (const item of apiData) {
    const day = dayjs(item.date).format('YYYY-MM-DD');
    if (!dataByDate.has(day)) {
      dataByDate.set(day, {
        date: dayjs(day).format('MMM D'),
        timestamp: dayjs(day).valueOf(),
        volume: 0,
      });
    }
    const row = dataByDate.get(day) as ChartRow;
    row.volume = Number(item.volume_usd) || 0;
  }

  const result = Array.from(dataByDate.values()).sort(
    (a, b) => a.timestamp - b.timestamp
  );

  return result;
}

// 自定义 Tooltip 组件，一行显示2个token数据
const CustomTooltip = React.memo(({ active, payload, label }: any) => {
  if (!active || !payload || !payload.length) return null;
  const tooltipTheme = useThemeParams();

  const size = Math.ceil(payload.length / 2);
  return (
    <div
      style={{
        backgroundColor: tooltipTheme.darkMode
          ? 'rgba(0, 0, 0, 0.8)'
          : 'rgba(255, 255, 255, 0.95)',
        border: tooltipTheme.darkMode
          ? '1px solid rgba(255, 255, 255, 0.2)'
          : '1px solid rgba(9, 45, 31, 0.12)',
        borderRadius: '6px',
        padding: '8px 12px',
        fontSize: '11px',
        color: tooltipTheme.darkMode ? '#fff' : '#092d1f',
        maxWidth: '300px',
      }}
    >
      <div style={{ marginBottom: '4px', fontWeight: 'bold' }}>{label}</div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '4px 12px',
        }}
      >
        <div>
          {payload.slice(0, size).map((entry: any) => (
            <div
              key={entry.dataKey}
              style={{
                color: entry.color,
                display: 'flex',
                justifyContent: 'space-between',
                whiteSpace: 'nowrap',
              }}
            >
              <span style={{ marginRight: '8px' }}>{entry.name}:</span>
              <span>${entry.value.toLocaleString()}</span>
            </div>
          ))}
        </div>
        <div>
          {payload.slice(size).map((entry: any) => (
            <div
              key={entry.dataKey}
              style={{
                color: entry.color,
                display: 'flex',
                justifyContent: 'space-between',
                whiteSpace: 'nowrap',
              }}
            >
              <span style={{ marginRight: '8px' }}>{entry.dataKey}:</span>
              <span>${entry.value.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

export default function Volume({
  width,
  height,
  code,
}: {
  width: number;
  height: number;
  code: string;
}): JSX.Element | null {
  const intl = useIntl();
  const { data: apiData = [] } = useQuery({
    queryKey: ['ondo', 'dailyTransactionVolumeData', code],
    queryFn: () => fetchDailyVolumeByAssets(code),
  });
  const chartData = useMemo(() => {
    if (!apiData || apiData.length === 0) {
      return [];
    }
    return buildChartData(apiData);
  }, [apiData]);
  const { isMobile } = useThemeParams();

  // 优化图表尺寸计算
  const { chartWidth, chartHeight } = useMemo(
    () => ({
      chartWidth: width - (isMobile ? 20 : 32),
      chartHeight: height - (isMobile ? 36 : 48),
    }),
    [width, height, isMobile]
  );

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
        <div className="card-title">{intl.stocks.Trading_vol}</div>
        <div
          className="chart"
          style={{ width: width - 32, height: height - 48 }}
        ></div>
      </Card>
    );
  }

  return (
    <Card ref={ref} style={{ width, height }}>
      <div className="card-title">{intl.stocks.Trading_vol}</div>
      <div
        className="chart"
        style={{
          width: chartWidth,
          height: chartHeight,
        }}
      >
        {isVisible && (
          <ResponsiveContainer
            width={chartWidth}
            height={chartHeight}
            debounce={200}
            minWidth={100}
            minHeight={100}
          >
            <BarChart
              data={chartData}
              margin={{ left: 0, right: 0, top: 10, bottom: 0 }}
              barCategoryGap="10%"
              maxBarSize={50}
            >
              <XAxis
                dataKey="date"
                tick={{ fill: '#9aa3b2', fontSize: 12 }}
                axisLine={false}
                tickLine={false}
                interval="preserveStartEnd"
                minTickGap={20}
                tickMargin={5}
              />
              <YAxis
                tick={{ fill: '#9aa3b2', fontSize: 12 }}
                tickFormatter={formatCurrencyAxis}
                axisLine={false}
                tickLine={false}
                tickCount={6}
                tickMargin={5}
              />

              <Tooltip
                isAnimationActive={false}
                cursor={false}
                content={<CustomTooltip />}
              />
              <Bar
                dataKey="volume"
                fill="#0AB9FF"
                name="Trading Volume"
                isAnimationActive={false}
                style={{ cursor: 'default' }}
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </Card>
  );
}

const Card = styled.div`
  position: relative;
  &.full-screen {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 100;
    background-color: ${({ theme }) => theme.bg};
  }
  background: ${({ theme }) => theme.bg_white_08};
  border-radius: 8px;
  padding: ${({ theme }: { theme: ThemeType }) =>
    theme.isMobile ? '10px' : '16px'};
  .card-title {
    font-size: 16px;
    font-weight: 600;
    color: ${({ theme }) => theme.t_fff};
    margin-bottom: 8px;
    .dg-icon-wrapper {
      position: absolute;
      top: 5px;
      right: 5px;
    }
  }
  .chart {
    width: 100%;
    height: 320px;
    ${generateWatermarkCSS()}
  }
  .loading {
    color: ${(props) => props.theme.t_9aa3b2};
    font-size: 12px;
    margin-top: 8px;
  }
`;

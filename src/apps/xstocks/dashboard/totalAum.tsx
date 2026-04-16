import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useInViewport } from '@mantine/hooks';
import dayjs from 'dayjs';
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import styled from 'styled-components';

import IconWrapper from 'src/components/Icons/IconWrapper';
import TvExitFullScreen from 'src/components/Icons/tv_exitFullScreen';
import TvFullScreen from 'src/components/Icons/tv_fullScreen';
import { useIntl } from 'src/locals';
import { ThemeType, useThemeParams } from 'src/theme';
import { formatCurrencyAxis } from 'src/utils/format';

import { generateWatermarkCSS } from '../utils/watermark';
import { useDailyTokenSupply } from './hooks';

type ChartRow = {
  date: string; // formatted for x-axis
  timestamp: number; // for sorting
  aum_usd: number;
};

function buildChartData(
  apiData: { date: string; aum_usd: number }[]
): ChartRow[] {
  if (!Array.isArray(apiData) || apiData.length === 0) {
    return [];
  }
  const byDate = new Map<string, ChartRow>();

  // 优化数据处理逻辑
  for (const item of apiData) {
    if (!item.date || typeof item.aum_usd !== 'number') {
      // 跳过无效数据
      // eslint-disable-next-line no-continue
      continue;
    }

    const day = dayjs(item.date).format('YYYY-MM-DD');

    if (!byDate.has(day)) {
      byDate.set(day, {
        date: dayjs(day).format('MMM D'),
        timestamp: dayjs(day).valueOf(),
        aum_usd: item.aum_usd,
      });
    }
  }

  // 按时间排序
  const sortedRows = Array.from(byDate.values()).sort(
    (a, b) => a.timestamp - b.timestamp
  );

  // 优化填充缺失值逻辑（用上一日的值进行前向填充，若没有则为 0）
  const rows = sortedRows.map((row, index) => {
    const filledRow = { ...row };
    if (typeof filledRow.aum_usd !== 'number') {
      const previousRow = index > 0 ? sortedRows[index - 1] : undefined;
      const prev =
        previousRow && typeof previousRow.aum_usd === 'number'
          ? previousRow.aum_usd
          : 0;
      filledRow.aum_usd = prev;
    }
    return filledRow;
  });

  return rows.filter((item) => Number(item.aum_usd) > 0);
}

// 优化的自定义 Tooltip 组件
const CustomTooltip = React.memo(({ active, payload, label }: any) => {
  if (!active || !payload || !payload.length) return null;
  const tooltipTheme = useThemeParams();

  const value = payload[0].value as number;

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
      }}
    >
      <div style={{ marginBottom: '4px', fontWeight: 'bold' }}>{label}</div>
      <div style={{ color: '#55d29e' }}>
        Total AUM: ${value.toLocaleString()}
      </div>
    </div>
  );
});

export default function TotalAum({
  width,
  height,
  setIsFullScreen,
}: {
  width: number;
  height: number;
  setIsFullScreen?: (isFullScreen: boolean) => void;
}): JSX.Element | null {
  const { dailyTotalAumData } = useDailyTokenSupply();

  const [showFullScreen, setShowFullScreen] = useState<boolean>(false);
  const intl = useIntl();

  // 优化数据处理，添加依赖检查
  const rows = useMemo(() => {
    if (!dailyTotalAumData || dailyTotalAumData.length === 0) {
      return [];
    }

    return buildChartData(dailyTotalAumData);
  }, [dailyTotalAumData]);

  const {
    isMobile,
    viewWidth,
    windowHeight,
    darkMode: tooltipThemeDarkMode,
  } = useThemeParams();
  const tooltipTheme = { darkMode: tooltipThemeDarkMode };

  const [isVisible, setIsVisible] = useState(false);
  const { ref, inViewport } = useInViewport();

  useEffect(() => {
    if (inViewport && !isVisible) {
      setIsVisible(true);
    }
  }, [inViewport, isVisible]);

  // 缓存计算结果
  const { _width, _height } = useMemo(
    () => ({
      _width: showFullScreen ? viewWidth : width,
      _height: showFullScreen ? windowHeight : height,
    }),
    [showFullScreen, viewWidth, windowHeight, width, height]
  );

  // 优化回调函数，使用useCallback避免重新渲染
  const handleFullScreenToggle = useCallback(() => {
    setShowFullScreen((prev) => !prev);
    if (setIsFullScreen) setIsFullScreen(true);
  }, [setIsFullScreen]);

  const handleExitFullScreen = useCallback(() => {
    setShowFullScreen(false);
    if (setIsFullScreen) setIsFullScreen(false);
  }, [setIsFullScreen]);

  // 优化图表尺寸计算
  const { chartWidth, chartHeight } = useMemo(
    () => ({
      chartWidth: _width - (isMobile ? 20 : 32),
      chartHeight: _height - (isMobile ? 36 : 48),
    }),
    [_width, _height, isMobile]
  );

  // 早期返回，避免不必要的渲染
  if (!rows.length) {
    return (
      <Card ref={ref} style={{ width, height }}>
        <div className="card-title">Total AUM Trend</div>
        <div
          className="chart"
          style={{ width: width - 32, height: height - 48 }}
        ></div>
      </Card>
    );
  }

  return (
    <Card
      ref={ref}
      className={showFullScreen ? 'full-screen' : ''}
      style={{ width: _width, height: _height }}
    >
      <div className="card-title">
        {intl.stocks.total_aum}
        {!showFullScreen && (
          <IconWrapper size={32} onClick={handleFullScreenToggle}>
            <TvFullScreen />
          </IconWrapper>
        )}
        {showFullScreen && (
          <IconWrapper size={32} onClick={handleExitFullScreen}>
            <TvExitFullScreen />
          </IconWrapper>
        )}
      </div>
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
            <LineChart data={rows}>
              <XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
                interval="preserveStartEnd"
                minTickGap={20}
                tickMargin={5}
              />
              <YAxis
                tickFormatter={formatCurrencyAxis}
                axisLine={false}
                tickLine={false}
                tickCount={6}
                tickMargin={5}
              />
              <Tooltip
                isAnimationActive={false}
                cursor={false}
                contentStyle={{
                  fontSize: 11,
                  backgroundColor: tooltipTheme.darkMode
                    ? 'rgba(0, 0, 0, 0.8)'
                    : 'rgba(255, 255, 255, 0.95)',
                  border: tooltipTheme.darkMode
                    ? '1px solid rgba(255, 255, 255, 0.2)'
                    : '1px solid rgba(9, 45, 31, 0.12)',
                  borderRadius: '6px',
                  padding: '8px',
                }}
                content={<CustomTooltip />}
              />
              <Line
                type="monotone"
                dataKey="aum_usd"
                dot={false}
                strokeWidth={3}
                stroke="#55d29e"
                isAnimationActive={false}
                animationDuration={0}
                connectNulls={false}
              />
            </LineChart>
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
    display: flex;
    justify-content: space-between;
    align-items: center;
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

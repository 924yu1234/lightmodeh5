import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useInViewport } from '@mantine/hooks';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import {
  Bar,
  BarChart,
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
import { formatNumberAxis } from 'src/utils/format';

import { getSymbolColor } from '../utils/colors';
import { generateWatermarkCSS } from '../utils/watermark';
import { fetchDailyVolumeByAssets } from './service';

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
              <span style={{ marginRight: '8px' }}>{entry.dataKey}:</span>
              <span>{entry.value.toLocaleString()}</span>
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
              <span>{entry.value.toLocaleString()}</span>
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
  setIsFullScreen,
}: {
  width: number;
  height: number;
  setIsFullScreen?: (isFullScreen: boolean) => void;
}): JSX.Element | null {
  const intl = useIntl();
  const { data: apiData = [] } = useQuery({
    queryKey: ['ondo', 'dailyTransactionVolumeData'],
    queryFn: () => fetchDailyVolumeByAssets(),
  });
  const { tradesRows: rows = [], symbols = [] } = useMemo(() => {
    // 按日期分组数据，并计算每天的前20个 Symbol 和 others
    const tradesByDateGrouped = new Map<string, Map<string, number>>(); // Map<date, Map<symbol, traders>>
    const allDatesSet = new Set<string>();

    for (const item of apiData || []) {
      const day = dayjs(item.date).format('YYYY-MM-DD');
      const symbol = item.token_symbol;
      const traders = Number(item.traders) || 0;

      allDatesSet.add(day);

      if (!tradesByDateGrouped.has(day)) {
        tradesByDateGrouped.set(day, new Map<string, number>());
      }
      const dailyTradersMap = tradesByDateGrouped.get(day);
      if (dailyTradersMap) {
        dailyTradersMap.set(
          symbol,
          (dailyTradersMap.get(symbol) || 0) + traders
        );
      }
    }

    const sortedDates = Array.from(allDatesSet).sort();
    const processedTradesRows: any[] = [];
    const allSymbolsInChart = new Set<string>();

    for (const day of sortedDates) {
      const dailyTradersMap = tradesByDateGrouped.get(day);
      if (dailyTradersMap) {
        const sortedSymbolsForDay = Array.from(dailyTradersMap?.entries() || [])
          .sort(([, a], [, b]) => b - a)
          .slice(0, 20) // 取当天前20个
          .map(([symbol]) => symbol);

        const dailyRow: any = {
          date: dayjs(day).format('MMM D'),
          timestamp: dayjs(day).valueOf(),
        };
        let othersTraders = 0;

        for (const entry of Array.from(dailyTradersMap.entries())) {
          const [symbol, traders] = entry;
          if (sortedSymbolsForDay.includes(symbol)) {
            dailyRow[symbol] = traders;
            allSymbolsInChart.add(symbol);
          } else {
            othersTraders += traders;
          }
        }
        if (othersTraders > 0) {
          dailyRow.others = othersTraders;
          allSymbolsInChart.add('others');
        }
        processedTradesRows.push(dailyRow);
      }
    }

    // 最终的 symbols 列表，包含所有日期中出现过的 symbol 和 'others'
    const finalSymbols = Array.from(allSymbolsInChart).sort();

    // 填充缺失的 symbol 为 0
    const filledTradesRows = processedTradesRows.map((row) => {
      const filledRow = { ...row };
      return filledRow;
    });

    return { tradesRows: filledTradesRows, symbols: finalSymbols };
  }, [apiData]);

  const [showFullScreen, setShowFullScreen] = useState<boolean>(false);

  const { isMobile, viewWidth, windowHeight } = useThemeParams();

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

  const [isVisible, setIsVisible] = useState(false);
  const { ref, inViewport } = useInViewport();
  useEffect(() => {
    if (inViewport && !isVisible) {
      setIsVisible(true);
    }
  }, [inViewport, isVisible]);

  // 早期返回，避免不必要的渲染
  if (!rows.length || !symbols.length) {
    return (
      <Card ref={ref} style={{ width, height }}>
        <div className="card-title">
          {intl.stocks.Daily_Trading_Accounts_per_Stock}
        </div>
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
        {intl.stocks.Daily_Trading_Accounts_per_Stock}
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
            <BarChart
              data={rows}
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
                tickFormatter={formatNumberAxis}
                axisLine={false}
                tickLine={false}
                tickCount={6}
                tickMargin={5}
              />
              {/* <Legend
              layout="vertical"
              verticalAlign="top"
              align="right"
              iconSize={11}
              wrapperStyle={{ fontSize: '11px' }}
            /> */}
              <Tooltip
                isAnimationActive={false}
                cursor={false}
                content={<CustomTooltip />}
              />
              {symbols.map((sym: string) => (
                <Bar
                  key={sym}
                  dataKey={sym}
                  stackId="volume"
                  fill={getSymbolColor(sym)}
                  isAnimationActive={false}
                  animationDuration={0}
                  style={{ cursor: 'default' }}
                />
              ))}
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

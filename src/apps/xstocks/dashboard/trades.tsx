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
import { useXStocks } from './dataProvider';
import {
  DailyTransactionVolumeApiItem,
  getDailyTransactionVolumeByAssets,
} from './service';

type ChartRow = {
  date: string; // formatted for x-axis
  timestamp: number; // for sorting
  [symbol: string]: string | number;
};

function buildChartData(apiData: DailyTransactionVolumeApiItem[]): {
  rows: ChartRow[];
  symbols: string[];
} {
  if (!Array.isArray(apiData) || apiData.length === 0) {
    return { rows: [], symbols: [] };
  }

  const symbolsSet = new Set<string>();
  const byDate = new Map<string, ChartRow>();

  // 预分配对象以提高性能
  for (const item of apiData) {
    const day = dayjs(item.date).format('YYYY-MM-DD');
    const symbol = item.token_symbol;

    if (!symbol) {
      // 跳过无效数据
      // eslint-disable-next-line no-continue
      continue;
    }

    symbolsSet.add(symbol);

    if (!byDate.has(day)) {
      byDate.set(day, {
        date: dayjs(day).format('MMM D'),
        timestamp: dayjs(day).valueOf(),
      });
    }
    const row = byDate.get(day) as ChartRow;
    row[symbol] = Number(item.transactions) + Number(row[symbol] || 0);
  }

  const symbols = Array.from(symbolsSet).sort();

  // 填充缺失值为 0（不需要前向填充，因为没有交易量就是 0）
  const rows = Array.from(byDate.values())
    .sort((a, b) => a.timestamp - b.timestamp)
    .map((row) => {
      for (const symbol of symbols) {
        if (typeof row[symbol] !== 'number') {
          row[symbol] = 0;
        }
      }
      return row;
    });

  const result = { rows, symbols };

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
        backgroundColor: tooltipTheme.darkMode ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.95)',
        border: tooltipTheme.darkMode ? '1px solid rgba(255, 255, 255, 0.2)' : '1px solid rgba(9, 45, 31, 0.12)',
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

export default function Trades({
  width,
  height,
  setIsFullScreen,
}: {
  width: number;
  height: number;
  setIsFullScreen?: (isFullScreen: boolean) => void;
}): JSX.Element | null {
  const { data: rawDailyTransactionVolumeData = [] } = useQuery<
    DailyTransactionVolumeApiItem[]
  >({
    queryKey: ['xstocks', 'dailyTransactionVolumeData'],
    queryFn: () => getDailyTransactionVolumeByAssets(),
  });

  const { stockCodeMap, codesString } = useXStocks();

  const dailyTransactionVolumeData = useMemo(() => {
    if (!rawDailyTransactionVolumeData || codesString.length === 0) return [];
    const codes = codesString.split(',');
    return (rawDailyTransactionVolumeData || [])
      .filter((item: any) => codes.includes(item.token_address))
      .map((item: any) => ({
        ...item,
        token_symbol: stockCodeMap[item.token_address],
      }));
  }, [rawDailyTransactionVolumeData, codesString, stockCodeMap]);
  const [showFullScreen, setShowFullScreen] = useState<boolean>(false);

  // 优化数据处理，添加依赖检查
  const { rows, symbols } = useMemo(() => {
    if (
      !dailyTransactionVolumeData ||
      dailyTransactionVolumeData.length === 0
    ) {
      return { rows: [], symbols: [] };
    }

    const chartData = buildChartData(dailyTransactionVolumeData);
    // 按字母顺序排序 symbols
    const sortedSymbols = chartData.symbols.sort();
    return {
      ...chartData,
      symbols: sortedSymbols,
    };
  }, [dailyTransactionVolumeData]);

  const { isMobile, viewWidth, windowHeight } = useThemeParams();
  const intl = useIntl();

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
        <div className="card-title">{intl.stocks.Trades_per_Stock}</div>
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
        {intl.stocks.Trades_per_Stock}
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
          width: _width - (isMobile ? 20 : 32),
          height: _height - (isMobile ? 36 : 48),
        }}
      >
        {isVisible && (
          <ResponsiveContainer
            width={_width - (isMobile ? 20 : 32)}
            height={_height - (isMobile ? 36 : 48)}
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
              {symbols.map((sym) => (
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
    line-height: 24px;
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

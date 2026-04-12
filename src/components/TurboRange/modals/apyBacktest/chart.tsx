import React, { useCallback, useMemo } from 'react';
import dayjs from 'dayjs';
import {
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import styled from 'styled-components';

import { useIntl } from 'src/locals';

type PricePoint = {
  timestamp: number;
  price: number;
};

type SegmentedPoint = PricePoint & {
  inRangePrice: number | null;
  outRangePrice: number | null;
};

export type ApyBacktestChartProps = {
  minPrice?: number | string;
  maxPrice?: number | string;
  data?: PricePoint[];
  height?: number;
  historyType: 'day' | 'week' | 'month';
  showDecimals: number;
};

function toMillis(ts: number) {
  return ts < 1e12 ? ts * 1000 : ts;
}

function formatTickLabel(
  value: number,
  historyType: ApyBacktestChartProps['historyType']
) {
  if (historyType === 'day') {
    return dayjs(toMillis(value)).format('H');
  }
  return dayjs(toMillis(value)).format('MM-DD');
}

function isFiniteNumber(n: unknown): n is number {
  return typeof n === 'number' && Number.isFinite(n);
}

function formatTooltipTime(
  ts: number,
  historyType: ApyBacktestChartProps['historyType']
) {
  const ms = toMillis(ts);
  if (historyType === 'day') {
    return dayjs(ms).format('MM-DD HH:mm');
  }
  return dayjs(ms).format('YYYY-MM-DD HH:mm');
}

function buildSegmentedData(
  raw: PricePoint[],
  minPrice: number,
  maxPrice: number
): SegmentedPoint[] {
  const data = raw
    .filter((d) => isFiniteNumber(d?.timestamp) && isFiniteNumber(d?.price))
    .slice()
    .sort((a, b) => a.timestamp - b.timestamp);

  if (data.length === 0) return [];

  const isInRange = (p: number) => p >= minPrice && p <= maxPrice;
  const between = (boundary: number, a: number, b: number) =>
    (a - boundary) * (b - boundary) <= 0;

  const out: SegmentedPoint[] = [];

  const pushPoint = (pt: PricePoint, forceBoth = false) => {
    const inRange = isInRange(pt.price);
    let inRangePrice: number | null = null;
    let outRangePrice: number | null = null;

    if (forceBoth) {
      inRangePrice = pt.price;
      outRangePrice = pt.price;
    } else if (inRange) {
      inRangePrice = pt.price;
    } else {
      outRangePrice = pt.price;
    }

    out.push({
      ...pt,
      inRangePrice,
      outRangePrice,
    });
  };

  pushPoint(data[0]);

  for (let i = 1; i < data.length; i += 1) {
    const prev = data[i - 1];
    const curr = data[i];
    const prevIn = isInRange(prev.price);
    const currIn = isInRange(curr.price);

    if (prevIn !== currIn) {
      // 在边界处插一个点，让绿/黄两条线在切换处无缝衔接
      const candidates: number[] = [];
      if (between(minPrice, prev.price, curr.price)) candidates.push(minPrice);
      if (between(maxPrice, prev.price, curr.price)) candidates.push(maxPrice);
      const boundary =
        candidates.length === 1
          ? candidates[0]
          : // 极端跳变可能同时跨越两个边界；此处取更接近 prev 的边界即可（示意图足够）
            candidates.sort(
              (a, b) => Math.abs(a - prev.price) - Math.abs(b - prev.price)
            )[0];

      if (isFiniteNumber(boundary) && curr.price !== prev.price) {
        const t = (boundary - prev.price) / (curr.price - prev.price);
        const ts = prev.timestamp + t * (curr.timestamp - prev.timestamp);
        if (Number.isFinite(ts)) {
          pushPoint({ timestamp: ts, price: boundary }, true);
        }
      }
    }

    pushPoint(curr);
  }

  return out;
}

const ACTIVE_DOT = {
  r: 4,
  fill: '#ffffff',
  stroke: 'rgba(0,0,0,0.35)',
  strokeWidth: 1,
} as const;

export default function ApyBacktestChart(props: ApyBacktestChartProps) {
  const intl = useIntl();
  const minPriceRaw = Number(props.minPrice);
  const maxPriceRaw = Number(props.maxPrice);
  const historyType = props.historyType;
  const showDecimals = props.showDecimals;
  const [minPrice, maxPrice] = useMemo(() => {
    // 兼容用户传反的情况
    const min = Math.min(minPriceRaw ?? 0, maxPriceRaw ?? 0);
    const max = Math.max(minPriceRaw ?? 0, maxPriceRaw ?? 0);
    return [min, max] as const;
  }, [minPriceRaw, maxPriceRaw]);
  const height = props.height ?? 140;
  const rawData = props.data;

  const rows = useMemo(
    () => buildSegmentedData(rawData ?? [], minPrice, maxPrice),
    [rawData, minPrice, maxPrice]
  );

  const yDomain = useMemo(() => {
    if (!rows.length) return [minPrice, maxPrice] as [number, number];
    let min = Number.POSITIVE_INFINITY;
    let max = Number.NEGATIVE_INFINITY;
    for (const r of rows) {
      if (typeof r.price === 'number') {
        min = Math.min(min, r.price);
        max = Math.max(max, r.price);
      }
    }
    // 强制把 minPrice / maxPrice 包进 domain，避免极端值导致 referenceLine / ticks 不显示
    const domainMin = Math.min(min, minPrice);
    const domainMax = Math.max(max, maxPrice);

    // 给上下留一点边距，避免贴边
    const pad = Math.max((domainMax - domainMin) * 0.08, 1);
    return [domainMin - pad, domainMax + pad] as [number, number];
  }, [rows, minPrice, maxPrice]);

  const renderTooltip = useCallback(
    (tooltipProps: {
      active?: boolean;
      payload?: ReadonlyArray<{ payload?: SegmentedPoint }>;
    }) => {
      const { active, payload } = tooltipProps;
      if (!active || !payload?.length) return null;
      const row = payload[0]?.payload;
      if (!row || !isFiniteNumber(row.price)) return null;

      return (
        <TooltipBox>
          <TooltipTime>
            {formatTooltipTime(row.timestamp, historyType)}
          </TooltipTime>
          <TooltipPriceRow>
            <span>{intl.price}</span>
            <TooltipPriceValue>
              {Number(row.price).toFixed(showDecimals)}
            </TooltipPriceValue>
          </TooltipPriceRow>
        </TooltipBox>
      );
    },
    [historyType, intl.price, showDecimals]
  );

  return (
    <ChartWrapper>
      <ResponsiveContainer width="100%" height={height}>
        <LineChart
          data={rows}
          margin={{ top: 12, right: 8, left: 6, bottom: 6 }}
        >
          <XAxis
            dataKey="timestamp"
            type="number"
            domain={['dataMin', 'dataMax']}
            tickFormatter={(v) => formatTickLabel(v, historyType)}
            axisLine={false}
            tickLine={false}
            tick={{ fill: ' #B7BDC6', fontSize: 12 }}
            minTickGap={6}
            tickCount={5}
            interval="preserveStartEnd"
            tickMargin={10}
          />
          <YAxis
            orientation="right"
            domain={yDomain}
            ticks={maxPrice > minPrice ? [minPrice, maxPrice] : [minPrice]}
            tickFormatter={(v) => Number(v).toFixed(showDecimals)}
            axisLine={false}
            tickLine={false}
            tick={{ fill: ' #B7BDC6', fontSize: 12 }}
            width={55}
            tickMargin={5}
          />

          <Tooltip
            content={renderTooltip}
            cursor={{
              stroke: 'rgba(255,255,255,0.22)',
              strokeWidth: 1,
            }}
            isAnimationActive={false}
            allowEscapeViewBox={{ x: false, y: true }}
          />

          <ReferenceLine
            y={minPrice}
            stroke="rgba(255,255,255,0.14)"
            strokeWidth={1}
          />

          <ReferenceLine
            y={maxPrice}
            stroke="rgba(255,255,255,0.14)"
            strokeWidth={1}
          />

          {/* in-range：绿色 */}
          <Line
            type="monotone"
            dataKey="inRangePrice"
            stroke="#38d39f"
            strokeWidth={1.5}
            dot={false}
            activeDot={ACTIVE_DOT}
            connectNulls={false}
            isAnimationActive={false}
          />
          {/* out-of-range：黄色 */}
          <Line
            type="monotone"
            dataKey="outRangePrice"
            stroke="#f2c94c"
            strokeWidth={1.5}
            dot={false}
            activeDot={ACTIVE_DOT}
            connectNulls={false}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartWrapper>
  );
}

const ChartWrapper = styled.div`
  width: 100%;
  box-sizing: border-box;
  border-radius: 12px;
  background: ${({ theme }) => theme.bg_white_05};
  padding: 10px 10px 6px;

  user-select: none;
  cursor: crosshair;
  .recharts-wrapper,
  .recharts-surface {
    outline: none;
  }
  .recharts-wrapper {
    touch-action: none;
  }
`;

const TooltipBox = styled.div`
  padding: 8px 10px;
  border-radius: 8px;
  background: ${({ theme }) => theme.modalBg};
  border: 1px solid ${({ theme }) => theme.border_white_10};
  box-shadow: ${({ theme }) => theme.boxShadow};
  min-width: 120px;
`;

const TooltipTime = styled.div`
  ${({ theme }) => theme.fontRegular};
  font-size: 12px;
  line-height: 16px;
  color: ${({ theme }) => theme.t_b7b_80};
  margin-bottom: 4px;
`;

const TooltipPriceRow = styled.div`
  ${({ theme }) => theme.fontMedium};
  font-size: 13px;
  line-height: 18px;
  color: ${({ theme }) => theme.t_fff_90};
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 12px;
`;

const TooltipPriceValue = styled.span`
  ${({ theme }) => theme.fontMedium};
  color: ${({ theme }) => theme.t_fff};
  font-variant-numeric: tabular-nums;
`;

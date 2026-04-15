import React, { useMemo } from 'react';
import dayjs from 'dayjs';
import { Bar, BarChart, ResponsiveContainer, YAxis } from 'recharts';
import styled from 'styled-components';

import {
  HourlyBreakdownRow,
  TurboRangePosition,
} from 'src/state/turboRange/reducer';
import { formatTurboRangeAPY } from 'src/state/turboRange/utils';
import { ThemeType } from 'src/theme';
import { formatUsd } from 'src/utils/format';

import { useIntl } from 'js/locals';

export default function HourlyBreakdownContent({
  position,
}: {
  position: TurboRangePosition;
}) {
  const intl = useIntl();

  const breakdownRows = useMemo(() => {
    return position.hourlyBreakdown || [];
  }, [position.hourlyBreakdown]);

  const overall24hApy = useMemo(() => {
    return formatTurboRangeAPY(position.last24hApy);
  }, [position.last24hApy]);

  const overall24hApyNum = Number(position.last24hApy) || 0;

  const chartData = useMemo(() => {
    return [...breakdownRows].reverse().map((row) => ({
      apy: Number(row.apy) || 0,
    }));
  }, [breakdownRows]);

  return (
    <StyledBreakdown>
      <div className="chart-section">
        <ResponsiveContainer width="100%" height={120}>
          <BarChart
            data={chartData}
            margin={{ left: 0, right: 0, top: 5, bottom: 0 }}
            barCategoryGap="15%"
          >
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: '#b7b7ce' }}
              tickFormatter={(v: number) => `${v.toFixed(0)}%`}
              width={40}
            />
            <Bar
              dataKey="apy"
              fill="#00d395"
              isAnimationActive={false}
              radius={[2, 2, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="overall-apy">
        <span className="overall-label">{intl.turboRange.overall_24h_apy}</span>
        <span className="overall-value">{overall24hApy}</span>
      </div>
      <div className="breakdown-list">
        {breakdownRows.map((row) => (
          <BreakdownRow
            key={row.hour_ts}
            row={row}
            overall24hApyNum={overall24hApyNum}
            intl={intl}
          />
        ))}
      </div>
    </StyledBreakdown>
  );
}

function BreakdownRow({
  row,
  overall24hApyNum,
  intl,
}: {
  row: HourlyBreakdownRow;
  overall24hApyNum: number;
  intl: any;
}) {
  const timeLabel = useMemo(() => {
    if (row.is_partial) {
      const start = dayjs(row.hour_ts).format('HH:mm');
      return intl.turboRange.xx_until_now.replace('XX', start);
    }
    const start = dayjs(row.hour_ts).format('HH:00');
    const end = dayjs(row.end_ts).format('HH:00');
    return `${start} - ${end}`;
  }, [row, intl.turboRange.xx_until_now]);

  const apyFormatted = formatTurboRangeAPY(row.apy);
  const yieldFormatted = formatUsd(row.yield_usd);
  const apyNum = Number(row.apy) || 0;
  const isBold = overall24hApyNum > 0 && apyNum >= overall24hApyNum * 3;

  return (
    <div className="breakdown-row">
      <div className="row-time">{timeLabel}</div>
      <div className="row-yield">{yieldFormatted}</div>
      <div className={`row-apy ${isBold ? 'bold' : ''}`}>{apyFormatted}</div>
    </div>
  );
}

const StyledBreakdown = styled.div`
  .chart-section {
    margin-bottom: 15px;
    .recharts-wrapper {
      pointer-events: auto;
    }
  }
  .overall-apy {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
    padding-bottom: 10px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    .overall-label {
      font-size: 14px;
      color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_80};
    }
    .overall-value {
      font-size: 14px;
      ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
      color: ${({ theme }: { theme: ThemeType }) => theme.green};
    }
  }
  .breakdown-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
    max-height: 400px;
    overflow-y: auto;
  }
  .breakdown-row {
    display: flex;
    align-items: center;
    gap: 10px;
    .row-time {
      flex: 1;
      font-size: 13px;
      color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_80};
    }
    .row-yield {
      font-size: 13px;
      color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
      min-width: 60px;
      text-align: right;
    }
    .row-apy {
      font-size: 13px;
      color: ${({ theme }: { theme: ThemeType }) => theme.green};
      min-width: 60px;
      text-align: right;
      &.bold {
        ${({ theme }: { theme: ThemeType }) => theme.fontBold};
      }
    }
  }
`;

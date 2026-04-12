import React, { useMemo } from 'react';
import styled from 'styled-components';

import { useIntl } from 'src/locals';
import { formatTurboRangeAPY } from 'src/state/turboRange/utils';
import { ThemeType } from 'src/theme';

type HistoryType = 'day' | 'week' | 'month';

type RangeStatus = 'in-range' | 'partially-in-range' | 'out-of-range';

type DetailRow = {
  timestamp: number;
  range_status: RangeStatus;
  apy: number;
};

function useMeta(historyType: HistoryType) {
  const intl = useIntl();
  return useMemo(() => {
    if (historyType === 'day') {
      return {
        prefix: intl.time_H_h.replace('H', '24'),
        overallKey: 'apy_24h' as const,
        detailKey: 'apy_24h_detail' as const,
      };
    }
    if (historyType === 'week') {
      return {
        prefix: intl.time_D_d.replace('D', '7'),
        overallKey: 'apy_7d' as const,
        detailKey: 'apy_7d_detail' as const,
      };
    }
    return {
      prefix: intl.time_D_d.replace('D', '30'),
      overallKey: 'apy_30d' as const,
      detailKey: 'apy_30d_detail' as const,
    };
  }, [historyType, intl]);
}

function buildTimeLabel(historyType: HistoryType, idx: number, intl: any) {
  if (historyType === 'day') {
    if (idx === 0) return intl.time_last_hour;
    return intl.TIME_ago.replace('TIME', intl.time_H_h.replace('H', idx + 1));
  }
  if (idx === 0) return intl.time_last_24_hrs;
  return intl.TIME_ago.replace('TIME', intl.time_D_day.replace('D', idx + 1));
}

function statusText(intl: any, status?: RangeStatus) {
  if (status === 'in-range') return intl.turboRange.In_range;
  if (status === 'partially-in-range') {
    return intl.turboRange.Partially_in_range;
  }
  if (status === 'out-of-range') return intl.turboRange.Out_of_range;
  return '--';
}

export default function BacktestApy({
  resp,
  historyType,
}: {
  resp?: any;
  historyType: HistoryType;
}) {
  const intl = useIntl();
  const meta = useMeta(historyType);

  const overallApy = resp ? (resp as any)[meta.overallKey] : undefined;
  const detailsRaw = (resp ? (resp as any)[meta.detailKey] : []) as DetailRow[];

  const details = Array.isArray(detailsRaw) ? detailsRaw : [];
  const rows = details;

  return (
    <StyledApy>
      <div className="overall">
        <div className="overall-title">
          {intl.turboRange.XXX_Overall_APY.replace('XXX', meta.prefix)}
        </div>
        <div className="overall-value">{formatTurboRangeAPY(overallApy)}</div>
      </div>
      {details.length > 0 && <div className="divider" />}
      <div className="table">
        {rows.map((r, idx) => {
          let rangeStatus = r.range_status;
          if (rangeStatus === 'out-of-range' && Number(r.apy) > 0) {
            rangeStatus = 'partially-in-range';
          }
          return (
            <div className="row" key={r.timestamp ?? idx}>
              <div className="time">
                {buildTimeLabel(historyType, idx, intl)}
              </div>
              <div className="status">{statusText(intl, rangeStatus)}</div>
              <div className="apy" data-status={rangeStatus}>
                {formatTurboRangeAPY(r.apy)}
              </div>
            </div>
          );
        })}
      </div>
    </StyledApy>
  );
}

const StyledApy = styled.div`
  width: 100%;
  margin-top: 25px;

  .overall {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    font-size: 14px;
    ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
    line-height: 18px;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_80};
    .overall-value {
      color: ${({ theme }: { theme: ThemeType }) => theme.green};
    }
  }

  .divider {
    margin: 15px 0;
    height: 1px;
    background: ${({ theme }) => theme.bg_white_08};
  }

  .table {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .row {
    display: grid;
    grid-template-columns: 110px 1fr 90px;
    align-items: center;
    column-gap: 10px;
    font-size: 14px;
    line-height: 16px;
    ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
    .time {
      color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_80};
    }
    .status {
      color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_80};
    }
    .apy {
      ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
      text-align: right;
      color: ${({ theme }: { theme: ThemeType }) => theme.green};
    }
    .apy[data-status='out-of-range'] {
      color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b};
    }
    .apy[data-status='partially-in-range'] {
      color: ${(props) => props.theme.t_b8e369};
    }
  }
`;

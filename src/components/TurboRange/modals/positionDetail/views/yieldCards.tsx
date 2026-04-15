import React, { useMemo } from 'react';
import styled from 'styled-components';

import { Tooltip } from 'src/UI';

import IconInfo from 'src/components/Icons/info';
import { TurboRangePosition } from 'src/state/turboRange/reducer';
import { ThemeType } from 'src/theme';

import { useIntl } from 'js/locals';

export default function YieldCards({
  position,
}: {
  position: TurboRangePosition;
}) {
  const intl = useIntl();

  const allTimeApyValue = useMemo(() => {
    return position.duration >= 4 * 60 * 60 * 1000
      ? position.apy_display
      : '--';
  }, [position.apy_display, position.duration]);

  const hasNoHourlyData = useMemo(() => {
    const breakdown = position.hourlyBreakdown || [];
    const completeHours = breakdown.filter((r) => !r.is_partial);
    return completeHours.length === 0;
  }, [position.hourlyBreakdown]);

  return (
    <StyledYieldCards className="yield-cards">
      <div className="yield-info">
        <div className="yield-info-value">{position.totalYield_display}</div>
        <div className="yield-info-title">{intl.turboRange.all_time_yield}</div>
      </div>
      <div className="yield-info">
        <div className="yield-info-value">{allTimeApyValue}</div>
        <div className="yield-info-title with-info">
          {intl.turboRange.all_time_apy}
          {position.duration < 4 * 60 * 60 * 1000 && (
            <Tooltip
              label={intl.turboRange.will_be_calculated_on_DATE.replace(
                'DATE',
                new Date(position.allTimeApyCalculatedTime).toLocaleString()
              )}
              position="bottom"
              events={{ hover: true, touch: true, focus: false }}
            >
              <div className="yield-info-icon">
                <IconInfo />
              </div>
            </Tooltip>
          )}
        </div>
      </div>
      <div className="yield-info">
        <div
          className={`yield-info-value ${
            Number(position.last24hYield) > 0 ? 'color-green' : ''
          }`}
        >
          {hasNoHourlyData ? '--' : position.last24hYield_display}
        </div>
        <div className="yield-info-title with-info">
          {intl.turboRange.last_24h_yield}
          {hasNoHourlyData && (
            <Tooltip
              label={intl.turboRange.will_be_calculated_on_DATE.replace(
                'DATE',
                new Date(
                  position.firstYesterdayApyCalculatedTime
                ).toLocaleString()
              )}
              position="bottom"
              events={{ hover: true, touch: true, focus: false }}
            >
              <div className="yield-info-icon">
                <IconInfo />
              </div>
            </Tooltip>
          )}
        </div>
      </div>
      <div className="yield-info">
        <div
          className={`yield-info-value ${
            Number(position.last24hApy) > 0 ? 'color-green' : ''
          }`}
        >
          {hasNoHourlyData ? '--' : position.last24hApy_display}
        </div>
        <div className="yield-info-title with-info">
          {intl.turboRange.last_24h_apy}
          {hasNoHourlyData && (
            <Tooltip
              label={intl.turboRange.will_be_calculated_on_DATE.replace(
                'DATE',
                new Date(
                  position.firstYesterdayApyCalculatedTime
                ).toLocaleString()
              )}
              position="bottom"
              events={{ hover: true, touch: true, focus: false }}
            >
              <div className="yield-info-icon">
                <IconInfo />
              </div>
            </Tooltip>
          )}
        </div>
      </div>
    </StyledYieldCards>
  );
}

const StyledYieldCards = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  margin-bottom: 15px;
  background: ${({ theme }: { theme: ThemeType }) => theme.bg_white_02};
  border: 1px solid
    ${({ theme }: { theme: ThemeType }) => theme.border_white_07};
  border-radius: 8px;
  padding: 15px;
  .yield-info {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
    .yield-info-title {
      font-size: 12px;
      line-height: 18px;
      color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_80};
      opacity: 0.8;
      &.with-info {
        display: flex;
        align-items: center;
        gap: 3px;
      }
    }
    .yield-info-icon {
      display: flex;
      align-items: center;
      .icon-info {
        color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_80};
      }
    }
    .yield-info-value {
      font-size: 18px;
      line-height: 16px;
      margin-bottom: 5px;
      ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
      color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
      &.color-green {
        color: ${({ theme }: { theme: ThemeType }) => theme.green};
      }
    }
  }
`;

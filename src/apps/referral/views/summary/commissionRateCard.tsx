import React from 'react';
import styled from 'styled-components';

import { Tooltip } from 'src/UI';

import IconInfo from 'src/components/Icons/info';
import { useIntl } from 'src/locals';
import { ThemeType } from 'src/theme';
import digit from 'src/utils/digit';

interface CommissionRateCardProps {
  level1Rate: string | number;
  swapLevel2Rate: string | number;
  turboRangeRate: string | number;
  turboRangeLevel2Rate: string | number;
}

export default function CommissionRateCard({
  level1Rate,
  swapLevel2Rate,
  turboRangeRate,
  turboRangeLevel2Rate,
}: CommissionRateCardProps) {
  const intl = useIntl();

  return (
    <StyledCommissionRateCard className="section-card rate-card">
      <div className="section-title rate-title">
        {intl.Commission_Rate}
        <Tooltip
          label={intl.referral_commission_rate_tips}
          withinPortal={false}
        >
          <span className="info-icon">
            <IconInfo size={14} />
          </span>
        </Tooltip>
      </div>

      <table className="rate-table">
        <thead>
          <tr>
            <th> </th>
            <th>{intl.Swap}</th>
            <th>{intl.turboRange.Turbo_Range}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{intl.Level_1}</td>
            <td>
              {intl.referral_trading_fee} * {digit.format(level1Rate, '0.##%')}
            </td>
            <td>
              {intl.yield} * {digit.format(turboRangeRate, '0.##%')}
            </td>
          </tr>
          <tr>
            <td>{intl.Level_2}</td>
            <td>
              {intl.referral_level_1_commission} *{' '}
              {digit.format(swapLevel2Rate, '0.##%')}
            </td>
            <td>
              {intl.referral_level_1_commission} *{' '}
              {digit.format(turboRangeLevel2Rate, '0.##%')}
            </td>
          </tr>
        </tbody>
      </table>
    </StyledCommissionRateCard>
  );
}

const StyledCommissionRateCard = styled.div`
  .rate-title {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .info-icon {
    display: inline-flex;
    align-items: center;
    cursor: pointer;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff_60};
  }

  .rate-table {
    width: 100%;
    border-collapse: collapse;
    ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
    font-size: 14px;
    line-height: 18px;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};

    thead th {
      background: ${({ theme }: { theme: ThemeType }) => theme.bg_white_10};
      color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b};
      padding: 10px 15px;
      text-align: left;
      vertical-align: middle;
      word-break: break-word;
      &:first-child {
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
      }
      &:last-child {
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
      }
    }

    td {
      padding: 15px 15px;
      text-align: left;
      vertical-align: middle;
      word-break: break-word;
    }

    tbody td:first-child {
      color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
    }

    tr:last-child td {
      border-bottom: 0;
    }
  }
`;

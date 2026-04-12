import React from 'react';
import styled from 'styled-components';

import DeTooltip from 'src/components/DeTooltip';
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
        <DeTooltip title={intl.referral_commission_rate_tips}>
          <>
            {intl.Commission_Rate}
            <span className="info-icon">
              <IconInfo size={14} />
            </span>
          </>
        </DeTooltip>
      </div>
      <table className="rate-table">
        <thead>
          <tr>
            <th> </th>
            <th>{intl.Level_1}</th>
            <th>{intl.Level_2}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{intl.Swap}</td>
            <td>
              {intl.referral_trading_fee} * {digit.format(level1Rate, '0.##%')}
            </td>
            <td>
              {intl.referral_level_1_commission} *{' '}
              {digit.format(swapLevel2Rate, '0.##%')}
            </td>
          </tr>
          <tr>
            <td>{intl.turboRange.Turbo_Range}</td>
            <td>
              {intl.yield} * {digit.format(turboRangeRate, '0.##%')}
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
    margin-left: 4px;
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
      color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b};
      border-bottom: 1px solid rgba(183, 189, 198, 0.15);
    }

    th,
    td {
      padding: 20px 5px 10px 0;
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

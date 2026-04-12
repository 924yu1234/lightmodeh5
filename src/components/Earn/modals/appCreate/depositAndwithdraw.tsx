import React from 'react';
import styled from 'styled-components';

import EstNetworkFeeInConfirm from 'src/components/EstNetworkFee/inConfirm';
import { EarnOrderParams } from 'src/constants/interface';
import { useIntl } from 'src/locals';
import { ThemeType } from 'src/theme';

export default function DepositAndWithdrawView({
  tryResp,
  order,
}: {
  tryResp: any;
  order: EarnOrderParams;
}) {
  const intl = useIntl();
  const { amount, type, dailyRewards, vault } = order as EarnOrderParams;
  const { protocol, name, token } = vault;

  return (
    <StyledOrder>
      <div className="type">
        {type === 'deposit' ? intl.Deposit : intl.Withdraw}
      </div>
      <div className="amount">
        {amount} {token?.symbol}
      </div>
      <div className="protocol">
        {protocol} | {name}
      </div>
      {type === 'deposit' && (
        <div className="item">
          <div className="label">{intl.Est_Daily_Rewards}</div>
          <div className="value">{dailyRewards}</div>
        </div>
      )}
      <div className="item">
        <div className="label">{intl.est_network_fee}</div>
        <div className="value gas-fee">
          <EstNetworkFeeInConfirm tryResp={tryResp} />
        </div>
      </div>
    </StyledOrder>
  );
}

const StyledOrder = styled.div`
  width: 100%;
  ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
  display: flex;
  flex-direction: column;
  align-items: center;

  .type {
    font-size: 14px;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff_80};
    line-height: 20px;
    margin-bottom: 6px;
  }
  .amount {
    font-size: 18px;
    ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
    line-height: 24px;
    margin-bottom: 3px;
  }

  .protocol {
    font-size: 14px;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_60};
    line-height: 20px;
    margin-bottom: 30px;
  }

  .item {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 15px;
    .label {
      font-size: 14px;
      color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_80};
      line-height: 20px;
    }
    .value {
      font-size: 14px;
      color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
      line-height: 20px;
    }
  }

  .modal-title {
    margin-bottom: 32px;
  }

  .dg-primary {
    margin-top: 30px;
    width: 100%;
  }
`;

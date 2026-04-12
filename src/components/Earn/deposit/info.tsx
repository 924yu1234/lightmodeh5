import React from 'react';
import styled from 'styled-components';

import EstNetworkFee from 'src/components/EstNetworkFee';
import { useIntl } from 'src/locals';
import { ThemeType } from 'src/theme';
import { isNumber } from 'src/utils/digit';

import { useVaultDeposit } from './dataProvider';

export default function EarnDepositInfo() {
  const { amount, dailyRewards, tryResp, doTry } = useVaultDeposit();
  const intl = useIntl();
  if (!isNumber(amount) || !amount || !Number(amount)) return <StyledInfo />;

  return (
    <StyledInfo>
      <div className="info-item">
        <div className="info-item-title">{intl.Est_Daily_Rewards}</div>
        <div className="info-item-value">{dailyRewards}</div>
      </div>
      <div className="info-item gas-fee">
        <div className="info-item-title">{intl.est_network_fee}</div>
        <div className="info-item-value">
          <EstNetworkFee
            tryResp={tryResp}
            onSelectPayGasToken={doTry}
            showRefundableTips
          />
        </div>
      </div>
    </StyledInfo>
  );
}

const StyledInfo = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100px;
  padding: 20px 0;
  ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 15px;

  .info-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .info-item-title {
      font-size: 14px;
      color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_60};
      line-height: 18px;
    }
    .info-item-value {
      font-size: 14px;
      color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
      line-height: 18px;
    }
  }
`;

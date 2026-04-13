import React from 'react';
import styled from 'styled-components';

import { TurboRangeWithdrawOrderParams } from 'src/constants/interface';
import { useIntl } from 'src/locals';
import { ThemeType } from 'src/theme';
import EstNetworkFee from 'src/wallet/components/EstNetworkFee';

export default function WithdrawView({ order }: { order: any }) {
  const intl = useIntl();
  const { tryResp, estReceive } = (order.withdrawOrderParams ||
    {}) as TurboRangeWithdrawOrderParams;

  return (
    <StyledOrder>
      <div className="item">
        <div className="item-title">{intl.est_receive}</div>
        <div className="item-desc">
          {(estReceive || []).map((token: any) => (
            <div key={token.code}>
              {token.amount} {token.symbol || token.code}
            </div>
          ))}
        </div>
      </div>
      <div className="item">
        <div className="item-title">{intl.est_network_fee}</div>
        <div className="item-desc gas-fee">
          <EstNetworkFee tryResp={tryResp} />
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
  .item {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    width: 100%;
    margin-bottom: 15px;
    .item-title {
      font-size: 14px;
      color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_80};
      line-height: 20px;
    }
    .item-desc {
      font-size: 14px;
      color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
      line-height: 20px;
      display: flex;
      flex-direction: column;
      gap: 5px;
      align-items: flex-end;
    }
  }
`;

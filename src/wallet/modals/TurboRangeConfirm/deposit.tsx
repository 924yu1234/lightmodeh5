import React from 'react';
import styled from 'styled-components';

import { TurboRangeDepositOrderParams } from 'src/constants/interface';
import { useIntl } from 'src/locals';
import { ThemeType } from 'src/theme';
import EstNetworkFee from 'src/wallet/components/EstNetworkFee';

export default function DepositView({ order }: { order: any }) {
  const intl = useIntl();
  const { minPrice, maxPrice, tryResp, amount } = (order.depositOrderParams ||
    {}) as TurboRangeDepositOrderParams;

  return (
    <StyledOrder>
      <div className="item">
        <div className="item-title">{intl.amount}</div>
        <div className="item-desc">{amount} USDC</div>
      </div>
      <div className="item">
        <div className="item-title">
          {(intl as any).turboRange?.price_range || 'Price Range'}
        </div>
        <div className="item-desc">
          {minPrice} - {maxPrice}
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
    }
  }
`;

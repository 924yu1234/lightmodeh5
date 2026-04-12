import React from 'react';
import styled from 'styled-components';

import EstNetworkFeeInConfirm from 'src/components/EstNetworkFee/inConfirm';
import {
  TurboRangeDepositOrderParams,
  TurboRangeOrderParams,
} from 'src/constants/interface';
import { useIntl } from 'src/locals';
import { ThemeType } from 'src/theme';

export default function DepositView({
  order,
}: {
  order: TurboRangeOrderParams;
}) {
  const intl = useIntl();
  const params = order.depositOrderParams as TurboRangeDepositOrderParams;
  const minPrice = params?.minPrice;
  const maxPrice = params?.maxPrice;
  const tryResp = params?.tryResp;

  return (
    <StyledOrder>
      <div className="item">
        <div className="item-title">{intl.amount}</div>
        <div className="item-desc">
          <div>{params?.amount} USDC</div>
        </div>
      </div>
      <div className="item">
        <div className="item-title">{intl.turboRange.price_range}</div>
        <div className="item-desc">
          {minPrice} - {maxPrice}
        </div>
      </div>
      <div className="item">
        <div className="item-title">{intl.est_network_fee}</div>
        <div className="item-desc gas-fee">
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
      text-align: right;

      > div {
        margin-bottom: 4px;
        &:last-child {
          margin-bottom: 0;
        }
      }
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

import React from 'react';
import styled from 'styled-components';

import EstNetworkFeeInConfirm from 'src/components/EstNetworkFee/inConfirm';
import {
  TurboRangeClaimOrderParams,
  TurboRangeOrderParams,
} from 'src/constants/interface';
import { useIntl } from 'src/locals';
import { ThemeType } from 'src/theme';

import CommonSenseSymbol from '../../commonSenseSymbol';

export default function ClaimView({ order }: { order: TurboRangeOrderParams }) {
  const intl = useIntl();
  const { tryResp, estClaims } =
    order.claimOrderParams as TurboRangeClaimOrderParams;

  const poolAddress = order?.product?.poolAddress;
  return (
    <StyledOrder>
      <div className="item">
        <div className="item-title">{intl.est_receive}</div>
        <div className="item-desc">
          {estClaims.map((token) => (
            <div key={token.code}>
              {token.amount}{' '}
              <CommonSenseSymbol poolAddress={poolAddress} token={token} />
            </div>
          ))}
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

  .token-symbol {
    ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
    font-size: 20px;
    line-height: 20px;
    margin: 10px 0 5px;
  }
  .turbo-range-tag {
    margin-bottom: 40px;
  }

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

  .modal-title {
    margin-bottom: 32px;
  }

  .dg-primary {
    margin-top: 30px;
    width: 100%;
  }
`;

import React from 'react';
import styled from 'styled-components';

import EstNetworkFeeInConfirm from 'src/components/EstNetworkFee/inConfirm';
import {
  TurboRangeDualIncreaseInvestmentOrderParams,
  TurboRangeOrderParams,
} from 'src/constants/interface';
import { useIntl } from 'src/locals';
import { ThemeType } from 'src/theme';

import CommonSenseSymbol from '../../commonSenseSymbol';

export default function DualIncreaseInvestmentView({
  order,
}: {
  order: TurboRangeOrderParams;
}) {
  const intl = useIntl();
  const { tryResp, baseAmount, quoteAmount } =
    order.dualIncreaseInvestmentOrderParams as TurboRangeDualIncreaseInvestmentOrderParams;
  const product = order.product;

  return (
    <StyledOrder>
      <div className="item">
        <div className="item-title">{intl.amount}</div>
        <div className="item-desc">
          <div>
            {baseAmount}{' '}
            <CommonSenseSymbol
              poolAddress={product?.poolAddress}
              token={product?.baseToken}
            />
          </div>
          <div>{quoteAmount} USDC</div>
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
    margin-bottom: 20px;
  }

  .dg-primary {
    margin-top: 30px;
    width: 100%;
  }
`;

import React from 'react';
import styled from 'styled-components';

import EstNetworkFee from 'src/components/EstNetworkFee';
import { useIntl } from 'src/locals';
import { ThemeType } from 'src/theme';

import { useDualInvest } from '../dataProvider';

export default function FeeView() {
  const intl = useIntl();
  const { tryResp, doTry } = useDualInvest();
  return (
    <StyledFee>
      <div className="item-fee">
        <div className="item-fee-title">{intl.est_network_fee}</div>
        <div className="item-fee-desc gas-fee">
          <EstNetworkFee
            tryResp={tryResp}
            onSelectPayGasToken={doTry}
            showRefundableTips
          />
        </div>
      </div>
    </StyledFee>
  );
}

const StyledFee = styled.div`
  margin-top: 30px;
  .item-fee {
    display: flex;
    justify-content: space-between;
    width: 100%;
    align-items: flex-start;
    .item-fee-title {
      font-size: 14px;
      color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_80};
      line-height: 20px;
    }
    .item-fee-desc {
      font-size: 14px;
      color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
      line-height: 20px;
    }
  }
`;

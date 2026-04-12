import React from 'react';
import styled from 'styled-components';

import EstNetworkFee from 'src/components/EstNetworkFee';
import { Token } from 'src/constants/interface';
import { Type_DAChains } from 'src/da';
import { useIntl } from 'src/locals';
import { useChainInfosMap } from 'src/state/application/hooks';
import { ThemeType } from 'src/theme';

export default function ClaimView({
  order,
  tryResp,
  onSelectPayGasToken,
}: {
  order: any;
  tryResp: any;
  onSelectPayGasToken: (token: Token) => Promise<any>;
}) {
  const intl = useIntl();
  const chainInfosMap = useChainInfosMap();

  const { protocol, chain, rewardToken } = order || {};

  return (
    <StyledOrder>
      <div className="item">
        <div className="item-title">{intl.Protocol}</div>
        <div className="item-desc">{protocol}</div>
      </div>
      {rewardToken && (
        <div className="item">
          <div className="item-title">{intl.token}</div>
          <div className="item-desc">{rewardToken?.symbol}</div>
        </div>
      )}
      <div className="item">
        <div className="item-title">{intl.Network}</div>
        <div className="item-desc">
          {chainInfosMap[chain as Type_DAChains]?.name}
        </div>
      </div>
      <div className="item">
        <div className="item-title">{intl.est_network_fee}</div>
        <div className="item-desc gas-fee">
          <EstNetworkFee
            tryResp={tryResp}
            onSelectPayGasToken={onSelectPayGasToken}
          />
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

  .modal-title {
    margin-bottom: 32px;
  }

  .dg-primary {
    margin-top: 30px;
    width: 100%;
  }
`;

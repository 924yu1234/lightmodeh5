/* eslint-disable react/no-danger */
import React from 'react';
import styled from 'styled-components';

import { useIntl } from 'src/locals';
import { useDoTrySwap, useSwapTradeInfo } from 'src/state/swap/trade/hooks';
import { ThemeType } from 'src/theme';

import EstNetworkFee from '../EstNetworkFee';

export default function SwapNetworkFee() {
  const intl = useIntl();
  const { tryResp } = useSwapTradeInfo();
  const doTry = useDoTrySwap();

  return (
    <StyledSwapEstNetworkFee className="est-network-fee">
      <div className="est-network-fee-title">{intl.est_network_fee}</div>
      <EstNetworkFee tryResp={tryResp} onSelectPayGasToken={doTry} />
    </StyledSwapEstNetworkFee>
  );
}

export const StyledSwapEstNetworkFee = styled.div`
  ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  line-height: 20px;
  .est-network-fee-title {
    color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_80};
  }
  .est-network-fee-value {
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
  }
`;

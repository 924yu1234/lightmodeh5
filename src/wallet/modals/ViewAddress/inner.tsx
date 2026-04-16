import React from 'react';
import styled from 'styled-components';

import { CONNECTION } from 'src/constants/interface/wallet';
import { useIntl } from 'src/locals';
import useWallet from 'src/providers/useWallet';
import { ThemeType } from 'src/theme';

import DA from './das';

export default function ViewAddressInner() {
  const intl = useIntl();
  const { account = '', selectedWallet = '' } = useWallet();
  const isPrivy = selectedWallet === CONNECTION.PRIVY_ID;
  const showAccount = isPrivy ? '' : account;

  return (
    <StyledViewAddressInner>
      <div className="addr">
        <div className="addr-inner">
          <div className="connected-as">{intl.connected_via}</div>
          <div className="code">{showAccount}</div>
        </div>
      </div>
      <DA />
    </StyledViewAddressInner>
  );
}

const StyledViewAddressInner = styled.div`
  .addr-inner {
    background: ${({ theme }: { theme: ThemeType }) => theme.bg_05};
    border-radius: 8px;
    padding: 15px 5px 15px 10px;
    width: 100%;
    .connected-as {
      ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
      color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_60};
      font-size: 14px;
      line-height: 18px;
      margin-bottom: 5px;
    }
    .code {
      ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
      color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
      flex: 1;
      font-size: 14px;
      line-height: 18px;
    }
  }
`;

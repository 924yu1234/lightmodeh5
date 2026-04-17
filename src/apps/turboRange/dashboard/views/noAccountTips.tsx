import React from 'react';
import styled from 'styled-components';

import { PrimaryBtn } from 'src/UI';

import IconConnectWallet2 from 'src/components/Icons/connectWallet2';
import { useIntl } from 'src/locals';
import { useShowModalLogin } from 'src/state/application/hooks';
import { ThemeType } from 'src/theme';

export default function NoAccountTips() {
  const login = useShowModalLogin();
  const intl = useIntl();
  return (
    <StyledNoAccountTips>
      <IconConnectWallet2 />
      <div className="no-account-tips-title">
        {intl.turboRange.connect_wallet_to_see_positions}
      </div>
      <PrimaryBtn
        eventName="turboRange_dashboard_connect_wallet"
        className="dg-primary"
        onClick={() => {
          login();
        }}
      >
        {intl.connect_wallet}
      </PrimaryBtn>
    </StyledNoAccountTips>
  );
}

export const StyledNoAccountTips = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 120px;

  .no-account-tips-title {
    ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
    font-size: 14px;
    color: ${({ theme }: { theme: ThemeType }) =>
      theme.darkMode ? theme.t_fff_80 : theme.mutedText};
    line-height: 20px;
  }
  .dg-primary {
    width: 280px;
    margin-top: 20px;
  }
`;

import React from 'react';
import icon from 'imgs/tips_connect.svg';
import styled from 'styled-components';

import { GhostBtn } from 'src/UI';

import { useIntl } from 'js/locals';
import { useShowModalLogin } from 'js/state/application/hooks';

export default function TipsConnect() {
  const intl = useIntl();
  const login = useShowModalLogin();
  return (
    <StyledTipsConnect className="tips-connect">
      <img src={icon} alt="icon" className="icon" />
      <GhostBtn eventName="btn_tips_connect_wallet" onClick={login}>
        {intl.connect_wallet}
      </GhostBtn>
    </StyledTipsConnect>
  );
}

const StyledTipsConnect = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 99%;
  background: ${(props) => props.theme.bodyBg};
  .icon {
    width: 140px;
    height: 103px;
  }
  .dg-ghost.mantine-Button-root {
    margin-top: 20px;
    border-radius: 20px;
    height: 36px;
    min-height: 36px;
    ${(props) => props.theme.fontMedium};
    font-size: 18px;
    padding: 0 33px;
  }
`;

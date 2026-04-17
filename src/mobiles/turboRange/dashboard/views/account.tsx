import React from 'react';
import styled from 'styled-components';

import { ThemeType } from 'src/theme';

import PositionSummary from './positionSummary';

export default function Account() {
  return (
    <StyledAccount className="account-tpl">
      <div className="account-inner">
        <PositionSummary />
      </div>
    </StyledAccount>
  );
}
const StyledAccount = styled.div`
  margin-bottom: 20px;
  .dg-empty {
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
  }
  .no-access-token {
    opacity: 0.2;
  }
  position: relative;
  .account-title {
    ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
    color: ${({ theme }: { theme: ThemeType }) =>
      theme.darkMode ? theme.t_fff : theme.ink};
    font-size: 16px;
    line-height: 24px;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
  }
  .positions-tabs {
    margin-top: 30px;
  }
`;

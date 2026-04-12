import React from 'react';
import styled from 'styled-components';

import { ThemeType, useThemeParams } from 'src/theme';

export default function DividerLine() {
  const { isMobile } = useThemeParams();
  if (!isMobile) {
    return (
      <StyledDividerLinePC className="divider-line">
        <div className="divider-line-pc-inner"></div>
      </StyledDividerLinePC>
    );
  }
  return <StyledDividerLine className="divider-line" />;
}

const StyledDividerLine = styled.div`
  width: 100%;
  height: 4px;
  background-color: ${({ theme }: { theme: ThemeType }) => theme.bg_030303};
`;

const StyledDividerLinePC = styled.div`
  width: 100%;
  height: 1px;
  padding: 0 20px;
  .divider-line-pc-inner {
    width: 100%;
    height: 1px;
    background-color: ${({ theme }: { theme: ThemeType }) =>
      theme.bg_3a4259_25};
  }
`;

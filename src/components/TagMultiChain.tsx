import React from 'react';
import styled from 'styled-components';

import { useIntl } from 'src/locals';
import { ThemeType } from 'src/theme';

export default function TagMultiChain() {
  const intl = useIntl();
  return (
    <StyledSymbol className="multi-chain-tag">{intl.multi_chain}</StyledSymbol>
  );
}

export const StyledSymbol = styled.div`
  margin-left: 5px;
  background: ${({ theme }: { theme: ThemeType }) => theme.bg_blue_10};
  border-radius: 2px;
  padding: 0 5px;
  height: 20px;
  display: flex;
  align-items: center;
  ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
  color: ${({ theme }: { theme: ThemeType }) => theme.blue};
  font-size: 12px;
`;

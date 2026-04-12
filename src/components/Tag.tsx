import React from 'react';
import styled from 'styled-components';

import { ThemeType } from 'src/theme';

export default function Tag({ children }: { children: React.ReactNode }) {
  return <StyledTag className="tag">{children}</StyledTag>;
}

export const StyledTag = styled.div`
  height: 20px;
  padding: 0 5px;
  background: ${({ theme }: { theme: ThemeType }) => theme.bg_blue_20};
  border-radius: 2px;
  ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
  font-size: 12px;
  color: ${({ theme }: { theme: ThemeType }) => theme.blue};
  text-align: center;
  line-height: 20px;
`;

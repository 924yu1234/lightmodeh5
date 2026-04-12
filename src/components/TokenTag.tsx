import React from 'react';
import styled from 'styled-components';

import { CommonToken } from 'src/constants/interface';
import { useSetLocale } from 'src/locals';
import { useTokenTags } from 'src/state/swap/tokens/hook';
import { ThemeType } from 'src/theme';

export default function TagToken({ token }: { token: CommonToken }) {
  const tags = useTokenTags({ code: token.code });
  const { locale } = useSetLocale();
  if (!tags) return null;
  const tag = tags[locale] || tags['en-US'];
  return <StyledSymbol className="usdc-apy-tag">{tag}</StyledSymbol>;
}

export const StyledSymbol = styled.div`
  margin-left: 5px;
  background: ${({ theme }: { theme: ThemeType }) => theme.buy_10};
  border-radius: 2px;
  padding: 0 5px;
  height: 20px;
  display: flex;
  align-items: center;
  ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
  color: ${({ theme }: { theme: ThemeType }) => theme.green};
  font-size: 12px;
`;

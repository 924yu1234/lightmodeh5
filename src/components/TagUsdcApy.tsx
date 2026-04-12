import React from 'react';
import styled from 'styled-components';

import { useIntl } from 'src/locals';
import { useInfo } from 'src/state/application/hooks';
import { ThemeType } from 'src/theme';
import digit, { isNumber } from 'src/utils/digit';

export default function TagUsdcApy() {
  const intl = useIntl();
  const { usdcApy } = useInfo();
  if (!usdcApy || !isNumber(usdcApy)) return null;
  return (
    <StyledSymbol className="usdc-apy-tag">
      {intl.APY_1.replace('1', digit.format(usdcApy, '0.##%'))}
    </StyledSymbol>
  );
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

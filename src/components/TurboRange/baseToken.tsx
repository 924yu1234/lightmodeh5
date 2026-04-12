import React from 'react';
import styled from 'styled-components';

import { CommonToken } from 'src/constants/interface';
import { ThemeType } from 'src/theme';

import TokenIcon from '../Token/icon';

export default function BaseToken({ baseToken }: { baseToken: CommonToken }) {
  const symbol = baseToken?.symbol;
  const over6 = symbol?.length > 6;
  return (
    <StyledBaseToken className={over6 ? 'over6' : ''}>
      <div className="base-token-innner">
        <TokenIcon token={baseToken} size={28} />
        <div className="base-token-symbol">{baseToken?.symbol}</div>
      </div>
    </StyledBaseToken>
  );
}

const StyledBaseToken = styled.div`
  .base-token-innner {
    display: flex;
    align-items: center;
    gap: 5px;
    cursor: pointer;
    background: ${({ theme }) => theme.bg_b7b_10};
    border-radius: 18px;
    height: 36px;
    padding: 4px 8px 5px 5px;
    min-width: 115px;
    .base-token-symbol {
      ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
      font-size: 16px;
      line-height: 22px;
      color: ${({ theme }: { theme: ThemeType }) => theme.t_f4f};
    }
  }
  &.over6 .base-token-innner .base-token-symbol {
    font-size: 14px;
  }
`;

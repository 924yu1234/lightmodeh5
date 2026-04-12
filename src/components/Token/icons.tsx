import React from 'react';
import styled from 'styled-components';

import { CommonToken } from 'src/constants/interface';

import TokenIcon from './icon';

export default function TokenIcons({
  token1,
  token2,
  size = 24,
}: {
  token1: CommonToken;
  token2: CommonToken;
  size?: number;
}) {
  return (
    <StyledTokenIcons className="item-top" size={size}>
      <TokenIcon
        token={token1}
        hideChainIcon
        size={size}
        className="base-token-icon"
      />
      <TokenIcon
        token={token2}
        hideChainIcon
        className="quote-token-icon"
        size={size}
      />
    </StyledTokenIcons>
  );
}

const StyledTokenIcons = styled.div<{ size: number }>`
  display: flex;
  align-items: center;
  .base-token-icon {
    z-index: 2;
  }
  .quote-token-icon {
    margin-left: ${(props: any) => -props.size * 0.6}px;
    z-index: 1;
  }
`;

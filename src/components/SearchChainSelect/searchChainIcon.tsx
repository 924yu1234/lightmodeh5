import React from 'react';
import styled from 'styled-components';

import ChainIcon from 'src/components/ChainIcon';
import { Type_DAChains } from 'src/da';

import AllNetworkIcon from './allNetworkIcon';

export default function SearchChainIcon({
  chain,
  size = 26,
}: {
  chain: Type_DAChains | 'all';
  size?: number;
}) {
  return (
    <StyledAllChainIcon size={size}>
      {chain === 'all' ? (
        <AllNetworkIcon size={size} />
      ) : (
        <ChainIcon chain={chain} size={size} />
      )}
    </StyledAllChainIcon>
  );
}
// 2行 每行2个
const StyledAllChainIcon = styled.div<{ size: number }>`
  display: flex;
  align-items: center;
  justify-content: center;
  .all-chain-icon {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
    gap: 2px;
    height: ${({ size }) => size}px;
    width: ${({ size }) => size}px;
    .chain-icon {
      width: ${({ size }) => (size - 2) / 2}px;
      height: ${({ size }) => (size - 2) / 2}px;
    }
  }
`;

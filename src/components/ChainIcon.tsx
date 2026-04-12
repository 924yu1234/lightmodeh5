import React from 'react';
import styled from 'styled-components';

import { Type_DAChains } from 'src/da';
import { useChainInfosMap } from 'src/state/application/hooks';

export default function ChainIcon({
  chain,
  size = 20,
}: {
  chain: Type_DAChains;
  size?: number;
}) {
  const chainInfosMap = useChainInfosMap();
  const icon = chainInfosMap[chain]?.icon;

  if (!icon) return null;
  return (
    <StyledChainIcon
      src={icon}
      alt="chain_icon"
      className="chain-icon"
      size={size}
    />
  );
}

const StyledChainIcon = styled.img`
  width: ${({ size }: { size: number }) => size}px;
  height: ${({ size }: { size: number }) => size}px;
`;

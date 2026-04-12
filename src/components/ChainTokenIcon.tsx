import React from 'react';
import styled from 'styled-components';

import { Type_DAChains } from 'src/da';
import { useChainInfosMap } from 'src/state/application/hooks';

// token conner market
export default function ChainTokenIcon({
  chain,
  size = 14,
}: {
  chain?: Type_DAChains;
  size?: number;
}) {
  const chainInfosMap = useChainInfosMap();
  if (chain === 'BITCOIN') return null;

  const icon = chain ? chainInfosMap[chain]?.tokenConner : '';
  if (!icon) return null;
  return (
    <StyledChainIcon
      src={icon}
      alt="chain_icon"
      className="chain-token-icon"
      size={size}
    />
  );
}

const StyledChainIcon = styled.img<{ size: number }>`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  border-radius: 50%;
`;

import React from 'react';
import styled from 'styled-components';

import ChainTokenIcon from 'src/components/ChainTokenIcon';
import IconContractInteraction from 'src/components/Icons/contractInteraction';
import { Type_DAChains } from 'src/da';

export default function ContractInteraction({
  className = '',
  chain,
  size = 32,
}: {
  className?: string;
  size?: number;
  chain: Type_DAChains;
}) {
  return (
    <StyledTokenIcon
      className={`contract-interaction ${className}`}
      size={size}
    >
      <IconContractInteraction size={size} />
      <ChainTokenIcon chain={chain as any} />
    </StyledTokenIcon>
  );
}

export const StyledTokenIcon = styled.div<{ size: number }>`
  position: relative;
  width: ${(props: any) => props.size + props.size / 12}px;
  height: ${(props: any) => props.size}px;
  display: flex;
  align-items: center;
  justify-content: center;
  .chain-token-icon {
    position: absolute;
    width: ${(props: any) => props.size / 2}px;
    height: ${(props: any) => props.size / 2}px;
    bottom: 0;
    right: 0;
    z-index: 1;
    border: 0.5px solid ${({ theme }) => theme.border_b7b_50};
    border-radius: 50%;
  }
`;

import React from 'react';
import solanaScan from 'imgs/Solscan.png';
import styled from 'styled-components';

import { DeChainId } from 'src/constants/interface';
import { useDexChainId } from 'src/state/application/hooks';

import IconEtherscan from '../Icons/etherscan';

export function ChainScanIcon({
  chainId,
  style = {},
  size = 16,
}: {
  chainId: DeChainId | 'ETH';
  style: any;
  size?: number;
}) {
  const dexChainId = useDexChainId();
  return (
    <StyledChainScanIcon size={size} className="chain-scan-icon" style={style}>
      {(chainId === dexChainId ||
        chainId === 'ETH' ||
        chainId === 'BASE' ||
        chainId === 'BSC') && <IconEtherscan size={size} />}

      {chainId === 'SOLANA' && (
        <img src={solanaScan} alt="solana" className="scan-icon" />
      )}
    </StyledChainScanIcon>
  );
}

const StyledChainScanIcon = styled.div<{ size: number }>`
  display: flex;
  align-items: center;
  .scan-icon {
    width: ${(props) => props.size}px;
    height: ${(props) => props.size}px;
  }
`;

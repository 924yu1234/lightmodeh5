import React from 'react';
import styled from 'styled-components';

import TokenIcon from 'src/components/Token/icon';
import { Vault } from 'src/constants/interface';
import { ThemeType } from 'src/theme';

export default function VaultSymbol({ vault }: { vault: Vault }) {
  const { name, protocol, token } = vault;
  if (!token) return null;
  const isUsdc = token.symbol === 'USDC';
  return (
    <StyledVault className="vault-symbol">
      <TokenIcon token={vault.token} hideChainIcon={isUsdc} size={32} />
      <div>
        <div className="token-symbol">{token.symbol}</div>
        <div className="protocol-name">
          {protocol} | {name}
        </div>
      </div>
    </StyledVault>
  );
}

const StyledVault = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  ${({ theme }: { theme: ThemeType }) => theme.fontRegular};

  .token-symbol {
    font-size: 14px;
    line-height: 18px;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
  }
  .protocol-name {
    font-size: 12px;
    line-height: 16px;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_60};
  }
`;

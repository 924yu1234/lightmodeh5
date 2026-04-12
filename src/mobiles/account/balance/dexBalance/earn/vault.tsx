import React from 'react';
import styled from 'styled-components';

import Reward from 'src/components/Earn/reward';
import VaultSymbol from 'src/components/Earn/vault';
import { Vault } from 'src/constants/interface';
import useCustomNavigate from 'src/hooks/useCustomNavigate';

export default function VaultItem({ vault }: { vault: Vault }) {
  const navigate = useCustomNavigate();
  return (
    <StyledItem
      className="item"
      onClick={() => navigate(`/simple-earn/${vault.id}`)}
    >
      <VaultSymbol vault={vault} />
      <Reward
        vault={vault}
        amount={vault.detail?.myDepositAmount}
        usd={vault.detail?.myDepositUsd}
      />
    </StyledItem>
  );
}

const StyledItem = styled.div`
  display: flex;
  align-items: center;
  height: 48px;
  padding: 0 20px;
  .vault-symbol {
    margin-right: auto;
  }
`;

import React from 'react';
import styled from 'styled-components';

import EarnWithdrawBtn from './btn';
import VaultDepositProvider from './dataProvider';
import EarnWithdrawInfo from './info';
import Token from './token';

export default function EarnWithdraw({ id }: { id: number }) {
  return (
    <VaultDepositProvider id={id}>
      <StyledSwapInputs className="swap-input">
        <Token />
        <EarnWithdrawInfo />
        <EarnWithdrawBtn />
      </StyledSwapInputs>
    </VaultDepositProvider>
  );
}

export const StyledSwapInputs = styled.div`
  padding-top: 10px;
  padding-bottom: 30px;
  min-height: 305px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .dg-primary {
    margin-top: auto;
    width: 100%;
  }
`;

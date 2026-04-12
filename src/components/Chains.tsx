import React from 'react';
import styled from 'styled-components';

import { TypeBridgeChains } from 'src/constants/interface';

import ChainIcon from './ChainIcon';

export default function Chains({
  size = 16,
  from,
  to,
}: {
  size?: number;
  from: TypeBridgeChains;
  to: TypeBridgeChains;
}) {
  return (
    <StyledChains className="chains">
      <ChainIcon chain={from} size={size} />
      <span style={{ margin: '0 10px' }}>→</span>
      <ChainIcon chain={to} size={size} />
    </StyledChains>
  );
}

const StyledChains = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

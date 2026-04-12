import React from 'react';
import styled from 'styled-components';

import TokenIcon from 'src/components/Token/icon';
import { useTurboRangeProduct } from 'src/state/turboRange/hooks';

import CommonSenseSymbol from '../../commonSenseSymbol';

export default function DetailBtn({ poolAddress }: { poolAddress: string }) {
  const product = useTurboRangeProduct(poolAddress);
  return (
    <StyledTop className="top">
      <TokenIcon token={product.baseToken} />
      <div className="title">
        <CommonSenseSymbol poolAddress={poolAddress} />
      </div>
    </StyledTop>
  );
}

const StyledTop = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

import React from 'react';
import styled from 'styled-components';

import TokenIcon from '../Token/icon';

export default function ClaimedTokens({
  tokens,
  hideAmount,
}: {
  tokens: any[];
  hideAmount?: boolean;
}): any {
  return (
    <StyledTokens>
      {!tokens?.length && '--'}
      {tokens.map((token: any) => {
        return (
          <div className="token">
            <TokenIcon token={token} size={32} />
            {!hideAmount && !!token?.amount_display && (
              <span>{token?.amount_display}</span>
            )}
            <span>{token?.symbol}</span>
          </div>
        );
      })}
    </StyledTokens>
  );
}

const StyledTokens = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  .token {
    display: flex;
    align-items: center;
    gap: 5px;
  }
`;

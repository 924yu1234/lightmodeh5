import React from 'react';
import styled from 'styled-components';

import WindowOpen from 'src/utils/windowOpen';

import LinkWrapper from './LinkWrapper';

export default function BtcBlock({ blockNumber }: { blockNumber: string }) {
  const url = `https://www.blockchain.com/btc/block/${blockNumber}`;
  return (
    <StyledHash
      className="btc-block text-underline"
      onClick={() => {
        if (url) WindowOpen(url);
      }}
    >
      <LinkWrapper url={url} colorInherit>
        #{blockNumber}
      </LinkWrapper>
    </StyledHash>
  );
}

const StyledHash = styled.div`
  cursor: pointer;
  color: ${({ theme }) => theme.t_fff};
  font-size: 14px;

  &:hover {
    color: ${({ theme }) => theme.blue};
  }
`;

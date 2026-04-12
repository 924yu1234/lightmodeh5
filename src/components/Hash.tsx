import React from 'react';
import styled from 'styled-components';

import { ChainId } from 'src/constants/ethers';
import { useGetBrowserUrl } from 'src/ethers/utils';
import { formatHash } from 'src/utils/format';
import WindowOpen from 'src/utils/windowOpen';

import LinkWrapper from './LinkWrapper';

export default function Hash({
  txHash,
  chainId,
}: {
  txHash: string;
  chainId: string;
}) {
  const getBrowserUrl = useGetBrowserUrl();

  let url = getBrowserUrl({
    chainId,
    address: '',
    tx_hash: txHash,
    code: '',
  });
  if (chainId === ChainId.BTC) {
    url = `https://btcscan.org/block/${txHash}`;
  }
  const showHash = formatHash(txHash);
  return (
    <StyledHash
      className="hash hover-text-underline"
      onClick={() => {
        if (url) WindowOpen(url);
      }}
    >
      <LinkWrapper url={url} colorInherit>
        {showHash}
      </LinkWrapper>
    </StyledHash>
  );
}

const StyledHash = styled.div`
  cursor: pointer;
  color: ${({ theme }) => theme.t_fff};
  font-size: 14px;
`;

import React from 'react';
import styled from 'styled-components';

import { DeChainId } from 'src/constants/interface';
import { useGetBrowserUrl } from 'src/ethers/utils';
import { formatAddress } from 'src/utils/format';
import WindowOpen from 'src/utils/windowOpen';

import LinkWrapper from './LinkWrapper';

export default function Address({
  address,
  chainId,
}: {
  address: string;
  chainId: DeChainId;
}) {
  const getBrowserUrl = useGetBrowserUrl();

  const addressUrl = getBrowserUrl({
    chainId,
    address,
    tx_hash: '',
    code: '',
  });
  const showAddress = formatAddress(address);

  return (
    <StyledAddress
      className="address hover-text-underline"
      onClick={() => {
        if (addressUrl) WindowOpen(addressUrl);
      }}
    >
      <LinkWrapper url={addressUrl} colorInherit>
        {showAddress}
      </LinkWrapper>
    </StyledAddress>
  );
}

const StyledAddress = styled.div`
  cursor: pointer;
  color: ${({ theme }) => theme.t_fff};
  font-size: 14px;
`;

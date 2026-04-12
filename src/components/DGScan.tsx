import React from 'react';
import styled from 'styled-components';

import { formatAddress } from 'src/utils/format';
import useOpenScan from 'src/utils/openScan';

import LinkWrapper from './LinkWrapper';

export default function DGScan({
  address,
  showWarning,
}: {
  address: string;
  showWarning: boolean;
}) {
  const { openScan, scanUrl } = useOpenScan(address, showWarning);
  const showAddress = formatAddress(address);
  return (
    <StyledAddress
      className="address hover-text-underline"
      onClick={() => {
        openScan();
      }}
    >
      <LinkWrapper url={scanUrl} colorInherit>
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

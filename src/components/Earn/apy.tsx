import React from 'react';
import styled from 'styled-components';

import { Vault } from 'src/constants/interface';
import { useIsFetchingDetails } from 'src/state/intent/earn/hooks';
import digit, { isNumber } from 'src/utils/digit';

import Loader from '../Loader';

export default function Apy({ vault }: { vault: Vault }) {
  const vaultDetail = vault?.detail ?? {};
  const apy = vaultDetail.totalApy;
  const isFetchingDetail = useIsFetchingDetails();

  if (isFetchingDetail) return <Loader />;
  return (
    <StyledSpan className="apy">
      {isNumber(apy) ? digit.format(apy, '0.00%') : '--'}
    </StyledSpan>
  );
}

const StyledSpan = styled.span`
  color: ${({ theme }) => theme.green};
`;

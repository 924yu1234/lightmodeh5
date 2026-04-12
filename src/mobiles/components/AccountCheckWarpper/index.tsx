import React from 'react';
import styled from 'styled-components';

import AccountCheck from 'src/components/Empty/AccountCheck';
import { Initialize_Source } from 'src/hooks/useEventTrack/utils/useLogInitialize';
import { useHasAccessToken } from 'src/providers/useWallet';

import GlobalFooter from '../GlobalFooter';

export default function AccountCheckWarpper({
  children,
  className,
  source,
}: {
  className?: string;
  children: React.ReactElement;
  source: Initialize_Source;
}) {
  const hasAccessToken = useHasAccessToken();
  return (
    <StyledAccountCheckWarpper className={className}>
      <AccountCheck source={source}>{children}</AccountCheck>
      {!hasAccessToken && <GlobalFooter />}
    </StyledAccountCheckWarpper>
  );
}

const StyledAccountCheckWarpper = styled.div`
  & > .dg-empty {
    padding-top: 50%;
    width: 100%;
    height: 80%;
  }
`;

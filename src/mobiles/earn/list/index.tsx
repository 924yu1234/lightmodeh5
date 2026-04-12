import React, { useEffect } from 'react';

import PrivateClientDeskFloatingEntry from 'src/components/PrivateClientDesk/floatingEntry_m';
import { useShowH5Header } from 'src/h5/utils';
import { useIntl } from 'src/locals';
import Header from 'src/mobiles/components/header';
import { useSetTitle } from 'src/providers/useWallet';
import { useCheckGetEarnDetail } from 'src/state/intent/earn/hooks';
import useCheckRegion from 'src/state/regionCheck/hooks';

import { StyledList } from './style';
import EarnTabs from './views/tabs';
import Portfolio from './views/top';

export default function Earns() {
  const showH5Header = useShowH5Header();
  const intl = useIntl();
  useCheckGetEarnDetail();
  const checkRegion = useCheckRegion();
  const setDocumentTitle = useSetTitle();

  useEffect(() => {
    setDocumentTitle(intl.turboRange.Simple_Earn);
    return () => {
      setDocumentTitle('');
    };
  }, [setDocumentTitle, intl.turboRange.Simple_Earn]);

  useEffect(() => {
    checkRegion();
  }, [checkRegion]);

  return (
    <StyledList>
      {showH5Header && (
        <Header title={intl.turboRange.Simple_Earn} backUrl="/home" />
      )}
      <div className="page-inner">
        <Portfolio />
        <EarnTabs />
      </div>
      <PrivateClientDeskFloatingEntry />
    </StyledList>
  );
}

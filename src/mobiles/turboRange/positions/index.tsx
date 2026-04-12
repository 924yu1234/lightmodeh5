import React, { useEffect } from 'react';

import PositionsTabs from 'src/components/TurboRange/positions/tabs';
import TurboRangeNotification from 'src/h5/components/turboRangeNotification';
import { useShowH5Header } from 'src/h5/utils';
import useRefresh from 'src/hooks/useRefreshData/useRefresh';
import { useIntl } from 'src/locals';
import Header from 'src/mobiles/components/header';
import { useSetTitle } from 'src/providers/useWallet';
import { useRefreshTurboRangePostions } from 'src/state/turboRange/hooks';

import { StyledInvest } from './style';

export default function TurboRangePositions() {
  const showH5Header = useShowH5Header();
  const intl = useIntl();
  const setDocumentTitle = useSetTitle();

  const refreshTurboRangePostions = useRefreshTurboRangePostions();
  const refreshIndex = useRefresh(30000);

  useEffect(() => {
    refreshTurboRangePostions();
  }, [refreshIndex, refreshTurboRangePostions]);

  useEffect(() => {
    setDocumentTitle(intl.turboRange.my_positions);
    return () => {
      setDocumentTitle('');
    };
  }, [setDocumentTitle, intl.turboRange.my_positions]);

  return (
    <StyledInvest>
      {showH5Header && (
        <Header title={intl.turboRange.my_positions} backUrl="/turbo-range" />
      )}
      <div className="page-inner">
        <TurboRangeNotification />
        <PositionsTabs />
      </div>
    </StyledInvest>
  );
}

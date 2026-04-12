import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Invest from 'src/components/TurboRange/invest';
import { useShowH5Header } from 'src/h5/utils';
import { useIntl } from 'src/locals';
import Header from 'src/mobiles/components/header';
import { useSetTitle } from 'src/providers/useWallet';
import { useRefreshSwapBalance } from 'src/state/swap/balances/hooks';

import { StyledInvest } from './style';

export default function TurboRangeDeposit() {
  const { poolAddress } = useParams();
  const showH5Header = useShowH5Header();
  const setDocumentTitle = useSetTitle();
  const intl = useIntl();
  const refreshBalance = useRefreshSwapBalance();

  useEffect(() => {
    refreshBalance();
  }, [refreshBalance]);

  useEffect(() => {
    setDocumentTitle(intl.turboRange.create_position);
    return () => {
      setDocumentTitle('');
    };
  }, [setDocumentTitle, intl.turboRange.create_position]);

  return (
    <StyledInvest>
      {showH5Header && <Header title={intl.turboRange.create_position} />}
      <div className="page-inner">
        <Invest poolAddress={poolAddress || ''} />
      </div>
    </StyledInvest>
  );
}

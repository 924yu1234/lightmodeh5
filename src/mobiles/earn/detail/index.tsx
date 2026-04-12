import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import EarnDepositWarning from 'src/components/Earn/depositWarning';
import { useShowH5Header } from 'src/h5/utils';
import { useIntl } from 'src/locals';
import Header from 'src/mobiles/components/header';
import { useCheckGetEarnDetail, useVault } from 'src/state/intent/earn/hooks';
import { useRefreshSwapBalance } from 'src/state/swap/balances/hooks';

import { StyledDetail } from './style';
import Opr from './views/opr';
import EarnDetailTop from './views/top';

export default function EarnDetail() {
  const { id } = useParams();
  const showH5Header = useShowH5Header();
  const intl = useIntl();
  const vault = useVault(Number(id));
  useCheckGetEarnDetail();

  const refreshBalance = useRefreshSwapBalance();

  useEffect(() => {
    refreshBalance();
  }, [refreshBalance]);

  return (
    <StyledDetail>
      {showH5Header && <Header title={intl.Vault} />}
      <div className="page-inner">
        <EarnDepositWarning vault={vault} />
        <EarnDetailTop id={Number(id)} />
        <Opr id={Number(id)} />
      </div>
    </StyledDetail>
  );
}

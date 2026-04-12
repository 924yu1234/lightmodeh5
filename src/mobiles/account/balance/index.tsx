import React from 'react';

import Empty from 'src/components/Empty';
import GlobalFooter from 'src/mobiles/components/GlobalFooter';
import { useHasAccessToken } from 'src/providers/useWallet';

import DexBalanceInner from './balanceInner';
import { StyledBalance } from './style';

export default function AccountBalance() {
  const hasAccessToken = useHasAccessToken();
  return (
    <StyledBalance>
      {hasAccessToken ? (
        <DexBalanceInner />
      ) : (
        <Empty signToViewTipsType="balance" />
      )}
      <GlobalFooter />
    </StyledBalance>
  );
}

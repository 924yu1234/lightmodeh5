import React from 'react';

import Empty from 'src/components/Empty';
import { useHasAccessToken } from 'src/providers/useWallet';

import DexBalance from './dexBalance';
import { StyledBalance } from './style';

export default function AccountBalance() {
  const hasAccessToken = useHasAccessToken();

  return (
    <StyledBalance>
      {hasAccessToken ? (
        <DexBalance />
      ) : (
        <Empty
          source="account_balance"
          className="balance-empty"
          signToViewTipsType="balance"
        />
      )}
    </StyledBalance>
  );
}

import React from 'react';

import { Vault } from 'src/constants/interface';
import { useHasAccessToken } from 'src/providers/useWallet';
import { useIsFetchingVaultDetail } from 'src/state/intent/earn/hooks';
import { isNumber } from 'src/utils/digit';

import Loader from '../Loader';
import { formatAmount } from './format';

export default function MyDeposit({ vault }: { vault: Vault }): any {
  const vaultDetail = vault.detail || {};
  const myDepositAmount = vaultDetail.myDepositAmount;
  const hasAccessToken = useHasAccessToken();
  const isFetchingDetail = useIsFetchingVaultDetail(vault);

  if (!hasAccessToken) return <>--</>;
  if (isFetchingDetail) return <Loader />;

  if (!isNumber(myDepositAmount)) {
    return <>--</>;
  }
  return formatAmount(myDepositAmount);
}

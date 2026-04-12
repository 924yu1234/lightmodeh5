import React from 'react';

import { Vault } from 'src/constants/interface';
import { useHasAccessToken } from 'src/providers/useWallet';
import { useIsFetchingVaultDetail } from 'src/state/intent/earn/hooks';
import { isNumber } from 'src/utils/digit';

import Loader from '../Loader';
import { formatUsd } from './format';

export default function MyDepositUsd({ vault }: { vault: Vault }): any {
  const vaultDetail = vault.detail || {};
  const myDepositUsd = vaultDetail.myDepositUsd;
  const hasAccessToken = useHasAccessToken();
  const isFetchingDetail = useIsFetchingVaultDetail(vault);

  if (!hasAccessToken) return <>$--</>;
  if (isFetchingDetail) return <Loader />;

  if (!isNumber(myDepositUsd)) {
    return <>$--</>;
  }
  return formatUsd(myDepositUsd);
}

import React from 'react';

import { Vault } from 'src/constants/interface';
import { useIsFetchingDetails } from 'src/state/intent/earn/hooks';
import { formatTurnover } from 'src/utils/format';

import Loader from '../Loader';

export default function Tvl({ vault }: { vault: Vault }) {
  const vaultDetail = vault?.detail ?? {};
  const isFetchingDetail = useIsFetchingDetails();
  if (isFetchingDetail) return <Loader />;
  return (
    <>
      $
      {Number(vaultDetail.totalAssetsUsd || '0') !== 0
        ? formatTurnover(vaultDetail.totalAssetsUsd)
        : '--'}
    </>
  );
}

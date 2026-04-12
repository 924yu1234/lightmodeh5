import React from 'react';

import { Skeleton } from 'src/UI';

import { useHasAccessToken } from 'src/providers/useWallet';
import {
  useIntentEarnState,
  useIsFetchingDetails,
  useTotalDepositUsd,
} from 'src/state/intent/earn/hooks';
import { useThemeParams } from 'src/theme';

import Loader from '../Loader';
import { formatUsd } from './format';

export default function TotalDepositUsd(): any {
  const isFetchingDetail = useIsFetchingDetails();
  const hasAccessToken = useHasAccessToken();
  const totalDepositUsd = useTotalDepositUsd();
  const { isMobile } = useThemeParams();
  const { showLoading } = useIntentEarnState();

  if (!hasAccessToken) return <>--</>;
  if (isFetchingDetail)
    return isMobile && showLoading ? (
      <Skeleton height={18} width={60} />
    ) : (
      <Loader />
    );

  return formatUsd(totalDepositUsd);
}

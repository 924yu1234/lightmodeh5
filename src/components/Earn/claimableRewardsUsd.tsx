import React, { useMemo } from 'react';

import { Skeleton } from 'src/UI';

import { useHasAccessToken } from 'src/providers/useWallet';
import {
  useIntentEarnState,
  useIsFetchingDetails,
  useKaminoRewards,
  useMorphoRewards,
} from 'src/state/intent/earn/hooks';
import { useThemeParams } from 'src/theme';

import Loader from '../Loader';
import { formatUsd } from './format';

export default function ClaimableRewardsUsd(): any {
  const morphoRewards = useMorphoRewards();
  const kaminoRewards = useKaminoRewards();
  const isFetchingDetail = useIsFetchingDetails();
  const hasAccessToken = useHasAccessToken();
  const totalRewardsUsd = useMemo(() => {
    return morphoRewards
      .concat(kaminoRewards)
      .reduce((res: number, reward: any) => {
        return res + Number(reward.claimableUsd || 0);
      }, 0);
  }, [morphoRewards, kaminoRewards]);
  const { isMobile } = useThemeParams();
  const { showLoading } = useIntentEarnState();

  if (!hasAccessToken) return <>--</>;
  if (isFetchingDetail)
    return isMobile && showLoading ? (
      <Skeleton height={18} width={60} />
    ) : (
      <Loader />
    );

  return formatUsd(totalRewardsUsd);
}

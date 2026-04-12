import { useCallback, useEffect, useMemo, useState } from 'react';

import { useDexAccount } from 'src/state/dexAccount/hooks';
import { isNumber } from 'src/utils/digit';

import { useFetchReferralSummary } from '../service';
import { ReferralSummaryData } from '../types';

/** 领取佣金等操作成功后派发，用于刷新推荐汇总（见 claimModal） */
export const REFERRAL_SUMMARY_REFETCH_EVENT = 'dg:referral-summary-refetch';

export function emitReferralSummaryRefetch(): void {
  if (typeof window === 'undefined') {
    return;
  }
  window.dispatchEvent(new CustomEvent(REFERRAL_SUMMARY_REFETCH_EVENT));
}

interface UseReferralSummaryDataResult {
  claimDisabled: boolean;
  claimTokenChain?: number | string;
  claimTokenId?: number | string;
  commissionEarned: number;
  invitesCount: number;
  link: string;
  summaryData: ReferralSummaryData;
  swapLevel1Rate: string | number;
  swapLevel2Rate: string | number;
  turboLevel1Rate: string | number;
  turboRangeLevel2Rate: string | number;
  unclaimedCommission: number;
}

export default function useReferralSummaryData(): UseReferralSummaryDataResult {
  const { account, hasAccessToken } = useDexAccount();
  const [summaryData, setSummaryData] = useState<ReferralSummaryData>({});
  const [refetchKey, setRefetchKey] = useState(0);
  const fetchReferralSummary = useFetchReferralSummary();

  const bumpRefetch = useCallback(() => {
    setRefetchKey((k) => k + 1);
  }, []);

  useEffect(() => {
    const onExternalRefetch = () => {
      bumpRefetch();
    };
    window.addEventListener(REFERRAL_SUMMARY_REFETCH_EVENT, onExternalRefetch);
    return () => {
      window.removeEventListener(
        REFERRAL_SUMMARY_REFETCH_EVENT,
        onExternalRefetch
      );
    };
  }, [bumpRefetch]);

  useEffect(() => {
    let cancelled = false;

    fetchReferralSummary()
      .then((resp) => {
        if (!cancelled) {
          setSummaryData((resp || {}) as ReferralSummaryData);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setSummaryData({});
        }
      });

    return () => {
      cancelled = true;
    };
  }, [account, fetchReferralSummary, hasAccessToken, refetchKey]);

  const link = useMemo(() => {
    const referralCode = `${summaryData.referral_code || ''}`;
    return referralCode ? `https://app.degate.com/?s=${referralCode}` : '';
  }, [summaryData.referral_code]);

  const invitesCount = useMemo(() => {
    return isNumber(summaryData.invites_count)
      ? Number(summaryData.invites_count)
      : 0;
  }, [summaryData.invites_count]);

  const commissionEarned = useMemo(() => {
    return isNumber(summaryData.commission_earned)
      ? Number(summaryData.commission_earned)
      : 0;
  }, [summaryData.commission_earned]);

  const swapLevel1Rate = useMemo(() => {
    if (isNumber(summaryData.commission_rate)) {
      return Number(summaryData.commission_rate);
    }
    return '--';
  }, [summaryData.commission_rate]);

  const turboLevel1Rate = useMemo(() => {
    if (isNumber(summaryData.turbo_range_rate)) {
      return Number(summaryData.turbo_range_rate);
    }
    return '--';
  }, [summaryData.turbo_range_rate]);

  const swapLevel2Rate = useMemo(() => {
    if (isNumber(summaryData.swap_l2_rate)) {
      return Number(summaryData.swap_l2_rate);
    }
    return '--';
  }, [summaryData.swap_l2_rate]);

  const turboRangeLevel2Rate = useMemo(() => {
    if (isNumber(summaryData.turbo_range_l2_rate)) {
      return Number(summaryData.turbo_range_l2_rate);
    }
    return '--';
  }, [summaryData.turbo_range_l2_rate]);

  const unclaimedCommission = useMemo(() => {
    return isNumber(summaryData.unclaimed_commission)
      ? Number(summaryData.unclaimed_commission)
      : 0;
  }, [summaryData.unclaimed_commission]);

  const claimDisabled = useMemo(() => {
    return Number(unclaimedCommission) <= 0;
  }, [unclaimedCommission]);

  return {
    claimDisabled,
    claimTokenChain: summaryData.claim_chain,
    claimTokenId: summaryData.claim_token_id,
    commissionEarned,
    invitesCount,
    link,
    summaryData,
    swapLevel1Rate,
    swapLevel2Rate,
    turboLevel1Rate,
    turboRangeLevel2Rate,
    unclaimedCommission,
  };
}

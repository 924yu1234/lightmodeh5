import { useCallback, useMemo } from 'react';

import { useBalances } from 'src/hooks/useAssets';
import { useIsAppH5, useWalletWeb3 } from 'src/providers/useWallet';
import { useDexAccount } from 'src/state/dexAccount/hooks';
import {
  useFungibleUsdc,
  useIsLoadingDABalance,
} from 'src/state/swap/balances/hooks';
import { useChangeFlag, useUserFlag } from 'src/state/user/hooks';

import { useIsPrivy } from './useWalletHooks';

const RECEIVE_GUIDE_KEY = 'external_wallet_receive_guide_dismissed';
const ADD_FUNDS_GUIDE_KEY = 'external_wallet_add_funds_guide_dismissed';

export function useExternalWalletGuide() {
  const { account, providerInfo } = useWalletWeb3();
  const { hasAccessToken, hasSyncDA } = useDexAccount();
  const isLoadingDABalance = useIsLoadingDABalance();
  const balances = useBalances();
  const fungibleUsdc = useFungibleUsdc();
  const isAppH5 = useIsAppH5();
  const receiveDismissed = !!useUserFlag(RECEIVE_GUIDE_KEY);
  const addFundsDismissed = !!useUserFlag(ADD_FUNDS_GUIDE_KEY);
  const changeReceiveDismissed = useChangeFlag(RECEIVE_GUIDE_KEY);
  const changeAddFundsDismissed = useChangeFlag(ADD_FUNDS_GUIDE_KEY);
  const isPrivy = useIsPrivy();

  const isExternalWallet = useMemo(() => {
    if (isPrivy) return false;
    if (!account) return false;
    if (!isAppH5) return true;
    if (isAppH5 && providerInfo?.walletType === 'linkWallet') return true;
    return false;
  }, [isAppH5, account, providerInfo?.walletType, isPrivy]);

  const hasWhitelistAssets = useMemo(() => {
    if (fungibleUsdc?.available > 0) return true;
    return balances.some((balance: any) => {
      if (!balance?.is_whitelist) return false;
      return Number(balance?.total ?? balance?.available ?? 0) > 0;
    });
  }, [balances, fungibleUsdc]);

  const canShowGuide =
    hasAccessToken && hasSyncDA && isExternalWallet && !isLoadingDABalance;

  const dismissReceiveGuide = useCallback(() => {
    changeReceiveDismissed(true);
  }, [changeReceiveDismissed]);

  const dismissAddFundsGuide = useCallback(() => {
    changeAddFundsDismissed(true);
  }, [changeAddFundsDismissed]);

  return useMemo(() => {
    return {
      isExternalWallet,
      hasWhitelistAssets,
      showReceiveGuide:
        canShowGuide && !hasWhitelistAssets && !receiveDismissed,
      showAddFundsGuide:
        canShowGuide && !hasWhitelistAssets && !addFundsDismissed,
      dismissReceiveGuide,
      dismissAddFundsGuide,
    };
  }, [
    addFundsDismissed,
    canShowGuide,
    dismissAddFundsGuide,
    dismissReceiveGuide,
    hasWhitelistAssets,
    isExternalWallet,
    receiveDismissed,
  ]);
}

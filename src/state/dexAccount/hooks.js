import { useCallback, useEffect, useMemo } from 'react';
import { usePrevious } from 'ahooks';
import { useDispatch, useSelector } from 'react-redux';

import { useIsPrivy } from 'src/hooks/useWalletHooks';

import useWallet, {
  useWalletOprs,
  useWalletWeb3,
} from 'js/providers/useWallet';
import {
  useDexChainId,
  useHideModals,
  useInfo,
  useShowModal,
} from 'js/state/application/hooks';

import { ModalKeys } from '../application/reducer';
import {
  delOtherDexAccounts,
  setDexAccountRefreshIndex,
  updateDexAccount,
} from './actions';
import { AccountStatus } from './reducer';

// show testnet unstable tips
export function useDexAccount() {
  const dexChainId = useDexChainId();
  const { account = '' } = useWalletWeb3();
  const preAccount = usePrevious(account);
  const { checkHasUnLocked } = useWalletOprs();
  const showModal = useShowModal();
  const hideModal = useHideModals();
  const { accessToken } = useWallet();

  const dexAccount = useSelector((state) => {
    return state?.dexAccount?.dexAccounts?.[dexChainId]?.[
      account?.toLowerCase()
    ];
  });

  const hasUnlocked = checkHasUnLocked();

  useEffect(() => {
    if (preAccount && account && preAccount !== account) {
      hideModal({ all: true });
      showModal({ modal: ModalKeys.tips_accountChange });
    }
  }, [preAccount, account, showModal, hideModal]);

  return useMemo(() => {
    const loading = dexAccount?.state === AccountStatus.FETCHING;
    return {
      loading,
      hasFetchedDA: dexAccount?.hasFetchedDA,
      da_owner: dexAccount?.da_owner,
      accountId: dexAccount?.accountId,
      nonce: dexAccount?.nonce,
      hasSyncDA: dexAccount?.hasSyncDA || !!accessToken?.da_owner,
      keyNonce: dexAccount?.keyNonce,
      account,
      publicKeyX: dexAccount?.publicKeyX,
      publicKeyY: dexAccount?.publicKeyY,
      referrerId: dexAccount?.referrerId,
      state: dexAccount?.state,
      updating: dexAccount?.updating,
      hasUnlocked,
      hasAccessToken: !!accessToken?.token,
      isInBlacklist: dexAccount?.isInBlacklist,
      hasFetchedOrigin: !!dexAccount?.originDexAccount,
      DAs: dexAccount?.DAs,
      features: dexAccount?.features,
      ownerReferralCode: dexAccount?.ownerReferralCode,
      usedReferralCode: dexAccount?.usedReferralCode,
      isInWhitelist: dexAccount?.isInWhitelist,
    };
  }, [
    account,
    accessToken?.token,
    accessToken?.da_owner,
    dexAccount?.features,
    dexAccount?.originDexAccount,
    dexAccount?.hasSyncDA,
    dexAccount?.isInBlacklist,
    dexAccount?.da_owner,
    dexAccount?.accountId,
    dexAccount?.nonce,
    dexAccount?.keyNonce,
    dexAccount?.publicKeyX,
    dexAccount?.publicKeyY,
    dexAccount?.referrerId,
    dexAccount?.updating,
    dexAccount?.state,
    dexAccount?.DAs,
    dexAccount?.ownerReferralCode,
    dexAccount?.hasFetchedDA,
    hasUnlocked,
    dexAccount?.usedReferralCode,
    dexAccount?.isInWhitelist,
  ]);
}

export function useAllowPlaceIntentOrder(chain) {
  const { features } = useDexAccount();
  const info = useInfo();
  const swapWhiteFeatures = info?.swapWhiteFeatures;
  return useMemo(() => {
    if (swapWhiteFeatures && swapWhiteFeatures?.length > 0) {
      return (
        !swapWhiteFeatures?.includes(chain?.toLowerCase()) ||
        features?.[chain?.toLowerCase()]
      );
    }
    return true;
  }, [swapWhiteFeatures, features, chain]);
}

export function useShowAppFeature() {
  // const { features } = useDexAccount();
  // return !!features?.app;
  return true;
}

export function useShowSyncAppFeature() {
  const showApp = useShowAppFeature();
  const isPrivy = useIsPrivy();
  return showApp && !isPrivy;
}
// 放开白名单
export function useShowTurboRangeFeature() {
  // const { features } = useDexAccount();
  return true;
  // return (
  //   !!features?.turboRange || !!features?.turborange || !!features?.turbo_range
  // );
}

export function useIsLoadingDexAccount() {
  const info = useInfo();
  const dexAccount = useDexAccount();
  return useMemo(() => {
    return (
      dexAccount?.state === AccountStatus.FETCHING || !info?.exchangeAddress
    );
  }, [dexAccount.state, info?.exchangeAddress]);
}

export function useUpdateDexAccount() {
  const dispatch = useDispatch();
  const dexChainId = useDexChainId();
  const { account = '' } = useWalletWeb3();

  return useCallback(
    ({ dexAccount }) =>
      dispatch(updateDexAccount({ dexAccount, account, dexChainId })),
    [dispatch, dexChainId, account]
  );
}

export function useDelOtherDexAccounts() {
  const dispatch = useDispatch();
  const dexChainId = useDexChainId();
  return useCallback(
    ({ account }) => dispatch(delOtherDexAccounts({ account, dexChainId })),
    [dispatch, dexChainId]
  );
}

export function useRefreshDexAccount() {
  const dispatch = useDispatch();
  return useCallback(() => dispatch(setDexAccountRefreshIndex()), [dispatch]);
}

export function useDexAccountRefreshIndex() {
  return useSelector((state) => {
    return state?.dexAccount.refreshDexAccountIndex;
  });
}

export function useLocalTimeDiff() {
  return useSelector((state) => {
    return state?.dexAccount.localTimeDiff;
  });
}

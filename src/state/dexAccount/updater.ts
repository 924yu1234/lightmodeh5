/* eslint-disable consistent-return */
import { useCallback, useEffect, useRef } from 'react';
import { useDebounce, usePrevious } from 'ahooks';
import { useDispatch } from 'react-redux';

import { useSyncWalletStateActions } from 'src/bridge/stateSync';
import { useIsPrivy } from 'src/hooks/useWalletHooks';

import { USER_NOT_FUND } from 'js/constants/apiErr';
import createApiErrorTips from 'js/hooks/useCreateApiErrorTips';
import { useIntl } from 'js/locals';
import {
  useAllowQuickTrading,
  useHasAccessToken,
  useWalletOprs,
  useWalletWeb3,
} from 'js/providers/useWallet';
import {
  useDexChainId,
  useModals,
  useShowModal,
} from 'js/state/application/hooks';
import { logRequest } from 'js/utils/log';
import { logger } from 'js/utils/logger';
import message from 'js/utils/message';

import { ModalKeys } from '../application/reducer';
import { useSaveEarliestUserCreateTime } from '../user/hooks';
import { fetchingOriginDexAccount } from './actions';
import { useDexAccount, useDexAccountRefreshIndex } from './hooks';
import { useSignToViewEcdsa } from './opr/useSignToView';
import { AccountStatus } from './reducer';
import { getDexAccount } from './service';
import { getIntentAccount } from './services/service_da';

// let time = 1;

export default function DexAccountUpdater() {
  const dispatch = useDispatch();
  const { syncFetchOriginDexAccount } = useSyncWalletStateActions();

  const { updateAccessToken } = useWalletOprs();
  const dexChainId = useDexChainId();
  const { account } = useWalletWeb3();
  const dexAccount = useDexAccount();

  const intl = useIntl();
  const refreshDexAccountIndex = useDexAccountRefreshIndex();
  const debouncedRefreshIndex = useDebounce(refreshDexAccountIndex, {
    wait: 200,
  });
  const hasAccessToken = useHasAccessToken();
  const allowQuickTrading = useAllowQuickTrading();
  const signToViewEcdsa = useSignToViewEcdsa();
  const saveTime = useSaveEarliestUserCreateTime();

  const { visible: privyInitializeVisible } = useModals(
    ModalKeys.privy_initialize
  );
  const isPrivy = useIsPrivy();
  const showModal = useShowModal();

  const refreshDexAccount = useCallback(async () => {
    if (!dexChainId) return Promise.reject();
    if (!account) {
      return Promise.reject();
    }
    // app注入
    if (account.includes('_')) {
      syncFetchOriginDexAccount({
        account,
        dexChainId,
        dexAccount: {
          keyNonce: 1,
          owner: account,
          da_owner: account,
          state: AccountStatus.REGISTERED,
        },
      });
      return Promise.reject();
    }
    const { da_owner, ownerReferralCode } = await getIntentAccount({ account });
    if (!da_owner) {
      updateAccessToken('', account, '');
    }
    return getDexAccount({ account })
      .then((resp) => {
        logRequest({
          method: `get account success`,
          resp,
        });
        saveTime(resp.create_time * 1000);
        if (resp?.owner) {
          syncFetchOriginDexAccount({
            account,
            dexChainId,
            localTimeDiff: resp.localTimeDiff,
            dexAccount: {
              account: resp.owner,
              owner: resp.owner,
              referrerId: resp.referrer_id,
              keyNonce: resp.key_nonce || 1,
              assetNonce: resp.key_nonce === 0 ? 1 : resp.asset_nonce || 0,
              nonce: resp.nonce,
              accountId: resp.id ?? 0,
              publicKeyX: resp.public_key_x,
              publicKeyY: resp.public_key_y,
              updating: resp.updating,
              isInBlacklist: resp.is_black,
              features: resp.features ?? {},
              ownerReferralCode:
                ownerReferralCode || resp.owner_referral_code || '',
              state: da_owner
                ? AccountStatus.REGISTERED
                : AccountStatus.NOT_REGISTERED,
              da_owner,
              createTime: resp.create_time * 1000,
            },
          });
        }
      })
      .catch((err) => {
        if (da_owner) {
          syncFetchOriginDexAccount({
            account,
            dexChainId,
            dexAccount: {
              keyNonce: 1,
              owner: account,
              da_owner,
              state: AccountStatus.REGISTERED,
              ownerReferralCode,
            },
          });
          return;
        }
        logRequest({
          method: `get account error`,
          err,
          account,
        });
        logger.error(err);
        const code = err?.code;
        if (code === USER_NOT_FUND) {
          syncFetchOriginDexAccount({
            account,
            dexChainId,
            dexAccount: {
              owner: account,
              state: AccountStatus.NOT_REGISTERED,
            },
          });
          return Promise.reject({ code });
        }
        message.error(createApiErrorTips({ error: err, intl }));
      });
  }, [
    updateAccessToken,
    account,
    dexChainId,
    intl,
    saveTime,
    syncFetchOriginDexAccount,
  ]);

  useEffect(() => {
    if (!dexChainId) return;
    // refresh dexAccount when change account
    if (account) {
      dispatch(fetchingOriginDexAccount({ account, dexChainId }));
      refreshDexAccount().catch((error) => {
        message.error(createApiErrorTips({ error }));
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, account, dexChainId]);

  useEffect(() => {
    if (debouncedRefreshIndex > 0) {
      refreshDexAccount().catch(() => {});
    }
  }, [debouncedRefreshIndex, refreshDexAccount]);

  // 同一个账户段时间内不重复请求
  const ref = useRef<number>(0);
  useEffect(() => {
    ref.current = 0;
  }, [account]);

  // 允许快速下单并且账户未解锁且没有accessToken（一年有效期），解锁账户后自动触发使用eddsa获取accessToken
  const preHasUnlocked = usePrevious(dexAccount?.hasUnlocked);

  useEffect(() => {
    if (
      allowQuickTrading &&
      !preHasUnlocked &&
      preHasUnlocked !== undefined &&
      dexAccount?.hasUnlocked &&
      !dexAccount?.hasAccessToken &&
      dexAccount?.hasSyncDA
    ) {
      const now = Date.now();
      if (ref.current && now - ref.current < 30000) return;
      ref.current = Date.now();
      signToViewEcdsa();
    }
  }, [
    allowQuickTrading,
    preHasUnlocked,
    signToViewEcdsa,
    dexAccount?.hasUnlocked,
    dexAccount?.hasSyncDA,
    dexAccount?.hasAccessToken,
  ]);
  // 如果开启快速下单，解锁账户后自动触发使用walletID账户ecdsa获取accessToken
  useEffect(() => {
    if (
      allowQuickTrading &&
      !hasAccessToken &&
      dexAccount?.hasUnlocked &&
      dexAccount?.hasSyncDA &&
      account
    ) {
      const now = Date.now();
      if (ref.current && now - ref.current < 30000) return;
      ref.current = Date.now();
      signToViewEcdsa();
    }
  }, [
    hasAccessToken,
    dexAccount?.hasSyncDA,
    dexAccount?.hasUnlocked,
    allowQuickTrading,
    signToViewEcdsa,
    account,
  ]);

  useEffect(() => {
    if (
      isPrivy &&
      !privyInitializeVisible &&
      !dexAccount?.loading &&
      !dexAccount?.hasSyncDA &&
      !window.isConnectingWallet
    ) {
      showModal({ modal: ModalKeys.privy_initialize });
    }
  }, [
    isPrivy,
    dexAccount?.hasSyncDA,
    dexAccount?.loading,
    privyInitializeVisible,
    showModal,
  ]);

  return null;
}

DexAccountUpdater.propTypes = {};

import { useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';

import { updateChainInfo } from 'src/state/application/actions';
import { fetchOriginDexAccount } from 'src/state/dexAccount/actions';

import { emitWalletBridgeEvent } from './walletBridge';

export const TRADE_STATE_SYNC_EVENTS = {
  FETCH_ORIGIN_DEX_ACCOUNT: 'dexAccount/fetchOriginDexAccount',
  UPDATE_CHAIN_INFO: 'application/updateChainInfo',
} as const;

function _sanitizeDexAccountPayload(payload: Record<string, unknown>) {
  const nextPayload = { ...payload } as Record<string, unknown>;
  const dexAccount = payload.dexAccount as Record<string, unknown> | undefined;
  const DAs = payload.DAs as Record<string, unknown> | undefined;

  delete nextPayload.accessToken;
  delete nextPayload.encryptedMnemonic;
  delete nextPayload.encryptedPrivateKey;
  delete nextPayload.encryptedSecretKey;
  delete nextPayload.mnemonic;
  delete nextPayload.privateKey;
  delete nextPayload.secretKey;

  if (dexAccount) {
    const nextDexAccount = { ...dexAccount };
    delete nextDexAccount.secretKey;
    delete nextDexAccount.privateKey;
    delete nextDexAccount.mnemonic;
    delete nextDexAccount.encryptedMnemonic;
    delete nextDexAccount.encryptedPrivateKey;
    delete nextDexAccount.encryptedSecretKey;
    delete nextDexAccount.accessToken;

    const nextDexAccountDAs = nextDexAccount.DAs as
      | Record<string, Record<string, unknown>>
      | undefined;
    if (nextDexAccountDAs) {
      nextDexAccount.DAs = Object.entries(nextDexAccountDAs).reduce(
        (result, [chain, value]) => {
          if (!value || typeof value !== 'object') {
            return {
              ...result,
              [chain]: value,
            };
          }
          const nextValue = { ...value };
          delete nextValue.privateKey;
          delete nextValue.secretKey;
          delete nextValue.mnemonic;
          delete nextValue.encryptedMnemonic;
          delete nextValue.encryptedPrivateKey;
          delete nextValue.encryptedSecretKey;
          return {
            ...result,
            [chain]: nextValue,
          };
        },
        {} as Record<string, unknown>
      );
    }
    nextPayload.dexAccount = nextDexAccount;
  }

  if (DAs) {
    nextPayload.DAs = Object.entries(DAs).reduce((result, [chain, value]) => {
      if (!value || typeof value !== 'object') {
        return {
          ...result,
          [chain]: value,
        };
      }
      const nextValue = { ...value } as any;
      delete nextValue.privateKey;
      delete nextValue.secretKey;
      delete nextValue.mnemonic;
      delete nextValue.encryptedMnemonic;
      delete nextValue.encryptedPrivateKey;
      delete nextValue.encryptedSecretKey;
      return {
        ...result,
        [chain]: nextValue,
      };
    }, {} as Record<string, unknown>);
  }

  return nextPayload;
}

export function useSyncWalletStateActions() {
  const dispatch = useDispatch();

  const syncUpdateChainInfo = useCallback(
    (payload: Record<string, unknown>) => {
      dispatch(updateChainInfo(payload as any));
      emitWalletBridgeEvent(TRADE_STATE_SYNC_EVENTS.UPDATE_CHAIN_INFO, payload);
    },
    [dispatch]
  );

  const syncFetchOriginDexAccount = useCallback(
    (payload: Record<string, unknown>) => {
      dispatch(fetchOriginDexAccount(payload));
      emitWalletBridgeEvent(
        TRADE_STATE_SYNC_EVENTS.FETCH_ORIGIN_DEX_ACCOUNT,
        _sanitizeDexAccountPayload(payload)
      );
    },
    [dispatch]
  );

  return useMemo(
    () => ({
      syncFetchOriginDexAccount,
      syncUpdateChainInfo,
    }),
    [syncFetchOriginDexAccount, syncUpdateChainInfo]
  );
}

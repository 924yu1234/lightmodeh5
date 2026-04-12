import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { useSyncWalletStateActions } from 'src/bridge/stateSync';
import useWallet, {
  useGaEvent,
  useIsAppH5,
  useWalletOprs,
} from 'src/providers/useWallet';
import { logDexRegister } from 'src/utils/log/dexAccount';
import { logDA } from 'src/utils/log/swap';

import { useChains, useDexChainId } from '../application/hooks';
import { useDexAccount, useDexAccountRefreshIndex } from './hooks';
import { useGetDA, useSyncDA } from './services/service_da';

export default function DAUpdater() {
  const { DAs, account, accessToken } = useWallet();

  const dexChainId = useDexChainId();
  const { syncFetchOriginDexAccount } = useSyncWalletStateActions();
  const [map, setMap] = useState({});
  const getDA = useGetDA();
  const syncDA = useSyncDA();
  const chains = useChains();
  const dexAccount = useDexAccount();
  const refreshDexAccountIndex = useDexAccountRefreshIndex();
  const gaEvent = useGaEvent();
  const isAppH5 = useIsAppH5();
  const { callAppPromise } = useWalletOprs();

  const fetchOriginDA = useCallback(() => {
    if (!account) return;
    setMap((pre: any) => {
      return {
        ...pre,
        [account]: {
          ...pre[account],
          fetching: true,
        },
      };
    });
    getDA()
      .then(async (resp: any) => {
        const { features, used_referral_code, isInWhitelist, addresses } = resp;
        let h5_addresss = addresses || [];
        if (isAppH5) {
          try {
            h5_addresss = await callAppPromise('getAddresses', '');
          } catch (error) {
            h5_addresss = addresses || [];
          }
        }
        const sortedAddress = (h5_addresss || []).sort((a: any, b: any) => {
          return a.chain_name
            ?.toUpperCase()
            ?.localeCompare(b.chain_name?.toUpperCase());
        });

        const allAddressesMap = sortedAddress.reduce((acc: any, cur: any) => {
          const curAddressInfo = cur.chain_addresses_info[0] ?? {};
          acc[cur.chain_name?.toUpperCase()] = {
            chain: cur.chain_name?.toUpperCase(),
            address: curAddressInfo.address,
            publicKey: curAddressInfo.public_key,
            path: curAddressInfo.address_path,
          };
          return acc;
        }, {});

        logDA({
          account,
          BASE: allAddressesMap.BASE?.address || '',
          SOLANA: allAddressesMap.SOLANA?.address || '',
          da_owner: accessToken?.da_owner,
          features,
          used_referral_code,
          isInWhitelist,
        });
        gaEvent('get_da_account', {
          account,
          BASE: allAddressesMap.BASE?.address || '',
          SOLANA: allAddressesMap.SOLANA?.address || '',
          da_owner: accessToken?.da_owner,
          features,
          isInWhitelist,
        });
        setMap((pre: any) => {
          return {
            ...pre,
            [account]: {
              ...pre[account],
              ...allAddressesMap,
              fetching: false,
            },
          };
        });
        syncFetchOriginDexAccount({
          account,
          DAs: allAddressesMap,
          features,
          dexChainId,
          usedReferralCode: used_referral_code,
          isInWhitelist,
        });
      })
      .catch(() => {
        syncFetchOriginDexAccount({
          account,
          DAs: {},
          features: {},
          dexChainId,
        });
        setMap((pre: any) => {
          return {
            ...pre,
            [account]: {
              ...pre[account],
              fetching: false,
            },
          };
        });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    account,
    dexChainId,
    getDA,
    gaEvent,
    accessToken?.da_owner,
    syncFetchOriginDexAccount,
    isAppH5,
  ]);

  useEffect(() => {
    if (!dexChainId || !dexAccount?.hasSyncDA || !dexAccount?.hasAccessToken)
      return () => {};
    let timer: any;
    if (account) {
      timer = setTimeout(() => {
        fetchOriginDA();
      }, 200);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [
    account,
    dexChainId,
    fetchOriginDA,
    refreshDexAccountIndex,
    dexAccount?.hasSyncDA,
    dexAccount?.hasAccessToken,
  ]);

  const cur = useMemo(() => {
    return (map as any)[account];
  }, [map, account]);

  const preSyncTime = useRef(0);

  // web同步DA，必须要keyNonce
  useEffect(() => {
    if (!dexAccount?.keyNonce || !dexAccount?.hasSyncDA || isAppH5) return;
    if (!cur || cur?.fetching) return;
    if (!DAs?.DGWallet) return;
    // const sync = DAs?.BSC && !cur?.BSC;
    // const sync2 = DAs?.BSC?.address && DAs?.BSC?.address !== cur?.BSC?.address;
    const sync2 = chains.some((chain: any) => {
      const daAddress = (DAs as any)?.[chain]?.address;
      return daAddress && daAddress !== cur?.[chain]?.address;
    });
    if (sync2 && DAs?.SOLANA?.signature) {
      logDA({
        event: 'syncDA',
        DAs,
      });
      const now = Date.now();
      if (now - preSyncTime.current > 3000) {
        preSyncTime.current = now;
        syncDA({
          DAs,
          keyNonce: dexAccount?.keyNonce,
          referralCode: '',
        })
          .then(() => {
            fetchOriginDA();
          })
          .catch((err) => {
            logDexRegister({
              account,
              err,
              DAs,
              method: 'error syncDA',
            });
          });
      }
    }
  }, [
    chains,
    dexAccount?.keyNonce,
    dexAccount?.hasSyncDA,
    isAppH5,
    account,
    cur,
    DAs,
    syncDA,
    fetchOriginDA,
  ]);
  return null;
}

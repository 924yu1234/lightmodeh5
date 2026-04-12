import { useCallback, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';

import { useRefreshSwapBalanceIndex } from 'src/hooks/useRefreshData/useRefreshSwapBalance';
import { useUserWebSocket } from 'src/providers/userWebsocket/useUserWebsocket';
import { useInfoKey, useShowModal } from 'src/state/application/hooks';
import { ModalKeys } from 'src/state/application/reducer';
import { logDexBalance } from 'src/utils/log/dexAccount';

import { useWalletWeb3 } from 'js/providers/useWallet';
import { useDexAccount } from 'js/state/dexAccount/hooks';

import { useRefreshSwapBalance } from './hooks';
import {
  fetchingSwapBalanceListeners,
  setApiBalancesDisconnectedChains,
  updateSwapBalanceFromBalanceUpdate,
  updateSwapBalanceFromWs,
  updateSwapBalanceResults,
} from './reducer';
import {
  useFetchSwapBalanceUpdates,
  useFetchSwapBalanceV2,
  useSwapWsToDexBalance,
  useWsToSwapBalance,
} from './service';

export default function SwapBalanceUpdater() {
  const dispatch = useDispatch();
  const { account } = useWalletWeb3();
  const dexAccount = useDexAccount();
  const refreshSwapBalanceIndex = useRefreshSwapBalanceIndex();
  const refreshSwapBalance = useRefreshSwapBalance();
  const infoKey = useInfoKey();
  const { subscribe, unsubscribe, readyState } = useUserWebSocket();
  const wsToBalance = useWsToSwapBalance();
  const wsToDexBalance = useSwapWsToDexBalance();
  const refreshFailedChainsIndex = useRef(0);

  const fetchBalanceV2 = useFetchSwapBalanceV2();
  const showModal = useShowModal();

  const fetchData = useCallback(() => {
    return fetchBalanceV2()
      .then((resp) => {
        const failedChains = resp.failed_chains || [];
        if (failedChains?.length > 0) {
          const refreshTime = Math.min(
            (refreshFailedChainsIndex?.current || 0) * 10000,
            30000
          );
          setTimeout(() => {
            refreshFailedChainsIndex.current += 1;
            logDexBalance({
              method: 'fetch balance failed chains',
              failedChains: failedChains.join(','),
              time: Date.now(),
              refreshIndex: refreshFailedChainsIndex,
            });
            refreshSwapBalance();
          }, refreshTime);
        }
        dispatch(setApiBalancesDisconnectedChains({ chains: failedChains }));
        dispatch(
          updateSwapBalanceResults({
            results: resp.balances,
            account,
            failedChains,
          })
        );
      })
      .catch((err) => {
        if (err?.code === 401401) {
          showModal({ modal: ModalKeys.tips_localTime });
        }
        dispatch(updateSwapBalanceResults({ results: {}, account }));
        return Promise.reject(err);
      });
  }, [account, dispatch, fetchBalanceV2, showModal, refreshSwapBalance]);

  const fetchBalanceUpdates = useFetchSwapBalanceUpdates();

  const fetchUpdates = useCallback(() => {
    return fetchBalanceUpdates()
      .then((resp) => {
        dispatch(
          updateSwapBalanceFromBalanceUpdate({
            results: resp,
            account,
          })
        );
      })
      .catch((err) => {
        return Promise.reject(err);
      });
  }, [account, dispatch, fetchBalanceUpdates]);

  const ref = useRef();

  useEffect(() => {
    if (!dexAccount?.hasAccessToken || !infoKey) {
      return;
    }
    if (account) dispatch(fetchingSwapBalanceListeners({ account }));
  }, [account, dispatch, dexAccount?.hasAccessToken, infoKey]);

  useEffect(() => {
    if (!dexAccount?.hasAccessToken || !infoKey) {
      return;
    }
    const now = Date.now();
    // 1秒内不重复获取余额
    if (ref.current && now - ref.current < 1000) return;
    ref.current = Date.now();
    fetchData().catch(() => {
      ref.current = null;
    });
    fetchUpdates().catch(() => {
      ref.current = null;
    });
  }, [
    infoKey,
    account,
    fetchData,
    fetchUpdates,
    dispatch,
    dexAccount?.hasAccessToken,
    refreshSwapBalanceIndex,
  ]);

  useEffect(() => {
    if (readyState !== 1) return () => {};
    subscribe({
      componentkey: 'swapBalanceUpdater',
      params: [`swapBalanceUpdate`],
      callback: (res) => {
        setTimeout(() => {
          refreshSwapBalance();
        }, 2000);

        wsToBalance({ data: res }).then(({ result } = {}) => {
          if (result) {
            // saveTokensWithBalance({ tokens: [token] });
            dispatch(
              updateSwapBalanceFromWs({
                account,
                result,
              })
            );
          }
        });
      },
    });
    return () => {
      unsubscribe({
        componentkey: 'swapBalanceUpdater',
        params: [`swapBalance`],
      });
    };
  }, [
    account,
    wsToBalance,
    wsToDexBalance,
    refreshSwapBalance,
    readyState,
    unsubscribe,
    subscribe,
    dispatch,
    dexAccount?.account,
  ]);

  return null;
}

import { useEffect } from 'react';
import { usePrevious } from '@mantine/hooks';
import { useDispatch } from 'react-redux';

import { SwapOrderStatus } from 'src/constants/consts';
import { useRefreshSwapIndex } from 'src/hooks/useRefreshData/useRefreshSwapOrders';
import { useShowSwapNotification } from 'src/providers/useSwapNotification';
import { useIsShowCurrentPair } from 'src/state/user/hooks';
import { useThemeParams } from 'src/theme';
import { logSwapOrder } from 'src/utils/log/swap';

import { useUserWebSocket } from 'js/providers/userWebsocket/useUserWebsocket';
import { useWalletWeb3 } from 'js/providers/useWallet';
import { useDexAccount } from 'js/state/dexAccount/hooks';

import { useCurrentSwapPair } from '../pair/hooks';
import {
  useFetchingNextPageIndex,
  useRefreshSwapOrders,
  useUpdateSwapOrder,
} from './hooks';
import {
  fetchedNextPageSwapOrders,
  fetchedSwapOrders,
  fetchingSwapOrders,
} from './reducer';
import {
  useGetAllPendingSwapOrders,
  useGetSwapOrders,
  useWsToSwapOrder,
} from './service';

export default function SwapOrdersUpdater() {
  const dispatch = useDispatch();
  const { account } = useWalletWeb3();
  const dexAccount = useDexAccount();
  const pageSize = 100;
  const wsToOrder = useWsToSwapOrder();
  const { subscribe, unsubscribe, readyState } = useUserWebSocket();
  const refreshIndex = useRefreshSwapIndex();
  const refreshSwapOrders = useRefreshSwapOrders();
  const { isMobile } = useThemeParams();
  const fetchAllPendingSwapOrders = useGetAllPendingSwapOrders();
  const showCurrentPair = useIsShowCurrentPair('swap');
  const { pairId } = useCurrentSwapPair();

  const searchPairId = showCurrentPair ? pairId : undefined;

  const { showSwapOrder, hideAll } = useShowSwapNotification();
  const updateSwapOrder = useUpdateSwapOrder();

  const preAccount = usePrevious(account);

  useEffect(() => {
    if ((preAccount && preAccount !== account) || !dexAccount?.hasAccessToken) {
      dispatch(
        fetchedSwapOrders({
          list: [],
          current: 1,
          pageSize,
          total: 0,
        })
      );
    }
  }, [dispatch, preAccount, account, dexAccount.hasAccessToken]);

  useEffect(() => {
    if (refreshIndex === 1) dispatch(fetchingSwapOrders());
    fetchAllPendingSwapOrders({ searchPairId })
      .then((resp: any) => {
        dispatch(
          fetchedSwapOrders({
            list: resp.list,
            current: resp.current,
            total: resp.total,
          })
        );
      })
      .catch(() => {});
  }, [
    dexAccount.hasAccessToken,
    dexAccount?.account,
    dispatch,
    fetchAllPendingSwapOrders,
    refreshIndex,
    searchPairId,
  ]);

  useEffect(() => {
    if (readyState !== 1) return () => {};
    subscribe({
      componentkey: 'swapOrdersUpdater',
      params: [`swapOrders`],
      callback: (res) => {
        wsToOrder({ data: res }).then((order: any) => {
          logSwapOrder({
            method: 'success swap ws',
            status: order?.status,
            resp: {
              ...order,
              payToken: null,
              quoteToken: null,
              baseToken: null,
              quote_token: null,
              base_token: null,
              gas_fee_token: null,
              fee_token: null,
            },
          });
          if (!order) {
            setTimeout(() => {
              refreshSwapOrders();
            }, 2000);
            return;
          }
          let showOrder = false;
          // 非SOLANA链的在quickSuccess时，显示toast，success不显示toast
          if (
            order?.status !== SwapOrderStatus.success ||
            order?.chain_name === 'SOLANA' ||
            order?.chain === 'SOLANA'
          ) {
            showOrder = true;
            // showSwapOrder({ order });
          }

          updateSwapOrder(order, showOrder && showSwapOrder);
        });
      },
    });
    return () => {
      unsubscribe({
        componentkey: 'swapOrdersUpdater',
        params: [`swapOrders`],
      });
    };
  }, [
    showSwapOrder,
    readyState,
    unsubscribe,
    subscribe,
    updateSwapOrder,
    dexAccount?.account,
    refreshSwapOrders,
    wsToOrder,
    isMobile,
    hideAll,
  ]);

  const fetchingNext = useFetchingNextPageIndex();
  const getSwapOrders = useGetSwapOrders();
  useEffect(() => {
    if (fetchingNext) {
      getSwapOrders({
        pageSize,
        current: fetchingNext,
        searchPairId,
      }).then((resp) => {
        dispatch(
          fetchedNextPageSwapOrders({
            list: resp.list,
            current: fetchingNext,
            hasNext: resp.hasNext,
            pairId: searchPairId,
          })
        );
      });
    }
  }, [fetchingNext, getSwapOrders, searchPairId, dispatch]);

  useEffect(() => {
    return () => {
      hideAll();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}

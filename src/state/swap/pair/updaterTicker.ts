import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import useRefresh from 'src/hooks/useRefreshData/useRefresh';

import { useUpdateFromTicker } from '../tokenInfo/hooks';
import {
  useCurrentSwapPair,
  useRefreshSwapPairTicker,
  useRefreshSwapPairTickerIndex,
} from './hooks';
import { fetchingSwapPairTicker, initSwapPairTicker } from './reducer';
import { getSwapPairTicker } from './services/ticker';
import useCheckPairBlacklist from './useCheckBlacklist';

export default function SwapPairUpdaterTicker() {
  const dispatch = useDispatch();
  const checkPairBlacklist = useCheckPairBlacklist();

  const { baseTokenId, quoteTokenId, pairId } = useCurrentSwapPair();

  const refreshTickerIndex = useRefreshSwapPairTickerIndex();
  const refreshSwapTicker = useRefreshSwapPairTicker();
  const updateFromTicker = useUpdateFromTicker();

  // const { subscribe, unsubscribe, readyState } = useScoket();
  // 30s 刷新一次
  const refreshIndex = useRefresh(500);

  useEffect(() => {
    checkPairBlacklist();
  }, [checkPairBlacklist]);

  useEffect(() => {
    if (!pairId) return;
    dispatch(fetchingSwapPairTicker({ pairId }));
    getSwapPairTicker({
      pairId,
    })
      .then((resp) => {
        updateFromTicker({ ticker: resp, id: resp.base_token_id });
        dispatch(initSwapPairTicker({ data: resp, pairId }));
      })
      .catch((error) => {
        if (error.code === -500) {
          setTimeout(() => {
            refreshSwapTicker();
          }, 1000);
        }
      });
  }, [
    updateFromTicker,
    refreshSwapTicker,
    pairId,
    dispatch,
    baseTokenId,
    quoteTokenId,
    refreshTickerIndex,
    refreshIndex,
  ]);

  // 暂时使用trade推送更新ticker
  // ws update ticker/trade
  // useEffect(() => {
  //   if (!pairId || readyState !== 1) return () => {};
  //   subscribe({
  //     componentkey: 'swapTicker',
  //     params: [`${baseTokenId}.${quoteTokenId}@ticker`],
  //     callback: (res) => {
  //       if (res) {
  //         const ticker = wsToSwapPairTicker({
  //           data: res,
  //         });
  //         dispatch(
  //           updateSwapPairTicker({
  //             data: ticker,
  //             pairId,
  //           })
  //         );
  //       }
  //     },
  //   });

  //   return () => {
  //     unsubscribe({
  //       componentkey: 'ticker',
  //       params: [`${baseTokenId}.${quoteTokenId}@ticker`],
  //     });
  //   };
  // }, [
  //   pairId,
  //   baseTokenId,
  //   quoteTokenId,
  //   readyState,
  //   unsubscribe,
  //   subscribe,
  //   dispatch,
  // ]);

  return null;
}

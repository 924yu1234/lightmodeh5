/* eslint-disable no-param-reassign */
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useThrottle } from 'ahooks';
import { chunk as lodashChunk } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';

import useRefresh from 'src/hooks/useRefreshData/useRefresh';

import { retry } from 'js/utils/retry';

import {
  errorFetchingSwapInfo,
  fetchingListeners,
  updateSwapInfoPrice,
} from './reducer';
import { fetchSwapTokenPrice } from './service';
const refreshTime = 30000;

export default function SwapTokenInfoUpdater() {
  const dispatch = useDispatch();
  const state = useSelector((app) => app.swapTokenInfo);
  const debouncedListeners = useThrottle(state.listeners, 300);
  const refreshIndex = useRefresh(30000);

  const fetchChunk = useCallback(({ chunk }) => {
    return fetchSwapTokenPrice({ tokenIds: chunk }).then((resp) => {
      return resp.reduce((re, tokenPrice) => {
        re[tokenPrice.id] = tokenPrice;
        return re;
      }, {});
    });
  }, []);

  const cancellations = useRef();
  const listeningKeys = useMemo(() => {
    const listeners = debouncedListeners;
    if (!listeners) return {};
    return listeners;
  }, [debouncedListeners]);

  const callCodes = useMemo(() => {
    const infos = state.infos;
    if (!infos) return Object.keys(listeningKeys);
    const minTime = Date.now() - refreshTime;
    return Object.keys(listeningKeys).filter((callKey) => {
      const data = infos[callKey];
      if (!data) return true;
      if (data?.time > minTime) return false;
      if (data?.loading) return false;
      return true;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.infos, listeningKeys, refreshIndex]);

  const serializedOutdatedCallKeys = useMemo(
    () => JSON.stringify(callCodes),
    [callCodes]
  );

  useEffect(() => {
    const outdatedCallKeys = JSON.parse(serializedOutdatedCallKeys);

    if (outdatedCallKeys.length === 0) {
      return;
    }

    const chunkedCalls = lodashChunk(outdatedCallKeys, 100);
    dispatch(
      fetchingListeners({
        ids: outdatedCallKeys,
      })
    );

    cancellations.current = {
      cancellations: chunkedCalls.map((chunk) => {
        const { cancel, promise } = retry(
          () =>
            fetchChunk({
              chunk,
            }),
          {
            n: Infinity,
            minWait: 1000,
            maxWait: 5000,
          }
        );
        promise
          .then((results) => {
            dispatch(
              updateSwapInfoPrice({
                results,
              })
            );
          })
          .catch(() => {
            dispatch(
              errorFetchingSwapInfo({
                ids: chunk,
              })
            );
          });
        return cancel;
      }),
    };
  }, [fetchChunk, dispatch, serializedOutdatedCallKeys]);

  // const { subscribe, unsubscribe, readyState } = useScoket();
  // const wsToSwapTrade = useWsToSwapTrade();

  // const wsKeysStr = useMemo(() => {
  //   return JSON.stringify(
  //     Object.keys(listeningKeys).map((pairPriceKey) => {
  //       return pairPriceKey;
  //     })
  //   );
  // }, [listeningKeys]);

  // useEffect(() => {
  //   const currentKeys = JSON.parse(wsKeysStr);
  //   if (readyState === 1) {
  //     // 将 currentKeys 分组,每组10个
  //     const chunkedKeys = chunk(currentKeys, 100);

  //     // 为每组分别订阅
  //     chunkedKeys.forEach((keyGroup, i) => {
  //       setTimeout(() => {
  //         subscribe({
  //           componentkey: 'swapPairPrice',
  //           params: keyGroup.map((pairPriceKey) => {
  //             const { baseTokenId, quoteTokenId } =
  //               formatSwapPairPriceKey(pairPriceKey);
  //             return `${baseTokenId}.${quoteTokenId}@trade`;
  //           }),
  //           callback: (res) => {
  //             if (res) {
  //               console.log('res', res);
  //               // wsToSwapTrade({ data: res }).then((trade) => {
  //               //   // if (trade) {
  //               //   //   dispatch(
  //               //   //     updateSwapInfoFromWs({
  //               //   //       result: { price: trade.last_price },
  //               //   //       id: trade.id,
  //               //   //     })
  //               //   //   );
  //               //   // }
  //               // });
  //             }
  //           },
  //         });
  //       }, i * 300);
  //     });
  //   }

  //   return () => {
  //     if (currentKeys?.length) {
  //       // 清理订阅时也需要分组处理
  //       const chunkedKeys = chunk(currentKeys, 100);
  //       chunkedKeys.forEach((keyGroup, i) => {
  //         setTimeout(() => {
  //           unsubscribe({
  //             componentkey: 'swapPairPrice',
  //             params: keyGroup.map((pairPriceKey) => {
  //               const { baseTokenId, quoteTokenId } =
  //                 formatSwapPairPriceKey(pairPriceKey);
  //               return `${baseTokenId}.${quoteTokenId}@trade`;
  //             }),
  //           });
  //         }, i * 300);
  //       });
  //     }
  //   };
  // }, [unsubscribe, subscribe, dispatch, wsKeysStr, wsToSwapTrade, readyState]);

  return null;
}

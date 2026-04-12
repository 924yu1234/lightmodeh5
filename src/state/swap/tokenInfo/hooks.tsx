import { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AppState } from 'src/state';
import { isNumber } from 'src/utils/digit';

import { Pair } from 'js/constants/interface/pairs';

import {
  addListeners,
  removeListeners,
  updateSwapInfo,
  updateSwapInfoPrice,
} from './reducer';

export function usePairsWithTokenInfo({ pairs }: { pairs: any[] }) {
  const ids = useMemo(() => {
    return pairs.map((pair) => pair.baseTokenId);
  }, [pairs]);
  const tokenInfos = useSwapTokensInfo({
    ids,
  });
  return useMemo(() => {
    return pairs.map((pair) => {
      return {
        ...pair,
        ...tokenInfos[pair.baseTokenId],
      };
    });
  }, [pairs, tokenInfos]);
}

export function useTokensWithTokenInfo({ tokens }: { tokens: any[] }) {
  const ids = useMemo(() => {
    return tokens.filter((token) => token?.id).map((token) => token?.id);
  }, [tokens]);
  const tokenInfos = useSwapTokensInfo({
    ids,
  });
  return useMemo(() => {
    return tokens.map((token) => {
      return { ...token, ...tokenInfos[token?.id] };
    });
  }, [tokens, tokenInfos]);
}

export function useSwapTokensInfo({ ids }: { ids: number[] }) {
  const infos = useSelector((state: AppState) => state.swapTokenInfo.infos);
  const dispatch = useDispatch();

  useEffect(() => {
    if (ids.length === 0) return () => {};

    dispatch(
      addListeners({
        ids,
      })
    );

    return () => {
      dispatch(removeListeners({ ids }));
    };
  }, [dispatch, ids]);

  return useMemo(() => {
    return ids.reduce((re: any, id) => {
      const result = (infos as any)?.[id];
      if (result?.data) {
        re[id] = convertData(result.data, id);
      } else {
        re[id] = { id, loadingPrice: !!result?.loading || !result?.data };
      }
      return re;
    }, {});
  }, [infos, ids]);
}

export function convertData(data: any, id: number) {
  const { info } = data;
  let mkp = data.marketCap;
  if (info?.price && info?.price !== data.price && mkp) {
    mkp = (data.price / info.price) * info.marketCap;
  }
  return {
    id,
    price: isNumber(data.price) ? Number(data.price) : 0,
    percent: isNumber(data.percent) ? Number(data.percent) : '',
    loadingPrice: false,
    marketCap: isNumber(mkp) ? Number(mkp) : 0,
    liquidity: isNumber(data.liquidity) ? Number(data.liquidity) : 0,
    poolVolume: isNumber(data.poolVolume) ? Number(data.poolVolume) : 0,
  };
}

export function useSwapTokenInfo(id?: number) {
  const infos = useSwapTokensInfo({ ids: id ? [id] : [] });
  return useMemo(() => {
    if (!id) return {};
    return infos[id];
  }, [infos, id]);
}

export function useUpdateFromHotPairs() {
  const dispatch = useDispatch();
  return useCallback(
    ({ pairs }: { pairs: Pair[] }) => {
      const now = Date.now();
      const results = pairs.reduce((re: any, pair: any) => {
        const id = pair?.baseTokenId;
        (re as any)[id] = {
          price: pair.price,
          percent: pair.percent,
          infoTime: now,
          marketCap: pair.marketCap,
          liquidity: pair.liquidity,
          poolVolume: pair.poolVolume,
          info: {
            price: pair.price,
            percent: pair.percent,
            marketCap: pair.marketCap,
            liquidity: pair.liquidity,
            poolVolume: pair.poolVolume,
          },
        };
        return re;
      }, {});
      dispatch(updateSwapInfoPrice({ results }));
    },
    [dispatch]
  );
}

export function useUpdateFromSearchRes() {
  const dispatch = useDispatch();
  return useCallback(
    ({ pairs }: { pairs: Pair[] }) => {
      const now = Date.now();
      const results = pairs.reduce((re: any, pair: any) => {
        const id = pair?.baseTokenId;
        (re as any)[id] = {
          price: pair.price,
          percent: pair.percent,
          infoTime: now,
          marketCap: pair.marketCap,
          liquidity: pair.liquidity,
          poolVolume: pair.poolVolume,
          info: {
            price: pair.price,
            percent: pair.percent,
            marketCap: pair.marketCap,
            liquidity: pair.liquidity,
            poolVolume: pair.poolVolume,
          },
        };
        return re;
      }, {});
      dispatch(updateSwapInfo({ results }));
    },
    [dispatch]
  );
}

export function useUpdateFromTicker() {
  const dispatch = useDispatch();

  return useCallback(
    ({ ticker, id }: { ticker: any; id: number }) => {
      dispatch(
        updateSwapInfoPrice({
          results: {
            [id]: {
              price: ticker.last_price,
              percent: ticker.price_change_percent,
              infoTime: Date.now(),
              marketCap: ticker.marketCap,
              liquidity: ticker.liquidity,
              poolVolume: ticker.poolVolume,
              info: {
                price: ticker.last_price,
                percent: ticker.price_change_percent,
                marketCap: ticker.marketCap,
                liquidity: ticker.liquidity,
                poolVolume: ticker.poolVolume,
              },
            },
          },
        })
      );
    },
    [dispatch]
  );
}

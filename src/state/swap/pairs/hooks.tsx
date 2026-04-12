import { useCallback, useEffect, useMemo, useState } from 'react';
import { orderBy as orderByFn } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';

import { OrderDir } from 'src/constants/consts';
import { Type_DAChains } from 'src/da';
import useRefresh from 'src/hooks/useRefreshData/useRefresh';
import { useUserFlag } from 'src/state/user/hooks';

import { Pair } from 'js/constants/interface/pairs';
import { useInfoKey } from 'js/state/application/hooks';
import { isNumber } from 'js/utils/digit';

import { AppState } from '../..';
import { usePairsWithTokenInfo } from '../tokenInfo/hooks';
import { refreshSwapPairs, toggleFavoriteSwapPairs } from './reducer';
import {
  checkCMCPair,
  checkPairs,
  checkSwapPair,
  getPairsByTypes,
} from './service';

export function useAllSwapPairs(): Pair[] {
  const pairs = useSelector((state: AppState) => state.swapPairs.pairs);

  return useMemo(() => {
    return pairs || [];
  }, [pairs]);
}

export function useAllStocksPairs(): Pair[] {
  const pairs = useSelector((state: AppState) => state.swapPairs.stocksPairs);
  return useMemo(() => {
    return pairs || [];
  }, [pairs]);
}

export function useAllSwapPairsMap() {
  const pairs = useAllSwapPairs();
  return useMemo(() => {
    return pairs.reduce((re: any, p: Pair) => {
      re[p.pairId] = p;
      return re;
    }, {});
  }, [pairs]);
}

export function useSwapPairs({
  current,
  pageSize,
  orderBy = 'index',
  orderDir = 'asc',
}: {
  current: number;
  pageSize: number;
  orderBy:
    | 'market'
    | 'price'
    | 'change'
    | 'txns'
    | 'poolVolume'
    | 'marketCap'
    | 'liquidity'
    | 'index';
  orderDir: 'desc' | 'asc' | '';
}) {
  const checkSwapPairs = useCheckSwapPairs();
  // 每次使用usePairs时检查，30秒未更新则重新获取
  useEffect(() => {
    checkSwapPairs();
  }, [checkSwapPairs]);

  const pairs = useAllSwapPairs();
  const pairsWithPrice = usePairsWithTokenInfo({ pairs });
  const orderedPairs = useMemo(() => {
    return orderByFn(
      pairsWithPrice,
      (d: any) => (orderBy === 'market' ? d[orderBy] : Number(d[orderBy])),
      orderDir as any
    );
  }, [pairsWithPrice, orderBy, orderDir]);

  return useMemo(() => {
    return {
      total: orderedPairs.length,
      list: orderedPairs.slice(0, current * pageSize),
    };
  }, [orderedPairs, current, pageSize]);
}

export function useSwapPair({ pairId }: { pairId: number }) {
  const allPairs = useAllSwapPairs();
  const checkPair = useCheckSwapPairs();
  useEffect(() => {
    checkPair();
  }, [checkPair]);
  return useMemo(() => {
    return allPairs.find((p) => p.pairId === pairId);
  }, [allPairs, pairId]);
}

export function useFavoriteSwapPairs({
  orderBy = 'addTime',
  orderDir = 'asc',
  needFilterChain = false,
}: {
  orderBy: 'addTime' | 'market' | 'price' | 'change';
  orderDir: OrderDir;
  needFilterChain: boolean;
}) {
  const infoKey = useInfoKey();
  const favoritesMap = useSelector(
    (state: AppState) => state.swapPairs.favorites?.[infoKey]
  );
  const chain = useUserFlag('choose_swap_pair_chain');
  const pairs = useMemo(() => {
    return (Object.values(favoritesMap ?? {}) || [])
      .filter((p) => p.pairId > 0)
      .filter((p) => {
        if (!needFilterChain) return true;
        return chain === 'all' || p.baseToken?.chain === chain;
      })
      .map((p) => ({
        ...p,
        isSwapPair: true,
        isFavoritePair: true,
        market: `${p?.baseToken?.symbol}/${p?.quoteToken?.symbol}`,
      }));
  }, [favoritesMap, needFilterChain, chain]);

  const pairsWithPrice = usePairsWithTokenInfo({ pairs });

  return useMemo(() => {
    if (!pairsWithPrice?.length) return { pairs: [] };
    return {
      pairs: orderByFn(
        pairsWithPrice,
        (d: any) => (orderBy === 'market' ? d[orderBy] : Number(d[orderBy])),
        orderDir || ('desc' as any)
      ),
    };
  }, [pairsWithPrice, orderBy, orderDir]);
}

export function useIsInFavoriteSwapPairs({ pairId }: { pairId: number }) {
  const infoKey = useInfoKey();
  const favorites = useSelector(
    (state: AppState) => state.swapPairs.favorites?.[infoKey]
  );
  return useMemo(() => {
    if (!favorites) return false;
    return !!favorites[pairId];
  }, [favorites, pairId]);
}

export function useAddFavoriteSwapPair() {
  const dispatch = useDispatch();
  const infoKey = useInfoKey();

  return useCallback(
    ({ pair }: { pair: Pair }) => {
      dispatch(toggleFavoriteSwapPairs({ pair, infoKey, flag: true }));
    },
    [dispatch, infoKey]
  );
}

export function useRemoveFavoriteSwapPair() {
  const dispatch = useDispatch();
  const infoKey = useInfoKey();

  return useCallback(
    ({ pair }: { pair: Pair }) => {
      dispatch(toggleFavoriteSwapPairs({ pair, infoKey, flag: false }));
    },
    [dispatch, infoKey]
  );
}

export function useRefreshSwapPairs() {
  const dispatch = useDispatch();

  return useCallback(() => {
    dispatch(refreshSwapPairs());
  }, [dispatch]);
}

export function useSearchSwapPairInDex() {
  const localePairs = useAllSwapPairs();
  return useCallback(
    ({ pairId }: { pairId: number }) => {
      let localePair;
      if (isNumber(pairId)) {
        localePair = localePairs.find((d) => d.pairId === Number(pairId));
      }
      if (localePair) return Promise.resolve(localePair);
      // TODO 10340: 检查pair
      return checkSwapPair({
        pairId,
        baseId: undefined,
        baseCode: undefined,
        chain: undefined,
      })
        .then((resp) => {
          if (resp.pairId > 0) {
            return resp;
          }
          return null;
        })
        .catch(() => {
          return {};
        });
    },
    [localePairs]
  );
}

export function useSwapPairInCMC({
  baseSymbol,
  quoteSymbol,
}: {
  baseSymbol: string;
  quoteSymbol: string;
}) {
  const [resMap, setResMap] = useState({});
  const key = `${baseSymbol}_${quoteSymbol}`;

  const cur = useMemo(() => {
    if (!quoteSymbol || !baseSymbol) {
      return {};
    }
    return (resMap as any)[key];
  }, [resMap, baseSymbol, quoteSymbol, key]);

  useEffect(() => {
    if (!quoteSymbol || !baseSymbol) {
      return;
    }
    checkCMCPair({ key })
      .then((resp: any) => {
        setResMap((pre: any) => {
          return {
            ...pre,
            [key]: { baseToken: resp?.base_token },
          };
        });
      })
      .catch(() => {
        setResMap((pre: any) => {
          return {
            ...pre,
            [key]: {},
          };
        });
      });
  }, [key, quoteSymbol, baseSymbol]);

  return useMemo(() => {
    if (!cur) return { loading: true };
    return {
      loading: false,
      baseToken: cur.baseToken,
    };
  }, [cur]);
}

// 检查pairs数据30秒内有没有刷新
export function useCheckSwapPairs() {
  const pairsRefreshTime = useSelector(
    (state: AppState) => state.swapPairs.pairsRefreshTime
  );
  const refresh = useRefresh(30000);
  const refreshPairs = useRefreshSwapPairs();
  return useCallback(() => {
    if (Date.now() - pairsRefreshTime > 30000) {
      refreshPairs();
      return false;
    }
    return true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshPairs, refresh]);
}

export function useSwapPairsByCodes({
  codes,
  chain,
}: {
  codes: string[];
  chain: string;
}) {
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState<any>([]);

  const refreshIndex = useRefresh(15000);

  useEffect(() => {
    if (!codes?.length) return;
    checkPairs({
      data: codes.map((d) => ({ token_ca: d, chain_name: chain })),
    } as any)
      .then((resp) => {
        setList(
          resp.list.map((d: any, i: number) => {
            return {
              ...d,
              index: i,
            };
          })
        );
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [codes, chain, refreshIndex]);

  return useMemo(() => {
    return {
      loading,
      list: list || [],
      total: list?.length || 0,
    };
  }, [loading, list]);
}

const cacheData = new Map<string, any>();
export function useSwapPairsForTypes({
  type = '',
  chain,
  current,
  pageSize,
  orderBy = 'index',
  orderDir = 'asc',
  noRefresh = false,
}: {
  type: string;
  chain: Type_DAChains | 'all';
  current: number;
  pageSize: number;
  orderBy: 'index' | 'market' | 'price' | 'change';
  orderDir: 'asc' | 'desc';
  noRefresh?: boolean;
}) {
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState<any>([]);
  const [refreshIndex, setRefreshIndex] = useState(0);

  useEffect(() => {
    if (noRefresh) return;
    setTimeout(() => {
      setRefreshIndex(Math.ceil(Date.now() / 15000));
    }, 15000);
  }, [refreshIndex, noRefresh]);

  useEffect(() => {
    const timestamp = Math.ceil(Date.now() / 15000);
    const cacheKey = `${type}_${chain}_${current}_${pageSize}_${orderBy}_${orderDir}_${timestamp}`;
    let promise: any;
    if (cacheData?.size > 10) {
      cacheData.clear();
    }
    if (cacheData.has(cacheKey)) {
      promise = cacheData.get(cacheKey);
    } else {
      promise = getPairsByTypes({ type });
      cacheData.set(cacheKey, promise);
    }
    promise
      .then((resp: any) => {
        setList(resp.list);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, refreshIndex]);

  const showList = useMemo(() => {
    if (chain === 'all') return list;
    return list.filter((d: any) => d.baseToken?.chain === chain);
  }, [list, chain]);

  return useMemo(() => {
    const orderedList = orderByFn(
      showList,
      (d: any) => (orderBy === 'market' ? d[orderBy] : Number(d[orderBy])),
      orderDir as any
    );
    return {
      loading,
      list: orderedList.slice((current - 1) * pageSize, current * pageSize),
      total: orderedList?.length || 0,
    };
  }, [loading, showList, current, pageSize, orderBy, orderDir]);
}

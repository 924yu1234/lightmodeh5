import React, { useContext, useEffect, useMemo, useState } from 'react';

import { useSwapPairsForTypes } from 'src/state/swap/pairs/hooks';

import {
  DailyHoldersApiItem,
  DexPoolDailyDataApiItem,
  fetchDailyHolders,
  fetchDexPoolDailyData,
} from '../dashboard/service';
import {
  DailyTokenSupplyForSingleTokenApiItem,
  fetchNews,
  fetchTokenMeta,
  getDailyTokenSupplyForSingleToken,
} from './service';

export interface StocksDetailContext {
  code: string;
  pair: any;
  tokenMeta: any;
  news: any;
  dailyTokenSupply: DailyTokenSupplyForSingleTokenApiItem[];
  holdersData: DailyHoldersApiItem[];
  poolDailyData: DexPoolDailyDataApiItem[];
  list: any[];
}

const SetContext = React.createContext<StocksDetailContext>(
  {} as StocksDetailContext
);

export default function XStockDetailProvider({
  children,
  code,
}: {
  children: React.ReactElement;
  code: string;
}) {
  const [tokenMeta, setTokenMeta] = useState<any>({});
  const [news, setNews] = useState<any>({});
  const [holdersData, setHoldersData] = useState<any[]>([]);
  const [dailyTokenSupply, setDailyTokenSupply] = useState<
    DailyTokenSupplyForSingleTokenApiItem[]
  >([]);
  const [poolDailyData, setPoolDailyData] = useState<any[]>([]);
  const { list } = useSwapPairsForTypes({
    type: 'stocks',
    chain: 'all',
    current: 1,
    pageSize: 100,
    orderBy: 'index',
    orderDir: 'asc',
  });

  const pair = useMemo(() => {
    return list.find((item) => item.baseToken?.code === code) || {};
  }, [list, code]);

  useEffect(() => {
    const symbol = tokenMeta?.underlying_stock?.ticker;
    if (symbol) {
      fetchNews(symbol).then((res) => {
        setNews(res);
      });
    }
  }, [tokenMeta]);

  useEffect(() => {
    if (code) {
      fetchTokenMeta(code).then((res) => {
        setTokenMeta(res);
      });
      getDailyTokenSupplyForSingleToken(code).then((res) => {
        setDailyTokenSupply(res);
      });
      fetchDailyHolders(code).then((res) => {
        setHoldersData(res || []);
      });
      fetchDexPoolDailyData(code).then((res) => {
        setPoolDailyData(res || []);
      });
    }
  }, [code]);

  const value = useMemo(() => {
    return {
      code,
      pair,
      tokenMeta,
      news,
      dailyTokenSupply,
      holdersData,
      poolDailyData,
      list,
    };
  }, [
    code,
    pair,
    tokenMeta,
    news,
    dailyTokenSupply,
    holdersData,
    poolDailyData,
    list,
  ]);

  return <SetContext.Provider value={value}>{children}</SetContext.Provider>;
}

export function useXStockDetail() {
  return useContext(SetContext);
}

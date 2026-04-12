import React, { useContext, useEffect, useMemo, useState } from 'react';

import { DailyHoldersApiItem, fetchDailyHolders } from '../dashboard/service';
import { useOndoStocks } from '../useOndoStocks';
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
  const { list } = useOndoStocks();

  const pair = useMemo(() => {
    return list.find((item) => item.baseToken?.symbol === code) || {};
  }, [list, code]);

  useEffect(() => {
    const symbol = tokenMeta?.ticker;
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
      list,
    };
  }, [code, pair, tokenMeta, news, dailyTokenSupply, holdersData, list]);

  return <SetContext.Provider value={value}>{children}</SetContext.Provider>;
}

export function useOndoDetail() {
  return useContext(SetContext);
}

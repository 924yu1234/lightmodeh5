import React, { useContext, useMemo } from 'react';

import { useSwapPairsForTypes } from 'src/state/swap/pairs/hooks';

export interface VaultDepositContext {
  list: any[];
  codesString: string;
  stockCodeMap: Record<string, string>;
}
const SetContext = React.createContext<VaultDepositContext>(
  {} as VaultDepositContext
);

export default function XStocksDataProvider({
  children,
}: {
  children: React.ReactElement;
}) {
  const { list } = useSwapPairsForTypes({
    type: 'stocks',
    chain: 'all',
    current: 1,
    pageSize: 100,
    orderBy: 'index',
    orderDir: 'asc',
    noRefresh: true,
  });

  const codesString = useMemo(
    () =>
      list
        .map((item) => item.baseToken?.code)
        .filter(Boolean)
        ?.join(','),
    [list]
  );

  const stockCodeMap = useMemo(() => {
    return list.reduce((acc, item) => {
      acc[item.baseToken?.code] = item.baseToken?.symbol;
      return acc;
    }, {} as Record<string, string>);
  }, [list]);

  const value = useMemo(() => {
    return {
      list: list || [],
      codesString,
      stockCodeMap,
    };
  }, [list, codesString, stockCodeMap]);

  return <SetContext.Provider value={value}>{children}</SetContext.Provider>;
}
export function useXStocks() {
  return useContext(SetContext);
}

import { useEffect, useMemo, useRef, useState } from 'react';
import { usePrevious, useThrottle } from 'ahooks';
import { orderBy as orderByFn, some, sumBy, trim } from 'lodash';

import { OrderDir } from 'src/constants/consts';
import { FUNGIBLE_USDC_ID, Type_DAChains } from 'src/da';
import {
  useFungbileChains,
  useUsdcTokensMap,
} from 'src/state/application/hooks';
import {
  useIsFetchingAllUserDetails,
  useTotalDepositUsd,
} from 'src/state/intent/earn/hooks';
import {
  useFungibleUsdc,
  useSwapBalanceTokens,
} from 'src/state/swap/balances/hooks';
import {
  formatBalanceDisplay,
  zeroResult,
} from 'src/state/swap/balances/utils';
import { useTokensWithTokenInfo } from 'src/state/swap/tokenInfo/hooks';
import { useTurboRangePositionSummary } from 'src/state/turboRange/hooks';
import { useChangeFlag, useUserFlag } from 'src/state/user/hooks';
import { formatUsd } from 'src/utils/format';
import { isNumber, multiply } from 'src/utils/numberUtils';

import { useDexAccount } from 'js/state/dexAccount/hooks';

const MANAGED_TOKEN_ADDED_PREFIX = 'managed_tokens_added_';
const MANAGED_TOKEN_REMOVED_PREFIX = 'managed_tokens_removed_';

export type ManagedTokenAction = 'add' | 'remove' | 'disabled';

export function createManagedTokenKey(token: any) {
  return `${token?.chain || ''}_${(token?.code || '').toLowerCase()}_${
    token?.id || ''
  }`;
}

function mapManualToken(token: any) {
  return mapToken({
    ...token,
    available: token?.available || '0',
    locked: token?.locked || '0',
    total: token?.total || token?.available || '0',
    price: token?.price || 0,
    loadingBalance: false,
    loadingPrice: false,
  });
}

function isWhitelistedToken(token: any) {
  return !!token?.is_whitelist;
}

function hasPositiveManagedBalance(token: any) {
  return (
    Number(token?.availableNumber || 0) > 0 ||
    Number(token?.totalNumber || 0) > 0 ||
    Number(token?.totalValue || 0) > 0
  );
}

function toManagedSnapshot(token: any) {
  return {
    id: token?.id,
    chain: token?.chain,
    code: token?.code,
    decimals: token?.decimals,
    symbol: token?.symbol,
    icon: token?.icon,
    name: token?.name,
    is_whitelist: token?.is_whitelist,
  };
}

function sortManagedTokens(tokens: any[]) {
  return orderByFn(
    tokens,
    [
      (token) => (token.id === FUNGIBLE_USDC_ID ? 1 : 0),
      (token) => Number(token?.valueScore || 0),
      (token) => Number(token?.rank || 0),
      (token) => token?.symbol || '',
    ],
    ['desc', 'desc', 'asc', 'asc']
  );
}

export default function useAssets({
  search: search_,
  hideSmallbalances,
  chain = 'all',
  orderBy = 'value',
  orderDir = 'desc',
}: {
  search: string;
  chain: Type_DAChains | 'all';
  hideSmallbalances: boolean;
  orderBy: 'available' | 'value' | 'locked' | 'symbol' | 'totalValue';
  orderDir: OrderDir;
}) {
  const search = trim(search_);

  const { myAssets } = useManagedAssetCollections();
  const defaultList = myAssets;

  const [data, setData] = useState([]);
  const [index, setIndex] = useState(0);

  const dexAccount = useDexAccount();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIndex((pre) => pre + 1);
    }, 30000);
    return () => {
      clearTimeout(timer);
    };
  }, [index]);

  // useEffect(() => {
  //   if (!trim(throttledSearch)) return;
  //   searchSwapTokens({ text: throttledSearch }).then((resp) => {
  //     setSearchSwapTokens((pre) => ({ ...pre, [throttledSearch]: resp.list }));
  //   });
  // }, [throttledSearch]);

  useEffect(() => {
    setData([]);
  }, [dexAccount?.account]);

  const preIndex = usePrevious(index);

  const fungibleUsdc = useFungibleUsdc();

  const fungibleChains = useFungbileChains();

  const usdcTokensMap = useUsdcTokensMap();

  useEffect(() => {
    setData((pre: any) => {
      if (
        pre.length !== defaultList.length ||
        some(pre, (p: any) => p.loading) ||
        preIndex !== index
      ) {
        return defaultList.filter((d: any) => {
          if (d.id === FUNGIBLE_USDC_ID) return false;
          if (!fungibleChains.includes(d.chain)) return true;
          const curChainUsdc = usdcTokensMap[d.chain as Type_DAChains];
          return curChainUsdc?.code?.toLowerCase() !== d.code?.toLowerCase();
        });
      }
      return pre;
    });
  }, [
    usdcTokensMap,
    dexAccount.account,
    fungibleChains,
    fungibleUsdc,
    defaultList,
    preIndex,
    index,
  ]);

  // const curSearchSwapTokens = useMemo(() => {
  //   return (searchSwapTokensMap as any)[search] || [];
  // }, [search, searchSwapTokensMap]);

  // const searchList = useSearchBalances({
  //   SwapSearchList: curSearchSwapTokens,
  // });

  const searchList = useMemo(() => {
    if (!search) return data;
    const searchLower = search.toLowerCase();
    return data.filter((d: any) => {
      const symbol = d.symbol.toLowerCase();
      const code = d.code.toLowerCase();
      const name = d.name.toLowerCase();
      return (
        symbol.includes(searchLower) ||
        code.includes(searchLower) ||
        name.includes(searchLower)
      );
    });
  }, [data, search]);

  const resultData = useMemo(() => {
    return search ? searchList : data;
  }, [searchList, data, search]);

  const showList = useMemo(() => {
    let res = resultData;
    if (hideSmallbalances) {
      res = resultData.filter((i: any) => i.totalValue >= 0.1);
    }
    res = res.filter((i: any) => {
      if (chain === 'all') return true;
      if (i.chain !== chain) return false;
      return true;
    });
    if (search) return [fungibleUsdc].concat(res);
    return [fungibleUsdc].concat(
      orderByFn(
        res.filter((i: any) => i.id !== FUNGIBLE_USDC_ID),
        [
          (d) => (orderBy === 'symbol' ? d[orderBy] : Number(d[orderBy])),
          (d) => Number((d as any).rank),
          (d) => Number((d as any).total),
        ],
        [orderDir as 'asc' | 'desc', 'asc', 'desc']
      )
    );
  }, [
    resultData,
    fungibleUsdc,
    search,
    hideSmallbalances,
    orderBy,
    orderDir,
    chain,
  ]);

  return useMemo(() => {
    return {
      loading: false,
      defaultList,
      data: showList,
    };
  }, [defaultList, showList]);
}

// balance + earn + copyTrade
export function useTotalAssetValue() {
  const { myAssets } = useManagedAssetCollections();

  const { account } = useDexAccount();

  const storedTotalAsset = useUserFlag(`user_total_asset_value${account}`);
  const setStoredTotalAsset = useChangeFlag(`user_total_asset_value${account}`);
  const storedTotalEarn = useUserFlag(`user_total_earn_value${account}`);
  const setStoredTotalEarn = useChangeFlag(`user_total_earn_value${account}`);
  const storedTotalTurboRange = useUserFlag(
    `user_total_turbo_range_value${account}`
  );
  const setStoredTotalTurboRange = useChangeFlag(
    `user_total_turbo_range_value${account}`
  );
  const isFetchingEarnData = useIsFetchingAllUserDetails();
  const totalEarnDepositUsd = useTotalDepositUsd();

  const { loadingPositions, positionValue } = useTurboRangePositionSummary();

  const timer2 = useRef<NodeJS.Timeout | null>(null);

  const totalAsset = useMemo(() => {
    const isLoadingBalancePrice =
      !myAssets?.length || myAssets.some((item: any) => item.loading);
    if (isLoadingBalancePrice && storedTotalAsset && storedTotalAsset !== '0') {
      return Number(storedTotalAsset);
    }

    let calculatedTotal = sumBy(myAssets, (t: any) => {
      return isNumber(t.totalValue) ? Number(t.totalValue) : 0;
    });
    if (isFetchingEarnData) {
      calculatedTotal += Number(storedTotalEarn) || 0;
    } else {
      calculatedTotal += Number(totalEarnDepositUsd) || 0;
    }
    if (loadingPositions) {
      calculatedTotal += Number(storedTotalTurboRange) || 0;
    } else {
      calculatedTotal += Number(positionValue) || 0;
    }

    return calculatedTotal;
  }, [
    myAssets,
    storedTotalAsset,
    isFetchingEarnData,
    storedTotalEarn,
    totalEarnDepositUsd,
    storedTotalTurboRange,
    positionValue,
    loadingPositions,
  ]);

  useEffect(() => {
    if (timer2.current) {
      clearTimeout(timer2.current);
    }
    if (!isFetchingEarnData && !loadingPositions) {
      timer2.current = setTimeout(() => {
        setStoredTotalAsset(totalAsset.toString());
        setStoredTotalEarn(totalEarnDepositUsd.toString());
        setStoredTotalTurboRange(positionValue.toString());
      }, 3000) as any;
    }
  }, [
    isFetchingEarnData,
    totalAsset,
    totalEarnDepositUsd,
    setStoredTotalAsset,
    setStoredTotalEarn,
    setStoredTotalTurboRange,
    positionValue,
    loadingPositions,
  ]);

  const showAssets = useThrottle(totalAsset, { wait: 1000, leading: true });

  return showAssets;
}

export function useBalances() {
  const swapBalances = useTotalSwapBalances();

  const res = useMemo(() => {
    if (!swapBalances?.length) return [];

    // 创建swapBalances的映射，以chain+code作为key
    const swapBalancesMap = new Map();
    swapBalances.forEach((item: any) => {
      const key = `${item.chain}_${item.code}`;
      swapBalancesMap.set(key, item);
    });

    // 开始合并逻辑
    let finalTokens = swapBalances.map((d: any) => ({
      ...d,
      total: d.available,
      totalDisplay: d.availableDisplay,
    }));

    finalTokens = finalTokens.map((d: any) => mapToken(d));

    return orderByFn(
      finalTokens,
      ['valueScore', 'rank', 'symbol'],
      ['desc', 'asc', 'asc']
    );
  }, [swapBalances]);
  return res;
}

export function useTokenBalance({ token }: { token: any }) {
  const balances = useBalances();
  return useMemo(() => {
    return (
      balances.find((d: any) => {
        return (
          d.code === token.code && d.chain === token.chain && d.id === token.id
        );
      }) || token
    );
  }, [balances, token]);
}

export function useTokensBalance({ tokens }: { tokens: any[] }) {
  const balances = useBalances();
  return useMemo(() => {
    const balancesMap = new Map(
      balances.map((b) => [b.code + b.chain + b.id, b])
    );
    return tokens.map((t) => {
      const balance = balancesMap.get(t.code + t.chain + t.id);
      return {
        ...t,
        ...(balance || zeroResult),
      };
    });
  }, [balances, tokens]);
}

// 过滤fungibleUsdc
export function useBalancesInList() {
  const balances = useBalances();
  const fungibleChains = useFungbileChains();
  const usdcTokensMap = useUsdcTokensMap();
  return useMemo(() => {
    return balances.filter((d: any) => {
      if (!fungibleChains.includes(d.chain)) return true;
      const curChainUsdc = usdcTokensMap[d.chain as Type_DAChains];
      return curChainUsdc?.code?.toLowerCase() !== d.code?.toLowerCase();
    });
  }, [balances, fungibleChains, usdcTokensMap]);
}

export function useBalancesWithTopTokens({ topTokens }: { topTokens: any[] }) {
  const { myAssets, allTokens } = useManagedAssetCollections();
  const dexAccount = useDexAccount();
  const fungibleUsdc = useFungibleUsdc();
  const hideSmallbalances = useUserFlag('hide_small_balances');

  return useMemo(() => {
    if (!dexAccount?.hasAccessToken) return [];
    if (!topTokens.length) return myAssets;
    const topsIds = topTokens.map((t) => t.id);
    // 需要tokens放在最前列
    const tops = topTokens.map((t) => {
      const token = allTokens.find((b) => b.id === t.id);
      if (t.id === FUNGIBLE_USDC_ID) {
        return {
          ...fungibleUsdc,
          token: fungibleUsdc,
        };
      }
      if (token) {
        return token;
      }
      return {
        ...t,
        token: t,
      };
    });
    return tops.concat(
      orderByFn(
        myAssets
          .filter((d) => d.availableNumber > 0 && !topsIds.includes(d.id))
          .filter((i: any) => !hideSmallbalances || i.totalValue >= 0.1),
        ['value', 'symbol'],
        ['desc', 'asc']
      )
    );
  }, [
    allTokens,
    myAssets,
    topTokens,
    dexAccount?.hasAccessToken,
    hideSmallbalances,
    fungibleUsdc,
  ]);
}

export function useManagedAssetCollections() {
  const balances = useBalancesInList();
  const fungibleUsdc = useFungibleUsdc();
  const dexAccount = useDexAccount();
  const accountKey = dexAccount?.account || 'default';
  const addedKey = `${MANAGED_TOKEN_ADDED_PREFIX}${accountKey}`;
  const removedKey = `${MANAGED_TOKEN_REMOVED_PREFIX}${accountKey}`;
  const storedAddedMap = useUserFlag(addedKey);
  const storedRemovedMap = useUserFlag(removedKey);
  const setAddedMap = useChangeFlag(addedKey);
  const setRemovedMap = useChangeFlag(removedKey);
  const addedMap = useMemo(() => storedAddedMap || {}, [storedAddedMap]);
  const removedMap = useMemo(() => storedRemovedMap || {}, [storedRemovedMap]);

  const tokensMap = useMemo(() => {
    const nextMap = new Map();
    [fungibleUsdc, ...balances].forEach((token: any) => {
      if (!token?.code) return;
      nextMap.set(createManagedTokenKey(token), token);
    });
    Object.values(addedMap || {}).forEach((token: any) => {
      if (!token?.code) return;
      const key = createManagedTokenKey(token);
      if (!nextMap.has(key)) {
        nextMap.set(key, mapManualToken(token));
      }
    });
    return nextMap;
  }, [addedMap, balances, fungibleUsdc]);

  const allTokens = useMemo(() => {
    return Array.from(tokensMap.values());
  }, [tokensMap]);

  const isMyAsset = useMemo(() => {
    return (token: any) => {
      if (!token?.code) return false;
      if (token.id === FUNGIBLE_USDC_ID) return true;
      const key = createManagedTokenKey(token);
      if (addedMap?.[key]) return true;
      if (removedMap?.[key]) return false;
      return isWhitelistedToken(token);
    };
  }, [addedMap, removedMap]);

  const isRemovedZeroBalanceToken = useMemo(() => {
    return (token: any) => {
      if (!token?.code) return false;
      const key = createManagedTokenKey(token);
      if (!removedMap?.[key]) return false;
      return !hasPositiveManagedBalance(token);
    };
  }, [removedMap]);

  const hydrateToken = useMemo(() => {
    return (token: any) => {
      const key = createManagedTokenKey(token);
      return tokensMap.get(key) || mapManualToken(token);
    };
  }, [tokensMap]);

  const myAssets = useMemo(() => {
    return sortManagedTokens(allTokens.filter((token) => isMyAsset(token)));
  }, [allTokens, isMyAsset]);

  const otherAssets = useMemo(() => {
    return sortManagedTokens(
      balances.filter((token: any) => {
        return (
          token.id !== FUNGIBLE_USDC_ID &&
          token.availableNumber > 0 &&
          !isMyAsset(token) &&
          !isRemovedZeroBalanceToken(token)
        );
      })
    );
  }, [balances, isMyAsset, isRemovedZeroBalanceToken]);

  const addToken = useMemo(() => {
    return (token: any) => {
      const key = createManagedTokenKey(token);
      const nextAddedMap = {
        ...addedMap,
        [key]: toManagedSnapshot(hydrateToken(token)),
      };
      const nextRemovedMap = { ...removedMap };
      delete nextRemovedMap[key];
      setAddedMap(nextAddedMap);
      setRemovedMap(nextRemovedMap);
    };
  }, [addedMap, removedMap, setAddedMap, setRemovedMap, hydrateToken]);

  const removeToken = useMemo(() => {
    return (token: any) => {
      if (!token?.code || token.id === FUNGIBLE_USDC_ID) return;
      const key = createManagedTokenKey(token);
      const nextAddedMap = { ...addedMap };
      delete nextAddedMap[key];
      setAddedMap(nextAddedMap);
      setRemovedMap({
        ...removedMap,
        [key]: true,
      });
    };
  }, [addedMap, removedMap, setAddedMap, setRemovedMap]);

  return useMemo(() => {
    return {
      allTokens,
      myAssets, // 包含fungibleUsdc
      otherAssets,
      addedMap,
      removedMap,
      hydrateToken,
      isMyAsset,
      isRemovedZeroBalanceToken,
      addToken,
      removeToken,
    };
  }, [
    allTokens,
    myAssets,
    otherAssets,
    addedMap,
    removedMap,
    hydrateToken,
    isMyAsset,
    isRemovedZeroBalanceToken,
    addToken,
    removeToken,
  ]);
}

export function useTotalSwapBalances() {
  const balances = useSwapBalanceTokens();
  const tokensWithPrice = useTokensWithTokenInfo({ tokens: balances });
  return useMemo(() => {
    return tokensWithPrice.map((d) => mapToken(d));
  }, [tokensWithPrice]);
}

export function useSwapBalancesWithValues({ tokens }: { tokens: any[] }) {
  const balances = useTotalSwapBalances();
  return useMemo(() => {
    const balancesMap = new Map(balances.map((b) => [b.id, b]));
    return tokens.map((t) => {
      const balance = balancesMap.get(t.id);
      return {
        ...t,
        ...(balance || zeroResult),
      };
    });
  }, [balances, tokens]);
}

export function mapToken(token: any) {
  const tokenPrice = token?.price ?? '';
  const available = token?.available; // swap balance
  const total = token?.total; // copy trade balance + swap balance

  const availableNumber = Number(token?.available || '0');
  const availableValue =
    multiply(tokenPrice, available, { toNumber: true }) || 0;
  const totalValue = multiply(tokenPrice, total, { toNumber: true }) || 0;
  const amountScore = available;
  const valueScore = totalValue;

  const totalValueDisplay = formatUsd(totalValue);
  const availableValueDisplay = formatUsd(availableValue);

  return {
    ...token,
    loading: token.loadingBalance || token.loadingPrice,
    availableNumber,
    available: token.available || '0',
    availableDisplay:
      formatBalanceDisplay(token.available, token?.decimals) || '0',
    locked: token.locked || '0',
    lockedDisplay: token.lockedDisplay || '0',
    tokenPrice,
    availableValue,
    availableValueDisplay,
    valueScore,

    total,
    totalNumber: Number(total),
    totalDisplay: formatBalanceDisplay(total, token?.decimals),
    totalValue,
    amountScore,

    totalValueDisplay,
  };
}

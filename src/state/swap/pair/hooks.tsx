import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDebounce } from 'ahooks';
import { useDispatch, useSelector } from 'react-redux';

import { SwapPair } from 'src/constants/interface/swap';
import { Type_DAChains } from 'src/da';
import useRefresh from 'src/hooks/useRefreshData/useRefresh';
import { useSetLocale } from 'src/locals';
import { COIN_GECKO_MAP, DEXTOOLS_MAP } from 'src/locals/intlUtils';
import { useUserWebSocket } from 'src/providers/userWebsocket/useUserWebsocket';
import { useIsOnline } from 'src/state/application/hooks';
import { isNumber } from 'src/utils/digit';
import { getSwapPriceScale } from 'src/utils/format';
import { isLessThan } from 'src/utils/numberUtils';

import { Token } from 'js/constants/interface';

import { AppState } from '../..';
import { useFungibleUsdc } from '../balances/hooks';
import {
  changeSwapOrdersTab,
  chooseSwapPair,
  refreshSwapPair,
  refreshSwapPairTicker,
} from './reducer';

export function useCurrentSwapPair(): SwapPair {
  const baseToken = useSelector((state: AppState) => state.swapPair.baseToken);
  const quoteToken = useSelector(
    (state: AppState) => state.swapPair.quoteToken
  );
  const pairId = useSelector((state: AppState) => state.swapPair.pairId);

  const {
    baseToken: tickerBaseToken,
    quoteToken: tickerQuoteToken,
    loading,
  } = useSwapPairTickerToken() as any;

  const newBaseToken = useMemo(() => {
    if (loading) return baseToken;
    return {
      ...(baseToken || {}),
      ...tickerBaseToken,
    };
  }, [loading, baseToken, tickerBaseToken]);

  const newQuoteToken = useMemo(() => {
    if (loading) return quoteToken;
    return {
      ...(quoteToken || {}),
      ...tickerQuoteToken,
    };
  }, [loading, quoteToken, tickerQuoteToken]);

  return useMemo(() => {
    return {
      baseTokenId: newBaseToken?.id,
      quoteTokenId: newQuoteToken?.id,
      baseToken: {
        ...newBaseToken,
        showDecimals: newBaseToken?.decimals > 8 ? 8 : newBaseToken?.decimals,
      },
      quoteToken: {
        ...newQuoteToken,
        showDecimals: newQuoteToken?.decimals > 8 ? 8 : newQuoteToken?.decimals,
        icon: 'https://mainnet-cdn.degate.com/token/USDC.png',
      },
      pairId,
      market: `${newBaseToken?.symbol ?? '-'}/${newQuoteToken?.symbol ?? '-'}`,
    };
  }, [newBaseToken, newQuoteToken, pairId]);
}

export function useSwapTicker() {
  const pairId = useSelector((state: AppState) => state.swapPair.pairId);
  const ticker = useSelector((state: AppState) => state.swapPair.ticker);
  return useMemo(() => {
    if (ticker?.pairId === pairId && pairId) return ticker ?? {};
    return {
      ...ticker,
      loading: true,
      takerFee: '',
      is_stable: false,
      last_price: '',
    };
  }, [pairId, ticker]);
}

export function useSwapTickerVal(
  key:
    | 'pairId'
    | 'dex'
    | 'last_price'
    | 'week_high_price'
    | 'week_low_price'
    | 'pair_base_token_price'
    | 'quote_token_risk_price'
    | 'base_token_risk_price'
    | 'takerFee'
    | 'min_step_size'
    | 'max_size'
    | 'last_updated'
    | 'loading'
    | 'last_fetch_timestamp'
) {
  const ticker = useSwapTicker();
  return useMemo(() => {
    return ticker?.[key];
  }, [ticker, key]);
}

export function useMaxOrderBase() {
  // return 100;
  return useSwapTickerVal('max_size');
}

export function useMinStepBase() {
  return useSwapTickerVal('min_step_size');
  // return '0.001';
}

export function useShowSwapTradingView() {
  const last_price = useSwapTickerVal('last_price');
  return useMemo(() => {
    return isNumber(last_price) && isLessThan(0, last_price);
  }, [last_price]);
}

export function useCurrentSwapPriceScale() {
  const last_price = useSwapTickerVal('last_price');
  const tickerPairId = useSwapTickerVal('pairId');
  const { pairId } = useCurrentSwapPair();
  const loading = useSwapPairTickerLoading();

  const last_priceOver0 = useMemo(() => {
    return isNumber(last_price) && isLessThan(0, last_price);
  }, [last_price]);

  const res = useMemo(() => {
    if (pairId === tickerPairId && !loading && last_priceOver0) {
      return getSwapPriceScale({ last_price });
    }
    return '';
  }, [last_priceOver0, last_price, pairId, tickerPairId, loading]);
  return res;
}

export function useSwapPairTickerLoading() {
  const pairId = useSelector((state: AppState) => state.swapPair.pairId);
  const { pairId: tickerPairId } = useSwapTicker();
  return useMemo(() => {
    if (pairId === tickerPairId) return false;
    return true;
  }, [pairId, tickerPairId]);
}

export function useSwapPairTakerFee(): string {
  return useSwapTickerVal('takerFee') as string;
}

export function useSwapPairTickerToken() {
  const pairId = useSelector((state: AppState) => state.swapPair.pairId);
  const baseToken = useSelector(
    (state: AppState) => state.swapPair.ticker?.baseToken
  );
  const quoteToken = useSelector(
    (state: AppState) => state.swapPair.ticker?.quoteToken
  );
  const pair_id = useSwapTickerVal('pairId');

  const newBaseToken = useMemo(() => {
    return baseToken;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [baseToken?.code]);

  const newQuoteToken = useMemo(() => {
    return quoteToken;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quoteToken?.code]);

  return useMemo(() => {
    if (pair_id === pairId)
      return { baseToken: newBaseToken, quoteToken: newQuoteToken };
    return {
      loading: true,
      takerFee: '',
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pairId, pair_id, newBaseToken, newQuoteToken]);
}

export function useSwapPairHistory() {
  return useSelector((state: AppState) => state.swapPair.history);
}

export function useSelectSwapPair() {
  const dispatch = useDispatch();
  const { pairId: curId } = useCurrentSwapPair();
  return useCallback(
    ({
      baseToken,
      quoteToken,
      pairId,
    }: {
      baseToken: Token;
      quoteToken: Token;
      pairId: number;
    }) => {
      if (curId && curId === pairId) return;
      dispatch(chooseSwapPair({ baseToken, quoteToken, pairId }));
    },
    [dispatch, curId]
  );
}

export function useRefreshSwapPairTickerIndex() {
  return useSelector((state: AppState) => state.swapPair.refreshTickerIndex);
}

export function useRefreshSwapPairTicker() {
  const dispatch = useDispatch();
  return useCallback(() => {
    dispatch(refreshSwapPairTicker());
  }, [dispatch]);
}

export function useRefreshSwapPairIndex() {
  return useSelector((state: AppState) => state.swapPair.refreshIndex);
}

export function useRefreshSwapPair() {
  const dispatch = useDispatch();
  return useCallback(() => {
    dispatch(refreshSwapPair());
  }, [dispatch]);
}

export function useSwapOrdersTab() {
  return useSelector((state: AppState) => state.swapPair.ordersTab);
}

export function useChangeSwapOrdersTab() {
  const dispatch = useDispatch();
  return useCallback(
    (tab: any) => {
      dispatch(changeSwapOrdersTab({ tab }));
    },
    [dispatch]
  );
}

export const DEXTOOLS_CHAIN_MAP: Record<Type_DAChains, string> = {
  SOLANA: 'solana',
  BSC: 'bsc',
  POLYGON: 'polygon_pos',
  AVALANCHE: 'avax',
  DGWallet: 'eth',
  ETHEREUM: 'eth',
  BASE: 'base',
  ARBITRUM: 'arbitrum',
  OPTIMISM: 'optimism',
  SUI: 'sui-network',
  APTOS: 'aptos',
  WORLDCHAIN: 'world-chain',
  BITCOIN: 'solana', // 使用solana的wbtc K线
};

export function useDexToolUrl() {
  const { locale } = useSetLocale();
  const lang = (DEXTOOLS_MAP as any)[locale] ?? 'en';
  const { baseToken } = useCurrentSwapPair();
  const chain =
    (DEXTOOLS_CHAIN_MAP as any)[baseToken?.chain as ''] ??
    baseToken?.chain?.toLowerCase();
  const ticker = useSwapTicker();
  const pairAddress = ticker?.pool_address;

  if (!chain || !pairAddress) return '';
  return `https://www.dextools.io/widget-chart/${lang}/${chain}/pe-light/${pairAddress}?theme=dark&chartType=1&chartResolution=15&drawingToolbars=false&tvPaneColor=13132F&tvPlatformColor=13132F&headerColor=13132F`;
}

let coinGeckoFlag = false;

export function useCoinGeckoUrl() {
  const { baseToken } = useCurrentSwapPair();
  const ticker = useSwapTicker();
  const pairAddress = ticker?.pool_address;
  return useGetCoinGeckoUrl({
    chain: baseToken?.chain || '',
    pairAddress,
    disableKline: ticker?.kline_disabled,
  });
}

export function useGetCoinGeckoUrl({
  chain,
  pairAddress,
  disableKline,
}: {
  chain: string;
  pairAddress?: string;
  disableKline?: boolean;
}) {
  const { locale } = useSetLocale();
  const lang = (COIN_GECKO_MAP as any)[locale] ?? 'en';
  const [iframeError, setIframeError] = useState(false);
  const _chain =
    (DEXTOOLS_CHAIN_MAP as any)[chain as ''] ?? chain?.toLowerCase();

  let coinGeckoUrl = '';
  if (_chain && pairAddress) {
    coinGeckoUrl = `https://www.geckoterminal.com/${lang}/${_chain}/pools/${pairAddress}?embed=1&info=0&swaps=0&grayscale=0&light_chart=0`;
  }

  useEffect(() => {
    if (disableKline) return;
    const checkUrl = async () => {
      // const testUrl = 'https://api.geckoterminal.com/api/v2/networks?page=1';
      if (!coinGeckoUrl || coinGeckoFlag) return;
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      try {
        await fetch(coinGeckoUrl, {
          mode: 'no-cors',
          signal: controller.signal,
        });
        clearTimeout(timeoutId);
        coinGeckoFlag = true;
        setIframeError(false);
      } catch (error) {
        setIframeError(true);
      }
    };

    checkUrl();
  }, [coinGeckoUrl, disableKline]);

  return {
    disableKline,
    iframeError: iframeError || disableKline,
    coinGeckoUrl,
  };
}

export function useDexscreenedUrl() {
  const { baseToken } = useCurrentSwapPair();
  const chain = (DEXTOOLS_CHAIN_MAP as any)[baseToken?.chain as ''] ?? '';
  const ticker = useSwapTicker();
  const pairAddress = ticker?.pool_address;

  if (!chain || !pairAddress) return '';
  return `https://dexscreener.com/solana/${baseToken?.code}?embed=1&theme=dark&info=0`;
}

export function useSwapDataExpired() {
  const last_updated = useSwapTickerVal('last_updated');
  const last_fetch_timestamp = useSwapTickerVal('last_fetch_timestamp');
  const loading = useSwapTickerVal('loading');
  // 10s 检查一次
  const refreshFlag = useRefresh(10000);
  const flag = useMemo(() => {
    if (!last_updated) return false;
    const isExpired = Date.now() - Number(last_updated) * 1000 > 300000;
    // 如果数据在60秒内获取的，那直接返回是否过期
    if (Date.now() - Number(last_fetch_timestamp) < 60000 && isExpired) {
      return true;
    }
    // loading中，则不返回
    return !loading && isExpired;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [last_updated, loading, refreshFlag, last_fetch_timestamp]);

  const debounceFlag = useDebounce(flag, { wait: 500 });
  return debounceFlag;
}

export function useDABalanceDisconnected() {
  const { baseToken } = useCurrentSwapPair();
  const disconnectedChains = useSelector(
    (state: AppState) => state.swapBalance.apiBalancesDisconnectedChains
  );
  const { retryTimes } = useUserWebSocket();
  const isOnline = useIsOnline();

  return useMemo(() => {
    if (!isOnline) return true;
    if (
      (disconnectedChains || []).some((d) => d === (baseToken?.chain ?? ''))
    ) {
      return true;
    }
    if (retryTimes && retryTimes > 5) return true;
    return false;
  }, [baseToken, disconnectedChains, retryTimes, isOnline]);
}

export function useShowDataWarning() {
  const dataDisconnected = useDABalanceDisconnected();
  const dataExpired = useSwapDataExpired();
  return dataDisconnected || dataExpired;
}

export function useSwapQuoteTokens() {
  const fungibleUsdc = useFungibleUsdc();
  // const fungibleChains = useFungbileChains();
  // const { quoteToken } = useCurrentSwapPair();
  // const isFungibleChain = fungibleChains.includes(
  //   quoteToken?.chain as Type_DAChains
  // );
  // const quoteBalance = useSwapBalances({ tokens: [quoteToken] });

  // 只使用fungibleUsdc
  return useMemo(() => {
    return [fungibleUsdc];
    // if (isFungibleChain) {
    //   return [fungibleUsdc];
    // }
    // return [fungibleUsdc].concat(quoteBalance);
  }, [fungibleUsdc]);
}

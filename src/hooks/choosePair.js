import { useCallback, useMemo } from 'react';
import { useLocation, useMatch } from 'react-router-dom';

import { useGaEvent, useIsAppH5 } from 'src/providers/useWallet';
import { useSelectSwapPair } from 'src/state/swap/pair/hooks';
import { useIsDAUsdc } from 'src/state/swap/tokens/hook';

import { useToSwap } from './navigate';
import useCustomNavigate, { isPage } from './useCustomNavigate';

const pageMap = {
  swap: 'swap',
  grid: 'grid',
  trade: 'trade',
  dca: 'dca',
  dcaInfo: 'dca/info',
  gridInfo: 'grid/info',
  tradeInfo: 'trade/info',
  swapInfo: 'swap/info',
};

export default function useChoosePair() {
  const location = useLocation();
  const navigate = useCustomNavigate();
  const pathname = location.pathname;

  const selectSwapPair = useSelectSwapPair();

  const swapMatch = useMatch('/:lang/swap/:quote/:base');
  const swapInfoMatch = useMatch('/:lang/swap/info/:quote/:base');

  const isSwap = !!swapMatch || isPage(pathname, '/swap');
  const isSwapInfo = !!swapInfoMatch;

  const gaEvent = useGaEvent();

  return useCallback(
    (pair, page) => {
      let curPagePath = pageMap[page];

      if (!page) {
        // 从swap页面选择spot交易对，跳转交易页面
        if (isSwap || isSwapInfo) {
          curPagePath = pageMap.trade;
        }
      }

      if (page === 'swap' && isSwapInfo) {
        curPagePath = pageMap.swapInfo;
      }

      const { baseToken, quoteToken } = pair;

      const path = getUrlPath({
        baseToken,
        quoteToken,
        page: curPagePath,
      });
      gaEvent('ChoosePair', {
        path,
      });
      selectSwapPair(pair);
      if (!isPage(pathname, path)) {
        navigate(path);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [pathname, navigate]
  );
}

export function getUrlPath({ baseToken, quoteToken, page = 'trade' }) {
  if (!baseToken?.code || !quoteToken?.symbol) return `/${page}`;
  const quote = quoteToken?.symbol?.toUpperCase();
  const base = baseToken?.code;
  return `/${page || 'trade'}/${quote}/${base}`;
}

export function useTokenSwapUrl({ token }) {
  const location = useLocation();
  const { pathname } = location;
  const navigate = useCustomNavigate();
  const toSwap = useToSwap();
  const isAppH5 = useIsAppH5();

  const swapUrl = useMemo(() => {
    return getUrlPath({
      baseToken: token,
      quoteToken: { symbol: 'USDC' },
      page: 'swap',
    });
  }, [token]);

  const isCurrentPageAndPair = useMemo(() => {
    return isPage(pathname, swapUrl);
  }, [pathname, swapUrl]);

  const isUsdc = useIsDAUsdc({ token });

  const handleClick = useCallback(() => {
    if (isUsdc) return;
    if (isAppH5) {
      toSwap({ token });
    } else {
      document.getElementById('appContainer')?.scrollTo(0, 0);
      navigate(`${swapUrl}?chain=${token?.chain}`);
    }
  }, [swapUrl, isUsdc, token, isAppH5, toSwap, navigate]);

  return useMemo(() => {
    return {
      isUsdc,
      swapUrl,
      isCurrentPageAndPair,
      handleClick,
    };
  }, [swapUrl, isCurrentPageAndPair, isUsdc, handleClick]);
}

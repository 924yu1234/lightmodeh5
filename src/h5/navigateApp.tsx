import { useCallback } from 'react';
import queryString from 'query-string';

import { isMainnet } from 'src/constants/dex';
import { FUNGIBLE_USDC_ID } from 'src/da';
import useCustomNavigate from 'src/hooks/useCustomNavigate';
import { useIsAppH5, useWalletOprs } from 'src/providers/useWallet';
import WindowOpen from 'src/utils/windowOpen';

export default function useNavigateApp() {
  return (url: string) => {
    const formattedUrl = url.startsWith('/') ? url.slice(1) : url;
    window.location.href = `degate://${formattedUrl}`;
  };
}

export function useNavigateAppH5() {
  return (url: string) => {
    if (isMainnet) {
      WindowOpen(
        `https://app.degate.com/download?url=${encodeURIComponent(url)}`
      );
    } else {
      const origin = window.location.origin;
      if (origin.includes('testnet-trade.degate.com')) {
        WindowOpen(
          `https://testnet.degate.com/download?url=${encodeURIComponent(url)}`
        );
        return;
      }
      WindowOpen(
        `${origin.replace(
          'trade.degate',
          'app.degate'
        )}/download?url=${encodeURIComponent(url)}`
      );
    }
  };
}

export function useNavigate404() {
  const navigate = useNavigateApp();
  return useCallback(() => {
    navigate(`unsupport`);
  }, [navigate]);
}

export function useAppNavigateFeedback() {
  const navigate = useNavigateApp();
  return useCallback(
    (...params: any) => {
      navigate(`feedback?${queryString.stringify(params)}`);
    },
    [navigate]
  );
}

export function useAppNavigatePairCreate() {
  const navigate = useNavigateApp();
  return useCallback(
    (...params: any) => {
      navigate(`pair/create?${queryString.stringify(params)}`);
    },
    [navigate]
  );
}

export function useAppNavigateSend() {
  const navigate = useNavigateApp();
  return useCallback(
    ({ token }: any) => {
      navigate(`send?${queryString.stringify({ tokenId: token.id })}`);
    },
    [navigate]
  );
}

export function useAppNavigateAdd() {
  const navigate = useNavigateApp();
  return useCallback(
    ({ token }: any) => {
      let id = token?.id;
      if (id === FUNGIBLE_USDC_ID) {
        id = 0;
      }
      navigate(`addFunds?${queryString.stringify({ tokenId: id })}`);
    },
    [navigate]
  );
}

export function useAppChoosePair() {
  const navigate = useNavigateApp();
  return useCallback(
    (pair: any, page = 'trade') => {
      if (page === 'trade') {
        navigate(`trade?${queryString.stringify({ pairId: pair.pairId })}`);
      }
      if (page === 'swap') {
        navigate(`swap?${queryString.stringify({ pairId: pair.pairId })}`);
      }
    },
    [navigate]
  );
}

export function useAppNavigateTokenDetail() {
  const navigate = useNavigateApp();
  return useCallback(
    (tokenId: number) => {
      navigate(`balancedetail?tokenId=${tokenId}`);
    },
    [navigate]
  );
}

export function useAppNavigateBrowserUrl() {
  return useCallback((url: string) => {
    window.location.href = `degate://browser?url=${encodeURIComponent(url)}`;
  }, []);
}

export function useAppNavigateBalance() {
  const navigate = useNavigateApp();
  return useCallback(() => {
    navigate(`balance`);
  }, [navigate]);
}

export function useNavigateBack() {
  const customNavigate = useCustomNavigate();
  const isAppH5 = useIsAppH5();
  const { callAppPromise } = useWalletOprs();
  return useCallback(() => {
    if (isAppH5) {
      callAppPromise('appBack', '');
      return;
    }
    customNavigate(-1);
  }, [customNavigate, isAppH5, callAppPromise]);
}

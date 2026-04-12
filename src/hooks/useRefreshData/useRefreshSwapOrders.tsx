// 管理数据刷新 https://confluence.inner-bihu.com/pages/viewpage.action?pageId=83356065

import { useCallback, useEffect } from 'react';

import { useUserWebSocket } from 'src/providers/userWebsocket/useUserWebsocket';
import {
  useRefreshSwapOrders,
  useRefreshSwapOrdersIndex,
} from 'src/state/swap/orders/hooks';

import useBaseRefreshIndex, {
  useUserWsRefreshIndex,
} from './useBaseRefreshIndex';

export function useRefreshSwapIndex() {
  const refreshSwapOrders = useRefreshSwapOrders();
  const wsRefreshIndex = useUserWsRefreshIndex();
  const baseIndex = useBaseRefreshIndex();
  const refreshSwapOrdersIndex = useRefreshSwapOrdersIndex();

  useEffect(() => {
    if (baseIndex || wsRefreshIndex) {
      refreshSwapOrders();
    }
  }, [refreshSwapOrders, baseIndex, wsRefreshIndex]);

  return refreshSwapOrdersIndex;
}

export function useCheckAfterSwapChange() {
  const refreshOrders = useRefreshSwapOrders();

  const { readyState } = useUserWebSocket();
  return useCallback(
    (forceRefresh?: boolean) => {
      if (readyState !== 1 || forceRefresh) {
        setTimeout(() => {
          refreshOrders();
        }, 3000);
      }
    },
    [readyState, refreshOrders]
  );
}

// 管理数据刷新 https://confluence.inner-bihu.com/pages/viewpage.action?pageId=83356065

import { useCallback, useEffect } from 'react';

import { useUserWebSocket } from 'src/providers/userWebsocket/useUserWebsocket';
import {
  useCheckSwapBalanceUpdateTime,
  useRefreshSwapBalance,
  useRefreshSwapBalanceIndex as _useRefreshSwapBalanceIndex,
} from 'src/state/swap/balances/hooks';

import useBaseRefreshIndex, {
  useUserWsRefreshIndex,
} from './useBaseRefreshIndex';

export function useRefreshSwapBalanceIndex() {
  const balanceRefreshIndex = _useRefreshSwapBalanceIndex();
  const refreshSwapBalance = useRefreshSwapBalance();
  const baseIndex = useBaseRefreshIndex();
  const wsRefreshIndex = useUserWsRefreshIndex();
  useEffect(() => {
    if (baseIndex || wsRefreshIndex) {
      refreshSwapBalance();
    }
  }, [refreshSwapBalance, baseIndex, wsRefreshIndex]);

  return balanceRefreshIndex;
}

export function useCheckWsForBalanceRefresh() {
  const refreshSwapBalance = useRefreshSwapBalance();
  const checkSwapBalanceUpdateTime = useCheckSwapBalanceUpdateTime();
  const { readyState } = useUserWebSocket();
  return useCallback(() => {
    if (readyState !== 1) {
      refreshSwapBalance();
      setTimeout(() => {
        refreshSwapBalance();
      }, 3000);
    } else {
      // 如果ws正常，检查dexBalance近期有没有更新过
      // 因为是接口调用完成后再检查，正常应该通过ws推送完成更新了
      // 10秒后检查ws是否推送余额了
      setTimeout(() => {
        checkSwapBalanceUpdateTime({ timestamp: Date.now() });
      }, 3000);
    }
  }, [readyState, refreshSwapBalance, checkSwapBalanceUpdateTime]);
}

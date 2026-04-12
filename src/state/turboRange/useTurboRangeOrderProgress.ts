import { useEffect, useMemo, useRef, useState } from 'react';

import {
  TurboRangeHistoryType,
  TurboRangeOrderStatus,
} from 'src/constants/consts';
import useRefresh from 'src/hooks/useRefreshData/useRefresh';
import { useFetchTurboRangeHistory } from 'src/state/turboRange/service';
import { logger } from 'src/utils/logger';

import { useModals } from '../application/hooks';
import ModalKeys from '../application/modalKeys';
import { useDexAccount } from '../dexAccount/hooks';
import {
  useRefreshTurboRangePostions,
  useRefreshTurboRangePostionsIndex,
  useTurboRangeState,
} from './hooks';

export function useTurboRangeOrderProgress({
  order,
  intent_id,
}: {
  order: any;
  intent_id: number;
}) {
  const [data, setData] = useState<any>(order);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setData(order);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order?.intent_id]);

  const fetchHistory = useFetchTurboRangeHistory();
  const refrehPostions = useRefreshTurboRangePostions();

  useEffect(() => {
    if (data?.status && data?.status !== TurboRangeOrderStatus.processing) {
      return () => {};
    }
    const timer = setTimeout(() => {
      setIndex((pre) => pre + 1);
    }, 6000);
    return () => {
      clearTimeout(timer);
    };
  }, [index, data, order]);

  useEffect(() => {
    if (data?.status && data?.status !== TurboRangeOrderStatus.processing) {
      return;
    }
    if (order?.status && order?.status !== TurboRangeOrderStatus.processing) {
      return;
    }
    if (!intent_id) return;

    fetchHistory({
      pageSize: 10,
      current: 1,
      intent_id,
    }).then((resp) => {
      const res = resp.list.find((d: any) => d.intent_id === intent_id);
      if (res.status === TurboRangeOrderStatus.success) {
        refrehPostions();
      }
      setData(res);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchHistory, intent_id, index]);

  return useMemo(() => {
    return data;
  }, [data]);
}

export function useHasProcessingActions({
  positionAddress,
}: {
  positionAddress: string;
}) {
  const [index, setIndex] = useState(0);
  const [pendingTrades, setPendingTrades] = useState<any[]>([]);
  const { visible } = useModals(ModalKeys.turboRangeDetail);
  const [hasProcessingClaim, setHasProcessingClaim] = useState(false);
  const [hasFailedClaim, setHasFailedClaim] = useState(false);
  const [hasProcessingWithdraw, setHasProcessingWithdraw] = useState(false);
  const [hasFailedWithdraw, setHasFailedWithdraw] = useState(false);
  const [hasProcessingIncrease, setHasProcessingIncrease] = useState(false);
  const [hasFailedIncrease, setHasFailedIncrease] = useState(false);

  useEffect(() => {
    if (!visible) {
      setPendingTrades([]);
    }
  }, [visible]);

  const { recentTrades } = useTurboRangeState();
  const currentRecentTrade = useMemo(() => {
    return recentTrades[positionAddress];
  }, [recentTrades, positionAddress]);
  // 10分钟内有本地记录
  const hasLocalProcessingClaim = useMemo(() => {
    return (
      !!currentRecentTrade?.claimTime &&
      Date.now() - currentRecentTrade.claimTime < 10 * 60 * 1000
    );
  }, [currentRecentTrade]);
  const hasLocalProcessingWithdraw = useMemo(() => {
    return (
      !!currentRecentTrade?.withdrawTime &&
      Date.now() - currentRecentTrade.withdrawTime < 10 * 60 * 1000
    );
  }, [currentRecentTrade]);
  const hasLocalProcessingIncrease = useMemo(() => {
    return (
      !!currentRecentTrade?.increaseTime &&
      Date.now() - currentRecentTrade.increaseTime < 10 * 60 * 1000
    );
  }, [currentRecentTrade]);

  const fetchHistory = useFetchTurboRangeHistory();
  const refrehPostions = useRefreshTurboRangePostions();

  useEffect(() => {
    if (hasLocalProcessingIncrease) {
      refrehPostions();
    }
  }, [hasLocalProcessingIncrease, refrehPostions]);

  useEffect(() => {
    if (!visible) {
      return () => {};
    }
    if (!hasProcessingClaim && !hasProcessingWithdraw) {
      return () => {};
    }
    const timer = setTimeout(() => {
      setIndex((pre) => pre + 1);
    }, 6000);
    return () => {
      clearTimeout(timer);
    };
  }, [index, hasProcessingClaim, hasProcessingWithdraw, visible]);

  useEffect(() => {
    fetchHistory({
      pageSize: 20,
      current: 1,
    }).then((resp) => {
      setPendingTrades(resp.list);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchHistory, index]);

  useEffect(() => {
    if (!positionAddress) {
      setHasProcessingClaim(false);
      setHasProcessingWithdraw(false);
      setHasFailedClaim(false);
      setHasFailedWithdraw(false);
      return;
    }
    const pendings = pendingTrades.filter(
      (d: any) => d.position === positionAddress
    );
    // 10分钟内有失败记录
    setHasFailedClaim(
      pendings.some(
        (d: any) =>
          d.type === TurboRangeHistoryType.LP_CLAIM &&
          d.status === TurboRangeOrderStatus.failed &&
          Date.now() - d.timestamp * 1000 < 10 * 60 * 1000
      )
    );
    setHasProcessingClaim((pre) => {
      const _n = pendings.some(
        (d: any) =>
          d.type === TurboRangeHistoryType.LP_CLAIM &&
          d.status === TurboRangeOrderStatus.processing
      );

      if (pre && !_n) {
        refrehPostions();
      }
      return _n;
    });
    // 10分钟内有失败记录
    setHasFailedWithdraw(
      pendings.some(
        (d: any) =>
          d.type === TurboRangeHistoryType.LP_WITHDRAW &&
          d.status === TurboRangeOrderStatus.failed &&
          Date.now() - d.timestamp * 1000 < 10 * 60 * 1000
      )
    );
    setHasProcessingWithdraw(() => {
      const _n = pendings.some(
        (d: any) =>
          d.type === TurboRangeHistoryType.LP_WITHDRAW &&
          d.status !== TurboRangeOrderStatus.failed
      );
      if (
        _n &&
        pendings.some(
          (d: any) =>
            d.type === TurboRangeHistoryType.LP_WITHDRAW &&
            d.status === TurboRangeOrderStatus.success
        )
      ) {
        refrehPostions();
      }
      return _n;
    });
    setHasProcessingIncrease((pre) => {
      const _n = pendings.some(
        (d: any) =>
          d.type === TurboRangeHistoryType.LP_ADD_DEPOSIT &&
          d.status === TurboRangeOrderStatus.processing
      );
      if (pre && !_n) {
        refrehPostions();
      }
      return _n;
    });
    setHasFailedIncrease(() => {
      const _n = pendings.some(
        (d: any) =>
          d.type === TurboRangeHistoryType.LP_ADD_DEPOSIT &&
          d.status === TurboRangeOrderStatus.failed
      );
      return _n;
    });
  }, [pendingTrades, positionAddress, refrehPostions]);

  useEffect(() => {
    logger.info('useHasProcessingActions', {
      hasLocalProcessingClaim,
      hasProcessingClaim,
      hasFailedClaim,
      hasLocalProcessingWithdraw,
      hasProcessingWithdraw,
      hasFailedWithdraw,
      hasLocalProcessingIncrease,
      hasProcessingIncrease,
      hasFailedIncrease,
    });
  }, [
    hasFailedClaim,
    hasFailedWithdraw,
    hasLocalProcessingClaim,
    hasLocalProcessingWithdraw,
    hasProcessingClaim,
    hasProcessingWithdraw,
    hasLocalProcessingIncrease,
    hasProcessingIncrease,
    hasFailedIncrease,
  ]);

  return useMemo(() => {
    if (!pendingTrades?.length) {
      return {
        hasLocalProcessingClaim: hasLocalProcessingClaim && !hasFailedClaim,
        hasLocalProcessingWithdraw:
          hasLocalProcessingWithdraw && !hasFailedWithdraw,
        hasProcessingClaim: hasLocalProcessingClaim,
        hasProcessingWithdraw: hasLocalProcessingWithdraw,
        hasLocalProcessingIncrease:
          hasLocalProcessingIncrease && !hasFailedIncrease,
        hasProcessingIncrease: hasLocalProcessingIncrease,
      };
    }
    return {
      hasLocalProcessingClaim: hasLocalProcessingClaim && !hasFailedClaim,
      hasLocalProcessingWithdraw:
        hasLocalProcessingWithdraw && !hasFailedWithdraw,
      hasLocalProcessingIncrease:
        hasLocalProcessingIncrease && !hasFailedIncrease,
      hasProcessingClaim,
      hasProcessingWithdraw,
      hasProcessingIncrease,
    };
  }, [
    hasFailedClaim,
    hasFailedWithdraw,
    pendingTrades?.length,
    hasLocalProcessingClaim,
    hasProcessingClaim,
    hasLocalProcessingWithdraw,
    hasProcessingWithdraw,
    hasLocalProcessingIncrease,
    hasProcessingIncrease,
    hasFailedIncrease,
  ]);
}

let globalData: any[] = [];

export function useTurboRangeRecentTrades() {
  const { positioPageShowHistoryTimestamp } = useTurboRangeState();
  const [data, setData] = useState<any[]>(globalData);
  const fetchTurboRangeHistory = useFetchTurboRangeHistory();
  const refreshPositionsIndex = useRefreshTurboRangePostionsIndex();

  const timeRefreshIndex = useRefresh(15000);

  // 1小时后隐藏
  const show =
    positioPageShowHistoryTimestamp &&
    Date.now() - positioPageShowHistoryTimestamp < 1000 * 60 * 60;

  const dexAccount = useDexAccount();
  const [refreshIndex, setRefreshIndex] = useState(0);

  // 如果positioPageShowHistoryTimestamp变化了，10秒后必触发一次查询
  useEffect(() => {
    const timer = setTimeout(() => {
      setRefreshIndex(Math.floor(Date.now() / 5000));
    }, 5000);
    return () => {
      clearTimeout(timer);
    };
  }, [positioPageShowHistoryTimestamp]);

  useEffect(() => {
    if (!show || !dexAccount.hasAccessToken) {
      return;
    }
    if (
      data?.length > 0 &&
      !data.some((d: any) => d.status === TurboRangeOrderStatus.processing)
    ) {
      return;
    }
    setTimeout(() => {
      setRefreshIndex(Math.floor(Date.now() / 5000));
    }, 5000);
  }, [
    show,
    data,
    timeRefreshIndex,
    refreshPositionsIndex,
    dexAccount.hasAccessToken,
  ]);

  useEffect(() => {
    if (!show || !dexAccount.hasAccessToken) {
      setData([]);
      return;
    }
    fetchTurboRangeHistory({
      current: 1,
      pageSize: 20,
    })
      .then((resp) => {
        globalData = resp.list;
        setData(resp.list);
      })
      .catch(() => {});
  }, [
    positioPageShowHistoryTimestamp,
    fetchTurboRangeHistory,
    show,
    refreshIndex,
    dexAccount.hasAccessToken,
  ]);

  return useMemo(() => {
    if (!show) return [];
    return data.filter(
      (d: any) =>
        d.status === TurboRangeOrderStatus.processing ||
        d.timestamp * 1000 > positioPageShowHistoryTimestamp
    );
  }, [data, positioPageShowHistoryTimestamp, show]);
}

export function useHasProcessingTurboRangeOrders() {
  const dexAccount = useDexAccount();
  const fetchTurboRangeHistory = useFetchTurboRangeHistory();
  const refreshPositionsIndex = useRefreshTurboRangePostionsIndex();
  const refreshPositions = useRefreshTurboRangePostions();
  const [hasProcessing, setHasProcessing] = useState(false);
  const prevHasProcessingRef = useRef(false);
  const refreshIndex = useRefresh(hasProcessing ? 6000 : 15000);

  useEffect(() => {
    if (!dexAccount.hasAccessToken) {
      prevHasProcessingRef.current = false;
      setHasProcessing(false);
      return;
    }
    fetchTurboRangeHistory({
      current: 1,
      pageSize: 20,
    })
      .then((resp) => {
        const nextHasProcessing = resp?.list?.some(
          (item: any) => item.status === TurboRangeOrderStatus.processing
        );

        if (prevHasProcessingRef.current && !nextHasProcessing) {
          refreshPositions();
        }

        prevHasProcessingRef.current = nextHasProcessing;
        setHasProcessing(nextHasProcessing);
      })
      .catch(() => {
        prevHasProcessingRef.current = false;
        setHasProcessing(false);
      });
  }, [
    dexAccount.account,
    dexAccount.hasAccessToken,
    fetchTurboRangeHistory,
    refreshIndex,
    refreshPositions,
    refreshPositionsIndex,
  ]);

  return hasProcessing;
}

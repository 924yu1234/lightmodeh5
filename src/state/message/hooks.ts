import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AppState } from '..';
import {
  useEarliestUserCreateTime,
  useReadedAllAssetMessageTime,
  useReadedAssetMessageIds,
  useReadedAssetOrderMessageIds,
  useReadedOperationMessageIds,
  useSaveReadAllAssetMessageTime,
  useSaveReadAssetMessageIds,
  useSaveReadAssetOrderMessageIds,
  useSaveReadedOperationMessageIds,
} from '../user/hooks';
import {
  fetchNextPageAssetMessages,
  readAssetMessage,
  setQueryAssetMessagesParams,
} from './reducer';
import { usePostReadAssetMessage } from './service';

// 运营消息
export function useOperationMessages({
  current,
  pageSize,
  type = 'all',
}: {
  current: number;
  pageSize: number;
  type?: 'pop' | 'all';
}) {
  const readedMessageIds = useReadedOperationMessageIds();
  const operationMessages = useSelector(
    (state: AppState) => state.message.operationMessages
  );
  const earlierTime = useEarliestUserCreateTime();
  const data = useMemo(() => {
    const { list = [] } = operationMessages;
    const now = Date.now();
    return (
      list
        .filter((l) => {
          // 过滤未开始的
          if (l.startTime > now) {
            return false;
          }
          // 过滤早于用户注册时间并且已经过期的
          if (earlierTime && l.startTime < earlierTime && l.endTime < now) {
            return false;
          }

          if (type && type === 'pop') {
            return l.show_prompt;
          }

          return true;
        })
        // 已读或者已过期标记为已读
        .map((d) => {
          return {
            ...d,
            readed:
              readedMessageIds.includes(d.id) || d.endTime < now || d.is_read,
          };
        })
    );
  }, [readedMessageIds, earlierTime, operationMessages, type]);

  return useMemo(() => {
    return {
      list: data.slice(0, current * pageSize),
      total: data?.length,
      unreadIds: data.filter((d) => !d.readed).map((d) => d.id),
      unreadNum: data.filter((d) => !d.readed).length,
    };
  }, [data, pageSize, current]);
}

export function useOperationMessagesPop() {
  const { list = [] } = useOperationMessages({
    current: 1,
    pageSize: 10,
    type: 'pop',
  });
  return list.filter((d) => !d.readed);
}

// 资产通知
// 包含一些活动通知，9:彩票积分 10：Flash活动 11：Flash活动结果
export function useAssetMessages({
  allMessages = false,
}: { allMessages?: boolean } = {}) {
  const res = useSelector((state: AppState) => state.message.assetMessages);
  const readedMessageIds = useReadedAssetMessageIds();
  const readedOrderIds = useReadedAssetOrderMessageIds();
  const lastAllReadedTime = useReadedAllAssetMessageTime();
  return useMemo(() => {
    const { list = [] } = res;
    return {
      ...res,
      list: list
        .filter((l) => {
          if (allMessages) return true;
          return ![9, 10, 11].includes(l.op);
        })
        .map((l) => {
          let readed = false;

          if (l.is_read) {
            readed = true;
          } else if (lastAllReadedTime && l.createTime <= lastAllReadedTime) {
            readed = true;
          }
          if (l.type === 'EXPIRED' && readedOrderIds.includes(l.id)) {
            readed = true;
          } else if (readedMessageIds.includes(l.id)) {
            readed = true;
          }
          return {
            ...l,
            readed,
          };
        }),
    };
  }, [res, readedMessageIds, allMessages, lastAllReadedTime, readedOrderIds]);
}

export function useFirstTimePointsNotication() {
  const { list = [] } = useAssetMessages({ allMessages: true });
  return useMemo(() => {
    return list.find((l) => l.op === 9 && !l.readed);
  }, [list]);
}

export function useRaffleFlashOP() {
  const { list = [] } = useAssetMessages({ allMessages: true });
  return useMemo(() => {
    return list.find((l) => l.op === 10 && !l.readed);
  }, [list]);
}

export function useRaffleFlashOPSuccess() {
  const { list = [] } = useAssetMessages({ allMessages: true });
  return useMemo(() => {
    return list.find((l) => l.op === 11 && !l.readed);
  }, [list]);
}

export function useAssetMessagesParam() {
  return useSelector((state: AppState) => state.message.assetMessages);
}

export function useSetAssetMessagesParams() {
  const dispatch = useDispatch();
  return useCallback(
    (params: any) => {
      dispatch(setQueryAssetMessagesParams(params));
    },
    [dispatch]
  );
}

export function useFetchNextPageAssetMessages() {
  const dispatch = useDispatch();
  return useCallback(() => {
    dispatch(fetchNextPageAssetMessages());
  }, [dispatch]);
}

export function useReadOperationsMessages() {
  const saveOperationIds = useSaveReadedOperationMessageIds();
  const readMessage = usePostReadAssetMessage();

  const { unreadIds } = useOperationMessages({
    current: 1,
    pageSize: 10,
  });
  return useCallback(
    ({ ids, readAll }: { ids?: number[]; readAll?: boolean }) => {
      if (ids) {
        saveOperationIds(ids);
        readMessage({
          ids: [],
          orderIds: [],
          readAll: false,
          operationIds: ids,
        }).catch(() => {});
      }
      if (readAll) {
        saveOperationIds(unreadIds);
        readMessage({
          ids: [],
          orderIds: [],
          readAll: false,
          operationIds: unreadIds,
        }).catch(() => {});
      }
    },
    [saveOperationIds, unreadIds, readMessage]
  );
}

export function useReadAssetMessages() {
  // 本地
  const saveIds = useSaveReadAssetMessageIds();
  const saveOrderIds = useSaveReadAssetOrderMessageIds();
  const saveTime = useSaveReadAllAssetMessageTime();
  const dispatch = useDispatch();
  // 后端记录
  const readMessage = usePostReadAssetMessage();
  const { list = [] } = useAssetMessages();
  const lastestTime = list?.[0]?.createTime;

  return useCallback(
    ({
      ids = [],
      orderIds = [],
      readAll,
    }: {
      ids?: number[];
      orderIds?: number[];
      readAll?: boolean;
    }) => {
      dispatch(readAssetMessage({ ids, orderIds, readAll }));
      if (ids) {
        saveIds(ids);
      }
      if (orderIds) {
        saveOrderIds(orderIds);
      }
      if (readAll && lastestTime) {
        saveTime(lastestTime);
      }
      readMessage({ ids, orderIds, readAll, operationIds: [] }).catch(() => {});
    },
    [dispatch, readMessage, saveIds, saveOrderIds, saveTime, lastestTime]
  );
}

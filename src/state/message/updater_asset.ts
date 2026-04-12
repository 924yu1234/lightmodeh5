import { useCallback, useEffect, useState } from 'react';
import { useDocumentVisibility } from 'ahooks';
import { useDispatch } from 'react-redux';

import createApiErrorTips from 'src/hooks/useCreateApiErrorTips';
import useBaseRefreshIndex from 'src/hooks/useRefreshData/useBaseRefreshIndex';
import { useDexAccount } from 'src/state/dexAccount/hooks';
import message from 'src/utils/message';

import { useAssetMessagesParam, useSetAssetMessagesParams } from './hooks';
import {
  clearAssetMessages,
  fetchedAssetMessages,
  fetchedNewAssetMessages,
  fetchingAssetMessages,
} from './reducer';
import { useFetchAllNewAssetMessages, useFetchAssetMessages } from './service';

export default function UpdaterAssetMessages() {
  const dispatch = useDispatch();
  const { account, hasAccessToken } = useDexAccount();
  const documentState = useDocumentVisibility();
  const baseIndex = useBaseRefreshIndex();
  const [index, setIndex] = useState(-1);

  const { current, queryEndTime, queryStartTime, syncIn5S } =
    useAssetMessagesParam();

  const setAssetMessagesParams = useSetAssetMessagesParams();

  const fetchAssetMessages = useFetchAssetMessages();
  const fetchAllNewAssetMessages = useFetchAllNewAssetMessages();

  const doFetch = useCallback(
    ({ _current, _endTime, _pair }: any = {}) => {
      if (documentState === 'hidden') return;
      dispatch(fetchingAssetMessages());
      fetchAssetMessages({
        token1: _pair?.baseToken,
        token2: _pair?.quoteToken,
        current: _current,
        pageSize: 10,
        end: _endTime,
      } as any)
        .then((resp) => {
          dispatch(
            fetchedAssetMessages({
              list: resp.list,
              hasNext: resp.hasNext,
              unread: resp.unread,
              current: _current,
            })
          );
        })
        .catch((err) => {
          message.error(createApiErrorTips({ error: err }));
          dispatch(
            clearAssetMessages({
              list: [],
              hasNext: false,
              current: 1,
            })
          );
        });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dispatch, fetchAssetMessages, documentState]
  );

  useEffect(() => {
    dispatch(
      clearAssetMessages({
        list: [],
        hasNext: false,
        current: 1,
      })
    );
    if (!hasAccessToken) {
      setAssetMessagesParams({
        queryEndTime: 0,
        current: 1,
      });
      return () => {};
    }
    setAssetMessagesParams({
      queryEndTime: Math.ceil(new Date().valueOf() / 1000),
      current: 1,
    });
    return () => {
      setAssetMessagesParams({
        queryEndTime: 0,
        current: 1,
      });
    };
  }, [hasAccessToken, account, dispatch, setAssetMessagesParams]);

  useEffect(() => {
    if (!queryEndTime) return;
    doFetch({
      showLoading: false,
      _current: current,
      _endTime: queryEndTime,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current, queryEndTime]);

  useEffect(() => {
    if (documentState === 'hidden') return () => {};
    if (!queryEndTime) {
      return () => {};
    }
    // 从当前列表最新的订单时间开始查询
    const _start = queryStartTime || queryEndTime;
    const now = Math.ceil(new Date().valueOf() / 1000);
    if (now - _start < 5) return () => {};
    fetchAllNewAssetMessages({
      start: _start,
    }).then((resp: any) => {
      dispatch(
        fetchedNewAssetMessages({
          list: resp.list as any,
          startTime: _start,
          unread: resp.unread,
        })
      );
    });
    const timer = setTimeout(
      () => {
        setIndex((pre) => pre + 1);
      },
      syncIn5S ? 5000 : 15000
    );
    return () => {
      clearTimeout(timer);
    };
  }, [
    documentState,
    dispatch,
    baseIndex,
    fetchAllNewAssetMessages,
    queryEndTime,
    queryStartTime,
    index,
    syncIn5S,
  ]);

  return null;
}

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { TurboRangeOrderStatus } from 'src/constants/consts';
import useRefresh from 'src/hooks/useRefreshData/useRefresh';
import { useFetchTurboRangeHistory } from 'src/state/turboRange/service';
import { useThemeParams } from 'src/theme';

import createApiErrorTips from 'js/hooks/useCreateApiErrorTips';
import { useIntl } from 'js/locals';
import InfiniteList from 'js/mobiles/components/InfiniteList';
import { useDexAccount } from 'js/state/dexAccount/hooks';
import message from 'js/utils/message';

import HistoryItemSkeleton from '../historyItemSkeleton';
import Item from './item';

export default function MTurboRangeHistory({ height }) {
  const pageSize = 20;
  const dexAccount = useDexAccount();
  const fetchTurboRangeHistory = useFetchTurboRangeHistory();

  const [endTime, setEndTime] = useState(
    Math.ceil(new Date().valueOf() / 1000)
  );

  const resfreshIndex = useRefresh(10000);

  const intl = useIntl();
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(0);
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);

  const loadMore = useCallback(
    (page, end, isRefresh = false) => {
      return fetchTurboRangeHistory({
        current: page,
        pageSize,
        end,
      })
        .then((resp) => {
          setLoading(false);
          setCurrent(page);
          setData((pre) => {
            if (isRefresh) {
              return resp.list.concat(pre.slice(pageSize));
            }
            if (page === 1) return resp.list;
            return pre.concat(resp.list);
          });
          setTotal(resp.total);
        })
        .catch((error) => {
          setTotal(0);
          setLoading(false);
          message.error(createApiErrorTips({ error, intl }));
        });
    },
    [fetchTurboRangeHistory, intl, pageSize]
  );

  const refreshList = async () => {
    const end = Math.ceil(new Date().valueOf() / 1000);
    setEndTime(end);
    return loadMore(1, end);
  };

  useEffect(() => {
    setLoading(true);
    refreshList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dexAccount.account]);

  const hasNext = data.length < total;

  const { isMobile } = useThemeParams();
  const showData = useMemo(() => {
    const showDate = [];
    return data.map((d) => {
      const day = d.create_time_day;
      const showDay =
        showDate.length === 0 || showDate[showDate.length - 1] !== day;
      if (showDay) {
        showDate.push(day);
      }
      return {
        ...d,
        showTime: showDay ? day : '',
      };
    });
  }, [data]);

  const hasUnsettledFirstPage = useMemo(() => {
    const firstPage = data.slice(0, pageSize);
    return firstPage.some(
      (item) =>
        item.status === TurboRangeOrderStatus.processing ||
        item.status === TurboRangeOrderStatus.pending
    );
  }, [data, pageSize]);

  useEffect(() => {
    if (!hasUnsettledFirstPage) return;
    loadMore(1, endTime, true);
  }, [endTime, hasUnsettledFirstPage, resfreshIndex, loadMore]);

  return (
    <StyledHistory className="m-list transfer" id="mobileWithdrawHistory">
      <InfiniteList
        dataLength={data.length}
        next={() => {
          loadMore(current + 1, endTime);
        }}
        pullDownToRefresh={isMobile}
        refreshFunction={refreshList}
        hasMore={hasNext || loading}
        height={height}
        scrollableTarget="mobileWithdrawHistory"
      >
        {loading &&
          new Array(6)
            .fill(0)
            // eslint-disable-next-line react/no-array-index-key
            .map((_, i) => <HistoryItemSkeleton isFirst={i === 0} key={i} />)}

        {showData.map((d, i) => {
          return (
            <Item
              showTime={d.showTime}
              isFrstDay={i === 0}
              key={d.intent_id}
              item={d}
            />
          );
        })}
      </InfiniteList>
    </StyledHistory>
  );
}

MTurboRangeHistory.propTypes = {
  height: PropTypes.number,
};

const StyledHistory = styled.div``;

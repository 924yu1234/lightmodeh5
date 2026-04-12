import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { SwapOrderStatus } from 'src/constants/consts';
import useRefresh from 'src/hooks/useRefreshData/useRefresh';
import { useGetSwapOrders } from 'src/state/swap/orders/service';
import { useThemeParams } from 'src/theme';

import createApiErrorTips from 'js/hooks/useCreateApiErrorTips';
import { useIntl } from 'js/locals';
import InfiniteList from 'js/mobiles/components/InfiniteList';
import { useDexAccount } from 'js/state/dexAccount/hooks';
import message from 'js/utils/message';

import HistoryItemSkeleton from '../historyItemSkeleton';
import Item from './item';

export default function MSwapHistory({ height }) {
  const pageSize = 20;
  const [endTime, setEndTime] = useState(
    Math.ceil(new Date().valueOf() / 1000)
  );
  const dexAccount = useDexAccount();
  const [data, setData] = useState([]);
  const fetchHistory = useGetSwapOrders();

  const refreshIndex = useRefresh(10000);

  const intl = useIntl();
  const [loading, setLoading] = useState(false);
  const [current, setCurrent] = useState(0);
  const [hasNext, setHasNext] = useState(true);
  const showDayList = useRef([]);
  const { isMobile } = useThemeParams();

  const loadMore = useCallback(
    (page, end, isRefresh = false) => {
      return fetchHistory({
        pageSize,
        current: page,
        end,
      })
        .then((resp) => {
          setCurrent(page);
          setData((pre) => {
            if (isRefresh) {
              return resp.list.concat(pre.slice(pageSize));
            }
            if (page === 1) {
              showDayList.current = [];
              return resp.list;
            }
            return pre.concat(resp.list);
          });
          setHasNext(resp.hasNext);
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          message.error(createApiErrorTips({ error, intl }));
        });
    },
    [fetchHistory, intl, pageSize]
  );

  const refreshList = () => {
    const end = Math.ceil(new Date().valueOf() / 1000);
    setEndTime(end);
    return loadMore(1, end);
  };

  useEffect(() => {
    setLoading(true);
    refreshList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dexAccount.account, dexAccount.account]);

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
    return firstPage.some((item) => item.status === SwapOrderStatus.processing);
  }, [data, pageSize]);

  useEffect(() => {
    if (!hasUnsettledFirstPage) return;
    loadMore(1, endTime, true);
  }, [endTime, hasUnsettledFirstPage, loadMore, refreshIndex]);
  return (
    <StyledSwapOrders className="m-list order-swap" id="mobileSwapHistory">
      <InfiniteList
        dataLength={data.length}
        next={() => {
          loadMore(current + 1, endTime);
        }}
        pullDownToRefresh={isMobile}
        refreshFunction={refreshList}
        hasMore={hasNext || loading}
        height={height}
        scrollableTarget="mobileSwapHistory"
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
              key={d.rowkey}
              order={d}
              refreshList={refreshList}
            />
          );
        })}
      </InfiniteList>
    </StyledSwapOrders>
  );
}

MSwapHistory.propTypes = {
  height: PropTypes.number,
};

const StyledSwapOrders = styled.div``;

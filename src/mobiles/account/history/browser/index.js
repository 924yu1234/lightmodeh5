import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import createApiErrorTips from 'js/hooks/useCreateApiErrorTips';
import { useIntl } from 'js/locals';
import InfiniteList from 'js/mobiles/components/InfiniteList';
import { useDexAccount } from 'js/state/dexAccount/hooks';
import message from 'js/utils/message';

import HistoryItemSkeleton from '../historyItemSkeleton';
import Item from './item';
import { useFetchBrowserHistory } from './service';

export default function BrowserHistory({ height }) {
  const pageSize = 20;
  const dexAccount = useDexAccount();
  const fetchBrowserHistory = useFetchBrowserHistory();
  const [endTime, setEndTime] = useState(
    Math.ceil(new Date().valueOf() / 1000)
  );

  const intl = useIntl();
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(0);
  const [data, setData] = useState([]);
  const [hasNext, setHasNext] = useState(false);

  function loadMore(page, end) {
    return fetchBrowserHistory({
      current: page,
      pageSize,
      end,
    })
      .then((resp) => {
        setLoading(false);
        setCurrent(page);
        setData((pre) => {
          if (page === 1) {
            return resp.list;
          }
          return pre.concat(resp.list);
        });
        setHasNext(resp.hasNext);
      })
      .catch((error) => {
        setHasNext(false);
        setLoading(false);
        message.error(createApiErrorTips({ error, intl }));
      });
  }

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

  return (
    <StyledBrowserHistory className="m-list transfer" id="mobileBrowserHistory">
      <InfiniteList
        dataLength={data.length}
        next={() => {
          loadMore(current + 1, endTime);
        }}
        pullDownToRefresh
        refreshFunction={refreshList}
        hasMore={hasNext || loading}
        height={height}
        scrollableTarget="mobileBrowserHistory"
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
              key={d.tx_hash}
              item={d}
            />
          );
        })}
      </InfiniteList>
    </StyledBrowserHistory>
  );
}

BrowserHistory.propTypes = {
  height: PropTypes.number,
};

const StyledBrowserHistory = styled.div``;

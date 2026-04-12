import React, { useEffect, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { useUserFlag } from 'src/state/user/hooks';
import { useThemeParams } from 'src/theme';

import createApiErrorTips from 'js/hooks/useCreateApiErrorTips';
import { useIntl } from 'js/locals';
import InfiniteList from 'js/mobiles/components/InfiniteList';
import { useDexAccount } from 'js/state/dexAccount/hooks';
import message from 'js/utils/message';

import HistoryItemSkeleton from '../historyItemSkeleton';
import Item from './item';
import { useFetchReceiveHistory } from './service';

export default function MReceiveHistoryList({ height }) {
  const pageSize = 20;
  const dexAccount = useDexAccount();
  const fetchHistory = useFetchReceiveHistory();
  const [endTime, setEndTime] = useState(
    Math.ceil(new Date().valueOf() / 1000)
  );
  const chain = useUserFlag('receive_history_filter_chain');
  const intl = useIntl();
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(0);
  const [data, setData] = useState([]);
  const [hasNext, setHasNext] = useState(true);
  const showDayList = useRef([]);
  const { isMobile } = useThemeParams();

  function loadMore(page, end) {
    return fetchHistory({
      current: page,
      pageSize,
      end,
      chain,
    })
      .then((resp) => {
        setLoading(false);
        setCurrent(page);
        setData((pre) => {
          if (page === 1) {
            showDayList.current = [];
            return resp.list;
          }
          return pre.concat(resp.list);
        });
        setHasNext(resp.hasNext);
      })
      .catch((error) => {
        setHasNext(false);
        setLoading(false);
        if (error?.code !== -400) {
          message.error(createApiErrorTips({ error, intl }));
        }
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
  }, [dexAccount.account, chain]);

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

MReceiveHistoryList.propTypes = {
  height: PropTypes.number,
};

const StyledHistory = styled.div``;

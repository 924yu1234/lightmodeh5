import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import Empty from 'src/components/Empty';
import { SwapOrderStatus } from 'src/constants/consts';
import { useIntl } from 'src/locals';
import InfiniteList from 'src/mobiles/components/InfiniteList';
import { useDexAccount } from 'src/state/dexAccount/hooks';
import {
  useFetchNextSwapOrders,
  useSwapOrders,
} from 'src/state/swap/orders/hooks';

import OrderItem from './item';

export default function SwapOrders() {
  const intl = useIntl();
  const [current, setCurrent] = useState(1);
  const { orders, total } = useSwapOrders();
  const { hasUnlocked } = useDexAccount();
  const pageSize = 20;

  // 已取消订单不显示
  // 未解锁时纯本地订单不显示
  const showList = orders
    .slice(0, current * pageSize)
    .filter(
      (d) =>
        d.status !== SwapOrderStatus.canceled && (hasUnlocked || !!d.intent_id)
    );

  const fetchingNextSwapOrders = useFetchNextSwapOrders();
  const hasNext = total > current * pageSize;

  const originHasNext = total > orders?.length;

  useEffect(() => {
    if (!hasNext && originHasNext) {
      fetchingNextSwapOrders();
    }
  }, [originHasNext, hasNext, fetchingNextSwapOrders]);

  return (
    <StyledOrders className="open-orders">
      <div className="orders-list">
        {total === 0 ? (
          <Empty source="trade_openOrders">
            <div className="empty-text">{intl.no_data}</div>
          </Empty>
        ) : (
          <>
            <InfiniteList
              dataLength={showList.length}
              next={() => {
                setCurrent(current + 1);
              }}
              pullDownToRefresh={false}
              hasMore={originHasNext || hasNext}
              scrollableTarget="mobileSwapScroll"
              refreshFunction={() => {}}
            >
              {showList.map((order: any) => {
                return <OrderItem order={order} key={order?.order_id} />;
              })}
            </InfiniteList>
          </>
        )}
      </div>
    </StyledOrders>
  );
}

const StyledOrders = styled.div``;

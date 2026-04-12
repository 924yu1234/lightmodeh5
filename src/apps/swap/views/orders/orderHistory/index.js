import React, { useCallback, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { StyledTable } from 'src/apps/components/Table';
import Empty from 'src/components/Empty';
import InfiniteLoadingTips from 'src/components/InfiniteLoadingTips';
import SwapOrderStatusEle from 'src/components/SwapOrderStatus';
import SwapPairMarket from 'src/components/SwapPair/market';
import UsdcSuppliedInTable from 'src/components/UsdcSupplied/inTable';
import { SwapOrderStatus } from 'src/constants/consts';
import { useIntl } from 'src/locals';
import { useDexAccount } from 'src/state/dexAccount/hooks';
import {
  useFetchingNextPageIndex,
  useFetchNextSwapOrders,
  useSwapOrders,
} from 'src/state/swap/orders/hooks';
import { useSwapDataMap } from 'src/state/swap/orders/utils';

import Oprs from './oprBtns';

export default function OpenOrders({ tableWidth, maxHeight }) {
  const intl = useIntl();
  const [current, setCurrent] = useState(1);
  const { orders, total, loading } = useSwapOrders();
  const nextPageIndex = useFetchingNextPageIndex();
  const { orderDirMap } = useSwapDataMap();
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

  const columns = [
    {
      title: intl['orders.th_time'],
      width: 160,
      align: 'left',
      dataIndex: 'create_time_display',
    },
    {
      title: intl['orders.th_pair'],
      width: 120,
      align: 'left',
      dataIndex: 'market',
      render: (v, d) => {
        return (
          <SwapPairMarket
            pair={d}
            page="swap"
            hideCode
            hideIcon
            disableNavigate={d.pairId === 0}
          />
        );
      },
    },
    {
      title: intl['orders.th_orderDir'],
      width: 100,
      align: 'left',
      dataIndex: 'orderDir',
      render: (v) => orderDirMap[v],
    },
    {
      title: intl['orders.th_price'],
      width: 120,
      align: 'left',
      dataIndex: 'price_display',
    },
    {
      title: intl.pay,
      width: 160,
      align: 'left',
      dataIndex: 'pay_display_max7',
      render: (v, d) => {
        return (
          <StyledAmount>
            {v}
            <UsdcSuppliedInTable tokens={d.usdc_tokens} />
          </StyledAmount>
        );
      },
    },
    {
      title: intl.receive,
      width: 160,
      align: 'left',
      dataIndex: 'receive_display_max7',
    },
    {
      title: intl['orders.th_status'],
      width: 120,
      align: 'left',
      dataIndex: 'status',
      render: (v, d) => {
        return (
          <SwapOrderStatusEle
            status={v}
            errorCode={d.errorCode}
            showIcon={false}
          />
        );
      },
    },
    {
      title: intl.action,
      dataIndex: 'order_id',
      render: (v, d) => {
        return <Oprs order={d} />;
      },
    },
  ];

  const renderEmpty = useCallback(() => {
    return (
      <Empty source="trade_openOrders">
        <div className="empty-text">{intl.no_data}</div>
      </Empty>
    );
  }, [intl]);

  const extra = useMemo(() => {
    if (hasNext) return '';
    return intl.all_data_displayed;
  }, [hasNext, intl]);

  const scrollFn = useCallback((e) => {
    const node = e.target;
    const perc =
      (node.scrollTop / (node.scrollHeight - node.clientHeight)) * 100;
    if (perc >= 100) {
      setCurrent((pre) => pre + 1);
    }
  }, []);

  const hasData = useMemo(() => {
    return orders.length > 0;
  }, [orders]);

  useEffect(() => {
    const node = document.querySelector('.swap-orders-history .dg-table-body');
    if (node) {
      node.addEventListener('scroll', scrollFn);
    }
    return () => {
      if (node) node.removeEventListener('scroll', scrollFn);
    };
  }, [scrollFn, hasData]);

  const summaryFunc = useCallback(() => {
    return (
      <InfiniteLoadingTips
        loading={nextPageIndex && current > 1}
        width={tableWidth}
      >
        {orders.length > 0 && <>{extra}</>}
      </InfiniteLoadingTips>
    );
  }, [tableWidth, orders, extra, current, nextPageIndex]);

  return (
    <>
      <StyledTable
        columns={columns}
        dataSource={showList}
        loading={loading && current === 1}
        rowKey="id"
        className="swap-orders-history"
        scroll={{
          y: maxHeight - 40,
          scrollToFirstRowOnChange: false,
        }}
        emptyText={renderEmpty}
        summary={summaryFunc}
      />
    </>
  );
}

OpenOrders.propTypes = {
  tableWidth: PropTypes.number,
  maxHeight: PropTypes.number,
};

const StyledAmount = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { last } from 'lodash';

import { StyledTable } from 'src/apps/components/Table';
import Empty from 'src/components/Empty';
import Loader from 'src/components/Loader';
import { useBalancesWithTopTokens } from 'src/hooks/useAssets';
import { useIntl } from 'src/locals';
import {
  useCurrentSwapPair,
  useSwapQuoteTokens,
} from 'src/state/swap/pair/hooks';

import TokenSymbol from 'js/components/Token/symbol';

export default function BalanceTab({ maxHeight }: { maxHeight: number }) {
  const intl = useIntl();
  const [current, setCurrent] = useState(1);
  const quoteTokens = useSwapQuoteTokens();
  const { baseToken } = useCurrentSwapPair();
  const topTokens = useMemo(() => {
    return [baseToken, ...quoteTokens].filter((d) => d?.code);
  }, [baseToken, quoteTokens]);
  const list = useBalancesWithTopTokens({
    topTokens,
  });

  const loading = false;

  const pageSize = 20;
  const showList = list.slice(0, current * pageSize);

  const columns = [
    {
      dataIndex: 'symbol',
      width: 150,
      title: intl['account.assets_symbol'],
      align: 'left',
      render: (v: any, d: any) => {
        return <TokenSymbol token={d?.token || d} enableNavigate />;
      },
    },
    {
      dataIndex: 'availableDisplay',
      title: intl.available,
      width: 120,
      render: (v: any, d: any) => {
        if (d.loadingBalance) return <Loader />;
        return <div>{d.availableDisplay || '--'}</div>;
      },
    },
    {
      dataIndex: 'availableValueDisplay',
      width: 140,
      title: intl['account.assets_market'],
      render: (v: any, d: any) => {
        if (d.loading) return <Loader />;
        return <div>{v || '--'}</div>;
      },
    },
  ];

  const scrollFn = useCallback((e: any) => {
    const node = e.target;
    const perc =
      (node.scrollTop / (node.scrollHeight - node.clientHeight)) * 100;
    if (perc >= 100) {
      setCurrent((pre) => pre + 1);
    }
  }, []);

  useEffect(() => {
    const node = document.querySelector('.balance-table .dg-table-body');
    if (node) {
      node.addEventListener('scroll', scrollFn);
    }
    return () => {
      if (node) node.removeEventListener('scroll', scrollFn);
    };
  }, [scrollFn]);

  const renderEmpty = useCallback(() => {
    return (
      <Empty source="trade_openOrders">
        <div className="empty-text">{intl.no_data}</div>
      </Empty>
    );
  }, [intl]);

  return (
    <StyledTable
      rowHeight={42}
      columns={columns}
      dataSource={showList}
      loading={loading && current === 1}
      rowKey="id"
      className="balance-table"
      emptyText={renderEmpty}
      rowClassName={(d: any) => {
        if (d.id === last(topTokens)?.id) return 'top-token';
        return '';
      }}
      scroll={{
        y: maxHeight - 42,
        scrollToFirstRowOnChange: false,
      }}
    />
  );
}

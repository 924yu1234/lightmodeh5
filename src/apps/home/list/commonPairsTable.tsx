import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';

import TitleWithSort from 'src/apps/components/Table/titleWithSort';
import PaginationWithTotal from 'src/components/Pagination/withTotal';
import SwapPairMarket from 'src/components/SwapPair/market';
import { useSwapPairsForTypes } from 'src/state/swap/pairs/hooks';
import { useSort, useUpdateSort } from 'src/state/user/hooks';
import { formatPairInfo } from 'src/utils/swapNumberFormat';

import { StyledAssetTable } from 'js/apps/components/Table/assetTable';
import PriceChange from 'js/components/Pair/priceChange';
import { useIntl } from 'js/locals';

export default function CommonPairsTable({ type }: { type: string }) {
  const intl = useIntl();
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const updateSort = useUpdateSort(`pairs_${type}`);
  const { orderBy = '', orderDir = '' } = useSort(`pairs_${type}`);

  const { list, loading } = useSwapPairsForTypes({
    type,
    chain: 'all',
    current,
    pageSize,
    orderBy: orderDir ? orderBy : 'index',
    orderDir: orderDir || 'asc',
  });

  const showList = useMemo(() => {
    return list.slice((current - 1) * pageSize, current * pageSize);
  }, [list, current, pageSize]);

  useEffect(() => {
    setCurrent(1);
  }, []);

  const columns = [
    {
      dataIndex: 'pairId',
      width: 240,
      title: (
        <TitleWithSort
          hasEmptyState
          title={intl.token}
          dir={orderBy === 'market' ? orderDir : ''}
          onChangeDir={(v) => {
            updateSort({ orderBy: 'market', orderDir: v });
            setCurrent(1);
          }}
        />
      ),
      render: (v: any, d: any) => {
        return <SwapPairMarket pair={d} page="swap" />;
      },
    },
    {
      dataIndex: 'price_display',
      className: 'td-left-10',
      title: (
        <TitleWithSort
          hasEmptyState
          title={intl['info.th_price']}
          dir={orderBy === 'price' ? orderDir : ''}
          onChangeDir={(v) => {
            updateSort({ orderBy: 'price', orderDir: v });
            setCurrent(1);
          }}
        />
      ),
      width: 140,
    },
    {
      dataIndex: 'percent',
      width: 140,
      className: 'td-left-10',
      title: (
        <TitleWithSort
          hasEmptyState
          title={intl['info.th_change']}
          dir={orderBy === 'percent' ? orderDir : ''}
          onChangeDir={(v) => {
            updateSort({ orderBy: 'percent', orderDir: v });
            setCurrent(1);
          }}
        />
      ),
      render: (v: any, d: any) => (
        <PriceChange price_change_percent={d.percent} max99 />
      ),
    },
    {
      dataIndex: 'poolVolume',
      width: 140,
      className: 'td-left-10',
      title: (
        <TitleWithSort
          hasEmptyState
          title={intl['trade.vol_24h']}
          dir={orderBy === 'poolVolume' ? orderDir : ''}
          onChangeDir={(v) => {
            updateSort({ orderBy: 'poolVolume', orderDir: v });
            setCurrent(1);
          }}
        />
      ),
      render: (v: any) => `$${formatPairInfo(v) || '--'}`,
    },
    // {
    //   dataIndex: 'txns',
    //   width: 140,
    //   className: 'td-left-10',
    //   title: (
    //     <TitleWithSort
    //       hasEmptyState
    //       title={intl['24h_txns']}
    //       dir={orderBy === 'txns' ? orderDir : ''}
    //       onChangeDir={(v) => {
    //         updateSort({ orderBy: 'txns', orderDir: v });
    //         setCurrent(1);
    //       }}
    //     />
    //   ),
    //   render: (v: any) => `${digit.format(v, '0,0') || '--'}`,
    // },
    {
      dataIndex: 'liquidity',
      width: 140,
      className: 'td-left-10',
      title: (
        <TitleWithSort
          hasEmptyState
          title={intl.liquidity}
          dir={orderBy === 'liquidity' ? orderDir : ''}
          onChangeDir={(v) => {
            updateSort({ orderBy: 'liquidity', orderDir: v });
            setCurrent(1);
          }}
        />
      ),
      render: (v: any) => `$${formatPairInfo(v) || '--'}`,
    },

    {
      dataIndex: 'marketCap',
      width: 140,
      className: 'td-left-10',
      title: (
        <TitleWithSort
          hasEmptyState
          title={intl.mkt_cap}
          dir={orderBy === 'marketCap' ? orderDir : ''}
          onChangeDir={(v) => {
            updateSort({ orderBy: 'marketCap', orderDir: v });
            setCurrent(1);
          }}
        />
      ),
      render: (v: any) => `$${formatPairInfo(v) || '--'}`,
    },
  ];

  return (
    <StyledHotPairsTable className="top-pairs-table">
      <StyledAssetTable
        rowKey="pairId"
        dataSource={showList}
        columns={columns}
        loading={loading}
        bodyHeight={500}
      />
      <PaginationWithTotal
        total={list.length}
        current={current}
        pageSize={pageSize}
        setPageSize={(v) => {
          setCurrent(1);
          setPageSize(v);
        }}
        onChange={setCurrent}
      />
    </StyledHotPairsTable>
  );
}

export const StyledHotPairsTable = styled.div`
  margin-top: 20px;
  min-height: 1080px;
  .toTrade {
    color: ${(props) => props.theme.blue};
    cursor: pointer;
  }
`;

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import TitleWithSort from 'src/apps/components/Table/titleWithSort';
import PaginationWithTotal from 'src/components/Pagination/withTotal';
import SwapPairMarket from 'src/components/SwapPair/market';
import { useFavoriteSwapPairs } from 'src/state/swap/pairs/hooks';
import { useSort, useUpdateSort } from 'src/state/user/hooks';
import { isNumber } from 'src/utils/digit';
import { formatSwapPairPrice } from 'src/utils/swapNumberFormat';

import { StyledAssetTable } from 'js/apps/components/Table/assetTable';
import PriceChange from 'js/components/Pair/priceChange';
import { useIntl } from 'js/locals';

export default function FavoritesTable() {
  const intl = useIntl();
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(50);

  const { orderBy = '', orderDir = '' } = useSort('swap_favorites');
  const { pairs: favoriteSwapPairs } = useFavoriteSwapPairs({
    orderBy,
    orderDir,
    needFilterChain: false,
  });

  const updateSort = useUpdateSort('swap_favorites');

  useEffect(() => {
    setCurrent(1);
  }, []);

  const loading = !favoriteSwapPairs;

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
      dataIndex: 'price',
      className: 'td-left-10',
      width: 140,
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
      render: (v: any) => {
        return formatSwapPairPrice(v, { precision: '#' });
      },
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
      render: (v: any) => {
        return isNumber(v) ? <PriceChange price_change_percent={v} /> : '--';
      },
    },
    {
      dataIndex: 'liquidity',
      align: 'right',
      title: null,
      render: () => {
        return null;
      },
    },
  ];

  const showList = favoriteSwapPairs.slice(
    (current - 1) * pageSize,
    current * pageSize
  );

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
        total={favoriteSwapPairs.length}
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

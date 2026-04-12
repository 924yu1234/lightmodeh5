import React, { useCallback } from 'react';
import { FixedSizeList } from 'react-window';
import styled from 'styled-components';

import TitleWithSort from 'src/apps/components/Table/titleWithSort';
import SwapPairItem from 'src/components/ChoosePair/swapPairItem';
import Spin from 'src/components/Spin';
import { Type_DAChains } from 'src/da';
import { useSwapPairsForTypes } from 'src/state/swap/pairs/hooks';
import { useSort, useUpdateSort } from 'src/state/user/hooks';

import { useIntl } from 'js/locals';

export default function CommonPairs({
  popupHeight,
  type,
  chain,
}: {
  popupHeight: number;
  type: string;
  chain: Type_DAChains | 'all';
}) {
  const intl = useIntl();
  const { orderBy = '', orderDir = '' } = useSort(`pairs_${type}`);

  const { list, loading } = useSwapPairsForTypes({
    type,
    chain,
    current: 1,
    pageSize: 1000,
    orderBy: orderDir ? orderBy : 'index',
    orderDir: orderDir || 'asc',
  });

  const updateSort = useUpdateSort(`pairs_${type}`);

  const Row = useCallback(({ data, index, style }: any) => {
    const pair = data[index];
    return <SwapPairItem pair={pair} key={pair?.pairId} style={style} />;
  }, []);

  const itemKey = useCallback((index: any, data: any) => {
    const pair = data[index];
    return pair?.pairId;
  }, []);

  return (
    <StyledChoosePairList className="list">
      <div className="list-top">
        <div className="top-item item-symbol">
          <TitleWithSort
            hasEmptyState
            title={intl['trade.pair_market']}
            dir={orderBy === 'pair' ? orderDir : ''}
            onChangeDir={(v) => {
              updateSort({ orderBy: 'pair', orderDir: v });
            }}
          />
        </div>
        <div className="top-item item-price">
          <TitleWithSort
            hasEmptyState
            title={intl['trade.pair_last_price']}
            dir={orderBy === 'price' ? orderDir : ''}
            onChangeDir={(v) => {
              updateSort({ orderBy: 'price', orderDir: v });
            }}
          />
        </div>
        <div className="top-item item-percent">
          <TitleWithSort
            hasEmptyState
            title={intl['info.th_change']}
            dir={orderBy === 'percent' ? orderDir : ''}
            onChangeDir={(v) => {
              updateSort({ orderBy: 'percent', orderDir: v });
            }}
          />
        </div>
      </div>
      <Spin spinning={loading}>
        <div className="list-body">
          <FixedSizeList
            height={popupHeight - 45}
            width="100%"
            itemData={list}
            itemCount={list.length}
            itemSize={42}
            itemKey={itemKey}
            className="pairs-list"
          >
            {Row}
          </FixedSizeList>
        </div>
      </Spin>
    </StyledChoosePairList>
  );
}

const StyledChoosePairList = styled.div`
  .list-top {
    width: 100%;
    ${(props) => props.theme.fontRegular};
    font-size: ${(props) => (props.theme.isMobile ? '10px' : '12px')};
    color: ${(props) => props.theme.t_b7b};
    letter-spacing: 0;
    line-height: 40px;
    height: 40px;
  }
  .list-body-item,
  .list-top {
    padding: 0 20px;
    display: grid;
    grid-template-columns: 3fr 110px 80px;
    grid-template-areas: 'symbol price percent';
    .item-symbol {
      grid-area: symbol;
    }
    .item-price {
      grid-area: price;
    }
    .item-percent {
      margin-left: auto;
      grid-area: percent;
    }
    .sort-title {
      white-space: nowrap;
    }
  }
`;

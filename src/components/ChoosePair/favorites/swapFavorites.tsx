import React, { useCallback } from 'react';
import { FixedSizeList } from 'react-window';
import styled from 'styled-components';

import TitleWithSort from 'src/apps/components/Table/titleWithSort';
import Empty from 'src/components/Empty';
import { useFavoriteSwapPairs } from 'src/state/swap/pairs/hooks';
import { usePairsWithTokenInfo } from 'src/state/swap/tokenInfo/hooks';
import { useSort, useUpdateSort } from 'src/state/user/hooks';

import { useIntl } from 'js/locals';

import SwapPairItem from '../swapPairItem';

export default function SwapFavoritePairs({
  height,
  needFilterChain,
}: {
  height: number;
  needFilterChain: boolean;
}) {
  const intl = useIntl();
  const { orderBy = '', orderDir = '' } = useSort('swap_favorites');

  const { pairs: favoriteSwapPairs } = useFavoriteSwapPairs({
    orderBy,
    orderDir,
    needFilterChain,
  });

  const favoriteSwapPairsWithPrice = usePairsWithTokenInfo({
    pairs: favoriteSwapPairs,
  });

  const updateSort = useUpdateSort('swap_favorites');

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
            dir={orderBy === 'market' ? orderDir : ''}
            onChangeDir={(v) => {
              updateSort({ orderBy: 'market', orderDir: v });
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
            dir={orderBy === 'change' ? orderDir : ''}
            onChangeDir={(v) => {
              updateSort({ orderBy: 'change', orderDir: v });
            }}
          />
        </div>
      </div>
      <div className="list-body">
        {favoriteSwapPairsWithPrice?.length === 0 ? (
          <Empty showAccountTips={false}>
            <div className="empty-text">{intl.no_data}</div>
          </Empty>
        ) : (
          <>
            <FixedSizeList
              height={height - 45}
              width="100%"
              itemData={favoriteSwapPairsWithPrice}
              itemCount={favoriteSwapPairsWithPrice?.length}
              itemSize={42}
              itemKey={itemKey}
              className="pairs-list"
            >
              {Row}
            </FixedSizeList>
          </>
        )}
      </div>
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

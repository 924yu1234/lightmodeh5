import React, { useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { FixedSizeList } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';
import styled from 'styled-components';

import TitleWithSort from 'src/apps/components/Table/titleWithSort';
import { useSwapPairs } from 'src/state/swap/pairs/hooks';
import { useSort, useUpdateSort } from 'src/state/user/hooks';

import { useIntl } from 'js/locals';

import PairItem from '../../ChoosePair/pairItem';

export default function Pairs({ height }) {
  const intl = useIntl();
  const [current, setCurrent] = useState(1);
  const { orderBy = '', orderDir = '' } = useSort('choose_swap_pairs');
  const updateSort = useUpdateSort('choose_swap_pairs');
  const pageSize = 1000;
  const { list: _pairs } = useSwapPairs({
    current,
    pageSize,
    orderBy: orderDir ? orderBy : 'index',
    orderDir: orderDir || 'asc',
  });

  // const chain = useUserFlag('choose_swap_pair_chain');
  // 暂时不过滤链
  const chain = 'all';
  const pairs = useMemo(() => {
    if (chain === 'all') return _pairs;
    return _pairs.filter((p) => p.baseToken?.chain === chain);
  }, [_pairs, chain]);
  const total = pairs.length;

  const loading = !pairs;

  const Row = useCallback(({ data, index, style }) => {
    const pair = data[index];
    if (!pair) return null;
    return (
      <PairItem pair={pair} key={`${pair?.pairId}_${index}`} style={style} />
    );
  }, []);

  const loadMoreItems = (startIndex) => {
    if (!loading && startIndex !== 0) {
      setCurrent((pre) => {
        const n = Math.floor(startIndex / pageSize) + 1;
        return Math.max(pre, n);
      });
    }
  };

  const itemKey = useCallback((index, data) => {
    const pair = data[index];
    return `${pair?.pairId}_${index}_${pair?.isSwapPair ? 'swap' : 'spot'}`;
  }, []);

  const isItemLoaded = (index) => {
    return index < pairs.length;
  };

  return (
    <StyledChoosePairList className="list">
      <div className="list-top">
        <div className="top-item item-symbol">
          <TitleWithSort
            hasEmptyState
            title={intl.token}
            dir={orderBy === 'market' ? orderDir : ''}
            onChangeDir={(v) => {
              updateSort({ orderBy: 'market', orderDir: v });
              setCurrent(1);
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
              setCurrent(1);
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
              setCurrent(1);
            }}
          />
        </div>
      </div>
      <div className="list-body">
        {height && (
          <InfiniteLoader
            isItemLoaded={isItemLoaded}
            itemCount={total}
            loadMoreItems={loadMoreItems}
          >
            {({ onItemsRendered, ref }) => (
              <FixedSizeList
                height={height - 45}
                width="100%"
                itemData={pairs}
                itemCount={total}
                ref={ref}
                onItemsRendered={onItemsRendered}
                itemSize={42}
                itemKey={itemKey}
                className="pairs-list"
              >
                {Row}
              </FixedSizeList>
            )}
          </InfiniteLoader>
        )}
      </div>
    </StyledChoosePairList>
  );
}

Pairs.propTypes = {
  height: PropTypes.number,
};

const StyledChoosePairList = styled.div`
  .list-body-item,
  .list-top {
    padding: 0 20px;
    display: grid;
    grid-template-columns: 3fr 110px 80px;
    grid-template-areas: 'symbol price percent';
  }
  .list-body-item {
    &:hover {
      background: ${(props) => props.theme.hover};
    }
  }
  .list-top {
    width: 100%;
    ${(props) => props.theme.fontRegular};
    font-size: ${(props) => (props.theme.isMobile ? '10px' : '12px')};
    color: ${(props) => props.theme.t_b7b};
    letter-spacing: 0;
    line-height: 40px;
    height: 40px;
    .item-percent {
      margin-left: auto;
    }
    .sort-title {
      white-space: nowrap;
    }
  }
`;

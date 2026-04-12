import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useThrottle } from 'ahooks';
import PropTypes from 'prop-types';
import { FixedSizeList } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';
import styled from 'styled-components';

import useChoosePair from 'src/hooks/choosePair';
import { useIntl } from 'src/locals';
import { useGaEvent } from 'src/providers/useWallet';
import {
  quickSearchSwapPairs,
  searchSwapPairs,
} from 'src/state/swap/pairs/service';
import { useUpdateFromSearchRes } from 'src/state/swap/tokenInfo/hooks';
import { useUserFlag } from 'src/state/user/hooks';

import Spin from 'js/components/Spin';
import { useModals } from 'js/state/application/hooks';
import { ModalKeys } from 'js/state/application/reducer';

import TokenItem from './tokenItem';

export default function SwapPairSearchResult({ search, height }) {
  const [resMap, setResMap] = useState({});
  const [quickResMap, setQuickResMap] = useState({});
  const [loading, setLoading] = useState(false);
  const intl = useIntl();
  const { hide } = useModals(ModalKeys.chooseSwapPair);
  const choosePair = useChoosePair();
  const updateFromSearchRes = useUpdateFromSearchRes();
  const throttledSearch = useThrottle(search, 150);
  const chain = useUserFlag('choose_swap_pair_chain');
  const gaEvent = useGaEvent();

  useEffect(() => {
    if (!throttledSearch) {
      return;
    }
    setLoading(true);
    gaEvent('SwapPairSearch', {
      search: throttledSearch,
      chain,
    });
    quickSearchSwapPairs({ text: throttledSearch, chain }).then((resp) => {
      updateFromSearchRes(resp);
      setQuickResMap((pre) => {
        pre[throttledSearch] = resp;
        return { ...pre };
      });
      if (resp?.pairs?.length) setLoading(false);
    });
    searchSwapPairs({ text: throttledSearch, chain })
      .then((resp) => {
        updateFromSearchRes(resp);
        setResMap((pre) => {
          pre[throttledSearch] = resp;
          return { ...pre };
        });
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [throttledSearch, updateFromSearchRes, chain, gaEvent]);

  const quickRes = quickResMap[throttledSearch];
  const res = resMap[throttledSearch];
  const { pairs = [], third_party_err } = res || {};
  const showLoading = !!throttledSearch && (loading || (!res && !quickRes));

  const showPairs = useMemo(() => {
    const quickPairs = quickRes?.pairs || [];
    const quickPairsMap = new Map(
      quickPairs.map((pair) => [pair.pairId, pair])
    );
    return quickPairs.concat(
      pairs.filter((pair) => !quickPairsMap.has(pair.pairId))
    );
  }, [quickRes, pairs]);

  const itemKey = useCallback((index, data) => {
    const pair = data[index];
    return `${pair?.pairId}_${index}_${pair?.isSwapPair ? 'swap' : 'spot'}`;
  }, []);

  const isItemLoaded = (index) => {
    return index < showPairs.length;
  };

  const Row = useCallback(
    ({ data, index, style }) => {
      const pair = data[index];
      if (!pair) return null;
      const token = pair.baseToken;

      return (
        <div className="section" key={token?.code} style={style}>
          <div
            className="section-inner"
            onClick={() => {
              choosePair(
                {
                  baseToken: pair.baseToken,
                  quoteToken: pair.quoteToken,
                  pairId: pair.pairId,
                },
                'swap'
              );
              hide();
            }}
          >
            <TokenItem pair={pair} />
          </div>
        </div>
      );
    },
    [choosePair, hide]
  );

  return (
    <Spin spinning={showLoading}>
      <StyledSearchResult>
        <div className="list-body">
          {third_party_err ? (
            <div className="error-fetching">{intl.Error_fetching_data}</div>
          ) : (
            <>
              <InfiniteLoader
                isItemLoaded={isItemLoaded}
                itemCount={showPairs.length}
                loadMoreItems={() => {}}
              >
                {({ onItemsRendered, ref }) => (
                  <FixedSizeList
                    height={height - 20}
                    width="100%"
                    itemData={showPairs}
                    itemCount={showPairs.length}
                    ref={ref}
                    onItemsRendered={onItemsRendered}
                    itemSize={75}
                    itemKey={itemKey}
                    className="pairs-list"
                  >
                    {Row}
                  </FixedSizeList>
                )}
              </InfiniteLoader>
            </>
          )}
        </div>
      </StyledSearchResult>
    </Spin>
  );
}

SwapPairSearchResult.propTypes = {
  search: PropTypes.string,
  height: PropTypes.number,
};

const StyledSearchResult = styled.div`
  padding: 0;
  margin-top: 20px;
  color: ${(props) => props.theme.t_b7b};
  ${(props) => props.theme.fontRegular};
  font-size: 14px;
  min-height: 150px;

  .search-title {
    display: flex;
    align-items: center;
    line-height: 20px;
    margin-bottom: 10px;
    color: ${(props) => props.theme.t_b7b};
    font-size: 14px;
    padding: 0 20px;

    .show-all {
      display: flex;
      align-items: center;
      cursor: pointer;
    }
  }

  .error-fetching {
    padding: 30px 10px;
    text-align: center;
    font-size: 14px;
    ${(props) => props.theme.fontRegular};
    color: ${(props) => props.theme.t_b7b_60};
    text-align: center;
  }

  .section {
    padding: 0 20px 10px;
    .section-inner {
      background: ${({ theme }) => theme.bg_white_06};
      border-radius: 5px;
      padding: 10px 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      cursor: pointer;
      height: 65px;
      border: 1px solid ${({ theme }) => theme.border_transparent};
      &:hover {
        border: 1px solid ${(props) => props.theme.blue};
      }
    }
    .section-line {
      width: calc(100% - 40px);
      margin-left: 20px;
      height: 1px;
      background: ${(props) => props.theme.innerBorder};
    }
    .pairs-tpl {
      padding: 10px 0 0;
    }
  }

  .list-body-item,
  .list-top {
    display: grid;
    gap: 20px;
    grid-template-columns: 220px 110px 110px;
    grid-template-areas: 'market last change';
  }
  .list-top {
    ${(props) => props.theme.fontRegular};
    font-size: 14px;
    color: ${(props) => props.theme.t_b7b};
    letter-spacing: 0;
    line-height: 18px;
  }
`;

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useDebounceFn } from 'ahooks';
import styled from 'styled-components';

import SwapPairSearchResult from 'src/components/ChoosePair/swapSearchResult';
import PairSearchInput from 'src/components/ChooseSwapPairPop/SearchInput';
import SearchChainTips from 'src/components/ChooseSwapPairPop/serachChainTips';
import IconDel from 'src/components/Icons/del';
import useCustomNavigate from 'src/hooks/useCustomNavigate';
import useWindowSize from 'src/hooks/useWindowSize';
import { useIntl } from 'src/locals';
import { useUserFlag } from 'src/state/user/hooks';
import { useGetStoreVal, useSetStore } from 'src/state/user/store';
import { ThemeType } from 'src/theme';

export default function Search() {
  const _store = useGetStoreVal('m_search');
  const store = useMemo(() => _store || [], [_store]);
  const setStore = useSetStore();
  const [search, setSearch] = useState('');
  const { height } = useWindowSize();
  const searchRef = useRef<HTMLInputElement>();
  const intl = useIntl();
  const navigate = useCustomNavigate();
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const chain = useUserFlag('choose_swap_pair_chain');

  const popupHeight = Math.ceil(height - 64) - (chain !== 'all' ? 40 : 0);

  useEffect(() => {
    searchRef?.current?.focus();
  }, []);

  const doSearch = useCallback(
    (value: string) => {
      setDebouncedSearch(value);
      if (value.trim() && !store.includes(value.trim())) {
        setStore('m_search', [value.trim(), ...store].slice(0, 10));
      }
    },
    [store, setStore]
  );

  const { run: handleSearchChange } = useDebounceFn(
    (value: string) => {
      doSearch(value);
    },
    { wait: 500 }
  );

  const onInputChange = (e: any) => {
    const value = e.target.value;
    setSearch(value);
    handleSearchChange(value);
  };

  const clearHistory = () => {
    setStore('m_search', []);
  };

  const handleHistoryItemClick = (item: string) => {
    setSearch(item);
    doSearch(item);
  };

  return (
    <StyledSearch>
      <div className="top">
        <PairSearchInput
          popupHeight={popupHeight}
          value={search}
          onChange={onInputChange}
          hideCancel
          isInSearchPage
        />
        <div
          className="back"
          onClick={() => {
            navigate(-1);
          }}
        >
          {intl.Cancel}
        </div>
      </div>

      <SearchChainTips />

      {debouncedSearch ? (
        <SwapPairSearchResult search={debouncedSearch} height={popupHeight} />
      ) : (
        store.length > -1 && (
          <div className="search-history">
            <div className="history-header">
              <span>{intl.search_history}</span>
              <span className="clear-history" onClick={clearHistory}>
                <IconDel />
              </span>
            </div>
            <div className="history-tags">
              {store.map((item: string) => (
                <div
                  key={item}
                  className="history-tag"
                  onClick={() => handleHistoryItemClick(item)}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        )
      )}
    </StyledSearch>
  );
}

const StyledSearch = styled.div`
  height: 100%;
  ${(props) => props.theme.fontRegular};

  .top {
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 20px 0;
    top: 0;
    gap: 10px;
    .pair-search-input {
      flex: 1;
      padding: 0;
    }
    .mantine-Input-wrapper.search {
      margin-left: 12px;
      margin-top: 3px;
      flex: 1;
      .mantine-Input-input {
        border-radius: 18px;
        flex: 1;
        height: 32px;
        padding-left: 40px;
        font-size: 14px;
        ${(props) => props.theme.fontRegular};
        .mantine-Input-icon {
          width: 40px;
          .search-icon {
            width: 16px;
          }
        }
      }
    }
    .back {
      cursor: pointer;
      font-size: 14px;
      ${(props) => props.theme.fontRegular};
      color: ${({ theme }) => theme.t_fff};
    }
  }

  .search-history {
    padding: 20px;

    .history-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;

      .clear-history {
        cursor: pointer;
        color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b};
      }
    }

    .history-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;

      .history-tag {
        padding: 0 10px;
        background: ${({ theme }) => theme.t_b7b_10};
        font-size: 14px;
        line-height: 24px;
        cursor: pointer;
        color: ${({ theme }) => theme.t_b7b};
        border-radius: 2px;
      }
    }
  }
`;

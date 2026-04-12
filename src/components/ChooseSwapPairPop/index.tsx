import React, { useState } from 'react';
import styled from 'styled-components';

import { useUserFlag } from 'src/state/user/hooks';

import { useIntl } from 'js/locals';

import SearchPairs from '../ChoosePair/swapSearchResult';
import List from './list';
import SearchInput from './SearchInput';
import SearchChainTips from './serachChainTips';

export default function ChooseSwapPairPop({
  popupHeight = 500,
}: {
  popupHeight: number;
}) {
  const intl = useIntl();
  const [search, setSearch] = useState('');
  const chain = useUserFlag('choose_swap_pair_chain');
  const [isFocusSearchInput, setIsFocusSearchInput] = useState(false);

  return (
    <StyledChoosePairPop className="choose-pair" popupHeight={popupHeight}>
      <div className="search">
        <SearchInput
          popupHeight={popupHeight}
          placeholder={intl['trade.pair_search']}
          value={search}
          onChange={(e: any) => {
            setSearch(e.target.value);
          }}
          isFocusSearchInput={isFocusSearchInput}
          setIsFocusSearchInput={setIsFocusSearchInput}
        />
        {isFocusSearchInput && <SearchChainTips />}
      </div>
      {search || isFocusSearchInput ? (
        <SearchPairs
          search={search}
          height={popupHeight - 62 - (chain !== 'all' ? 40 : 0)}
        />
      ) : (
        <List height={popupHeight - 62 - (chain !== 'all' ? 40 : 0)} />
      )}
    </StyledChoosePairPop>
  );
}

const StyledChoosePairPop = styled.div<{ popupHeight: number }>`
  background: ${(props) => props.theme.modalBg};
  box-shadow: ${(props) => props.theme.boxShadow};
  border-radius: 5px;
  width: 480px;
  height: ${(props) => props.popupHeight}px;
  padding: 20px 0 10px;

  .search-chain {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    line-height: 20px;
    margin-bottom: 15px;
    font-size: 14px;
    margin-top: 15px;
    color: ${(props) => props.theme.t_b7b};
    gap: 4px;
    .clear {
      cursor: pointer;
      color: ${(props) => props.theme.blue};
    }
  }

  .custom-tpl {
    margin-top: 80px;
    ${(props) => props.theme.fontRegular};
    display: flex;
    flex-direction: column;
    align-items: center;
    ${(props) => props.theme.fontRegular};
    font-size: 14px;
    color: ${(props) => props.theme.t_b7b};
    letter-spacing: 0;
    text-align: center;
    .custom-title {
      margin-bottom: 18px;
    }
    .dg-btn {
      border-radius: 5px;
    }
  }
  .pairs-more {
    border-radius: 5px;
    margin: 40px auto 10px;
    display: block;
  }
`;

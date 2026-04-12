import React, { useMemo, useState } from 'react';
import styled from 'styled-components';

import { Token } from 'src/constants/interface';
import { FUNGIBLE_USDC_ID, Type_DAChains } from 'src/da';
import { useSwapSendV2Tokens } from 'src/hooks/useSendTokens';
import { useIntl } from 'src/locals';
import { ThemeType } from 'src/theme';

import SearchInput from '../Input/searchInput';
import { useSendV2Data } from './sendDataProvider';
import TokenItem from './tokenItem';

export default function SendV2ChooseToken() {
  const balances = useSwapSendV2Tokens();
  const { setToken, setPage, setChain } = useSendV2Data();
  const [search, setSearch] = useState('');
  const intl = useIntl();
  const showTokens = useMemo(() => {
    if (!search) return balances;
    const searchLower = search.toLowerCase();
    return balances.filter((item: any) => {
      return (
        item.symbol?.toLowerCase().includes(searchLower) ||
        item.name?.toLowerCase().includes(searchLower) ||
        item.code?.toLowerCase().includes(searchLower)
      );
    });
  }, [balances, search]);
  return (
    <StyledChooseToken>
      <div className="search">
        <SearchInput
          value={search}
          allowClear
          placeholder={intl['trade.pair_search']}
          onChange={(e: any) => {
            setSearch(e.target.value);
          }}
        />
      </div>
      <div className="token-list">
        {showTokens.map((item: Token) => {
          return (
            <TokenItem
              key={item.id}
              token={item}
              onClick={() => {
                if (item.id === FUNGIBLE_USDC_ID) {
                  setPage('fungibleUsdc');
                  return;
                }
                setToken(item);
                setChain(item.chain as Type_DAChains);
                setPage('address');
              }}
            />
          );
        })}
        {showTokens.length === 0 && (
          <div className="no-result-found">{intl.no_result_found}</div>
        )}
      </div>
    </StyledChooseToken>
  );
}

const StyledChooseToken = styled.div`
  padding: 10px 0 0;
  .search {
    margin-bottom: 10px;
    padding: 0 20px;
    .mantine-Input-wrapper {
      height: 36px;
    }
  }
  .token-list {
    padding: 0 20px;
    overflow-y: auto;
    max-height: ${({ theme }: { theme: ThemeType }) =>
      theme.windowHeight - 140}px;
    display: flex;
    flex-direction: column;
  }

  .no-result-found {
    font-family: OpenSans-Regular;
    font-size: 14px;
    color: ${(props) => props.theme.t_b7b_60};
    text-align: center;
    line-height: 20px;
    font-weight: 400;
    margin-top: 150px;
  }
`;

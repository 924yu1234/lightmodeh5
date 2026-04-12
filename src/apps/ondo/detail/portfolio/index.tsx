import React, { useMemo, useRef, useState } from 'react';
import styled from 'styled-components';

import { Input } from 'src/UI';

import IconDelete from 'src/components/Icons/delete';
import IconSearch from 'src/components/Icons/serch';
import PriceChange from 'src/components/Pair/priceChange';
import PriceDigitChange from 'src/components/Pair/priceDigitChange';
import TokenIcon from 'src/components/Token/icon';
import useCustomNavigate from 'src/hooks/useCustomNavigate';
import { useIntl } from 'src/locals';
import InfiniteList from 'src/mobiles/components/InfiniteList';
import { ThemeType } from 'src/theme';

import { useOndoStocks } from '../../useOndoStocks';

export default function Portfolio({ maxHeight }: { maxHeight: number }) {
  const navigate = useCustomNavigate();
  const { list } = useOndoStocks();
  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const filteredList = useMemo(() => {
    if (!search) return list;
    const lowerSearch = search.toLowerCase();
    return list.filter((item) => {
      return (
        item.symbol.toLowerCase().includes(lowerSearch) ||
        item.assetName.toLowerCase().includes(lowerSearch)
      );
    });
  }, [list, search]);
  const intl = useIntl();
  const searchRef = useRef<HTMLInputElement>(null);

  const pageSize = maxHeight ? Math.ceil(Number(maxHeight) / 30) : 40;
  const [current, setCurrent] = useState(1);
  const total = filteredList.length;
  const hasNext = total > current * pageSize;
  const showData = filteredList.slice(0, current * pageSize);

  return (
    <Wrapper className="portfolio">
      <div className="title">
        {intl.stocks.Hot_Stocks}
        <Input
          className="search"
          style={{ display: showSearch ? 'block' : 'none' }}
          ref={searchRef}
          leftSection={<IconSearch />}
          rightSection={
            <IconDelete
              onClick={() => {
                setShowSearch(false);
                setSearch('');
              }}
            />
          }
          value={search}
          onChange={(e: any) => {
            setSearch(e.target.value);
          }}
          placeholder={intl.btn_search}
        />
        {!showSearch && (
          <IconSearch
            onClick={() => {
              setShowSearch(true);
              setTimeout(() => {
                searchRef.current?.focus();
              }, 100);
            }}
          />
        )}
      </div>
      <div className="list">
        <div className="list-title">
          <div className="list-title-item token">{intl.token}</div>
          <div className="list-title-item last">{intl.stocks.Last}</div>
          <div className="list-title-item chg">{intl.stocks.Chg}</div>
          <div className="list-title-item chg-percent">
            {intl.stocks.Chg_Percent}
          </div>
        </div>
        <div
          className="list-content"
          style={{ maxHeight }}
          id="ondoDetailPortfolioList"
        >
          <InfiniteList
            dataLength={showData.length}
            next={() => {
              setCurrent((prev) => prev + 1);
            }}
            pullDownToRefresh={false}
            hideNoMore
            refreshFunction={() => {}}
            hasMore={hasNext}
            scrollableTarget="ondoDetailPortfolioList"
          >
            {showData.map((item) => (
              <div
                key={item.id}
                className="list-tr"
                onClick={() => {
                  navigate(`/stocks/ondo/${item.baseToken?.symbol}`);
                }}
              >
                <div className="list-item token">
                  <TokenIcon size={16} token={item.baseToken} hideChainIcon />
                  {item.baseToken?.symbol}
                </div>
                <div className="list-item last">{item.price_display}</div>
                <div className="list-item chg">
                  <PriceDigitChange price_change={item.price_change} />
                </div>
                <div className="list-item chg-percent">
                  <PriceChange price_change_percent={item.change} max99 />
                </div>
              </div>
            ))}
          </InfiniteList>
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: ${({ theme }: { theme: ThemeType }) =>
    theme.isMobile ? '0 0 20px' : '24px 0 0'};
  font-size: 12px;
  width: 280px;
  ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
  .title {
    ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
    font-size: 14px;
    margin-bottom: 20px;
    padding-right: 10px;
    display: flex;
    align-items: center;
    gap: 15px;
    white-space: nowrap;
    min-height: 32px;
    .search {
      width: 160px;
      border-radius: 17px;
      flex: 1;
      height: 32px;
      .mantine-Input-input {
        height: 32px;
        border-radius: 17px;
      }
    }
    .icon-search {
      cursor: pointer;
    }
  }
  .list {
    width: 280px;
    .list-content {
      max-height: ${({ theme }: { theme: ThemeType }) =>
        theme.windowHeight - 200}px;
      overflow-y: auto;
    }
    overflow: auto;
    .token {
      width: 100px;
    }
    .last {
      flex: 1;
    }
    .chg {
      flex: 1;
    }
    .chg-percent {
      flex: 1;
    }
    .list-title {
      padding: 0 10px;
      display: flex;
      align-items: center;
      gap: 10px;
      ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
      color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b};
      margin-bottom: 10px;
    }
    .list-tr {
      padding: 0 10px;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 10px;
      height: 35px;
      line-height: 20px;
      &:hover {
        background: ${({ theme }) => theme.bg_white_10};
      }
      .list-item {
        display: flex;
        align-items: center;
        gap: 8px;
      }
    }
  }
`;

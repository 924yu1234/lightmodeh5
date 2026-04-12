import React, { useMemo, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import styled from 'styled-components';

import { Input } from 'src/UI';

import { useOndoStocks } from 'src/apps/ondo/useOndoStocks';
import IconDelete from 'src/components/Icons/delete';
import IconSearch from 'src/components/Icons/serch';
import PriceChange from 'src/components/Pair/priceChange';
import PriceDigitChange from 'src/components/Pair/priceDigitChange';
import TokenIcon from 'src/components/Token/icon';
import useCustomNavigate from 'src/hooks/useCustomNavigate';
import { useIntl } from 'src/locals';
import { ThemeType } from 'src/theme';

export default function OndoPortfolio() {
  const navigate = useCustomNavigate();
  const { list } = useOndoStocks();
  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const filteredList = useMemo(() => {
    if (!search) return list;
    const lowerSearch = search.toLowerCase();
    return list.filter((item) => {
      const symbol = item?.baseToken?.symbol || '';
      const name = item?.baseToken?.name || '';
      return (
        symbol.toLowerCase().includes(lowerSearch) ||
        name.toLowerCase().includes(lowerSearch)
      );
    });
  }, [list, search]);
  const intl = useIntl();
  const searchRef = useRef<HTMLInputElement>(null);

  const pageSize = 15;
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
              // 必须在用户手势的同步栈内 focus，否则移动端不会弹出软键盘（setTimeout 会打断）
              flushSync(() => {
                setShowSearch(true);
              });
              searchRef.current?.focus();
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
        <div className="list-content">
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
        </div>
        {hasNext && (
          <div
            className="show-more"
            onClick={() => {
              setCurrent((prev) => prev + 1);
            }}
          >
            {intl.Show_more}
          </div>
        )}
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: ${({ theme }: { theme: ThemeType }) =>
    theme.isMobile ? '0 0 10px' : '24px 0 48px'};
  font-size: 12px;
  ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
  .title {
    ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
    font-size: 14px;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    gap: 15px;
    min-height: 32px;
    white-space: nowrap;
    .search {
      width: 160px;
      flex: 1;
      border-radius: 17px;
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
      .list-item {
        display: flex;
        align-items: center;
        gap: 8px;
      }
    }
  }

  .trade-no-fee {
    margin-top: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    cursor: pointer;
    padding: 0 20px;
    gap: 5px;
    border-radius: 10px;
    ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
    font-size: 14px;
    background-color: ${({ theme }: { theme: ThemeType }) => theme.bg_blue_10};
  }

  .show-more {
    border: 1px solid ${({ theme }) => theme.border_b7b_20};
    border-radius: 8px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    margin-top: 10px;
  }
`;

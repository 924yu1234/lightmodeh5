import React, { useState } from 'react';
import styled from 'styled-components';

import PriceChange from 'src/components/Pair/priceChange';
import PriceDigitChange from 'src/components/Pair/priceDigitChange';
import TokenIcon from 'src/components/Token/icon';
import useCustomNavigate from 'src/hooks/useCustomNavigate';
import { useIntl } from 'src/locals';
import InfiniteList from 'src/mobiles/components/InfiniteList';
import { ThemeType } from 'src/theme';

import { useXStockDetail } from '../dataProvider';

export default function Portfolio({ maxHeight }: { maxHeight: number }) {
  const navigate = useCustomNavigate();
  const { list } = useXStockDetail();
  const intl = useIntl();
  const pageSize = maxHeight ? Math.ceil(Number(maxHeight) / 30) : 40;
  const [current, setCurrent] = useState(1);
  const total = list.length;
  const hasNext = total > current * pageSize;
  const showData = list.slice(0, current * pageSize);

  return (
    <Wrapper className="portfolio">
      <div className="title">{intl.stocks.Hot_Stocks}</div>
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
          id="xStocksDetailPortfolioList"
        >
          <InfiniteList
            dataLength={showData.length}
            next={() => {
              setCurrent((prev) => prev + 1);
            }}
            pullDownToRefresh={false}
            refreshFunction={() => {}}
            hasMore={hasNext}
            hideNoMore
            scrollableTarget="xStocksDetailPortfolioList"
          >
            {showData.map((item) => (
              <div
                key={item.id}
                className="list-tr"
                onClick={() => {
                  navigate(`/stocks/${item.baseToken?.code}`);
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
    theme.isMobile ? '0 0 20px' : '24px 0 48px'};
  font-size: 12px;
  ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
  .title {
    ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
    font-size: 14px;
    margin-bottom: 20px;
  }
  .list-content {
    max-height: ${({ theme }: { theme: ThemeType }) =>
      theme.windowHeight - 200}px;
    overflow-y: auto;
  }
  .list {
    width: 280px;
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
      padding: 0 10px 0 0;
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

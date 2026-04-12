import React, { useState } from 'react';
import styled from 'styled-components';

import IconZeroFee from 'src/components/Icons/zeroFee';
import PriceChange from 'src/components/Pair/priceChange';
import PriceDigitChange from 'src/components/Pair/priceDigitChange';
import TokenIcon from 'src/components/Token/icon';
import { useToSwap } from 'src/hooks/navigate';
import useCustomNavigate from 'src/hooks/useCustomNavigate';
import { useIntl } from 'src/locals';
import InfiniteList from 'src/mobiles/components/InfiniteList';
import { useGaEvent } from 'src/providers/useWallet';
import { useSwapPairsForTypes } from 'src/state/swap/pairs/hooks';
import { ThemeType } from 'src/theme';

export default function XStocksPortfolio({
  maxHeight,
}: {
  maxHeight: number | 'auto' | 'none';
}) {
  const navigate = useCustomNavigate();
  const { list } = useSwapPairsForTypes({
    type: 'stocks',
    chain: 'all',
    current: 1,
    pageSize: 100,
    orderBy: 'index',
    orderDir: 'asc',
  });

  const intl = useIntl();
  const toSwap = useToSwap();
  const gaEvent = useGaEvent();
  const handleTradeNoFee = () => {
    gaEvent?.('web_button_click', {
      buttonName: 'stocks_trade_with_zero_fees',
    });
    const tsla =
      list.find(
        (d) =>
          d.baseToken?.code === 'XsDoVfqeBukxuZHWhdvWHBhgEHjGNst4MLodqsJHzoB'
      ) || list[0];
    toSwap({ token: tsla?.baseToken });
  };

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
          id="xStocksPortfolioList"
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
            scrollableTarget="xStocksPortfolioList"
          >
            {showData.map((item) => (
              <div
                key={item.id}
                className="list-tr"
                onClick={() => {
                  navigate(`/stocks/xstocks/${item.baseToken?.code}`);
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
      <div className="trade-no-fee" onClick={handleTradeNoFee}>
        <IconZeroFee size={18} />
        {intl.stocks.Trade_with_ZERO_FEES}
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
    margin-bottom: ${({ theme }: { theme: ThemeType }) =>
      theme.isMobile ? 10 : 20}px;
    min-height: 32px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .list {
    .list-content {
      overflow-y: auto;
    }
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
`;

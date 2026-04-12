/* eslint-disable react/no-array-index-key */
import React from 'react';
import styled from 'styled-components';

import { Skeleton } from 'src/UI';

import IconRightOutlined from 'src/components/Icons/RightOutlined';
import PriceChange from 'src/components/Pair/priceChange';
import TokenIcon from 'src/components/Token/icon';
import useCustomNavigate from 'src/hooks/useCustomNavigate';
import { useIntl } from 'src/locals';
import { useSwapPairsForTypes } from 'src/state/swap/pairs/hooks';
import { ThemeType } from 'src/theme';

import { StyledViewItem } from './style';

export default function Stocks({
  config,
  cardSize,
}: {
  config: any;
  cardSize: number;
}) {
  const navigate = useCustomNavigate();
  const intl = useIntl();
  const { orderBy = '', orderDir = '' } = config;
  const { list, loading } = useSwapPairsForTypes({
    type: 'stocks',
    chain: 'all',
    current: 1,
    pageSize: 1000,
    orderBy: orderDir ? orderBy : 'market_cap',
    orderDir: orderDir || 'desc',
  });

  return (
    <StyledStocks className="view-container" cardSize={cardSize}>
      <div className="item-title">
        {intl.Stocks}
        <div
          className="title-more"
          onClick={() => {
            navigate('/stocks/xstocks');
          }}
        >
          {intl.more}
          <IconRightOutlined />
        </div>
      </div>
      <div className="carousel-container">
        {loading &&
          new Array(2).fill(0).map((_, index) => (
            <StyledViewItem
              key={index}
              cardSize={cardSize}
              className="carousel-item stocks-item"
            >
              <div className="token-info">
                <Skeleton height={28} width={28} circle />
                <div className="token-symbol">
                  <Skeleton height={16} width={60} />
                </div>
              </div>
              <div className="apy-value">
                <Skeleton height={16} width={80} />
              </div>
            </StyledViewItem>
          ))}
        {list.slice(0, 2).map((stock: any) => {
          const { baseToken, price_display, percent } = stock;
          return (
            <StyledViewItem
              cardSize={cardSize}
              key={stock.pool_address}
              className="carousel-item stocks-item"
              onClick={() => {
                navigate(`/stocks/xstocks/${baseToken?.code}`);
              }}
            >
              <div className="token-info">
                <TokenIcon token={baseToken} size={28} hideChainIcon />
                <div className="token-symbol">
                  <div className="token-symbol-text ellipsis">
                    {baseToken?.symbol}
                  </div>
                </div>
              </div>
              <div className="apy-value">
                ${price_display}
                <PriceChange price_change_percent={percent} max99 />{' '}
              </div>
            </StyledViewItem>
          );
        })}
      </div>
    </StyledStocks>
  );
}

const StyledStocks = styled.div`
  width: ${({ cardSize }: { cardSize: number }) => cardSize * 2 + 10}px;
  .carousel-container {
    display: flex;
    gap: 10px;
    min-height: 100px;
  }
  .carousel-item .apy-value {
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
    .pair-price-change {
      font-size: 12px;
      line-height: 20px;
      ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
      color: ${({ theme }: { theme: ThemeType }) => theme.green};
    }
  }
`;

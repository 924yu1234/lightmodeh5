import React from 'react';
import { Carousel } from '@mantine/carousel';
import styled from 'styled-components';

import { Skeleton } from 'src/UI';

import IconRightOutlined from 'src/components/Icons/RightOutlined';
import PriceChange from 'src/components/Pair/priceChange';
import TokenIcon from 'src/components/Token/icon';
import useCustomNavigate from 'src/hooks/useCustomNavigate';
import { useIntl } from 'src/locals';
import { useSwapPairsForTypes } from 'src/state/swap/pairs/hooks';
import { ThemeType } from 'src/theme';

import { StyledViewItem } from '../style';

import '@mantine/carousel/styles.css';

export default function Stocks({ config }: { config: any }) {
  const navigate = useCustomNavigate();
  const intl = useIntl();
  const { orderBy = '', orderDir = '', size = 3 } = config;
  const { list, loading } = useSwapPairsForTypes({
    type: 'stocks',
    chain: 'all',
    current: 1,
    pageSize: 1000,
    orderBy: orderDir ? orderBy : 'market_cap',
    orderDir: orderDir || 'desc',
  });

  return (
    <StyledStocks className="view-container" cardSize={210}>
      <div
        className="item-title"
        onClick={() => {
          navigate('/stocks/xstocks');
        }}
      >
        {intl.Stocks}
        <IconRightOutlined />
      </div>
      <div className="carousel-container">
        <Carousel
          withControls={false}
          withIndicators={false}
          slideGap="10px"
          slideSize="210px"
          height={90}
          align="start"
        >
          {loading &&
            new Array(size).fill(0).map((_, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <Carousel.Slide key={index}>
                <StyledViewItem
                  cardSize={210}
                  className="carousel-item stocks-item"
                >
                  <div className="token-info">
                    <Skeleton height={24} width={24} circle />
                    <div className="token-symbol">
                      <Skeleton height={16} width={60} />
                    </div>
                  </div>
                  <div className="apy-value" style={{ marginTop: 10 }}>
                    <Skeleton height={16} width={80} />
                  </div>
                </StyledViewItem>
              </Carousel.Slide>
            ))}
          {list.slice(0, size).map((stock: any) => {
            const { baseToken, price_display, percent } = stock;
            return (
              <Carousel.Slide
                key={stock.pool_address}
                onClick={() => {
                  navigate(`/stocks/xstocks/${baseToken?.code}`);
                }}
              >
                <StyledViewItem
                  cardSize={210}
                  className="carousel-item stocks-item"
                >
                  <div className="token-info">
                    <TokenIcon token={baseToken} size={24} hideChainIcon />
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
              </Carousel.Slide>
            );
          })}
          {list?.length > 0 && (
            <Carousel.Slide
              onClick={() => {
                navigate('/stocks/xstocks');
              }}
            >
              <div className="more-card">{intl.more}</div>
            </Carousel.Slide>
          )}
        </Carousel>
      </div>
    </StyledStocks>
  );
}

const StyledStocks = styled.div<{ cardSize: number }>`
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

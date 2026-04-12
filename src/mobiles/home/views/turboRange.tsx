import React, { useMemo } from 'react';
import { Carousel } from '@mantine/carousel';
import { orderBy as orderByFn } from 'lodash';
import styled from 'styled-components';

import { Skeleton } from 'src/UI';

import IconRightOutlined from 'src/components/Icons/RightOutlined';
import TokenIcon from 'src/components/Token/icon';
import ProductName from 'src/components/TurboRange/productName';
import useCustomNavigate from 'src/hooks/useCustomNavigate';
import { useIntl } from 'src/locals';
import { useTurboRangeProducts } from 'src/state/turboRange/hooks';

import { StyledViewItem } from '../style';

import '@mantine/carousel/styles.css';

export default function TurboRange({ config }: { config: any }) {
  const navigate = useCustomNavigate();
  const intl = useIntl();
  const { products, loadingProducts } = useTurboRangeProducts({ search: '' });
  const { size = 2 } = config;
  const topProductAddress = config.topProduct;
  const topProduct = (products || []).find(
    (product: any) => product.poolAddress === topProductAddress
  );
  const showProducts = useMemo(() => {
    const ordered = orderByFn(products, 'weekAPY', 'desc');
    return topProduct
      ? [
          topProduct,
          ...(ordered || []).filter(
            (product: any) => product.poolAddress !== topProductAddress
          ),
        ]
      : ordered;
  }, [products, topProduct, topProductAddress]);
  return (
    <StyledTurboRange className="view-container" cardSize={210}>
      <div
        className="item-title"
        onClick={() => {
          navigate('/turbo-range');
        }}
      >
        {intl.turboRange.Turbo_Range}
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
          {loadingProducts &&
            new Array(size).fill(0).map((_, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <Carousel.Slide key={index}>
                <StyledViewItem
                  cardSize={210}
                  className="carousel-item turbo-range-item"
                >
                  <div className="token-info">
                    <Skeleton height={24} width={24} circle />
                    <div className="token-symbol">
                      <Skeleton height={16} width={60} />
                    </div>
                  </div>
                  <div className="apy-value">
                    <Skeleton height={16} width={80} />
                  </div>
                </StyledViewItem>
              </Carousel.Slide>
            ))}
          {showProducts.slice(0, size).map((product) => {
            const { baseToken, weekAPY_display } = product;
            return (
              <Carousel.Slide
                key={product.poolAddress}
                onClick={() => {
                  navigate('/turbo-range');
                }}
              >
                <StyledViewItem
                  cardSize={210}
                  className="carousel-item turbo-range-item"
                >
                  <div className="token-info">
                    <TokenIcon token={baseToken} size={24} hideChainIcon />
                    <div className="token-symbol">
                      <div className="token-symbol-text ellipsis">
                        <ProductName poolAddress={product.poolAddress} />
                      </div>
                    </div>
                  </div>
                  <div className="apy-value">
                    {weekAPY_display}
                    <div className="apy-value-tips">
                      {intl.turboRange.apy_7D}
                    </div>
                  </div>
                </StyledViewItem>
              </Carousel.Slide>
            );
          })}
          {showProducts?.length > 0 && (
            <Carousel.Slide
              onClick={() => {
                navigate('/turbo-range');
              }}
            >
              <div className="more-card">{intl.more}</div>
            </Carousel.Slide>
          )}
        </Carousel>
      </div>
    </StyledTurboRange>
  );
}

const StyledTurboRange = styled.div<{ cardSize: number }>``;

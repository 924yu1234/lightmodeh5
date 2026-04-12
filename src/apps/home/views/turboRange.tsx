/* eslint-disable react/no-array-index-key */
import React, { useMemo } from 'react';
import { orderBy as orderByFn } from 'lodash';
import styled from 'styled-components';

import { Skeleton } from 'src/UI';

import IconRightOutlined from 'src/components/Icons/RightOutlined';
import TokenIcon from 'src/components/Token/icon';
import ProductName from 'src/components/TurboRange/productName';
import useCustomNavigate from 'src/hooks/useCustomNavigate';
import { useIntl } from 'src/locals';
import { useTurboRangeProducts } from 'src/state/turboRange/hooks';

import { StyledViewItem } from './style';

export default function TurboRange({
  config,
  cardSize,
}: {
  config: any;
  cardSize: number;
}) {
  const navigate = useCustomNavigate();
  const intl = useIntl();
  const { products, loadingProducts } = useTurboRangeProducts({ search: '' });
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
    <StyledTurboRange className="view-container" cardSize={cardSize}>
      <div className="item-title">
        {intl.turboRange.Turbo_Range}
        <div
          className="title-more"
          onClick={() => {
            navigate('/turbo-range');
          }}
        >
          {intl.more}
          <IconRightOutlined />
        </div>
      </div>
      <div className="carousel-container">
        {loadingProducts &&
          new Array(2).fill(0).map((_, index) => (
            <StyledViewItem
              cardSize={cardSize}
              key={index}
              className="carousel-item turbo-range-item"
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
        {showProducts.slice(0, 2).map((product) => {
          const { baseToken, weekAPY_display } = product;
          return (
            <StyledViewItem
              cardSize={cardSize}
              key={product.poolAddress}
              onClick={() => {
                navigate(`/turbo-range/invest/${product?.poolAddress}`);
              }}
              className="carousel-item turbo-range-item"
            >
              <div className="token-info">
                <TokenIcon token={baseToken} size={28} hideChainIcon />
                <div className="token-symbol">
                  <div className="token-symbol-text ellipsis">
                    <ProductName poolAddress={product.poolAddress} />
                  </div>
                </div>
              </div>
              <div className="apy-value">
                {weekAPY_display}
                <div className="apy-value-tips">{intl.turboRange.apy_7D}</div>
              </div>
            </StyledViewItem>
          );
        })}
      </div>
    </StyledTurboRange>
  );
}

const StyledTurboRange = styled.div`
  width: ${({ cardSize }: { cardSize: number }) => cardSize * 2 + 10}px;
  .carousel-container {
    display: flex;
    gap: 10px;
    min-height: 100px;
  }
`;

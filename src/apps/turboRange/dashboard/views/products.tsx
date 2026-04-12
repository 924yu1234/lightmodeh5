import React, { useMemo, useState } from 'react';
import styled from 'styled-components';

import PaginationWithTotal from 'src/components/Pagination/withTotal';
import TokenIcon from 'src/components/Token/icon';
import ProductName from 'src/components/TurboRange/productName';
import SkeletonProduct from 'src/components/TurboRange/Skeletons/Product';
import {
  useShowLoadingSkeleton,
  useTurboRangeProducts,
} from 'src/state/turboRange/hooks';
import { useCreatePosition } from 'src/state/turboRange/useCreatePosition';
import { ThemeType, useThemeParams } from 'src/theme';

import { useIntl } from 'js/locals';

export default function Products() {
  const intl = useIntl();
  const { viewWidth } = useThemeParams();

  const _pageSize = useMemo(() => {
    if (viewWidth >= 2560) {
      return 16;
    }
    if (viewWidth >= 1920) {
      return 12;
    }
    return 9;
  }, [viewWidth]);

  const showSkeleton = useShowLoadingSkeleton();

  const { products } = useTurboRangeProducts({
    search: '',
  });

  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(_pageSize);

  const showData = useMemo(
    () => products.slice((current - 1) * pageSize, current * pageSize),
    [products, current, pageSize]
  );
  const createPosition = useCreatePosition();

  return (
    <StyledProducts className="products-tpl">
      <div className="list-content">
        {showSkeleton ? (
          <>
            {new Array(9).fill(0).map((item, index) => {
              // eslint-disable-next-line react/no-array-index-key
              return <SkeletonProduct key={`${index}skeleton`} />;
            })}
          </>
        ) : (
          <>
            {showData.map((item: any) => {
              const { baseToken } = item;
              return (
                <div
                  className="product-item"
                  key={item.id}
                  onClick={() => {
                    createPosition({
                      poolAddress: item.poolAddress,
                      source: 'product',
                    });
                  }}
                >
                  <div className="item-info">
                    <TokenIcon token={baseToken} size={28} hideChainIcon />
                    <div className="item-symbol">
                      <ProductName poolAddress={item?.poolAddress} />
                    </div>
                  </div>
                  <div className="item-profit">
                    <div className="item-profit-value">
                      {item?.weekAPY_display}
                    </div>
                    <div className="item-profit-title">
                      {intl.turboRange.apy_7D}
                    </div>
                  </div>
                </div>
              );
            })}
          </>
        )}
      </div>
      {products.length > pageSize && (
        <PaginationWithTotal
          current={current}
          onChange={(cur: number) => setCurrent(cur)}
          total={products.length}
          pageSize={pageSize}
          setPageSize={setPageSize}
          hidePageSizeSelect
          hideGoTo
        />
      )}
    </StyledProducts>
  );
}

const StyledProducts = styled.div`
  .list-content {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    margin-bottom: 20px;
    min-height: 200px;
    align-content: start;
  }
  .product-item {
    background-image: linear-gradient(
      0deg,
      rgba(255, 255, 255, 0.01) -102.86%,
      rgba(255, 255, 255, 0.1) 165%
    );
    border-radius: 10px;
    height: 140px;
    padding: 20px 24px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    cursor: pointer;
    transition: all 0.2s ease;
    position: relative;
    &:hover {
      transform: translateY(-4px);
    }
    .item-info {
      display: flex;
      align-items: center;
      gap: 8px;
      ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
      color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
      font-size: 16px;
      line-height: 22px;
    }
    .item-profit {
      display: flex;
      flex-direction: column;
      gap: 8px;
      padding-left: 36px;
      .item-profit-value {
        ${({ theme }: { theme: ThemeType }) => theme.fontBold};
        color: ${({ theme }: { theme: ThemeType }) => theme.green};
        font-size: 26px;
        line-height: 30px;
      }
      .item-profit-title {
        ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
        color: ${({ theme }: { theme: ThemeType }) => theme.t_fff_60};
        font-size: 12px;
        line-height: 18px;
      }
    }
    .invest-btn {
      width: 40px;
      height: 40px;
      position: absolute;
      right: 24px;
      bottom: 30px;
      border-radius: 50%;
      display: flex;
      border: 1px solid ${(props) => props.theme.border_blue_50};
      align-items: center;
      justify-content: center;
      .icon-right-outlined {
        color: ${({ theme }: { theme: ThemeType }) => theme.blue};
      }
    }
  }
`;

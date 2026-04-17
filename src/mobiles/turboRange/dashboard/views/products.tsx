import React from 'react';
import styled from 'styled-components';

import GALinkWrapper from 'src/components/GA/LinkWrapper';
import IconRightOutlined from 'src/components/Icons/RightOutlined';
import TokenIcon from 'src/components/Token/icon';
import ProductName from 'src/components/TurboRange/productName';
import SkeletonProduct from 'src/components/TurboRange/Skeletons/Product';
import useCustomNavigate from 'src/hooks/useCustomNavigate';
import { useIntl } from 'src/locals';
import {
  useShowLoadingSkeleton,
  useTurboRangeProducts,
} from 'src/state/turboRange/hooks';
import { useCreatePosition } from 'src/state/turboRange/useCreatePosition';
import { ThemeType } from 'src/theme';

export default function Products() {
  const intl = useIntl();

  const { products } = useTurboRangeProducts({
    search: '',
  });

  const navigate = useCustomNavigate();

  const showSkeleton = useShowLoadingSkeleton();
  const createPosition = useCreatePosition();

  return (
    <StyledProducts className="products-tpl">
      <div className="list-content">
        {showSkeleton ? (
          <>
            {new Array(4).fill(0).map((item, index) => {
              return (
                // eslint-disable-next-line react/no-array-index-key
                <SkeletonProduct key={`${index}skeleton`} />
              );
            })}
          </>
        ) : (
          <>
            {products.map((item: any) => {
              const { baseToken } = item;
              return (
                <div
                  className="item"
                  key={item.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    navigate(`/turbo-range/invest/${item.poolAddress}`);
                  }}
                >
                  <div className="item-info">
                    <TokenIcon token={baseToken} size={28} hideChainIcon />
                    <div className="item-symbol">
                      <ProductName poolAddress={item?.poolAddress} />
                    </div>
                  </div>
                  <div className="item-profit">
                    <div className="item-profit-title">
                      <div className="item-profit-value">
                        {item?.weekAPY_display}
                      </div>
                      {intl.turboRange.apy_7D}
                    </div>
                    <GALinkWrapper
                      eventName="turbo_range_list_invest_USDC"
                      className="invest-action"
                      onClick={(e: any) => {
                        e.stopPropagation();
                        e.preventDefault();
                        createPosition({
                          poolAddress: item.poolAddress,
                          source: 'product',
                        });
                      }}
                    >
                      <IconRightOutlined size={14} />
                    </GALinkWrapper>
                  </div>
                </div>
              );
            })}
          </>
        )}
      </div>
    </StyledProducts>
  );
}

/** App H5 / mobile — All Products row cards (`.impeccable.md` light: white surface, green for APY only). */
const StyledProducts = styled.div`
  .list-content {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    flex-wrap: wrap;
    gap: 16px;
    min-height: 115px;
    margin: 0 0 20px 0;

    .item {
      background: ${({ theme }: { theme: ThemeType }) =>
        theme.darkMode
          ? 'linear-gradient(180deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.03) 100%)'
          : theme.cardBg};
      border: 1px solid
        ${({ theme }: { theme: ThemeType }) =>
          theme.darkMode ? 'transparent' : theme.cardBorder};
      box-shadow: ${({ theme }: { theme: ThemeType }) =>
        theme.darkMode ? 'none' : theme.componentLibraryCardShadow};
      border-radius: 10px;
      padding: 16px 20px;
      min-height: 115px;
      transition: transform 0.2s ease, box-shadow 0.2s ease,
        background-color 0.2s ease, border-color 0.2s ease;

      &:active {
        transform: translateY(-2px);
      }

      @media (hover: hover) {
        &:hover {
          transform: translateY(-2px);
          background: ${({ theme }: { theme: ThemeType }) =>
            theme.darkMode
              ? 'linear-gradient(180deg, rgba(255, 255, 255, 0.14) 0%, rgba(255, 255, 255, 0.06) 100%)'
              : theme.infoBarBg};
          box-shadow: ${({ theme }: { theme: ThemeType }) =>
            theme.darkMode ? 'none' : theme.primaryBtnHoverShadow};
        }
      }

      @media (prefers-reduced-motion: reduce) {
        transition: none;
        &:active,
        &:hover {
          transform: none;
        }
      }

      .item-info {
        display: flex;
        align-items: center;
        gap: 5px;
        .item-symbol {
          ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
          font-size: 16px;
          line-height: 20px;
          color: ${({ theme }: { theme: ThemeType }) =>
            theme.darkMode ? theme.t_fff : theme.ink};
          margin-right: auto;
        }
        margin-bottom: 7px;
      }
      .item-profit {
        padding-left: 33px;
        display: flex;
        align-items: center;
        gap: 10px;
        ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
        color: ${({ theme }: { theme: ThemeType }) =>
          theme.darkMode ? theme.t_fff_60 : theme.mutedText};
        font-size: 14px;
        line-height: 20px;
        .item-profit-value {
          ${({ theme }: { theme: ThemeType }) => theme.fontBold};
          font-size: 20px;
          line-height: 28px;
          color: ${({ theme }: { theme: ThemeType }) => theme.green};
          margin-top: 2px;
        }
      }
    }
  }

  .invest-action {
    margin-left: auto;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 36px;
    height: 36px;
    border-radius: 10px;
    border: 1px solid ${({ theme }: { theme: ThemeType }) => theme.cardBorder};
    background: ${({ theme }: { theme: ThemeType }) =>
      theme.darkMode ? theme.bg_white_10 : theme.shellSurfaceSecondary};
    color: ${({ theme }: { theme: ThemeType }) => theme.blue};
    transition: background-color 0.15s ease, border-color 0.15s ease;

    .icon-right-outlined {
      color: ${({ theme }: { theme: ThemeType }) => theme.blue};
    }

    @media (hover: hover) {
      &:hover {
        background: ${({ theme }: { theme: ThemeType }) => theme.pressTint};
        border-color: ${({ theme }: { theme: ThemeType }) =>
          theme.inputHoverBorder};
      }
    }
  }
`;

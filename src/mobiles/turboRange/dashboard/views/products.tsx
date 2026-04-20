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

import {
  STAGGER_MAX_INDEX,
  STAGGER_STEP_MS,
  turboRangeListReveal,
} from './listStagger';

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
            {products.map((item: any, index: number) => {
              const { baseToken } = item;
              return (
                <div
                  className="product-item"
                  key={item.id}
                  style={{
                    animationDelay: `${
                      Math.min(index, STAGGER_MAX_INDEX) * STAGGER_STEP_MS
                    }ms`,
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    navigate(`/turbo-range/invest/${item.poolAddress}`);
                  }}
                >
                  <div className="item-left">
                    <TokenIcon token={baseToken} size={28} hideChainIcon />
                    <div className="item-symbol">
                      <ProductName poolAddress={item?.poolAddress} />
                    </div>
                  </div>
                  <div className="item-profit">
                    <div className="item-profit-value">
                      {item?.weekAPY_display}
                    </div>
                    <div className="item-profit-label">
                      {intl.turboRange.apy_7D}
                    </div>
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
              );
            })}
          </>
        )}
      </div>
    </StyledProducts>
  );
}

/** App H5 — All Products: list reveal + calm hover (see `.impeccable.md` / `listStagger.tsx`). */
const StyledProducts = styled.div`
  .list-content {
    display: flex;
    flex-direction: column;
    gap: 10px;
    min-height: 100px;
    margin: 0 0 16px 0;

    .product-item {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 10px;
      min-height: 68px;
      padding: 12px 14px;
      border-radius: 12px;
      background: ${({ theme }: { theme: ThemeType }) =>
        theme.darkMode
          ? 'linear-gradient(180deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.03) 100%)'
          : theme.cardBg};
      border: 1px solid
        ${({ theme }: { theme: ThemeType }) =>
          theme.darkMode ? 'transparent' : theme.cardBorder};
      box-shadow: ${({ theme }: { theme: ThemeType }) =>
        theme.darkMode ? 'none' : theme.componentLibraryCardShadow};
      cursor: pointer;
      outline: none;
      animation: ${turboRangeListReveal} 0.44s cubic-bezier(0.22, 1, 0.36, 1)
        both;
      transition: border-color 0.2s ease, box-shadow 0.22s ease,
        background-color 0.2s ease;

      @media (prefers-reduced-motion: reduce) {
        animation: none;
      }

      &:focus-visible {
        box-shadow: ${({ theme }: { theme: ThemeType }) =>
          theme.ctaGhostFocusRing};
      }

      &:active {
        background: ${({ theme }: { theme: ThemeType }) =>
          theme.darkMode
            ? 'linear-gradient(180deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.05) 100%)'
            : theme.shellSurfaceSecondary};
      }

      @media (hover: hover) {
        &:hover {
          border-color: ${({ theme }: { theme: ThemeType }) =>
            theme.darkMode ? 'transparent' : theme.innerBorder2};
          box-shadow: ${({ theme }: { theme: ThemeType }) =>
            theme.darkMode ? 'none' : theme.pillTabsActiveShadow};
          background: ${({ theme }: { theme: ThemeType }) =>
            theme.darkMode
              ? 'linear-gradient(180deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.05) 100%)'
              : theme.cardBg};
        }
      }

      @media (prefers-reduced-motion: reduce) {
        transition: none;
      }
    }

    .item-left {
      display: flex;
      align-items: center;
      gap: 8px;
      flex: 1;
      min-width: 0;
    }

    .item-symbol {
      ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
      font-size: 15px;
      line-height: 21px;
      color: ${({ theme }: { theme: ThemeType }) =>
        theme.darkMode ? theme.t_fff : theme.ink};
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .item-profit {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      justify-content: center;
      gap: 2px;
      flex-shrink: 0;
      padding-right: 2px;
    }

    .item-profit-value {
      ${({ theme }: { theme: ThemeType }) => theme.fontBold};
      font-size: 21px;
      line-height: 26px;
      letter-spacing: -0.02em;
      color: ${({ theme }: { theme: ThemeType }) => theme.green};
    }

    .item-profit-label {
      ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
      font-size: 11px;
      line-height: 15px;
      color: ${({ theme }: { theme: ThemeType }) =>
        theme.darkMode ? theme.t_fff_60 : theme.mutedText};
    }
  }

  .invest-action {
    flex-shrink: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 36px;
    min-height: 36px;
    margin-left: 0;
    padding: 0;
    border: none;
    border-radius: 10px;
    background: transparent;
    color: ${({ theme }: { theme: ThemeType }) =>
      theme.darkMode ? theme.t_fff_60 : theme.mutedText};
    transition: color 0.18s ease, background-color 0.18s ease;

    .icon-right-outlined {
      color: inherit;
    }

    &:active {
      color: ${({ theme }: { theme: ThemeType }) =>
        theme.darkMode ? theme.t_fff : theme.ink};
      background: ${({ theme }: { theme: ThemeType }) => theme.pressTint};
    }

    @media (hover: hover) {
      &:hover {
        color: ${({ theme }: { theme: ThemeType }) =>
          theme.darkMode ? theme.t_fff : theme.ink};
        background: ${({ theme }: { theme: ThemeType }) => theme.pressTint};
      }
    }
  }
`;

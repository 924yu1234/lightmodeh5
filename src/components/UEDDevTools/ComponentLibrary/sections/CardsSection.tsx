import React from 'react';
import styled from 'styled-components';

import IconBrowser from 'src/components/Icons/iconBrowser';
import { useIntl } from 'src/locals';
import { ThemeType } from 'src/theme';
import { formatAddress } from 'src/utils/format';

import ComponentCard from '../shared/ComponentCard';

/** Home carousel strip item (App home Turbo Range row, light-aligned). */
function DemoHomeTurboCard() {
  const intl = useIntl();
  return (
    <HomeTurboCard className="demo-home-turbo-card">
      <div className="token-info">
        <span className="token-dot" aria-hidden />
        <div className="token-symbol">
          <span className="symbol">ETH / USDC</span>
        </div>
      </div>
      <div className="apy-value">
        12.4%
        <div className="apy-value-tips">{intl.turboRange.apy_7D}</div>
      </div>
    </HomeTurboCard>
  );
}

/** Turbo Range → All Products grid card (hover lift). */
/** Browser → History contract row (mobile). */
function DemoBrowserHistoryRow() {
  const intl = useIntl();
  const addr = '0x1234567890abcdef1234567890abcdef12345678';
  return (
    <BrowserHistoryRow className="history-items show-time">
      <div className="history-day first-day">2026-04-16</div>
      <div className="history-item-inner" role="button" tabIndex={0}>
        <div className="token-icon">
          <IconBrowser size={28} />
          <span className="chain-badge" aria-hidden />
        </div>
        <div className="item-text">
          <span>{intl.Contract_Call}</span>
          <div className="item-text-sub">{formatAddress(addr)}</div>
        </div>
        <div className="amount" />
      </div>
    </BrowserHistoryRow>
  );
}

function DemoProductCard({ symbol }: { symbol: string }) {
  const intl = useIntl();
  return (
    <ProductCard className="demo-product-card">
      <div className="item-info">
        <span className="token-dot lg" aria-hidden />
        <div className="item-symbol">{symbol}</div>
      </div>
      <div className="item-profit">
        <div className="item-profit-value">18.2%</div>
        <div className="item-profit-title">{intl.turboRange.apy_7D}</div>
      </div>
    </ProductCard>
  );
}

export default function CardsSection() {
  const intl = useIntl();
  return (
    <StyledSection>
      <h2 className="section-title">Cards</h2>

      <ComponentCard
        title="Home & Turbo Range — product surfaces"
        description="Left: taxonomy card. Right: Home Turbo strip card + All Products grid card — tokens, motion, and shadows aligned with App UI Light Mode."
      >
        <ShowcaseLayout>
          <CategoryCard>
            <div className="cat-title">Card anatomy</div>
            <ul className="cat-list">
              <li>
                <span className="k">Surface</span>
                <span className="v">{intl.turboRange.Turbo_Range}</span>
              </li>
              <li>
                <span className="k">Motion</span>
                <span className="v">
                  Hover: infoBarBg tint, lift and shadow (strip −3px, products
                  −4px)
                </span>
              </li>
              <li>
                <span className="k">Type</span>
                <span className="v">Ink / accent / muted</span>
              </li>
              <li>
                <span className="k">Depth</span>
                <span className="v">componentLibraryCardShadow</span>
              </li>
            </ul>
          </CategoryCard>

          <PreviewColumn>
            <div className="block-label">Home — Turbo Range strip</div>
            <div className="home-strip">
              <DemoHomeTurboCard />
              <DemoHomeTurboCard />
            </div>

            <div className="block-label">Turbo Range — All Products</div>
            <div className="products-grid">
              <DemoProductCard symbol="WBTC / USDC" />
              <DemoProductCard symbol="ETH / USDC" />
            </div>
          </PreviewColumn>
        </ShowcaseLayout>
      </ComponentCard>

      <ComponentCard
        title="Browser — History row"
        description="Contract call row: stacked icon + chain badge, title + truncated address. Motion: row hover/active tint (pressTint / bg_white_10), aligned with App UI Light Mode mobile Browser history."
      >
        <BrowserShowcase>
          <CategoryCard>
            <div className="cat-title">Row anatomy</div>
            <ul className="cat-list">
              <li>
                <span className="k">Leading</span>
                <span className="v">Browser icon + chain corner</span>
              </li>
              <li>
                <span className="k">Body</span>
                <span className="v">Primary + mono subline</span>
              </li>
              <li>
                <span className="k">Motion</span>
                <span className="v">Hover / active surface</span>
              </li>
            </ul>
          </CategoryCard>
          <BrowserPreview>
            <DemoBrowserHistoryRow />
          </BrowserPreview>
        </BrowserShowcase>
      </ComponentCard>
    </StyledSection>
  );
}

const StyledSection = styled.div`
  .section-title {
    ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
    font-size: 22px;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
    margin: 0 0 16px;
  }
`;

const ShowcaseLayout = styled.div`
  display: flex;
  gap: 24px;
  align-items: flex-start;
  flex-wrap: wrap;

  @media (max-width: 900px) {
    flex-direction: column;
  }
`;

const CategoryCard = styled.aside`
  width: 220px;
  flex-shrink: 0;
  padding: 18px 16px;
  border-radius: 10px;
  background: ${({ theme }: { theme: ThemeType }) => theme.cardBg};
  border: 1px solid ${({ theme }: { theme: ThemeType }) => theme.cardBorder};
  box-shadow: ${({ theme }: { theme: ThemeType }) =>
    theme.componentLibraryCardShadow};

  .cat-title {
    ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
    font-size: 14px;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
    margin-bottom: 12px;
  }

  .cat-list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  li {
    display: flex;
    flex-direction: column;
    gap: 2px;
    padding-bottom: 10px;
    border-bottom: 1px solid
      ${({ theme }: { theme: ThemeType }) => theme.divider};

    &:last-child {
      border-bottom: none;
      padding-bottom: 0;
    }
  }

  .k {
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_80};
  }

  .v {
    font-size: 13px;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b};
    line-height: 1.35;
  }
`;

const BrowserShowcase = styled.div`
  display: flex;
  gap: 24px;
  align-items: flex-start;
  flex-wrap: wrap;
`;

const BrowserPreview = styled.div`
  flex: 1;
  min-width: 0;
  max-width: 440px;
  padding: 12px 0;
  border-radius: 12px;
  background: ${({ theme }: { theme: ThemeType }) => theme.cardBg};
  border: 1px solid ${({ theme }: { theme: ThemeType }) => theme.cardBorder};
`;

const BrowserHistoryRow = styled.div`
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  gap: 0;
  align-items: stretch;

  .history-day {
    font-size: 14px;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b};
    margin-bottom: 10px;
    line-height: 18px;
    padding: 0 20px 0;
    width: 100%;
    &.first-day {
      margin-top: 0;
    }
  }

  .history-item-inner {
    width: 100%;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 0 20px;
    height: 50px;
    border-radius: 8px;
    transition: background-color 0.15s ease;
    ${({ theme }: { theme: ThemeType }) => theme.fontRegular};

    @media (hover: hover) {
      &:hover {
        background: ${({ theme }: { theme: ThemeType }) => theme.pressTint};
      }
    }

    &:active {
      background: ${({ theme }: { theme: ThemeType }) => theme.bg_white_10};
    }
  }

  .token-icon {
    position: relative;
    width: 30px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .chain-badge {
    position: absolute;
    width: 14px;
    height: 14px;
    bottom: 0;
    right: 0;
    z-index: 1;
    border: 0.5px solid
      ${({ theme }: { theme: ThemeType }) => theme.border_b7b_50};
    border-radius: 50%;
    background: ${({ theme }: { theme: ThemeType }) => theme.buy_20};
  }

  .item-text {
    display: flex;
    flex-direction: column;
    gap: 2px;
    min-width: 0;
    ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
    font-size: 16px;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_f4f};
    line-height: 18px;
  }

  .item-text-sub {
    font-size: 12px;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_60};
    line-height: 18px;
  }

  .amount {
    margin-left: auto;
    min-width: 8px;
  }
`;

const PreviewColumn = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 20px;

  .block-label {
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_80};
  }

  .home-strip {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
  }

  .products-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 20px;
  }
`;

const HomeTurboCard = styled.div`
  width: 260px;
  min-height: 100px;
  padding: 15px 20px;
  border-radius: 10px;
  cursor: default;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background: ${({ theme }: { theme: ThemeType }) =>
    theme.darkMode ? theme.bg_white_10 : theme.cardBg};
  border: 1px solid
    ${({ theme }: { theme: ThemeType }) =>
      theme.darkMode ? theme.border_transparent : theme.cardBorder};
  box-shadow: ${({ theme }: { theme: ThemeType }) =>
    theme.darkMode ? 'none' : theme.componentLibraryCardShadow};
  transition: transform 0.2s ease, box-shadow 0.2s ease,
    background-color 0.2s ease;

  &:hover {
    transform: translateY(-3px);
    background: ${({ theme }: { theme: ThemeType }) => theme.infoBarBg};
    box-shadow: ${({ theme }: { theme: ThemeType }) =>
      theme.darkMode ? 'none' : theme.primaryBtnHoverShadow};
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
    &:hover {
      transform: none;
    }
  }

  .token-info {
    display: flex;
    align-items: center;
    gap: 8px;
    min-height: 40px;
    ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
    font-size: 16px;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
  }

  .token-dot {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    flex-shrink: 0;
    background: ${({ theme }: { theme: ThemeType }) => theme.buy_20};
    border: 1px solid ${({ theme }: { theme: ThemeType }) => theme.innerBorder2};
  }

  .apy-value {
    margin-top: 6px;
    display: flex;
    align-items: flex-end;
    gap: 6px;
    padding-left: 36px;
    ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
    color: ${({ theme }: { theme: ThemeType }) => theme.green};
    font-size: 24px;
    line-height: 1;
  }

  .apy-value-tips {
    font-size: 12px;
    line-height: 18px;
    ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
    color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_80};
  }
`;

const ProductCard = styled.div`
  position: relative;
  min-height: 140px;
  padding: 20px 24px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: default;
  background: ${({ theme }: { theme: ThemeType }) => theme.cardBg};
  border: 1px solid ${({ theme }: { theme: ThemeType }) => theme.cardBorder};
  box-shadow: ${({ theme }: { theme: ThemeType }) =>
    theme.componentLibraryCardShadow};
  transition: transform 0.2s ease, box-shadow 0.2s ease,
    background-color 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    background: ${({ theme }: { theme: ThemeType }) => theme.infoBarBg};
    box-shadow: ${({ theme }: { theme: ThemeType }) =>
      theme.darkMode ? 'none' : theme.primaryBtnHoverShadow};
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
    &:hover {
      transform: none;
    }
  }

  .item-info {
    display: flex;
    align-items: center;
    gap: 8px;
    ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
    font-size: 16px;
  }

  .token-dot.lg {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    flex-shrink: 0;
    background: ${({ theme }: { theme: ThemeType }) => theme.buy_20};
    border: 1px solid ${({ theme }: { theme: ThemeType }) => theme.innerBorder2};
  }

  .item-profit {
    display: flex;
    flex-direction: column;
    gap: 6px;
    padding-left: 36px;
  }

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
`;

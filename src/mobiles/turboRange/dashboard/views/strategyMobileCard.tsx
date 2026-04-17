import React, { useCallback } from 'react';
import styled from 'styled-components';

import { GhostBtn, PrimaryBtn } from 'src/UI';

import TokenIcon from 'src/components/Token/icon';
import PriceRangeBarForStrategy from 'src/components/TurboRange/priceRangeBar';
import ProductName from 'src/components/TurboRange/productName';
import useCustomNavigate from 'src/hooks/useCustomNavigate';
import { useIntl } from 'src/locals';
import { useModals } from 'src/state/application/hooks';
import ModalKeys from 'src/state/application/modalKeys';
import { useTurboRangeProduct } from 'src/state/turboRange/hooks';
import { TurboRangeStrategy } from 'src/state/turboRange/reducer';
import { formatStrategyDuration } from 'src/state/turboRange/utils';
import { ThemeType } from 'src/theme';

export interface StrategyDesktopCardProps {
  position: TurboRangeStrategy;
  primary: { label: string; value: string };
  secondary: { label: string; value: string }[];
  onViewDetails: (position: TurboRangeStrategy) => void;
}

export default function StrategyDesktopCard({
  position,
  primary,
  secondary,
  onViewDetails,
}: StrategyDesktopCardProps) {
  const intl = useIntl();
  const product = useTurboRangeProduct(position.poolAddress || '');
  const duration = formatStrategyDuration(position.duration || 0);
  const navigate = useCustomNavigate();
  const { hide } = useModals(ModalKeys.turboRangeStrategyDetail);
  const handleCopy = useCallback(() => {
    hide();
    navigate(
      `/turbo-range/invest/${position.poolAddress}?minPrice=${position.minPrice}&maxPrice=${position.maxPrice}`
    );
  }, [navigate, position, hide]);

  return (
    <StyledStrategyMobileCard className="strategy-card">
      <div className="card-header">
        <TokenIcon token={product.baseToken} size={24} hideChainIcon />
        <span className="card-name">
          <ProductName poolAddress={position.poolAddress} />
        </span>
        <span className="card-duration">{duration}</span>
      </div>

      <PriceRangeBarForStrategy position={position} />

      <div className="card-primary">
        <div className="primary-label">{primary.label}</div>
        <div className="primary-value">{primary.value}</div>
      </div>

      <div className="card-secondary">
        {secondary.map((item) => (
          <div key={item.label} className="secondary-item">
            <div className="secondary-label">{item.label}</div>
            <div className="secondary-value">{item.value}</div>
          </div>
        ))}
      </div>

      <div className="card-actions">
        <GhostBtn
          eventName="turboRange_strategy_view_details"
          className="btn-details"
          onClick={() => onViewDetails(position)}
        >
          {intl.turboRange.view_details}
        </GhostBtn>
        <PrimaryBtn
          eventName="turboRange_strategy_copy"
          className="btn-copy"
          onClick={handleCopy}
        >
          {intl.turboRange.copy}
        </PrimaryBtn>
      </div>
    </StyledStrategyMobileCard>
  );
}

const StyledStrategyMobileCard = styled.div`
  background-image: ${({ theme }: { theme: ThemeType }) =>
    theme.darkMode
      ? 'linear-gradient(180deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 100%)'
      : 'none'};
  background-color: ${({ theme }: { theme: ThemeType }) =>
    theme.darkMode ? 'transparent' : theme.cardBg};
  border: 1px solid
    ${({ theme }: { theme: ThemeType }) =>
      theme.darkMode ? 'transparent' : theme.cardBorder};
  box-shadow: ${({ theme }: { theme: ThemeType }) =>
    theme.darkMode ? 'none' : theme.componentLibraryCardShadow};
  border-radius: 10px;
  padding: 20px;
  transition: transform 0.2s ease, box-shadow 0.2s ease,
    background-color 0.2s ease;

  @media (hover: hover) {
    &:hover {
      transform: translateY(-2px);
      background-color: ${({ theme }: { theme: ThemeType }) =>
        theme.darkMode ? 'transparent' : theme.infoBarBg};
      box-shadow: ${({ theme }: { theme: ThemeType }) =>
        theme.darkMode ? 'none' : theme.primaryBtnHoverShadow};
    }
  }

  &.skeleton {
    min-height: 120px;
    .skeleton-line {
      height: 12px;
      background: ${({ theme }) => theme.bg_white_10};
      border-radius: 4px;
      margin-bottom: 10px;
      &.w60 {
        width: 60%;
      }
      &.w100 {
        width: 100%;
      }
      &.w40 {
        width: 40%;
      }
    }
  }

  .card-header {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 15px;

    .card-name {
      ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
      color: ${({ theme }: { theme: ThemeType }) =>
        theme.darkMode ? theme.t_fff : theme.ink};
      font-size: 15px;
      line-height: 20px;
    }

    .card-duration {
      margin-left: auto;
      font-size: 11px;
      color: ${({ theme }: { theme: ThemeType }) =>
        theme.darkMode ? theme.t_fff_60 : theme.mutedText};
      background: ${({ theme }: { theme: ThemeType }) =>
        theme.darkMode ? theme.bg_white_10 : theme.shellSurfaceSecondary};
      padding: 2px 6px;
      border-radius: 8px;
    }
  }

  .card-actions {
    display: flex;
    gap: 15px;
    .dg-primary,
    .dg-ghost {
      height: 36px;
      min-height: 36px;
      flex: 1;
    }
  }

  .card-primary {
    margin: 15px 0;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    gap: 10px;
    background: ${({ theme }: { theme: ThemeType }) => theme.bg_buy_10};
    height: 40px;
    padding: 0 16px;

    .primary-label {
      font-size: 14px;
      line-height: 20px;
      color: ${({ theme }: { theme: ThemeType }) =>
        theme.darkMode ? theme.t_fff_60 : theme.mutedText};
    }

    .primary-value {
      font-size: 16px;
      line-height: 18px;
      ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
      color: ${({ theme }: { theme: ThemeType }) => theme.green};
    }
  }

  .card-secondary {
    display: flex;
    gap: 20px;
    margin-bottom: 16px;

    .secondary-item {
      flex: 1;
      .secondary-label {
        font-size: 12px;
        line-height: 18px;
        color: ${({ theme }: { theme: ThemeType }) =>
          theme.darkMode ? theme.t_fff_60 : theme.mutedText};
        margin-bottom: 2px;
      }
      .secondary-value {
        font-size: 16px;
        line-height: 20px;
        ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
        color: ${({ theme }: { theme: ThemeType }) =>
          theme.darkMode ? theme.t_fff : theme.ink};
      }
    }
  }
`;

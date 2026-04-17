import React, { useMemo } from 'react';
import styled from 'styled-components';

import { Button } from 'src/UI';

import Empty from 'src/components/Empty';
import useCustomNavigate from 'src/hooks/useCustomNavigate';
import { useIntl } from 'src/locals';
import { useHasAccessToken } from 'src/providers/useWallet';
import {
  useShowLoadingSkeleton,
  useTurboRangeActivePositions,
} from 'src/state/turboRange/hooks';
import { ThemeType, useThemeParams } from 'src/theme';

import SkeletonPositionActive from '../Skeletons/Position';
import ActiveItem from './activeItem';

export default function ActiveList({
  inBalancePage,
}: {
  inBalancePage: boolean;
}) {
  const { positions, loadingPositions } = useTurboRangeActivePositions();
  const showSkeleton = useShowLoadingSkeleton();
  const intl = useIntl();
  const navigate = useCustomNavigate();
  const hasAccessToken = useHasAccessToken();
  const { viewWidth, isMobile } = useThemeParams();

  const gridTemplateColumns = useMemo(() => {
    if (isMobile) return '1fr';
    if (viewWidth >= 1920) {
      return 'repeat(4, 1fr)';
    }
    return 'repeat(3, 1fr)';
  }, [isMobile, viewWidth]);
  return (
    <>
      <StyledPositionsList
        className="positions-list"
        gridTemplateColumns={gridTemplateColumns}
      >
        {positions.length === 0 && !loadingPositions && (
          <Empty>
            <div className="empty-text">
              {intl.turboRange.you_have_no_position}
              {inBalancePage && (
                <Button
                  uiVariant="ghost"
                  onClick={() => navigate('/turbo-range')}
                  style={{ marginTop: '15px', minWidth: '200px' }}
                >
                  {intl.go_to_turbo_range}
                </Button>
              )}
            </div>
          </Empty>
        )}
        {showSkeleton ? (
          <>
            {new Array(2).fill(0).map((item, index) => {
              // eslint-disable-next-line react/no-array-index-key
              return <SkeletonPositionActive key={`${index}skeleton`} />;
            })}
          </>
        ) : (
          <>
            {positions.map((position) => {
              return (
                <ActiveItem
                  key={position.id}
                  position={position}
                  inBalancePage={inBalancePage}
                />
              );
            })}
            {hasAccessToken && positions.length > 0 && (
              <div className="no-more">{intl.no_more}</div>
            )}
          </>
        )}
      </StyledPositionsList>
    </>
  );
}

const StyledPositionsList = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  padding-top: 10px;
  min-height: 200px;
  display: grid;
  grid-template-columns: ${({
    gridTemplateColumns,
  }: {
    gridTemplateColumns: string;
  }) => gridTemplateColumns};
  gap: ${({ theme }: { theme: ThemeType }) => (theme.isMobile ? 12 : 20)}px;
  align-content: start;
  .item {
    padding: ${({ theme }: { theme: ThemeType }) =>
      theme.isMobile ? '18px 20px' : '20px 24px'};
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
    border-radius: ${({ theme }: { theme: ThemeType }) =>
      theme.isMobile ? '10px' : '10px'};
    cursor: pointer;
    transition: transform 0.2s ease, box-shadow 0.2s ease,
      background-color 0.2s ease, background-image 0.2s ease;
    &:hover {
      transform: translateY(-4px);
      background-color: ${({ theme }: { theme: ThemeType }) =>
        theme.darkMode ? 'transparent' : theme.infoBarBg};
      background-image: ${({ theme }: { theme: ThemeType }) =>
        theme.darkMode
          ? 'linear-gradient(180deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.08) 100%)'
          : 'none'};
      box-shadow: ${({ theme }: { theme: ThemeType }) =>
        theme.darkMode ? 'none' : theme.primaryBtnHoverShadow};
    }
    .item-top {
      display: flex;
      align-items: center;
      gap: 10px;
      height: 30px;
      margin-bottom: 11px;
      .item-symbol {
        ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
        font-size: 16px;
        line-height: 20px;
        color: ${({ theme }: { theme: ThemeType }) =>
          theme.darkMode ? theme.t_fff : theme.ink};
        margin-right: auto;
      }
    }
    .item-price-range {
      margin-bottom: 14px;
    }
    .item-infos {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 16px 16px;
      &.item-infos-3col {
        grid-template-columns: ${({ theme }: { theme: ThemeType }) =>
          theme.isMobile ? 'repeat(3, minmax(0, 1fr))' : 'repeat(3, 1fr)'};
      }
      .item-info {
        display: flex;
        flex-direction: column;
        gap: 2px;
        ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
        .item-info-title {
          font-size: 12px;
          line-height: 18px;
          white-space: nowrap;
          color: ${({ theme }: { theme: ThemeType }) =>
            theme.darkMode ? theme.t_b7b_60 : theme.mutedText};
        }
        .item-info-value {
          font-size: 16px;
          line-height: 18px;
          color: ${({ theme }: { theme: ThemeType }) =>
            theme.darkMode ? theme.t_fff : theme.ink};
          &.color-green {
            color: ${({ theme }: { theme: ThemeType }) => theme.green};
          }
          &.updating {
            font-size: 13px;
            color: ${({ theme }: { theme: ThemeType }) => theme.green};
          }
        }
      }
    }
  }
  .no-more {
    grid-column: 1 / -1;
    font-size: 12px;
    line-height: 20px;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_60};
    text-align: center;
    margin-top: 20px;
  }
  .dg-empty {
    grid-column: 1 / -1;
  }
`;

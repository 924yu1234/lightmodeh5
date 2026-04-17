import React from 'react';
import styled from 'styled-components';

import AccountCheckWrapper from 'src/components/Empty/AccountCheckWrapper';
import SkeletonSummary from 'src/components/TurboRange/Skeletons/Summary';
import { useIntl } from 'src/locals';
import { useHasAccessToken } from 'src/providers/useWallet';
import {
  useShowLoadingSkeleton,
  useTurboRangeActivePositions,
  useTurboRangePositionSummary,
} from 'src/state/turboRange/hooks';
import { ThemeType } from 'src/theme';
import { formatUsd } from 'src/utils/format';

export default function PositionSummary() {
  const intl = useIntl();
  const { positions, loadingPositions } = useTurboRangeActivePositions();
  const { positionValue, last24hYield, totalYield } =
    useTurboRangePositionSummary();

  const hasAccessToken = useHasAccessToken();

  const showNoPosition =
    !loadingPositions && positions?.length === 0 && hasAccessToken;

  const showSkeleton = useShowLoadingSkeleton();

  return (
    <StyledPositionSummary className="position-summary">
      <AccountCheckWrapper source="turbo_range">
        {!showSkeleton ? (
          <div className="position-summary-inner">
            <div className="summary-item">
              <div className="summary-item-title">
                {intl.turboRange.my_positions}
              </div>
              {showNoPosition ? (
                <div className="no-position-text">
                  {intl.turboRange.you_have_no_position}
                </div>
              ) : (
                <div className="summary-item-value">
                  {formatUsd(positionValue)}
                </div>
              )}
            </div>
            {!showNoPosition && (
              <>
                <div className="summary-item">
                  <div className="summary-item-title">
                    {intl.turboRange.all_time_yield}
                  </div>
                  <div className="summary-item-value color-green">
                    {formatUsd(totalYield)}
                  </div>
                </div>
                <div className="summary-item">
                  <div className="summary-item-title">
                    {intl.turboRange.last_24h_yield}
                  </div>
                  <div className="summary-item-value color-green">
                    {formatUsd(last24hYield)}
                  </div>
                </div>
              </>
            )}
          </div>
        ) : (
          <SkeletonSummary />
        )}
      </AccountCheckWrapper>
    </StyledPositionSummary>
  );
}
const StyledPositionSummary = styled.div`
  position: relative;
  margin-bottom: 30px;
  .position-summary-inner {
    border-radius: 10px;
    border: 1px solid ${({ theme }: { theme: ThemeType }) => theme.innerBorder};
    background: ${({ theme }: { theme: ThemeType }) =>
      theme.darkMode ? 'transparent' : theme.cardBg};
    box-shadow: ${({ theme }: { theme: ThemeType }) =>
      theme.darkMode ? 'none' : theme.componentLibraryCardShadow};
    min-height: 80px;
    padding: 0 20px;
    display: flex;
    align-items: center;
    gap: 60px;
  }
  .no-position-text {
    font-size: 14px;
    line-height: 22px;
    ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
    color: ${({ theme }: { theme: ThemeType }) =>
      theme.darkMode ? theme.t_fff : theme.mutedText};
    white-space: nowrap;
  }
  .summary-item {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 8px;
    .summary-item-title {
      font-size: 13px;
      line-height: 18px;
      ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
      color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_60};
    }
    .summary-item-value {
      font-size: 20px;
      line-height: 22px;
      ${({ theme }: { theme: ThemeType }) => theme.fontBold};
      color: ${({ theme }: { theme: ThemeType }) =>
        theme.darkMode ? theme.t_fff : theme.ink};
      &.color-green {
        color: ${({ theme }: { theme: ThemeType }) => theme.green};
      }
      &.updating {
        font-size: 15px;
      }
    }
  }
`;

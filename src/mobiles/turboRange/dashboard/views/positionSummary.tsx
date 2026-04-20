import React, { useCallback } from 'react';
import styled, { css } from 'styled-components';

import AccountCheckWrapper from 'src/components/Empty/AccountCheckWrapper';
import IconRightOutlined from 'src/components/Icons/RightOutlined';
import FAQMobileText from 'src/components/TurboRange/modals/faq/mobileText';
import SkeletonSummary from 'src/components/TurboRange/Skeletons/Summary';
import useCustomNavigate from 'src/hooks/useCustomNavigate';
import { useIntl } from 'src/locals';
import { useHasAccessToken } from 'src/providers/useWallet';
import {
  useShowLoadingSkeleton,
  useTurboRangeActivePositions,
  useTurboRangePositionSummary,
} from 'src/state/turboRange/hooks';
import { ThemeType } from 'src/theme';
import { formatUsd } from 'src/utils/format';

/** App H5 — My Positions hero card (`theme.summaryCardBg` + white type), matching Turbo Range H5 design spec. */
export default function PositionSummary() {
  const intl = useIntl();
  const { positions, loadingPositions } = useTurboRangeActivePositions();
  const showSkeleton = useShowLoadingSkeleton();
  const navigate = useCustomNavigate();
  const hasAccessToken = useHasAccessToken();

  const { positionValue, last24hYield, totalYield } =
    useTurboRangePositionSummary();

  const showNoPosition =
    !loadingPositions && positions?.length === 0 && hasAccessToken;

  const goPositions = useCallback(() => {
    navigate('/turbo-range/positions');
  }, [navigate]);

  return (
    <>
      <StyledPositionSummary className="position-summary">
        <AccountCheckWrapper source="turbo_range">
          {!showSkeleton ? (
            <div className="position-summary-inner">
              <div
                className="summary-top"
                onClick={goPositions}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    goPositions();
                  }
                }}
                role="button"
                tabIndex={0}
              >
                <div className="summary-lead">
                  <div className="summary-item-title">
                    {intl.turboRange.my_positions}
                  </div>
                  {showNoPosition ? (
                    <div className="no-position-text">
                      {intl.turboRange.you_have_no_position}
                    </div>
                  ) : (
                    <div className="summary-item-value summary-main-value">
                      {formatUsd(positionValue)}
                    </div>
                  )}
                </div>
                {!showNoPosition && (
                  <div className="details-link">
                    <span>{intl.Details}</span>
                    <IconRightOutlined size={14} />
                  </div>
                )}
              </div>

              {!loadingPositions && !showNoPosition && (
                <div className="summary-metrics">
                  <div className="summary-item">
                    <div className="summary-item-title">
                      {intl.turboRange.all_time_yield}
                    </div>
                    <div className="summary-item-value">
                      {formatUsd(totalYield)}
                    </div>
                  </div>
                  <div className="summary-item summary-item--second">
                    <div className="summary-item-title">
                      {intl.turboRange.last_24h}
                    </div>
                    <div className="summary-item-value">
                      {formatUsd(last24hYield)}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <SkeletonSummary />
          )}
        </AccountCheckWrapper>
      </StyledPositionSummary>
      <FAQMobileText />
    </>
  );
}

const heroTypography = css`
  .summary-item-title {
    font-size: 11px;
    line-height: 14px;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
    color: ${({ theme }: { theme: ThemeType }) =>
      theme.turboRangeHeroTextMuted};
  }

  .summary-item-value {
    font-size: 17px;
    line-height: 22px;
    ${({ theme }: { theme: ThemeType }) => theme.fontBold};
    color: ${({ theme }: { theme: ThemeType }) => theme.turboRangeHeroText};
  }

  .summary-main-value {
    font-size: 30px;
    line-height: 34px;
    letter-spacing: -0.02em;
  }

  .no-position-text {
    font-size: 14px;
    line-height: 22px;
    ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
    color: ${({ theme }: { theme: ThemeType }) =>
      theme.turboRangeHeroTextMuted};
  }
`;

const StyledPositionSummary = styled.div`
  position: relative;
  z-index: 2;
  margin-bottom: 6px;

  .position-summary-inner {
    position: relative;
    overflow: hidden;
    border-radius: 12px;
    border: none;
    padding: 14px 16px 12px;
    background: ${({ theme }: { theme: ThemeType }) => theme.summaryCardBg};
    box-shadow: ${({ theme }: { theme: ThemeType }) =>
      theme.darkMode ? 'none' : theme.turboRangeHeroShadow};
    ${heroTypography}
  }

  .summary-top {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 12px;
    cursor: pointer;
    outline: none;

    &:focus-visible {
      box-shadow: ${({ theme }: { theme: ThemeType }) =>
        theme.ctaGhostFocusRing};
      border-radius: 8px;
    }
  }

  .summary-lead {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 6px;
  }

  .summary-metrics {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: stretch;
    margin-top: 10px;
    padding-top: 0;
    border-top: none;
  }

  .summary-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 6px;
    min-width: 0;
    padding-right: 12px;

    &--second {
      padding-right: 0;
      padding-left: 12px;
      border-left: 1px solid
        ${({ theme }: { theme: ThemeType }) => theme.turboRangeHeroDivider};
    }
  }

  .details-link {
    flex-shrink: 0;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    margin-top: 14px;
    padding: 6px 14px;
    border-radius: 20px;
    background: ${({ theme }: { theme: ThemeType }) =>
      theme.turboRangeHeroDetailsPillBg};
    font-size: 14px;
    line-height: 20px;
    ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
    color: ${({ theme }: { theme: ThemeType }) => theme.turboRangeHeroText};
    cursor: pointer;
    pointer-events: none;

    .icon-right-outlined {
      color: ${({ theme }: { theme: ThemeType }) => theme.turboRangeHeroText};
    }
  }

  .summary-top:active .details-link {
    background: ${({ theme }: { theme: ThemeType }) =>
      theme.turboRangeHeroDetailsPillBg};
    filter: brightness(1.08);
  }
`;

import React from 'react';
import bg from 'imgs/turbo_range_card_bg.svg';
import styled from 'styled-components';

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

export default function PositionSummary() {
  const intl = useIntl();
  const { positions, loadingPositions } = useTurboRangeActivePositions();
  const showSkeleton = useShowLoadingSkeleton();
  const navigate = useCustomNavigate();
  const hasAccessToken = useHasAccessToken();

  const {
    positionValue,
    yesterdayYield,
    totalYield,
    isYesterdayYieldUpdating,
  } = useTurboRangePositionSummary();
  return (
    <>
      <StyledPositionSummary className="position-summary">
        <AccountCheckWrapper source="turbo_range">
          {!showSkeleton ? (
            <div className="position-summary-inner">
              <img src={bg} alt="turbo_range_card_bg" className="bg" />

              <div
                className="summary-content"
                onClick={() => navigate('/turbo-range/positions')}
              >
                <div className="summary-item">
                  <div className="summary-item-title">
                    {intl.turboRange.my_positions}
                  </div>
                  <div className="summary-item-value">
                    {formatUsd(positionValue)}
                  </div>
                </div>
                <div className="details-link">
                  {intl.Details}
                  <IconRightOutlined />
                </div>
                {!loadingPositions && (
                  <>
                    {positions?.length > 0 || !hasAccessToken ? (
                      <>
                        <div className="summary-item">
                          <div className="summary-item-title">
                            {intl.turboRange.total_yield}
                          </div>
                          <div className="summary-item-value profit">
                            {formatUsd(totalYield)}
                          </div>
                        </div>
                        <div className="summary-item">
                          <div className="summary-item-title">
                            {intl.turboRange.yesterday_yield}
                          </div>
                          <div
                            className={`summary-item-value profit ${
                              isYesterdayYieldUpdating ? 'updating' : ''
                            }`}
                          >
                            {isYesterdayYieldUpdating
                              ? intl.turboRange.updating
                              : formatUsd(yesterdayYield)}
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="summary-item">
                        <div className="summary-item-title">
                          {intl.turboRange.you_have_no_position}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
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
const StyledPositionSummary = styled.div`
  position: relative;
  z-index: 2;
  min-height: 135px;
  .position-summary-inner {
    width: 100%;
    height: 100%;
    min-height: 135px;
    background-image: linear-gradient(
      270deg,
      rgba(0, 138, 220, 0.8) 0%,
      #00a0ff 69%
    );
    border-radius: 5px;
    padding: 15px 20px;
    position: relative;
  }
  .summary-content {
    position: relative;
    z-index: 2;
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 15px;
    position: relative;
  }
  .bg {
    position: absolute;
    bottom: 0;
    right: 1%;
    z-index: 0;
    height: 80%;
  }
  .details-link {
    background: ${({ theme }) => theme.bg_white_10};
    border: 1px solid ${(props) => props.theme.border_white_30};
    border-radius: 18px;
    padding: 5px 15px;
    height: 34px;
    text-align: right;
    font-size: 13px;
    line-height: 18px;
    ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    width: fit-content;
    margin-left: auto;
    margin-top: 5px;
  }
  .summary-item {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 2px;
    .summary-item-title {
      font-size: 13px;
      line-height: 18px;
      ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
      color: ${({ theme }: { theme: ThemeType }) => theme.t_fff_80};
    }
    .summary-item-value {
      font-size: 22px;
      line-height: 22px;
      ${({ theme }: { theme: ThemeType }) => theme.fontBold};
      color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
      &.profit {
        font-size: 16px;
      }
      &.updating {
        font-size: 13px;
      }
    }
  }
`;

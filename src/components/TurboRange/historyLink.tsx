import React, { useEffect, useState } from 'react';
import data from 'imgs/live_dot.json';
import Lottie from 'lottie-react';
import styled from 'styled-components';

import { Tooltip } from 'src/UI';

import useCustomNavigate from 'src/hooks/useCustomNavigate';
import { useIntl } from 'src/locals';
import { useHasProcessingTurboRangeOrders } from 'src/state/turboRange/useTurboRangeOrderProgress';
import { useChangeFlag, useUserFlag } from 'src/state/user/hooks';
import { ThemeType } from 'src/theme';

import IconAllOrders from '../Icons/allOrders';
export default function HistoryLink() {
  const navigate = useCustomNavigate();
  const intl = useIntl();
  const hasProcessing = useHasProcessingTurboRangeOrders();
  const hasSeenLiveStatusTip = useUserFlag(
    'turbo_range_history_live_status_tip_seen'
  );
  const changeHasSeenLiveStatusTip = useChangeFlag(
    'turbo_range_history_live_status_tip_seen'
  );
  const [showLiveStatusTip, setShowLiveStatusTip] = useState(false);

  useEffect(() => {
    if (!hasProcessing) {
      setShowLiveStatusTip(false);
      return;
    }
    if (hasSeenLiveStatusTip) {
      return;
    }
    setShowLiveStatusTip(true);
    changeHasSeenLiveStatusTip(true);
  }, [changeHasSeenLiveStatusTip, hasProcessing, hasSeenLiveStatusTip]);

  return (
    <Tooltip
      opened={showLiveStatusTip}
      label={intl.turbo_range_view_live_status}
      position="top-end"
      withArrow
      zIndex={199}
      offset={0}
    >
      <StyledHistoryLink
        className="account-title-link"
        onClick={() => navigate('/account/history/turbo-range')}
      >
        <div className="history-link-content">
          <IconAllOrders />
          {intl.history}
          {hasProcessing && (
            <div className="breathing-dot">
              <Lottie animationData={data} loop />
            </div>
          )}
        </div>
      </StyledHistoryLink>
    </Tooltip>
  );
}

const StyledHistoryLink = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: auto;
  cursor: pointer;
  padding: 0 10px;
  height: 28px;
  margin-top: 5px;
  cursor: pointer;

  @media (hover: hover) {
    &:hover {
      background: ${({ theme }) => theme.bg_white_10};
      border-radius: 14px;
      padding: 0 10px;
      .icon-all-orders {
        color: ${({ theme }: { theme: ThemeType }) => theme.blue};
      }
      color: ${({ theme }: { theme: ThemeType }) => theme.blue};
    }
  }

  .history-link-content {
    position: relative;
    display: flex;
    align-items: center;
    gap: 5px;
  }

  .turbo-range-notification {
    margin-bottom: 10px;
  }

  .breathing-dot {
    position: absolute;
    top: -10px;
    z-index: 1;
    left: 3px;
    & > div {
      width: 20px;
      height: 20px;
    }
  }
`;

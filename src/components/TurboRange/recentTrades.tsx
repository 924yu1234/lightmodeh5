import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

import IconRightOutlined from 'src/components/Icons/RightOutlined';
import { TurboRangeOrderStatus } from 'src/constants/consts';
import useCustomNavigate from 'src/hooks/useCustomNavigate';
import { useIntl } from 'src/locals';
import {
  useRefreshTurboRangePostions,
  useSetTurboRangeState,
} from 'src/state/turboRange/hooks';
import { useTurboRangeRecentTrades } from 'src/state/turboRange/useTurboRangeOrderProgress';
import { ThemeType } from 'src/theme';

import Close from '../Icons/close';

export default function RecentTrades() {
  const intl = useIntl();
  const navigate = useCustomNavigate();
  const refreshPositions = useRefreshTurboRangePostions();
  const updateTurboRangeState = useSetTurboRangeState();

  const data = useTurboRangeRecentTrades();

  const preSuccessSize = useRef<number>(0);

  const prcessingSize = data.filter(
    (d: any) => d.status === TurboRangeOrderStatus.processing
  )?.length;
  const successSize = data.filter(
    (d: any) => d.status === TurboRangeOrderStatus.success
  )?.length;
  const failedSize = data.filter(
    (d: any) => d.status === TurboRangeOrderStatus.failed
  )?.length;

  useEffect(() => {
    if (successSize > preSuccessSize.current) {
      setTimeout(() => {
        refreshPositions();
      }, 3000);
    }
    preSuccessSize.current = successSize;
  }, [successSize, refreshPositions]);

  // 如果最近1小时没有新的记录 隐藏
  if (!data?.length) return null;
  if (prcessingSize === 0 && successSize === 0 && failedSize === 0) return null;

  const getStatusText = (
    count: number,
    key: 'processing' | 'success' | 'failed'
  ) => {
    if (count <= 0) {
      return '';
    }
    if (key === 'processing') {
      return count === 1
        ? intl.turboRange.transaction_in_progress
        : intl.turboRange.N_transactions_in_progress.replace('N', count);
    }
    if (key === 'success') {
      return count === 1
        ? intl.turboRange.transaction_successful
        : intl.turboRange.N_transactions_successful.replace('N', count);
    }
    return count === 1
      ? intl.turboRange.transaction_failed
      : intl.turboRange.N_transactions_failed.replace('N', count);
  };

  return (
    <StyledRecentTrades
      className="recent-trades-wrapper"
      onClick={() => navigate('/account/history/turbo-range')}
    >
      <div className="recent-trades-inner">
        <div className="recent-trades-list">
          {successSize > 0 && (
            <div className="recent-trades-item success">
              <span className="dot"></span>
              <span>{getStatusText(successSize, 'success')}</span>
              <IconRightOutlined />
            </div>
          )}
          {prcessingSize > 0 && (
            <div className="recent-trades-item processing">
              <span className="dot"></span>
              <span>{getStatusText(prcessingSize, 'processing')}</span>
              <IconRightOutlined />
            </div>
          )}
          {failedSize > 0 && (
            <div className="recent-trades-item failed">
              <span className="dot"></span>
              <span>{getStatusText(failedSize, 'failed')}</span>
              <IconRightOutlined />
            </div>
          )}
        </div>
        <div
          className="close-btn"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            updateTurboRangeState({
              positioPageShowHistoryTimestamp: Date.now(),
            });
          }}
        >
          <Close size={14} />
        </div>
      </div>
    </StyledRecentTrades>
  );
}

const StyledRecentTrades = styled.div`
  margin-top: 10px;
  background: ${({ theme }: { theme: ThemeType }) => theme.bg_blue_07};
  position: relative;
  .recent-trades-inner {
    ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
    font-size: 13px;
    line-height: 20px;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    cursor: pointer;
    border-radius: 5px;
    padding: 12px 50px 12px 10px;
  }
  .recent-trades-list {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  .recent-trades-item {
    display: flex;
    align-items: center;
    gap: 6px;
    .dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      flex-shrink: 0;
    }
    &.success .dot {
      background: ${({ theme }: { theme: ThemeType }) => theme.green};
    }
    &.processing .dot {
      background: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
    }
    &.failed .dot {
      background: ${({ theme }: { theme: ThemeType }) => theme.red};
    }
  }
  .close-btn {
    position: absolute;
    right: 0;
    top: 0px;
    width: 44px;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 8px;
    .icon-close {
      color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
      opacity: 0.7;
    }
  }
`;

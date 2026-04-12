import React from 'react';
import styled from 'styled-components';

import { Skeleton } from 'src/UI';

import { useThemeParams } from 'src/theme';

export default function HistoryItemSkeleton({ isFirst }: { isFirst: boolean }) {
  const { isMobile } = useThemeParams();
  return (
    <StyledHistoryItem className={isMobile ? 'mobile' : 'web'}>
      {!isMobile && (
        <div className="skeleton-date">
          {isFirst && <Skeleton height={18} width={80} />}
        </div>
      )}
      <div className="skeleton-content">
        <Skeleton height={28} circle className="token-icon" />
        <div className="skeleton-text">
          <Skeleton height={18} width={60} />
          <Skeleton height={16} width={120} />
        </div>
        <Skeleton height={20} width={80} />
      </div>
    </StyledHistoryItem>
  );
}

const StyledHistoryItem = styled.div`
  &.web {
    padding: 10px 20px 0;
    .skeleton-content {
      padding: 0 20px;
    }
  }
  min-height: 50px;
  max-width: 650px;
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
  cursor: pointer;
  .skeleton-date {
    min-width: 140px;
    height: 30px;
  }
  .skeleton-content {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 0 30px;
    height: 50px;
  }

  .skeleton-text {
    display: flex;
    flex-direction: column;
    gap: 4px;
    margin-right: auto;
  }
`;

import React from 'react';
import styled from 'styled-components';

import { Skeleton } from 'src/UI';

export default function SkeletonSummary() {
  return (
    <StyledSummary className="skeleton-summary-item">
      <div className="skeleton-item-top">
        <div className="skeleton-item-top-left">
          <Skeleton height="18" width="80px" />
          <Skeleton height="18" width="40px" />
        </div>
        <Skeleton height="34px" width="80px" />
      </div>
      <div className="skeleton-item-profit">
        <div className="skeleton-item-profit-left">
          <Skeleton height="18" width="80px" />
          <Skeleton height="18" width="40px" />
        </div>
        <div className="skeleton-item-profit-right">
          <Skeleton height="18" width="80px" />
          <Skeleton height="18" width="40px" />
        </div>
      </div>
    </StyledSummary>
  );
}

const StyledSummary = styled.div`
  background: ${({ theme }) => theme.bg_white_10};
  border-radius: 5px 5px 0 0;
  padding: 15px 20px;
  min-height: 130px;
  .skeleton-item-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .skeleton-item-top-left {
      display: flex;
      align-items: flex-start;
      gap: 5px;
      flex-direction: column;
    }
  }
  .skeleton-item-profit {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 15px;
    .skeleton-item-profit-left {
      display: flex;
      align-items: flex-start;
      gap: 5px;
      flex-direction: column;
    }
    .skeleton-item-profit-right {
      display: flex;
      align-items: flex-start;
      gap: 5px;
      flex-direction: column;
    }
  }
`;

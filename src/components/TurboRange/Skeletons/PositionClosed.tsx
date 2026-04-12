import React from 'react';
import styled from 'styled-components';

import { Skeleton } from 'src/UI';

export default function SkeletonPositionClosed() {
  return (
    <StyledProducts className="skeleton-position-closed-item">
      <div className="skeleton-item-top">
        <Skeleton height={28} circle className="token-icon" />
        <Skeleton height="18" width="60px" />
      </div>
      <div className="skeleton-item-infos">
        <div className="skeleton-item-info">
          <Skeleton height="18px" width="70px" />
          <Skeleton height="18px" width="100px" />
        </div>
        <div className="skeleton-item-info">
          <Skeleton height="18px" width="70px" />
          <Skeleton height="18px" width="100px" />
        </div>
      </div>
    </StyledProducts>
  );
}

const StyledProducts = styled.div`
  margin-bottom: 10px;
  background: ${({ theme }) => theme.bg_white_07};
  border-radius: 5px;
  padding: 15px 25px 17px;
  min-height: 110px;
  .skeleton-item-top {
    display: flex;
    align-items: center;
    gap: 5px;
    margin-bottom: 12px;
  }
  .skeleton-item-infos {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 13px;
    .skeleton-item-info {
      display: flex;
      flex-direction: column;
      gap: 5px;
    }
  }
`;

import React from 'react';
import styled from 'styled-components';

import { Skeleton } from 'src/UI';

import { ThemeType } from 'src/theme';

export default function EarnItemSkeleton() {
  return (
    <StyledItem>
      <div className="item-inner">
        <div className="item-header">
          <Skeleton height={32} width={32} circle />
          <div className="item-name">
            <Skeleton height={16} width={80} />
            <Skeleton height={16} width={140} style={{ marginTop: 4 }} />
          </div>
          <div className="item-apy">
            <Skeleton height={16} width={60} />
            <Skeleton height={16} width={60} style={{ marginTop: 4 }} />
          </div>
        </div>
        <div className="item-info">
          <div className="item-info-item">
            <div className="item-info-title">
              <Skeleton height={18} width={80} />
            </div>
            <div className="item-info-value">
              <Skeleton height={18} width={80} />
            </div>
          </div>
          <div className="item-info-item">
            <div className="item-info-title">
              <Skeleton height={18} width={80} />
            </div>
            <div className="item-info-value">
              <Skeleton height={18} width={80} />
            </div>
          </div>
          <div className="item-info-item">
            <div className="item-info-title">
              <Skeleton height={18} width={80} />
            </div>
            <div className="item-info-value">
              <Skeleton height={18} width={80} />
            </div>
          </div>
        </div>
      </div>
    </StyledItem>
  );
}

const StyledItem = styled.div`
  padding: 0 10px;
  margin-bottom: 10px;
  .item-inner {
    background: ${({ theme }: { theme: ThemeType }) => theme.bg_05};
    border-radius: 8px;
    min-height: 105px;
    padding: 15px 10px 10px;
  }
  .item-header {
    display: flex;
    align-items: center;
    gap: 10px;
    .item-name {
    }
    .item-apy {
      margin-left: auto;
    }
  }
  .item-info {
    margin-top: 10px;
    gap: 2px 10px;
    display: flex;
    .item-info-item {
      display: flex;
      align-items: flex-start;
      flex-direction: column;
      gap: 5px;
      flex: 1;
    }
    .item-info-title {
      font-size: 12px;
      line-height: 18px;
      ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
      color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_60};
    }
    .item-info-value {
      font-size: 12px;
      line-height: 18px;
      display: flex;
      ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
      color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b};
    }
  }
`;

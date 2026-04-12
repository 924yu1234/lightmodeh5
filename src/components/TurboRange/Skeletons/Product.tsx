import React from 'react';
import styled from 'styled-components';

import { Skeleton } from 'src/UI';

import { ThemeType } from 'src/theme';

export default function SkeletonProduct() {
  return (
    <StyledProducts className="skeleton-product-item">
      <div className="item-info">
        <Skeleton height={24} circle className="token-icon" />
        <Skeleton height="18" width="60px" />
      </div>
      <div className="item-profit">
        <Skeleton height="22px" width="80px" />
        <Skeleton height="22px" width="50px" />
      </div>
    </StyledProducts>
  );
}

const StyledProducts = styled.div`
  background: ${({ theme }) => theme.bg_white_07};
  border-radius: 5px;
  padding: 20px;
  min-height: 110px;
  .item-info {
    display: flex;
    align-items: center;
    gap: 5px;
    .item-symbol {
      ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
      font-size: 16px;
      line-height: 20px;
      color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
      margin-right: auto;
    }
    .invest-btn {
      height: 30px;
      padding: 0 10px;
    }
    margin-bottom: 15px;
  }
  .item-profit {
    display: flex;
    align-items: center;
    gap: 5px;
    padding-left: 29px;
    ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff_60};
    font-size: 14px;
    line-height: 20px;
    .item-profit-value {
      ${({ theme }: { theme: ThemeType }) => theme.fontBold};
      font-size: 14px;
      line-height: 20px;
      color: ${({ theme }: { theme: ThemeType }) => theme.green};
    }
  }
`;

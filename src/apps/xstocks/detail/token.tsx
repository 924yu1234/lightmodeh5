import React from 'react';
import styled from 'styled-components';

import PriceChange from 'src/components/Pair/priceChange';
import TokenIcon from 'src/components/Token/icon';
import { ThemeType } from 'src/theme';

import { useXStockDetail } from './dataProvider';

export default function Token() {
  const { pair } = useXStockDetail();

  return (
    <StyledToken>
      <TokenIcon size={48} token={pair.baseToken} hideChainIcon />
      <div className="summary-right">
        <div className="summary-name">{pair?.baseToken?.symbol}</div>
        <div className="summary-price">
          ${pair.price_display}
          <PriceChange price_change_percent={pair.change} max99 />
        </div>
      </div>
    </StyledToken>
  );
}

const StyledToken = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
  margin-bottom: 20px;
  .summary-right {
    display: flex;
    flex-direction: column;
    .summary-name {
      font-size: 18px;
      line-height: 24px;
      ${({ theme }: { theme: ThemeType }) => theme.fontBold}
      color: ${({ theme }: { theme: ThemeType }) => theme.t_f4f};
    }
    .summary-price {
      font-size: 20px;
      line-height: 24px;
      color: ${({ theme }: { theme: ThemeType }) => theme.t_f4f};
      display: flex;
      gap: 5px;
      .pair-price-change {
        font-size: 14px;
        line-height: 24px;
      }
    }
  }
`;

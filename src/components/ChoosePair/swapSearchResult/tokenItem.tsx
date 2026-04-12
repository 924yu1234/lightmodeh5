import React from 'react';
import styled from 'styled-components';

import PriceChange from 'src/components/Pair/priceChange';
import SwapPairChoose from 'src/components/SwapPair/choose';
import { useSwapTokenInfo } from 'src/state/swap/tokenInfo/hooks';
import { ThemeType } from 'src/theme';
import { formatSwapPairPrice } from 'src/utils/swapNumberFormat';

export default function TokenItem({ pair }: { pair: any }) {
  const { percent, price } = useSwapTokenInfo(pair.baseTokenId);
  return (
    <StyledTokenItem>
      <div className="token-top">
        <SwapPairChoose pair={pair} hideName />
        <div className="token-top-right">
          <div className="token-price">{formatSwapPairPrice(price)}</div>
          <div className="token-percent">
            <PriceChange price_change_percent={percent} max99 />
          </div>
        </div>
      </div>
      {/* <div className="token-bottom">
        <div className="bottom-item">
          <div className="bottom-item-title">{intl.pool_liquidity}</div>
          <div className="bottom-item-value">
            ${formatPairInfo(liquidity) || '--'}
          </div>
        </div>
        <div className="bottom-item">
          <div className="bottom-item-title">{intl['24h_pool_volume']}</div>
          <div className="bottom-item-value">
            ${formatPairInfo(poolVolume) || '--'}
          </div>
        </div>
        <div className="bottom-item">
          <div className="bottom-item-title">{intl.mkt_cap}</div>
          <div className="bottom-item-value">
            ${formatPairInfo(marketCap) || '--'}
          </div>
        </div>
      </div> */}
    </StyledTokenItem>
  );
}

const StyledTokenItem = styled.div`
  width: 100%;
  .token-top {
    display: flex;
    align-items: center;
    .token-top-right {
      margin-left: auto;
      ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
      text-align: right;
      font-size: 14px;
      line-height: 20px;
      color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
      .pair-price-change {
        font-size: 12px;
        line-height: 18px;
      }
    }
  }
  .token-bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 15px;
    .bottom-item {
      flex: 1;
      .bottom-item-title {
        ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
        font-size: 12px;
        line-height: 18px;
        color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_80};
        margin-bottom: 4px;
      }
      .bottom-item-value {
        ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
        font-size: 14px;
        line-height: 18px;
        color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
    }
  }
`;

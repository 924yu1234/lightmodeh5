import React, { useEffect, useMemo, useRef } from 'react';
import styled from 'styled-components';

import PriceChange from 'src/components/Pair/priceChange';
import Share from 'src/components/share';
import SwapPairCode from 'src/components/SwapPair/PairCode';
import { getUrlPath } from 'src/hooks/choosePair';
import { useSetTitle } from 'src/providers/useWallet';
import { useCurrentSwapPair, useSwapTicker } from 'src/state/swap/pair/hooks';
import { useSwapTokenInfo } from 'src/state/swap/tokenInfo/hooks';
import { formatSwapPairPrice } from 'src/utils/swapNumberFormat';

import { useIntl } from 'js/locals';

export default function Ticker() {
  const ticker = useSwapTicker();
  const pair = useCurrentSwapPair();
  const setDocumentTitle = useSetTitle();
  const ref = useRef();

  const intl = useIntl();
  const { quoteToken, baseToken } = pair;
  const { loading } = ticker;

  const { percent, price } = useSwapTokenInfo(pair.baseTokenId);

  useEffect(() => {
    setDocumentTitle(
      `${intl.doc_title_swap.replace('XXX', baseToken?.symbol)}`
    );
    return () => {
      setDocumentTitle('');
    };
  }, [setDocumentTitle, intl, baseToken, quoteToken, loading]);

  const last_price_display = useMemo(() => {
    return formatSwapPairPrice(price);
  }, [price]);

  const shareUrl = useMemo(() => {
    const path = getUrlPath({ ...pair, page: 'swap' });
    return `${path}?chain=${baseToken?.chain?.toLowerCase()}`;
  }, [pair, baseToken]);

  return (
    <>
      <SwapPairCode pair={pair} />
      <StyledTicker ref={ref} className="hideScrollBar">
        <div className="ticker-item price">
          <span className="label">{intl['trade.price']}</span>
          <span
            className={`value ${percent > 0 ? 'color-up' : ''} ${
              percent < 0 ? 'color-down' : ''
            }`}
          >
            <span className="last">{price ? last_price_display : '--'}</span>
            <PriceChange price_change_percent={percent} max99 />
          </span>
        </div>
        {/* <div className="ticker-item">
          <span className="label">{intl.pool_liquidity}</span>
          <span className="value">${formatPairInfo(liquidity) || '--'}</span>
        </div>

        <div className="ticker-item">
          <span className="label">{intl['24h_pool_volume']}</span>
          <span className="value"> ${formatPairInfo(poolVolume) || '--'}</span>
        </div>
        <div className="ticker-item">
          <span className="label">{intl.mkt_cap}</span>
          <span className="value">${formatPairInfo(marketCap) || '--'}</span>
        </div>
        <div
          className="more"
          onClick={() => {
            showModal({
              modal: ModalKeys.swapPoolInfo,
              ticker,
            });
          }}
        >
          {intl.more}
          <IconRightOutlined />
        </div> */}
        <Share url={shareUrl} />
      </StyledTicker>
    </>
  );
}

Ticker.propTypes = {};

export const StyledTicker = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  flex-wrap: nowrap;
  overflow-x: auto;
  overflow-y: hidden;
  gap: 10px;
  .more {
    display: flex;
    align-items: center;
    cursor: pointer;
    color: ${(props) => props.theme.t_b7b};
    ${(props) => props.theme.fontRegular};
    font-size: 12px;
  }
  .ticker-item {
    margin-right: ${(props) => (props.marginAuto ? 'auto' : '30px')};
    display: flex;
    flex-direction: column;
    justify-content: center;
    .label {
      color: ${(props) => props.theme.t_b7b};
      ${(props) => props.theme.fontRegular};
      font-size: 12px;
      line-height: 18px;
      white-space: nowrap;
    }
    .value {
      color: ${(props) => props.theme.t_fff};
      ${(props) => props.theme.fontBold};
      margin-top: 2px;
      font-size: 12px;
      line-height: 14px;
      white-space: nowrap;
      .last {
        height: 14px;
      }
    }
    &.price {
      .value {
        display: flex;
        align-items: center;
        .pair-price-change {
          margin-left: 8px;
        }
      }
    }
  }
  .share-icon {
    margin-left: auto;
  }
`;

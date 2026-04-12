import React, { useMemo } from 'react';
import styled from 'styled-components';

import IconRightOutlined from 'src/components/Icons/RightOutlined';
import PriceChange from 'src/components/Pair/priceChange';
import { useShowModal } from 'src/state/application/hooks';
import { ModalKeys } from 'src/state/application/reducer';
import { useCurrentSwapPair, useSwapTicker } from 'src/state/swap/pair/hooks';
import { useSwapTokenInfo } from 'src/state/swap/tokenInfo/hooks';
import { ThemeType } from 'src/theme';
import {
  formatPairInfo,
  formatSwapPairPrice,
} from 'src/utils/swapNumberFormat';

import { useIntl } from 'js/locals';

export default function SwapPairMoreInfo({
  isInfoPage,
}: {
  isInfoPage?: boolean;
}) {
  const ticker = useSwapTicker();
  const pair = useCurrentSwapPair();

  const intl = useIntl();

  const { marketCap, liquidity, poolVolume, percent, price } = useSwapTokenInfo(
    pair?.baseTokenId
  );

  const last_price_display = useMemo(() => {
    return formatSwapPairPrice(price);
  }, [price]);

  const showModal = useShowModal();

  return (
    <StyledTicker className="swap-pair-more-info">
      <div className="price">
        <span className="last">${price ? last_price_display : '--'}</span>
        <PriceChange price_change_percent={percent} max99 />
      </div>
      {isInfoPage && (
        <>
          <div className="pool-info">
            <div
              className="pool-info-inner"
              onClick={() =>
                showModal({
                  modal: ModalKeys.swapPoolInfo,
                  ticker,
                })
              }
            >
              {intl.pool_info} <IconRightOutlined size={12} />
            </div>
          </div>
          <div className="more-items">
            <div className="ticker-item">
              <span className="label">{intl.pool_liquidity}</span>
              <span className="value">
                ${formatPairInfo(liquidity) || '--'}
              </span>
            </div>

            <div className="ticker-item">
              <span className="label">{intl['24h_pool_volume']}</span>
              <span className="value">
                {' '}
                ${formatPairInfo(poolVolume) || '--'}
              </span>
            </div>
            <div className="ticker-item">
              <span className="label">{intl.mkt_cap}</span>
              <span className="value">
                ${formatPairInfo(marketCap) || '--'}
              </span>
            </div>
          </div>
        </>
      )}
    </StyledTicker>
  );
}

export const StyledTicker = styled.div`
  margin-bottom: 15px;
  .price {
    display: flex;
    align-items: center;
    .last {
      ${(props) => props.theme.fontMedium};
      font-size: 24px;
      line-height: 33px;
      color: ${(props) => props.theme.t_fff};
    }
    .pair-price-change {
      margin-left: 8px;
    }

    .dg-icon-wrapper {
      background: ${({ theme }) => theme.bg_white_10};
      border-radius: 5px;
      margin-left: auto;
    }
  }

  .pool-info {
    display: flex;
    align-items: center;
    .pool-info-inner {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 10px;
      ${(props) => props.theme.fontRegular};
      font-size: 12px;
      line-height: 18px;
      color: ${(props) => props.theme.t_b7b_80};
      text-align: center;
      margin-top: 5px;
      height: 20px;
      background: ${({ theme }: { theme: ThemeType }) => theme.bg_b7b_10};
      padding: 0 6px 0 10px;
      border-radius: 4px;
    }
  }

  .more-items {
    display: flex;
    align-items: center;
    margin: 10px 0 0;
    .ticker-item {
      display: flex;
      flex: 1;
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
    }
  }
`;

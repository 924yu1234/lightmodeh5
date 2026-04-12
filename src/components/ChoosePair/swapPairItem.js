import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import SwapPairFavorite from 'src/components/SwapPair/favorite';
import { useToSwap } from 'src/hooks/navigate';
import { useIsAppH5 } from 'src/providers/useWallet';
import { useThemeParams } from 'src/theme';
import { formatSwapPairPrice } from 'src/utils/swapNumberFormat';

import useChoosePair from 'js/hooks/choosePair';
import { useModals } from 'js/state/application/hooks';
import { ModalKeys } from 'js/state/application/reducer';

import PriceChange from '../Pair/priceChange';
import SwapPairChoose from '../SwapPair/choose';

export default function SwapPairItem({ pair, style }) {
  const choosePair = useChoosePair();
  const { hide } = useModals(ModalKeys.chooseSwapPair);
  const price = pair?.price;
  const percent = pair?.percent;

  const price_display = useMemo(() => {
    return formatSwapPairPrice(price, { precision: '#' });
  }, [price]);

  const { isMobile } = useThemeParams();

  const isApp = useIsAppH5();
  const toSwap = useToSwap();

  const choose = useCallback(() => {
    hide();
    if (isApp) {
      toSwap({ token: pair.baseToken });
    } else {
      choosePair(
        {
          baseToken: pair.baseToken,
          quoteToken: pair.quoteToken,
          pairId: pair.pairId,
        },
        'swap'
      );
    }
  }, [pair, choosePair, hide, isApp, toSwap]);

  return (
    <StyledPairItem
      key={pair?.pairId}
      className="list-body-item"
      style={style}
      onClick={choose}
    >
      <div className="item item-symbol">
        {!isMobile && (
          <>
            <SwapPairFavorite pair={pair} size={14} outSize={22} />
          </>
        )}
        <SwapPairChoose
          pair={pair}
          weakenQuote
          showWrapTag
          hideName
          disableNavigate
          page="swap"
        />
      </div>
      <div className="item item-price">{price_display ?? '--'}</div>
      <div className="item item-percent">
        {percent === '' ? (
          '--'
        ) : (
          <PriceChange price_change_percent={percent} max99 />
        )}
      </div>
    </StyledPairItem>
  );
}

SwapPairItem.propTypes = {
  pair: PropTypes.object,
  style: PropTypes.object,
};

const StyledPairItem = styled.div`
  padding: 5px 0;
  ${(props) => props.theme.fontRegular};
  font-size: 14px;
  color: ${(props) => props.theme.t_b7b};
  letter-spacing: 0;
  line-height: 18px;
  cursor: pointer;

  &:hover {
    background: ${(props) => props.theme.hover};
  }

  .item,
  .pair-price-change {
    display: flex;
    align-items: center;
  }
  .item-symbol {
    color: ${(props) => props.theme.t_d4d};
    .pair-favorite {
      margin-right: 8px;
    }
  }
  .item-price {
    color: ${(props) => props.theme.t_d4d};
    ${(props) => props.theme.fontMedium};
  }
  .item-percent {
    display: flex;
    align-items: center;
    ${(props) => props.theme.fontMedium};
    margin-left: auto;
  }
`;

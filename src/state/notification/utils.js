import { useCallback } from 'react';
import BigNumber from 'bignumber.js';

import { OrderDirs } from 'src/constants/interface';
import useWindowSize from 'src/hooks/useWindowSize';

import { OrderStatus } from 'js/constants/consts';
import { useIntl } from 'js/locals';
import { isNumber } from 'js/utils/digit';

// 按stopLimit的下单按钮计算，完整显示一条通知时的最小屏幕高度
export const minWindowHeightForNotification = 540;

export function useIsLessThanMinSafeHeight() {
  const { height } = useWindowSize();
  return height < minWindowHeightForNotification + 100;
}

export function useNotificationLimit() {
  const { height } = useWindowSize();
  const safeSpace = height - minWindowHeightForNotification;
  return Math.max(1, Math.floor((safeSpace - 16) / 92));
}

export function useCancelLimitDesc() {
  const intl = useIntl();
  return useCallback(
    ({ item }) => {
      const {
        baseToken,
        left_amount_display,
        quoteToken,
        orderDir,
        price_display,
      } = item;
      let desc = intl['notification.limit_desc_BUY_BASE_QUOTE_AMOUNT_PRICE'];
      if (orderDir === OrderDirs.SELL) {
        desc = intl['notification.limit_desc_SELL_BASE_QUOTE_AMOUNT_PRICE'];
      }
      return desc
        .replace('AMOUNT', left_amount_display)
        .replace('PRICE', price_display)
        .replace('BASE', baseToken?.symbol)
        .replace('QUOTE', quoteToken.symbol);
    },
    [intl]
  );
}

export function useCancelStopLimitDesc() {
  const intl = useIntl();
  return useCallback(
    ({ item }) => {
      const { baseToken, left_amount_display, orderDir } = item;
      let desc = intl['notification.stop_limit_desc_BUY_BASE_AMOUNT'];
      if (orderDir === OrderDirs?.SELL) {
        desc = intl['notification.stop_limit_desc_SELL_BASE_AMOUNT'];
      }
      return desc
        .replace('AMOUNT', left_amount_display)
        .replace('BASE', baseToken?.symbol);
    },
    [intl]
  );
}

export function useCancelMarketDesc() {
  const intl = useIntl();
  return useCallback(
    ({ item }) => {
      const {
        baseToken,
        quoteToken,
        left_amount_display,
        left_total_market_display,
        orderDir,
        fill_amount_bors,
      } = item;
      let msg = '';
      if (orderDir === OrderDirs.BUY) {
        if (fill_amount_bors) {
          // amount
          msg = intl['notification.cancel_market_desc_BUY_BASE_QUOTE_AMOUNT'];
        } else {
          msg = intl['notification.cancel_market_desc_BUY_BASE_QUOTE_TOTAL'];
        }
      } else if (fill_amount_bors) {
        // amount
        msg = intl['notification.cancel_market_desc_SELL_BASE_QUOTE_TOTAL'];
      } else {
        msg = intl['notification.cancel_market_desc_SELL_BASE_QUOTE_AMOUNT'];
      }

      return msg
        .replace('AMOUNT', left_amount_display)
        .replace('TOTAL', left_total_market_display)
        .replace('BASE', baseToken?.symbol)
        .replace('QUOTE', quoteToken.symbol);
    },
    [intl]
  );
}

export function useCancelGridDesc() {
  const intl = useIntl();
  return useCallback(
    ({ item }) => {
      const { base_token_symbol, quote_token_symbol, max_price, min_price } =
        item;
      return intl['notification.cancel_grid_desc_PAIR_PRICES']
        .replace('PAIR', `${base_token_symbol}/${quote_token_symbol}`)
        .replace('PRICES', `${min_price} - ${max_price}`);
    },
    [intl]
  );
}

export function useCancelDCADesc() {
  const intl = useIntl();
  return useCallback(
    ({ item }) => {
      const { base_token, quote_token } = item;
      return intl['notification.cancel_dca_desc_PAIR'].replace(
        'PAIR',
        `${base_token?.symbol}/${quote_token?.symbol}`
      );
    },
    [intl]
  );
}

export function useMobileText() {
  const intl = useIntl();

  return useCallback(
    ({ item }) => {
      const {
        filled_amount,
        filled_total,
        baseToken,
        quoteToken,
        orderDir,
        status,
      } = item;
      let text = intl['notification.mobile_trade_partially_AMOUNT_TOKEN'];
      if (status === OrderStatus.completed) {
        text = intl['notification.mobile_trade_filled_AMOUNT_TOKEN'];
      }
      if (orderDir === OrderDirs.BUY) {
        text = text
          .replace('AMOUNT', formatNumber(filled_amount))
          .replace('TOKEN', baseToken.symbol);
      } else {
        text = text
          .replace('AMOUNT', formatNumber(filled_total))
          .replace('TOKEN', quoteToken.symbol);
      }
      return text;
    },
    [intl]
  );
}

const formatNumber = (num) => {
  if (!isNumber(num)) return '';
  const numStr = `${num}`;
  if (numStr.includes('00000')) {
    return BigNumber(num).toExponential();
  }
  return num;
};

window.formatNumber = formatNumber;

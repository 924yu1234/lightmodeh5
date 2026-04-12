import EVENTS, { stringifyWithBigInt } from './EVENTS';
import log from './index';

export function logCreateGrid(logs) {
  return log([
    {
      id: EVENTS.dex_create_grid,
      event: 'grid create',
      log: stringifyWithBigInt(logs),
    },
  ]);
}

export function logConvertGridBalanceToQuoteOrder(logs) {
  return log([
    {
      id: EVENTS.convert_grid_balance_to_quote,
      event: 'grid convert order',
      log: stringifyWithBigInt(logs),
    },
  ]);
}

export function logCreateGridErr(logs) {
  return log([
    {
      id: EVENTS.dex_create_grid_err,
      event: 'grid create err',
      log: stringifyWithBigInt(logs),
    },
  ]);
}

export function logLimitOrder(logs) {
  return log([
    {
      id: EVENTS.dex_limit_order,
      event: 'limit order',
      log: stringifyWithBigInt(logs),
    },
  ]);
}

export function logStopLimitOrder(logs) {
  return log([
    {
      id: EVENTS.dex_stop_limit_order,
      event: 'stop limit order',
      log: stringifyWithBigInt(logs),
    },
  ]);
}

export function logLimitOrderErr(logs) {
  return log([
    {
      id: EVENTS.dex_limit_order_err,
      event: 'limit order err',
      log: stringifyWithBigInt(logs),
    },
  ]);
}

export function logMarketOrder(logs) {
  return log([
    {
      id: EVENTS.dex_market_order,
      event: 'market order',
      log: stringifyWithBigInt(logs),
    },
  ]);
}

export function logMarketOrderErr(logs) {
  return log([
    {
      id: EVENTS.dex_market_order_err,
      event: 'market order err',
      log: stringifyWithBigInt(logs),
    },
  ]);
}

export function logOrderNotification(logs) {
  return log([
    {
      id: EVENTS.dex_order_notification,
      event: 'order notification',
      log: stringifyWithBigInt(logs),
    },
  ]);
}

export function logDCA(logs) {
  return log([
    {
      id: EVENTS.dex_dca,
      event: 'DCA',
      log: stringifyWithBigInt(logs),
    },
  ]);
}

export function logDCAErr(logs) {
  return log([
    {
      id: EVENTS.dex_dca_err,
      event: 'DCA err',
      log: stringifyWithBigInt(logs),
    },
  ]);
}

export function logCancelOrder(logs) {
  return log([
    {
      id: EVENTS.cancel_order,
      event: 'dex cancel order',
      log: stringifyWithBigInt(logs),
    },
  ]);
}

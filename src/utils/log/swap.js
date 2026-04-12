import log from '.';
import EVENTS, { stringifyWithBigInt } from './EVENTS';

export function logDA(logs) {
  return log([
    {
      id: EVENTS.dex_da,
      event: 'da',
      log: stringifyWithBigInt(logs),
    },
  ]);
}

export function logSwap(logs) {
  return log([
    {
      id: EVENTS.dex_swap,
      event: 'swap',
      log: stringifyWithBigInt({ ...logs, timeStamp: Date.now() }),
    },
  ]);
}

export function logSwapErr(logs) {
  return log([
    {
      id: EVENTS.dex_swap_err,
      event: 'swap err',
      log: stringifyWithBigInt({ ...logs, timeStamp: Date.now() }),
    },
  ]);
}

export function logSwapOrder(logs) {
  return log([
    {
      id: EVENTS.dex_swap_order,
      event: 'swap order',
      log: stringifyWithBigInt({ ...logs, timeStamp: Date.now() }),
    },
  ]);
}

export function logEarn(logs) {
  return log([
    {
      id: EVENTS.dex_earn,
      event: 'earn',
      log: stringifyWithBigInt({ ...logs, timeStamp: Date.now() }),
    },
  ]);
}

export function logTurboRange(logs) {
  return log([
    {
      id: EVENTS.dex_turbo_range,
      event: 'turbo range',
      log: stringifyWithBigInt({ ...logs, timeStamp: Date.now() }),
    },
  ]);
}

export function logBridgeUsdc(logs) {
  return log([
    {
      id: EVENTS.dex_bridge_usdc,
      event: 'bridge usdc',
      log: stringifyWithBigInt({ ...logs, timeStamp: Date.now() }),
    },
  ]);
}

export function logSendV2(logs) {
  return log([
    {
      id: EVENTS.dex_send_v2,
      event: 'send v2',
      log: stringifyWithBigInt({ ...logs, timeStamp: Date.now() }),
    },
  ]);
}
export function logSend(logs) {
  return log([
    {
      id: EVENTS.dex_send,
      event: 'send',
      log: stringifyWithBigInt({ ...logs, timeStamp: Date.now() }),
    },
  ]);
}

export function logNetworkFee(logs) {
  return log([
    {
      id: EVENTS.network_fee,
      event: 'network_fee',
      log: stringifyWithBigInt(logs),
    },
  ]);
}

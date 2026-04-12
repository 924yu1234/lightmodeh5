import EVENTS, { stringifyWithBigInt } from './EVENTS';
import log from './index';

export function logWebsocket(logs) {
  return log([
    {
      id: EVENTS.dex_ws,
      event: 'user ws',
      log: stringifyWithBigInt(logs),
    },
  ]);
}

export function logUserWebsocket(logs) {
  return log([
    {
      id: EVENTS.dex_ws_user,
      event: 'user ws',
      log: stringifyWithBigInt(logs),
    },
  ]);
}

export function logDexRegister(logs) {
  return log([
    {
      id: EVENTS.dex_register,
      event: 'dex register',
      log: stringifyWithBigInt(logs),
    },
  ]);
}

export function logDexConnectWallet(logs) {
  return log([
    {
      id: EVENTS.dex_connectWallet,
      event: 'dex connectWallet',
      log: stringifyWithBigInt(logs),
    },
  ]);
}

export function logUnlock(logs) {
  return log([
    {
      id: EVENTS.dex_unlock,
      event: 'dex unlock',
      log: stringifyWithBigInt(logs),
    },
  ]);
}

export function logSignToView(logs) {
  return log([
    {
      id: EVENTS.dex_sign_to_view,
      event: 'dex signToView',
      log: stringifyWithBigInt(logs),
    },
  ]);
}

export function logLock(logs) {
  return log([
    {
      id: EVENTS.dex_lock,
      event: 'dex lock',
      log: stringifyWithBigInt(logs),
    },
  ]);
}

export function logExport(logs) {
  return log([
    {
      id: EVENTS.dex_export,
      event: 'dex export',
      log: stringifyWithBigInt(logs),
    },
  ]);
}

export function logDeposit(logs) {
  return log([
    {
      id: EVENTS.dex_deposit,
      event: 'dex deposit',
      log: stringifyWithBigInt(logs),
    },
  ]);
}

export function logPayDeposit(logs) {
  return log([
    {
      id: EVENTS.dex_payDeposit,
      event: 'dex payDeposit',
      log: stringifyWithBigInt(logs),
    },
  ]);
}

export function logApproveToken(logs) {
  return log([
    {
      id: EVENTS.dex_approve,
      event: 'dex approveToken',
      log: stringifyWithBigInt(logs),
    },
  ]);
}

export function logRegisterToken(logs) {
  return log([
    {
      id: EVENTS.dex_registerToken,
      event: 'dex registerToken',
      log: stringifyWithBigInt(logs),
    },
  ]);
}

export function logWithdraw(logs) {
  return log([
    {
      id: EVENTS.dex_withdraw,
      event: 'dex withdraw',
      log: stringifyWithBigInt(logs),
    },
  ]);
}

export function logInternalTransfer(logs) {
  return log([
    {
      id: EVENTS.dex_internal_transfer,
      event: 'dex internalTransfer',
      log: stringifyWithBigInt(logs),
    },
  ]);
}

export function logDexBalance(logs) {
  return log([
    {
      id: EVENTS.dex_balance,
      event: 'dex balance',
      log: stringifyWithBigInt(logs),
    },
  ]);
}

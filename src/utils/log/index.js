// UED: disable all log/tracking requests
const IS_UED = true;
import axios from 'axios';
import { debounce } from 'lodash';

import { LOG_API } from 'js/constants/dex';

import { logger } from '../logger';
import EVENTS, { stringifyWithBigInt } from './EVENTS';

export function logPerformance(logs) {
  return log([
    {
      id: EVENTS.performance,
      event: 'performance',
      log: stringifyWithBigInt(logs),
    },
  ]);
}

export function logRequest(logs) {
  return log([
    {
      id: EVENTS.api_request,
      event: 'request',
      log: stringifyWithBigInt(logs),
    },
  ]);
}

export function logBalance(logs) {
  return log([
    {
      id: EVENTS.get_balance,
      event: 'balance',
      log: stringifyWithBigInt(logs),
    },
  ]);
}

export function logWalletError(logs) {
  return log([
    {
      id: EVENTS.dex_wallet_err,
      event: 'wallet',
      log: stringifyWithBigInt(logs),
    },
  ]);
}

export function logEventTrack(logs) {
  return log([
    {
      id: EVENTS.dex_event_track,
      event: 'wallet',
      log: stringifyWithBigInt(logs),
    },
  ]);
}

export function logWallet(logs) {
  logger.info('log wallet', logs);
  return doLog([
    {
      id: EVENTS.dex_wallet,
      event: 'wallet',
      log: stringifyWithBigInt(logs),
      uuid: window.uuid,
      p_addr: window.login_account,
      isMobile: window.isMobile,
      ts: new Date().getTime(),
    },
  ]);
}

export function logCsp(logs) {
  logger.info('log csp', logs);
  return log([
    {
      id: EVENTS.dex_csp,
      event: 'CSP',
      log: stringifyWithBigInt(logs),
    },
  ]);
}

export function logCountdown(logs) {
  return log([
    {
      id: EVENTS.dex_countdown,
      event: 'countdown',
      log: stringifyWithBigInt(logs),
    },
  ]);
}

export function logAirdrop(logs) {
  return log([
    {
      id: EVENTS.dex_airdrop,
      event: 'airdrop',
      log: stringifyWithBigInt(logs),
    },
  ]);
}

export function logCommon(logs) {
  return log([
    {
      id: EVENTS.common_log,
      event: 'common',
      log: stringifyWithBigInt(logs),
    },
  ]);
}

export function logAPPH5(logs) {
  return log([
    {
      id: EVENTS.app_log,
      event: 'app_h5',
      log: stringifyWithBigInt(logs),
    },
  ]);
}

let _events = [];
const debounced = debounce(doLog, 3000, { maxWait: 10000, leading: true });
export default function log(events) {
  _events = _events.concat(
    events.map((e) => ({
      p_addr: window.login_account,
      uuid: window.uuid,
      isMobile: window.isMobile,
      ts: new Date().getTime(),
      ...e,
      event: `${e.event} ${Date.now()}`,
    }))
  );
  debounced(_events);
}

let preTime = 0;
function doLog(events, retries = 3) {
  _events = [];
  const p_id = 'degate-web';
  const data = {
    p_id,
    t: '',
    events,
  };
  const d = Buffer.from(JSON.stringify(data)).toString('base64');
  logger.table(data.events);
  if (!LOG_API) {
    return;
  }
  const now = Date.now();
  if (now - preTime < 500) {
    return;
  }
  preTime = now;

  axios({
    method: 'POST',
    url: `${LOG_API}/r.gif`,
    data: { d },
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    transformRequest: [
      (postDataObj) => {
        let ret = '';
        Object.keys(postDataObj).forEach((itemKey) => {
          ret += `${encodeURIComponent(itemKey)}=${encodeURIComponent(
            postDataObj[itemKey]
          )}`;
        });
        return ret;
      },
    ],
  }).catch((error) => {
    if (error?.code === 'ECONNABORTED' || error?.message === 'Network Error') {
      if (retries > 1) {
        setTimeout(() => {
          doLog(events, retries - 1);
        }, 2000);
      } else {
        _events = events.concat(_events);
      }
    }
  });
}

export function logIntentTryCreate(logs) {
  return log([
    {
      id: EVENTS.dex_intent_try_create,
      event: 'intent try create',
      log: stringifyWithBigInt(logs),
    },
  ]);
}

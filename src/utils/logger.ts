/* eslint-disable no-console */
/* eslint no-unused-expressions: 0 */

import { isMainnet } from 'js/constants/dex';

export const logger = {
  debug(...args: any[]) {
    !isMainnet && console.debug(...args);
  },
  log(...args: any[]) {
    !isMainnet && console.log(...args);
  },
  info(...args: any[]) {
    !isMainnet && console.info(...args);
  },
  table(...args: any[]) {
    !isMainnet && console.table(...args);
  },
  time(...args: any[]) {
    !isMainnet && console.time(...args);
  },
  timeEnd(...args: any[]) {
    !isMainnet && console.timeEnd(...args);
  },
  warn(...args: any[]) {
    console.warn(...args);
  },
  error(...args: any[]) {
    console.error(...args);
  },
};

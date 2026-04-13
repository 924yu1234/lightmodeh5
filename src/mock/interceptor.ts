/**
 * UED Mock — per-endpoint mock system.
 *
 * Default: ALL requests go to real dev backend (using real accessToken).
 * Mock: ONLY endpoints explicitly registered in src/mock/data/index.ts are mocked.
 *
 * When UED develops new features with new endpoints, add them to mockRoutes.
 * Once trade-fe implements the real endpoint, remove from mockRoutes to use real API.
 */
import axios from 'axios';

import { mockRoutes } from './data';

let networkDelay = 0;
let simulateError = false;

export function setMockNetworkDelay(ms: number) {
  networkDelay = ms;
}

export function setMockSimulateError(enabled: boolean) {
  simulateError = enabled;
}

function matchRoute(url: string, params?: any): any {
  if (!url) return undefined;
  for (const route of mockRoutes) {
    if (!url.includes(route.pattern)) {
      // eslint-disable-next-line no-continue
    } else if (route.paramMatch && params) {
      const matches = Object.entries(route.paramMatch).every(
        ([key, val]) => params[key] === val
      );
      if (matches) return { matched: true, data: route.data };
    } else {
      return { matched: true, data: route.data };
    }
  }
  return undefined;
}

function delay(ms: number): Promise<void> {
  if (ms <= 0) return Promise.resolve();
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

const defaultAdapter = axios.defaults.adapter;

/**
 * Register selective mock on DG_API axios instance.
 *
 * Only intercepts endpoints listed in mockRoutes.
 * Everything else passes through to real dev backend.
 */
export function registerDgApiMock(axiosInstance: any) {
  const originalAdapter = axiosInstance.defaults.adapter || defaultAdapter;

  axiosInstance.defaults.adapter = async (config: any) => {
    const url = config.url || '';
    const match = matchRoute(url, config.params);

    if (match) {
      // This endpoint is mocked
      if (networkDelay > 0) await delay(networkDelay);

      if (simulateError && Math.random() < 0.2) {
        return Promise.reject({
          response: {
            status: 500,
            data: { code: 500, message: 'Mock error' },
          },
          config,
        });
      }

      // eslint-disable-next-line no-console
      console.debug('[UED Mock] Mocked:', url);
      return {
        data: {
          data: match.data,
          code: 0,
          message: 'ok',
        },
        status: 200,
        statusText: 'OK',
        headers: { 'content-type': 'application/json' },
        config,
      };
    }

    // Not mocked → real backend
    if (typeof originalAdapter === 'function') {
      return originalAdapter(config);
    }
    return (axios.defaults.adapter as any)(config);
  };
}

/**
 * HUB_API: no mock, all real.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function registerHubApiMock(_axiosInstance: any) {
  // no-op
}

export function setupMockInterceptors() {
  // eslint-disable-next-line no-console
  console.log(
    '[UED Mock] Per-endpoint mock active. Only endpoints in mockRoutes are mocked.'
  );
}

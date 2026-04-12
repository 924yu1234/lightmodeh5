/* eslint-disable no-param-reassign */
import axios from 'axios';
import { get } from 'lodash';

import { HUB_API } from 'js/constants/dex';

import { logRequest } from './log';
import { logger } from './logger';

const CancelToken = axios.CancelToken;
const axiosService = axios.create();

axiosService.defaults.timeout = 30000;
axiosService.defaults.baseURL = HUB_API;

// ===== UED: HUB_API uses real backend (all public endpoints) =====

axiosService.interceptors.request.use(
  (config) => {
    config.headers = {
      'Content-Type': 'application/json;charset=utf-8',
      ...config.headers,
    };

    // 如果是POST请求，记录GA事件
    if (config.method?.toLowerCase() === 'post') {
      if (window.gaEvent) {
        window.gaEvent('api_post_request', {
          url: config.url,
        });
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// http response 封装后台返回拦截器
axiosService.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const { code, message } = error?.response?.data ?? {};
    if (error?.config?.method?.toLowerCase() === 'post') {
      if (window.gaEvent) {
        window.gaEvent('api_post_request', {
          url: error?.config?.url,
          error_message: message,
          error_code: code,
        });
      }
    }
    if (code === 451) {
      return Promise.reject({ code, message });
    }
    if (code === 403) {
      return Promise.reject({ code, message: window?.intl?.common_err });
    }
    if (error.code === 'ECONNABORTED' || error.message === 'Network Error') {
      return Promise.reject(error);
    }
    if (error && error.response) {
      const data = get(error, 'response.data');
      error.data = data;
      switch (error?.response?.status) {
        case 401:
        case -401:
          return Promise.reject({
            code:
              data.message === 'Time exceeds the setting'
                ? 401401
                : error?.response?.status,
          });
        case 429:
          return Promise.reject({
            code: 429,
            message: window?.intl?.rate_limit_err,
          });
        case 403:
          return Promise.reject({ code, message: window?.intl?.common_err });
        default:
          return Promise.reject(error?.response?.data ?? error?.response);
      }
    }
    return Promise.reject(new Error(window?.intl?.common_err));
  }
);

export { CancelToken };

const retryInterval = 2000;

const disabledRetryUrls: string[] = [];

interface CacheEntry {
  data: unknown;
  timestamp: number;
}

const requestCache: Map<string, CacheEntry> = new Map();

function getCacheKey(url: string, params?: Record<string, unknown>): string {
  return `${url}:${JSON.stringify(params || {})}`;
}

const DEFAULT_CACHE_TIME = 30 * 60 * 1000; // 30 minutes

export interface RequestParams {
  url: string;
  method?: string;
  params?: Record<string, unknown>;
  data?: unknown;
  cacheTime?: number; // cache time-to-live in ms, defaults to 30 min if set to true-ish
  [key: string]: unknown;
}

export default function makeRequest(
  params: RequestParams | Record<string, unknown>,
  maxRetries = 2
): Promise<unknown> {
  const {
    cacheTime = DEFAULT_CACHE_TIME,
    url,
    params: queryParams,
  } = params as RequestParams;

  if (cacheTime) {
    const ttl = cacheTime;
    const cacheKey = getCacheKey(url, queryParams);
    const cached = requestCache.get(cacheKey);
    const now = Date.now();

    if (cached && now - cached.timestamp < ttl) {
      return Promise.resolve(cached.data);
    }

    return axiosService(params)
      .then((data) => {
        requestCache.set(cacheKey, { data, timestamp: Date.now() });
        return data;
      })
      .catch((error) => {
        return handleRequestError(error, params, maxRetries);
      });
  }

  return axiosService(params).catch((error) => {
    return handleRequestError(error, params, maxRetries);
  });
}

function handleRequestError(
  error: unknown,
  params: RequestParams | Record<string, unknown>,
  maxRetries: number
): Promise<unknown> {
  if (axios.isCancel(error)) {
    logger.log('Request canceled:', (error as { message?: string }).message);
  } else if (
    (error as { code?: string }).code === 'ECONNABORTED' ||
    (error as { message?: string }).message === 'Network Error'
  ) {
    if (
      maxRetries > 0 &&
      !disabledRetryUrls.some((url) =>
        (params as RequestParams)?.url?.includes(url)
      )
    ) {
      logger.log('Request timeout, retrying...');
      return new Promise((resolve) =>
        // eslint-disable-next-line no-promise-executor-return
        setTimeout(() => {
          logRequest({
            method: `hub request retrying`,
            url: (params as RequestParams)?.url,
          });
          resolve(makeRequest(params, maxRetries - 1));
        }, retryInterval)
      );
    }
    logger.log('Request timeout, no more retries.');
  }
  return Promise.reject(error);
}

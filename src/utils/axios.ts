/* eslint-disable no-param-reassign */
import { useCallback } from 'react';
import axios from 'axios';
import { get } from 'lodash';

import { ModalKeys } from 'src/state/application/reducer';

import {
  ACCOUNT_IS_UPDATING,
  ACCOUNT_IS_UPDATING_2,
  SIGN_TO_VIEW_SIGNATURE_ERR,
  SIGNATURE_ERR,
  USER_NOT_FUND,
  Valid_Unitl_Error,
} from 'js/constants/apiErr';
import { DG_API } from 'js/constants/dex';
import { useIntl } from 'js/locals';
import useWallet, {
  useWalletOprs,
  useWalletWeb3,
} from 'js/providers/useWallet';
import { useDexChainId, useShowModal } from 'js/state/application/hooks';
import { useRefreshDexAccount } from 'js/state/dexAccount/hooks';
import { useShowRegionTips } from 'js/state/regionCheck/hooks';

import { logRequest } from './log';
import { logger } from './logger';

const CancelToken = axios.CancelToken;
const axiosService = axios.create();

axiosService.defaults.timeout = 30000;
axiosService.defaults.baseURL = DG_API;

// ===== UED: mock only for specific new-feature endpoints (see src/mock/interceptor.ts) =====
import { registerDgApiMock } from 'src/mock/interceptor';
registerDgApiMock(axiosService);
// ===== END UED MOCK =====

axiosService.interceptors.request.use(
  (config) => {
    config.headers = {
      'Content-Type': 'application/json;charset=utf-8',
      ...config.headers,
      source: window.isMobile ? 'degate_mobile' : 'degate_web',
    };

    if (window._degate_app) {
      config.headers['device-id'] = window._degate_app.deviceId;
    }

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
    const { data, code, message, token } = response?.data ?? {};
    if (code !== 0) {
      logRequest({
        method: `h5 request error`,
        url: response?.config?.url,
        error: { code, message },
        log_error: 'api error',
      });

      return Promise.reject({ data, code, message, token });
    }
    return { data, code, message, token };
  },
  (error) => {
    const { code, message } = error?.response?.data ?? {};
    if (code !== USER_NOT_FUND || code !== 3001) {
      logRequest({
        method: `h5 request error`,
        url: error?.config?.url,
        message: error?.message,
        headers: {
          id: error?.config?.headers?.['account-id'],
          owner: error?.config?.headers?.owner,
          ts: error?.config?.headers?.time,
        },
        status: error?.response?.status,
        error: { code, message },
        log_error: 'api error',
      });
    }
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

export function useHandleCommonErr() {
  const { account } = useWalletWeb3();
  const dexChainId = useDexChainId();
  const { lock } = useWalletOprs();
  const refreshDexAccount = useRefreshDexAccount();
  const showRegionTips = useShowRegionTips();
  const { updateAccessToken } = useWalletOprs();
  const intl = useIntl();
  const showModal = useShowModal();

  return useCallback(
    (err: any) => {
      const errCode = err?.code ?? err?.data?.code;
      if (errCode === SIGNATURE_ERR) {
        lock();
        refreshDexAccount();
        return Promise.reject({ ...err, handled: true });
      }

      if (errCode === 451) {
        showRegionTips();
        return Promise.reject({ ...err, handled: true });
      }

      if (errCode === 401) {
        refreshDexAccount();
        updateAccessToken('', account, '');
        return Promise.reject({ ...err, handled: true });
      }

      if (err?.code === SIGN_TO_VIEW_SIGNATURE_ERR) {
        showModal({ modal: ModalKeys.tips_signToViewTimeError });
        return Promise.reject({ ...err, handled: true });
      }
      if (
        errCode === ACCOUNT_IS_UPDATING ||
        errCode === ACCOUNT_IS_UPDATING_2
      ) {
        Promise.reject({
          code: errCode,
          handled: true,
          message: intl['menu.reset_processing_title'],
        });
      }
      if (errCode === Valid_Unitl_Error) {
        return Promise.reject({
          code: errCode,
          handled: true,
          message: intl.err_valid_until,
        });
      }

      return Promise.reject(err);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [account, dexChainId, intl]
  );
}

// 有可能wallet调用api需要用到accessToken，由wallet自行传递accessToken
export function useCreateHeaders() {
  const { accessToken } = useWallet();
  return useCallback(() => {
    if (!accessToken?.token) return {};
    return {
      Authorization: `Bearer ${accessToken?.token}`,
    };
  }, [accessToken?.token]);
}

const retryInterval = 2000;

const disabledRetryUrls = [
  '/order-book-api/intent/v2/compact_create',
  '/order-book-api/intent/v2/sign',
];

export default function makeRequest(
  params: any,
  maxRetries = 2,
  disableAppPromise = false
): Promise<any> {
  const isSyncPrivy = location?.href?.includes('syncPrivy');
  const isSwapInfo = location?.href?.includes('swap/info');
  if (
    window.isApp &&
    window === window.top &&
    !disableAppPromise &&
    !isSyncPrivy &&
    !isSwapInfo
  ) {
    const callAppPromise = window.callAppPromise;
    if (!callAppPromise) {
      return makeRequest(params, maxRetries, true);
    }
    try {
      return callAppPromise('httpRequest', {
        cacheTime: 30 * 60 * 1000, // 30 minutes
        ...params,
      }).catch((error: any) => {
        if (!error?.includes('不支持的HTTP请求路径')) {
          logRequest({
            event: 'APP httpRequest error',
            url: params?.url,
            error,
          });
        }
        return makeRequest(params, maxRetries, true);
      });
    } catch (error) {
      logRequest({
        event: 'APP httpRequest error',
        url: params?.url,
        error,
      });
      return makeRequest(params, maxRetries, true);
    }
  }

  return axiosService(params).catch((error) => {
    if (axios.isCancel(error)) {
      logger.log('Request canceled:', error.message);
    } else if (
      error.code === 'ECONNABORTED' ||
      error.message === 'Network Error'
    ) {
      if (
        maxRetries > 0 &&
        !disabledRetryUrls.some((url) => params?.url?.includes(url))
      ) {
        logger.log('Request timeout, retrying...');
        return new Promise((resolve) =>
          // eslint-disable-next-line no-promise-executor-return
          setTimeout(() => {
            logRequest({
              method: `h5 request retrying`,
              url: params?.url,
            });
            resolve(makeRequest(params, maxRetries - 1));
          }, retryInterval)
        );
      }
      logger.log('Request timeout, no more retries.');
    }
    return Promise.reject(error);
  });
}

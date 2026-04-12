import { useCallback } from 'react';

import { logRequest } from 'src/utils/log';

import axios, { useCreateHeaders, useHandleCommonErr } from 'js/utils/axios';

export const getDexAccount = ({ account }) => {
  const preTime = Date.now();
  return axios({
    method: 'GET',
    url: `order-book-api/account?owner=${account}`,
  }).then((resp) => {
    const curTime = Date.now();
    const serverTime = resp?.data?.server_time || Date.now();
    let timeDiff = 0;
    if (serverTime <= preTime - 15000) {
      timeDiff = serverTime - preTime; // < 0 本地快了
    } else if (serverTime >= curTime + 15000) {
      timeDiff = serverTime - curTime; // > 0 本地慢了
    }

    if (timeDiff) {
      logRequest({
        log_errror: 'time error',
        method: 'localTimeDiff',
        localeTime: curTime,
        serverTime,
      });
    }
    return { ...resp.data, localTimeDiff: timeDiff };
  });
};

export const usePostSyncToApp = () => {
  const handleCommonErr = useHandleCommonErr();

  return useCallback(
    ({ uuid, hash }) => {
      return axios({
        method: 'POST',
        url: '/order-book-api/mobile/sync',
        data: { uuid, hash },
      })
        .then((resp) => {
          const data = resp?.data;
          return data;
        })
        .catch((err) => handleCommonErr(err));
    },
    [handleCommonErr]
  );
};

export function useGetListTotal() {
  const createHeaders = useCreateHeaders();
  return useCallback(
    (params, source = '') => {
      const headers = createHeaders();
      return axios({
        method: 'POST',
        url:
          source === 'gridMarketplace'
            ? 'order-book-api/gridLanding/list/total'
            : 'order-book-api/user/list/total',
        data: params,
        headers,
      }).then((resp) => resp.data);
    },
    [createHeaders]
  );
}

export const fetchAccessToken = ({ time, ecdsa_signature, wallet_id }) => {
  return axios({
    method: 'POST',
    url: '/order-book-api/intent/access/token',
    data: {
      wallet_id,
      time,
      ecdsa_signature,
      account_index: 0,
    },
  }).then((resp) => resp.data);
};

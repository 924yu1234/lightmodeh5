import { useCallback } from 'react';

import axios, { useCreateHeaders, useHandleCommonErr } from 'js/utils/axios';

export function useFetchExportDataStatus() {
  const handleCommonErr = useHandleCommonErr();
  const createHeaders = useCreateHeaders();
  return useCallback(
    ({ id = -1 }) => {
      const headers = createHeaders();
      return axios({
        method: 'GET',
        url: '/order-book-api/user/downloadHistoricalData',
        headers,
        params: {
          id,
        },
      })
        .then((resp) => {
          const data = resp.data;
          return data || {};
        })
        .catch((err) => handleCommonErr(err));
    },
    [handleCommonErr, createHeaders]
  );
}

const map = {
  ORDER: 'order',
  TRADE: 'trade',
};

export function useCreateExportData() {
  const handleCommonErr = useHandleCommonErr();
  const createHeaders = useCreateHeaders();
  return useCallback(
    ({ type, includeGridStrategyOrders }) => {
      const headers = createHeaders();
      return axios({
        method: 'POST',
        url: '/order-book-api/user/downloadHistoricalData',
        headers,
        data: {
          type: map[type],
          include_grid: includeGridStrategyOrders,
        },
      })
        .then((resp) => {
          const data = resp.data;
          return data;
        })
        .catch((err) => handleCommonErr(err));
    },
    [handleCommonErr, createHeaders]
  );
}

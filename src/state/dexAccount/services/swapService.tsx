import { useCallback } from 'react';

import axios, { useCreateHeaders, useHandleCommonErr } from 'js/utils/axios';

export const usePostSwapOrder = () => {
  const handleCommonErr = useHandleCommonErr();
  const createHeaders = useCreateHeaders();

  return useCallback(
    ({ order }: any) => {
      const headers = createHeaders();
      return axios({
        method: 'POST',
        url: '/order-book-api/intent/order',
        data: order,
        headers,
      })
        .then((resp: any) => {
          return resp?.data;
        })
        .catch((err) => handleCommonErr(err));
    },
    [handleCommonErr, createHeaders]
  );
};

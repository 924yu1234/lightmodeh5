import { useCallback } from 'react';

import { useDexAccount } from 'js/state/dexAccount/hooks';
import axios, { useCreateHeaders, useHandleCommonErr } from 'js/utils/axios';

export const useFetchListenKey = () => {
  const createHeaders = useCreateHeaders();
  const dexAccount = useDexAccount();
  return useCallback(() => {
    const headers = createHeaders();
    return axios({
      url: `/order-book-ws-api/intent/userDataStream`,
      method: 'POST',
      headers,
    }).then((resp) => {
      return {
        ...resp.data,
        account: dexAccount?.account,
      };
    });
  }, [createHeaders, dexAccount?.account]);
};

export const useRefreshListenKey = () => {
  const handleCommonErr = useHandleCommonErr();
  const createHeaders = useCreateHeaders();
  return useCallback(
    ({ listenKey }) => {
      const headers = createHeaders();
      return axios({
        url: `/order-book-ws-api/intent/userDataStream`,
        method: 'PUT',
        headers,
        data: {
          listenKey,
        },
      })
        .then((resp) => {
          return resp.data;
        })
        .catch((err) => handleCommonErr(err));
    },
    [handleCommonErr, createHeaders]
  );
};

import { useCallback } from 'react';

import axios, { useCreateHeaders } from 'js/utils/axios';

import { useDexAccount } from '../dexAccount/hooks';

export const useGetIntents = () => {
  const createHeaders = useCreateHeaders();
  const dexAccount = useDexAccount();

  return useCallback(() => {
    const headers = createHeaders();
    return axios({
      url: `/order-book-api/operation/reward`,
      method: 'GET',
      params: {
        owner: dexAccount?.account,
      },
      headers,
    }).then((resp: any) => {
      return resp.data;
    });
  }, [createHeaders, dexAccount?.account]);
};

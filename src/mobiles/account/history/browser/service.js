import { useCallback } from 'react';
import dayjs from 'dayjs';

import { useDexAccount } from 'src/state/dexAccount/hooks';

import axios, { useCreateHeaders, useHandleCommonErr } from 'js/utils/axios';

export function useFetchBrowserHistory() {
  const handleCommonErr = useHandleCommonErr();
  const createHeaders = useCreateHeaders();
  const dexAccount = useDexAccount();

  return useCallback(
    ({ current, pageSize, searchToken, start, end, withdraw_id }) => {
      if (!dexAccount.hasAccessToken) {
        return Promise.resolve({
          list: [],
          hasNext: false,
        });
      }
      const headers = createHeaders();
      return axios({
        method: 'GET',
        url: '/order-book-api/browser/contract-calls',
        params: {
          limit: pageSize,
          offset: (current - 1) * pageSize,
          allType: true,
          tokens: searchToken?.id,
          start,
          end,
          withdraw_id,
        },
        headers,
      })
        .then((resp) => {
          const data = resp.data;
          return {
            total: data.total,
            list: (data.list || []).map((d) => {
              return {
                ...d,
                chain: d.chain_name,
                create_time_display: dayjs(d.create_time * 1000).format(
                  'YYYY-MM-DD HH:mm:ss'
                ),
                create_time_day: dayjs(d.create_time * 1000).format(
                  'YYYY-MM-DD'
                ),
              };
            }),
          };
        })
        .catch((err) => handleCommonErr(err));
    },
    [dexAccount.hasAccessToken, handleCommonErr, createHeaders]
  );
}

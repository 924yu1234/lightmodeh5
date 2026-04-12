/* eslint-disable no-unused-vars */
import { useCallback } from 'react';

import { useCreateHeaders, useHandleCommonErr } from 'js/utils/axios';
import { yearFormat } from 'js/utils/timeFormat';

export function useFetchAccountActivity() {
  const handleCommonErr = useHandleCommonErr();
  const createHeaders = useCreateHeaders();

  return useCallback(
    ({ current, pageSize, start, end }) => {
      return Promise.resolve({
        hasNext: false,
        list: [],
      });
      // const headers = createHeaders();
      // return axios({
      //   method: 'GET',
      //   url: '/order-book-api/intent/user/otherRecords',
      //   params: {
      //     limit: pageSize,
      //     offset: (current - 1) * pageSize,
      //     start,
      //     end,
      //   },
      //   headers,
      // })
      //   .then((resp) => {
      //     const data = resp.data;
      //     return {
      //       ...data,
      //       hasNext: data.has_next_page,
      //       list: data.list || [],
      //     };
      //   })
      //   .catch((err) => handleCommonErr(err));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [handleCommonErr, createHeaders, yearFormat]
  );
}

import { useCallback } from 'react';

import axios, { useCreateHeaders, useHandleCommonErr } from 'src/utils/axios';

export function useSubmitWithdrawDA() {
  const createHeader = useCreateHeaders();
  return useCallback(
    ({ data }) => {
      const headers = createHeader();
      return axios({
        method: 'POST',
        url: '/order-book-api/intent/user/withdrawals',
        data,
        headers,
      }).then((resp) => {
        return resp.data;
      });
    },
    [createHeader]
  );
}

export function submitWithdraw({ data }) {
  return axios({
    method: 'POST',
    url: '/order-book-api/user/withdrawals',
    data,
  }).then((resp) => resp.data);
}

export const useCheckLeaveSurvey = () => {
  const handleCommonErr = useHandleCommonErr();
  const createHeaders = useCreateHeaders();
  return useCallback(async () => {
    const headers = createHeaders();

    return axios({
      method: 'GET',
      url: '/order-book-api/questionnaire/leave',
      headers,
    })
      .then((resp) => resp)
      .catch((err) => handleCommonErr(err));
  }, [handleCommonErr, createHeaders]);
};

export const useSendLeaveSurvey = () => {
  const handleCommonErr = useHandleCommonErr();
  const createHeaders = useCreateHeaders();
  return useCallback(
    async ({ reason, other }) => {
      const headers = createHeaders();

      return axios({
        method: 'POST',
        url: '/order-book-api/questionnaire/leave',
        headers,
        data: {
          reason,
          other,
        },
      })
        .then((resp) => resp)
        .catch((err) => handleCommonErr(err));
    },
    [handleCommonErr, createHeaders]
  );
};

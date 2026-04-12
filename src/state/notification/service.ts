import { useCallback } from 'react';

import axios, { useCreateHeaders, useHandleCommonErr } from 'js/utils/axios';

import { useDexAccount } from '../dexAccount/hooks';

export const useFetchServerMessages = () => {
  const handleCommonErr = useHandleCommonErr();
  const createHeaders = useCreateHeaders();
  const dexAccount = useDexAccount();
  return useCallback(
    ({ limit, type }: any) => {
      if (!dexAccount.hasAccessToken) {
        return Promise.resolve({
          list: [],
          hasNext: false,
        });
      }
      const headers = createHeaders();
      return axios({
        url: `/order-book-api/user/notification`,
        method: 'GET',
        params: {
          limit,
          type,
        },
        headers,
      })
        .then((resp: any) => {
          const { list, has_next_page } = resp?.data ?? {};
          return {
            list: list || [],
            hasNext: has_next_page,
          };
        })
        .catch((err) => handleCommonErr(err));
    },
    [dexAccount.hasAccessToken, handleCommonErr, createHeaders]
  );
};

export const useReadServerMessages = () => {
  const handleCommonErr = useHandleCommonErr();
  const createHeaders = useCreateHeaders();
  const dexAccount = useDexAccount();
  return useCallback(
    ({ ids }: any) => {
      if (!dexAccount.hasAccessToken) {
        return Promise.reject();
      }
      const headers = createHeaders();
      return axios({
        url: `/order-book-api/user/notification`,
        method: 'PUT',
        data: {
          id_list: ids,
        },
        headers,
      }).catch((err) => handleCommonErr(err));
    },
    [dexAccount.hasAccessToken, handleCommonErr, createHeaders]
  );
};

export const fetchBanner = () => {
  return axios({
    url: `/order-book-api/banner/notification`,
    method: 'GET',
  }).then((resp: any) => {
    return (resp.data || []).map((d: any) => {
      return {
        ...d,
        key: d.i18n_list?.[0]?.i18n_key,
        i18n: d.i18n_list.reduce((re: any, item: any) => {
          re[item.locale] = item.i18n_value;
          return re;
        }, {}),
      };
    });
  });
};

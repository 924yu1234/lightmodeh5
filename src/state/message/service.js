import { useCallback } from 'react';
import { last } from 'lodash';

import { useDexAccount } from 'js/state/dexAccount/hooks';
import axios, { useCreateHeaders, useHandleCommonErr } from 'js/utils/axios';

export const useFetchAllNewAssetMessages = () => {
  const fetchAssetMessages = useFetchAssetMessages();
  const dexAccount = useDexAccount();
  const pageSize = 100;

  const fetchedAllMessages = useCallback(
    ({ hasNext, preList = [], current = 1, start, end, unread = 0 }) => {
      return new Promise((resolve) => {
        if (!hasNext || last(preList)?.create_time < start) {
          resolve({
            list: preList,
            unread,
          });
          return;
        }
        fetchAssetMessages({
          current,
          pageSize,
          pre: [],
          start,
          end,
        }).then((resp) => {
          resolve(
            fetchedAllMessages({
              hasNext: resp.hasNext,
              preList: preList.concat(resp.list),
              unread: resp.unread + unread,
              current: current + 1,
              start,
              end,
            })
          );
        });
      });
    },
    [fetchAssetMessages]
  );

  return useCallback(
    ({ start }) => {
      if (!dexAccount.hasAccessToken) return Promise.resolve([]);
      return fetchedAllMessages({
        hasNext: true,
        current: 1,
        unread: 0,
        preList: [],
        start,
        end: Math.ceil(new Date().valueOf() / 1000),
      });
    },
    [fetchedAllMessages, dexAccount?.hasAccessToken]
  );
};

export const useFetchAssetMessages = () => {
  const handleCommonErr = useHandleCommonErr();
  const createHeaders = useCreateHeaders();
  const dexAccount = useDexAccount();

  return useCallback(
    // eslint-disable-next-line no-unused-vars
    ({ current, pageSize, start, end }) => {
      const headers = createHeaders();
      if (!dexAccount.hasAccessToken) {
        return Promise.resolve({
          list: [],
          unread: 0,
          hasNext: false,
        });
      }
      return axios({
        url: `/order-book-api/notification/da/all`,
        method: 'GET',
        params: {
          limit: pageSize,
          offset: (current - 1) * pageSize,
          start,
          end,
        },
        headers,
      })
        .then((resp) => {
          const { general, order, total, unread } = resp?.data ?? {};
          const res = {
            unread,
            list: (general || [])
              .concat(order || [])
              .map((d) => {
                return {
                  ...d,
                  createTime: d.create_time * 1000,
                };
              })
              .sort((a, b) => b.create_time - a.create_time),
            hasNext: total > current * pageSize,
          };
          return res;
        })
        .catch((err) => handleCommonErr(err));
    },
    [dexAccount.hasAccessToken, handleCommonErr, createHeaders]
  );
};

export const usePostReadAssetMessage = () => {
  const handleCommonErr = useHandleCommonErr();
  const createHeaders = useCreateHeaders();

  return useCallback(
    ({ ids, orderIds, readAll, operationIds }) => {
      const headers = createHeaders();
      return axios({
        url: `/order-book-api/notification/da/read`,
        method: 'POST',
        data: {
          read_all: readAll,
          general_ids: ids,
          order_ids: orderIds,
          operation_ids: operationIds,
        },
        headers,
      }).catch((err) => handleCommonErr(err));
    },
    [handleCommonErr, createHeaders]
  );
};

export const useFetchAllOperationMessages = () => {
  const pageSize = 100;
  const fetchOperationMessages = useFetchOperationMessages();
  const fetchedAllMessages = useCallback(
    ({ hasNext, preList = [], current = 1, start }) => {
      return new Promise((resolve) => {
        if (!hasNext) {
          resolve(preList);
          return;
        }
        fetchOperationMessages({
          current,
          pageSize,
          pre: [],
          start,
        })
          .then((resp) => {
            resolve(
              fetchedAllMessages({
                hasNext: resp.hasNext,
                preList: preList.concat(resp.list),
                current: current + 1,
              })
            );
          })
          .catch(() => {});
      });
    },
    [fetchOperationMessages]
  );

  return useCallback(
    ({ start }) => {
      return fetchedAllMessages({
        hasNext: true,
        current: 1,
        preList: [],
        start,
      }).then((resp) => {
        return { list: resp };
      });
    },
    [fetchedAllMessages]
  );
};

export const useFetchOperationMessages = () => {
  const handleCommonErr = useHandleCommonErr();
  const createHeaders = useCreateHeaders();
  const dexAccount = useDexAccount();

  return useCallback(
    ({ current, pageSize, start }) => {
      if (!dexAccount.hasAccessToken) {
        return Promise.resolve({
          list: [],
          hasNext: false,
        });
      }
      const headers = createHeaders();
      return axios({
        url: `/order-book-api/notification/important`,
        method: 'GET',
        params: {
          start_at: start ? Math.ceil(start / 1000) : undefined,
          limit: pageSize,
          offset: (current - 1) * pageSize,
        },
        headers,
      })
        .then((resp) => {
          const { list, total } = resp?.data ?? {};

          const res = {
            list: (list || []).map((l) => {
              const title = {};
              const content = {};
              (l.i18n_list || []).forEach((item) => {
                title[item.locale] = item.title;
                content[item.locale] = item.content;
              });
              return {
                ...l,
                startTime: l.start_at * 1000,
                endTime: l.end_at * 1000,
                title,
                content,
              };
            }),
            hasNext: total > current * pageSize,
          };
          return res;
        })
        .catch((err) => handleCommonErr(err));
    },
    [dexAccount.hasAccessToken, handleCommonErr, createHeaders]
  );
};

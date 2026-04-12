import { useCallback } from 'react';

import { useSearchSwapTokenInDex } from 'src/hooks/SwapToken';

import axios, { useCreateHeaders, useHandleCommonErr } from 'js/utils/axios';
import { isNumber } from 'js/utils/numberUtils';

export const useFetchSwapBalanceV2 = () => {
  const handleCommonErr = useHandleCommonErr();
  const createHeaders = useCreateHeaders();
  return useCallback(() => {
    const headers = createHeaders();
    return axios({
      method: 'GET',
      url: '/order-book-api/intent/user/balancesV2',
      cacheTime: 1000 * 60,
      headers,
    })
      .then((resp) => {
        const { balances, failed_chains } = resp.data || {};
        return {
          failed_chains,
          balances: (balances || [])
            .map((d, i) => {
              const rawToken = d?.token || {};
              const isWhitelist = !!rawToken?.is_whitelist;
              return {
                ...d,
                rank: i + 1,
                is_whitelist: isWhitelist,
                chain_balance: d?.available ?? 0,
                token: {
                  ...rawToken,
                  id: rawToken?.token_id,
                  is_whitelist: isWhitelist,
                },
              };
            })
            .filter((d) => d?.token?.id),
        };
      })
      .catch((err) => handleCommonErr(err));
  }, [handleCommonErr, createHeaders]);
};

// 锁定和下单中信息 获取AvailableDelta
export const useFetchSwapBalanceUpdates = () => {
  const handleCommonErr = useHandleCommonErr();
  const createHeaders = useCreateHeaders();
  return useCallback(() => {
    const headers = createHeaders();
    return axios({
      method: 'GET',
      url: '/order-book-api/intent/user/balanceUpdates',
      cacheTime: 1000 * 60,
      headers,
    })
      .then((resp) => {
        return (resp.data || [])
          .filter((t) => {
            if (t.token?.chain === 'ETH') {
              return false;
            }
            return true;
          })
          .map((d) => {
            return {
              ...d,
              token: {
                ...d?.token,
                id: d?.token?.token_id,
              },
            };
          });
      })
      .catch((err) => handleCommonErr(err));
  }, [handleCommonErr, createHeaders]);
};

export const useWsToSwapBalance = () => {
  const searchToken = useSearchSwapTokenInDex();

  return useCallback(
    ({ data }) => {
      return new Promise((resolve) => {
        const tokenId = data?.t;
        searchToken({ id: tokenId }).then((resp) => {
          if (resp?.code) {
            const token = resp;

            const { a, o, w } = data || {};
            if (!isNumber(a) || !isNumber(o) || !isNumber(w)) {
              resolve({});
              return;
            }
            resolve({
              result: {
                available_delta: a,
                order_frozen: o,
                withdraw_frozen: w,
                token,
              },
              token,
            });
          } else {
            resolve({});
          }
        });
      });
    },
    [searchToken]
  );
};

export const useSwapWsToDexBalance = () => {
  const searchToken = useSearchSwapTokenInDex();

  return useCallback(
    ({ data }) => {
      return new Promise((resolve) => {
        const tokenId = data?.t;
        searchToken({ id: tokenId }).then((resp) => {
          if (resp?.code) {
            const token = resp;

            const { a, o, w } = data || {};
            if (!isNumber(a) || !isNumber(o) || !isNumber(w)) {
              resolve({});
              return;
            }
            resolve({
              result: {
                available_delta: a,
                order_frozen: o,
                withdraw_frozen: w,
                token,
              },
              token,
            });
          } else {
            resolve({});
          }
        });
      });
    },
    [searchToken]
  );
};

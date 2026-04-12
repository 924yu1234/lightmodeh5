import { useCallback } from 'react';

import { SwapOrderStatus } from 'src/constants/consts';
import { OrderDirs } from 'src/constants/interface';

import { useDexAccount } from 'js/state/dexAccount/hooks';
import axios, { useCreateHeaders, useHandleCommonErr } from 'js/utils/axios';

import { useSearchSwapPairInDex } from '../pairs/hooks';
import doConvertSwapOrder from './convertSwapOrder';

export const useGetAllPendingSwapOrders = () => {
  const fetchSwapOrders = useGetSwapOrders();
  const dexAccount = useDexAccount();
  const pageSize = 100;

  const fetchOrders = useCallback(
    ({
      needFetchNext,
      preList = [],
      hasNext,
      current = 1,
      searchPairId,
      total,
    }: any) => {
      return new Promise((resolve) => {
        if (!needFetchNext || !hasNext) {
          resolve({ list: preList, hasNext, current, total });
          return;
        }
        fetchSwapOrders({
          searchPairId,
          pageSize,
          current,
        }).then((resp) => {
          resolve(
            fetchOrders({
              searchPairId,
              total: resp.total,
              hasNext: resp.hasNext,
              needFetchNext: resp.needFetchNext,
              preList: preList.concat(resp.list),
              current: current + 1,
            })
          );
        });
      });
    },
    [fetchSwapOrders]
  );

  return useCallback(
    ({ searchPairId }: { searchPairId?: number }) => {
      if (!dexAccount.hasAccessToken) {
        return Promise.resolve({ list: [] });
      }
      return fetchOrders({
        needFetchNext: true,
        hasNext: true,
        current: 1,
        searchPairId,
        preList: [],
        total: 0,
      }).then((resp: any) => {
        return resp;
      });
    },
    [dexAccount?.hasAccessToken, fetchOrders]
  );
};

export const useGetSwapOrders = () => {
  const handleCommonErr = useHandleCommonErr();
  const createHeaders = useCreateHeaders();
  const dexAccount = useDexAccount();

  return useCallback(
    ({
      searchPairId,
      pageSize,
      current,
      end,
    }: {
      searchPairId?: number;
      pageSize: number;
      current: number;
      end?: number;
    }) => {
      const headers = createHeaders();
      if (!dexAccount.hasAccessToken) {
        return Promise.resolve({
          list: [],
          total: 0,
          hasNext: false,
          needFetchNext: false,
        });
      }

      const apiParams = {
        pair_id: searchPairId,
        limit: pageSize,
        offset: (current - 1) * pageSize,
        status: 'ALL',
        end,
      };
      return axios({
        method: 'GET',
        url: '/order-book-api/intent/allOrders',
        params: apiParams,
        headers,
      })
        .then((resp: any) => {
          const { list, total } = resp.data || {};
          const hasNext = total > current * pageSize;
          const datas = (list || []).map((d: any, i: number) => {
            const index = pageSize * (current - 1) + i + 1;
            return doConvertSwapOrder({
              index,
              data: d,
            });
          });
          // 当前拿前100条，如果有超过100条的未完成订单则拿下一页
          const needFetchNext =
            hasNext &&
            datas[datas.length - 1].status === SwapOrderStatus.processing;
          return {
            list: datas,
            total,
            needFetchNext,
            hasNext,
          };
        })
        .catch((err) => handleCommonErr(err));
    },
    [handleCommonErr, createHeaders, dexAccount.hasAccessToken]
  );
};

export const useGetSwapOrder = () => {
  const handleCommonErr = useHandleCommonErr();
  const createHeaders = useCreateHeaders();

  return useCallback(
    ({ orderId }: any) => {
      if (!orderId) return Promise.reject({ code: 'order_not_found' });
      const headers = createHeaders();
      return axios({
        url: `/order-book-api/intent/order`,
        method: 'GET',
        params: {
          order_id: orderId,
        },
        headers,
      })
        .then((resp: any) => {
          if (!resp.data) return {};
          const newData = doConvertSwapOrder({
            data: resp.data,
          });
          return newData;
        })
        .catch((err) => handleCommonErr(err));
    },
    [handleCommonErr, createHeaders]
  );
};

export const useWsToSwapOrder = () => {
  const searchPair = useSearchSwapPairInDex();

  return useCallback(
    ({ data }: any) => {
      return new Promise((resolve, reject) => {
        const pairId = data.P;
        if (!pairId) {
          resolve(undefined);
          return;
        }
        searchPair({ pairId })
          .then((resp: any) => {
            const { baseToken, quoteToken, pairId } = resp;
            const orderDir = data.S;
            const payToken =
              orderDir === OrderDirs.SELL ? baseToken : quoteToken;
            const _order = {
              account_id: data.a,
              base_token: baseToken,
              buy_token_id: data.U,
              buy_volume: data.Q,
              chain_name: data.c,
              close_time: data.C,
              create_time: data.O,
              filled_buy_token_volume: data.Z,
              filled_sell_token_volume: data.z,
              gas_fee_token_id: data.f,
              gas_fee_token_volume: data.g,
              intent_id: data.x,
              max_fee: data.M,
              max_fee_bips: data.I,
              order_id: data.i,
              order_side: orderDir,
              order_type: data.o,
              pair_id: pairId,
              pay_token: { ...payToken, volume: data.p },
              price: data.V,
              quote_token: quoteToken,
              sell_token_id: data.B,
              sell_token_volume_returned: data.r,
              sell_volume: data.q,
              status: data.X,
              trade_fee: data.n,
              update_time: data.E,
              error_code: data.R,
              uuid: data.i,
            };

            resolve(doConvertSwapOrder({ data: _order }));
          })
          .catch((err) => reject(err));
      });
    },
    [searchPair]
  );
};

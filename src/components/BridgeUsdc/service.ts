import { useCallback } from 'react';
import dayjs from 'dayjs';

import { formatUnits } from 'src/ethers/utils';
import digit, { isNumber } from 'src/utils/digit';

import { useDexAccount } from 'js/state/dexAccount/hooks';
import axios, { useCreateHeaders, useHandleCommonErr } from 'js/utils/axios';

export const useFetchBridgeUsdcHistory = () => {
  const handleCommonErr = useHandleCommonErr();
  const createHeaders = useCreateHeaders();
  const dexAccount = useDexAccount();
  return useCallback(
    ({
      current,
      pageSize,
      start,
      end,
      intent_id,
    }: {
      current: number;
      pageSize: number;
      start?: number;
      end?: number;
      intent_id?: number;
    }) => {
      if (!dexAccount.hasAccessToken) {
        return Promise.resolve({
          list: [],
          total: 0,
        });
      }
      const headers = createHeaders();
      const apiParams = {
        limit: pageSize,
        offset: (current - 1) * pageSize,
        start,
        end,
        intent_id,
      };

      const url = `/order-book-api/intent/user/bridges`;

      return axios({
        url,
        method: 'GET',
        params: apiParams,
        headers,
      })
        .then((resp: any) => {
          const { records, total } = resp?.data ?? {};
          return {
            list: (records || []).map((d: any) => {
              return convertBridgeUsdcHistory(d);
            }),
            total,
          };
        })
        .catch((err) => handleCommonErr(err));
    },
    [dexAccount.hasAccessToken, handleCommonErr, createHeaders]
  );
};

const convertBridgeUsdcHistory = (d: any) => {
  const token = d.token;
  const amount = isNumber(token?.amount)
    ? formatUnits(token?.amount, token?.decimals)
    : '--';

  return {
    ...d,
    amount,
    amount_display: digit.formatInGroupSeparator(amount) || '--',
    token: {
      ...token,
      id: Number(token?.token_id),
      amount,
    },
    create_time_display: dayjs(d.timestamp * 1000).format(
      'YYYY-MM-DD HH:mm:ss'
    ),
    create_time_day: dayjs(d.timestamp * 1000).format('YYYY-MM-DD'),
  };
};

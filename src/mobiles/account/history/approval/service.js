import { useCallback } from 'react';
import { formatUnits } from '@ethersproject/units';
import dayjs from 'dayjs';

import { useDexAccount } from 'src/state/dexAccount/hooks';
import { isNumber } from 'src/utils/digit';
import { isLessThan } from 'src/utils/numberUtils';

import axios, { useCreateHeaders, useHandleCommonErr } from 'js/utils/axios';
const unlimitedAmount = 1000000000000;
export function useFetchApprovalHistory() {
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
        url: '/order-book-api/browser/approves',
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
              const amount = isNumber(d.approve_amount)
                ? formatUnits(d?.approve_amount, d.token?.decimals)
                : '';
              const isUnlimited = isLessThan(unlimitedAmount, amount);
              return {
                ...d,
                amount,
                chain: d.chain_name,
                isUnlimited,
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

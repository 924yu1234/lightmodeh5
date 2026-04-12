import { useCallback } from 'react';
import dayjs from 'dayjs';

import { useDexAccount } from 'src/state/dexAccount/hooks';
import { formatAmountDisplayLess8 } from 'src/utils/format';

import { formatUnits } from 'js/ethers/utils';
import axios, { useCreateHeaders, useHandleCommonErr } from 'js/utils/axios';
import digit from 'js/utils/digit';
import { yearFormat } from 'js/utils/timeFormat';

export function useFetchEnableReceiveChains() {
  const handleCommonErr = useHandleCommonErr();
  const createHeaders = useCreateHeaders();

  return useCallback(() => {
    const headers = createHeaders();
    return axios({
      method: 'GET',
      url: '/order-book-api/intent/user/enable-received-chains',
      headers,
    })
      .then((resp: any) => {
        const data = resp.data;
        return data;
      })
      .catch((err) => handleCommonErr(err));
  }, [handleCommonErr, createHeaders]);
}

export function useFetchReceiveHistory() {
  const handleCommonErr = useHandleCommonErr();
  const createHeaders = useCreateHeaders();
  const dexAccount = useDexAccount();

  return useCallback(
    ({
      current,
      pageSize,
      start,
      end,
      chain,
    }: {
      current: number;
      pageSize: number;
      start?: number;
      end: number;
      chain: string;
    }) => {
      if (!dexAccount.hasAccessToken) {
        return Promise.resolve({
          list: [],
          hasNext: false,
        });
      }
      const headers = createHeaders();
      return axios({
        method: 'GET',
        url: '/order-book-api/intent/user/receiveds',
        params: {
          limit: pageSize,
          offset: (current - 1) * pageSize,
          start,
          end,
          chain,
        },
        headers,
      })
        .then((resp: any) => {
          const data = resp.data;
          return {
            ...data,
            hasNext: data.has_next_page,
            list: (data.list || []).map((d: any) => {
              const { token } = d;
              let amount = '0';
              try {
                amount = formatUnits(token?.volume, token?.decimals);
              } catch (error) {
                amount = token?.volume;
              }
              const chain = d.chain_name;
              return {
                ...d,
                amount,
                chain,
                token: {
                  ...token,
                  id: token?.token_id,
                },
                amount_display: digit.formatWithDecimals(
                  amount,
                  token?.decimals,
                  {
                    precision: '#',
                    groupSeparator: true,
                  }
                ),
                amount_display_less8: formatAmountDisplayLess8(
                  amount,
                  token?.decimals
                ),
                create_time_display: yearFormat(
                  dayjs(d.create_time).format('YYYY-MM-DD HH:mm:ss')
                ),
                create_time_day: dayjs(d.create_time).format('YYYY-MM-DD'),
              };
            }),
          };
        })
        .catch((err) => handleCommonErr(err));
    },
    [dexAccount.hasAccessToken, handleCommonErr, createHeaders]
  );
}

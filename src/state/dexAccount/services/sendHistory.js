import { useCallback } from 'react';
import dayjs from 'dayjs';

import { convertUsdcTokens } from 'src/state/swap/orders/convertSwapOrder';

import { formatUnits } from 'js/ethers/utils';
import axios, { useCreateHeaders, useHandleCommonErr } from 'js/utils/axios';
import digit, { isNumber } from 'js/utils/digit';
import { yearFormat } from 'js/utils/timeFormat';

import { useDexAccount } from '../hooks';

export function useFetchIntentSendHistory() {
  const handleCommonErr = useHandleCommonErr();
  const createHeaders = useCreateHeaders();
  const dexAccount = useDexAccount();

  return useCallback(
    ({ current, pageSize, start, end, withdraw_id }) => {
      if (!dexAccount.hasAccessToken) {
        return Promise.resolve({
          list: [],
          hasNext: false,
        });
      }
      const headers = createHeaders();
      return axios({
        method: 'GET',
        url: '/order-book-api/intent/user/sends',
        params: {
          limit: pageSize,
          offset: (current - 1) * pageSize,
          allType: true,
          start,
          end,
          withdraw_id,
        },
        headers,
      })
        .then((resp) => {
          const data = resp.data;
          return {
            ...data,
            hasNext: data.has_next_page,
            list: (data.list || []).map((d) => {
              const { token, fee_token } = d;
              const amount = formatUnits(token?.volume, token?.decimals);
              const feeAmount = isNumber(fee_token?.volume)
                ? formatUnits(fee_token?.volume, fee_token?.decimals)
                : '0';
              const chain = d.chain_name;
              return {
                ...d,
                amount,
                chain,
                chain_to: chain,
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
                fee_amount_display: digit.formatWithDecimals(
                  feeAmount,
                  fee_token?.decimals,
                  {
                    precision: '#',
                    groupSeparator: true,
                  }
                ),
                create_time_display: yearFormat(
                  dayjs(d.create_time * 1000).format('YYYY-MM-DD HH:mm:ss')
                ),
                create_time_day: dayjs(d.create_time * 1000).format(
                  'YYYY-MM-DD'
                ),
                usdc_tokens: convertUsdcTokens(d, d.token),
              };
            }),
          };
        })
        .catch((err) => handleCommonErr(err));
    },
    [dexAccount.hasAccessToken, handleCommonErr, createHeaders]
  );
}

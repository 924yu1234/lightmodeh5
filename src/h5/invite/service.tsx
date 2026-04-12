import { useCallback } from 'react';

import axios, { useCreateHeaders } from 'src/utils/axios';

export const useGetInviteCodeInfo = () => {
  const createHeaders = useCreateHeaders();
  return useCallback(
    ({ inviteCode }: { inviteCode?: string }) => {
      const headers = createHeaders();
      return axios({
        url: `/order-book-api/invite/${inviteCode}`,
        method: 'GET',
        headers,
      }).then((resp: any) => {
        const data = resp.data || {};
        return {
          usable: data.usable,
          isInWhitelist: data.is_is_whitelist ?? false,
        };
      });
    },
    [createHeaders]
  );
};

export const useClaimInviteCode = () => {
  const createHeaders = useCreateHeaders();
  return useCallback(
    ({
      inviteCode,
      deviceId,
      walletIds,
    }: {
      inviteCode?: string;
      deviceId: string;
      walletIds: string[];
    }) => {
      const headers = createHeaders();
      return axios({
        url: `/order-book-api/intent/invite/${inviteCode}/claim`,
        method: 'POST',
        headers,
        data: {
          device_id: deviceId,
          wallet_ids: walletIds,
        },
      }).then((resp: any) => {
        return resp.data;
      });
    },
    [createHeaders]
  );
};

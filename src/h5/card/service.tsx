import { useCallback } from 'react';

import axios, { useCreateHeaders } from 'src/utils/axios';

export const useGetCardInfo = () => {
  const createHeaders = useCreateHeaders();
  return useCallback(
    ({ cardName, cardId }: { cardName?: string; cardId?: string }) => {
      const headers = createHeaders();
      return axios({
        url: `/order-book-api/intent/card/${cardId}/${cardName}`,
        method: 'GET',
        headers,
      }).then((resp: any) => {
        const data = resp.data || {};
        return {
          status: data.status,
        };
      });
    },
    [createHeaders]
  );
};

export const useClaimCard = () => {
  const createHeaders = useCreateHeaders();
  return useCallback(
    ({
      cardName,
      cardId,
      signature,
      timestamp,
      cardKey,
      deviceId,
    }: {
      cardName?: string;
      cardId?: string;
      signature?: string;
      timestamp?: number;
      cardKey?: string;
      deviceId?: string;
    }) => {
      const headers = createHeaders();
      return axios({
        url: `/order-book-api/intent/card/${cardId}/${cardName}/claim`,
        method: 'PUT',
        headers,
        data: {
          signature,
          timestamp,
          card_key: cardKey,
          device_id: deviceId,
        },
      }).then((resp: any) => {
        return resp.data;
      });
    },
    [createHeaders]
  );
};

import { useCallback } from 'react';

import axios, { useCreateHeaders } from 'src/utils/axios';

export const getGiftInfo = (
  code?: string,
  devideId?: string,
  da_owner?: string
) => {
  return axios({
    url: `/order-book-api/gift-boxes/${code}`,
    method: 'GET',
    params: {
      device_fingerprint: devideId,
      owner: da_owner,
    },
  }).then((resp: any) => {
    const data = resp.data || {};
    return {
      code,
      isExpired: data.expired_at <= Date.now(),
      claimable: data.can_claim,
      hasClaimedByMe: data.is_claimed_by_owner,
      hasClaimedByDevice: data.is_claimed_by_device,
      is_received: data.is_received,
      tokenSymbol: data.token_symbol,
      amountPerClaim: data.amount_per_claim,
      expiredAt: data.expired_at,
      receivedTimes: data.received_times,
      totalSize: data.total,
      claimedSize: data.total_claimed,
    };
  });
};

export const getGiftClaimeds = ({
  code,
  offset,
  limit,
}: {
  code?: string;
  offset?: number;
  limit?: number;
}) => {
  return axios({
    url: `/order-book-api/gift-boxes/${code}/claimeds`,
    method: 'GET',
    params: {
      offset,
      limit,
    },
  }).then((resp: any) => {
    const data = resp.data || {};
    return {
      list: data.received_times,
      claimed: data.total_claimeds,
    };
  });
};

export const useClaimGift = () => {
  const createHeaders = useCreateHeaders();
  return useCallback(
    ({
      deviceId,
      code,
      botAddress,
      timestamp,
      signature,
    }: {
      deviceId?: string;
      code?: string;
      botAddress?: string;
      timestamp?: number;
      signature?: string;
    }) => {
      const headers = createHeaders();
      return axios({
        url: `/order-book-api/gift-boxes/claim`,
        method: 'POST',
        headers,
        data: {
          device_fingerprint: deviceId,
          link_code: code,
          copy_trade_bot_da: botAddress,
          timestamp,
          ecdsa_signature: signature,
        },
      }).then((resp: any) => {
        return resp.data;
      });
    },
    [createHeaders]
  );
};

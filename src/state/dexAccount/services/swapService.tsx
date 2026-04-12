import { useCallback } from 'react';

import { Token } from 'src/constants/interface';

import axios, { useCreateHeaders, useHandleCommonErr } from 'js/utils/axios';

export const estimateSwap = ({
  chain,
  sellToken,
  buyToken,
  sellVolume,
  maxSlippage,
}: {
  chain: string;
  sellToken: Token;
  buyToken: Token;
  sellVolume: string;
  maxSlippage: string;
}) => {
  return axios({
    method: 'GET',
    url: '/order-book-api/intent/order/swapRoutes',
    params: {
      chain_name: chain,
      from_token_contract: sellToken?.code,
      to_token_contract: buyToken?.code,
      from_token_amount: sellVolume,
      slippage: maxSlippage,
    },
  }).then((resp: any) => {
    return resp?.data || {};
  });
};

export const usePostSwapOrder = () => {
  const handleCommonErr = useHandleCommonErr();
  const createHeaders = useCreateHeaders();

  return useCallback(
    ({ order }: any) => {
      const headers = createHeaders();
      return axios({
        method: 'POST',
        url: '/order-book-api/intent/order',
        data: order,
        headers,
      })
        .then((resp: any) => {
          return resp?.data;
        })
        .catch((err) => handleCommonErr(err));
    },
    [handleCommonErr, createHeaders]
  );
};

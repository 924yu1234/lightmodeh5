import { useCallback } from 'react';

import { CreateSendOrderParams, Token } from 'src/constants/interface';
import { Type_DAChains } from 'src/da';
import { parseUnits } from 'src/ethers/utils';
import useWallet, { useWalletOprs } from 'src/providers/useWallet';

import {
  useCheckLocalTime,
  useUsdcTokensMap,
} from 'js/state/application/hooks';

import { useDexAccount } from '../hooks';

export function useCreateSendV2TryData() {
  const { DAs } = useDexAccount();
  const { solverAddresses } = useWallet();
  const { da_owner } = useDexAccount();
  const usdcTokensMap = useUsdcTokensMap();

  return useCallback(
    (order: {
      isMaxModel: boolean;
      token: Token;
      isDAUsdc: boolean;
      chain: Type_DAChains;
      recipient: string;
      amount: string;
      gasToken?: Token;
    }) => {
      const {
        isMaxModel,
        token,
        chain,
        isDAUsdc,
        recipient,
        amount,
        gasToken,
      } = order;
      const tryKey = `${da_owner}_${token.code}_${chain}_${recipient}_${
        isMaxModel ? 'max' : amount
      }_${gasToken?.code}`;
      const usdcToken = usdcTokensMap[chain];
      const _token = isDAUsdc ? usdcToken : token;

      return {
        owner: da_owner,
        tryKey,
        intent: {
          modifiable: isMaxModel,
          chain,
          type: 'TRANSFER',
          gas_payer_address: (solverAddresses?.[chain] ?? {}).gas,
          token_in: [
            {
              chain,
              token: _token?.code,
              amount: parseUnits(amount, token.decimals).toString(),
              address: recipient,
            },
          ],
          token_out: [
            {
              chain: token?.chain,
              token: token?.code,
              amount: parseUnits(amount, token.decimals).toString(),
              address: DAs?.[token?.chain as Type_DAChains]?.address,
              decimals: token.decimals,
            },
          ],
          extra_data: {
            caller: DAs?.[token?.chain as Type_DAChains]?.address,
          },
        },
        gas_payment_token: gasToken
          ? {
              chain: gasToken.chain,
              token: gasToken.code,
            }
          : undefined,
      };
    },
    [solverAddresses, DAs, da_owner, usdcTokensMap]
  );
}

export function useCreateSendV2Order() {
  const checkLocalTime = useCheckLocalTime();
  const { createSendOrder } = useWalletOprs();
  return useCallback(
    async ({
      token,
      chain,
      recipient,
      amount,
      tryResp,
      tokenValue,
    }: CreateSendOrderParams) => {
      if (!checkLocalTime()) return Promise.reject();

      const order: CreateSendOrderParams = {
        token,
        chain: chain as Type_DAChains,
        recipient,
        amount,
        tryResp,
        tokenValue,
      };
      return createSendOrder(order);
    },
    [checkLocalTime, createSendOrder]
  );
}

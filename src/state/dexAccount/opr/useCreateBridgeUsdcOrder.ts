import { useCallback } from 'react';

import { BridgeUsdcOrderParams, Token } from 'src/constants/interface';
import { Type_DAChains } from 'src/da';
import { parseUnits } from 'src/ethers/utils';
import useWallet, { useIsAppH5, useWalletOprs } from 'src/providers/useWallet';
import { ModalKeys } from 'src/state/application/reducer';

import { useCheckLocalTime, useShowModal } from 'js/state/application/hooks';

import { useDexAccount } from '../hooks';

export function useCreateBridgeUsdcTryData() {
  const { DAs } = useDexAccount();
  const { solverAddresses } = useWallet();
  const { da_owner } = useDexAccount();

  return useCallback(
    (order: {
      isMaxModel: boolean;
      fromToken: Token;
      toToken: Token;
      amount: string;
      gasToken?: Token;
    }) => {
      const { isMaxModel, fromToken, toToken, amount, gasToken } = order;
      return {
        owner: da_owner,
        tryKey: `${da_owner}_${fromToken.code}_${toToken.code}_${
          isMaxModel ? 'max' : amount
        }_${gasToken?.code}`,
        intent: {
          type: 'BRIDGE',
          modifiable: isMaxModel,
          gas_payer_address: (
            solverAddresses?.[fromToken.chain as Type_DAChains] ?? {}
          ).gas,
          token_out: [
            {
              chain: fromToken.chain,
              token: fromToken.code,
              address: DAs?.[fromToken.chain as Type_DAChains]?.address ?? '',
              amount: parseUnits(amount, fromToken.decimals).toString(),
              side: 'OUT',
              decimals: fromToken.decimals,
            },
          ],
          token_in: [
            {
              chain: toToken.chain,
              token: toToken.code,
              address: DAs?.[toToken.chain as Type_DAChains]?.address ?? '',
              amount: parseUnits(amount, toToken.decimals).toString(),
              side: 'IN',
              decimals: toToken.decimals,
            },
          ],
        },
        gas_payment_token: gasToken
          ? {
              chain: gasToken.chain,
              token: gasToken.code,
            }
          : undefined,
      };
    },
    [solverAddresses, DAs, da_owner]
  );
}

export function useCreateBridgeUsdcOrder() {
  const checkLocalTime = useCheckLocalTime();
  const { createBridgeUsdcOrder } = useWalletOprs();
  const isAppH5 = useIsAppH5();
  const showModal = useShowModal();
  return useCallback(
    async ({ fromToken, toToken, amount, tryResp }: BridgeUsdcOrderParams) => {
      if (!checkLocalTime()) return Promise.reject();

      const order: BridgeUsdcOrderParams = {
        fromToken,
        toToken,
        amount,
        tryResp,
      };
      if (isAppH5) {
        return new Promise((resolve) => {
          showModal({
            modal: ModalKeys.APP_CREATE_BRIDGE_USDC_ORDER,
            order,
            resolve,
          });
        });
      }
      return createBridgeUsdcOrder(order);
    },
    [showModal, isAppH5, checkLocalTime, createBridgeUsdcOrder]
  );
}

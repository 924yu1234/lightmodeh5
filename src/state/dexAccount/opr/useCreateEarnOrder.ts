import { useCallback } from 'react';

import {
  CommonToken,
  EarnOrderParams,
  IntentTryItemResp,
  Vault,
} from 'src/constants/interface';
import { Type_DAChains } from 'src/da';
import { parseUnits } from 'src/ethers/utils';
import useWallet, { useIsAppH5, useWalletOprs } from 'src/providers/useWallet';
import { ModalKeys } from 'src/state/application/reducer';

import { useCheckLocalTime, useShowModal } from 'js/state/application/hooks';

import { useDexAccount } from '../hooks';

export default function useCreateEarnOrder() {
  const checkLocalTime = useCheckLocalTime();
  // const createApiParams = useCreateApiOrder();
  const showModal = useShowModal();
  const isAppH5 = useIsAppH5();
  const { createEarnOrder } = useWalletOprs();
  return useCallback(
    async ({
      type,
      tryResp,
      usdcRoutes,
      rewardToken,
      amount,
      vault,
      dailyRewards,
    }: {
      type: 'deposit' | 'withdraw' | 'claim';
      vault: Vault;
      amount: string;
      rewardToken?: CommonToken;
      usdcRoutes?: any[];
      dailyRewards?: string;
      tryResp: IntentTryItemResp;
    }) => {
      if (!checkLocalTime()) return Promise.reject();

      const order: EarnOrderParams = {
        vault,
        amount,
        type,
        usdcRoutes,
        rewardToken,
        dailyRewards,
        tryResp,
      };
      return new Promise((resolve) => {
        if (isAppH5) {
          showModal({
            modal: ModalKeys.APP_CREATE_EARN_ORDER,
            order,
            tryResp,
            resolve,
          });
        } else {
          resolve(createEarnOrder(order));
        }
      });
    },
    [showModal, checkLocalTime, createEarnOrder, isAppH5]
  );
}

export function useCreateTryData() {
  const { DAs } = useDexAccount();
  const { solverAddresses } = useWallet();
  const { da_owner } = useDexAccount();

  return useCallback(
    (order: any) => {
      const {
        token,
        tokenOut,
        address,
        marketAddress,
        protocol,
        amount,
        claimOrderAddress,
        gasToken,
        isMaxModel,
      } = order;
      const chain = token?.chain as Type_DAChains;
      const DA = DAs?.[chain]?.address ?? '';
      const tryKey = `${da_owner}_${token?.code}_${order?.type}_${
        tokenOut?.code
      }_${isMaxModel ? 'max' : amount}_${gasToken?.code}`;
      if (order.type === 'deposit') {
        return {
          tryKey,
          owner: da_owner,
          intent: {
            type: 'VAULT_DEPOSIT',
            modifiable: isMaxModel,
            chain,
            gas_payer_address: (solverAddresses?.[chain] ?? {}).gas,
            token_out: [
              {
                token: tokenOut.code,
                address: DAs?.[tokenOut?.chain as Type_DAChains]?.address ?? '',
                amount: parseUnits(amount, tokenOut.decimals).toString(),
                side: 'OUT',
                chain: tokenOut?.chain,
                decimals: tokenOut.decimals,
              },
            ],
            extra_data: {
              caller: DA,
              type: protocol,
              address: marketAddress,
              vault_address: address,
            },
          },
          gas_payment_token: gasToken
            ? {
                chain: gasToken.chain,
                token: gasToken.code,
              }
            : undefined,
          extra_data: {
            caller: DA,
            validateData: {
              action: 'VAULT_DEPOSIT',
              values: { token: token.symbol, amount },
            },
          },
        };
      }

      if (order.type === 'withdraw') {
        const myDeposit = order.detail?.myDeposit;
        const solverAddress = solverAddresses?.[chain] ?? {};
        const volume = parseUnits(amount, token.decimals).toString();
        const redeem = myDeposit === volume;
        return {
          tryKey,
          owner: da_owner,
          intent: {
            type: 'VAULT_WITHDRAW',
            chain,
            gas_payer_address: solverAddress.gas,
            token_in: [
              {
                token: token.code,
                address: DAs?.[chain]?.address ?? '',
                amount: volume,
                chain: token.chain,
              },
            ],
            extra_data: {
              caller: DA,
              type: protocol,
              address: marketAddress,
              vault_address: address,
              redeem,
            },
          },
          gas_payment_token: gasToken
            ? {
                chain: gasToken.chain,
                token: gasToken.code,
              }
            : undefined,

          extra_data: {
            validateData: {
              action: 'VAULT_WITHDRAW',
              values: { token: token.symbol, amount },
            },
          },
        };
      }

      if (order.type === 'claim') {
        const solverAddress = solverAddresses?.[chain] ?? {};
        return {
          tryKey,
          owner: da_owner,
          intent: {
            type: 'VAULT_CLAIM',
            chain,
            gas_payer_address: solverAddress.gas,
            token_in: [
              {
                address: DAs?.[chain]?.address ?? '',
                token: token.code,
                chain: token.chain,
              },
            ],
            extra_data: {
              caller: DA,
              type: protocol,
              address: claimOrderAddress || marketAddress,
              vault_address: address,
            },
          },
          gas_payment_token: gasToken
            ? {
                chain: gasToken.chain,
                token: gasToken.code,
              }
            : undefined,

          extra_data: {
            validateData: {
              action: 'VAULT_CLAIM',
              values: { token: token.symbol, amount },
            },
          },
        };
      }

      return {};
    },
    [solverAddresses, DAs, da_owner]
  );
}

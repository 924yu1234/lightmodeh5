import { useCallback } from 'react';

import {
  Token,
  TurboRangeClaimOrderParams,
  TurboRangeDepositOrderParams,
  TurboRangeDualDepositOrderParams,
  TurboRangeDualIncreaseInvestmentOrderParams,
  TurboRangeIncreaseInvestmentOrderParams,
  TurboRangeOrderParams,
  TurboRangeWithdrawOrderParams,
} from 'src/constants/interface';
import { Type_DAChains } from 'src/da';
import { parseUnits } from 'src/ethers/utils';
import useWallet, { useIsAppH5, useWalletOprs } from 'src/providers/useWallet';
import { ModalKeys } from 'src/state/application/reducer';
import {
  TurboRangePosition,
  TurboRangeProduct,
} from 'src/state/turboRange/reducer';
import { logTurboRange } from 'src/utils/log/swap';

import {
  useCheckLocalTime,
  useShowModal,
  useUsdcTokensMap,
} from 'js/state/application/hooks';

import { useDexAccount } from '../hooks';

export function useCreateTurboRangeDepositTryData() {
  const { DAs } = useDexAccount();
  const { solverAddresses } = useWallet();
  const { da_owner } = useDexAccount();
  const usdcTokensMap = useUsdcTokensMap();

  return useCallback(
    (order: {
      product: TurboRangeProduct;
      amount: string;
      maxPrice: string;
      minPrice: string;
      usdcToken: Token;
      gasToken?: Token;
      isMaxModel: boolean;
    }) => {
      const {
        isMaxModel,
        product,
        amount,
        maxPrice,
        minPrice,
        usdcToken,
        gasToken,
      } = order;
      const { poolAddress } = product;
      const chain = product?.chain as Type_DAChains;
      const DA = DAs?.[chain]?.address ?? '';
      const usdc = usdcTokensMap[chain];
      if (!DA || !usdcToken || !da_owner) {
        logTurboRange({
          event: 'turbo range deposit try params error',
          DA,
          usdcTokenChain: usdcToken?.chain,
          da_owner,
        });
        return undefined;
      }
      if (!minPrice || !maxPrice) {
        logTurboRange({
          event: 'turbo range deposit try params error',
          minPrice,
          maxPrice,
        });
        return undefined;
      }
      const volume = parseUnits(amount, usdcToken.decimals).toString();
      const tryKey = `${da_owner}_${product.poolAddress}_${
        usdcToken?.code
      }_${maxPrice}_${minPrice}_${isMaxModel ? 'max' : amount}_${
        gasToken?.code
      }`;
      return {
        owner: da_owner,
        tryKey,
        intent: {
          modifiable: isMaxModel,
          type: 'LP_DEPOSIT',
          chain,
          gas_payer_address: (solverAddresses?.[chain] ?? {}).gas,
          token_out: [
            {
              chain: usdcToken.chain,
              token: usdcToken.code,
              address: DAs?.[usdcToken.chain as Type_DAChains]?.address ?? '',
              amount: parseUnits(amount, usdcToken.decimals).toString(),
              decimals: usdcToken.decimals,
              side: 'OUT',
            },
          ],
          extra_data: {
            fee_address: (solverAddresses?.[chain] ?? {}).solver,
            caller: DA,
            receiver: DA,
            deposit_amount: volume,
            token_mint: usdc?.code,
            fee_percent: product.feePercent,

            zap_in: {
              pool: poolAddress,
              slippage: `${product.slippage}`,
              deposit_token_mint: usdc?.code,
              user_da: DA,
              deposit_amount: volume,
              tick_upper_price: maxPrice,
              tick_lower_price: minPrice,
              token_a: product.baseToken.code,
              token_b: product.quoteToken.code,
            },
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

export function useCreateTurboRangeDepositOrder() {
  const checkLocalTime = useCheckLocalTime();
  const { createTurboRangeOrder } = useWalletOprs();
  const isAppH5 = useIsAppH5();
  const showModal = useShowModal();
  return useCallback(
    async ({
      product,
      amount,
      maxPrice,
      minPrice,
      tryResp,
    }: TurboRangeDepositOrderParams & { product: TurboRangeProduct }) => {
      if (!checkLocalTime()) return Promise.reject();

      const order: TurboRangeOrderParams = {
        type: 'deposit',
        product,
        depositOrderParams: {
          amount,
          maxPrice,
          minPrice,
          tryResp,
        },
      };
      if (isAppH5) {
        return new Promise((resolve) => {
          showModal({
            modal: ModalKeys.APP_CREATE_TURBO_RANGE_ORDER,
            order,
            resolve,
          });
        });
      }
      return createTurboRangeOrder(order);
    },
    [showModal, isAppH5, checkLocalTime, createTurboRangeOrder]
  );
}

export function useCreateTurboRangeWithdrawTryData() {
  const { DAs } = useDexAccount();
  const { solverAddresses } = useWallet();
  const { da_owner } = useDexAccount();
  const usdcTokensMap = useUsdcTokensMap();

  return useCallback(
    ({
      product,
      position,
      convert_to_usdc,
      gasToken,
    }: {
      product: TurboRangeProduct;
      position: TurboRangePosition;
      convert_to_usdc: boolean;
      gasToken?: Token;
    }) => {
      const chain = position?.chain as Type_DAChains;
      const usdc = usdcTokensMap[chain];
      const DA = DAs?.[chain]?.address ?? '';
      if (!DA || !usdc || !position.positionAddress) return undefined;
      return {
        owner: da_owner,
        intent: {
          chain,
          type: 'LP_WITHDRAW',
          gas_payer_address: (solverAddresses?.[chain] ?? {}).gas,
          token_out: [],
          extra_data: {
            pool: position.poolAddress,
            caller: DA,
            receiver: DA,
            convert_to_usdc,
            nft_mint: position.positionAddress,
            fee_address: (solverAddresses?.[chain] ?? {}).solver,
            fee_percent: product.feePercent,
            token_mint: usdc?.code,
            slippage: `${product.slippage}`,
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

export function useCreateTurboRangeWithdrawOrder() {
  const checkLocalTime = useCheckLocalTime();
  const { createTurboRangeOrder } = useWalletOprs();
  const isAppH5 = useIsAppH5();
  const showModal = useShowModal();
  return useCallback(
    async ({
      position,
      estReceive,
      tryResp,
      product,
    }: TurboRangeWithdrawOrderParams & { product: TurboRangeProduct }) => {
      if (!checkLocalTime()) return Promise.reject();

      const order: TurboRangeOrderParams = {
        withdrawOrderParams: {
          position,
          estReceive,
          tryResp,
        },
        product,
        type: 'withdraw',
      };
      if (isAppH5) {
        return new Promise((resolve) => {
          showModal({
            modal: ModalKeys.APP_CREATE_TURBO_RANGE_ORDER,
            order,
            resolve,
          });
        });
      }
      return createTurboRangeOrder(order);
    },
    [showModal, isAppH5, checkLocalTime, createTurboRangeOrder]
  );
}

export function useCreateTurboRangeClaimTryData() {
  const { DAs } = useDexAccount();
  const { solverAddresses } = useWallet();
  const { da_owner } = useDexAccount();
  const usdcTokensMap = useUsdcTokensMap();

  return useCallback(
    ({
      position,
      product,
      gasToken,
      convert_to_usdc,
    }: {
      position: TurboRangePosition;
      product: TurboRangeProduct;
      gasToken?: Token;
      convert_to_usdc: boolean;
    }) => {
      const chain = position?.chain as Type_DAChains;
      const usdc = usdcTokensMap[chain];
      const DA = DAs?.[chain]?.address ?? '';
      if (!DA || !usdc || !position.positionAddress) return undefined;
      return {
        owner: da_owner,
        intent: {
          chain,
          type: 'LP_CLAIM',
          gas_payer_address: (solverAddresses?.[chain] ?? {}).gas,
          token_out: [],
          extra_data: {
            pool: position.poolAddress,
            caller: DA,
            receiver: DA,
            nft_mint: position.positionAddress,
            fee_address: (solverAddresses?.[chain] ?? {}).solver,
            token_mint: usdc?.code,
            fee_percent: product.feePercent,
            convert_to_usdc,
            slippage: `${product.slippage}`,
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

export function useCreateTurboRangeClaimOrder() {
  const checkLocalTime = useCheckLocalTime();
  const { createTurboRangeOrder } = useWalletOprs();
  const isAppH5 = useIsAppH5();
  const showModal = useShowModal();
  return useCallback(
    async ({
      position,
      estClaims,
      tryResp,
      product,
    }: TurboRangeClaimOrderParams & { product: TurboRangeProduct }) => {
      if (!checkLocalTime()) return Promise.reject();

      const order: TurboRangeOrderParams = {
        claimOrderParams: {
          position,
          estClaims,
          tryResp,
        },
        product,
        type: 'claim',
      };
      if (isAppH5) {
        return new Promise((resolve) => {
          showModal({
            modal: ModalKeys.APP_CREATE_TURBO_RANGE_ORDER,
            order,
            resolve,
          });
        });
      }
      return createTurboRangeOrder(order);
    },
    [showModal, isAppH5, checkLocalTime, createTurboRangeOrder]
  );
}

export function useCreateTurboRangeIncreaseInvestmentTryData() {
  const { DAs } = useDexAccount();
  const { solverAddresses } = useWallet();
  const { da_owner } = useDexAccount();
  const usdcTokensMap = useUsdcTokensMap();

  return useCallback(
    (order: {
      product: TurboRangeProduct;
      position: TurboRangePosition;
      amount: string;
      usdcToken: Token;
      gasToken?: Token;
      isMaxModel: boolean;
    }) => {
      const { isMaxModel, product, position, amount, usdcToken, gasToken } =
        order;
      const { positionAddress } = position;
      const chain = position?.chain as Type_DAChains;
      const DA = DAs?.[chain]?.address ?? '';
      const usdc = usdcTokensMap[chain];
      if (!DA || !usdcToken || !da_owner) {
        logTurboRange({
          event: 'turbo range deposit try params error',
          DA,
          usdcTokenChain: usdcToken?.chain,
          da_owner,
        });
        return undefined;
      }
      const volume = parseUnits(amount, usdcToken.decimals).toString();
      const tryKey = `${da_owner}_${positionAddress}_${usdcToken?.code}_${
        isMaxModel ? 'max' : amount
      }_${gasToken?.code}`;
      return {
        owner: da_owner,
        tryKey,
        intent: {
          modifiable: isMaxModel,
          type: 'LP_ADD_DEPOSIT',
          chain,
          gas_payer_address: (solverAddresses?.[chain] ?? {}).gas,
          token_out: [
            {
              chain: usdcToken.chain,
              token: usdcToken.code,
              address: DAs?.[usdcToken.chain as Type_DAChains]?.address ?? '',
              amount: parseUnits(amount, usdcToken.decimals).toString(),
              decimals: usdcToken.decimals,
              side: 'OUT',
            },
          ],
          extra_data: {
            fee_address: (solverAddresses?.[chain] ?? {}).solver,
            caller: DA,
            receiver: DA,
            deposit_amount: volume,
            token_mint: usdc?.code,
            fee_percent: product.feePercent,
            nft_mint: positionAddress,

            zap_in: {
              pool: position.poolAddress,
              slippage: `${product.slippage}`,
              deposit_token_mint: usdc?.code,
              user_da: DA,
              deposit_amount: volume,
              tick_upper_price: position.maxPrice,
              tick_lower_price: position.minPrice,
              token_a: product.baseToken.code,
              token_b: product.quoteToken.code,
            },
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

export function useCreateTurboRangeIncreaseInvestmentOrder() {
  const checkLocalTime = useCheckLocalTime();
  const { createTurboRangeOrder } = useWalletOprs();
  const isAppH5 = useIsAppH5();
  const showModal = useShowModal();
  return useCallback(
    async ({
      product,
      amount,
      tryResp,
    }: TurboRangeIncreaseInvestmentOrderParams & {
      product: TurboRangeProduct;
    }) => {
      if (!checkLocalTime()) return Promise.reject();

      const order: TurboRangeOrderParams = {
        type: 'increaseInvestment',
        product,
        increaseInvestmentOrderParams: {
          amount,
          tryResp,
        },
      };
      if (isAppH5) {
        return new Promise((resolve) => {
          showModal({
            modal: ModalKeys.APP_CREATE_TURBO_RANGE_ORDER,
            order,
            resolve,
          });
        });
      }
      return createTurboRangeOrder(order);
    },
    [showModal, isAppH5, checkLocalTime, createTurboRangeOrder]
  );
}

// ========== 双币投入相关 Hooks ==========

// 双币投入的 TryData hook
export function useCreateTurboRangeDualDepositTryData() {
  const { DAs } = useDexAccount();
  const { solverAddresses } = useWallet();
  const { da_owner } = useDexAccount();
  const usdcTokensMap = useUsdcTokensMap();

  return useCallback(
    (order: {
      product: TurboRangeProduct;
      quoteAmount: string;
      baseAmount: string;
      maxPrice: string;
      minPrice: string;
      usdcToken: Token;
      gasToken?: Token;
      isQuoteMaxModel: boolean;
      isBaseMaxModel: boolean;
    }) => {
      const {
        isQuoteMaxModel,
        isBaseMaxModel,
        product,
        quoteAmount,
        baseAmount,
        maxPrice,
        minPrice,
        usdcToken,
        gasToken,
      } = order;
      const { poolAddress } = product;
      const chain = product?.chain as Type_DAChains;
      const DA = DAs?.[chain]?.address ?? '';
      const usdc = usdcTokensMap[chain];

      if (!DA || !usdcToken || !da_owner) {
        logTurboRange({
          event: 'turbo range dual deposit try params error',
          DA,
          usdcTokenChain: usdcToken?.chain,
          da_owner,
        });
        return undefined;
      }
      if (!minPrice || !maxPrice) {
        logTurboRange({
          event: 'turbo range dual deposit try params error',
          minPrice,
          maxPrice,
        });
        return undefined;
      }

      const volume = parseUnits(quoteAmount, usdcToken.decimals).toString();
      const baseVolume = parseUnits(
        baseAmount,
        product.baseToken.decimals
      ).toString();
      const tryKey = `${da_owner}_${product.poolAddress}_${
        usdcToken?.code
      }_${maxPrice}_${minPrice}_${usdcToken?.chain}_${
        isQuoteMaxModel ? 'max' : quoteAmount || '0'
      }_${isBaseMaxModel ? 'max' : baseAmount || '0'}_${gasToken?.code}_dual`;

      return {
        owner: da_owner,
        tryKey,
        intent: {
          modifiable: isQuoteMaxModel || isBaseMaxModel,
          type: 'LP_DEPOSIT',
          chain,
          gas_payer_address: (solverAddresses?.[chain] ?? {}).gas,
          token_out: [
            {
              chain: usdcToken.chain,
              token: usdcToken.code,
              address: DAs?.[usdcToken.chain as Type_DAChains]?.address ?? '',
              amount: volume,
              decimals: usdcToken.decimals,
              side: 'OUT',
            },
            {
              chain: product.baseToken.chain,
              token: product.baseToken.code,
              address:
                DAs?.[product.baseToken.chain as Type_DAChains]?.address ?? '',
              amount: baseVolume,
              decimals: product.baseToken.decimals,
              side: 'OUT',
            },
          ].filter((d) => d.amount !== '0'),
          extra_data: {
            fee_address: (solverAddresses?.[chain] ?? {}).solver,
            caller: DA,
            receiver: DA,
            deposit_amount: volume,
            token_mint: usdc?.code,
            fee_percent: product.feePercent,
            invest_mode: 'dual',

            zap_in: {
              pool: poolAddress,
              slippage: `${product.slippage}`,
              deposit_token_mint: usdc?.code,
              user_da: DA,
              deposit_amount: volume,
              tick_upper_price: maxPrice,
              tick_lower_price: minPrice,
              token_a: product.baseToken.code,
              token_b: product.quoteToken.code,
            },
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

// 双币投入订单创建 hook
export function useCreateTurboRangeDualDepositOrder() {
  const checkLocalTime = useCheckLocalTime();
  const { createTurboRangeOrder } = useWalletOprs();
  const isAppH5 = useIsAppH5();
  const showModal = useShowModal();
  return useCallback(
    async ({
      product,
      baseAmount,
      quoteAmount,
      maxPrice,
      minPrice,
      tryResp,
    }: TurboRangeDualDepositOrderParams & {
      product: TurboRangeProduct;
    }) => {
      if (!checkLocalTime()) return Promise.reject();

      const order: TurboRangeOrderParams = {
        type: 'dualDeposit',
        product,
        dualDepositOrderParams: {
          baseAmount,
          quoteAmount,
          maxPrice,
          minPrice,
          tryResp,
        },
      };
      if (isAppH5) {
        return new Promise((resolve) => {
          showModal({
            modal: ModalKeys.APP_CREATE_TURBO_RANGE_ORDER,
            order,
            resolve,
          });
        });
      }
      return createTurboRangeOrder(order);
    },
    [showModal, isAppH5, checkLocalTime, createTurboRangeOrder]
  );
}

// 双币追加投入的 TryData hook
export function useCreateTurboRangeDualIncreaseInvestmentTryData() {
  const { DAs } = useDexAccount();
  const { solverAddresses } = useWallet();
  const { da_owner } = useDexAccount();
  const usdcTokensMap = useUsdcTokensMap();

  return useCallback(
    (order: {
      product: TurboRangeProduct;
      position: TurboRangePosition;
      isQuoteMaxModel: boolean;
      isBaseMaxModel: boolean;
      quoteAmount: string;
      baseAmount: string;
      usdcToken: Token;
      gasToken?: Token;
    }) => {
      const {
        isQuoteMaxModel,
        isBaseMaxModel,
        product,
        position,
        quoteAmount,
        baseAmount,
        usdcToken,
        gasToken,
      } = order;
      const { positionAddress } = position;
      const chain = product?.chain as Type_DAChains;
      const DA = DAs?.[chain]?.address ?? '';
      const usdc = usdcTokensMap[chain];

      if (!DA || !usdcToken || !da_owner) {
        logTurboRange({
          event: 'turbo range dual increase investment try params error',
          DA,
          usdcTokenChain: usdcToken?.chain,
          da_owner,
        });
        return undefined;
      }

      const volume = parseUnits(quoteAmount, usdcToken.decimals).toString();
      const baseVolume = parseUnits(
        baseAmount,
        product.baseToken.decimals
      ).toString();
      const tryKey = `${da_owner}_${positionAddress}_${usdcToken?.code}_${
        isQuoteMaxModel ? 'max' : quoteAmount || '0'
      }_${isBaseMaxModel ? 'max' : baseAmount || '0'}_${gasToken?.code}_dual`;

      return {
        owner: da_owner,
        tryKey,
        intent: {
          modifiable: isQuoteMaxModel || isBaseMaxModel,
          type: 'LP_ADD_DEPOSIT',
          chain,
          gas_payer_address: (solverAddresses?.[chain] ?? {}).gas,
          token_out: [
            {
              chain: usdcToken.chain,
              token: usdcToken.code,
              address: DAs?.[usdcToken.chain as Type_DAChains]?.address ?? '',
              amount: volume,
              decimals: usdcToken.decimals,
              side: 'OUT',
            },
            {
              chain: product.baseToken.chain,
              token: product.baseToken.code,
              address:
                DAs?.[product.baseToken.chain as Type_DAChains]?.address ?? '',
              amount: baseVolume,
              decimals: product.baseToken.decimals,
              side: 'OUT',
            },
          ].filter((d) => d.amount !== '0'),
          extra_data: {
            fee_address: (solverAddresses?.[chain] ?? {}).solver,
            caller: DA,
            receiver: DA,
            deposit_amount: volume,
            token_mint: usdc?.code,
            fee_percent: product.feePercent,
            nft_mint: positionAddress,

            zap_in: {
              pool: position.poolAddress,
              slippage: `${product.slippage}`,
              deposit_token_mint: usdc?.code,
              user_da: DA,
              deposit_amount: volume,
              tick_upper_price: position.maxPrice,
              tick_lower_price: position.minPrice,
              token_a: product.baseToken.code,
              token_b: product.quoteToken.code,
            },
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

// 双币追加投入订单创建 hook
export function useCreateTurboRangeDualIncreaseInvestmentOrder() {
  const checkLocalTime = useCheckLocalTime();
  const { createTurboRangeOrder } = useWalletOprs();
  const isAppH5 = useIsAppH5();
  const showModal = useShowModal();
  return useCallback(
    async ({
      product,
      baseAmount,
      quoteAmount,
      tryResp,
    }: TurboRangeDualIncreaseInvestmentOrderParams & {
      product: TurboRangeProduct;
    }) => {
      if (!checkLocalTime()) return Promise.reject();

      const order: TurboRangeOrderParams = {
        type: 'dualIncreaseInvestment',
        product,
        dualIncreaseInvestmentOrderParams: {
          baseAmount: baseAmount || '0',
          quoteAmount: quoteAmount || '0',
          tryResp,
        },
      };
      if (isAppH5) {
        return new Promise((resolve) => {
          showModal({
            modal: ModalKeys.APP_CREATE_TURBO_RANGE_ORDER,
            order,
            resolve,
          });
        });
      }
      return createTurboRangeOrder(order);
    },
    [showModal, isAppH5, checkLocalTime, createTurboRangeOrder]
  );
}

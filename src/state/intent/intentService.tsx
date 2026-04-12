import { useCallback } from 'react';

import { INTENT_EXPIRED } from 'src/constants/apiErr';
import { OrderDirs, Token } from 'src/constants/interface';
import { Type_DAChains } from 'src/da';
import { formatUnits } from 'src/ethers/utils';
import { formatNetworFeeValue } from 'src/utils/format';
import { logIntentTryCreate } from 'src/utils/log';
import { divide, isNumber, minus, multiply, plus } from 'src/utils/numberUtils';

import axios, { useCreateHeaders, useHandleCommonErr } from 'js/utils/axios';

import { useShowModal } from '../application/hooks';
import ModalKeys from '../application/modalKeys';
import { useRefreshSwapBalance } from '../swap/balances/hooks';

export const estimateIntentSwap = ({
  orderDir,
  takerFee,
  chain,
  sellToken,
  buyToken,
  sellVolume,
  maxSlippage,
  gasAddress,
  feeAddress,
  sellAddress,
  buyAddress,
  da_owner,
  gasToken,
  isMaxModel,
}: {
  orderDir: OrderDirs;
  takerFee: string;
  chain: string;
  sellToken: Token;
  buyToken: Token;
  sellVolume: string;
  maxSlippage: string;
  gasAddress: string;
  feeAddress: string;
  sellAddress: string;
  buyAddress: string;
  da_owner: string;
  gasToken?: Token;
  isMaxModel?: boolean;
}) => {
  const order = {
    owner: da_owner,
    intent: {
      type: 'SWAP',
      chain,
      gas_payer_address: gasAddress,
      modifiable: isMaxModel,
      token_out: [
        {
          token: sellToken.code,
          chain: sellToken.chain,
          address: sellAddress,
          amount: sellVolume,
          decimals: sellToken.decimals,
          side: 'OUT',
        },
      ],
      token_in: [
        {
          token: buyToken.code,
          chain: buyToken.chain,
          address: buyAddress,
          side: 'IN',
        },
      ],
      extra_data: {
        swap_type: orderDir === OrderDirs.BUY ? 'SWAP_BUY' : 'SWAP_SELL',
        fee_percent: divide(takerFee, 10000)?.toString() ?? '0',
        fee_address: feeAddress,
        slippage: maxSlippage,
      },
    },
    gas_payment_token: gasToken
      ? {
          chain: gasToken.chain,
          token: gasToken.code,
        }
      : undefined,
  };
  return axios({
    method: 'POST',
    url: '/order-book-api/intent/v2/compact_try_create',
    headers: {
      Version: '0.0.1',
    },
    data: order,
  }).then((resp: any) => {
    return formatIntentTryResp(resp?.data, order, {
      isMaxModel,
    });
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

export function usePostIntentTry() {
  const handleCommonErr = useHandleCommonErr();
  const createHeaders = useCreateHeaders();
  const refreshSwapBalance = useRefreshSwapBalance();

  return useCallback(
    async (order: any, options: { isMaxModel?: boolean } = {}) => {
      const headers = createHeaders();
      return axios({
        method: 'POST',
        url: '/order-book-api/intent/v2/compact_try_create',
        data: order,
        headers: { ...headers, Version: '0.0.1' },
      })
        .then((resp: any) => {
          const tryResp = formatIntentTryResp(resp?.data, order, options);
          const tryRespNoResult = !tryResp?.result;
          const tryRespIsBalanceEnough = !!tryResp?.is_balance_enough;
          if (tryRespNoResult || !tryRespIsBalanceEnough) {
            refreshSwapBalance({
              refreshIndex: Math.floor(Date.now() / 30000),
            });
            logIntentTryCreate({
              order,
              tryResp,
              hasResult: !!resp.result,
              isBalanceEnough: resp.is_balance_enough,
            });
          }
          return tryResp;
        })
        .catch((err) => {
          return handleCommonErr(err);
        });
    },
    [handleCommonErr, createHeaders, refreshSwapBalance]
  );
}

export function usePostIntentSign() {
  const handleCommonErr = useHandleCommonErr();
  const createHeaders = useCreateHeaders();
  const showModal = useShowModal();

  return useCallback(
    async (order: any) => {
      const headers = createHeaders();
      return axios({
        method: 'POST',
        url: '/order-book-api/intent/v2/sign',
        data: order,
        headers: { ...headers, Version: '0.0.1' },
      })
        .then((resp: any) => {
          return resp?.data;
        })
        .catch((err) => {
          if (err?.code && err?.code === INTENT_EXPIRED) {
            showModal({
              modal: ModalKeys.tips_intent_error,
              errorCode: err?.code,
            });
          }
          return handleCommonErr(err);
        });
    },
    [handleCommonErr, createHeaders, showModal]
  );
}

export function useGetUsdcRoutes() {
  const handleCommonErr = useHandleCommonErr();
  const createHeaders = useCreateHeaders();
  return useCallback(
    ({
      chain,
      amount,
    }: {
      chain: Type_DAChains;
      amount: string;
    }): Promise<{ routes: any[]; target_chain_solver_balance: any }> => {
      const headers = createHeaders();
      const apiParams = {
        target_chain: chain,
        amount,
        symbol: 'USDC',
      };

      return axios({
        url: `/order-book-api/intent/bridge-routes`,
        method: 'GET',
        params: apiParams,
        headers,
      })
        .then((resp: any) => {
          const { cross_chain_strategy, target_chain_solver_balance } =
            resp?.data ?? {};
          return { routes: cross_chain_strategy, target_chain_solver_balance };
        })
        .catch((err) => handleCommonErr(err));
    },
    [handleCommonErr, createHeaders]
  );
}

const formatIntentTryResp = (
  resp: any,
  order: any,
  options: { isMaxModel?: boolean } = {}
) => {
  const { isMaxModel = false } = options || {};
  const { gas_data } = resp || {};
  const { user_gas_estimated = [], user_pay_estimated = [] } = gas_data || {};
  let totalFeeValue = 0;
  let accoutRentValue = 0;
  let canSwitchPayToken = false;

  const _user_gas_estimated_map = user_gas_estimated
    .map((item: any) => {
      const _amount = formatUnits(item.amount, item.token.decimals);
      const value = multiply(_amount, item.price);
      if (Number(item.rent) > 0) {
        const _rent = formatUnits(item.rent ?? '0', item.token.decimals);
        accoutRentValue = plus(
          accoutRentValue,
          multiply(_rent, item.price) as any
        ) as any;
      }
      if (item.gas_enough) {
        totalFeeValue = plus(totalFeeValue, value) as any;
      }
      return {
        ...item,
        ...item.token,
        id: item.token.token_id,
        value,
        amount: _amount,
        amount_display: _amount,
        value_display: formatNetworFeeValue(value),
      };
    })
    .filter((item: any) => item.gas_enough)
    .reduce((acc: any, item: any) => {
      const key = `${item.token.code}_${item.token.chain}`;

      if (acc[key]) {
        const _amount = plus(acc[key].amount, item.amount) as any;
        const _value = plus(acc[key].value, item.value) as any;
        acc[key].amount = _amount;
        acc[key].amount_display = _amount;
        acc[key].value = _value;
        acc[key].value_display = formatNetworFeeValue(_value);
        return acc;
      }
      return {
        ...acc,
        [key]: item,
      };
    }, {});

  const _user_gas_estimated = Object.values(_user_gas_estimated_map);

  const _user_pay_estimated = user_pay_estimated.map((item: any) => {
    const _amount = formatUnits(item.amount, item.token.decimals);
    const value = multiply(_amount, item.price);
    totalFeeValue = plus(totalFeeValue, value) as any;
    canSwitchPayToken = item.can_switch;
    return {
      ...item,
      ...item.token,
      id: item.token.token_id,
      amount: _amount,
      value,
      amount_display: _amount,
      value_display: formatNetworFeeValue(value),
    };
  });

  const _resp = {
    ...resp,
    isMaxModel,
    totalFeeValue,
    accoutRentValue,
    canSwitchPayToken,
    useGasTokens: _user_gas_estimated,
    usePayTokens: _user_pay_estimated,
  };

  const {
    gasTokenIsOrderOutToken,
    gasNeedAmount,
    gasNeedToken,
    orderOutTokens,
  } = getMaxAvailableTipsAmount(_resp, order);

  // 单币模式下
  let tokenOutAmount;
  if (isMaxModel) {
    tokenOutAmount = getTokenOutAmount(_resp, order);
  }

  const maxTips = getMaxReblanceAmount(_resp);

  let showTryAmountError = !!maxTips;
  let showTryBaseAmountError = false;
  let showTryQuoteAmountError = false;
  const hasDualInput = order?.intent?.token_out?.length > 1;
  if (
    (!isMaxModel || hasDualInput) &&
    gasNeedAmount &&
    gasTokenIsOrderOutToken
  ) {
    showTryAmountError = true;
    // 双币投入模式
    if (gasNeedToken?.symbol === 'USDC') {
      showTryQuoteAmountError = true;
    } else {
      showTryBaseAmountError = true;
    }
  }

  return {
    ..._resp,
    gasNeedAmount,
    gasNeedToken,
    isMaxModel,
    tokenOutAmount,
    maxAmount: maxTips,
    orderOutTokens,
    showTryAmountError,
    showTryBaseAmountError,
    showTryQuoteAmountError,
    gasTokenIsOrderOutToken,
    try_time: Date.now(),
  };
};

// 提示最大数量，max模式下不提示
// payToken === payNeedToken
export const getMaxAvailableTipsAmount = (
  tryResp: any,
  order: any
): {
  gasNeedAmount: string | undefined;
  gasNeedToken: Token | undefined;
  orderOutTokens: Token[];
  gasTokenIsOrderOutToken: boolean;
} => {
  const tokenOutTokens = order?.intent?.token_out || [];
  const { usePayTokens, gas_pay_token_avail, gas_pay_token_needed } =
    tryResp as any;

  const gasNeedToken = usePayTokens.find(
    (item: any) =>
      item.code === gas_pay_token_needed?.token &&
      item.chain === gas_pay_token_needed?.chain
  );

  const gasTokenIsOrderOutToken = tokenOutTokens.some(
    (item: any) =>
      item.chain === gasNeedToken?.chain && item.token === gasNeedToken?.code
  );

  const payTokenAvail = isNumber(gas_pay_token_avail?.amount)
    ? formatUnits(gas_pay_token_avail?.amount, gasNeedToken?.decimals)
    : '0';
  const payTokenNeeded = isNumber(gas_pay_token_needed?.amount)
    ? formatUnits(gas_pay_token_needed?.amount, gasNeedToken?.decimals)
    : '0';

  const gasNeedAmount = minus(payTokenNeeded, payTokenAvail) as string;

  return {
    gasNeedAmount,
    gasNeedToken,
    orderOutTokens: tokenOutTokens,
    gasTokenIsOrderOutToken,
  };
};

// 触发rebalance时候提示最大数量，都是USDC
export const getMaxReblanceAmount = (tryResp: any): string | undefined => {
  const { is_bridge_limited, max_bridge_amount } = tryResp as any;

  if (!is_bridge_limited) {
    return undefined;
  }
  // const usdcOut = orderOutTokens.find((item: any) => item.token === 'USDC');
  if (!isNumber(max_bridge_amount) || Number(max_bridge_amount) <= 0) {
    return undefined;
  }
  const amount = formatUnits(max_bridge_amount, 6);
  if (!isNumber(amount) || Number(amount) <= 0) {
    return undefined;
  }
  return amount;
};

// max模式下，token_out的amount从action中获取
export const getTokenOutAmount = (
  tryResp: any,
  order: any
): string | undefined => {
  const { action, add_on } = tryResp as any;
  const actionOutToken = action?.token_out?.[0];
  const orderOutToken = order?.intent?.token_out?.[0];
  const addOnBridgeTokenIn = add_on?.find(
    (item: any) => item.type === 'BRIDGE_OUT'
  )?.token_in?.[0];

  if (
    addOnBridgeTokenIn &&
    addOnBridgeTokenIn?.chain === orderOutToken?.chain &&
    addOnBridgeTokenIn?.token === orderOutToken?.token
  ) {
    return formatUnits(addOnBridgeTokenIn?.amount, orderOutToken?.decimals);
  }

  if (
    !actionOutToken?.amount ||
    orderOutToken?.chain !== actionOutToken?.chain ||
    orderOutToken?.token !== actionOutToken?.token
  ) {
    return undefined;
  }
  return formatUnits(actionOutToken?.amount, orderOutToken?.decimals);
};

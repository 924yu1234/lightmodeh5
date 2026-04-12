import { useCallback } from 'react';
import { parseUnits } from '@ethersproject/units';

import { INTENT_EXPIRED } from 'src/constants/apiErr';
import { SwapOrderStatus } from 'src/constants/consts';
import { CreateSwapParams, OrderDirs } from 'src/constants/interface';
import useHandleApiError from 'src/hooks/useHandleApiError';
import { useCheckAfterSwapChange } from 'src/hooks/useRefreshData/useRefreshSwapOrders';
import { useShowSwapNotification } from 'src/providers/useSwapNotification';
import {
  useAllowQuickTrading,
  useGaEvent,
  UserCancel,
} from 'src/providers/useWallet';
import { usePostIntentSign } from 'src/state/intent/intentService';
import { useSetAssetMessagesParams } from 'src/state/message/hooks';
import { useChangeUserInterviewConditions } from 'src/state/notification/hooks';
import { useCheckTryBalance } from 'src/state/swap/balances/hooks';
import doConvertSwapOrder from 'src/state/swap/orders/convertSwapOrder';
import { useUpdateSwapOrder } from 'src/state/swap/orders/hooks';
import {
  useCurrentSwapPair,
  useSwapTickerVal,
} from 'src/state/swap/pair/hooks';
import {
  useDoTrySwap,
  useSwapQuoteTokenBalance,
  useSwapSellMaxBalance,
  useSwapTradeInfo,
} from 'src/state/swap/trade/hooks';
import { logSwap, logSwapErr } from 'src/utils/log/swap';
import message from 'src/utils/message';

import createApiErrorTips from 'js/hooks/useCreateApiErrorTips';
import { useIntl } from 'js/locals';
import { useCheckLocalTime, useShowModal } from 'js/state/application/hooks';
import { ModalKeys } from 'js/state/application/reducer';
import {
  useAllowPlaceIntentOrder,
  useDexAccount,
} from 'js/state/dexAccount/hooks';
import { useChangeFirstOrderIsPlaced } from 'js/state/user/hooks';

import { useCheckSwapOrder } from './useCheckSwapOrder';

export default function useCreateSwapOrder() {
  const { baseToken, quoteToken, pairId } = useCurrentSwapPair();
  const checkLocalTime = useCheckLocalTime();
  const showModal = useShowModal();
  const intl = useIntl();
  const { errTips, baseBalanceErr, quoteBalanceErr } = useCheckSwapOrder();
  const { orderDir, baseAmount, quoteAmount, maxSlippage, price, tryResp } =
    useSwapTradeInfo();
  const { showSwapOrder } = useShowSwapNotification();
  const allowQuickTrading = useAllowQuickTrading();

  const updateSwapOrder = useUpdateSwapOrder();
  const gaEvent = useGaEvent();
  const doTry = useDoTrySwap();

  const takerFee = useSwapTickerVal('takerFee');
  const allowPlaceIntentOrder = useAllowPlaceIntentOrder(baseToken.chain);
  const checkTryBalance = useCheckTryBalance();

  // 单链版本判断余额
  const quoteTokenBalance = useSwapQuoteTokenBalance();
  const sellMaxBalance = useSwapSellMaxBalance();

  return useCallback(async () => {
    if (!allowPlaceIntentOrder) {
      message.error(intl.beta_test_tips);
      return Promise.reject();
    }
    if (!checkLocalTime()) return Promise.reject();
    if (baseBalanceErr || quoteBalanceErr) {
      showModal({
        modal: ModalKeys.err_insufficientBalance,
        type: 'swap',
        baseBalanceErr,
        quoteBalanceErr,
      });
      return Promise.reject();
    }
    if (
      !checkTryBalance(tryResp, doTry, {
        isSwap: true,
        balance:
          orderDir === OrderDirs.BUY ? quoteTokenBalance : sellMaxBalance,
      })
    ) {
      return Promise.reject();
    }
    if (errTips) {
      return Promise.reject({ err: '', message: errTips });
    }

    const order: CreateSwapParams & {
      pairId: number;
    } = {
      pairId,
      price,
      orderDir,
      chain_uuid: tryResp?.chain_uuid,
      baseToken: {
        ...baseToken,
        volume: parseUnits(baseAmount, baseToken.decimals)?.toString(),
        amount: baseAmount,
      },
      quoteToken: {
        ...quoteToken,
        volume: parseUnits(quoteAmount, quoteToken.decimals)?.toString(),
        amount: quoteAmount,
      },
      maxSlippage,
      takerFee: (takerFee || '').toString(),
      localOrderId: `${baseToken?.symbol}_${Date.now()}_${Math.random()}`,
      tryResp,
    };

    const sellToken =
      order.orderDir === OrderDirs.BUY ? order.quoteToken : order.baseToken;
    const buyToken =
      order.orderDir === OrderDirs.BUY ? order.baseToken : order.quoteToken;
    const swap = {
      ...order,
      order_side: order.orderDir,
      base_token: baseToken,
      quote_token: quoteToken,
      buy_token: { ...buyToken },
      sell_token: { ...sellToken },
      pay_token: sellToken,
      fee_token: sellToken,
      filled_buy_token_volume: '0',
      filled_sell_token_volume: '0',

      status: SwapOrderStatus.processing,
      create_time: Math.floor(Date.now() / 1000),
      sell_volume: sellToken?.volume,
    };

    const swapOrder = doConvertSwapOrder({
      data: swap,
    });
    if (allowQuickTrading) {
      showSwapOrder({
        order: swapOrder,
      });
    }
    updateSwapOrder(swapOrder);

    logSwap({
      method: 'pending',
      ...order,
    });
    gaEvent('create_swap_order', {
      method: 'pending',
      ...order,
      base_token: {
        code: baseToken?.code,
        chain: baseToken?.chain,
        amount: baseToken?.amount,
      },
      quote_token: {
        code: quoteToken?.code,
        chain: quoteToken?.chain,
        amount: quoteToken?.amount,
      },
      buy_token: undefined,
      sell_token: undefined,
      pay_token: undefined,
      fee_token: undefined,
    });
    return { ...order, notificationOrder: swapOrder };
  }, [
    checkTryBalance,
    gaEvent,
    allowPlaceIntentOrder,
    intl,
    checkLocalTime,
    allowQuickTrading,
    baseAmount,
    quoteAmount,
    maxSlippage,
    baseBalanceErr,
    quoteBalanceErr,
    orderDir,
    baseToken,
    quoteToken,
    errTips,
    price,
    showModal,
    pairId,
    takerFee,
    showSwapOrder,
    updateSwapOrder,
    tryResp,
    doTry,
    quoteTokenBalance,
    sellMaxBalance,
  ]);
}

export function useSubmitSwapSign() {
  const intl = useIntl();
  const changeFirstOrderIsPlaced = useChangeFirstOrderIsPlaced();
  const check = useCheckAfterSwapChange();
  const dexAccount = useDexAccount();
  const handleApiError = useHandleApiError();
  const changeUserInterviewConditions = useChangeUserInterviewConditions();
  const { baseToken, quoteToken } = useCurrentSwapPair();
  const updateSwapOrder = useUpdateSwapOrder();
  const showModal = useShowModal();
  const postIntentSign = usePostIntentSign();
  const setAssetMessagesParams = useSetAssetMessagesParams();
  const gaEvent = useGaEvent();
  // const getSwapOrderError = useGetSwapOrderError();

  const doUpload = useCallback(
    ({
      order,
      signResp,
    }: {
      order: CreateSwapParams & {
        pairId: number;
        minimumReceive: string;
        intent_id?: number;
      };
      signResp: any;
      showNotification?: boolean;
    }) => {
      const sellToken =
        order.orderDir === OrderDirs.BUY ? order.quoteToken : order.baseToken;
      const buyToken =
        order.orderDir === OrderDirs.BUY ? order.baseToken : order.quoteToken;

      changeFirstOrderIsPlaced(true);

      // 奖create接口的intent_id更新到本地订单上
      updateSwapOrder({
        localOrderId: order.localOrderId,
        order_id: signResp.uuid,
      } as any);

      const logParams = {
        ...order,
        owner: dexAccount?.account,
        base_token: {
          code: baseToken?.code,
          chain: baseToken?.chain,
          amount: baseToken?.amount,
        },
        quote_token: {
          code: quoteToken?.code,
          chain: quoteToken?.chain,
          amount: quoteToken?.amount,
        },
        baseToken: undefined,
        buy_token: undefined,
        sell_token: undefined,
        pay_token: undefined,
        fee_token: undefined,
        quoteToken: undefined,
      };

      const timer = setTimeout(() => {
        check(true);
        logSwap({
          method: 'timeout check',
        });
      }, 30000);

      return postIntentSign(signResp)
        .then((resp) => {
          setAssetMessagesParams({
            syncIn5S: true,
          });
          changeUserInterviewConditions({ createOrderSuccess: true });

          clearTimeout(timer);
          gaEvent('create_swap_order', {
            method: 'create swap success',
            ...logParams,
          });
          logSwap({
            method: 'create swap success',
            ...logParams,
          });
          check();
          const baseToken = order?.baseToken;
          const quoteToken = order?.quoteToken;
          const orderResp = resp?.data as any;
          if (orderResp) {
            const swap = doConvertSwapOrder({
              data: {
                ...orderResp,
                localOrderId: order.localOrderId,
                order_side: order.orderDir,
                base_token: baseToken,
                quote_token: quoteToken,
                buy_token: { ...buyToken },
                sell_token: { ...sellToken },
                fee_token: sellToken,
                filled_buy_token_volume: '0',
                filled_sell_token_volume: '0',
              },
            });
            updateSwapOrder(swap);
          }
          return resp;
        })
        .catch((err) => {
          const error = err?.error || err;
          updateSwapOrder({
            order_id: signResp.uuid,
            status: SwapOrderStatus.failed,
          } as any);
          clearTimeout(timer);
          logSwapErr({
            error,
            ...logParams,
          });
          gaEvent('create_swap_order', {
            method: 'api error',
            error,
            ...logParams,
          });

          if (error?.code === INTENT_EXPIRED) {
            return Promise.reject({});
          }

          if (error?.code && error?.code !== UserCancel) {
            showModal({
              modal: ModalKeys.tips_intent_error,
              errorCode: error?.code,
            });
            return Promise.reject({});
          }

          return Promise.reject({
            code: err?.code,
            showMessage: createApiErrorTips({ error: err, intl }),
          });
        });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      gaEvent,
      setAssetMessagesParams,
      quoteToken?.decimals,
      intl,
      showModal,
      changeFirstOrderIsPlaced,
      postIntentSign,
      check,
      dexAccount?.account,
      changeUserInterviewConditions,
      handleApiError,
      updateSwapOrder,
    ]
  );
  return doUpload;
}

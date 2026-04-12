import React, { useCallback, useRef } from 'react';

import { UIButton } from 'src/UI';

import SwapBtnWrapper from 'src/apps/components/SwapBtnWrapper';
import { SwapOrderStatus } from 'src/constants/consts';
import {
  CreateSwapParams,
  CreateSwapResp,
  OrderDirs,
} from 'src/constants/interface';
import { Type_DAChains } from 'src/da';
import { useShowSwapNotification } from 'src/providers/useSwapNotification';
import { useAllowQuickTrading, UserCancel } from 'src/providers/useWallet';
import { useDexAccount } from 'src/state/dexAccount/hooks';
import { useCheckDAs } from 'src/state/dexAccount/opr/useCheckDAs';
import {
  useCheckSwapOrder,
  useCheckSwapOrderMinTips,
} from 'src/state/dexAccount/opr/useCheckSwapOrder';
import useCreateIntentOrder, {
  useSubmitSwapSign,
} from 'src/state/dexAccount/opr/useCreateSwapOrder';
import { useUpdateSwapOrder } from 'src/state/swap/orders/hooks';
import { useCurrentSwapPair } from 'src/state/swap/pair/hooks';
import useCheckPairBlacklist from 'src/state/swap/pair/useCheckBlacklist';
import {
  useResetSwapTrade,
  useSwapOrderDir,
  useSwapTradeInfo,
} from 'src/state/swap/trade/hooks';
import { formatTokenSymbol } from 'src/utils/format';
import { logSwapErr } from 'src/utils/log/swap';
import { logger } from 'src/utils/logger';

import useCreateWalletErrorTips from 'js/hooks/useCreateWalletErrorTips';
import useRenderWalletBtn from 'js/hooks/useRenderWalletBtn';
import { useIntl } from 'js/locals';
import { useForceShowTradeBtn } from 'js/state/application/hooks';
import useCheckRegion from 'js/state/regionCheck/hooks';
import { useCheckBlacklist } from 'js/state/user/hooks';
import message from 'js/utils/message';

export default function IntentOrderBtn() {
  const intl = useIntl();
  const orderDir = useSwapOrderDir();
  const dexAccount = useDexAccount();
  const ref = useRef<HTMLDivElement>();
  const checkRegion = useCheckRegion();
  const checkBlacklist = useCheckBlacklist();
  const createOrder = useCreateIntentOrder();
  const createErr = useCreateWalletErrorTips();
  const { disabled, errTips } = useCheckSwapOrder();
  const allowQuickTrading = useAllowQuickTrading();

  const currentPair = useCurrentSwapPair();
  const { baseToken } = currentPair;
  const { estimating, gasToken } = useSwapTradeInfo();

  const postOrder = useSubmitSwapSign();
  const updateSwapOrder = useUpdateSwapOrder();

  const checkDAs = useCheckDAs();

  const checkMinTips = useCheckSwapOrderMinTips();
  const forceShowTradeBtn = useForceShowTradeBtn();
  const { showSwapOrder } = useShowSwapNotification();
  const resetSwapTrade = useResetSwapTrade();
  const checkPairBlacklist = useCheckPairBlacklist();

  const handlePostOrder = useCallback(
    ({ order, signResp }: any) => {
      return postOrder({
        order,
        signResp,
      }).catch((err) => {
        showSwapOrder({
          order: {
            ...(order as any)?.notificationOrder,
            errorCode: err?.code,
            status: SwapOrderStatus.failed,
            statusKey: SwapOrderStatus.failed,
          },
        });
      });
    },
    [postOrder, showSwapOrder]
  );
  // 传递参数给wallet，包括data以及签名后的处理
  const handle = useCallback(
    ({ order, resolve }: { order: CreateSwapParams; resolve: any }) => {
      resolve({
        data: order,
        onSignSuccess: (resp: CreateSwapResp) => {
          handlePostOrder(resp);
          if (!allowQuickTrading && (order as any)?.notificationOrder) {
            showSwapOrder({
              order: {
                ...(order as any)?.notificationOrder,
                intent_id: resp.signResp?.intent_id,
              },
            });
          }
        },
        onSignError: (err: any) => {
          if (err?.code === UserCancel) {
            message.error(createErr(err));
          }
          if (err?.errorType === 'order_cancel' || err?.code === UserCancel) {
            updateSwapOrder({
              localOrderId: order?.localOrderId,
              status: SwapOrderStatus.canceled,
            } as any);
            return;
          }
          showSwapOrder({
            order: {
              ...(order as any)?.notificationOrder,
              status: SwapOrderStatus.failed,
              statusKey: SwapOrderStatus.failed,
            },
          });
          updateSwapOrder({
            ...(err?.order || order),
            status: SwapOrderStatus.failed,
          });
        },
      });
    },
    [
      handlePostOrder,
      createErr,
      updateSwapOrder,
      showSwapOrder,
      allowQuickTrading,
    ]
  );

  const submitOrder = useCallback(() => {
    if (!checkBlacklist()) return Promise.reject({});
    if (!checkPairBlacklist()) return Promise.reject({});
    if (!checkRegion()) return Promise.reject({});
    if (errTips) {
      message.error(errTips);
      return Promise.reject({});
    }
    if (!checkDAs(baseToken?.chain as Type_DAChains)) return Promise.reject({});
    if (!checkDAs(gasToken?.chain as Type_DAChains)) return Promise.reject({});
    if (!checkMinTips()) return Promise.reject({});
    // 如果未解锁，则显示loading
    // 创建订单 return Promise<{order, onSignSuccess, onSignError}>
    return new Promise((resolve, reject) => {
      createOrder()
        .then(async (order: CreateSwapParams) => {
          resetSwapTrade();
          handle({
            order,
            resolve,
          });
        })
        .catch((error) => {
          reject(error);
          if (error?.message) message.error(error?.message);
        });
    });
  }, [
    baseToken?.chain,
    errTips,
    checkMinTips,
    createOrder,
    handle,
    checkRegion,
    checkBlacklist,
    checkPairBlacklist,
    resetSwapTrade,
    checkDAs,
    gasToken,
  ]);

  const isHideWalletBtn = useRenderWalletBtn({
    disabled,
    ref,
    baseToken,
    orderDir,
    submitOrder, // 按钮入口
    checkHideBtnByBtnRect: undefined,
    type: 'swap',
  });
  const clickTradeBtn = useCallback(() => {
    if (errTips) {
      message.error(errTips);
      return;
    }
    logger.error(isHideWalletBtn);
    forceShowTradeBtn();
    logSwapErr({
      method: 'clickTradeBtn swap',
      account: dexAccount?.account,
      log_error: 'clickTradeBtn swap',
      isHideWalletBtn,
    });
  }, [dexAccount?.account, errTips, isHideWalletBtn, forceShowTradeBtn]);

  return (
    <>
      <SwapBtnWrapper>
        <UIButton
          eventName="btn_swap_trade"
          className={
            orderDir === OrderDirs.SELL ? 'dg-swap-sell' : 'dg-swap-buy'
          }
          uiVariant={orderDir === OrderDirs.SELL ? 'sell' : 'buy'}
          loading={estimating}
          ref={ref as any}
          onClick={clickTradeBtn}
        >
          {orderDir === OrderDirs.SELL
            ? intl['trade.btn_sell_ETH']?.replace(
                'ETH',
                formatTokenSymbol(baseToken?.symbol ?? '')
              )
            : intl['trade.btn_buy_ETH']?.replace(
                'ETH',
                formatTokenSymbol(baseToken?.symbol ?? '')
              )}
        </UIButton>
      </SwapBtnWrapper>
    </>
  );
}

IntentOrderBtn.propTypes = {};

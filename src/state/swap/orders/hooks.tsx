import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  SWAP_SIGNATURE_TIMEOUT,
  SWAP_SLIPPAGE_EXCEEDED,
  SWAP_TRANSACTION_TIMEOUT,
} from 'src/constants/apiErr';
import { useCommonConfig } from 'src/hooks/useClientConfig';
import { useIntl, useSetLocale } from 'src/locals';
import { AppState } from 'src/state';
import { useIsShowCurrentPair } from 'src/state/user/hooks';
import { logSwapOrder } from 'src/utils/log/swap';

import { useCurrentSwapPair } from '../pair/hooks';
import { SwapOrder } from './convertSwapOrder';
import {
  fetchingNextPageSwapOrders,
  refrehSwapOrders,
  updateSwapOrder,
} from './reducer';

export function useSwapOrders({ showAll = false }: { showAll?: boolean } = {}) {
  const showCurrentPair = useIsShowCurrentPair('swap');
  const { baseToken, quoteToken } = useCurrentSwapPair();
  const orders = useSelector((state: AppState) => state.swapOrders.orders);
  const total = useSelector((state: AppState) => state.swapOrders.total);

  return useMemo(() => {
    // 因为try失败取消的本地订单，不显示
    if (!showCurrentPair || showAll) {
      return {
        orders,
        total,
      };
    }
    const filteredList = orders.filter((d) => {
      if (!d.quoteToken?.id || !d.baseToken?.id) {
        logSwapOrder({
          method: 'filterOrderFailed',
          order: d,
        });
      }
      return (
        baseToken?.id === d.baseToken?.id && quoteToken?.id === d.quoteToken?.id
      );
    });
    return {
      orders: filteredList,
      total: filteredList.length,
    };
  }, [orders, total, baseToken, quoteToken, showCurrentPair, showAll]);
}

export function useFetchingNextPageIndex() {
  const fetchingNext = useSelector(
    (state: AppState) => state.swapOrders.fetchingNext
  );
  return fetchingNext;
}

export function useSwapOrdersLoading() {
  const loading = useSelector((state: AppState) => state.swapOrders.loading);
  return loading;
}

export function useSwapOrder({
  id,
  orderId,
}: {
  id?: string;
  orderId?: string;
}): SwapOrder | undefined {
  const { orders } = useSwapOrders({ showAll: true });
  return useMemo(
    () => orders.find((o: SwapOrder) => o.id === id || o.order_id === orderId),
    [orders, id, orderId]
  );
}

export function useUpdateSwapOrder() {
  const dispatch = useDispatch();
  return useCallback(
    (order: SwapOrder, showSwapOrder?: any) => {
      dispatch(updateSwapOrder({ order, showSwapOrder }));
    },
    [dispatch]
  );
}

export function useRefreshSwapOrders() {
  const dispatch = useDispatch();
  return useCallback(() => {
    dispatch(refrehSwapOrders());
  }, [dispatch]);
}

export function useRefreshSwapOrdersIndex() {
  return useSelector((state: AppState) => state.swapOrders.refreshIndex);
}

export function useFetchNextSwapOrders() {
  const dispatch = useDispatch();
  return useCallback(() => {
    dispatch(fetchingNextPageSwapOrders());
  }, [dispatch]);
}

export function useGetSwapOrderError() {
  const intl = useIntl();
  const { data: configs } = useCommonConfig('api_errors');
  const { locale } = useSetLocale();
  return useCallback(
    ({
      errorCode,
      isToast = false,
    }: {
      errorCode: number;
      isToast?: boolean;
    }) => {
      const config = (configs || []).find(
        (config: any) => config.code === errorCode
      );
      if (config) {
        return config.message[locale] || config.message['en-US'];
      }
      if (errorCode === SWAP_SLIPPAGE_EXCEEDED) {
        return intl.swap_max_slippage_exceeded;
      }
      if (
        errorCode === SWAP_TRANSACTION_TIMEOUT ||
        errorCode === SWAP_SIGNATURE_TIMEOUT
      ) {
        return intl.transaction_timeout;
      }
      if (errorCode === 90002) {
        return isToast
          ? intl.swap_error.Swap_failed_return_below_minimum_receive
          : intl.swap_error.Return_below_minimum_receive;
      }
      if (errorCode === 82000) {
        return isToast
          ? intl.swap_error
              .Insufficient_liquidity_for_this_token_reduce_amount_and_try_again_later
          : intl.swap_error.Insufficient_liquidity_for_this_token;
      }
      if (errorCode === 82112) {
        return isToast
          ? intl.swap_error.Swap_failed_price_impact_exceeds_limit
          : intl.swap_error.Price_impact_exceeds_limit;
      }
      if (errorCode === 82120) {
        return isToast
          ? intl.swap_error.Swap_failed_honeypot_or_high_risk_token_detected
          : intl.swap_error.Honeypot_or_high_risk_token_detected;
      }
      if (errorCode === 90000) {
        return isToast
          ? intl.swap_error.Swap_failed_insufficient_sol_for_rent
          : intl.swap_error.Insufficient_sol_for_rent;
      }
      if (errorCode === 90001) {
        return isToast
          ? intl.swap_error
              .Estimated_network_fee_is_less_than_the_actual_amount_required
          : intl.swap_error
              .Estimated_network_fee_is_less_than_the_actual_amount_required;
      }
      return '';
    },
    [intl, configs, locale]
  );
}

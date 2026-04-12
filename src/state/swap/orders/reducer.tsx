import { createSlice } from '@reduxjs/toolkit';

import { SwapOrderStatus } from 'src/constants/consts';

import { updateVersion } from 'js/state/globalAction';

import { SwapOrder } from './convertSwapOrder';

export interface SwapOrders {
  current: number;
  fetchingNext: number;
  total: number;
  loading: boolean;
  orders: SwapOrder[];
  showCurrentPair: boolean;
  refreshIndex: number;
}

const initialState: SwapOrders = {
  current: 0,
  total: 0,
  fetchingNext: 0,
  loading: false,
  orders: [],
  showCurrentPair: false,
  refreshIndex: 0,
};

const swapOrdersSlice = createSlice({
  name: 'swapOrders',
  initialState,
  reducers: {
    fetchingSwapOrders(state) {
      state.loading = true;
    },
    fetchedSwapOrders(state, action) {
      const { list, current, total } = action.payload;
      state.orders = list;
      state.current = current;
      state.fetchingNext = 0;
      state.total = total;
    },
    fetchingNextPageSwapOrders(state) {
      state.loading = true;
      state.fetchingNext = state.current;
    },
    fetchedNextPageSwapOrders(state, action) {
      state.fetchingNext = 0;
      const { list, current, pairId, total } = action.payload;
      if (pairId && !state.showCurrentPair) {
        return;
      }
      state.orders = [...state.orders, ...list];
      state.total = total;
      state.current = current;
    },
    updateSwapOrder(state, action) {
      const { order, showSwapOrder } = action.payload;
      const hasPreForOrderId = state.orders.some(
        (o) => o.order_id && o.order_id === order.order_id
      );
      const hasPreLocale = state.orders.some(
        (o) => o.localOrderId && o.localOrderId === order.localOrderId
      );
      // ws推送的订单，没有本地记录的进行中订单或者其他状态订单则显示右下角弹窗
      if (showSwapOrder) {
        if (!hasPreForOrderId) {
          showSwapOrder({ order });
        }
        if (order?.status !== SwapOrderStatus.processing) {
          const preOrder = state.orders.find(
            (o) => o.order_id === order.order_id
          );
          showSwapOrder({
            order: {
              ...preOrder,
              ...order,
              id: preOrder?.localOrderId,
            },
          });
        }
      }
      if (hasPreForOrderId) {
        state.orders = state.orders.map((o) =>
          o.order_id === order.order_id
            ? { ...o, ...order, localOrderId: o.localOrderId }
            : o
        );
      } else if (hasPreLocale) {
        state.orders = state.orders.map((o) =>
          o.localOrderId === order.localOrderId ? { ...o, ...order } : o
        );
      } else {
        state.orders = [order].concat(state.orders);
        state.total += 1;
      }
    },
    refrehSwapOrders(state) {
      state.refreshIndex += 1;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateVersion, (state) => {
      state.showCurrentPair = !!state.showCurrentPair;
    });
  },
});

export const {
  fetchingSwapOrders,
  fetchedSwapOrders,
  updateSwapOrder,
  fetchedNextPageSwapOrders,
  fetchingNextPageSwapOrders,
  refrehSwapOrders,
} = swapOrdersSlice.actions;

export default swapOrdersSlice.reducer;

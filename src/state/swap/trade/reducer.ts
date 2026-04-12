import { createSlice } from '@reduxjs/toolkit';

import { OrderDirs, Token } from 'src/constants/interface';

import { updateVersion } from 'js/state/globalAction';

export interface SwapTradeState {
  orderDir: OrderDirs;
  estimating: boolean;
  refreshTime: number;
  baseAmount: string;
  quoteAmount: string;
  maxSlippage: string;
  balanceEstimate: any; // 以余额预估，用于点击max时，预估全量买单
  tryKey: string;
  tryResp: any;
  usdcToken?: Token;
  gasToken?: Token;
  isMaxModel: number;
  isTryingMax: boolean;
}

const initialState: SwapTradeState = {
  orderDir: OrderDirs.BUY,
  estimating: false,
  refreshTime: 0,
  usdcToken: undefined,
  gasToken: undefined,
  baseAmount: '',
  quoteAmount: '',
  maxSlippage: '0.01',
  balanceEstimate: {},
  tryKey: '',
  tryResp: null,
  isMaxModel: 0,
  isTryingMax: false,
};

const swapTradeSlice = createSlice({
  name: 'swapTrade',
  initialState,
  reducers: {
    changeOrderDir(state, action) {
      const { orderDir } = action.payload;
      state.orderDir = orderDir;
      if (orderDir === OrderDirs.BUY) {
        state.baseAmount = '';
      } else {
        state.quoteAmount = '';
      }
      state.isMaxModel = 0;
      state.isTryingMax = false;
    },
    typeInput(state, action) {
      const { fields } = action.payload;
      fields.forEach(({ field, val }: any) => {
        (state as any)[field] = val;
      });
    },
    resetSwapTrade(state) {
      state.baseAmount = '';
      state.quoteAmount = '';
      state.estimating = false;
      state.gasToken = undefined;
      state.isMaxModel = 0;
      state.isTryingMax = false;
    },
    refreshEstimate(state) {
      // 1秒一次
      state.refreshTime = Math.ceil(Date.now() / 1000);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateVersion, (state) => {
      state.maxSlippage = state.maxSlippage || '0.01';
      if (Number(state.maxSlippage) > 0.5) {
        state.maxSlippage = '0.5';
      }
    });
  },
});

export const { changeOrderDir, typeInput, resetSwapTrade, refreshEstimate } =
  swapTradeSlice.actions;
export default swapTradeSlice.reducer;

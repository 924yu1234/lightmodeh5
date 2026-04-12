import { createSlice } from '@reduxjs/toolkit';

import { Type_EARN_PROTOCOLS } from 'src/da';

export interface IntentEarnState {
  vaults: any[];
  vaultsDetail: Record<string, any>; // address
  vaultsDetailWithoutAddress: Record<string, any>; // address
  refreshIndex: number; // 用于刷新所有details，当进入earn页面时获取一次
  showLoading: boolean; // 用于显示骨架屏
  loadingDetail: Record<Type_EARN_PROTOCOLS, number>; // 用于刷新单个vault的detail
}

const initialState: IntentEarnState = {
  vaults: [],
  vaultsDetailWithoutAddress: {},
  vaultsDetail: {},
  refreshIndex: 0,
  showLoading: true,
  loadingDetail: {
    Morpho: 1,
    Kamino: 1,
  },
};

const intentEarnSlice = createSlice({
  name: 'intentEarn',
  initialState,
  reducers: {
    updateIntentEarnState(state: IntentEarnState, action: any) {
      const params = action.payload;
      for (const i in params) {
        if (i in initialState) {
          (state as any)[i] = params[i];
        }
      }
    },
    updateFetchingDetail(state: IntentEarnState, action: any) {
      const { protocol } = action.payload;
      if (protocol) {
        state.loadingDetail[protocol] = Math.ceil(Date.now() / 3000);
      } else {
        Object.keys(state.loadingDetail).forEach((key) => {
          state.loadingDetail[key as Type_EARN_PROTOCOLS] = Math.ceil(
            Date.now() / 3000
          );
        });
      }
    },
    updateVaultsDetailWithoutAddress(state: IntentEarnState, action: any) {
      const { details } = action.payload;
      state.vaultsDetailWithoutAddress = {
        ...state.vaultsDetailWithoutAddress,
        ...details,
      };
    },
    updateFetchingDetailSuccess(state: IntentEarnState, action: any) {
      const { protocol } = action.payload;
      state.loadingDetail[protocol] = 0;
      if (Object.values(state.loadingDetail).every((d) => d === 0)) {
        state.showLoading = false;
      }
    },
    updateIntentEarnDetail(state: IntentEarnState, action: any) {
      const { details } = action.payload;
      state.vaultsDetail = { ...state.vaultsDetail, ...details };
    },
    clearIntentEarnState(state: IntentEarnState) {
      state.vaults = [];
      state.refreshIndex = 0;
    },
    refreshIntentEarnState(state: IntentEarnState) {
      state.refreshIndex++;
    },
  },
});

export const {
  updateIntentEarnState,
  updateIntentEarnDetail,
  updateFetchingDetail,
  updateFetchingDetailSuccess,
  clearIntentEarnState,
  refreshIntentEarnState,
  updateVaultsDetailWithoutAddress,
} = intentEarnSlice.actions;
export default intentEarnSlice.reducer;

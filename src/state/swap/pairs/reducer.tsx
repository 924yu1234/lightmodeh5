import { createSlice } from '@reduxjs/toolkit';

import { Pair } from 'js/constants/interface/pairs';

export interface PairsKeys {
  [requestKey: string]: boolean;
}
export interface PairsState {
  refreshPairsIndex: number;
  pairsRequestKeys: PairsKeys;
  pairs: Pair[];
  stocksPairs: Pair[];
  pairsRefreshTime: number;
  favorites: {
    [infokey: string]: {
      [pairId: number]: Pair;
    };
  };
}

const initialState: PairsState = {
  refreshPairsIndex: 0,
  pairsRequestKeys: {},
  pairs: [],
  stocksPairs: [],
  favorites: {},
  pairsRefreshTime: 0,
};

const swapPairsSlice = createSlice({
  name: 'swapPairs',
  initialState,
  reducers: {
    refreshSwapPairs(state) {
      state.refreshPairsIndex = Date.now();
    },
    toggleFavoriteSwapPairs(state, action) {
      const { pair, infoKey, flag } = action.payload;
      const addFaviroteTime = flag ? new Date().valueOf() : 0;
      state.favorites[infoKey] = state.favorites[infoKey] || {};
      const preFavorites = state.favorites[infoKey];
      if (flag) {
        preFavorites[pair?.pairId] = { ...pair, addTime: addFaviroteTime };
      } else {
        delete preFavorites[pair?.pairId];
      }
    },
    refreshFavoriteSwapPairs(state, action) {
      const { infoKey, pairs } = action.payload;
      if (!infoKey) return;
      state.favorites[infoKey] = state.favorites[infoKey] || {};
      const preFavorites = state.favorites[infoKey];

      pairs.forEach((pair: Pair) => {
        const pre = preFavorites[pair?.pairId];
        if (pre) {
          preFavorites[pair?.pairId] = { ...pre, ...pair };
        }
      });
    },
    requestSwapPairs(state, action) {
      const { requestKey } = action.payload;
      const pre = state.pairsRequestKeys;
      state.pairsRequestKeys = {
        ...pre,
        [requestKey]: true,
      };
    },
    fetchingSwapPairs(state, action) {
      const { requestKeys } = action.payload;
      const pre = state.pairsRequestKeys;
      state.pairsRequestKeys = {
        ...pre,
        ...requestKeys.reduce((re: PairsKeys, key: string) => {
          re[key] = false;
          return re;
        }, {}),
      };
    },
    updateSwapPairs(state, action) {
      const { pairs } = action.payload;
      state.pairs = pairs;
      state.pairsRefreshTime = Date.now();
    },
    updateStocksPairs(state, action) {
      const { pairs } = action.payload;
      state.stocksPairs = pairs;
    },
    updateSwapPairsFromWs(state, action) {
      const { dataMap, useTickerData } = action.payload;
      // 有新交易对注册
      if (Object.keys(dataMap)?.length > state?.pairs?.length) {
        state.refreshPairsIndex = Date.now();
      }
      state.pairs = state.pairs.map((p) => {
        return {
          ...p,
          ...dataMap[p.pairId],
        };
      });
      // 使用ticker推送数据更新，不刷新pairPrice推送时间
      if (!useTickerData) {
        const preTime = state.pairsRefreshTime;
        const now = Date.now();

        // DEG-9790 ws订阅收到数据后，检查上次更新时间，如果大于30秒则更新一次接口
        if (now - preTime > 60000) {
          state.refreshPairsIndex += 1;
        }
        state.pairsRefreshTime = now;
      }
    },
  },
});

export const {
  refreshSwapPairs,
  toggleFavoriteSwapPairs,
  requestSwapPairs,
  fetchingSwapPairs,
  updateSwapPairs,
  updateStocksPairs,
  refreshFavoriteSwapPairs,
  updateSwapPairsFromWs,
} = swapPairsSlice.actions;
export default swapPairsSlice.reducer;

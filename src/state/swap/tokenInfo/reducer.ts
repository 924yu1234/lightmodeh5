import { createSlice } from '@reduxjs/toolkit';

interface TokenInfo {
  price: string;
  percent: string;
  infoTime: number;
  marketCap: string;
  liquidity: string;
  poolVolume: string;
  info: any;
}

interface TokenInfoState {
  infos: {
    [id: number]: { loading: boolean; data?: TokenInfo; time?: number };
  };
  listeners: { [id: number]: number };
}

const initialState: TokenInfoState = {
  infos: {}, // { [id]: { loading: boolean, data: { price: number, percent: number, infoTime: number }, time: number } }
  listeners: {}, // { [id]: number }
};

const swapTokenInfo = createSlice({
  name: 'swapTokenInfo',
  initialState,
  reducers: {
    addListeners(state, { payload: { ids } }) {
      const listeners = state.listeners
        ? state.listeners
        : (state.listeners = {});
      ids.forEach((id: number) => {
        const pre = listeners[id] || 0;
        listeners[id] = pre + 1;
      });
    },
    removeListeners(state, { payload: { ids } }) {
      const listeners = state.listeners
        ? state.listeners
        : (state.listeners = {});

      if (!listeners) return;
      ids.forEach((id: number) => {
        const pre = listeners[id];
        if (!pre) return;
        if (pre === 1) {
          delete listeners[id];
        } else {
          listeners[id] = pre - 1;
        }
      });
    },
    fetchingListeners(state, { payload: { ids } }) {
      state.infos = state.infos ?? {};
      ids.forEach((id: number) => {
        const current = state.infos[id];
        if (!current) {
          state.infos[id] = {
            loading: true,
          };
        } else {
          state.infos[id].loading = true;
        }
      });
    },
    errorFetchingSwapInfo(state, { payload: { ids } }) {
      state.infos = state.infos ?? {};
      const time = Date.now();
      ids.forEach((id: number) => {
        const current = state.infos[id];
        if (!current) {
          return;
        }
        current.data = undefined;
        current.loading = false;
        current.time = time;
      });
    },

    updateSwapInfoPrice(state, { payload: { results } }) {
      state.infos = state.infos ?? {};
      const time = Date.now();
      Object.keys(results).forEach((id: string) => {
        const pre = state.infos[Number(id)];
        state.infos[Number(id)] = {
          data: {
            ...pre?.data,
            ...results[id],
          },
          time,
          loading: false,
        };
      });
    },
    updateSwapInfo(state, { payload: { results } }) {
      state.infos = state.infos ?? {};
      const time = Date.now();
      Object.keys(results).forEach((id: string) => {
        state.infos[Number(id)] = {
          data: results[id],
          time,
          loading: false,
        };
      });
    },
    updateSwapInfoFromWs(state, { payload: { result, id } }) {
      state.infos = state.infos ?? {};
      const time = Date.now();
      state.infos[id] = {
        data: result,
        time,
        loading: false,
      };
    },
  },
  extraReducers: () => {},
});

export const {
  addListeners,
  removeListeners,
  fetchingListeners,
  errorFetchingSwapInfo,
  updateSwapInfo,
  updateSwapInfoPrice,
  updateSwapInfoFromWs,
} = swapTokenInfo.actions;
export default swapTokenInfo.reducer;

import { createSlice } from '@reduxjs/toolkit';
import { orderBy as orderByFn, unionBy } from 'lodash';

import { CommonToken, OrderDirs } from 'src/constants/interface';

import { updateVersion } from 'js/state/globalAction';

export interface SwapTicker {
  loading: boolean;
  dex?: string;
  last_price?: string;
  price_change_percent?: string;
  is_stable?: boolean;
  allow_stop_limit?: boolean;
  takerFee?: string;
  pairId?: number;
  baseToken?: CommonToken;
  quoteToken?: CommonToken;
  week_high_price?: string;
  week_low_price?: string;
  pair_base_token_price?: string;
  base_token_price?: string;
  base_token_risk_price?: string;
  quote_token_risk_price?: string;
  quote_token_price?: string;
  countdown?: any;
  min_step_size?: string;
  max_size?: string;
  twitter?: string;
  website?: string;
  telegram?: string;
  pool_address?: string;
  liquidity?: string;
  poolVolume?: string;
  marketCap?: string;
  last_updated?: number;
  last_fetch_timestamp?: number;
  kline_disabled?: boolean;
}

export interface SwapPairHistory {
  list: any[];
  loading: boolean;
}

export interface Pair {
  refreshIndex: number;
  pairId: number;
  baseToken?: CommonToken;
  quoteToken?: CommonToken;
  ticker: SwapTicker;
  history: SwapPairHistory;
  orderDir: OrderDirs;
  refreshTickerIndex: number;
  refreshDepthOrdersIndex: number;
  ordersTab: 'latest_trades' | 'my_history';
  pairBlacklist: Record<
    string,
    {
      type: string;
      regions: string[];
    }[]
  >;
}

const historyInit = {
  list: [],
  loading: true,
};

const tickerInint = {
  loading: true,
  is_stable: false,
  dex: '',
  takerFee: '',
  last_price: '',
  pair_id: 0,
  pairId: 0,
  baseToken: undefined,
  quoteToken: undefined,
};

const initialState: Pair = {
  refreshIndex: 0,
  pairId: 0,
  baseToken: undefined,
  quoteToken: undefined,
  ticker: tickerInint,
  pairBlacklist: {},
  history: historyInit,
  orderDir: OrderDirs.BUY,
  refreshTickerIndex: 1,
  refreshDepthOrdersIndex: 1,
  ordersTab: 'latest_trades',
};

const swapPairSlice = createSlice({
  name: 'swapPair',
  initialState,
  reducers: {
    refreshSwapPair(state) {
      state.refreshIndex += 1;
    },
    chooseSwapPair(state, action) {
      const { baseToken, quoteToken, pairId } = action.payload;
      if (state.pairId === pairId) return;
      state.pairId = pairId;
      state.baseToken = baseToken;
      state.quoteToken = quoteToken;
      state.history = historyInit;
      state.ticker = tickerInint;
    },
    fetchingSwapPairTicker(state, action) {
      const { pairId } = action.payload;
      if (pairId === state.ticker.pairId) {
        state.ticker.loading = true;
      } else {
        state.ticker = { loading: true };
      }
    },
    initSwapPairTicker(state, action) {
      const { pairId, data } = action.payload;
      if (pairId !== state.pairId) return;
      state.ticker = {
        ...data,
        last_fetch_timestamp: Date.now(),
      };
    },
    updateSwapPairTicker(state, action) {
      const { pairId, data } = action.payload;
      if (pairId !== state.pairId) return;
      state.ticker = {
        ...state.ticker,
        ...data,
        last_fetch_timestamp: Date.now(),
      };
    },
    refreshSwapPairTicker(state) {
      state.refreshTickerIndex += 1;
    },
    setSwapPairBlacklist(state, action) {
      const { key, blacklist } = action.payload;
      state.pairBlacklist[key] = blacklist;
    },
    initSwapPairHistory(state, action) {
      const { list, pairId } = action.payload;
      if (pairId !== state.pairId) return;
      const newData = unionBy(list, 'uniq_key');
      state.history.list = orderByFn(newData, 'sort_key', 'desc');
      state.history.loading = false;
    },
    updateSwapPairHistory(state, action) {
      const { pairId, wsHistory } = action.payload;
      if (pairId !== state.pairId) return;
      const newData = unionBy(
        [wsHistory].concat(state.history.list),
        'uniq_key'
      );
      state.history.list = orderByFn(newData, 'sort_key', 'desc').slice(0, 80);
    },
    changeSwapOrdersTab(state, action) {
      const { tab } = action.payload;
      state.ordersTab = tab;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateVersion, (state) => {
      state.history = historyInit;
      state.ticker = tickerInint;
      state.refreshTickerIndex = 1;
      state.refreshDepthOrdersIndex = 1;

      state.pairId = state.pairId || 0;
      state.baseToken = state.baseToken || undefined;
      state.quoteToken = state.quoteToken || undefined;
    });
  },
});

export const {
  refreshSwapPair,
  chooseSwapPair,
  fetchingSwapPairTicker,
  initSwapPairTicker,
  updateSwapPairTicker,
  refreshSwapPairTicker,
  initSwapPairHistory,
  updateSwapPairHistory,
  changeSwapOrdersTab,
  setSwapPairBlacklist,
} = swapPairSlice.actions;
export default swapPairSlice.reducer;

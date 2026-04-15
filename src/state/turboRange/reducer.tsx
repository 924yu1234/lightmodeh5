import { createSlice } from '@reduxjs/toolkit';

import { CommonToken, Token } from 'src/constants/interface';
import { Type_DAChains } from 'src/da';

export interface TurboRangeProduct {
  id: string;
  chain: Type_DAChains;
  name: string;
  productName: {
    [locale: string]: string;
  };
  commonSenseSymbol: string;
  poolAddress: string;
  baseToken: CommonToken;
  quoteToken: CommonToken;
  investCurrency: string;
  currentPrice: string;
  showDecimals: number;
  weekAPY: number;
  weekAPY_display: string;
  percent_min: number;
  percent_max: number;
  slippage: string;
  poolUrlText: string;
  poolUrl: string;
  feePercent: string;
  changes24h: string;
  poolCreatedAt: number;
  tvl: string;
  tvlDate: number;
  marketCap: string;
  marketCapDate: number;
  swapPoolFee: number;
  permissions: (
    | 'DEPOSIT'
    | 'WITHDRAW'
    | 'CLAIM'
    | 'ADD_DEPOSIT'
    | 'PARTIAL_WITHDRAW'
    | 'DUAL_DEPOSIT'
    | 'DUAL_ADD_DEPOSIT'
    | 'ADJUST'
  )[];
}
export interface TurboRangeRangeStatusTarget {
  poolAddress: string;
  minPrice: string;
  maxPrice: string;
  currentPrice?: string;
  status: 'OPEN' | 'CLOSED' | 'PENDING';
}

export interface HourlyBreakdownRow {
  hour_ts: number;
  end_ts: number;
  is_partial: boolean;
  yield_usd: string;
  apy: string;
  in_range: boolean;
}

export interface TurboRangePosition extends TurboRangeRangeStatusTarget {
  id: string;
  chain: Type_DAChains;
  positionAddress: string;
  entryPrice: string;
  currentPriceTs?: number;
  yesterdayYield: string;
  yesterdayYield_display: string;
  yesterday_apy: string;
  yesterday_apy_display: string;
  yesterdayApyCalculatedTime: number;
  isYesterdayUpdating: boolean;
  totalYield: string;
  totalYield_display: string;
  apy: string;
  apy_display: string;
  intentId: number;
  duration: number;

  // Last 24h
  last24hYield: string;
  last24hYield_display: string;
  last24hApy: string;
  last24hApy_display: string;

  // Hourly detail
  currentHourApy: string;
  currentHourYieldUsd: string;
  currentHourStartTs: number;
  lastCompleteHourApy: string;
  hourlyBreakdown: HourlyBreakdownRow[];

  // active
  baseToken: Token;
  quoteToken: Token;
  positionValue: string; // 持仓价值 + 未领取收益
  positionValue_display: string;
  principalValue: string; // 持仓价值
  principalValue_display: string;
  unclaimedRewardsValue: string; // 未领取收益
  unclaimedRewardsValue_display: string;

  // init
  depositBaseAmount: string;
  depositQuoteAmount: string;

  // closed
  totalPrincipalBaseAmount: string;
  totalPrincipalQuoteAmount: string;

  withdrawalAndClaimedBaseAmount: string;
  withdrawalAndClaimedQuoteAmount: string;

  principalPnl: string;
  principalPnl_display: string;
  totalPnl: string;
  totalPnl_display: string;

  created_at: number;
  closed_at: number;
  firstYesterdayApyCalculatedTime: number;
  allTimeApyCalculatedTime: number;
  totalReturn?: string;
  totalReturn_display?: string;
  totalRoi?: string;
  totalRoi_display?: string;

  // detail
  unclaimed_rewards?: any[];
  retBaseAmount: string;
  retQuoteAmount: string;
  initReturnValue: string;
}

export interface TurboRangeStrategy extends TurboRangeRangeStatusTarget {
  id: string;
  chain: Type_DAChains;
  currentPriceTs?: number;
  yesterdayYield: string;
  yesterdayYield_display: string;
  yesterday_apy: string;
  yesterday_apy_display: string;
  yesterdayApyCalculatedTime: number;
  isYesterdayUpdating: boolean;
  totalYield: string;
  totalYield_display: string;
  apy: string;
  apy_display: string;
  duration: number;
  principalValue: string;
  principalValue_display: string;
  positionValue: string;
  positionValue_display: string;
  totalReturn: string;
  totalReturn_display: string;
  totalRoi: string;
  totalRoi_display: string;
}

export interface TurboRangeStrategyLeaderboards {
  updatedAt: number;
  currentPriceSnapshotAt: number;
  topApy: TurboRangeStrategy[];
  hotToday: TurboRangeStrategy[];
  bestReturns: TurboRangeStrategy[];
}

export interface TurboRangeState {
  loadingProducts: boolean;
  loadingStrategyLeaderboards: boolean;
  products: TurboRangeProduct[];
  strategyLeaderboards: TurboRangeStrategyLeaderboards;
  positions: TurboRangePosition[];
  closedPositions: TurboRangePosition[];
  productsSettings: {
    [poolAddress: string]: any;
  };
  refreshPostionsIndex: number; // 用于持仓
  loadingPositions: number;
  positioPageShowHistoryTimestamp: number;
  recentTrades: {
    [positionAddress: string]: {
      withdrawTime: number;
      claimTime: number;
      increaseTime: number;
    };
  }; // 存储最近的提现，领取记录
  hasShowedInitReturnValue: {
    [positionAddress: string]: boolean;
  };
  investMode: 'single' | 'dual';
}

const initialState: TurboRangeState = {
  loadingProducts: false,
  loadingStrategyLeaderboards: false,
  products: [],
  strategyLeaderboards: {
    updatedAt: 0,
    currentPriceSnapshotAt: 0,
    topApy: [],
    hotToday: [],
    bestReturns: [],
  },
  positions: [],
  closedPositions: [],
  productsSettings: {},
  refreshPostionsIndex: 0,
  loadingPositions: 0,
  positioPageShowHistoryTimestamp: 0,
  recentTrades: {},
  hasShowedInitReturnValue: {},
  investMode: 'single',
};

const turboRangeSlice = createSlice({
  name: 'turboRange',
  initialState,
  reducers: {
    updateTurboRangeState(state: TurboRangeState, action: any) {
      const params = action.payload;
      for (const i in params) {
        if (i in initialState) {
          (state as any)[i] = params[i];
        }
      }
    },
    clearTurboRangeState(state: TurboRangeState) {
      state.products = [];
      state.positions = [];
      state.refreshPostionsIndex = 0;
    },
    refreshTurboRangePostions(state: TurboRangeState) {
      state.refreshPostionsIndex = Math.ceil(Date.now() / 2000);
    },
    updateProductsSettings(state: TurboRangeState, action: any) {
      const { poolAddress, settings } = action.payload;
      state.productsSettings[poolAddress] = settings;
    },
    updateRecentTrades(state: TurboRangeState, action: any) {
      const { positionAddress, withdrawTime, claimTime, increaseTime } =
        action.payload;
      const pre = state.recentTrades[positionAddress] || {
        withdrawTime: 0,
        claimTime: 0,
      };
      state.recentTrades[positionAddress] = {
        withdrawTime: withdrawTime || pre.withdrawTime,
        claimTime: claimTime || pre.claimTime,
        increaseTime: increaseTime || pre.increaseTime,
      };
    },
    setHasShowedInitReturnValue(state: TurboRangeState, action: any) {
      const { positionAddress, hasShowedInitReturnValue } = action.payload;
      state.hasShowedInitReturnValue[positionAddress] =
        hasShowedInitReturnValue;
    },
  },
});

export const {
  updateTurboRangeState,
  clearTurboRangeState,
  refreshTurboRangePostions,
  updateProductsSettings,
  updateRecentTrades,
  setHasShowedInitReturnValue,
} = turboRangeSlice.actions;
export default turboRangeSlice.reducer;

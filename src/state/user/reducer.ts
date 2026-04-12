import { createSlice } from '@reduxjs/toolkit';

import { updateVersion } from 'js/state/globalAction';
const currentTimestamp = () => new Date().getTime();

const initPeriods = { common: '15' }; // 15m

export type Flag =
  | 'gridDetail_summary'
  | 'm_gridDetail_pnl_profit'
  | 'm_gridDetail_pnl_balance'
  | 'm_gridDetail_pnl_investment'
  | 'm_hide_mini_chart'
  | 'hide_tips_makerFree'
  | 'choose_swap_pair_show_tabs'
  | 'swap_chart_resolution'
  | 'hide_small_balances'
  | 'm_trades_tab'
  | 'user_total_asset_value'
  | 'user_total_earn_value'
  | 'hasShowGuide'
  | 'm_showMoreInfo'
  | 'm_home_download_banner'
  | 'choose_swap_pair_chain'
  | 'pre_flash_enter_id'
  | 'hide_copy_trade_sol_tips'
  | 'hide_copy_trade_how_to_start'
  | 'copy_trade_custom_sell_strategies'
  | 'stocks_tab'
  | 'hide_copy_trade_how_to_start'
  | 'earn_tab'
  | 'receive_history_filter_chain'
  | 'm_turbo_range_faq_hide'
  | 'turbo_range_history_live_status_tip_seen'
  | 'hide_app_notification'
  | 'private_client_desk_float_text_hidden'
  | 'private_client_desk_float_hidden';

export type PageType = 'spot' | 'grid' | 'dca' | 'swap';

export interface UserState {
  storeIndex: number; // 用于出发./store更新
  theme: 'dark' | '';
  referralCode: string;
  showCurrentPair: boolean;
  onlyShowCurrentPair: {
    [key in PageType]: boolean;
  };
  timestamp: number;
  periods: {
    [key: string]: string;
  };
  exportDataJobs: {
    [chainId: string]: any;
  };
  hideMobileGridPreview: {
    [chainId: string]: any;
  };
  choosePairPopSelectedTab: {
    [chainId: string]: any;
  };
  firstOrderIsPlaced: {
    [chainId: string]: any;
  };
  showAdvancedConfig: {
    [chainId: string]: any;
  };
  hideGridPreviewOrders: {
    [chainId: string]: any;
  };
  hideGridPreviewOrdersInGraph: {
    [chainId: string]: any;
  };
  hideAssets: {
    [chainId: string]: any;
  };
  closedBanner: Record<string, any>;
  hideGridFreeTips: boolean;
  sortMap: {
    [key: string]: {
      orderBy: string;
      orderDir: string;
    };
  };
  mobileAdvancedTab: string;
  profitsTab: string;
  gridInvestmentType: string;
  flag: Record<Flag, any>;
}

const SessionSortKey = 'degate_sortMap';

const initialState = {
  storeIndex: 0,
  theme: 'dark',
  referralCode: '',
  showCurrentPair: false,
  onlyShowCurrentPair: {
    spot: false,
    grid: false,
    dca: false,
    swap: false,
  },
  timestamp: currentTimestamp(),
  periods: initPeriods,
  exportDataJobs: {}, // { [chainId]: {[account]: []} },
  choosePairPopSelectedTab: {}, // { [chainId]: false },
  firstOrderIsPlaced: {}, // { [chainId]: false },
  showAdvancedConfig: {}, // { [chainId]: false },
  hideGridPreviewOrders: {}, // { [chainId]: false },
  hideGridPreviewOrdersInGraph: {}, // { [chainId]: false },
  hideAssets: {}, // { [chainId]: false },
  closedBanner: {}, // { [id]: { time:number } },
  hideGridFreeTips: false,
  sortMap: {},
  mobileAdvancedTab: 'grid',
  profitsTab: 'yield',
  gridInvestmentType: 'singleQuote',
  flag: {
    gridDetail_summary: false,
    m_gridDetail_pnl_profit: false,
    m_gridDetail_pnl_balance: false,
    m_gridDetail_pnl_investment: false,
    m_hide_mini_chart: false,
    hide_tips_makerFree: false,
    choose_swap_pair_show_tabs: 'all',
    swap_chart_resolution: '1S',
    hide_small_balances: true,
    m_trades_tab: 'trade',
    m_home_download_banner: 0,
    user_total_asset_value: '0',
    user_total_earn_value: '0',
    hasShowGuide: false,
    m_showMoreInfo: true,
    choose_swap_pair_chain: 'all',
    pre_flash_enter_id: 0,
    hide_copy_trade_sol_tips: false,
    stocks_tab: 'xstocks',
    hide_copy_trade_how_to_start: false,
    earn_tab: 'simpleEarn',
    copy_trade_custom_sell_strategies: undefined,
    receive_history_filter_chain: 'SOLANA',
    m_turbo_range_faq_hide: false,
    turbo_range_history_live_status_tip_seen: false,
    hide_app_notification: false,
    private_client_desk_float_hidden: false,
    private_client_desk_float_text_hidden: false,
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateStore(state) {
      state.storeIndex += 1;
    },
    setTheme(state, { payload }) {
      const { theme } = payload;
      state.theme = theme;
    },
    setReferralCode(state, { payload }) {
      const { code } = payload;
      if (state.referralCode) return;
      state.referralCode = code;
    },

    setChartPeriod(state, { payload }) {
      const { period, page } = payload;
      state.periods = state.periods || {};
      (state.periods as any)[page] = period;
    },
    saveExportDataJob(state, action) {
      const { dexChainId, account, job } = action.payload;
      const preJobs = (state.exportDataJobs as any)?.[dexChainId] || {};
      const accountLowercase = account?.toLowerCase();
      state.exportDataJobs = {
        ...state.exportDataJobs,
        [dexChainId]: {
          ...preJobs,
          [accountLowercase]: job,
        },
      };
    },
    changeChoosePairPopSelectedTab(state, action) {
      const { tab, dexChainId } = action.payload;
      (state.choosePairPopSelectedTab as any)[dexChainId] = tab;
    },
    setShowCurrentPair(state, action) {
      const { showCurrentPair, page } = action.payload;
      state.onlyShowCurrentPair = state.onlyShowCurrentPair || {};
      state.onlyShowCurrentPair[page as PageType] = showCurrentPair;
    },
    changeFirstOrderIsPlaced(state, action) {
      const { flag, dexChainId } = action.payload;
      (state.firstOrderIsPlaced as any)[dexChainId] = flag;
    },
    changeShowAdvancedConfig(state, action) {
      const { flag, dexChainId } = action.payload;
      (state.showAdvancedConfig as any)[dexChainId] = flag;
    },
    changeHideGridPreviewOrders(state, action) {
      const { flag, dexChainId } = action.payload;
      (state.hideGridPreviewOrders as any)[dexChainId] = flag;
    },
    changeHideGridPreviewOrdersInGraph(state, action) {
      const { flag, dexChainId } = action.payload;
      (state.hideGridPreviewOrdersInGraph as any)[dexChainId] = flag;
    },
    changeHideAssets(state, action) {
      const { flag, dexChainId } = action.payload;
      (state.hideAssets as any)[dexChainId] = flag;
    },
    closeBanner(state, action) {
      const { id } = action.payload;
      (state.closedBanner as any)[id] = { time: Date.now() };
    },
    updateSort(state, action) {
      const { key, orderDir, orderBy } = action.payload;
      state.sortMap = state.sortMap || {};
      if (!key) return;
      (state.sortMap as any)[key] = {
        orderBy,
        orderDir,
      };
      sessionStorage.setItem(SessionSortKey, JSON.stringify(state.sortMap));
    },
    updateHideGridFreeTips(state, action) {
      const { hideGridFreeTips } = action.payload;
      state.hideGridFreeTips = hideGridFreeTips;
    },
    changeMobileAdvancedTab(state, action) {
      const { tab } = action.payload;
      state.mobileAdvancedTab = tab;
    },
    changeProfitsTab(state, action) {
      const { tab } = action.payload;
      state.profitsTab = tab;
    },
    changeGridInvestmentType(state, action) {
      const { gridInvestmentType } = action.payload;
      state.gridInvestmentType = gridInvestmentType;
    },
    changeFlag(state, action) {
      const { key, value } = action.payload;
      state.flag = state.flag || {};
      (state.flag as any)[key] = value;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateVersion, (state) => {
      state.periods = state.periods || initPeriods;
      if (typeof state.theme === 'undefined' || !state.theme) {
        state.theme = 'dark';
      }
      state.flag = state.flag || {};
      state.flag.choose_swap_pair_chain =
        state.flag.choose_swap_pair_chain || 'all';
      state.flag.swap_chart_resolution =
        state.flag.swap_chart_resolution || '1S';
      state.flag.hide_app_notification =
        state.flag.hide_app_notification || false;
      state.flag.stocks_tab = state.flag.stocks_tab || 'xstocks';
      state.flag.receive_history_filter_chain =
        state.flag.receive_history_filter_chain || 'SOLANA';
      state.firstOrderIsPlaced = state.firstOrderIsPlaced || {};
      state.showAdvancedConfig = state.showAdvancedConfig || {};
      state.hideGridPreviewOrders = state.hideGridPreviewOrders || {};
      state.closedBanner = state.closedBanner || {};
      if (state.showCurrentPair) {
        state.showCurrentPair = false;
        state.onlyShowCurrentPair = {
          spot: true,
          grid: true,
          dca: true,
          swap: true,
        };
      }
      const sort = sessionStorage.getItem(SessionSortKey);
      if (sort) {
        state.sortMap = JSON.parse(sort);
        if ((state.sortMap as any)?.asset_balances?.orderBy === 'value') {
          (state.sortMap as any).asset_balances.orderBy = 'totalValue';
        }
      } else {
        state.sortMap = {
          asset_balances: {
            orderBy: 'totalValue',
            orderDir: 'desc',
          },
          analytics_topPairs: {
            orderBy: '24h_volume',
            orderDir: 'desc',
          },
          m_home_topPairs: {
            orderBy: '',
            orderDir: '',
          },
          pairs: {
            orderBy: '',
            orderDir: '',
          },
        };
      }
    });
  },
});

export const {
  changeChoosePairPopSelectedTab,
  saveExportDataJob,
  setChartPeriod,
  setTheme,
  setReferralCode,
  setShowCurrentPair,
  changeFirstOrderIsPlaced,
  changeShowAdvancedConfig,
  changeHideGridPreviewOrders,
  changeHideAssets,
  changeHideGridPreviewOrdersInGraph,
  closeBanner,
  updateSort,
  updateHideGridFreeTips,
  changeMobileAdvancedTab,
  changeProfitsTab,
  changeGridInvestmentType,
  changeFlag,
  updateStore,
} = userSlice.actions;
export default userSlice.reducer;

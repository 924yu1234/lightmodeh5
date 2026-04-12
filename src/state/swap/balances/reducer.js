import { createSlice } from '@reduxjs/toolkit';
import { isEmpty } from 'lodash';

import { logDexBalance } from 'src/utils/log/dexAccount';

import { updateVersion } from 'js/state/globalAction';

import { convertSwapBalance, createDexBalanceKey } from './utils';

const initialState = {
  balances: {}, // [account]: { [key] : data}
  balanceListeners: [],
  refreshSwapBalanceIndex: 1,
  preRefreshTime: 0,
  excepteRefreshTime: 0,
  apiBalancesDisconnectedChains: [],
};
const daBalanceSlice = createSlice({
  name: 'application',
  initialState,
  reducers: {
    refreshSwapBalance(state, { payload: { refreshIndex } }) {
      // 10s refresh once
      state.refreshSwapBalanceIndex =
        refreshIndex || Math.floor(Date.now() / 3000);
    },
    setApiBalancesDisconnectedChains(state, { payload: { chains } }) {
      state.apiBalancesDisconnectedChains = chains || [];
    },
    fetchingSwapBalanceListeners(state, { payload: { account } }) {
      state.balances[account] = state.balances[account] ?? {};
      if (isEmpty(state.balances[account])) {
        state.balances[account].loading = true;
        state.balances[account].loadingUpdate = true;
      }
    },
    updateSwapBalanceResults(state, { payload: { results, account } }) {
      state.balances[account] = state.balances[account] ?? {};
      state.balances[account].loading = false;
      state.preRefreshTime = Date.now();
      state.excepteRefreshTime = 0;
      logDexBalance({
        method: 'update balances',
        time: Date.now(),
      });

      const updatedTokens = {};

      // 处理新的余额更新
      results.forEach((balance) => {
        const key = createDexBalanceKey({
          account,
          token: balance.token,
        });
        updatedTokens[key] = true;

        const pre = state.balances[account]?.[key]?.data ?? {};
        const res = convertSwapBalance({
          result: {
            ...pre.apiData,
            ...balance,
          },
        });
        state.balances[account][key] = {
          data: res,
        };
      });

      Object.keys(state.balances[account]).forEach((key) => {
        if (key === 'loading' || key === 'loadingUpdate') return;
        if (updatedTokens[key]) return;
        const pre = state.balances[account]?.[key]?.data ?? {};
        // if (failedChains.includes(pre?.token?.chain)) return;
        state.balances[account][key] = {
          data: convertSwapBalance({
            result: {
              ...pre.apiData,
              chain_balance: '0',
            },
          }),
        };
      });
    },
    updateSwapBalanceFromBalanceUpdate(
      state,
      { payload: { results, account } }
    ) {
      state.balances[account].loadingUpdate = false;
      state.balances[account] = state.balances[account] ?? {};
      results.forEach((balance) => {
        const key = createDexBalanceKey({
          account,
          token: balance.token,
        });

        const pre = state.balances[account]?.[key]?.data ?? {};
        const res = convertSwapBalance({
          result: {
            ...pre.apiData,
            ...balance,
          },
        });
        state.balances[account][key] = {
          data: res,
        };
      });
    },
    updateSwapBalanceFromWs(state, { payload: { result, account } }) {
      state.balances[account] = state.balances[account] ?? {};
      state.preRefreshTime = Date.now();
      state.excepteRefreshTime = 0;

      const balanceKey = createDexBalanceKey({
        token: result.token,
        account,
      });

      logDexBalance({
        method: 'update balance from ws',
        balanceKey,
        time: Date.now(),
      });

      const pre = state.balances[account]?.[balanceKey]?.data ?? {};
      const res = convertSwapBalance({
        result: {
          ...pre?.apiData,
          ...result,
        },
      });
      state.balances[account][balanceKey] = {
        data: res,
        account: (account || '')?.toLowerCase(),
        loading: false,
      };
    },
    updateExceptedUpdateSwapBalanceTime(state, { payload }) {
      const { timestamp } = payload;

      // 如果15秒内有过更新则认为ws推送正常，但有可能会延迟更新一会
      if (timestamp - state.preRefreshTime < 25000) {
        return;
      }
      logDexBalance({
        method: 'update balance check',
        preRefreshTime: state.preRefreshTime,
        excepteRefreshTime: timestamp,
        time: Date.now(),
      });
      // 如果没有过更新则使用excepteRefreshTime刷新余额接口
      state.excepteRefreshTime = timestamp;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateVersion, (state) => {
      state.balances = {};
      state.refreshSwapBalanceIndex = Date.now();
    });
  },
});

export const {
  refreshSwapBalance,
  fetchingSwapBalanceListeners,
  updateSwapBalanceResults,
  updateSwapBalanceFromBalanceUpdate,
  updateSwapBalanceFromWs,
  updateExceptedUpdateSwapBalanceTime,
  setApiBalancesDisconnectedChains,
} = daBalanceSlice.actions;

export default daBalanceSlice.reducer;

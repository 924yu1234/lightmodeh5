import { createSlice } from '@reduxjs/toolkit';

import { CommonToken } from 'src/constants/interface';

export interface SwapTokensState {
  tokens: CommonToken[];
  localeTokens: { [code: string]: CommonToken };
  tokensWithBalance: { [account: string]: { [code: string]: CommonToken } };
  tags: { [code: string]: { [key: string]: string } };
}

const initialState: SwapTokensState = {
  tokens: [],
  localeTokens: {},
  tokensWithBalance: {},
  tags: {},
};

const swapTokensSlice = createSlice({
  name: 'swapTokens',
  initialState,
  reducers: {
    updateSwapTokens: (state, action) => {
      state.tokens = action.payload.tokens;
    },
    saveLocaleSwapTokens: (state, { payload: { tokens } }) => {
      state.localeTokens = state.localeTokens || {};
      tokens.forEach((token: CommonToken) => {
        state.localeTokens[token?.code] = token;
      });
    },
    fetchedSwapTokensWithBalance: (state, action) => {
      const { tokens, account } = action.payload;
      state.tokensWithBalance[account] = state.tokensWithBalance[account] || {};
      tokens.forEach((token: CommonToken) => {
        state.tokensWithBalance[account][token?.code] = token;
      });
    },
    updateTokenTags: (state, action) => {
      state.tags = action.payload.tags;
    },
  },
});

export const {
  updateSwapTokens,
  saveLocaleSwapTokens,
  fetchedSwapTokensWithBalance,
  updateTokenTags,
} = swapTokensSlice.actions;
export default swapTokensSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

interface IntentsInterface {
  intentLists: {
    [account: string]: any[];
  };
}

const initialState: IntentsInterface = {
  intentLists: {},
};

const intents = createSlice({
  name: 'intents',
  initialState,
  reducers: {
    addIntents(state, action) {
      const { intents, account } = action.payload;
      const prevIntents = state.intentLists[account] || [];
      state.intentLists = {
        ...state.intentLists,
        [account]: [...prevIntents, ...intents],
      };
    },
    removeIntent(state, action) {
      const { intentId, account } = action.payload;

      state.intentLists = {
        ...state.intentLists,
        [account]: state.intentLists[account].filter(
          (intent: any) => intent.id !== intentId
        ),
      };
    },
  },
});

export const { addIntents, removeIntent } = intents.actions;

export default intents.reducer;

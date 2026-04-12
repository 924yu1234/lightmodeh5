import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { ReactReduxContextValue } from 'react-redux';
import { combineReducers } from 'redux';

import application from './application/reducer';
import dexAccount from './dexAccount/reducer';
import { updateVersion } from './globalAction';
import intentEarn from './intent/earn/reducer';
import intents from './intents/reducer';
import message from './message/reducer';
import notification from './notification/reducer';
import regionCheck from './regionCheck/reducer';
import swapBalance from './swap/balances/reducer';
import swapOrders from './swap/orders/reducer';
import swapPair from './swap/pair/reducer';
import swapPairs from './swap/pairs/reducer';
import swapTokenInfo from './swap/tokenInfo/reducer';
import swapTokens from './swap/tokens/reducer';
import swapTrade from './swap/trade/reducer';
import turboRange from './turboRange/reducer';
import user from './user/reducer';

// UED project: redux-persist disabled — all state is fresh from mock data
const rootReducer = combineReducers({
  application,
  user,
  dexAccount,
  regionCheck,
  notification,
  message,
  swapPairs,
  swapPair,
  swapTrade,
  swapBalance,
  swapTokenInfo,
  swapTokens,
  swapOrders,
  intents,
  intentEarn,
  turboRange,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false,
      serializableCheck: false,
    }),
});

// UED: no-op persistor (PersistGate expects this interface)
export const persistor = {
  subscribe: (cb: () => void) => {
    cb();
    return () => {};
  },
  getState: () => ({ bootstrapped: true }),
  purge: () => Promise.resolve(),
  flush: () => Promise.resolve(),
  pause: () => {},
  persist: () => {},
  dispatch: () => ({ type: 'noop' }),
} as any;

// Dispatch initial version action
store.dispatch(updateVersion());

export type AppState = ReturnType<typeof store.getState>;

export default store;

export const storeContext = React.createContext<
  ReactReduxContextValue<unknown, any>
>(undefined as any);

import { createReducer } from '@reduxjs/toolkit';
import { mapValues } from 'lodash';

import {
  delOtherDexAccounts,
  fetchingOriginDexAccount,
  fetchOriginDexAccount,
  setDexAccountRefreshIndex,
  updateDexAccount,
} from './actions';

export const AccountStatus = {
  FETCHING: 'fetching',
  NOT_REGISTERED: 'not_registered',
  REGISTERING: 'registering',
  REGISTERED: 'registerd',
  RESETTING: 'reseting',
  REFRESH: 'refresh', // while singuare or nonce err
  ERROR: 'error',
};

const initialState = {
  refreshDexAccountIndex: 0,
  localTimeDiff: 0,
  dexAccounts: {}, // {[dexChainId]: { [account]: {}} }
};

export default createReducer(initialState, (builder) =>
  builder
    .addCase(fetchingOriginDexAccount, (state, action) => {
      const { account, dexChainId } = action.payload;
      if (!account) return;
      state.refreshDexAccountIndex = 0;
      const accountLowercase = account?.toLowerCase();
      const pre = state.dexAccounts?.[dexChainId];
      state.dexAccounts = {
        ...state.dexAccounts,
        [dexChainId]: {
          ...state.dexAccounts?.[dexChainId],
          [accountLowercase]: {
            ...pre?.[accountLowercase],
            state: AccountStatus.FETCHING,
          },
        },
      };
    })
    .addCase(fetchOriginDexAccount, (state, action) => {
      const {
        dexAccount,
        account,
        dexChainId,
        localTimeDiff,
        DAs,
        features,
        usedReferralCode,
        isInWhitelist,
      } = action.payload;
      if (!account) return;
      const accountLowercase = account?.toLowerCase();
      const preAccounts = state.dexAccounts?.[dexChainId];
      const preAccount = state.dexAccounts?.[dexChainId]?.[accountLowercase];
      if (dexAccount) {
        const newDexAccount = {
          ...preAccount,
          ...dexAccount,
          features: { ...preAccount?.features, ...dexAccount.features },
          originDexAccount: dexAccount,
          account,
        };

        newDexAccount.hasSyncDA = !!dexAccount?.da_owner;
        state.localTimeDiff = localTimeDiff || 0;
        state.dexAccounts = {
          ...state.dexAccounts,
          [dexChainId]: {
            ...preAccounts,
            [accountLowercase]: newDexAccount,
          },
        };
      }
      if (DAs) {
        state.dexAccounts = {
          ...state.dexAccounts,
          [dexChainId]: {
            ...preAccounts,
            [accountLowercase]: {
              ...preAccount,
              DAs,
              hasFetchedDA: true,
              usedReferralCode,
              features: { ...preAccount?.features, ...features },
              account,
              isInWhitelist,
            },
          },
        };
      }
    })
    .addCase(updateDexAccount, (state, action) => {
      const { dexAccount, account, dexChainId } = action.payload;
      if (!account) return;
      const accountLowercase = account?.toLowerCase();
      const pre = state.dexAccounts?.[dexChainId];
      const newDexAccount = {
        ...pre?.[accountLowercase],
        ...dexAccount,
        account,
      };
      state.dexAccounts = {
        ...state.dexAccounts,
        [dexChainId]: {
          ...pre,
          [accountLowercase]: newDexAccount,
        },
      };
    })
    .addCase(delOtherDexAccounts, (state, action) => {
      const { account, dexChainId } = action.payload;
      if (!account) return;
      const accountLowercase = account?.toLowerCase();
      // delAccountKey({ account: accountLowercase, dexChainId });
      const pre = state.dexAccounts?.[dexChainId];
      const news = mapValues(pre, (v, k) => {
        if (k !== accountLowercase) {
          return {
            ...v,
            secretKey: '',
          };
        }
        return v;
      });
      state.dexAccounts = {
        ...state.dexAccounts,
        [dexChainId]: news,
      };
    })
    .addCase(setDexAccountRefreshIndex, (state) => {
      state.refreshDexAccountIndex += 1;
    })
);

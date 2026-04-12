import { createAction } from '@reduxjs/toolkit';

export const fetchingOriginDexAccount = createAction(
  'dexAccount/fetchingOriginDexAccount',
  (payload) => {
    return { payload };
  }
);
export const fetchOriginDexAccount = createAction(
  'dexAccount/fetchOriginDexAccount',
  (payload) => {
    return { payload };
  }
);
export const updateDexAccount = createAction(
  'dexAccount/updateDexAccount',
  (payload) => {
    return { payload };
  }
);
export const delOtherDexAccounts = createAction(
  'dexAccount/delOtherDexAccounts'
);
export const setDexAccountRefreshIndex = createAction(
  'dexAccount/setDexAccountRefreshIndex'
);

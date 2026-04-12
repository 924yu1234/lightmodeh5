import { createAction } from '@reduxjs/toolkit';

export const updateChainInfo = createAction('application/updateChainInfo');
export const showModal = createAction('application/showModal');
export const hideModal = createAction('application/hideModal');
export const toggleModal = createAction('application/toggleModal');
export const getInfo = createAction('application/getInfo');
export const toggleMenu = createAction('application/toggleMenu');
export const toggleWalletTradeBtn = createAction(
  'application/toggleWalletTradeBtn'
);
export const toggleWalletDepositbridgedAddress = createAction(
  'application/toggleWalletDepositbridgedAddress'
);

export const setRegionDisabled = createAction('application/setRegionDisabled');
export const setIsOnline = createAction('application/setIsOnline');
export const refreshEnclavaInfo = createAction(
  'application/refreshEnclavaInfo'
);

export const updateGasPaymentCandidates = createAction(
  'application/updateGasPaymentCandidates'
);

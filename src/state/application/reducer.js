import { createReducer } from '@reduxjs/toolkit';

import { ICON_CDN } from 'src/da';

import { DEX_CHAIN_ID } from 'js/constants/dex';
import { updateVersion } from 'js/state/globalAction';

import {
  getInfo,
  hideModal,
  refreshEnclavaInfo,
  setIsOnline,
  setRegionDisabled,
  showModal,
  toggleMenu,
  toggleModal,
  toggleWalletDepositbridgedAddress,
  toggleWalletTradeBtn,
  updateChainInfo,
  updateGasPaymentCandidates,
} from './actions';
import _modalKeys from './modalKeys';

export const ModalKeys = _modalKeys;

const initialState = {
  chainInfo: [],
  dexChainId: 0,
  showMenu: false,
  theme: 'dark',
  modal: '',
  modals: {},
  hideWalletTradeBtn: false,
  hideWalletDepositBridgedAddress: false,
  modalParam: {}, // [key] : {...}
  info: {}, // [dexChainId]: {}
  gasPaymentCandidates: [],
  regionInfo: {
    isRegionDisabled: false,
    regionCode: '',
    regionIntl: {},
  },
  isOnline: true,
  refreshEnclavaInfoIndex: 0,
};

export default createReducer(initialState, (builder) =>
  builder
    .addCase(updateChainInfo, (state, action) => {
      const { chainInfo, chainConfig } = action.payload;
      const configs = JSON.parse(chainConfig.data);
      // trade-fe不需要验证签名，只是用配置，scan地址
      state.chainInfo = chainInfo.map((d) => {
        const config = configs.chains.find((c) => c.name === d.chain) || {};
        return {
          chain: d.chain,
          isFungibleChain: d.isFungibleChain,
          quoteToken: d.quoteToken,
          allowSwap: d.allowSwap,
          isLifi: d.is_support_lifi,
          display_level: d.display_level,

          addressRegex: config.addressRegex,
          explorer: config.explorer,
          explorerUrlMap: config.explorerUrlMap,
          gasTokenSymbol: config.nativeToken?.symbol,
          gasTokenCode: config.nativeToken?.code?.toLowerCase(),
          icon: `${ICON_CDN}/pic/chains/${config.name?.toLowerCase()}_square.png`,
          tokenConner: `${ICON_CDN}/pic/chains/${config.name?.toLowerCase()}.png`,
          name: config.showName,
        };
      });
    })
    .addCase(updateGasPaymentCandidates, (state, action) => {
      const { candidates } = action.payload;
      state.gasPaymentCandidates = candidates;
    })
    .addCase(updateVersion, (state) => {
      state.dexChainId = DEX_CHAIN_ID;
      state.modals = {};
    })
    .addCase(toggleMenu, (state, action) => {
      const { flag } = action.payload;
      state.showMenu = flag;
    })
    .addCase(toggleModal, (state, action) => {
      const pre = state.modal;
      const { modal, ...rest } = action.payload;
      state.modal = modal;
      if (modal) {
        // hide menu while show modal
        state.showMenu = false;
        state.modalParam = {
          ...state.modalParam,
          [modal]: rest,
        };
      } else {
        state.modalParam = {
          ...state.modalParam,
          [pre]: {},
        };
      }
    })
    .addCase(showModal, (state, action) => {
      const { modal, ...rest } = action.payload;
      state.modals[modal] = { ...rest, visible: true };
      if (modal) {
        // hide menu while show modal
        state.showMenu = false;
      }
    })
    .addCase(hideModal, (state, action) => {
      const { modal, all } = action.payload;
      delete state.modals[modal];
      if (all) {
        state.modals = {};
      }
    })
    .addCase(getInfo, (state, action) => {
      const { info, dexChainId } = action.payload;
      state.info[dexChainId] = info;
      state.dexChainId = info?.chainId;
    })
    .addCase(toggleWalletTradeBtn, (state, action) => {
      const { hide } = action.payload;
      state.hideWalletTradeBtn = hide;
    })
    .addCase(toggleWalletDepositbridgedAddress, (state, action) => {
      const { hide } = action.payload;
      state.hideWalletDepositBridgedAddress = hide;
    })
    .addCase(setRegionDisabled, (state, action) => {
      const { isRegionDisabled, regionCode, regionIntl } = action.payload;
      state.regionInfo = { isRegionDisabled, regionCode, regionIntl };
    })
    .addCase(setIsOnline, (state, action) => {
      const { isOnline } = action.payload;
      state.isOnline = isOnline;
    })
    .addCase(refreshEnclavaInfo, (state) => {
      state.refreshEnclavaInfoIndex += 1;
    })
);

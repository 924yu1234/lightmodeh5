import { useCallback, useEffect, useMemo, useState } from 'react';
import { usePrevious } from 'ahooks';
import { useDispatch, useSelector } from 'react-redux';

import { CommonToken, Token } from 'src/constants/interface';
import { Type_DAChains } from 'src/da';
import { mapToken } from 'src/hooks/useAssets';
import { Initialize_Source } from 'src/hooks/useEventTrack/utils/useLogInitialize';
import { isNumber } from 'src/utils/digit';
import { logLimitOrderErr } from 'src/utils/log/trade';
import { minus } from 'src/utils/numberUtils';
import { tokenIsSol } from 'src/utils/token';

import { useIsAppH5, useWalletWeb3 } from 'js/providers/useWallet';
import { useLocalTimeDiff } from 'js/state/dexAccount/hooks';
import message from 'js/utils/message';

import { AppState } from '..';
import useConnectWallet from '../dexAccount/opr/useConnectWallet';
import useReceive from '../dexAccount/opr/useReceive';
import useCheckRegion from '../regionCheck/hooks';
import { useSwapBalances } from '../swap/balances/hooks';
import { useTokensWithTokenInfo } from '../swap/tokenInfo/hooks';
import { useCheckBlacklist } from '../user/hooks';
import {
  hideModal,
  refreshEnclavaInfo,
  showModal,
  toggleMenu,
  toggleWalletDepositbridgedAddress,
  toggleWalletTradeBtn,
} from './actions';
import { ModalKeys } from './reducer';

export function useInfo(): any {
  const dexChainId = useDexChainId();
  const info = useSelector((state: AppState) => state?.application?.info);
  return useMemo(() => {
    return ((info ?? {}) as any)[dexChainId] ?? {};
  }, [info, dexChainId]);
}

export function useIsOnline(): any {
  return useSelector((state: AppState) => state?.application?.isOnline);
}

// 判断是断网重连
export function useRefreshIndexForNetworkRecover() {
  const [index, setIndex] = useState(0);
  const isOnline = useIsOnline();
  const preIsOnline = usePrevious(isOnline);
  useEffect(() => {
    if (isOnline && preIsOnline !== undefined && !preIsOnline) {
      setIndex(Date.now());
    }
  }, [isOnline, preIsOnline]);

  return index;
}

export function useInfoKey() {
  const dexChainId = useDexChainId();
  const info = useInfo();
  return useMemo(() => {
    if (!info?.exchangeAddress) return '';
    return `${dexChainId}_${info?.exchangeAddress?.slice(0, 6)}`;
  }, [info, dexChainId]);
}

// dex chain
export function useDexChainId() {
  return useSelector((state: AppState) => state.application.dexChainId);
}

export function useRegionInfo() {
  return useSelector((state: AppState) => state.application.regionInfo);
}

export function useIsStopDeposit() {
  return window._config.BETA_STOP_DEPOSIT === 'true';
}

export function useShowModalLogin() {
  const connectWallet = useConnectWallet();
  return connectWallet;
}

export function useShowModalFeedback() {
  const showModal = useShowModal();
  return useCallback(
    () => showModal({ modal: ModalKeys.feedback }),
    [showModal]
  );
}
export function useShowModalFeedbackSuccessTip() {
  const showModal = useShowModal();
  return useCallback(
    () => showModal({ modal: ModalKeys.feedbackSuccessTip }),
    [showModal]
  );
}

export function useShowModalChoosePair() {
  const showModal = useShowModal();

  return useCallback(() => {
    return showModal({ modal: ModalKeys.choosePair });
  }, [showModal]);
}

export function useIsShowingMenu() {
  return useSelector((state: AppState) => {
    const { showMenu } = state.application;
    return showMenu;
  });
}

export function useToggleMenu() {
  const dispatch = useDispatch();
  return useCallback(
    (show: boolean) => dispatch(toggleMenu({ flag: show } as any)),
    [dispatch]
  );
}

export function useCheckNetwork() {
  const { walletChainId, account, dexChainId } = useWalletWeb3();
  const remoteDexChainId = useDexChainId();
  const showSwitchNetwork = useShowModalSwitchNetwork();

  return useCallback(
    ({ modalParams }: any = {}) => {
      // return true;
      if (remoteDexChainId !== dexChainId) {
        message.error('dexChainId not match');
        return false;
      }
      if (
        dexChainId !== Number(walletChainId) &&
        Number(walletChainId) &&
        account
      ) {
        showSwitchNetwork(dexChainId, modalParams);
        return false;
      }
      return true;
    },
    [showSwitchNetwork, remoteDexChainId, walletChainId, account, dexChainId]
  );
}

export function useCheckLocalTime() {
  const showModal = useShowModal();
  const localTimeDiff = useLocalTimeDiff();
  return useCallback(() => {
    // return true;
    if (isNumber(localTimeDiff) && Number(localTimeDiff) !== 0) {
      showModal({ modal: ModalKeys.tips_localTime });
      return false;
    }
    return true;
  }, [showModal, localTimeDiff]);
}

export function useShowModalSwitchNetwork() {
  const showModal = useShowModal();

  return useCallback(
    (chainId: number, modalParams: any) =>
      showModal({ modal: ModalKeys.switchNetwork, chainId, modalParams }),
    [showModal]
  );
}

export function useShowModalResetingTips() {
  const showModal = useShowModal();

  return useCallback(
    () => showModal({ modal: ModalKeys.resetingTips }),
    [showModal]
  );
}

export function useShowModalEthGasTips() {
  const showModal = useShowModal();
  return useCallback(
    ({ type }: any) => showModal({ modal: ModalKeys.tips_eth_gas, type }),
    [showModal]
  );
}

export function useShowModalBlacklistTips() {
  const showModal = useShowModal();
  return useCallback(
    () => showModal({ modal: ModalKeys.tips_blacklist }),
    [showModal]
  );
}

export function useRegister() {
  const showModal = useShowModal();

  const checkRegion = useCheckRegion();
  const checkBlacklist = useCheckBlacklist();

  return useCallback(
    (
      {
        source,
      }: {
        source: Initialize_Source;
      } = { source: '' }
    ) => {
      if (checkBlacklist() && checkRegion()) {
        showModal({ modal: ModalKeys.register, source });
      }
    },
    [checkRegion, showModal, checkBlacklist]
  );
}

export function useVerifyAccount() {
  const showModal = useShowModal();

  const checkRegion = useCheckRegion();
  const checkBlacklist = useCheckBlacklist();

  return useCallback(
    (
      {
        source,
      }: {
        source: Initialize_Source;
      } = { source: '' }
    ) => {
      if (checkBlacklist() && checkRegion()) {
        showModal({ modal: ModalKeys.verify_account, source });
      }
    },
    [checkRegion, showModal, checkBlacklist]
  );
}

export function useShowUnlockModal() {
  const showModal = useShowModal();

  const checkLocalTime = useCheckLocalTime();

  return useCallback(
    () => checkLocalTime() && showModal({ modal: ModalKeys.unlock }),
    [showModal, checkLocalTime]
  );
}

interface ChainInfo {
  chain: Type_DAChains;
  isFungibleChain: boolean;
  quoteToken: CommonToken;
  allowSwap: boolean;
  isLifi: boolean;

  isEvmChain: boolean;
  addressRegex: string;
  name: string;
  chainId: number;
  explorer: string;
  explorerUrlMap: {
    txHash?: string;
    address?: string;
    token?: string;
  };
  gasTokenSymbol: string;
  gasTokenCode: string;
  icon: string;
  tokenConner: string;
  solverAddress: string;
  gasAddress: string;
  variable: string;
}

export function useChainInfos(): ChainInfo[] {
  return useSelector((state: AppState) => state.application.chainInfo);
}

export function useChainInfosMap(): Record<Type_DAChains, ChainInfo> {
  const chainInfo = useChainInfos();
  return useMemo(() => {
    const configs = chainInfo.reduce((acc, d) => {
      acc[d.chain] = d;
      return acc;
    }, {} as Record<Type_DAChains, ChainInfo>);
    window.DA_CHAIN_CONFIG = configs;
    return configs;
  }, [chainInfo]);
}

export function useChainInfo(chain: Type_DAChains): ChainInfo | undefined {
  const chainInfo = useChainInfos();
  return useMemo(() => {
    return chainInfo.find((d) => d.chain === chain);
  }, [chainInfo, chain]);
}

export function useChains(): Type_DAChains[] {
  const chainInfo = useChainInfos();
  return useMemo(() => {
    return chainInfo.map((d) => d.chain);
  }, [chainInfo]);
}

export function useAllowSwapChains(): Type_DAChains[] {
  const chainInfo = useChainInfos();
  return useMemo(() => {
    return chainInfo.filter((d) => d.allowSwap).map((d) => d.chain);
  }, [chainInfo]);
}

export function useFungbileChains(): Type_DAChains[] {
  const chainInfo = useChainInfos();
  return useMemo(() => {
    return chainInfo.filter((d) => d.isFungibleChain).map((d) => d.chain);
  }, [chainInfo]);
}

export function useUsdcTokensMap() {
  const chainInfo = useChainInfos();
  return useMemo(() => {
    return (chainInfo || []).reduce((acc, d) => {
      if (d.quoteToken?.symbol?.toLowerCase() !== 'usdc') {
        return acc;
      }
      acc[d.chain] = d.quoteToken;
      return acc;
    }, {} as Record<Type_DAChains, CommonToken>);
  }, [chainInfo]);
}

export function useSignToView() {
  const showModal = useShowModal();
  const checkLocalTime = useCheckLocalTime();
  const connectWallet = useConnectWallet();
  const isAppH5 = useIsAppH5();

  return useCallback(
    ({ tips }: any) => {
      if (!checkLocalTime()) {
        return;
      }
      if (isAppH5) {
        connectWallet();
        return;
      }
      showModal({ modal: ModalKeys.signToView, tips });
    },
    [checkLocalTime, showModal, connectWallet, isAppH5]
  );
}

export function useShowTipsModal() {
  const showModal = useShowModal();

  return useCallback(
    ({ modal, ...rest }: any) => {
      return showModal({ modal, ...rest });
    },
    [showModal]
  );
}

export function useHideModals(modal?: any) {
  const dispatch = useDispatch();

  return useCallback(
    ({ all }: any = {}) => {
      return dispatch(hideModal({ modal, all } as any));
    },
    [dispatch, modal]
  );
}

export function useModals(modal?: any) {
  const modals = useSelector((state: AppState) => state.application.modals);
  const hide = useHideModals(modal);

  return useMemo(() => {
    if (!modal) return { ...modals, hide: () => hide({ all: true }) };
    return {
      ...(modals as any)[modal],
      visible: !!(modals as any)[modal]?.visible,
      hide,
    };
  }, [modals, modal, hide]);
}

export function useShowModal() {
  const dispatch = useDispatch();

  return useCallback(
    ({ modal, ...rest }: any) => {
      return dispatch(showModal({ modal, ...rest }));
    },
    [dispatch]
  );
}

export function useNeedHideWalletTradeBtn() {
  const modals = useSelector((state: AppState) => state.application.modals);
  const hideTradeBtn = useSelector(
    (state: AppState) => state.application.hideWalletTradeBtn
  );
  const isShowMenu = useIsShowingMenu();
  const hasModal = useMemo(() => {
    return Object.values(modals).some((m: any) => m.visible);
  }, [modals]);

  return {
    hideWalletBtn: hideTradeBtn || hasModal || isShowMenu,
    hideTag: `${hideTradeBtn} | ${hasModal} | ${isShowMenu}`,
  };
}

export function useForceShowTradeBtn() {
  const toggleWalletBtn = useToggleWalletTradeBtn();
  const dispatch = useDispatch();
  const modals = useSelector((state: AppState) => state.application.modals);

  return useCallback(() => {
    toggleWalletBtn(false);
    dispatch(hideModal({ all: true } as any));
    try {
      logLimitOrderErr({
        method: 'clickTradeBtn logs',
        log_error: 'clickTradeBtn',
        modals: Object.keys(modals)
          .filter((m: any) => (modals as any)[m].visible)
          .join(','),
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }, [toggleWalletBtn, dispatch, modals]);
}

export function useToggleWalletTradeBtn() {
  const dispatch = useDispatch();
  return useCallback(
    (hide: boolean) => dispatch(toggleWalletTradeBtn({ hide } as any)),
    [dispatch]
  );
}

export function useNeedHideWalletDepositBridgedAddress() {
  const hideAddress = useSelector(
    (state: AppState) => state.application.hideWalletDepositBridgedAddress
  );
  return hideAddress;
}

export function useToggleDepositBridgedAddress() {
  const dispatch = useDispatch();
  return useCallback(
    (hide: boolean) =>
      dispatch(toggleWalletDepositbridgedAddress({ hide } as any)),
    [dispatch]
  );
}

export function useShowExplantion(type: any) {
  const showModal = useShowModal();

  return useCallback(() => {
    showModal({
      modal: ModalKeys.explanations,
      type,
    });
  }, [showModal, type]);
}

export function useRefreshEnclavaInfo() {
  const dispatch = useDispatch();
  return useCallback(() => dispatch(refreshEnclavaInfo()), [dispatch]);
}

export function useRefreshEnclavaInfoIndex() {
  return useSelector(
    (state: AppState) => state.application.refreshEnclavaInfoIndex
  );
}

export function useGasPaymentCandidates() {
  return useSelector(
    (state: AppState) => state.application.gasPaymentCandidates
  );
}

export function useFirstPaymentUsdcToken(): Token | undefined {
  const gasPaymentCandidates = useGasPaymentCandidates();
  return useMemo(() => {
    return gasPaymentCandidates.find((d: Token) => d.symbol === 'USDC');
  }, [gasPaymentCandidates]);
}

export function useGasPaymentCandidatesWithTokenInfo() {
  const gasPaymentCandidates = useGasPaymentCandidates();
  const _gasTokens = useSwapBalances({ tokens: gasPaymentCandidates });
  const tokensWithPrice = useTokensWithTokenInfo({ tokens: _gasTokens });
  const { solRentExemption } = useInfo();
  return useMemo(() => {
    return tokensWithPrice.map((d) => {
      const _isSol = tokenIsSol(d);
      let available = d.available;
      // sol切换gas币种时候显示余额需要扣除rent exemption
      if (_isSol) {
        available = minus(available, solRentExemption);
      }
      if (Number(available) < 0) {
        available = '0';
      }
      return mapToken({
        ...d,
        available,
      });
    });
  }, [tokensWithPrice, solRentExemption]);
}

const USDCMAP: Record<string, string> = {
  SOLANA: 'USDC_SOL',
  ETHEREUM: 'USDC',
  BASE: 'USDC_BASE',
  BSC: 'USDC_BEP20',
  ARBITRUM: 'USDC_ARB',
  OPTIMISM: 'USDC_OP',
  // AVALANCHE: 'AVAX',
  POLYGON: 'USDC_POLYGON',
  // SUI: 'SUI',
  // APTOS: 'APT',
  WORLDCHAIN: 'USDC_WORLDCHAIN',
  MATIC: 'USDC_MATIC',
  CELO: 'USDC_CELO',
};

export function useOprBuyWithCashLink(token?: Token) {
  const { buyWithCashLink } = useInfo();
  return useMemo(() => {
    if (!buyWithCashLink) return '';
    if (!token) return `${buyWithCashLink}&cryptoCurrency=USDC_BASE`;
    if (token?.symbol === 'SOL') {
      return `${buyWithCashLink}&cryptoCurrency=SOL_SOL`;
    }
    if (token.symbol === 'USDC') {
      return `${buyWithCashLink}&cryptoCurrency=${
        USDCMAP[token.chain as string] || `USDC_BASE`
      }`;
    }
    return `${buyWithCashLink}&cryptoCurrency=USDC_BASE`;
  }, [buyWithCashLink, token]);
}

export function useCommonAddFunds() {
  const showModal = useShowModal();
  const { buyWithCashLink } = useInfo();
  const receive = useReceive();

  return useCallback(
    ({ token }: { token?: Token }) => {
      if (!buyWithCashLink) {
        receive({ token });
      } else {
        showModal({ modal: ModalKeys.addFunds, token });
      }
    },
    [showModal, buyWithCashLink, receive]
  );
}

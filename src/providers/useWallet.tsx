import React, { useCallback, useContext, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';

import useWalletOperations from 'src/bridge/useWalletOperations';
import { DEX_CHAIN_ID } from 'src/constants/dex';
import { Operations } from 'src/constants/interface/operations';
import { Wallet } from 'src/constants/interface/wallet';
import { useUEDSettings } from 'src/mock/MockModeContext';
import { walletSnapshot } from 'src/wallet/config';

const WalletContext = React.createContext<Wallet>({} as Wallet);

export const UserCancel = 100000000;
export const InitErr = 10001;
export const NetworkErr = 10002;
export const AccountErr = 10003;
export const ConnectionErr = 10004;
export const DepositGas = 10005;

const noopFn = () => {};
const noopPromise = () => Promise.resolve();

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const { mode, isLoggedIn } = useUEDSettings();

  const wallet = useMemo((): Wallet => {
    const isMobileMode = mode === 'mobile';
    const isH5Mode = mode === 'h5';

    const ws = walletSnapshot as any;
    const hasToken = isLoggedIn && !!ws.accessToken?.token;

    // Sync window globals for H5 mode
    if (isH5Mode) {
      (window as any)._degate_app = {
        isApp: true,
        appVersion: '1.0.20',
        locale: ws.locale || 'en',
        account: ws.account,
        deviceId: ws.deviceId || 'ued-device',
        da_owner: ws.accessToken?.da_owner,
        accessToken: hasToken ? ws.accessToken.token : '',
        callAppPromise: noopPromise,
        solverAddresses: ws.solverAddresses,
      };
    } else {
      delete (window as any)._degate_app;
    }

    return {
      walletStateReady: true,
      selectedWallet: hasToken ? ws.selectedWallet || 'ued-wallet' : '',
      locale: ws.locale || 'en-US',
      handleLocaleChange: noopFn,
      account: hasToken ? ws.account : '',
      DAs: hasToken ? ws.DAs : (undefined as any),
      walletChainId: (ws.walletChainId || DEX_CHAIN_ID) as any,
      dexChainId: ws.dexChainId || DEX_CHAIN_ID,
      operations: {} as Operations,
      connections: {} as any,
      renderSwapBtn: noopFn,
      gaEvent: noopFn,
      accessToken: hasToken ? ws.accessToken : { token: '', da_owner: '' },
      allowQuickTrading: ws.allowQuickTrading ?? false,
      isHideQuickTradingTips: ws.isHideQuickTradingTips ?? false,
      isMobile: isMobileMode,
      uuid: ws.uuid || '',
      referrer: ws.referrer || '',
      providerInfo: ws.providerInfo as any,
      setDocumentTitle: (title: string) => {
        document.title = title || 'DeGate UED';
      },
      solverAddresses: ws.solverAddresses as any,
      deviceId: ws.deviceId || 'ued-device',
      isApp: isH5Mode,
      isFullVersion: ws.isFullVersion ?? true,
      callAppPromise: noopPromise as any,
      updateWallet: noopFn as any,
      hasUnlocked: hasToken && (ws.hasUnlocked ?? true),
    } as Wallet;
  }, [mode, isLoggedIn]);

  useEffect(() => {
    (window as any).isMobile = wallet.isMobile;
    (window as any).isApp = wallet.isApp;
    (window as any).callAppPromise = wallet.callAppPromise;
    (window as any).uuid = wallet.uuid;
  }, [wallet]);

  return (
    <WalletContext.Provider value={wallet}>{children}</WalletContext.Provider>
  );
}

WalletProvider.propTypes = {
  children: PropTypes.any,
};

export default function useWallet() {
  return useContext(WalletContext);
}

export function useIsAppH5() {
  const wallet = useWallet();
  return !!wallet?.isApp;
}

export function useIsMobile() {
  const isAppH5 = useIsAppH5();
  const wallet = useWallet();
  if (isAppH5) {
    return false;
  }
  const currentIsMobile = !!wallet?.isMobile;
  (window as any).isMobile = currentIsMobile;
  return currentIsMobile;
}

export function useUUID() {
  const { uuid } = useWallet();
  return useMemo(() => uuid?.split(':')?.[0], [uuid]);
}

export function useUtmSource() {
  const { uuid } = useWallet();
  return useMemo(() => uuid?.split(':')?.[1] ?? '', [uuid]);
}

export function useGaEvent() {
  const trackEvent = useCallback((_event: string, _data: any) => {
    // no-op in UED project
  }, []);
  (window as any).gaEvent = trackEvent;
  return trackEvent;
}

export function useSetTitle() {
  const { setDocumentTitle } = useWallet();
  const setTitle = useCallback(
    (title: string) => {
      if (setDocumentTitle) {
        setDocumentTitle(title);
      } else {
        document.title = title || 'DeGate UED';
      }
    },
    [setDocumentTitle]
  );
  (window as any).setDocumentTitle = setTitle;
  return setTitle;
}

export function useHasAccessToken() {
  const { accessToken } = useWallet();
  return !!accessToken?.token;
}

export function useAllowQuickTrading() {
  const { allowQuickTrading } = useWallet();
  return allowQuickTrading;
}

export function useWalletWeb3() {
  const { account, walletChainId, dexChainId, providerInfo, selectedWallet } =
    useWallet();
  return useMemo(() => {
    return {
      account,
      dexChainId,
      walletChainId,
      providerInfo,
      selectedWallet,
    };
  }, [walletChainId, account, dexChainId, providerInfo, selectedWallet]);
}

export function useWalletOprs() {
  const wallet = useWallet();
  return useWalletOperations(wallet);
}

import { useMemo } from 'react';
import mobileWalletIcon from 'imgs/icon_wallet.svg';

import { CONNECTION } from 'src/constants/interface/wallet';
import { useThemeParams } from 'src/theme';

import { useWalletWeb3 } from 'js/providers/useWallet';

export function useIsInjected() {
  const { selectedWallet } = useWalletWeb3();
  return selectedWallet.includes(CONNECTION.INJECTED_CONNECTOR_TYPE);
}

export function useIsWalletConnectV2() {
  const { selectedWallet } = useWalletWeb3();
  return selectedWallet === CONNECTION.WALLET_CONNECT_CONNECTOR_ID;
}

export function useIsLedger() {
  const { selectedWallet } = useWalletWeb3();
  return selectedWallet === CONNECTION.LEDGER_ID;
}

export function useIsPrivy() {
  const { selectedWallet } = useWalletWeb3();
  return selectedWallet === CONNECTION.PRIVY_ID;
}

export function useLedgerAppVersion() {
  const { providerInfo } = useWalletWeb3();
  return providerInfo?.ledgetAppVersion ?? '';
}

export function useSelectdWalletIcon() {
  const { providerInfo } = useWalletWeb3();
  const { isMobile } = useThemeParams();

  return useMemo(() => {
    if (isMobile) return mobileWalletIcon;
    return providerInfo?.icon;
  }, [providerInfo, isMobile]);
}

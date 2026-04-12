import { Type_DAChains } from 'src/da';

import { DA, TradeBtnParams } from '.';
import { Operations } from './operations';

export const CONNECTION = {
  INJECTED_CONNECTOR_TYPE: 'injected',
  INJECTED_CONNECTOR_ID: 'injected',
  WALLET_CONNECT_CONNECTOR_ID: 'walletConnect',
  METAMASK_ID: 'io.metamask',
  PRIVY_ID: 'io.privy.wallet',
  LEDGER_ID: 'ledger',
  DISCONNECTED: 'DISCONNECTED',
} as const;
export interface ProviderInfo {
  name: string;
  icon?: string;
  email?: string;
  ledgetAppVersion?: string;

  walletType?: string;
  walletName?: string;
  accountName?: string;
}

export interface Wallet {
  walletStateReady?: boolean;
  selectedWallet: string | '';
  locale: string;
  handleLocaleChange: (locale: string) => void;
  account: string;
  DAs: {
    [chain in Type_DAChains]: DA;
  };
  walletChainId: number;
  dexChainId: number;
  operations: Operations;
  connections: any;
  renderSwapBtn: (params: TradeBtnParams) => void;
  gaEvent?: (event: string, data: any) => void;
  accessToken: {
    token: string;
    da_owner: string;
  };
  allowQuickTrading: boolean;
  isHideQuickTradingTips: boolean;
  isMobile: boolean;
  uuid: string;
  referrer: string;
  providerInfo?: ProviderInfo;
  setDocumentTitle: (title: string) => void;
  solverAddresses: {
    [chain in Type_DAChains]: {
      solver: string;
      gas: string;
    };
  };
  deviceId: string;
  isApp: boolean;
  // for app
  isFullVersion?: boolean;
  callAppPromise: (action: string, params: any) => Promise<any>;
  updateWallet: (wallet: any) => void;
  app_da_owner?: string;
}

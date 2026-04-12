import {
  BridgeUsdcOrderParams,
  BridgeUsdcOrderResp,
  CommonCheckRes,
  CommonToken,
  CreateSendOrderParams,
  CreateSendOrderResp,
  CreateSwapParams,
  CreateSwapResp,
  EarnOrderParams,
  EarnOrderResp,
  LogWalletParams,
  SyncToAppParams,
  TurboRangeOrderParams,
  TurboRangeOrderResp,
  UnlockParams,
} from 'src/constants/interface';
export interface Operations {
  callAppPromise: (method: string, params: any) => Promise<any>;
  windowOpen: (url: string, target?: string) => void;
  windowRefresh: () => void;
  connectWallet: ({
    logWallet,
  }: {
    logWallet?: LogWalletParams;
  }) => Promise<any>;

  signAccessTokenWithEcdsa: () => Promise<{
    walletId: string;
    signature: string | undefined;
    time: number;
  }>;

  signClaimRaffleRewards: () => Promise<{
    walletId: string;
    signature: string | undefined;
    time: number;
  }>;

  updateAccessToken: (
    accessToken: string,
    account: string,
    da_owner: string
  ) => void;

  updateAllowQuickTrading: (allowQuiteTrading: boolean) => void;

  updateHideQuickTradingTips: (isHide: boolean) => void;

  checkConnection: () => Promise<CommonCheckRes>;

  checkHasUnLocked: () => boolean;

  disconnect: () => void;

  switchNetwork: (
    chainId: number,
    chainName?: string,
    rpcs?: string[],
    explorer?: string,
    nativeCurrency?: string
  ) => Promise<void>;

  unlock: (params: UnlockParams) => Promise<{
    publicKeyX: string;
    publicKeyY: string;
    assetNonce: number;
    keyNonce: number;
  }>;

  lock: () => void;

  viewAddress: () => void;

  receive: (token?: CommonToken) => Promise<any>;

  createSwapOrder: (params: CreateSwapParams) => Promise<CreateSwapResp>;

  createEarnOrder: (params: EarnOrderParams) => Promise<EarnOrderResp>;

  createTurboRangeOrder: (
    params: TurboRangeOrderParams
  ) => Promise<TurboRangeOrderResp>;

  createBridgeUsdcOrder: (
    params: BridgeUsdcOrderParams
  ) => Promise<BridgeUsdcOrderResp>;

  createSendOrder: (
    params: CreateSendOrderParams
  ) => Promise<CreateSendOrderResp>;

  syncToApp: (params: SyncToAppParams) => void;

  syncPrivyToApp: (params: SyncToAppParams) => Promise<any>;

  walletIdSign: (message: string) => Promise<{
    signature: string;
    walletId: string;
  }>;
}

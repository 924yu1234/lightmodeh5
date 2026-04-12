import { Type_DAChains } from 'src/da';
import { TurboRangeProduct } from 'src/state/turboRange/reducer';
declare global {
  interface Window {
    DeGateWallet: any;
    _degate_app: any;
    _wallet_config: any;
    _config: any;
    DA_CHAIN_CONFIG: any;
    u2f: any;
    intl: any;
    locale: any;
    login_account: string;
    windowOpen: (url: string, target?: string) => void;
    isMobile: boolean;
    isApp: boolean;
    callAppPromise: (method: string, params: any) => Promise<any>;
    uuid: string;
    logWalletCompletedParams: any;
    earnOprTime: number;
    turboRangeOprTime: number;
    max_additional_deduct: number;
  }
}

export interface CommonToken {
  id: TokenId;
  chain?: TokenChain;
  code: string;
  decimals: number;
  symbol: string;
  icon?: string;
  name?: string;
  priority?: string;
  isDefaultToken?: boolean;
  is_list_token?: boolean;
  is_dynamic?: boolean;
  is_quotable_token?: boolean;
  is_whitelist?: boolean;
  wrap?: string;
}

export declare type DeChainId = number | 'DEGATE' | Type_DAChains;
export declare type TokenId = number;
export declare type StorageId = number;
export declare type AccountId = number;
export declare type WithdrawMethod = 'economy' | 'fast';

export type DepositType = 'transfer' | 'contract';

export declare type Wei = string;

export enum OrderDirs {
  SELL = 'SELL',
  BUY = 'BUY',
}

export interface MaxGasPrice {
  maxGasFee?: Wei;
  priorityFee?: Wei;
  gasLimit?: string;
}

export interface WalletAccount {
  account: string;
  derivationPath?: string;
}

export interface LedgerAccount {
  address: string;
  derivationPath: string;
  index?: number;
}

export interface EcDSASignature {
  time: number;
  signature: string;
}
export interface Info {
  dexChainId: number;
  exchangeAddress: string;
  depositAddress: string;
  operatorAddress: string;
  operatorId: number;
  depositFeeDegateAddress: string;
  depositFeeDegateId: number;
  depositFeeTransferAddress: string;
  gasTokenValidAddress: string;

  EXCHANGE_NAME: string;
  SIGN_NAME: string;
  SIGN_VERSION: string;
}

export type TokenChain = Type_DAChains | 'DEGATE' | 'ETH';
export interface DA {
  path: string;
  address: string;
  publicKey: string;
  privateKey?: string;
  signature?: string;
  signatureChains?: string;
  time?: number;
  chain: Type_DAChains;
}

export interface DexAccount {
  account?: string;
  accountId?: number;
  dexChainId: number;
  publicKeyX: string;
  publicKeyY: string;
  nonce?: number;
  keyNonce: number;
  assetNonce?: number;
  exchangeAddress: string;
  DAs?: {
    [chain in Type_DAChains]: DA;
  };
}

export interface KeyPair {
  keyNonce: number;
  secretKey: string;
  publicKeyX: string;
  publicKeyY: string;
}

export interface Token extends CommonToken {
  amount: string;
  volume?: string;
  available?: string;
  availableDisplay?: string;
  locked?: string;
  lockedDisplay?: string;
  frozenGrid?: string;
  frozenOrder?: string;
  frozenWithdraw?: string;
  frozenSwapping?: string;
  totalValue?: string;
  totalDisplay?: string;
  totalValueDisplay?: string;
}

export interface GasToken extends CommonToken {
  amount: string; // 1e{decimals}
}
export interface BalanceToken extends CommonToken {
  available: string;
  availableDisplay: string;
  copyTradeAvailable: string;
  copyTradeAvailableDisplay: string;
  totalDisplay: string;
  totalValueDisplay: string;
}

export interface FungibleUsdcBalance extends BalanceToken {
  balances: BalanceToken[];
}

export interface WalletToken extends CommonToken {
  balance: string;
  balanceDisplay: string;
}
export interface ModalOptions {
  accountId?: number;
  tokenId?: TokenId;
  volume?: string;
}
export interface TradeBtnParams {
  contextId?: string;
  type: OrderDirs | '';
  baseToken?: CommonToken;
  top: number;
  left: number;
  right?: number;
  width: number;
  height: number;
  loading: boolean;
}

export interface CommonCheckRes {
  valid: boolean;
  error?: { code: number; message?: string };
}

export interface UnlockParams {
  keyNonce: number;
  exchangeAddress: string;
  type: 'unlock' | 'register';
}

export interface LogWalletParams {
  logWalletAction: (action: string) => void;
  logWalletCompleted: ({
    action,
    source,
    error,
    owner,
    walletName,
  }: {
    action: string;
    source: string;
    error?: any;
    owner?: string;
    walletName?: string;
  }) => void;
  eventTrack: (event: { type: string; data: any }) => void;
}

export interface IntentTryItemResp {
  result: IntentCreateItemResp;
  data: string;
  signature: string;
  estimate_time: number;
}

export interface IntentCreateItemResp {
  uuid: string;
  data: string;
  signature: string;
  created_at: number;
}

export interface IntentSignItemResp {
  data: string;
  signature: string;
  intent_id: number;
}

export interface CreateSwapParams {
  localOrderId: string;
  baseToken: Token;
  quoteToken: Token;
  orderDir: OrderDirs;
  price: string;
  maxSlippage: string;
  chain_uuid: string;
  takerFee: string;
  tryResp: any;
}

export interface CreateSwapResp {
  order: any;
  signResp: any;
}

export interface SyncToAppParams {
  uploadHash: ({
    hash,
    uuid,
  }: {
    hash: string;
    uuid: string;
  }) => Promise<boolean>;
}

export const BridgeChains = ['ARBITRUM', 'ETHEREUM', 'OPTIMISM'] as const;

export type TypeBridgeChains = typeof BridgeChains[number];

export interface Vault {
  id: number;
  protocol: string;
  chain: Type_DAChains;
  name: string;
  website: string;
  address: string;
  marketAddress: string;
  token: CommonToken;
  dailyRewards?: string;
  amount?: string;
  detail?: any;
  descriptions?: {
    locale: string;
    content: string;
  }[];
}

export interface EarnOrderParams {
  type: 'deposit' | 'withdraw' | 'claim';
  vault: Vault;
  amount: string;
  usdcRoutes?: any[];
  rewardToken?: CommonToken;
  tryResp: IntentTryItemResp;
  dailyRewards?: string;
}

export interface EarnOrderResp {
  order: any;
  intent_id: number;
}

export interface TurboRangeDepositOrderParams {
  amount: string;
  minPrice: string;
  maxPrice: string;
  tryResp: IntentTryItemResp;
}

export interface TurboRangeDualDepositOrderParams {
  baseAmount: string;
  quoteAmount: string;
  minPrice: string;
  maxPrice: string;
  tryResp: IntentTryItemResp;
}

export interface TurboRangeWithdrawOrderParams {
  position: TurboRangeProduct;
  estReceive: Token[];
  tryResp: IntentTryItemResp;
}

export interface TurboRangeClaimOrderParams {
  position: TurboRangeProduct;
  estClaims: Token[];
  tryResp: IntentTryItemResp;
}

export interface TurboRangeIncreaseInvestmentOrderParams {
  amount: string;
  tryResp: IntentTryItemResp;
}

export interface TurboRangeDualIncreaseInvestmentOrderParams {
  baseAmount: string;
  quoteAmount: string;
  tryResp: IntentTryItemResp;
}
export interface TurboRangeOrderParams {
  type:
    | 'deposit'
    | 'dualDeposit'
    | 'withdraw'
    | 'claim'
    | 'increaseInvestment'
    | 'dualIncreaseInvestment';
  product: TurboRangeProduct;
  depositOrderParams?: TurboRangeDepositOrderParams;
  dualDepositOrderParams?: TurboRangeDualDepositOrderParams;
  withdrawOrderParams?: TurboRangeWithdrawOrderParams;
  claimOrderParams?: TurboRangeClaimOrderParams;
  increaseInvestmentOrderParams?: TurboRangeIncreaseInvestmentOrderParams;
  dualIncreaseInvestmentOrderParams?: TurboRangeDualIncreaseInvestmentOrderParams;
}

export interface TurboRangeOrderResp {
  order: any;
  intent_id: number;
}

export interface BridgeUsdcOrderParams {
  fromToken: Token;
  toToken: Token;
  amount: string;
  tryResp: IntentTryItemResp;
}

export interface BridgeUsdcOrderResp {
  order: any;
  intent_id: number;
}

export interface CreateSendOrderParams {
  token: Token;
  chain: Type_DAChains;
  recipient: string;
  amount: string;
  tokenValue: string;
  tryResp: IntentTryItemResp;
}

export interface CreateSendOrderResp {
  order: any;
  data: any;
  intent_id: number;
}
export interface CopyTradeTransferInOrderParams {
  amount: string;
  botAddress: {
    address: string;
    signature: string;
    timestamp: number;
  };
  tryResp: any;
}

export interface CopyTradeTransferInOrderResp {
  order: CopyTradeTransferInOrderParams;
  intent_id: number;
}

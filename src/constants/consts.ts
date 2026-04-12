import { DayOfWeek } from '@mantine/dates';
import Wormhole from 'imgs/Wormhole.png';

import { CommonToken } from './interface';

export const MarketInputType = {
  amount: 'amount',
  total: 'total',
};

export const OrderStatus = {
  pending: 'pending',
  completed: 'completed',
  open: 'open',
  processing: 'open',
  completedPart: 'completedPart',
  canceled: 'canceled',
  expired: 'expired',
  notTrigger: 'notTrigger',
  cancelProcessingOnChain: 'cancelProcessingOnChain',
  cancelCompletedOnChain: 'cancelCompletedOnChain',
};

export const isOpenOrder = (status: keyof typeof OrderStatus) => {
  return (
    status === OrderStatus.open ||
    status === OrderStatus.processing ||
    status === OrderStatus.notTrigger ||
    status === OrderStatus.pending
  );
};

// 未入块： pending
// 已入块： onChain
// 链上确认： chainConfirmed
// 处理中： processing
// 失败: failed
// 成功: success
// 已完成: completed

export const DepositStatus = {
  pending: 'pending',
  onChain: 'onChain',
  chainConfirmed: 'chainConfirmed',
  processing: 'processing',
  failed: 'failed',
  success: 'success',
  completed: 'completed',
  canceled: 'canceled',
};

export const WithdrawStatus = {
  processing: 'processing',
  success: 'success',
  completed: 'completed',
  failed: 'failed',
};

export const SendStatus = {
  processing: 'processing',
  success: 'success',
  completed: 'completed',
  failed: 'failed',
};

export const ReceiveStatus = {
  processing: 'processing',
  success: 'success',
  completed: 'completed',
  failed: 'failed',
};

export const GridStatus = {
  processing: 'open',
  open: 'open',
  close: 'close',
  expired: 'expired',
  cancelProcessingOnChain: 'cancelProcessingOnChain',
  cancelCompletedOnChain: 'cancelCompletedOnChain',
};

export const DCAStatus = {
  open: 'open',
  close: 'close',
  expired: 'expired',
  cancelProcessingOnChain: 'cancelProcessingOnChain',
  cancelCompletedOnChain: 'cancelCompletedOnChain',
};

export const DCAOrderStatus = {
  untriggered: 'untriggered',
  triggered: 'triggered',
  failed: 'failed',
  canceled: 'canceled',
};

export const SwapOrderStatus = {
  processing: 'PROCESSING',
  success: 'SUCCESS',
  quickSuccess: 'QUICKSUCCESS',
  failed: 'FAILED',

  // 本地因为try失败取消
  canceled: 'CANCELED',
};

export const TurboRangeOrderStatus = {
  pending: 'PENDING',
  processing: 'PROCESSING',
  success: 'SUCCESS',
  failed: 'FAILED',
};

export const TurboRangeHistoryType = {
  LP_WITHDRAW: 'LP_WITHDRAW',
  LP_CLAIM: 'LP_CLAIM',
  LP_ADD_DEPOSIT: 'LP_ADD_DEPOSIT',
  LP_DEPOSIT: 'LP_DEPOSIT',
};

export const IntentOrderStatus = {
  processing: 'PROCESSING',
  success: 'SUCCESS',
  failed: 'FAILED',
};

export const GridOrderTypes = {
  buyOrder: 7,
  sellOrder: 6,
};

export const SpotTypesValue = {
  limitOrder: 0,
  marketOrder: 1,
  stopLimitOrder: 8,
};

export const GridStrategies = {
  automatic: 'AUTOMATIC',
  manual: 'MANUAL',
};

export const firstDayOfWeek: {
  [p: string]: DayOfWeek;
} = {
  'en-US': 0, // 周日
  'zh-CN': 1, // 周一
  'zh-TW': 1,
};

export const Pages = {
  common: 'common',
  grid: 'grid',
  trade: 'trade',
  gridGraph: 'gridGraph',
  swap: 'swap',
};

export const FarmStatus = {
  available: 'available',
  unavailable: 'unavailable',
  partial: 'partial',
};

export const ServerMessagesTypes = {
  SystemRecovery: 1,
};

export type OrderDir = 'desc' | 'asc' | '';

export type Wrap = 'WBTC' | 'Wormhole';

export const WrapTokenConfig: {
  [key in Wrap]: {
    icon: string;
    officialSite: string;
    wrapSite: string;
  };
} = {
  WBTC: {
    icon: '',
    officialSite: 'https://wbtc.network',
    wrapSite: '',
  },
  Wormhole: {
    icon: Wormhole,
    officialSite: 'https://wormhole.com',
    wrapSite: 'https://portalbridge.com',
  },
};

export const USDT_codes = [
  '0xfa8b72cea6850b9d6f8ea39f454b00d1bcc3cc99', // holesky
  '0xdac17f958d2ee523a2206206994597c13d831ec7', // 主网
];

export const TOKEN_ETH: CommonToken = {
  id: 0,
  name: 'ETH',
  code: 'eth',
  decimals: 18,
  symbol: 'ETH',
  icon: 'https://mainnet-cdn.degate.com/token/ETH.png',
};

export const TOKEN_USDC: CommonToken = {
  id: -1,
  name: 'USDC',
  code: 'usdc',
  decimals: 6,
  symbol: 'USDC',
  icon: 'https://mainnet-cdn.degate.com/token/USDC.png',
};

export const allowBridgeUSDT = false;

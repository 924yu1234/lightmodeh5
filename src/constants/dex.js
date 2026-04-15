const _config = window._config ?? {};
export const DEX_CHAIN_ID = Number(_config.DEX_CHAIN_ID);
export const DG_API = _config.DG_API;
export const HUB_API = _config.HUB_API;
export const WS_API = _config.WS_API;
export const COPY_TRADE_API = _config.COPY_TRADE_API;
export const LOG_API = _config.LOG_API;
export const PUBLIC_URL = _config.PUBLIC_URL;
export const DISABLED_ROUTES = _config.DISABLED_ROUTES;
export const DG_SCAN = _config.DG_SCAN;
export const AIRDROP_CAMPAIGN = _config.AIRDROP_CAMPAIGN;
export const RESET_APPROVAL_TOKENS = (_config.RESET_APPROVAL_TOKENS || '')
  .split(',')
  .concat([
    '0xdAC17F958D2ee523a2206206994597C13D831ec7', // USDT
    '0x5A98FcBEA516Cf06857215779Fd812CA3beF1B32', // LDO
  ])
  .filter((d) => d);

export const ENV = _config.ENV || '';

export const isBeta = _config.BETA_ENV === 'true';
export const isMainnet = DEX_CHAIN_ID === 1;

export const EXCHANGE_NAME = 'DeGate Exchange';
export const SIGN_NAME = 'DeGate Protocol';
export const SIGN_VERSION = '0.1.0';
export const UI_REFER_ID = 0;
export const PAIRS_TABS = [
  { symbol: 'USDC' },
  { symbol: 'USDT' },
  { symbol: 'ETH' },
];
export const tokenEth = { code: 'eth', id: 0, token_id: 0 };

export const WHTIDWAR_VALID_UNTIL = 1296000; // 3600 * 24 * 15;
export const INNER_TRANSGER_VALID_UNTIL = 12960003600; // * 24 * 15;
export const MARKET_ORDER_CHEAP = 0.1; // 10%
export const AUTO_GRID_VALID_UNTIL = 15552000; // // 180 day

export const MULTICALL_ACCOUNT = _config.MULTICALL_ACCOUNT; // multicall合约地址

export const SHOW_MINING =
  _config.IS_MINING === 'true' || location.href.includes('mining=true');

export const ABOUT_LINK = 'https://docs.degate.com/about-degate';

export const DOC_LINK = 'https://docs.degate.com';

export const MAX_ORDER_AMOUNT = '10000000000000000000000000000'; // 10 ** 28

export const MAX_AMOUNT =
  '100000000000000000000000000000000000000000000000000000000000000000000000000'; // 10 ** 74

export const DEPOSIT_CONFIRMATIONS = 12;

export const AMOUNT_DECIMAL = 6;

// 使用内部转账有效位数
export const SWAP_AMOUNT_DECIMAL = 7;
export const SWAP_SELL_AMOUNT_DECIMAL = 100;
export const SWAP_PRICE_DECIMAL = 5;

export const NEW_AMOUNT_DECIMAL = 12;

export const GAS_TOKEN_DECIMAL = 3;

export const GasLimitEnd = 1527;
// contract deposit end 1527
export const DepositGasLimit = {
  1: 301527,
  5: 301527,
};

// transfer deposit
export const TransferDepositEthGasLimit = {
  1: 31527,
  5: 31527,
};

export const MINING_APPLY =
  'https://docs.google.com/forms/d/e/1FAIpQLSet5A4pHZED_9IhiKslKbtvE4Tg_aWaiGf-jH6DPhma1AuaaA/viewform';

export const APPLY_WHITELIST = 'https://forms.gle/iC6uY8JdssVo8yfk8';
export const DISCORD = 'https://discord.gg/degate';
export const Twitter = 'https://twitter.com/DeGateWallet';
export const Telegram = 'https://t.me/degate_public/';
export const Forum = 'https://forum.degate.com/';
export const Blog = 'https://medium.com/degate/';
export const Youtube =
  'https://www.youtube.com/channel/UCRAL9U4dtZHSfUOosHUyafg';
export const JoinUs = 'https://degate.breezy.hr/';
export const Campagin = 'https://campaign.degate.com';
export const PrivyTerms = 'https://www.privy.io/user-terms-of-service';

// 秒 超过7天就无需链上撤单了
export const ChainCancelLeftTime = -604800;

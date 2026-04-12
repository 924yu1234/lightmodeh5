// account
export const USER_NOT_FUND = 101002;
export const USER_REGISTER_FORBIDDED_FOR_WHITELIST = 101001;
export const SIGNATURE_ERR = 102021;
export const ACCOUNT_IS_UPDATING = 200005;
export const ACCOUNT_IS_UPDATING_2 = 100010;
export const ACCOUNT_EXIST = 100003;
export const ACCOUNT_BLACKLIST = 100003;
export const SIGN_TO_VIEW_SIGNATURE_ERR = 100017;
export const SEND_MAX_AMOUNT = 140003;
export const AML_ERROR = 140002;

// token
export const INCOMPATIBLE_TOKEN = 102004;
export const FORCE_WITHDRAWING_TOKEN = 200116;
export const FORCE_WITHDRAWING_TOKEN_AS_GAS = 200117;

// trade
export const LIMIT_ERR_VOLUME_LEGALITY = 100004;
export const Valid_Unitl_Error = 102008;
export const INSUFFICIENT_BALANCE_ERR = 102011;
export const INSUFFICIENT_BALANCE_ERR_2 = 200105;
export const INSUFFICIENT_GAS_ERR = 102013;
export const PRICE_INVALID_FOR_STABLE_1 = 102016;
export const RISK_ORDER_LIMIT_ERR = 102026;
export const MIN_TRADE_VOLUME_ERR = 102027;
export const FEE_BIPS_ERR = 102037;
export const POST_ONLY_FAIL = 200101;
export const PRICE_INVALID_FOR_STABLE = 200111;
export const LIMIT_MIN_ERR = 200114;
export const Partially_Filled_For_Liquidity = 200124;

export const ETH_GAS_ERR = 1200002; // DEG-6286
export const OrderBookMinimumLimitNotReachedError = 102039; // 小于币种最小精度
export const OrderBookMaximumLimitExceededError = 102040; // 大于最大下单数量

// grid
export const GRIDTRADE_PRICE_CHANGE_ERR = 107003;
export const GRIDTRADE_SINGLE_QUOTE_CHANGE_ERR = 110018;
export const USER_MAX_GRID_NUMBER_ERR = 102403;

// gas err
export const GAS_ERR = 100009;
export const GAS_ERR_2 = 200102;
export const GAS_ERR_3 = 102029; // gasFee暴涨导致不足一次交易需要

// dca
export const DCA_UN_LIMIT_ORDERS_OVER = 100018;
export const DCA_START_TIME_BEFORE_CURRENT = 110101;

// swap
export const SWAP_SLIPPAGE_EXCEEDED = 412;
export const SWAP_TRANSACTION_TIMEOUT = 520;
export const SWAP_SIGNATURE_TIMEOUT = 501;
export const SWAP_NO_ROUTE_FUND = 140020;

// raffle
export const RAFFLE_ROUND_ENDED = 210002;
export const RAFFLE_BUY_TICKET_FAILED = 210003;

// intent
export const INTENT_EXPIRED = 141001;

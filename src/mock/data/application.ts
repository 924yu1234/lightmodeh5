/**
 * Mock data for ApplicationUpdater boot-time endpoints.
 * These 5 endpoints must return realistic data or the app won't render.
 */

// GET /order-book-api/exchange/info
const exchangeInfo = {
  chain_id: 17000,
  android_apk: '',
  deposit_address: '0xMockDepositAddress',
  exchange_address: '0xMockExchangeAddress',
  order_effective_digits: 8,
  operator_address: '0xMockOperator',
  operator_id: 1,
  withdrawal_time: 3600000,
  withdrawal_time_tips: 7200000,
  min_limit_order_usd_value: 1,
  min_order_price: 1,
  max_additional_deduct: '0',
  max_no_fund_locking_order_num: 10,
  mining_min_amount: 100,
  mining_min_duration: 86400,
  swap_min_amount: 15,
  swap_min_sell_amount: 15,
  white_features: null,
  release_version: 'ued-mock-1.0.0',
  deposit_fee_confirm_address: '0xMockFeeAddress',
  deposit_fee_confirm_de_gate_address: '0xMockDeGateFeeAddress',
  deposit_fee_confirm_de_gate_account_id: 1,
  deposit_fee_confirm_token_id: 2,
  deposit_fee_confirm_token_volume: '1000000',
  service_status: {
    stop_registered: false,
    stop_service: false,
    stop_service_time: 0,
    stop_trading: false,
    stop_swap: false,
  },
  raffle_allow_region: '',
  raffle_flash_allow_region: '',
  usdc_apy: '5.2',
  sol_rent_exemption: '0.00089',
  btc_balance_limit: '100',
  btc_swap_balance_limit: '50',
  simple_earn_disabled_deposit_das: [],
  simple_earn_disabled_das: [],
  turbo_range_disabled_klines: [],
  buy_with_cash_link: '',
  jump_out_browser: '',
};

// GET /order-book-api/user/enclave/info
const enclavaInfo = {
  enclave_exchange_info: 'mock-enclave-info',
  enclave_exchange_time: Date.now(),
  enclave_exchange_signature: 'mock-signature',
  is_region_code: false,
  region_code: 'US',
  disabled_region_code_info: {},
};

// GET /order-book-api/intent/chains
const chainInfo = {
  chains: [
    {
      chain_name: 'BASE',
      chain_code: 'BASE',
      is_support_fungible_usdc: true,
      allow_swap: true,
      display_level: 1,
      is_support_lifi: true,
      gas_token: {
        token_id: 1,
        chain: 'BASE',
        code: 'ETH',
        symbol: 'ETH',
        name: 'Ethereum',
        decimals: 18,
        icon: 'https://mainnet-cdn.degate.com/token/ETH.png',
      },
      quote_token: {
        token_id: 2,
        chain: 'BASE',
        code: 'USDC',
        symbol: 'USDC',
        name: 'USD Coin',
        decimals: 6,
        icon: 'https://mainnet-cdn.degate.com/token/USDC.png',
      },
    },
    {
      chain_name: 'SOLANA',
      chain_code: 'SOLANA',
      is_support_fungible_usdc: true,
      allow_swap: true,
      display_level: 2,
      is_support_lifi: false,
      gas_token: {
        token_id: 3,
        chain: 'SOLANA',
        code: 'SOL',
        symbol: 'SOL',
        name: 'Solana',
        decimals: 9,
        icon: 'https://mainnet-cdn.degate.com/token/SOL.png',
      },
      quote_token: {
        token_id: 4,
        chain: 'SOLANA',
        code: 'USDC',
        symbol: 'USDC',
        name: 'USD Coin',
        decimals: 6,
        icon: 'https://mainnet-cdn.degate.com/token/USDC.png',
      },
    },
  ],
};

// GET /intent-omni/get_app_config_template
const chainConfig = {
  data: JSON.stringify({
    chains: [
      {
        name: 'BASE',
        showName: 'Base',
        addressRegex: '^0x[0-9a-fA-F]{40}$',
        explorer: 'https://basescan.org',
        explorerUrlMap: {
          tx: 'https://basescan.org/tx/',
          address: 'https://basescan.org/address/',
        },
        nativeToken: { symbol: 'ETH', code: 'ETH' },
      },
      {
        name: 'SOLANA',
        showName: 'Solana',
        addressRegex: '^[1-9A-HJ-NP-Za-km-z]{32,44}$',
        explorer: 'https://solscan.io',
        explorerUrlMap: {
          tx: 'https://solscan.io/tx/',
          address: 'https://solscan.io/account/',
        },
        nativeToken: { symbol: 'SOL', code: 'SOL' },
      },
    ],
  }),
};

// GET /order-book-api/intent/gas_pay_candidates
const gasPayCandidates = {
  gas_payment_candidates: [
    {
      token_id: 2,
      symbol: 'USDC',
      decimals: 6,
      icon: 'https://mainnet-cdn.degate.com/token/USDC.png',
      name: 'USD Coin',
      code: 'USDC',
      chain: 'BASE',
    },
    {
      token_id: 1,
      symbol: 'ETH',
      decimals: 18,
      icon: 'https://mainnet-cdn.degate.com/token/ETH.png',
      name: 'Ethereum',
      code: 'ETH',
      chain: 'BASE',
    },
  ],
};

export const mockApplicationData = {
  exchangeInfo,
  enclavaInfo,
  chainInfo,
  chainConfig,
  gasPayCandidates,
};

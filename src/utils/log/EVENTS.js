const EVENTS = {
  performance: 80000,
  api_request: 80001,
  // send_erc20: 80002,
  // send_eth: 800003,
  get_balance: 80004,
  show_check_ip_err: 80005,
  dex_register: 80006,
  // dex_reset: 80007,
  dex_unlock: 80008,
  dex_lock: 80009,
  dex_export: 80010,
  dex_deposit: 80011,
  dex_withdraw: 80012,
  dex_internal_transfer: 80013,
  dex_registerToken: 80014,
  dex_approve: 80015,
  dex_connectWallet: 80016,
  show_blacklist_tips: 80017,
  dex_sign_to_view: 80018,
  show_incompatibleToken_tips: 80019,
  show_partiallyFilledByLiquidity_tips: 80019,
  dex_intent_try_create: 80020,

  dex_create_grid_err: 81001,
  dex_limit_order_err: 81002,
  dex_market_order_err: 81003,
  dex_limit_order: 81004,
  dex_market_order: 81005,
  dex_wallet_err: 81006,
  dex_wallet: 81007,
  dex_csp: 81008,
  dex_create_grid: 81009,
  dex_order_notification: 81010,

  dex_ws: 81014,
  dex_ws_user: 81015,
  dex_stop_limit_order: 81016,
  dex_event_track: 81017,
  dex_dca: 81018,
  dex_dca_err: 81019,
  dex_airdrop: 81020,
  dex_countdown: 81021,
  convert_grid_balance_to_quote: 81022,
  dex_balance: 81023,
  cancel_order: 81024,

  dex_swap: 81101,
  dex_swap_err: 81102,
  dex_earn: 81103,
  dex_swap_order: 81104,
  dex_send: 81105,
  dex_turbo_range: 81106,
  dex_bridge_usdc: 81107,
  dex_send_v2: 81108,
  network_fee: 81109,

  dex_da: 90000,
  dex_copy_trade: 90001,

  common_log: 88888,
  app_log: 99999,
};

export default EVENTS;

export function stringifyWithBigInt(obj) {
  return JSON.stringify(obj, (_, value) =>
    typeof value === 'bigint' ? value.toString() : value
  );
}

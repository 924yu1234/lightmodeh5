/**
 * Mock data for DexAccount boot-time endpoints.
 */

const MOCK_ACCOUNT = '0xMockUEDAccount1234567890abcdef1234567890';
const MOCK_DA_OWNER = '0xMockUEDAccount1234567890abcdef1234567890_0';

// GET /order-book-api/dex/account?owner={account}
const dexAccount = {
  server_time: Date.now(),
  owner: MOCK_ACCOUNT,
  id: 10001,
  key_nonce: 1,
  asset_nonce: 0,
  nonce: 0,
  public_key_x: '0x0000000000000000000000000000000000000000000000000000000000000001',
  public_key_y: '0x0000000000000000000000000000000000000000000000000000000000000002',
  referrer_id: 0,
  owner_referral_code: 'MOCK_UED',
  updating: false,
  is_black: false,
  features: {},
  create_time: Math.floor(Date.now() / 1000) - 86400 * 30, // 30 days ago
};

// GET /order-book-api/intent/account?l0_address={account}
const intentAccount = {
  owner: MOCK_DA_OWNER,
  owner_referral_code: 'MOCK_UED',
};

// GET /order-book-api/intent/daAddress
const daAddress = {
  key_nonce_when_addr_generate: 1,
  addresses: [
    {
      chain_name: 'BASE',
      chain_addresses_info: [
        {
          address: '0xMockBaseAddress1234567890',
          public_key: '0xMockBasePubKey',
          address_path: "m/44'/60'/0'/0/0",
        },
      ],
    },
    {
      chain_name: 'SOLANA',
      chain_addresses_info: [
        {
          address: 'MockSolAddress1234567890abcdefgh',
          public_key: 'MockSolPubKey1234',
          address_path: "m/44'/501'/0'/0'",
        },
      ],
    },
  ],
  features: {},
  referral_code: 'MOCK_UED',
  is_in_whitelist: false,
};

export const mockDexAccountData = {
  dexAccount,
  intentAccount,
  daAddress,
};

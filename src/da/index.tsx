// import { createTonKeyPair } from './ton';

import { DEX_CHAIN_ID } from 'src/constants/dex';
import { CommonToken } from 'src/constants/interface';

export const FUNGIBLE_USDC_ID = -1111;
export const ICON_CDN =
  DEX_CHAIN_ID === 1
    ? 'https://v1-mainnet-cdn.degate.com'
    : 'https://dev-new-cdn.degate.com';

export const FUNGIBLE_USDC_CHAINS = [
  'SOLANA',
  'BASE',
  'ARBITRUM',
  'OPTIMISM',
  'POLYGON',
  'AVALANCHE',
];

export const ALL_DAChains = [
  'DGWallet',
  'ETHEREUM',
  'SOLANA',
  'BASE',
  'BSC',
  'ARBITRUM',
  'OPTIMISM',
  'AVALANCHE',
  'POLYGON',
  'SUI',
  'APTOS',
  'WORLDCHAIN',
  'BITCOIN',
] as const;

export const SUPPORTED_DAChains: Type_DAChains[] = [
  'SOLANA',
  'BASE',
  'ARBITRUM',
  'OPTIMISM',
  'POLYGON',
  'AVALANCHE',
  'BSC',
  'SUI',
  'APTOS',
  'BITCOIN',
];

export type Type_DAChains = typeof ALL_DAChains[number];

export const EVMSupportedType_DAChains = [
  'ETHEREUM',
  'BSC',
  'BASE',
  'ARBITRUM',
  'OPTIMISM',
  'AVALANCHE',
  'POLYGON',
];

export const Type_EARN_PROTOCOLS = ['Morpho', 'Kamino'];
export type Type_EARN_PROTOCOLS = typeof Type_EARN_PROTOCOLS[number];

export const Default_Claim_Token: Record<Type_EARN_PROTOCOLS, CommonToken> = {
  Kamino: {
    id: -1,
    decimals: 9,
    chain: 'SOLANA',
    code: 'jtojtomepa8beP8AuQc6eXt5FriJwfFMwQx2v2f9mCL',
    symbol: 'JTO',
    name: 'JITO',
    icon: 'https://v1-mainnet-cdn.degate.com/tokens/SOLANA/jtojtomepa8beP8AuQc6eXt5FriJwfFMwQx2v2f9mCL.png',
  },
  Morpho: {
    id: -1,
    chain: 'BASE',
    code: '0xBAa5CC21fd487B8Fcc2F632f3F4E8D37262a0842',
    symbol: 'MORPHO',
    name: 'Morpho Token',
    icon: 'https://v1-mainnet-cdn.degate.com/tokens/BASE/0xbaa5cc21fd487b8fcc2f632f3f4e8d37262a0842.png',
    decimals: 18,
  },
};

export const TOKEN_SOL_CODE = 'So11111111111111111111111111111111111111112';
export const TOKEN_SOL_ICON =
  'https://v1-mainnet-cdn.degate.com/tokens/SOLANA/So11111111111111111111111111111111111111112.png';

// 0.00089088
export const SOL_BALANCE_LIMIT = 0.001;

// DEG-14167 0.00303928
// 【需求】sell max sol时，前端扣掉0.00303928 SOL，如果用户自己填入更大的值，前端就提示余额不足
export const SOL_BALANCE_LIMIT_AFTER_SELL = 0.00303928;

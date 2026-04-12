import network_eth from 'imgs/chain_eth.svg';

export const FaucetUrl = {
  4: 'https://docs.degate.com/testnet/get-free-testnet-token-on-rinkeby',
  5: 'https://docs.degate.com/testnet/degate-testnet-get-free-testnet-tokens-on-goerli',
};

export const ChainId = {
  BTC: 'BTC',
  DeGate: 'DeGate',
  Mainnet: 1,
  Goerli: 5,
  Holesky: 17000,
  Polygon: 137,
  Polygon_Amoy: 80002,
  Optimism: 10,
  Optimism_Sepolia: 11155420,
  Arbitrum: 42161,
  Arbitrum_Sepolia: 421614,
  SOLANA: 'SOLANA',
  ETH: 'ETH',
  BASE: 'BASE',
  BSC: 'BSC',
  TON: 'TON',
  BERA: 'BERA',
};

export const networks = {
  [ChainId.BTC]: {
    chainId: ChainId.BTC,
    name: 'Bitcoin',
    icon: network_eth,
    rpc: window._wallet_config?.NODE_RPC,
    explorer: 'https://btcscan.org/',
  },
  [ChainId.Mainnet]: {
    chainId: ChainId.Mainnet,
    name: 'Mainnet',
    icon: network_eth,
    rpc: window._wallet_config?.NODE_RPC,
    explorer: 'https://etherscan.io',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  },
  [ChainId.ETH]: {
    chainId: ChainId.Mainnet,
    name: 'Mainnet',
    icon: network_eth,
    rpc: window._wallet_config?.NODE_RPC,
    explorer: 'https://etherscan.io',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  },
  [ChainId.Goerli]: {
    chainId: ChainId.Goerli,
    name: 'Goerli',
    icon: network_eth,
    rpc: window._wallet_config?.NODE_RPC,
    explorer: 'https://goerli.etherscan.io',
    nativeCurrency: { name: 'Görli Ether', symbol: 'görETH', decimals: 18 },
  },
  [ChainId.Holesky]: {
    chainId: ChainId.Holesky,
    name: 'Holesky',
    icon: network_eth,
    rpc: window._wallet_config?.NODE_RPC,
    explorer: 'https://holesky.etherscan.io',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  },
  [ChainId.Polygon]: {
    chainId: ChainId.Polygon,
    name: 'Polygon',
    explorer: 'https://polygonscan.com',
  },
  [ChainId.Polygon_Amoy]: {
    chainId: ChainId.Polygon_Amoy,
    name: 'Polygon (Matic) Amoy',
    explorer: 'https://www.oklink.com/amoy',
  },
  [ChainId.Optimism]: {
    chainId: ChainId.Optimism,
    name: 'Optimism',
    explorer: 'https://optimistic.etherscan.io',
  },
  [ChainId.Optimism_Sepolia]: {
    chainId: ChainId.Optimism_Sepolia,
    name: 'Optimism Sepolia',
    explorer: 'https://optimism-sepolia.blockscout.com',
  },
  [ChainId.Arbitrum]: {
    chainId: ChainId.Arbitrum,
    name: 'Arbitrum One',
    explorer: 'https://arbiscan.io',
  },
  [ChainId.Arbitrum_Sepolia]: {
    chainId: ChainId.Arbitrum_Sepolia,
    name: 'Arbitrum Sepolia',
    explorer: 'https://sepolia.arbiscan.io',
  },
  [ChainId.SOLANA]: {
    id: ChainId.SOLANA,
    name: 'Solana',
    explorer: 'https://solscan.io/',
  },
  [ChainId.BASE]: {
    id: ChainId.BASE,
    name: 'Base',
    explorer: 'https://basescan.org/',
  },
  [ChainId.BSC]: {
    id: ChainId.BSC,
    name: 'BSC',
    explorer: 'https://bscscan.com/',
  },
  [ChainId.TON]: {
    id: ChainId.TON,
    name: 'TON',
    explorer: 'https://tonscan.org/',
  },
  [ChainId.BERA]: {
    id: ChainId.BERA,
    name: 'BERA',
    explorer: 'https://berascan.com/',
  },
};
export const network_urls = Object.keys(networks).reduce((re, k) => {
  re[k] = networks[k].rpc;
  return re;
}, {});

export const ScanMap = {
  1: 'Etherscan',
  17000: 'Etherscan',
  42161: 'Arbiscan',
  421614: 'Arbiscan',
  10: 'Opscan',
  11155420: 'Opscan',

  SOLANA: 'Solscan',
  BSC: 'BscScan',
  BASE: 'BaseScan',
  TON: 'TonScan',
  BERA: 'BeraScan',
};

const nameMap = {};

export const ChainName = {
  1: 'Ethereum',
  17000: 'Ethereum',
  0: 'DeGate L2',
  42: 'Kovan',
  42161: 'Arbitrum One',
  421614: 'Arbitrum One',
  10: 'Optimism',
  11155420: 'Optimism',

  SOLANA: 'Solana',
  BSC: 'BSC',
  BASE: 'Base',
  TON: 'TON',
  BERA: 'BERA',
  ...nameMap,
};

export const ChainIdAndNameMap = {
  1: 'ETHEREUM',
  17000: 'ETHEREUM',
  0: 'DEGATE',
  42: 'KOVAN',
  42161: 'ARBITRUM',
  421614: 'ARBITRUM',
  10: 'OPTIMISM',
  11155420: 'OPTIMISM',
};

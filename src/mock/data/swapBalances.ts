/**
 * Mock swap balance data.
 */

// GET /order-book-api/intent/user/balancesV2
const balancesV2 = {
  balances: [
    {
      rank: 1,
      available: '5000000000', // 5000 USDC (6 decimals)
      token: {
        token_id: 2,
        symbol: 'USDC',
        decimals: 6,
        icon: 'https://mainnet-cdn.degate.com/token/USDC.png',
        code: 'USDC',
        chain: 'BASE',
        name: 'USD Coin',
        is_whitelist: true,
      },
    },
    {
      rank: 2,
      available: '1500000000000000000', // 1.5 ETH (18 decimals)
      token: {
        token_id: 1,
        symbol: 'ETH',
        decimals: 18,
        icon: 'https://mainnet-cdn.degate.com/token/ETH.png',
        code: 'ETH',
        chain: 'BASE',
        name: 'Ethereum',
        is_whitelist: true,
      },
    },
    {
      rank: 3,
      available: '25000000000', // 25 SOL (9 decimals)
      token: {
        token_id: 3,
        symbol: 'SOL',
        decimals: 9,
        icon: 'https://mainnet-cdn.degate.com/token/SOL.png',
        code: 'SOL',
        chain: 'SOLANA',
        name: 'Solana',
        is_whitelist: true,
      },
    },
    {
      rank: 4,
      available: '5000000', // 0.05 BTC (8 decimals)
      token: {
        token_id: 5,
        symbol: 'BTC',
        decimals: 8,
        icon: 'https://mainnet-cdn.degate.com/token/BTC.png',
        code: 'WBTC',
        chain: 'BASE',
        name: 'Bitcoin',
        is_whitelist: true,
      },
    },
    {
      rank: 5,
      available: '100000000000000000000000', // 100,000 DG (18 decimals)
      token: {
        token_id: 6,
        symbol: 'DG',
        decimals: 18,
        icon: 'https://mainnet-cdn.degate.com/token/DG.png',
        code: 'DG',
        chain: 'BASE',
        name: 'DeGate',
        is_whitelist: true,
      },
    },
  ],
  failed_chains: [],
};

// GET /order-book-api/intent/user/balanceUpdates
const balanceUpdates: any[] = [];

export const mockSwapBalancesData = {
  balancesV2,
  balanceUpdates,
};

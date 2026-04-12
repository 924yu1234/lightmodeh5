export const investmentsData = [
  {
    id: 1,
    type: 'Stablecoin',
    name: {
      en: 'High-Yield USDT Lending by Gauntlet',
      zh: '高收益USDT理财',
    },
    assets: { name: 'USDT', icon: 'assets/usdt_icon.png' },
    network: { chain: 'Polygon', icon: 'networks/polygon_icon.png' },
    protocols: [
      { name: 'Morpho', icon: 'protocols/morpho.png', type: 'green' },
      { name: 'Compound', icon: 'protocols/compound.png', type: 'blue' },
      { name: 'Gauntlet', icon: 'protocols/gauntlet.png', type: 'orange' },
    ],
    difficulty: 1,
    status: {
      key: 'in_progress',
    },
    apy: '9.01%',
    hide: false,
    tutorial: {
      en: 'tutorials/en/polygon-compound-usdt-tutorial.md',
      zh: 'tutorials/zh/polygon-compound-usdt-tutorial.md',
    },
  },
  {
    id: 2,
    type: 'Stablecoin',
    name: {
      en: 'High-Yield USDC Lending by Gauntlet',
      zh: '高收益USDC理财',
    },
    assets: { name: 'USDC', icon: 'assets/usdc_icon.png' },
    network: { chain: 'Polygon', icon: 'networks/polygon_icon.png' },
    protocols: [
      { name: 'Morpho', icon: 'protocols/morpho.png', type: 'green' },
      { name: 'Compound', icon: 'protocols/compound.png', type: 'blue' },
      { name: 'Gauntlet', icon: 'protocols/gauntlet.png', type: 'orange' },
    ],
    difficulty: 1,
    status: {
      key: 'in_progress',
    },
    apy: '7.95%',
    hide: false,
    tutorial: {
      en: 'tutorials/en/polygon-compound-usdc-tutorial.md',
      zh: 'tutorials/zh/polygon-compound-usdc-tutorial.md',
    },
  },
  {
    id: 3,
    type: 'Lending',
    name: {
      en: 'High-Yield ETH Lending by Morpho',
      zh: '高收益ETH本位理财',
    },
    assets: { name: 'ETH', icon: 'assets/eth_icon.png' },
    network: { chain: 'Worldchain', icon: 'networks/worldchain_icon.png' },
    protocols: [
      { name: 'Morpho', icon: 'protocols/morpho.png', type: 'green' },
      { name: 'Merkle', icon: 'protocols/merkle_icon.png', type: 'blue' },
    ],
    difficulty: 2,
    status: {
      key: 'in_progress',
    },
    apy: '7%+',
    hide: true,
    tutorial: {
      en: 'tutorials/en/worldchain-morpho-eth-tutorial.md',
      zh: 'tutorials/zh/worldchain-morpho-eth-tutorial.md',
    },
  },
  {
    id: 4,
    type: 'LST',
    name: {
      en: 'APT Low-risk High-interest Staking',
      zh: 'APT 低风险高收益质押',
    },
    assets: { name: 'APT', icon: 'assets/apt_icon.png' },
    network: { chain: 'Aptos', icon: 'networks/aptos_icon.png' },
    protocols: [{ name: 'Amnis', icon: 'protocols/amnis.png', type: 'blue' }],
    difficulty: 2,
    status: {
      key: 'in_progress',
    },
    apy: '7.14%',
    hide: false,
    tutorial: {
      en: 'tutorials/en/aptos-amnis-apt-tutorial.md',
      zh: 'tutorials/zh/aptos-amnis-apt-tutorial.md',
    },
  },
  {
    id: 5,
    type: 'Lending',
    name: {
      en: 'SOL High APY Lending Strategy',
      zh: 'SOL 高收益借贷策略',
    },
    assets: { name: 'SOL', icon: 'assets/sol_icon.png' },
    network: { chain: 'Solana', icon: 'networks/solana_icon.png' },
    protocols: [
      { name: 'Kamino', icon: 'protocols/kamino.png', type: 'blue' },
      { name: 'Allez', icon: 'protocols/allez.png', type: 'orange' },
    ],
    difficulty: 2,
    status: {
      key: 'in_progress',
    },
    apy: '7.67%',
    hide: false,
    tutorial: {
      en: 'tutorials/en/solana-kamino-sol-tutorial.md',
      zh: 'tutorials/zh/solana-kamino-sol-tutorial.md',
    },
  },
  {
    id: 6,
    type: 'Staking',
    name: {
      en: 'Stake STETH Mint AO',
      zh: '质押 STETH 铸造 AO',
    },
    assets: { name: 'STETH', icon: 'assets/steth_icon.png' },
    network: { chain: 'Ethereum', icon: 'networks/ethereum_icon.png' },
    protocols: [
      { name: 'Lido', icon: 'protocols/lido.png', type: 'blue' },
      { name: 'AO Network', icon: 'protocols/aonetwork.png', type: 'green' },
    ],
    difficulty: 3,
    status: {
      key: 'in_progress',
    },
    apy: '8%+',
    hide: true,
    tutorial: {
      en: 'tutorials/en/ethereum-steth-ao-tutorial.md',
      zh: 'tutorials/zh/ethereum-steth-ao-tutorial.md',
    },
  },
  {
    id: 7,
    type: 'Stablecoin',
    name: {
      en: 'High-Yield USDC Vault by Alphaping',
      zh: 'Alphaping 高收益 USDC 理财',
    },
    assets: { name: 'USDC', icon: 'assets/usdc_icon.png' },
    network: { chain: 'Ethereum', icon: 'networks/ethereum_icon.png' },
    protocols: [
      { name: 'Morpho', icon: 'protocols/morpho.png', type: 'green' },
      { name: 'Alphaping', icon: 'protocols/alphaping.svg', type: 'blue' },
    ],
    difficulty: 1,
    status: {
      key: 'in_progress',
    },
    apy: '15.41%',
    hide: false,
    tutorial: {
      en: 'tutorials/en/ethereum-morpho-alphaping-usdc-tutorial.md',
      zh: 'tutorials/zh/ethereum-morpho-alphaping-usdc-tutorial.md',
    },
  },
  {
    id: 8,
    type: 'Stablecoin',
    name: {
      en: 'High-Yield USDC Vault by Relend',
      zh: 'Relend 高收益 USDC 理财',
    },
    assets: { name: 'USDC', icon: 'assets/usdc_icon.png' },
    network: { chain: 'Ethereum', icon: 'networks/ethereum_icon.png' },
    protocols: [
      { name: 'Morpho', icon: 'protocols/morpho.png', type: 'green' },
      { name: 'Relend', icon: 'protocols/relend.png', type: 'blue' },
    ],
    difficulty: 1,
    status: {
      key: 'in_progress',
    },
    apy: '10.01%',
    hide: false,
    tutorial: {
      en: 'tutorials/en/ethereum-morpho-relend-usdc-tutorial.md',
      zh: 'tutorials/zh/ethereum-morpho-relend-usdc-tutorial.md',
    },
  },
  {
    id: 9,
    type: 'Stablecoin',
    name: {
      en: 'High-Yield USDC Vault by Steakhouse',
      zh: 'Smokehouse 高收益 USDC 理财',
    },
    assets: { name: 'USDC', icon: 'assets/usdc_icon.png' },
    network: { chain: 'Ethereum', icon: 'networks/ethereum_icon.png' },
    protocols: [
      { name: 'Morpho', icon: 'protocols/morpho.png', type: 'green' },
      { name: 'Steakhouse', icon: 'protocols/Steakhouse.svg', type: 'orange' },
    ],
    difficulty: 1,
    status: {
      key: 'in_progress',
    },
    apy: '9.83%',
    hide: false,
    tutorial: {
      en: 'tutorials/en/ethereum-morpho-steakhouse-usdc-tutorial.md',
      zh: 'tutorials/zh/ethereum-morpho-steakhouse-usdc-tutorial.md',
    },
  },
  {
    id: 10,
    type: 'Stablecoin',
    name: {
      en: 'High-Yield USDC Vault by Hyperithm',
      zh: 'Hyperithm 高收益 USDC 理财',
    },
    assets: { name: 'USDC', icon: 'assets/usdc_icon.png' },
    network: { chain: 'Ethereum', icon: 'networks/ethereum_icon.png' },
    protocols: [
      { name: 'Morpho', icon: 'protocols/morpho.png', type: 'green' },
      { name: 'Hyperithm', icon: 'protocols/hyperithm.svg', type: 'blue' },
    ],
    difficulty: 1,
    status: {
      key: 'in_progress',
    },
    apy: '11.85%',
    hide: false,
    tutorial: {
      en: 'tutorials/en/ethereum-morpho-hyperithm-usdc-tutorial.md',
      zh: 'tutorials/zh/ethereum-morpho-hyperithm-usdc-tutorial.md',
    },
  },
  {
    id: 11,
    type: 'Stablecoin',
    name: {
      en: 'OEV-Boosted High-Yield USDC by Yearn',
      zh: 'Yearn OEV增强型高收益USDC理财',
    },
    assets: { name: 'USDC', icon: 'assets/usdc_icon.png' },
    network: { chain: 'Ethereum', icon: 'networks/ethereum_icon.png' },
    protocols: [
      { name: 'Morpho', icon: 'protocols/morpho.png', type: 'green' },
      { name: 'Yearn', icon: 'protocols/yearn.svg', type: 'blue' },
    ],
    difficulty: 1,
    status: {
      key: 'in_progress',
    },
    apy: '10.27%',
    hide: false,
    tutorial: {
      en: 'tutorials/en/ethereum-morpho-yearn-usdc-tutorial.md',
      zh: 'tutorials/zh/ethereum-morpho-yearn-usdc-tutorial.md',
    },
  },
  {
    id: 12,
    type: 'Stablecoin',
    name: {
      en: 'Smokehouse High-Yield USDT by Steakhouse',
      zh: 'Steakhouse Smokehouse高收益USDT理财',
    },
    assets: { name: 'USDT', icon: 'assets/usdt_icon.png' },
    network: { chain: 'Ethereum', icon: 'networks/ethereum_icon.png' },
    protocols: [
      { name: 'Morpho', icon: 'protocols/morpho.png', type: 'green' },
      { name: 'Steakhouse', icon: 'protocols/Steakhouse.svg', type: 'orange' },
    ],
    difficulty: 1,
    status: {
      key: 'in_progress',
    },
    apy: '9.30%',
    hide: false,
    tutorial: {
      en: 'tutorials/en/ethereum-morpho-steakhouse-usdt-tutorial.md',
      zh: 'tutorials/zh/ethereum-morpho-steakhouse-usdt-tutorial.md',
    },
  },
  {
    id: 13,
    type: 'Liquidity',
    name: {
      en: 'TSLAx/USDC Liquidity Provision Yield on Raydium',
      zh: 'Raydium TSLAx/USDC 流动性挖矿收益',
    },
    assets: { name: 'TSLAx', icon: 'assets/tslax_icon.png' },
    network: { chain: 'Solana', icon: 'networks/solana_icon.png' },
    protocols: [
      { name: 'Raydium', icon: 'protocols/raydium.png', type: 'blue' },
      { name: 'xStocks', icon: 'protocols/xstocks.png', type: 'green' },
    ],
    difficulty: 3,
    status: {
      key: 'in_progress',
    },
    apy: '50%+',
    hide: false,
    tutorial: {
      en: 'tutorials/en/solana-raydium-tslax-lp-tutorial.md',
      zh: 'tutorials/zh/solana-raydium-tslax-lp-tutorial.md',
    },
  },
  {
    id: 14,
    type: 'Stablecoin',
    name: {
      en: 'OpenEden High-Yield USDC by Ouroboros',
      zh: 'OpenEden 高收益 USDC 理财',
    },
    assets: { name: 'USDC', icon: 'assets/usdc_icon.png' },
    network: { chain: 'Ethereum', icon: 'networks/ethereum_icon.png' },
    protocols: [
      { name: 'Morpho', icon: 'protocols/morpho.png', type: 'green' },
      { name: 'OpenEden', icon: 'protocols/openeden.jpg', type: 'blue' },
      { name: 'Ouroboros', icon: 'protocols/ouroboros.svg', type: 'orange' },
    ],
    difficulty: 1,
    status: {
      key: 'in_progress',
    },
    apy: '6.57%',
    hide: false,
    url: 'https://app.morpho.org/ethereum/vault/0x2F21c6499fa53a680120e654a27640Fc8Aa40BeD/openeden-usdc-vault',
  },
  {
    id: 15,
    type: 'Liquidity',
    name: {
      en: 'AMZNx/USDC Liquidity Provision Yield on Raydium',
      zh: 'Raydium AMZNx/USDC 流动性挖矿收益',
    },
    assets: { name: 'AMZNx', icon: 'assets/amznx_icon.png' },
    network: { chain: 'Solana', icon: 'networks/solana_icon.png' },
    protocols: [
      { name: 'Raydium', icon: 'protocols/raydium.png', type: 'blue' },
      { name: 'xStocks', icon: 'protocols/xstocks.png', type: 'green' },
    ],
    difficulty: 3,
    status: {
      key: 'in_progress',
    },
    apy: '25%+',
    hide: true,
    tutorial: {
      en: 'tutorials/en/solana-raydium-amznx-lp-tutorial.md',
      zh: 'tutorials/zh/solana-raydium-amznx-lp-tutorial.md',
    },
  },
  {
    id: 16,
    type: 'Liquidity',
    name: {
      en: 'APPLx/USDC Liquidity Provision Yield on Raydium',
      zh: 'Raydium APPLx/USDC 流动性挖矿收益',
    },
    assets: { name: 'APPLx', icon: 'assets/applx_icon.png' },
    network: { chain: 'Solana', icon: 'networks/solana_icon.png' },
    protocols: [
      { name: 'Raydium', icon: 'protocols/raydium.png', type: 'blue' },
      { name: 'xStocks', icon: 'protocols/xstocks.png', type: 'green' },
    ],
    difficulty: 3,
    status: {
      key: 'in_progress',
    },
    apy: '15%+',
    hide: true,
    tutorial: {
      en: 'tutorials/en/solana-raydium-applx-lp-tutorial.md',
      zh: 'tutorials/zh/solana-raydium-applx-lp-tutorial.md',
    },
  },
  {
    id: 17,
    type: 'Liquidity',
    name: {
      en: 'CRCLx/USDC Liquidity Provision Yield on Raydium',
      zh: 'Raydium CRCLx/USDC 流动性挖矿收益',
    },
    assets: { name: 'CRCLx', icon: 'assets/crclx_icon.png' },
    network: { chain: 'Solana', icon: 'networks/solana_icon.png' },
    protocols: [
      { name: 'Raydium', icon: 'protocols/raydium.png', type: 'blue' },
      { name: 'xStocks', icon: 'protocols/xstocks.png', type: 'green' },
    ],
    difficulty: 3,
    status: {
      key: 'in_progress',
    },
    apy: '100%+',
    hide: false,
    tutorial: {
      en: 'tutorials/en/solana-raydium-crclx-lp-tutorial.md',
      zh: 'tutorials/zh/solana-raydium-crclx-lp-tutorial.md',
    },
  },
  {
    id: 18,
    type: 'Liquidity',
    name: {
      en: 'MSTRx/USDC Liquidity Provision Yield on Raydium',
      zh: 'Raydium MSTRx/USDC 流动性挖矿收益',
    },
    assets: { name: 'MSTRx', icon: 'assets/mstrx_icon.png' },
    network: { chain: 'Solana', icon: 'networks/solana_icon.png' },
    protocols: [
      { name: 'Raydium', icon: 'protocols/raydium.png', type: 'blue' },
      { name: 'xStocks', icon: 'protocols/xstocks.png', type: 'green' },
    ],
    difficulty: 3,
    status: {
      key: 'in_progress',
    },
    apy: '60%+',
    hide: false,
    tutorial: {
      en: 'tutorials/en/solana-raydium-mstrx-lp-tutorial.md',
      zh: 'tutorials/zh/solana-raydium-mstrx-lp-tutorial.md',
    },
  },
  {
    id: 19,
    type: 'Liquidity',
    name: {
      en: 'GOOGLx/USDC Liquidity Provision Yield on Raydium',
      zh: 'Raydium GOOGLx/USDC 流动性挖矿收益',
    },
    assets: { name: 'GOOGLx', icon: 'assets/googlx_icon.png' },
    network: { chain: 'Solana', icon: 'networks/solana_icon.png' },
    protocols: [
      { name: 'Raydium', icon: 'protocols/raydium.png', type: 'blue' },
      { name: 'xStocks', icon: 'protocols/xstocks.png', type: 'green' },
    ],
    difficulty: 3,
    status: {
      key: 'in_progress',
    },
    apy: '25%+',
    hide: true,
    tutorial: {
      en: 'tutorials/en/solana-raydium-googlx-lp-tutorial.md',
      zh: 'tutorials/zh/solana-raydium-googlx-lp-tutorial.md',
    },
  },
  {
    id: 20,
    type: 'Liquidity',
    name: {
      en: 'NVDAx/USDC Liquidity Provision Yield on Raydium',
      zh: 'Raydium NVDAx/USDC 流动性挖矿收益',
    },
    assets: { name: 'NVDAx', icon: 'assets/nvdax_icon.png' },
    network: { chain: 'Solana', icon: 'networks/solana_icon.png' },
    protocols: [
      { name: 'Raydium', icon: 'protocols/raydium.png', type: 'blue' },
      { name: 'xStocks', icon: 'protocols/xstocks.png', type: 'green' },
    ],
    difficulty: 3,
    status: {
      key: 'in_progress',
    },
    apy: '15%+',
    hide: true,
    tutorial: {
      en: 'tutorials/en/solana-raydium-nvdax-lp-tutorial.md',
      zh: 'tutorials/zh/solana-raydium-nvdax-lp-tutorial.md',
    },
  },
  {
    id: 21,
    type: 'Liquidity',
    name: {
      en: 'QQQx/USDC Liquidity Provision Yield on Raydium',
      zh: 'Raydium QQQx/USDC 流动性挖矿收益',
    },
    assets: { name: 'QQQx', icon: 'assets/qqqx_icon.png' },
    network: { chain: 'Solana', icon: 'networks/solana_icon.png' },
    protocols: [
      { name: 'Raydium', icon: 'protocols/raydium.png', type: 'blue' },
      { name: 'xStocks', icon: 'protocols/xstocks.png', type: 'green' },
    ],
    difficulty: 3,
    status: {
      key: 'in_progress',
    },
    apy: '22%+',
    hide: true,
    tutorial: {
      en: 'tutorials/en/solana-raydium-qqqx-lp-tutorial.md',
      zh: 'tutorials/zh/solana-raydium-qqqx-lp-tutorial.md',
    },
  },
  {
    id: 22,
    type: 'Liquidity',
    name: {
      en: 'SPYx/USDC Liquidity Provision Yield on Raydium',
      zh: 'Raydium SPYx/USDC 流动性挖矿收益',
    },
    assets: { name: 'SPYx', icon: 'assets/spyx_icon.png' },
    network: { chain: 'Solana', icon: 'networks/solana_icon.png' },
    protocols: [
      { name: 'Raydium', icon: 'protocols/raydium.png', type: 'blue' },
      { name: 'xStocks', icon: 'protocols/xstocks.png', type: 'green' },
    ],
    difficulty: 3,
    status: {
      key: 'in_progress',
    },
    apy: '18%+',
    hide: true,
    tutorial: {
      en: 'tutorials/en/solana-raydium-spyx-lp-tutorial.md',
      zh: 'tutorials/zh/solana-raydium-spyx-lp-tutorial.md',
    },
  },
  {
    id: 23,
    type: 'LST',
    name: {
      en: 'pufETH/WETH Loop on Euler Finance',
      zh: 'Euler Finance pufETH/WETH 循环挖矿',
    },
    assets: { name: 'pufETH', icon: 'assets/pufeth_icon.png' },
    network: { chain: 'Ethereum', icon: 'networks/ethereum_icon.png' },
    protocols: [
      { name: 'Euler', icon: 'protocols/euler.svg', type: 'blue' },
      { name: 'Puffer', icon: 'protocols/puffer.png', type: 'green' },
    ],
    difficulty: 3,
    status: {
      key: 'in_progress',
    },
    apy: '7.35%',
    hide: false,
    tutorial: {
      en: 'tutorials/en/ethereum-euler-puffer-pufeth-tutorial.md',
      zh: 'tutorials/zh/ethereum-euler-puffer-pufeth-tutorial.md',
    },
  },
];

// 提取APY数值用于排序
function extractAPYValue(apy) {
  if (!apy) return 0;
  const match = apy.match(/[\d.]+/);
  return match ? parseFloat(match[0]) : 0;
}

// 投资产品排序函数
export function sortInvestments(investments) {
  return [...investments].sort((a, b) => {
    // 1. 隐藏的产品排在最后
    if (a.hide && !b.hide) return 1;
    if (!a.hide && b.hide) return -1;

    // 2. 有教程的优先于只有URL的
    const aHasTutorial = !!(a.tutorial && !a.url);
    const bHasTutorial = !!(b.tutorial && !b.url);
    const aOnlyURL = !!(a.url && !a.tutorial);
    const bOnlyURL = !!(b.url && !b.tutorial);

    if (aHasTutorial && bOnlyURL) return -1;
    if (aOnlyURL && bHasTutorial) return 1;

    // 3. 在同一类型内，按APY从高到低排序
    const aAPY = extractAPYValue(a.apy);
    const bAPY = extractAPYValue(b.apy);

    return bAPY - aAPY;
  });
}

// 获取排序后的投资数据
export function getSortedInvestments() {
  return sortInvestments(investmentsData);
}

import { investmentsData } from './investments';

const getStockTutorialMapping = () => {
  const mapping = {};
  investmentsData.forEach((investment) => {
    if (investment.tutorial && investment.assets && investment.assets.name) {
      // Map stock symbol (e.g., 'AMZNx', 'APPLx') to tutorial ID
      const symbol = investment.assets.name.toUpperCase();
      mapping[symbol] = investment.id;
    }
  });
  return mapping;
};

// Generate add liquidity link - redirect to tutorial if available, otherwise to Raydium
export const generateAddLiquidityLink = (item) => {
  const stockSymbol = item.baseToken?.symbol?.toUpperCase();
  const tutorialMapping = getStockTutorialMapping();

  // Check if we have a tutorial for this stock
  if (tutorialMapping[stockSymbol]) {
    const tutorialId = tutorialMapping[stockSymbol];
    return `https://hub.degate.com/tutorial-${tutorialId}?source=stocks`;
  }

  // Fallback to Raydium if no tutorial available
  return `https://raydium.io/clmm/create-position/?pool_id=${item.pool_address}`;
};

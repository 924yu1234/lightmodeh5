import { ETH as eth_4, quotes as quotes_4 } from './chain_4';
import { ETH as eth_42161, quotes as quotes_42161 } from './chain_42161';
import { ETH as eth_421611, quotes as quotes_421611 } from './chain_421611';

const quoteTokensMap = {
  4: quotes_4,
  42161: quotes_42161,
  421611: quotes_421611,
};

const ethMap = {
  4: eth_4,
  42161: eth_42161,
  421611: eth_421611,
};

export { ethMap, quoteTokensMap };

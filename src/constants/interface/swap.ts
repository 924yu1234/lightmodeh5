import { Token } from './index';

export interface SwapPair {
  pairId: number;
  baseToken: Token;
  quoteToken: Token;
  price?: string;
  price_display?: string;
  percent?: string;
  time?: number;
  market?: string;
  baseTokenId?: number;
  quoteTokenId?: number;
  volome_24h?: string;
}

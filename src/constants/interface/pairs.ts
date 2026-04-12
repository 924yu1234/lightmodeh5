import { Token } from './index';

export interface Pair {
  pairId: number;
  isStable: boolean;
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

export interface HotPair extends Pair {
  amount: string;
}

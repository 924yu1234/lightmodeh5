import { Token } from 'src/constants/interface';
import { TOKEN_SOL_CODE } from 'src/da';

export const tokenIsSol = (token?: Token) => {
  if (!token) return false;
  return (
    token?.code?.toLowerCase() === TOKEN_SOL_CODE.toLowerCase() &&
    token?.chain === 'SOLANA'
  );
};

export const tokenIsBtc = (token?: Token) => {
  if (!token) return false;
  return token?.code?.toLowerCase() === 'btc' && token?.chain === 'BITCOIN';
};

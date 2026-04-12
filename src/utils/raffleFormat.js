import digit, { isNumber } from './digit';
import { divide } from './numberUtils';

export const formatRaffleRewards = (number) => {
  if (!isNumber(number)) return '';
  if (number >= 1_000_000_000) {
    const num = digit.format(divide(number, 1_000_000_000), '0.##');
    return `${num}B`;
  }
  if (number >= 1_000_000) {
    const num = digit.format(divide(number, 1_000_000), '0.##');
    return `${num}M`;
  }
  if (number >= 100_000) {
    const num = digit.format(divide(number, 1_000), '0.##');
    return `${num}K`;
  }
  return digit.format(number, '0,0.##');
};

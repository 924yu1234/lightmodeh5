import digit, { isNumber } from 'src/utils/digit';

export function formatUsd(usd: number | string) {
  if (!isNumber(usd)) return '$--';
  if (Number(usd) > 0 && Number(usd) < 0.01) {
    return `<$0.01`;
  }
  return `$${digit.format(usd, '0.##')}`;
}

export function formatAmount(amount: number) {
  if (!isNumber(amount)) return '--';
  if (amount > 0 && amount < 0.0001) {
    return `<0.0001`;
  }
  return `${digit.format(amount, '0.####')}`;
}

import BigNumber from 'bignumber.js';

import digit from 'js/utils/digit';
import { getExponentiated, isLessThan, isNumber } from 'js/utils/numberUtils';

// remove token_id
export const createDexBalanceKey = ({ account, token }) => {
  const accountLowerCase = (account || '')?.toLowerCase();
  const codeLowerCase = (token?.code || '').toLowerCase();
  return `${accountLowerCase}-${codeLowerCase}-${token?.id}`;
};

export const formatDexBalanceKey = ({ key }) => {
  const splits = key?.split('-');
  return {
    account: splits[0],
    code: splits[1],
    id: Number(splits[2]),
  };
};

export const convertSwapBalance = ({ result }) => {
  const { token } = result ?? {};
  if (!token) return zeroResult;
  const { decimals } = token ?? {};
  const { chain_balance, order_frozen, withdraw_frozen, available_delta } =
    result;

  // balance未链上查询到的余额
  const available_delta_big = isNumber(available_delta)
    ? new BigNumber(available_delta)
    : new BigNumber(0);

  const chain_balance_big = isNumber(chain_balance)
    ? new BigNumber(chain_balance)
    : new BigNumber(0);

  const frozenOrder_big = isNumber(order_frozen)
    ? new BigNumber(order_frozen)
    : new BigNumber(0);

  const frozenWithdraw_big = isNumber(withdraw_frozen)
    ? new BigNumber(withdraw_frozen)
    : new BigNumber(0);

  const locked_big = frozenOrder_big.plus(frozenWithdraw_big);
  const available_big = chain_balance_big
    .plus(available_delta_big)
    .minus(locked_big);

  let available = available_big
    .dividedBy(getExponentiated(10, decimals))
    .toFixed();

  if (available < 0) {
    available = '0';
  }

  const locked = locked_big.dividedBy(getExponentiated(10, decimals)).toFixed();

  const frozenOrder = frozenOrder_big
    .dividedBy(getExponentiated(10, decimals))
    .toFixed();

  const frozenWithdraw = frozenWithdraw_big
    .dividedBy(getExponentiated(10, decimals))
    .toFixed();

  const availableDisplay = formatBalanceDisplay(available, decimals);

  const availableDisplay_full = digit.formatWithDecimals(available, decimals, {
    precision: '#',
    groupSeparator: true,
    floor: true,
  });

  const lockedDisplay = digit.formatWithDecimalsLess8(locked, decimals, {
    precision: '#',
    groupSeparator: true,
    floor: true,
  });

  return {
    apiData: result,
    rank: result.rank,
    available,
    available_volume: available,
    availableDisplay: available === '0' ? '0' : availableDisplay,
    availableDisplay_full: available === '0' ? '0' : availableDisplay_full,
    locked,
    lockedDisplay: locked === '0' ? '0' : lockedDisplay,
    frozenSwapping: frozenOrder,
    frozenWithdraw,
    token,
  };
};

export const zeroResult = {
  available: '0',
  available_volume: '0',
  availableNumber: 0,
  availableDisplay: '0',
  valueDisplay: '0',
  availableValueDisplay: '0',
  locked: '0',
  lockedDisplay: '0',
  frozenDeposit: '0',
  frozenSwapping: '0',
  frozenWithdraw: '0',
  total: '0',
  totalNumber: 0,
  totalDisplay: '0',
  totalValue: '0',
  totalValueDisplay: '0',
};

export const formatBalanceDisplay = (balance, decimals) => {
  const str = digit.formatWithDecimalsLess8(balance, decimals, {
    precision: '#',
    groupSeparator: true,
    floor: true,
  });
  if (str === '0' && isLessThan(0, balance)) return '<0.00000001';
  return str;
};

export const formatUsdDisplay = (usdValue) => {
  if (!isNumber(usdValue)) {
    return '$-';
  }
  if (isLessThan(usdValue, '0.01')) {
    return '<$0.01';
  }
  return `$${digit.format(usdValue, '0,0.##')}`;
};

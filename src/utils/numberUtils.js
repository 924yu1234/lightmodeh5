import BigNumber from 'bignumber.js';

import { AMOUNT_DECIMAL, MAX_ORDER_AMOUNT } from 'js/constants/dex';
import digit, { isNumber } from 'js/utils/digit';
export { isNumber };

export const getDecimals = (res) => {
  const resS = `${res}`;
  if (!resS.includes('e')) return resS.replace(/\d*./, '').length;
  if (resS.includes('e-')) {
    const splits = resS.split('e-');
    return splits[0].replace(/\d*./, '').length + Number(splits[1]);
  }
  if (resS.includes('e')) {
    const splits = resS.split('e');
    const num1 = splits[0].replace(/\d*./, '').length;
    const num2 = Number(splits[1]);
    if (num2 > num1) return 0;
    return num1 - num2;
  }
  return resS.replace(/\d*./, '').length;
};
// Scientific
export function maxEffectiveNumber(
  val,
  number,
  {
    floor = false,
    ceil = false,
    maxDecimals = 100,
    groupSeparator = false,
    precision = '#',
    minStep = '',
  } = {}
) {
  if (!isNumber(val)) return '';
  const val_big = BigNumber(val);
  let rm = BigNumber.ROUND_HALF_UP;
  if (floor) {
    rm = BigNumber.ROUND_FLOOR;
  }
  if (ceil) {
    rm = BigNumber.ROUND_CEIL;
  }
  let res = new BigNumber(val_big.toPrecision(number, rm)).toPrecision(
    number,
    rm
  );
  if (minStep) {
    res = new BigNumber(res)
      .dividedBy(minStep)
      .integerValue(rm)
      .multipliedBy(minStep)
      .toString();
    // 如果输入小于最小精度则返回最小精度
    if (isLessThan(res, minStep) && Number(res) !== 0) {
      res = minStep;
    }
  }

  const resDicimals = getDecimals(res);
  return digit.formatWithDecimals(
    res,
    resDicimals > maxDecimals ? maxDecimals : resDicimals,
    {
      groupSeparator,
      floor,
      ceil,
      precision,
    }
  );
}

// eslint-disable-next-line prefer-regex-literals
const inputRegex = RegExp(`^\\d*(?:\\\\[.])?\\d*$`);

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

export function testMaxEffectiveNumber(val, number) {
  if (val === '') return true;
  if (!isNumber(val)) return false;
  if (!inputRegex.test(escapeRegExp(val))) {
    return false;
  }
  if (maxEffectiveNumber(val, number) === BigNumber(val).toString()) {
    return true;
  }
  return '';
}

const PricePlusLimit = 10000;

// 默认5位有效数字
// 默认5位有效数字，>= 10000有效数字加1; 小于1000减1
// isStable && price < 1 有效数字减1 为4位

export function maxEffectiveNumber_price(
  val,
  number,
  {
    floor = false,
    ceil = false,
    maxDecimals = 100,
    groupSeparator = false,
    precision = '#',
    isStable = false,
  } = {}
) {
  if (!isNumber(val)) return '';
  let _number = number;
  if (isStable) {
    if (isLessThan(val, 1)) _number -= 1;
  } else if (isLessOrEqualThan(PricePlusLimit, val)) {
    _number += 1;
  } else if (isLessThan(val, PricePlusLimit) && isLessOrEqualThan(1000, val)) {
    _number = number;
  } else if (isLessThan(val, 1000)) {
    _number = number - 1;
  }
  return maxEffectiveNumber(val, _number, {
    floor,
    ceil,
    maxDecimals,
    groupSeparator,
    precision,
  });
}

export function testmaxEffectiveNumber_price(val, number) {
  if (val === '') return true;
  if (!isNumber(val)) return false;
  if (!inputRegex.test(escapeRegExp(val))) {
    return false;
  }
  if (maxEffectiveNumber_price(val, number) === BigNumber(val).toString()) {
    return true;
  }
  return '';
}

export const formatValWithTokenDecimals = ({ token, value }) => {
  if (!token) return value;
  if (!isNumber(value)) {
    return '';
  }
  return digit.formatWithDecimals(value, token?.decimals, {
    precision: '#',
    groupSeparator: false,
  });
};

export const multiply = (val1, val2, { toNumber = false } = {}) => {
  if (!isNumber(val1) || !isNumber(val2)) {
    return '';
  }
  const res = BigNumber(val1).multipliedBy(BigNumber(val2));
  if (toNumber) return res.toNumber();
  return res.toFormat({ groupSeparator: '', decimalSeparator: '.' });
};

export const divide = (val1, val2, { toNumber = false } = {}) => {
  if (!isNumber(val1) || !isNumber(val2) || Number(val2) === 0) {
    return '';
  }
  const res = BigNumber(val1).div(BigNumber(val2));
  if (toNumber) return res.toNumber();
  return res.toFormat({ groupSeparator: '', decimalSeparator: '.' });
};

export const minus = (val1, val2, { toNumber = false } = {}) => {
  if (!isNumber(val1) || !isNumber(val2)) {
    return '';
  }
  const res = BigNumber(val1).minus(BigNumber(val2));
  if (toNumber) return res.toNumber();
  return res.toFormat({ groupSeparator: '', decimalSeparator: '.' });
};

export const plus = (val1, val2, { toNumber = false } = {}) => {
  if (!isNumber(val1) || !isNumber(val2)) {
    return '';
  }
  const res = BigNumber(val1).plus(BigNumber(val2));
  if (toNumber) return res.toNumber();
  return res.toFormat({ groupSeparator: '', decimalSeparator: '.' });
};

// chainFn
export const chainFn = (operation, ...args) => {
  const options = typeof args[args.length - 1] === 'object' ? args.pop() : {};
  // 使用reduce方法累积执行operation
  const result = args.reduce((acc, val) => {
    return operation(acc, val, { toNumber: true });
  }, args.shift()); // 初始化累积值为第一个参数，并从args中移除

  // 根据toNumber选项返回结果
  if (options.toNumber) {
    return parseFloat(result);
  }
  return result; // 直接返回字符串结果
};

window.chainFn = chainFn;
window.plus = plus;

export const isLessThan = (val1, val2) => {
  if (!isNumber(val1) || !isNumber(val2)) {
    return false;
  }
  return BigNumber(val1).isLessThan(BigNumber(val2));
};

export const isLessOrEqualThan = (val1, val2) => {
  if (!isNumber(val1) || !isNumber(val2)) {
    return false;
  }
  return BigNumber(val1).isLessThanOrEqualTo(BigNumber(val2));
};

export const isEqual = (val1, val2) => {
  if (val1 === val2) return true;
  if (!isNumber(val1) || !isNumber(val2)) {
    return false;
  }
  return BigNumber(val1).isEqualTo(BigNumber(val2));
};

export const isGreaterThan0 = (val1) => {
  if (!isNumber(val1)) {
    return false;
  }
  return BigNumber(val1).isGreaterThan(0);
};

export const maxAmount = (num, decimals, max = MAX_ORDER_AMOUNT) => {
  if (!isNumber(num)) return '0';
  if (
    new BigNumber(num)
      .multipliedBy(getExponentiated(10, decimals))
      .isLessThanOrEqualTo(max)
  ) {
    return num;
  }
  return new BigNumber(max)
    .dividedBy(getExponentiated(10, decimals))
    .toString();
};

export const checkMaxAmount = (num, decimals, max = MAX_ORDER_AMOUNT) => {
  if (!isNumber(num) || !isNumber(decimals)) return { valid: true, num };
  if (
    new BigNumber(num)
      .multipliedBy(getExponentiated(10, decimals))
      .isLessThanOrEqualTo(max)
  ) {
    return { valid: true, num };
  }
  return {
    valid: false,
    num: new BigNumber(max)
      .dividedBy(getExponentiated(10, decimals))
      .toString(),
  };
};

// 右移7位后进一位数字 1200000 >> 7 = 0.12 取整到 1；200000 >> 7 = 0.02 取整到 0.1
export const getTotalVolByRight7AndCeil = (total) => {
  if (!isNumber(total)) return '0';
  const res = new BigNumber(total)
    .dividedBy(10 ** 6)
    .toPrecision(1, BigNumber.ROUND_FLOOR)
    .replace(/[1-9]/, 1);
  return new BigNumber(res).toString();
};

export const min = (vals) => {
  let res = vals[0];
  vals.forEach((v) => {
    res = isLessThan(res, v) ? res : v;
  });
  return res;
};

export const max = (vals) => {
  let res = vals[0];
  vals.forEach((v) => {
    res = isLessThan(res, v) ? v : res;
  });
  return res;
};

export const calcMinAmountByDecimals = (decimals) => {
  const mins = 0 - decimals;
  return new BigNumber(getExponentiated(10, mins)).toString();
};

export const enterNumberCheck = (value) => {
  return value
    .replace(',', '.')
    .replace(/[^\d.]/g, '')
    .replace(/\.{2,}/g, '.')
    .replace('.', '$#$')
    .replace(/\./g, '')
    .replace('$#$', '.');
};
export const checkGapPercent = (num1, num2, gap = 0.0001) => {
  let _gap = 0;
  if (isLessThan(num1, num2)) {
    _gap = minus(1, divide(num1, num2));
  } else {
    _gap = minus(1, divide(num2, num1));
  }
  return { valid: isLessThan(_gap, gap), gap: _gap };
};

// 123.000 => (/100000) 0.00123 => 0.001
// 12345.0 => 0.12345 (/100000) => 0.1
export const getMinEffectiveNumberForAmount = (amount) => {
  if (!isNumber(amount)) return '0';
  const res = new BigNumber(amount)
    .dividedBy(10 ** (AMOUNT_DECIMAL - 1))
    .toPrecision(1, BigNumber.ROUND_FLOOR)
    .replace(/[1-9]/, 1);
  return new BigNumber(res).toString();
};

export const getMinEffectiveNumberForPrice = (
  price,
  { isStable = false } = {}
) => {
  if (!isNumber(price)) return '0';
  let _number = 5;
  if (isStable) {
    if (isLessThan(price, 1)) _number -= 1;
  } else if (isLessOrEqualThan(PricePlusLimit, price)) {
    _number += 1;
  } else if (
    isLessThan(price, PricePlusLimit) &&
    isLessOrEqualThan(1000, price)
  ) {
    _number = 5;
  } else if (isLessThan(price, 1000)) {
    _number = 4;
  }
  const res = new BigNumber(price)
    .dividedBy(10 ** (_number - 1))
    .toPrecision(1, BigNumber.ROUND_FLOOR)
    .replace(/[1-9]/, 1);
  return new BigNumber(res).toString();
};

BigNumber.config({ DECIMAL_PLACES: 100 });

export const getExponentiated = (num, by) => {
  if (!isNumber(num) || !isNumber(by)) return '';
  return new BigNumber(num).exponentiatedBy(by).toString();
};

export function compareVersions(version1, version2) {
  const parts1 = version1.split('.').map(Number);
  const parts2 = version2.split('.').map(Number);

  for (let i = 0; i < Math.max(parts1.length, parts2.length); i++) {
    const part1 = i < parts1.length ? parts1[i] : 0;
    const part2 = i < parts2.length ? parts2[i] : 0;

    if (part1 < part2) {
      return -1;
    }
    if (part1 > part2) {
      return 1;
    }
  }

  return 0;
}

export const DecimalsMap = {
  1: 0.1,
  2: 0.01,
  3: 0.001,
  4: 0.0001,
  5: 0.00001,
  6: 0.000001,
  7: 0.0000001,
  8: 0.00000001,
  9: 0.000000001,
  10: 0.0000000001,
  11: 0.00000000001,
  12: 0.000000000001,
  13: 0.0000000000001,
  14: 0.00000000000001,
  15: 0.000000000000001,
  16: 0.0000000000000001,
  17: 0.00000000000000001,
  18: 0.000000000000000001,
};

// 给定一个decimal计算出对应的小数，1 => 1e-1, 2 =>2e-2
export const getMinNumberForDecimal = (decimal) => {
  return DecimalsMap[decimal] || new BigNumber(10).pow(-decimal).toString();
};

// 获取一个数字的有效数字位数
export const getEffectiveSize = (amount) => {
  if (!isNumber(amount)) return 0;
  const str = Math.abs(Number(amount))
    .toString()
    .replace('.', '')
    .replace(/0*$/, '')
    .replace(/^0*/, '');
  // 计算有效数字位数，检查是否大于6
  return str.length;
};

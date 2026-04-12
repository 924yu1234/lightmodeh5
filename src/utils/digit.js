/* eslint-disable no-param-reassign */
import BigNumber from 'bignumber.js';
import { isFinite, isNaN, max } from 'lodash';

export function isNumber(value) {
  if (!`${value}`.length || `${value}` === 'null' || `${value}` === 'NaN') {
    return false;
  }
  const _value = Number(value);
  if (isNaN(_value) || !isFinite(_value)) {
    return false;
  }
  return true;
}

/*
 * 数值格式化
 *
 * @param   value           Number/String
 * @param   formatString    String
 *
 * formatString 格式:
 * `0` - 不保留小数
 * `0.0` - 保留1位小数
 * `0.00` - 保留2位小数
 * `0,000` - 千分位，不保留小数
 * `0,000.000` - 千分位，保留3位小数
 * `0,0.000` - 千分位的简写形式，保留3位小数
 * `0.###` - 最多保留3位小数，小数末尾不补0
 * `0.0%` - 使用百分比，保留1位小数
 *
 */
// 默认舍弃多余小数位取整
// options: {
//   double, floor = true
// }

const defaultFM = {
  prefix: '',
  decimalSeparator: '.',
  groupSeparator: ',',
  groupSize: 3,
  secondaryGroupSize: 0,
  fractionGroupSeparator: ' ',
  fractionGroupSize: 0,
  suffix: '',
};

function format(value, formatString, options) {
  const { floor = false, ceil = false, showPlus = false } = options || {};

  let rm = BigNumber.ROUND_HALF_UP;
  if (floor) {
    rm = BigNumber.ROUND_FLOOR;
  }
  if (ceil) {
    rm = BigNumber.ROUND_CEIL;
  }

  if (!isNumber(value)) {
    return '';
  }

  // 处理百分比格式，数值乘以100
  let suffix = '';
  if (formatString[formatString.length - 1] === '%') {
    value *= 100;
    suffix = '%';
    formatString = formatString.substr(0, formatString.length - 1);
  }

  // 处理小数精确度
  const precision =
    formatString.indexOf('.') === -1
      ? ''
      : formatString.substr(formatString.indexOf('.') + 1);

  // 添加千分位
  const decimalSeparator = formatString.indexOf(',') !== -1;
  const bigNumber = new BigNumber(value);
  let output = bigNumber.toFormat(precision.length, rm, {
    ...defaultFM,
    groupSeparator: decimalSeparator ? ',' : '',
    groupSize: 3,
    suffix: '',
  });

  if (precision.includes('#') && output.indexOf('.') > 0) {
    output = output.replace(/0+?$/, '');
    output = output.replace(/\.$/, '');
  }

  const plusStr = showPlus && bigNumber.isGreaterThanOrEqualTo(0) ? '+' : '';

  return `${plusStr}${output}${suffix}`;
}

// defalut Math.floor

const formatWithDecimals = (str, decimals, options = {}) => {
  const { precision = '#', groupSeparator = false, ...rest } = options;
  if (!isNumber(decimals)) return str;
  let digitStr = `0.${new Array(decimals + 1).join(precision)}`;
  if (groupSeparator) {
    digitStr = `0,${digitStr}`;
  }
  return format(str, digitStr, rest);
};

const formatWithDecimalsLess8 = (str, decimals, options = {}) => {
  return formatWithDecimals(str, decimals > 8 ? 8 : decimals, options);
};

const formatWithMaxLength8 = (str, decimals, options = {}) => {
  const newStr = `${str}`;
  const strLength = newStr.length;
  let newDecimals = decimals > 8 ? 8 : decimals;
  if (strLength > 8 && newStr.includes('.')) {
    const intlength = newStr.split('.')[0].length;
    newDecimals = max([8 - intlength, 0]);
  }
  return formatWithDecimals(str, newDecimals, options);
};

const formatInGroupSeparator = (val) => {
  if (!isNumber(val)) {
    return '';
  }
  const output = new BigNumber(val).toFormat({
    groupSeparator: ',',
    groupSize: 3,
    decimalSeparator: '.',
  });
  return output.toString();
};

window.formatInGroupSeparator = formatInGroupSeparator;

export default {
  format,
  formatWithDecimals,
  formatWithDecimalsLess8,
  formatWithMaxLength8,
  formatInGroupSeparator,
};

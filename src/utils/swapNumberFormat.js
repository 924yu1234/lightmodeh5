import React from 'react';
import BigNumber from 'bignumber.js';

import { SWAP_AMOUNT_DECIMAL } from 'src/constants/dex';

import digit, { isNumber } from 'js/utils/digit';

import {
  divide,
  isEqual,
  maxEffectiveNumber,
  maxEffectiveNumber_price,
} from './numberUtils';
export const formatSwapPairPrice = (
  price,
  { level = 0, groupSeparator = false, precision = '0' } = {}
) => {
  if (!isNumber(price)) return '--';
  if (isEqual(price, 0)) return '--';
  // 去掉KMB
  // if (price >= 10_000_000_000_000_000) {
  //   const num = maxEffectiveNumber(
  //     divide(price, 1_000_000_000_000_000),
  //     5 - level,
  //     {
  //       groupSeparator,
  //       precision,
  //     }
  //   );
  //   return `${num}P`;
  // }
  // if (price >= 10_000_000_000_000) {
  //   const num = maxEffectiveNumber(
  //     divide(price, 1_000_000_000_000),
  //     5 - level,
  //     {
  //       groupSeparator,
  //       precision,
  //     }
  //   );
  //   return `${num}T`;
  // }
  // if (price >= 10_000_000_000) {
  //   const num = maxEffectiveNumber(divide(price, 1_000_000_000), 5 - level, {
  //     precision,
  //     groupSeparator,
  //   });
  //   return `${num}B`;
  // }
  // if (price >= 10_000_000) {
  //   const num = maxEffectiveNumber(divide(price, 1_000_000), 5 - level, {
  //     precision,
  //     groupSeparator,
  //   });
  //   return `${num}M`;
  // }
  // if (price >= 100_000) {
  //   const num = maxEffectiveNumber(divide(price, 1_000), 5 - level, {
  //     precision,
  //     groupSeparator,
  //   });
  //   return `${num}K`;
  // }
  if (price <= 0.000001) {
    const _num = new BigNumber(price).toExponential();
    const splites = _num.split('e');
    const num = maxEffectiveNumber(splites[0], 5 - level, {
      precision,
    });
    return (
      <span>
        0.0<sub>{Math.abs(Number(splites[1]) + 1)}</sub>
        {num.replace('.', '')}
      </span>
    );
  }

  return maxEffectiveNumber(price, 5 - level, {
    precision,
    groupSeparator,
  });
};

export const formatLowAndHighPriceDisplay = (
  low,
  high,
  { isStable = false, level = 0, groupSeparator = false, precision = '0' } = {}
) => {
  if (low < 0.000001 && high >= 0.000001) {
    return {
      low: maxEffectiveNumber_price(low, 5 - level, {
        isStable,
        precision,
        groupSeparator,
      }),
      high: maxEffectiveNumber_price(high, 5 - level, {
        isStable,
        precision,
        groupSeparator,
      }),
    };
  }
  return {
    low: formatSwapPairPrice(low, {
      isStable,
      level,
      groupSeparator,
      precision,
    }),
    high: formatSwapPairPrice(high, {
      isStable,
      level,
      groupSeparator,
      precision,
    }),
  };
};

export const formatSwapAmountDisplay = (amount, { baseDecimals }) => {
  if (!isNumber(amount)) return '';
  if (amount >= 10_000_000_000_000_000) {
    const num = maxEffectiveNumber(
      divide(amount, 1_000_000_000_000_000),
      SWAP_AMOUNT_DECIMAL,
      {
        precision: '#',
        floor: true,
        groupSeparator: true,
        maxDecimals: baseDecimals,
      }
    );
    return `${num}P`;
  }
  if (amount >= 10_000_000_000_000) {
    const num = maxEffectiveNumber(
      divide(amount, 1_000_000_000_000),
      SWAP_AMOUNT_DECIMAL,
      {
        precision: '#',
        floor: true,
        groupSeparator: true,
        maxDecimals: baseDecimals,
      }
    );
    return `${num}T`;
  }
  if (amount >= 100_000_000_000) {
    const num = maxEffectiveNumber(
      divide(amount, 1_000_000_000),
      SWAP_AMOUNT_DECIMAL,
      {
        precision: '#',
        floor: true,
        groupSeparator: true,
        maxDecimals: baseDecimals,
      }
    );
    return `${num}B`;
  }

  if (amount <= 0.000001 && amount > 0) {
    const _num = new BigNumber(amount).toExponential();
    const splites = _num.split('e');
    const num = maxEffectiveNumber(splites[0], SWAP_AMOUNT_DECIMAL, {
      precision: '#',
      floor: true,
      groupSeparator: true,
      maxDecimals: baseDecimals,
    });
    return `${num}e${splites[1]}`;
  }

  return maxEffectiveNumber(amount, 6, {
    precision: '#',
    floor: true,
    groupSeparator: true,
  });
};

// < $1,000：只显示整数，比如$123
// >= $1,000 并且 < $10,000：显示缩略K，最多1位小数，比如$1K、9.9K
// >= $10,000 并且 < $1,000,000：显示缩略K，只有整数，比如$10K、$999K
// >= $1,000,000 并且 < $1,000,000,000，显示缩略M，最多1位小数，比如$1.0M，$999.9M
// >= $1,000,000,000，显示缩略B，最多1位小数，比如$1.0B
export function formatPairInfo(number) {
  if (!isNumber(number)) return '';
  if (number < 1000) {
    return digit.format(number, '0');
  }
  if (number >= 1000 && number < 10000) {
    return `${digit.format(number / 1000, '0.#')}K`;
  }
  if (number >= 10000 && number < 1000000) {
    return `${digit.format(number / 1000, '0')}K`;
  }
  if (number >= 1000000 && number < 1000000000) {
    return `${digit.format(number / 1000000, '0.#')}M`;
  }
  return `${digit.format(number / 1000000000, '0.#')}B`;
}

import { getAddress } from '@ethersproject/address';
import BigNumber from 'bignumber.js';

import { SWAP_PRICE_DECIMAL } from 'src/constants/dex';
import { formatUnits } from 'src/ethers/utils';

import digit, { isNumber } from 'js/utils/digit';

import {
  divide,
  maxEffectiveNumber,
  maxEffectiveNumber_price,
} from './numberUtils';

export const formatTurnover = (turnover, { maxDecimals = 5 } = {}) => {
  if (!isNumber(turnover)) return '';
  if (turnover >= 1_000_000_000_000_000) {
    const num = maxEffectiveNumber(divide(turnover, 1_000_000_000_000_000), 5, {
      maxDecimals,
    });
    if (num > 999999) {
      return ` >999999P`;
    }
    return `${num}P`;
  }
  if (turnover >= 1_000_000_000_000) {
    const num = maxEffectiveNumber(divide(turnover, 1_000_000_000_000), 5, {
      maxDecimals,
    });
    return `${num}T`;
  }
  if (turnover >= 1_000_000_000) {
    const num = maxEffectiveNumber(divide(turnover, 1_000_000_000), 5, {
      maxDecimals,
    });
    return `${num}B`;
  }
  if (turnover >= 1_000_000) {
    const num = maxEffectiveNumber(divide(turnover, 1_000_000), 5, {
      maxDecimals,
    });
    return `${num}M`;
  }
  if (turnover >= 10_000) {
    const num = maxEffectiveNumber(divide(turnover, 1_000), 5, {
      maxDecimals,
    });
    return `${num}K`;
  }
  if (turnover <= 0.000001 && turnover > 0) {
    const _num = new BigNumber(turnover).toExponential();
    const splites = _num.split('e');
    const num = maxEffectiveNumber(splites[0], 5, { maxDecimals });
    return `${num}e${splites[1]}`;
  }
  return maxEffectiveNumber(turnover, 5, { maxDecimals });
};

export function formatTokenCode(code, codeDisplayLength = 10) {
  if (!code || !code?.slice) return '';
  let address = code;
  try {
    address = getAddress(code);
  } catch (error) {
    address = code;
  }
  if (address?.length < 10) return address?.toUpperCase();
  if (codeDisplayLength === 18) {
    return `${address.slice(0, 10)}...${address.slice(-8)}`;
  }
  return `${address.slice(0, 5)}...${address.slice(-5)}`;
}

export function formatHash(hash) {
  if (!hash) return '';
  return `${hash.slice(0, 5)}...${hash.slice(-5)}`;
}

export function formatPoolAddress(address) {
  if (!address) return '';
  return `${address.slice(0, 5)}...${address.slice(-5)}`;
}

export function formatAddress(address) {
  if (!address) return '';
  return `${address.slice(0, 5)}...${address.slice(-5)}`;
}

export function getPriceScale({ last_price, is_stable }) {
  let pricescale = 100;
  if (last_price) {
    const last_price_display = maxEffectiveNumber_price(last_price, 5, {
      groupSeparator: false,
      precision: '0',
      isStable: is_stable,
    });
    const label = ((last_price_display || '').split('.')[1] ?? '').length;
    pricescale = 10 ** label;
  }
  return pricescale;
}

export function getSwapPriceScale({ last_price }) {
  let pricescale = 100;
  if (last_price) {
    const last_price_display = maxEffectiveNumber(
      last_price,
      SWAP_PRICE_DECIMAL,
      {
        groupSeparator: false,
        precision: '0',
      }
    );
    const label = ((last_price_display || '').split('.')[1] ?? '').length;
    pricescale = 10 ** label;
  }
  return pricescale;
}

export function formatGasTokens(gas_tokens) {
  if (!gas_tokens) return [];
  return gas_tokens.map((gas_token) => {
    return {
      ...gas_token,
      id: gas_token.token_id,
      volume: gas_token.amount,
      amount: isNumber(gas_token.amount)
        ? formatUnits(gas_token.amount, gas_token.decimals)
        : gas_token.amount,
    };
  });
}

export function formatTvl(number) {
  if (!isNumber(number)) return '';
  if (number > 1000_000_000) {
    return `${digit.format(number / 1000_000_000, '0.00')}B`;
  }
  if (number > 1000_000) {
    return `${digit.format(number / 1000_000, '0.00')}M`;
  }
  if (number > 1000) {
    return `${digit.format(number / 1000, '0.00')}K`;
  }
  return digit.format(number, '0.00');
}

export function formatUsd(usd) {
  if (!isNumber(usd)) return '--';
  if (Number(usd) > 0 && Number(usd) < 0.01) {
    return `<$0.01`;
  }
  if (Number(usd) < 0) {
    return `-$${digit.format(Math.abs(usd), '0.##')}`;
  }
  return `$${digit.format(usd, '0.##')}`;
}

export function formatAPY(apy) {
  if (!isNumber(apy)) return '--';
  if (Number(apy) === 0) return '0%';
  if (apy < 0.01) {
    return `<0.01%`;
  }
  if (apy > 1000) {
    return `${digit.format(apy, '0')}%`;
  }
  return `${digit.format(apy, '0.#')}%`;
}

export function formatNetworFeeValue(networkFeeValue) {
  if (!isNumber(networkFeeValue)) return '';
  if (networkFeeValue > 1000) {
    return `${digit.format(networkFeeValue, '0')}`;
  }
  return maxEffectiveNumber(networkFeeValue, 3, {
    groupSeparator: false,
    precision: '#',
  });
}

// 最多保留8位小数, 不足显示 <0.00000001
export function formatAmountDisplayLess8(amount, decimals, digitOptions = {}) {
  if (!isNumber(amount)) return '';
  if (Number(amount) < 0.00000001) {
    return '<0.00000001';
  }
  return digit.formatWithDecimals(amount, decimals > 8 ? 8 : decimals, {
    groupSeparator: true,
    ...digitOptions,
  });
}

export function formatTokenSymbol(symbol) {
  if (!symbol) return '';
  return symbol.length > 10 ? `${symbol.slice(0, 10)}...` : symbol;
}

export function formatTokenName(name) {
  if (!name) return '';
  return name.length > 10 ? `${name.slice(0, 16)}...` : name;
}

// 缓存Y轴格式化函数
export function formatCurrencyAxis(value) {
  const absValue = Math.abs(value);
  if (absValue >= 1000000000) {
    return `$${(value / 1000000000).toFixed(0)}B`;
  }
  if (absValue >= 1000000) {
    return `$${(value / 1000000).toFixed(0)}M`;
  }
  if (absValue >= 1000) {
    return `$${(value / 1000).toFixed(0)}K`;
  }
  return `$${value.toFixed(0)}`;
}

export function formatNumberAxis(value) {
  const absValue = Math.abs(value);
  if (absValue >= 1000000000) {
    return `${(value / 1000000000).toFixed(0)}B`;
  }
  if (absValue >= 1000000) {
    return `${(value / 1000000).toFixed(0)}M`;
  }
  if (absValue >= 1000) {
    return `${(value / 1000).toFixed(0)}K`;
  }
  return `${value.toFixed(0)}`;
}

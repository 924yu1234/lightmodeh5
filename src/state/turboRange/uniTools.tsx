import { useCallback, useMemo } from 'react';
import { Currency, Price, Token } from '@uniswap/sdk-core';
import {
  encodeSqrtRatioX96,
  FeeAmount,
  nearestUsableTick,
  priceToClosestTick,
  TICK_SPACINGS,
  TickMath,
} from '@uniswap/v3-sdk';
import JSBI from 'jsbi';

import { isNumber } from 'src/utils/digit';

// 科学计数法转换为普通数字字符串
function convertScientificNotationToNumber(value: string): string {
  if (!value || !value.includes('e')) {
    return value;
  }

  try {
    const num = parseFloat(value);
    if (isNaN(num)) return value;

    // 使用 toFixed 确保精度，但需要确定合适的小数位数
    const str = num.toFixed(20);
    // 移除尾随零
    return str.replace(/\.?0+$/, '');
  } catch {
    return value;
  }
}

// 解析价格字符串为 Uniswap Price 对象
function tryParsePrice<T extends Currency>({
  baseToken,
  quoteToken,
  value,
}: {
  baseToken?: T;
  quoteToken?: T;
  value?: string;
}): Price<T, T> | undefined {
  if (!baseToken || !quoteToken || !value) {
    return undefined;
  }

  // 转换科学计数法为普通格式
  const decimalValue = convertScientificNotationToNumber(value);
  if (!decimalValue.match(/^\d*\.?\d*$/)) {
    return undefined;
  }

  const [whole, fraction] = decimalValue.split('.');
  const decimals = fraction?.length ?? 0;
  const withoutDecimals = JSBI.BigInt((whole ?? '') + (fraction ?? ''));

  return new Price(
    baseToken,
    quoteToken,
    JSBI.multiply(
      JSBI.BigInt(10 ** decimals),
      JSBI.BigInt(10 ** baseToken.decimals)
    ),
    JSBI.multiply(withoutDecimals, JSBI.BigInt(10 ** quoteToken.decimals))
  );
}

// 解析价格为可用的 tick
export function tryParseTick({
  baseToken,
  quoteToken,
  feeAmount,
  value,
}: {
  baseToken?: Token;
  quoteToken?: Token;
  feeAmount?: FeeAmount;
  value?: string;
}): number | undefined {
  if (!baseToken || !quoteToken || !feeAmount || !value) {
    return undefined;
  }

  const price = tryParsePrice({ baseToken, quoteToken, value });
  if (!price) {
    return undefined;
  }

  let tick: number;

  // 检查价格是否在最小/最大边界内，如果超出则返回最小/最大值
  const sqrtRatioX96 = encodeSqrtRatioX96(price.numerator, price.denominator);

  if (JSBI.greaterThanOrEqual(sqrtRatioX96, TickMath.MAX_SQRT_RATIO)) {
    tick = TickMath.MAX_TICK;
  } else if (JSBI.lessThanOrEqual(sqrtRatioX96, TickMath.MIN_SQRT_RATIO)) {
    tick = TickMath.MIN_TICK;
  } else {
    // 这个函数对基础货币无关，总是返回正确的 tick
    tick = priceToClosestTick(price);
  }

  return nearestUsableTick(tick, TICK_SPACINGS[feeAmount]);
}

export function useUniPriceToTick({
  baseToken,
  quoteToken,
  feeAmount = FeeAmount.MEDIUM,
}: {
  baseToken: { decimals: number; code: string; symbol: string };
  quoteToken: { decimals: number; code: string; symbol: string };
  feeAmount?: FeeAmount;
}) {
  return useCallback(
    (price: string) => {
      if (!isNumber(price) || !baseToken?.decimals || !quoteToken?.decimals) {
        return null;
      }

      try {
        // 创建 Token 对象
        const base = new Token(
          1, // chainId - 使用默认值，实际使用时可能需要传入
          baseToken.code,
          baseToken.decimals,
          baseToken.symbol
        );

        const quote = new Token(
          1, // chainId
          quoteToken.code,
          quoteToken.decimals,
          quoteToken.symbol
        );

        // 使用 Uniswap SDK 解析 tick
        const tick = tryParseTick({
          baseToken: base,
          quoteToken: quote,
          feeAmount,
          value: price,
        });

        return tick ?? null;
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Price to tick conversion error:', error);
        return null;
      }
    },
    [baseToken, quoteToken, feeAmount]
  );
}

// Tick 转换为价格的 Hook
export function getUniTickToPrice({
  tick,
  baseToken,
  quoteToken,
}: {
  tick: number;
  baseToken: { decimals: number; address?: string; symbol?: string };
  quoteToken: { decimals: number; address?: string; symbol?: string };
}) {
  if (
    !Number.isInteger(tick) ||
    !baseToken?.decimals ||
    !quoteToken?.decimals
  ) {
    return null;
  }

  try {
    // price0 = (1.0001^tick) / 10^(token1Decimals - token0Decimals)
    const priceBase = Math.exp(tick * Math.log(1.0001)); // 1.0001^tick
    const decimalAdjustment = 10 ** (quoteToken.decimals - baseToken.decimals);
    const price0 = priceBase / decimalAdjustment;

    if (!Number.isFinite(price0)) {
      return null;
    }

    // 与历史实现一致，返回字符串形式，默认保留18位有效数字
    return price0.toPrecision(18);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Tick to price conversion error:', error);
    return null;
  }
}

// 获取价格范围内最近的有效 tick 范围
export function useUniPriceRangeToTicks({
  baseToken,
  quoteToken,
  feeAmount = FeeAmount.MEDIUM,
}: {
  baseToken: { decimals: number; code: string; symbol: string };
  quoteToken: { decimals: number; code: string; symbol: string };
  feeAmount?: FeeAmount;
}) {
  const priceToTick = useUniPriceToTick({
    baseToken,
    quoteToken,
    feeAmount,
  });

  return useCallback(
    ({ minPrice, maxPrice }: { minPrice: string; maxPrice: string }) => {
      const minTick = priceToTick(minPrice);
      const maxTick = priceToTick(maxPrice);
      if (minTick === null || maxTick === null) {
        return { minTick: null, maxTick: null, isValid: false };
      }

      // 确保 minTick < maxTick
      const validMinTick = Math.min(minTick, maxTick);
      const validMaxTick = Math.max(minTick, maxTick);

      return {
        minTick: validMinTick,
        maxTick: validMaxTick,
        isValid: true,
      };
    },
    [priceToTick]
  );
}

// 获取 tick 范围对应的实际价格范围（用于显示）
export function useUniTickRangeToPrices({
  minTick,
  maxTick,
  baseToken,
  quoteToken,
}: {
  minTick: number;
  maxTick: number;
  baseToken: { decimals: number; address?: string; symbol?: string };
  quoteToken: { decimals: number; address?: string; symbol?: string };
}) {
  const minPrice = getUniTickToPrice({ tick: minTick, baseToken, quoteToken });
  const maxPrice = getUniTickToPrice({ tick: maxTick, baseToken, quoteToken });

  return useMemo(() => {
    return {
      minPrice,
      maxPrice,
      isValid: minPrice !== null && maxPrice !== null,
    };
  }, [minPrice, maxPrice]);
}

// 导出 FeeAmount 枚举供外部使用
export { FeeAmount } from '@uniswap/v3-sdk';

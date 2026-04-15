import { useMemo } from 'react';

import { formatUnits } from 'src/ethers/utils';
import digit, { isNumber } from 'src/utils/digit';
import { formatUsd } from 'src/utils/format';
import { divide, minus, multiply, plus } from 'src/utils/numberUtils';

import { useTurboRangeProduct } from './hooks';
import {
  TurboRangePosition,
  TurboRangeProduct,
  TurboRangeStrategy,
} from './reducer';
import { useUniPriceToTick } from './uniTools';

export const convertTurboRangeProduct = (product: any): TurboRangeProduct => {
  return {
    name: product.name,
    id: product.id,
    chain: product.chain_name,
    poolAddress: product.pool_address,
    baseToken: {
      ...product.token_a,
      chain: product.chain_name,
      symbol: product.token_a?.symbol,
    },
    quoteToken: { ...product.token_b, chain: product.chain_name },
    investCurrency: product.invest_currency,
    currentPrice: digit.formatWithDecimals(
      product.current_price,
      product.priceDecimals
    ),
    showDecimals: product.priceDecimals,
    weekAPY: Number(product.week_apr),
    weekAPY_display: formatTurboRangeAPY(product.week_apr),
    percent_min: product.price_percentage_min,
    percent_max: product.price_percentage_max,
    slippage: `${product.price_slippage}`,
    poolUrlText: product.pool_text,
    poolUrl: product.pool_url,
    feePercent: `${product.fee_percentage}`,
    changes24h: product['24h_changes'],
    poolCreatedAt: product.pool_create_time,
    tvl: product.protocol_tvl,
    tvlDate: product.protocol_tvl_date * 1000,
    marketCap: product.market_cap,
    marketCapDate: product.market_cap_date * 1000,
    commonSenseSymbol: product.name,
    productName: {
      'en-US': product.name,
    },
    permissions: product.permissions || [],
    swapPoolFee: product.swap_pool_fee,
  };
};

export const convertTurboRangePosition = (
  position: any
): TurboRangePosition => {
  const {
    token_a_amount,
    token_b_amount,
    price_a,
    price_b,
    // init_principal_a,
    // init_principal_b,
    // init_price_a,
    // init_price_b,
    // closed_price_a,
    // closed_price_b,
    // closed_principal_a,
    // closed_principal_b,

    deposit_principal_a,
    deposit_principal_b,
    withdraw_principal_a,
    withdraw_principal_b,

    claimed_a,
    claimed_b,

    total_yield_usd,
    yesterday_yield_usd,
    yesterday_apy,
    last_24h_yield_usd,
    last_24h_apy,
    current_hour_apy,
    current_hour_yield_usd,
    current_hour_start_ts,
    last_complete_hour_apy,
    hourly_breakdown,
    unclaimed_rewards,
    apy,
    total_pnl,
    principal_pnl,
    ret_principal_a,
    ret_principal_b,
    total_yields,
    unclaimed_rewwards_usd,

    snapshot_timestamp,
  } = position;

  const tokenA = {
    code: position.token_a.code,
    chain: position.chain_name,
    symbol: position.token_a.symbol,
  };

  const depositBaseAmount = isNumber(deposit_principal_a)
    ? formatUnits(deposit_principal_a, position.token_a.decimals)
    : '0';
  const depositQuoteAmount = isNumber(deposit_principal_b)
    ? formatUnits(deposit_principal_b, position.token_b.decimals)
    : '0';

  const withdrawalBaseAmount = isNumber(withdraw_principal_a)
    ? formatUnits(withdraw_principal_a, position.token_a.decimals)
    : '0';
  const withdrawalQuoteAmount = isNumber(withdraw_principal_b)
    ? formatUnits(withdraw_principal_b, position.token_b.decimals)
    : '0';

  const claimedBaseAmount = isNumber(claimed_a)
    ? formatUnits(claimed_a, position.token_a.decimals)
    : '0';
  const claimedQuoteAmount = isNumber(claimed_b)
    ? formatUnits(claimed_b, position.token_b.decimals)
    : '0';

  const withdrawalAndClaimedBaseAmount = plus(
    withdrawalBaseAmount,
    claimedBaseAmount
  ) as string;
  const withdrawalAndClaimedQuoteAmount = plus(
    withdrawalQuoteAmount,
    claimedQuoteAmount
  ) as string;

  const restBaseAmount = isNumber(ret_principal_a)
    ? formatUnits(ret_principal_a, position.token_a.decimals)
    : '0';
  const restQuoteAmount = isNumber(ret_principal_b)
    ? formatUnits(ret_principal_b, position.token_b.decimals)
    : '0';

  const totalPrincipalBaseAmount = minus(
    depositBaseAmount,
    restBaseAmount
  ) as string;

  const totalPrincipalQuoteAmount = minus(
    depositQuoteAmount,
    restQuoteAmount
  ) as string;

  // active
  const activeBaseAmount = isNumber(token_a_amount)
    ? formatUnits(token_a_amount, position.token_a.decimals)
    : '0';
  const activeQuoteAmount = isNumber(token_b_amount)
    ? formatUnits(token_b_amount, position.token_b.decimals)
    : '0';

  const activeBaseValue = multiply(price_a, activeBaseAmount);
  const activeQuoteValue = multiply(price_b, activeQuoteAmount);
  const principalValue = plus(activeBaseValue, activeQuoteValue).toString();

  const totalPnl = isNumber(total_pnl) ? total_pnl : '0';
  const principalPnl = isNumber(principal_pnl) ? principal_pnl : '0';

  const _total_yields = total_yields || total_yield_usd;

  const totalYield = isNumber(_total_yields) ? _total_yields : '0';

  const retBaseAmount = isNumber(ret_principal_a)
    ? formatUnits(ret_principal_a, position.token_a.decimals)
    : '0';
  const retQuoteAmount = isNumber(ret_principal_b)
    ? formatUnits(ret_principal_b, position.token_b.decimals)
    : '0';

  // const retBaseValue = multiply(init_price_a, retBaseAmount);
  // const retQuoteValue = multiply(init_price_b, retQuoteAmount);
  // const retValue = digit.formatWithDecimals(
  //   plus(retBaseValue, retQuoteValue).toString(),
  //   position.token_b.decimals
  // );

  // const initBaseValue = multiply(init_price_a, initBaseAmount);
  // const initQuoteValue = multiply(init_price_b, initQuoteAmount);
  // const initPrincipalValue = digit.formatWithDecimals(
  //   plus(initBaseValue, initQuoteValue).toString(),
  //   position.token_b.decimals
  // );

  let unclaimedRewardsValue = unclaimed_rewwards_usd || 0;
  if (unclaimed_rewards?.length) {
    unclaimedRewardsValue = 0;
  }
  const unclaimedRewards = unclaimed_rewards
    ?.map((reward: any) => {
      const amount = isNumber(reward.amount)
        ? formatUnits(reward.amount, reward.decimals)
        : '0';
      unclaimedRewardsValue = plus(
        unclaimedRewardsValue,
        multiply(amount, reward.price)
      ) as string;
      return {
        ...reward,
        amount,
        code: reward.address,
      };
    })
    .filter((reward: any) => reward.amount !== '0')
    .sort((a: any, b: any) => {
      if (a.symbol === 'USDC') return 1;
      if (b.symbol === 'USDC') return -1;
      return 0;
    });

  const positionValue = plus(principalValue, unclaimedRewardsValue);
  const createTime = position.create_time * 1000;
  const closeTime = position.close_time * 1000;
  const yesterdayApyCalculatedTime = snapshot_timestamp * 1000;

  let duration = Date.now() - createTime;

  if (position.status === 'CLOSED') {
    duration = closeTime - createTime;
  }

  const yesterdayYield = yesterday_yield_usd;
  const yesterdayYield_display = isNumber(yesterdayYield)
    ? formatUsd(yesterdayYield)
    : '--';

  const yesterday_apy_display = isNumber(yesterday_apy)
    ? formatTurboRangeAPY(yesterday_apy)
    : '--';

  const last24hYield = last_24h_yield_usd || '0';
  const last24hYield_display = isNumber(last_24h_yield_usd)
    ? formatUsd(last_24h_yield_usd)
    : '--';

  const last24hApy_display = isNumber(last_24h_apy)
    ? formatTurboRangeAPY(last_24h_apy)
    : '--';

  const entryPrice = divide(
    position.init_price_a,
    position.init_price_b
  ) as string;

  const firstYesterdayApyCalculatedTime =
    getTurboRangeYesterdayCalculatedTimeByCreateTime(createTime);

  const total_value_usd = isNumber(position.init_return?.total_value_usd)
    ? position.init_return?.total_value_usd
    : '0';

  return {
    initReturnValue: total_value_usd,
    entryPrice,
    currentPrice: '',
    currentPriceTs: 0,
    duration,
    id: position.id,
    chain: position.chain_name,
    poolAddress: position.pool_address,
    positionAddress: position.position,
    intentId: position.init_intent_id,

    baseToken: {
      ...position.token_a,
      ...tokenA,
      amount: activeBaseAmount,
    },
    quoteToken: {
      ...position.token_b,
      chain: position.chain_name,
      amount: activeQuoteAmount,
    },
    positionValue: positionValue.toString(),
    positionValue_display: formatUsd(positionValue),
    principalValue,
    principalValue_display: formatUsd(principalValue),

    minPrice: position.tick_lower,
    maxPrice: position.tick_upper,
    status: position.status,

    created_at: createTime,
    closed_at: closeTime,
    firstYesterdayApyCalculatedTime,
    allTimeApyCalculatedTime: getTurboRangeAllTimeApyCalculatedTime(createTime),
    totalReturn: '',
    totalReturn_display: '',
    totalRoi: '',
    totalRoi_display: '',

    yesterdayYield,
    yesterdayYield_display,
    yesterday_apy,
    yesterday_apy_display,
    yesterdayApyCalculatedTime,
    isYesterdayUpdating: isTurboRangeYesterdayUpdating({
      firstYesterdayApyCalculatedTime,
      status: position.status,
      yesterdayApyCalculatedTime,
    }),

    last24hYield,
    last24hYield_display,
    last24hApy: last_24h_apy || '0',
    last24hApy_display,

    currentHourApy: current_hour_apy || '0',
    currentHourYieldUsd: current_hour_yield_usd || '0',
    currentHourStartTs: (current_hour_start_ts || 0) * 1000,
    lastCompleteHourApy: last_complete_hour_apy || '',
    hourlyBreakdown: (hourly_breakdown || []).map((row: any) => ({
      hour_ts: row.hour_ts * 1000,
      end_ts: row.end_ts * 1000,
      is_partial: row.is_partial,
      yield_usd: row.yield_usd || '0',
      apy: row.apy || '0',
      in_range: row.in_range,
    })),

    totalYield: totalYield.toString(),
    totalYield_display: formatUsd(totalYield),
    // 小于1天不显示
    apy: `${apy}`,
    apy_display: formatTurboRangeAPY(apy),

    // init
    depositBaseAmount,
    depositQuoteAmount,

    // closed
    totalPrincipalBaseAmount,
    totalPrincipalQuoteAmount,
    withdrawalAndClaimedBaseAmount,
    withdrawalAndClaimedQuoteAmount,

    principalPnl,
    principalPnl_display: formatUsd(principalPnl),
    totalPnl,
    totalPnl_display: formatUsd(totalPnl),

    unclaimed_rewards: unclaimedRewards,
    unclaimedRewardsValue,
    unclaimedRewardsValue_display: formatUsd(unclaimedRewardsValue),

    retBaseAmount,
    retQuoteAmount,
  };
};

export const convertTurboRangeStrategyLeaderboardItem = (
  item: any
): TurboRangeStrategy => {
  const product = item?.product || {};
  const priceRange = item?.price_range || {};
  const stats = item?.stats || {};
  const allTimeYield = isNumber(stats.all_time_yield_usd)
    ? `${stats.all_time_yield_usd}`
    : '0';
  const yesterdayYield = isNumber(stats.yesterday_yield_usd)
    ? `${stats.yesterday_yield_usd}`
    : '0';
  const allTimeApy = isNumber(stats.all_time_apy)
    ? `${stats.all_time_apy}`
    : '0';
  const yesterdayApy = isNumber(stats.yesterday_apy)
    ? `${stats.yesterday_apy}`
    : '0';
  let weightedPrincipal = '0';
  if (isNumber(stats.weighted_active_principle_usd)) {
    weightedPrincipal = `${stats.weighted_active_principle_usd}`;
  } else if (isNumber(stats.active_principal_usd)) {
    weightedPrincipal = `${stats.active_principal_usd}`;
  }
  const activeCapital = isNumber(stats.active_capital_usd)
    ? `${stats.active_capital_usd}`
    : '0';
  const totalReturn = isNumber(stats.total_return_usd)
    ? `${stats.total_return_usd}`
    : '0';
  const totalRoi = isNumber(stats.total_roi) ? `${stats.total_roi}` : '0';
  const totalRoiPercent = multiply(totalRoi, 100);
  const duration = Date.now() - item.create_time * 1000;

  return {
    id: [
      item.create_time,
      product.pool_address,
      priceRange.tick_lower,
      priceRange.tick_upper,
      item.runtime_days,
    ]
      .filter(Boolean)
      .join('-'),
    chain: product.chain_name,
    poolAddress: product.pool_address || '',
    minPrice: priceRange.price_lower || '',
    maxPrice: priceRange.price_upper || '',
    currentPrice: priceRange.current_price || '',
    currentPriceTs: (priceRange.current_price_ts || 0) * 1000,
    status: 'OPEN',
    yesterdayYield,
    yesterdayYield_display: formatUsd(yesterdayYield),
    yesterday_apy: yesterdayApy,
    yesterday_apy_display: formatTurboRangeAPY(yesterdayApy),
    yesterdayApyCalculatedTime: (stats.yesterday_apy_timestamp || 0) * 1000,
    isYesterdayUpdating: false,
    totalYield: allTimeYield,
    totalYield_display: formatUsd(allTimeYield),
    apy: allTimeApy,
    apy_display: formatTurboRangeAPY(allTimeApy),
    duration,
    positionValue: activeCapital,
    positionValue_display: formatUsd(activeCapital),
    principalValue: weightedPrincipal,
    principalValue_display: formatUsd(weightedPrincipal),
    totalReturn,
    totalReturn_display: formatUsd(totalReturn),
    totalRoi,
    totalRoi_display: formatTurboRangeAPY(totalRoiPercent),
  };
};

export function getUtc0TimestampByTime(time: number): number {
  const date = new Date(time);
  return Date.UTC(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    0,
    0,
    0,
    0
  );
}

export function isTurboRangeYesterdayUpdating({
  firstYesterdayApyCalculatedTime,
  status,
  yesterdayApyCalculatedTime,
}: {
  firstYesterdayApyCalculatedTime: number;
  status: 'OPEN' | 'CLOSED' | 'PENDING';
  yesterdayApyCalculatedTime: number;
}) {
  if (status !== 'OPEN') {
    return false;
  }
  const now = Date.now();
  const todayUtc0 = getUtc0TimestampByTime(now);
  // 还没到第一次计算时间，updateing = false
  if (firstYesterdayApyCalculatedTime >= now) {
    return false;
  }
  // 已经计算过，updateing = false
  if (yesterdayApyCalculatedTime >= todayUtc0) {
    return false;
  }
  // 过了0点，但是没计算过，updateing = true
  return true;
}

export function getTurboRangeAllTimeApyCalculatedTime(createdAt: number) {
  return createdAt + 4 * 60 * 60 * 1000;
}

export function getTurboRangeYesterdayCalculatedTimeByCreateTime(
  createdAt: number
) {
  const date = new Date(createdAt);
  return Date.UTC(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate() + 2,
    0,
    0,
    0,
    0
  );
}

// 增加运行时长，即current time - create time，用缩略形式展示，停留时不需要动态更新，数值最多保留2种计时单位，位数四舍五入，最小精度到分钟，最大到年，例如 1y 45d, 78d 17h, 6h 43m, 18m ，其中 1y = 365d。点击后tooltips提示：Created at YYYY-MM-DD hh:mm
export const formatTurboRangeDuration = (duration: number) => {
  const years = Math.floor(duration / (1000 * 60 * 60 * 24 * 365));
  const days = Math.floor(duration / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (duration % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));

  if (years > 0) {
    return `${years}y ${days}d`;
  }
  if (days > 0) {
    return `${days}d ${hours}h`;
  }
  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  return `${minutes}m`;
};

/**
 * 策略卡片专用：只显示一个单位，四舍五入
 * ≥1d → Xd, ≥1h → Xh, else → Xm (最小1m)
 */
export const formatStrategyDuration = (duration: number) => {
  const totalMinutes = duration / (1000 * 60);
  const totalHours = duration / (1000 * 60 * 60);
  const totalDays = duration / (1000 * 60 * 60 * 24);

  if (totalDays >= 1) {
    return `${Math.round(totalDays)}d`;
  }
  if (totalHours >= 1) {
    return `${Math.round(totalHours)}h`;
  }
  return `${Math.max(1, Math.round(totalMinutes))}m`;
};

export function formatTurboRangeAPY(apy: number | string) {
  if (!isNumber(apy)) return '--';
  if (Number(apy) === 0) return '0%';
  if (Number(apy) < 0.01) {
    return `<0.01%`;
  }
  if (Number(apy) > 100) {
    return `${digit.format(apy, '0')}%`;
  }
  return `${digit.format(apy, '0.#')}%`;
}

export const useCheckPriceRange = (
  minPrice: string,
  maxPrice: string,
  poolAddress: string
) => {
  const product = useTurboRangeProduct(poolAddress);
  const getPriceToTick = useUniPriceToTick({
    baseToken: product?.baseToken,
    quoteToken: product?.quoteToken,
  });

  const priceRangeError = useMemo(() => {
    if (!product?.poolUrl || !product?.poolUrl?.includes('uniswap')) {
      return false;
    }
    const minTick = getPriceToTick(minPrice);
    const maxTick = getPriceToTick(maxPrice);
    return minTick === null || maxTick === null || minTick === maxTick;
  }, [minPrice, maxPrice, getPriceToTick, product?.poolUrl]);

  return {
    priceRangeError:
      !isNumber(minPrice) ||
      !isNumber(maxPrice) ||
      priceRangeError ||
      Number(minPrice) > Number(maxPrice),
    uniTickError: priceRangeError,
  };
};

export const checkPermission = (
  product: TurboRangeProduct,
  permission:
    | 'DEPOSIT'
    | 'WITHDRAW'
    | 'CLAIM'
    | 'ADD_DEPOSIT'
    | 'PARTIAL_WITHDRAW'
    | 'DUAL_DEPOSIT'
    | 'DUAL_ADD_DEPOSIT'
    | 'ADJUST'
) => {
  return product?.permissions?.includes(permission);
};

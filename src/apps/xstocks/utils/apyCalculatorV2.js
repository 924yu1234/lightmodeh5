import { estimateAprForPriceRangeDelta } from '@dg/turbo-range';

import { getTurboRangeApyBacktest } from 'src/components/TurboRange/modals/apyBacktest/service';
import axios from 'src/utils/axios';

const { logger } = require('src/utils/logger');

// 代币价格缓存 - 每次session只获取一次
const priceCache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5分钟缓存时间

export const fetchFromApi = async (pool) => {
  // turbo-range/apy-estimate/HHQUnUbmWLrYzkscDY1C3deEFbGtiGBGoHjpANogmvum
  const preData = priceCache.get(pool);
  if (preData) {
    if (preData.timestamp > Date.now() - CACHE_DURATION) {
      return preData.data;
    }
    priceCache.delete(pool);
  }
  return axios({
    url: `/order-book-api/turbo-range/apy-estimate/${pool}`,
    method: 'GET',
  }).then((resp) => {
    priceCache.set(pool, {
      data: resp.data,
      timestamp: Date.now(),
    });
    return resp.data;
  });
};

const ApiResultMap = new Map();
/**
 * 计算APR
 * @param {string} poolId - 池子ID
 * @param {number} minPrice - 最小价格（价格范围下限）
 * @param {number} maxPrice - 最大价格（价格范围上限）
 * @param {number} aprType - week, month, day
 * @param {number} targetAmount - 目标投资金额（默认1000）
 * @returns {Promise<{totalNetAPR: string, totalGrossAPR: string, error?: Error}>} 包含APY和相关信息的对象
 */
export default async function calcAPR({
  poolId,
  minPrice,
  maxPrice,
  targetAmount = 1000,
  currentPrice,
  aprType = 'week',
} = {}) {
  try {
    if (!poolId || !minPrice || !maxPrice) {
      throw new Error('缺少必要参数: poolId, minPrice, maxPrice, currentPrice');
    }
    if (Number(minPrice) >= Number(maxPrice)) {
      throw new Error('minPrice必须小于maxPrice');
    }
    const dateKey = Math.floor(Date.now() / 600000);
    const key = `apy_${poolId}_${minPrice}_${maxPrice}_${currentPrice}_${aprType}_${dateKey}`;
    let apiResult;
    if (ApiResultMap.has(key)) {
      apiResult = ApiResultMap.get(key);
    } else {
      apiResult = await getTurboRangeApyBacktest({
        poolAddress: poolId,
        minPrice,
        maxPrice,
        currentPrice,
      });
    }
    logger.info('apiResult', apiResult);
    ApiResultMap.set(key, apiResult); // 每5分钟缓存一次
    if (aprType === 'day') {
      return { totalNetAPR: apiResult.apy_24h };
    }
    if (aprType === 'week') {
      return { totalNetAPR: apiResult.apy_7d };
    }
    if (aprType === 'month') {
      return { totalNetAPR: apiResult.apy_30d };
    }

    const poolData = await fetchFromApi(poolId);
    const result = await estimateAprForPriceRangeDelta(
      poolData,
      minPrice,
      maxPrice,
      targetAmount
    );
    logger.info('✓ APR Estimation completed');
    logger.info(`✓ Price Range: ${minPrice} - ${maxPrice}`);
    logger.info(result);

    return result[aprType]?.totalGrossAPR;
  } catch (error) {
    logger.error('APY计算出错:', error);
    return {
      error,
      totalNetAPR: '0',
      totalGrossAPR: '0',
    };
  }
}

/**
 * 格式化APR显示
 */
export function formatAPR(apr) {
  if (typeof apr !== 'number' || !isFinite(apr) || apr < 0) {
    return '0.00%';
  }

  if (apr < 0.01) {
    return '<0.01%';
  }

  return `${apr.toFixed(2)}%`;
}

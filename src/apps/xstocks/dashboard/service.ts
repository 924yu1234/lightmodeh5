import dayjs from 'dayjs';

import axiosHub from 'js/utils/axiosHub';

export type DailyHoldersApiItem = {
  date: string;
  address: string;
  cumulative_holders: number;
  symbol: string;
};

export const fetchDailyHolders = (code?: string) => {
  return axiosHub({
    url: `/api/dashboard/getDailyHolders`,
    method: 'GET',
    params: {
      tokenCode: code,
    },
  }).then((resp: any) => {
    return resp.data;
  });
};

export type DexPoolDailyDataApiItem = {
  date: string;
  liquidity: number;
  pool: string;
  pool_address: string;
  token_0_mint_address: string;
  token_1_mint_address: string;
  trade_count: number;
  turnover_ratio: number;
  unique_traders: number;
  volume: number;
};

export const fetchDexPoolDailyData = (code?: string) => {
  return axiosHub({
    url: `/api/dashboard/getDexPoolDailyData`,
    method: 'GET',
    params: {
      tokenCode: code,
    },
  }).then((resp: any) => {
    const data = resp.data || [];
    const map = data.reduce((acc: any, item: any) => {
      const date = item.date.replace(' 00:00:00.000 UTC', '');
      const key = date + (code ? '' : item.token_0_mint_address);
      item.date = date;
      if (acc[key]) {
        acc[key].volume += item.volume;
        acc[key].liquidity += item.liquidity;
        acc[key].trade_count += item.trade_count;
        acc[key].turnover_ratio += item.turnover_ratio;
        acc[key].unique_traders += item.unique_traders;
        acc[key].unique_traders += item.unique_traders;
      } else {
        acc[key] = item;
      }
      return acc;
    }, {});
    return Object.values(map);
  });
};

export type DailyTransactionVolumeApiItem = {
  date: string;
  time: number;
  token_address: string;
  token_symbol: string;
  traders: number; //
  transactions: number; //
  volume_usd: number; //
};

export const getDailyTransactionVolumeByAssets = (code?: string) => {
  return axiosHub({
    url: `/api/dashboard/getDailyTransactionVolumeByAssets`,
    method: 'GET',
    params: {
      tokenCode: code,
    },
  }).then((resp: any) => {
    return (resp?.data || []).map((item: any) => {
      return {
        ...item,
        time: dayjs(item.date).valueOf(),
        token_symbol: item.token_symbol.replace('x', ''),
      };
    });
  });
};

export type LatestAumApiItem = {
  date: string;
  aum: number;
  name: string;
  address: string;
  price: number;
  supply: string;
  symbol: string;
};

export const getLatestAum = (code?: string) => {
  return axiosHub({
    url: `/api/dashboard/getLatestAum`,
    method: 'GET',
    params: {
      tokenCode: code,
    },
  }).then((resp: any) => {
    return resp?.data || [];
  });
};

export type DailyTokenSupplyApiItem = {
  date: string;
  name: string;
  raw_supply: number;
  symbol: string;
  token_mint_address: string;
};

export type DailyTotalAumApiItem = {
  date: string;
  symbol: string;
  name: string;
  token_mint_address: string;
  raw_supply: number;
  price_usd: number;
  aum_usd: number;
  price_available: boolean;
  price_source: string;
};

export const getDailyTokenSupply = () => {
  return axiosHub({
    url: `/api/dashboard/getDailyTokenSupply`,
    method: 'GET',
    params: {
      includePrice: true,
    },
  }).then((resp: any) => {
    return resp.data || [];
  });
};

export const fetchTotalUniqHolders = (code?: string) => {
  return axiosHub({
    url: `/api/dashboard/getTotalUniqueHolders`,
    method: 'GET',
    params: {
      tokenCode: code,
    },
  }).then((resp: any) => {
    return resp.data || [];
  });
};

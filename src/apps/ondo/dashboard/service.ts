import dayjs from 'dayjs';

import { getPairsByTypes } from 'src/state/swap/pairs/service';

import axiosHub from 'js/utils/axiosHub';

export type DailyHoldersApiItem = {
  day: string;
  holders: number;
  symbol: string;
};

export const fetchOndoAssets = () => {
  return getPairsByTypes({ type: 'ondo' }).then((resp: any) => {
    return resp.list;
  });
};

export const fetchDailyHolders = (code?: string) => {
  return axiosHub({
    url: `/api/dashboard/ondo/getDailyHolders`,
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
      const key = date + item.token_0_mint_address;
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

export type DailyTokenSupplyApiItem = {
  date: string;
  name: string;
  daily_supply: number;
  token_symbol: string;
  aum_usd: number;
  global_tvl_usd: number;
};

export const getDailyTotalAum = () => {
  return axiosHub({
    url: `/api/dashboard/ondo/getDailyTokenSupply`,
    method: 'GET',
    params: {
      includePrice: true,
    },
  }).then((resp: any) => {
    return resp?.data || [];
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

export type DailyVolumeByAssetsApiItem = {
  volumeRows: any[];
  tradesRows: any[];
  symbols: string[];
};

export const fetchDailyVolumeByAssets = (code?: string) => {
  return axiosHub({
    url: `/api/dashboard/ondo/getDailyVolumeByAssets`,
    method: 'GET',
    params: {
      tokenSymbol: code,
    },
  }).then((resp: any) => {
    const apiData = resp.data || [];
    return apiData.map((item: any) => {
      return {
        ...item,
        date: item.date.replace(' 00:00:00.000 UTC', ''),
      };
    });
  });
};

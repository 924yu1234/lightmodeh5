import axiosHub from 'js/utils/axiosHub';

export const fetchTokenMeta = (symbol: string) => {
  return axiosHub({
    url: `/api/token/ondo/${symbol}`,
    method: 'GET',
  }).then((resp: any) => {
    return resp.data;
  });
};

export const fetchNews = (ticker: string) => {
  let _ticker = ticker;
  if (_ticker === 'GOOGL') {
    _ticker = 'GOOG';
  }
  return axiosHub({
    url: `/api/token/news/${_ticker}`,
    method: 'GET',
  }).then((resp: any) => {
    return resp.data;
  });
};

export type DailyTokenSupplyForSingleTokenApiItem = {
  date: string;
  name: string;
  daily_supply: number;
  token_symbol: string;
  aum_usd: number;
  global_tvl_usd: number;
};

export const getDailyTokenSupplyForSingleToken = (symbol?: string) => {
  return axiosHub({
    url: `/api/dashboard/ondo/getDailyTokenSupply`,
    method: 'GET',
    params: {
      tokenCode: symbol,
      includePrice: true,
    },
  }).then((resp: any) => {
    return resp?.data || [];
  });
};

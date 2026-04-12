import axiosHub from 'js/utils/axiosHub';

const decodeHtmlEntities = (text: string) => {
  const doc = new DOMParser().parseFromString(text, 'text/html');
  return doc.documentElement.textContent;
};

export const fetchTokenMeta = (code: string) => {
  return axiosHub({
    url: `/api/token/meta/${code}`,
    method: 'GET',
  }).then((resp: any) => {
    const data = resp.data;
    const name = decodeHtmlEntities(data.name);
    return {
      ...data,
      name,
    };
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
  symbol: string;
  name: string;
  token_mint_address: string;
  raw_supply: number;
  price_usd: number;
  aum_usd: number;
};

export const getDailyTokenSupplyForSingleToken = (code?: string) => {
  return axiosHub({
    url: `/api/dashboard/getDailyTokenSupply`,
    method: 'GET',
    params: {
      tokenCode: code,
      includePrice: true,
    },
  }).then((resp: any) => {
    return resp?.data || [];
  });
};

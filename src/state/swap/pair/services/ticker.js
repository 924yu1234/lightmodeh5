import { multiply } from 'src/utils/numberUtils';

import axios from 'js/utils/axios';
import digit from 'js/utils/digit';

export function getSwapPairTicker({ pairId }) {
  return axios({
    method: 'GET',
    url: '/order-book-ws-api/intent/ticker',
    params: {
      pair_id: pairId,
    },
  }).then((resp) => {
    const data = resp.data;
    return {
      ...data,
      dex: data?.market || '--',
      takerFee: data?.taker_fee,
      pairId: data?.pair_id,
      baseToken: convertToken(data?.base_token),
      marketCap: data.market_capacity,
      liquidity: data.liquidity,
      poolVolume: data.pool_volume,
      quoteToken: convertToken(data?.quote_token),
    };
  });
}

export function convertToken(token) {
  return {
    chain: token?.chain,
    name: token?.name,
    code: token?.code,
    symbol: token?.symbol,
    decimals: token?.decimals,
    token_id: token?.token_id,
    icon: token?.icon,
    id: token?.token_id,
    website: getFormattedWebsite(token?.website),
    twitter: getFormattedWebsite(token?.twitter),
    telegram: getFormattedWebsite(token?.telegram),
    discord: getFormattedWebsite(token?.discord),
    is_whitelist: !!token?.is_whitelist,
  };
}

function getFormattedWebsite(website) {
  if (!website) return undefined;
  return website.startsWith('http') ? website : `https://${website}`;
}

// TODO
export function wsToSwapPairTicker({ data }) {
  const newData = {
    last_price: data?.c,
    price_change: data?.p,
    price_change_percent: data?.P,
    high_price: data?.h,
    low_price: data?.l,
    volume: data?.v,
    quote_volume: data?.q,
    base_token_price: data?.s,
    quote_token_price: data?.S,
    base_token_risk_price: data?.r,
    quote_token_risk_price: data?.R,
  };
  if (newData?.last_price && newData?.quote_token_price) {
    newData.pair_base_token_price = multiply(
      newData?.last_price,
      newData.quote_token_price
    );
  }
  if (newData.base_token_risk_price === '0') {
    newData.base_token_risk_price = data.base_token_price;
  }
  newData.base_token_price = digit.format(
    newData.last_price * newData.quote_token_price,
    '0.##'
  );
  return newData;
}

export function getSwapPairBlacklist({ chain, code }) {
  return axios({
    method: 'POST',
    url: '/order-book-api/intent/restrictTokens',
    data: {
      tokens: [{ chain, address: code }],
    },
  }).then((resp) => {
    const { restrict_list } = resp.data || {};
    return restrict_list || [];
  });
}

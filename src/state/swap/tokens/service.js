import axios from 'js/utils/axios';

import { convertToken } from '../pair/services/ticker';

export function fetchSwapDefaultTokens() {
  return axios({
    method: 'GET',
    url: '/order-book-api/intent/exchange/tokens',
    params: {
      limit: 1000,
    },
  }).then((resp) => {
    return (resp?.data?.tokens || []).map((d) => ({
      ...d,
      ...convertToken(d),
      id: d.token_id,
      isDefaultToken: d.is_list_token,
    }));
  });
}

export function quickSearchSwapTokens({ text = '', chainName = '' }) {
  return axios({
    method: 'GET',
    url: '/order-book-api/intent/tokens/quickSearch',
    params: {
      text: text?.toLowerCase(),
      chain_name: chainName || undefined,
    },
  }).then((resp) => {
    const tokens = resp?.data?.tokens || [];
    return {
      list: (tokens || []).map((d) => convertToken(d)),
    };
  });
}

export function searchSwapTokens({
  text = '',
  ids = [],
  offset = 0,
  limit = 100,
}) {
  const params = {
    limit,
    offset,
    text: text?.toLowerCase(),
    token_id_list: ids.join(','),
  };
  return axios({
    method: 'GET',
    url: '/order-book-api/intent/tokens/search',
    params,
  }).then((resp) => {
    const tokens = resp?.data?.tokens || [];
    return {
      list: (tokens || []).map((d) => convertToken(d)),
    };
  });
}

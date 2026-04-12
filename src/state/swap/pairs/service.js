import { useCallback } from 'react';
import axiosO from 'axios';
import { trim } from 'lodash';

import { DG_API, SWAP_PRICE_DECIMAL } from 'src/constants/dex';

import axios from 'js/utils/axios';
import { isNumber, maxEffectiveNumber_price } from 'js/utils/numberUtils';

import { convertToken } from '../pair/services/ticker';

export const useFetchAllSwapPairs = () => {
  const pageSize = 1000;
  const fetchPairs = useCallback(
    ({ hasNext, preList = [], current = 1, version }) => {
      return new Promise((resolve) => {
        if (!hasNext) {
          resolve(preList);
          return;
        }
        fetchSwapPairs({
          current,
          pageSize,
          version,
        }).then((resp) => {
          resolve(
            fetchPairs({
              hasNext: resp.hasNext,
              version: resp.version,
              preList: preList.concat(resp.list),
              current: current + 1,
            })
          );
        });
      });
    },
    []
  );

  return useCallback(() => {
    return fetchPairs({
      hasNext: true,
      current: 1,
      preList: [],
    }).then((resp) => {
      return resp;
    });
  }, [fetchPairs]);
};

// 当前只返回前1000条数据
export function fetchSwapPairs({ pageSize = 100, current = 0 }) {
  return axios({
    method: 'GET',
    url: '/order-book-api/intent/tradePairs?type=hotPairs',
    params: {
      limit: pageSize,
      offset: (current - 1) * pageSize,
    },
  }).then((resp) => {
    const { pairs = [], total } = resp.data ?? {};
    return {
      list: (pairs || []).map((pair, i) => ({
        ...convertSwapPair(pair),
        index: i,
      })),
      total,
      hasNext: false,
    };
  });
}

export function searchSwapPairs({ text = '', baseTokenId = undefined, chain }) {
  return axios({
    method: 'GET',
    url: '/order-book-api/intent/pairs/search',
    params: {
      text: trim(text),
      base_token_id: baseTokenId,
      chain_name: chain === 'all' ? undefined : chain,
    },
  })
    .then((resp) => {
      const { pairs = [], third_party_err } = resp.data ?? {};
      return {
        pairs: (pairs || []).map((pair) => convertSwapPair(pair)),
        third_party_err: (pairs || [])?.length === 0 && third_party_err,
      };
    })
    .catch(() => {
      return {
        pairs: [],
        third_party_err: true,
      };
    });
}

export function quickSearchSwapPairs({ text = '', chain }) {
  return axios({
    method: 'GET',
    url: '/order-book-api/intent/pairs/quickSearch',
    params: {
      text: trim(text),
      chain_name: chain === 'all' ? undefined : chain,
    },
  })
    .then((resp) => {
      const { pairs = [], third_party_err } = resp.data ?? {};
      return {
        pairs: (pairs || []).map((pair) => convertSwapPair(pair)),
        third_party_err: (pairs || [])?.length === 0 && third_party_err,
      };
    })
    .catch(() => {
      return {
        pairs: [],
        third_party_err: true,
      };
    });
}

export function convertSwapPair(pair = {}) {
  const baseToken = pair.base_token;
  const quoteToken = pair.quote_token;
  return {
    isSwapPair: true,
    price: Number(pair.price),
    price_display: maxEffectiveNumber_price(pair.price, SWAP_PRICE_DECIMAL, {
      groupSeparator: true,
      precision: '#',
      isStable: pair?.is_stable,
    }),
    price_change: isNumber(pair.percent)
      ? Number(pair.price) -
        Number(pair.price) / (1 + Number(pair.percent) / 100)
      : '',
    marketCap: pair.market_cap,
    market_cap: pair.market_cap,
    liquidity: pair.liquidity,
    poolVolume: pair.pool_volume,
    change: isNumber(pair.percent) ? Number(pair.percent) : '',
    percent: isNumber(pair.percent) ? Number(pair.percent) : '',
    pairId: pair.pair_id,
    baseTokenId: baseToken.token_id,
    baseToken: convertToken(baseToken),
    quoteTokenId: quoteToken.token_id,
    quoteToken: convertToken(quoteToken),
    market: `${baseToken.symbol}/${quoteToken.symbol}`,
    txns: isNumber(pair.tx_volume) ? Number(pair.tx_volume) : '',
    time: Date.now(),
    pool_address: pair.pool_address,
  };
}

export function checkSwapPair({ pairId, baseId, baseCode, chain }) {
  return axios({
    method: 'GET',
    url: '/order-book-api/intent/pair',
    params: {
      pair_id: pairId,
      base_token_id: baseId,
      base_token_code: baseCode,
      chain_name: chain,
    },
  }).then((resp) => {
    const { pair_id, base_token, quote_token } = resp.data || {};
    return {
      pairId: pair_id,
      baseToken: convertToken(base_token),
      quoteToken: convertToken(quote_token),
    };
  });
}

export function wsToSwapPair({ data }) {
  return data.reduce((re, pair) => {
    return {
      ...re,
      [pair.i]: {
        price: Number(pair.P),
        price_display: maxEffectiveNumber_price(pair.P, 5, {
          groupSeparator: true,
          precision: '#',
          isStable: pair?.is_stable,
        }),
        percent: Number(pair.p),
        change: Number(pair.p),
        poolVolume: Number(pair.v),
      },
    };
  }, {});
}

export function checkCMCPair({ key }) {
  return axiosO({
    baseURL: DG_API,
    method: 'GET',
    url: `/cmc/orderbook`,
    params: {
      market_pair: key,
      depth: 10,
    },
  }).then((resp) => {
    const { base_token, quote_token } = resp.data || {};
    return {
      base_token: convertToken(base_token),
      quote_token: convertToken(quote_token),
    };
  });
}

export function checkPairs({ data = [] }) {
  return axios({
    method: 'POST',
    url: `/order-book-api/intent/selectPairs`,
    data: {
      intent_select_pairs: data,
    },
  }).then((resp) => {
    const { pairs = [] } = resp.data ?? {};
    return {
      list: (pairs || []).map((pair, i) => ({
        ...convertSwapPair(pair),
        index: i,
      })),
    };
  });
}

export function getPairsByTypes({ type = '' }) {
  return axios({
    method: 'GET',
    url: `/order-book-api/intent/tradePairs?type=${type}`,
  }).then((resp) => {
    const { pairs = [] } = resp.data ?? {};
    return {
      list: (pairs || []).map((pair, i) => ({
        ...convertSwapPair(pair),
        index: i,
      })),
    };
  });
}

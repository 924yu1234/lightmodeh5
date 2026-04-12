import axios from 'js/utils/axios';

export function fetchInfo() {
  return axios({
    method: 'GET',
    url: '/order-book-api/exchange/info',
  }).then((resp) => {
    return resp.data;
  });
}

export function fetchEnclavaInfo() {
  return axios({
    method: 'GET',
    url: '/order-book-api/user/enclave/info',
  }).then((resp) => {
    const data = resp.data ?? {};
    return {
      exchangeInfo: data.enclave_exchange_info,
      time: data.enclave_exchange_time,
      signature: data.enclave_exchange_signature,
      is_region_code: data.is_region_code,
      disabled_region_code_info: data.disabled_region_code_info,
      region_code: data.region_code,
    };
  });
}

export function fetchChainInfo() {
  return axios({
    method: 'GET',
    url: '/order-book-api/intent/chains',
  }).then((resp) => {
    const { chains } = resp.data ?? {};
    return (chains || [])
      .filter((d) => d.gas_token?.token_id)
      .map((d) => {
        const { gas_token, quote_token } = d;
        return {
          ...d,
          chain: d.chain_name,
          chainCode: d.chain_code,
          isFungibleChain: d.is_support_fungible_usdc,
          allowSwap: d.allow_swap,
          gasToken: {
            id: gas_token?.token_id,
            chain: gas_token?.chain,
            code: gas_token?.code,
            symbol: gas_token?.symbol,
            name: gas_token?.name,
            decimals: gas_token?.decimals,
            icon: gas_token?.icon,
          },
          quoteToken: {
            id: quote_token?.token_id,
            chain: quote_token?.chain,
            code: quote_token?.code,
            symbol: quote_token?.symbol,
            name: quote_token?.name,
            decimals: quote_token?.decimals,
            icon:
              quote_token?.symbol === 'USDC'
                ? 'https://mainnet-cdn.degate.com/token/USDC.png'
                : quote_token?.icon,
          },
        };
      });
  });
}

export function fetchChainConfig() {
  return axios({
    method: 'GET',
    url: '/intent-omni/get_app_config_template',
  }).then((resp) => {
    return resp.data;
  });
}

export function fetchConfigs(key) {
  return axios({
    url: `/order-book-api/clientDisplayConfig`,
    method: 'GET',
    params: {
      key,
    },
  }).then((resp) => {
    const { data } = resp;
    return data?.value ? JSON.parse(data.value) : undefined;
  });
}

export function fetchConfigsByKeys(keys = []) {
  const normalizedKeys = (keys || []).filter(Boolean);
  if (!normalizedKeys.length) {
    return Promise.resolve([]);
  }

  return axios({
    url: `/order-book-api/clientDisplayConfigsByKeys`,
    method: 'POST',
    data: {
      keys: normalizedKeys,
    },
  }).then((resp) => {
    const list = resp?.data || [];
    return (list || []).map((d) => {
      const value = JSON.parse(d.value);
      return {
        ...d,
        ...value,
      };
    });
  });
}

export function fetchConfigsByType(type) {
  return axios({
    url: `/order-book-api/clientDisplayConfigs`,
    method: 'GET',
    params: {
      type,
      size: 100,
      page: 1,
    },
  }).then((resp) => {
    const { list, total } = resp.data;
    return {
      list: (list || []).map((d) => {
        const value = JSON.parse(d.value);
        return {
          ...d,
          ...value,
        };
      }),
      total,
    };
  });
}

export function fetchGasPaymentCandidates() {
  return axios({
    method: 'GET',
    url: '/order-book-api/intent/gas_pay_candidates',
  }).then((resp) => {
    const { gas_payment_candidates } = resp.data ?? {};
    return (gas_payment_candidates || []).map((item) => {
      return {
        ...item,
        id: item.token_id,
      };
    });
  });
}

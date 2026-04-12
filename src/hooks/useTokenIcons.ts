import useSWR from 'swr';

import axios from 'src/utils/axios';

// Types
export interface TokenIconRequest {
  chain: string;
  address: string;
}

export interface TokenIconResponse {
  chain: string;
  address: string;
  url: string;
}

export interface TokenIconsResponse {
  code: number;
  data: {
    tokens: TokenIconResponse[];
  };
}

// Global SWR configuration
const SWR_CONFIG = {
  refreshWhenHidden: false, // Pause auto refresh when window is not focused
  revalidateOnFocus: false, // Don't revalidate on focus for icon URLs
  revalidateOnReconnect: true,
  revalidateOnMount: true,
};

// Fetcher function for batch token icons
const fetchTokenIcons = async (
  tokens: TokenIconRequest[]
): Promise<TokenIconsResponse> => {
  const response: any = await axios({
    method: 'POST',
    url: '/order-book-api/intent/listTokenIcons',
    data: {
      tokens,
    },
  });
  return response.data;
};

// Custom hook for batch fetching token icons
export const useTokenIcons = (tokens: TokenIconRequest[]) => {
  // Create a stable key for SWR based on token list
  const key =
    tokens?.length > 0
      ? `token-icons-${JSON.stringify(
          tokens.sort((a, b) =>
            `${a.chain}-${a.address}`.localeCompare(`${b.chain}-${b.address}`)
          )
        )}`
      : null;

  return useSWR<TokenIconsResponse>(key, () => fetchTokenIcons(tokens), {
    ...SWR_CONFIG,
    refreshInterval: 0, // Icon URLs don't change frequently, no auto refresh needed
  });
};

// Helper hook for single token icon
export const useTokenIcon = (chain: string, address: string) => {
  const tokens = chain && address ? [{ chain, address }] : [];
  const { data, error, isLoading } = useTokenIcons(tokens);

  const iconUrl = data?.data?.tokens?.[0]?.url;

  return {
    data: iconUrl,
    error,
    isLoading,
  };
};

// Helper function to create a map of token icons for easy lookup
export const createTokenIconMap = (
  tokens: TokenIconResponse[]
): Map<string, string> => {
  const map = new Map<string, string>();
  tokens.forEach((token) => {
    const key = `${token.chain}-${token.address}`;
    map.set(key, token.url);
  });
  return map;
};

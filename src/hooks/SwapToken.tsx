import { useCallback, useEffect, useMemo, useState } from 'react';

import {
  useSaveLocaleSwapTokens,
  useSwapTokens,
} from 'src/state/swap/tokens/hook';
import { searchSwapTokens } from 'src/state/swap/tokens/service';

import { isEth } from 'js/ethers/utils';
import { isNumber } from 'js/utils/digit';

// search token
// tokenType: [dexToken, chainToken, mainChainToken]
export function useSwapToken({ code }: { code: string }) {
  return useSwapTokenInDex({ code });
}

const now = new Date().valueOf();

// search from locale list
// 如果是缓存token 超过1天则返回undefined
export function useSearchLocaleSwapToken() {
  const allSwapTokens = useSwapTokens();
  return useCallback(
    ({ code, id }: any) => {
      if (!code && !isNumber(id)) {
        return undefined;
      }
      let localeToken;
      if (code) {
        localeToken = allSwapTokens.find(
          (d: any) => code && d.code?.toLowerCase() === code?.toLowerCase()
        );
      } else if (isNumber(id)) {
        localeToken = allSwapTokens.find((d: any) => d.id === id);
      }
      if (localeToken) {
        if (!localeToken.saveLocaleTime) return localeToken;
        if (now - localeToken.saveLocaleTime < 86400000) return localeToken;
        // return localeToken;
      }
      return undefined;
    },
    [allSwapTokens]
  );
}

export function useSwapTokenInDex({ code = '', id }: any) {
  const [resMap, setResMap] = useState({});
  const searchSwapToken = useSearchSwapTokenInDex();

  const cur = useMemo(() => {
    if (!code && !isNumber(id) && !isEth({ code })) {
      return {};
    }
    return (resMap as any)[code] || (resMap as any)[id];
  }, [resMap, code, id]);

  const search = useCallback(() => {
    if (!code && !isNumber(id) && !isEth({ code })) {
      return;
    }
    searchSwapToken({ code, id }).then((resp) => {
      setResMap((pre) => {
        if (code) {
          return {
            ...pre,
            [code]: { loading: false, token: resp },
          };
        }
        return {
          ...pre,
          [id]: { loading: false, token: resp },
        };
      });
    });
  }, [code, id, searchSwapToken]);

  useEffect(() => {
    search();
  }, [search, code]);

  return useMemo(() => {
    if (!cur) return { loading: true };
    return {
      loading: false,
      token: cur.token,
    };
  }, [cur]);
}

export function useSearchSwapTokenInDex() {
  const saveLocaleTokens = useSaveLocaleSwapTokens();
  const searchLocaleToken = useSearchLocaleSwapToken();

  // 查询token后记录本地，24小时内不重复查询
  return useCallback(
    ({ code, id }: any) => {
      const localeToken = searchLocaleToken({ code, id });
      if (localeToken) return Promise.resolve({ ...localeToken, volume: '' });
      if (!code && !isNumber(id) && !isEth({ code })) {
        return Promise.resolve({});
      }

      return searchSwapTokens({ text: code, ids: [id] })
        .then((resp) => {
          const tokens = resp.list;
          if (tokens.length === 1) {
            saveLocaleTokens({ tokens });
          }
          if (code) {
            return tokens.find(
              (t: any) => t.code?.toLowerCase() === code?.toLowerCase()
            );
          }
          return tokens[0];
        })
        .catch(() => {
          return {};
        });
    },
    [saveLocaleTokens, searchLocaleToken]
  );
}

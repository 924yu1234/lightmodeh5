import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { FUNGIBLE_USDC_ID, Type_DAChains } from 'src/da';
import { useWalletWeb3 } from 'src/providers/useWallet';
import { AppState } from 'src/state';
import {
  useChainInfo,
  useFungbileChains,
  useUsdcTokensMap,
} from 'src/state/application/hooks';

import { fetchedSwapTokensWithBalance, saveLocaleSwapTokens } from './reducer';

export function useDefaultSwapTokens() {
  return useSelector((state: AppState) => state.swapTokens.tokens);
}

export function useIsDAChainGasToken({ token }: any) {
  const chainInfo = useChainInfo(token?.chain as Type_DAChains);
  return useMemo(() => {
    const code = token?.code?.toLowerCase();
    if (chainInfo?.gasTokenCode === code) {
      return true;
    }
    return token?.id === FUNGIBLE_USDC_ID;
  }, [token?.code, token?.id, chainInfo?.gasTokenCode]);
}

export function useIsDAUsdc({ token }: any) {
  const usdcTokensMap = useUsdcTokensMap();
  return useMemo(() => {
    if (!token?.code) return false;
    if (token?.id === FUNGIBLE_USDC_ID) return true;
    return (
      usdcTokensMap[token?.chain as Type_DAChains]?.code?.toLowerCase() ===
      token?.code?.toLowerCase()
    );
  }, [token?.chain, token?.id, usdcTokensMap, token?.code]);
}

export function useIsFungibleUsdc({ token }: any) {
  const isDAUsdc = useIsDAUsdc({ token });
  const fungibleChains = useFungbileChains();
  return useMemo(() => {
    return isDAUsdc && fungibleChains.includes(token?.chain as Type_DAChains);
  }, [isDAUsdc, fungibleChains, token?.chain]);
}

export function useSwapTokens() {
  const defaultTokens = useDefaultSwapTokens();
  const localeTokens = useLocaleSwapTokens();
  const tokensWithBalance = useSwapTokensWithBalance();

  const tokens = useCombineTokens(
    defaultTokens,
    tokensWithBalance,
    localeTokens
  );
  const serializeKeys = useMemo(
    () => JSON.stringify(tokens.sort().map((t: any) => `${t.code}`)),
    [tokens]
  );
  return useMemo(() => {
    return tokens;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serializeKeys]);
}

export function useLocaleSwapTokens() {
  const localeTokens = useSelector(
    (state: AppState) => state.swapTokens.localeTokens as any
  );
  return useMemo(() => {
    return Object.values(localeTokens ?? {}) || [];
  }, [localeTokens]);
}

export function useSaveLocaleSwapTokens() {
  const dispatch = useDispatch();

  return useCallback(
    ({ tokens }: any) => {
      dispatch(
        saveLocaleSwapTokens({
          tokens,
        } as any)
      );
    },
    [dispatch]
  );
}

export function useSaveTokensWithBalance() {
  const dispatch = useDispatch();
  const { account } = useWalletWeb3();

  return useCallback(
    ({ tokens }: any) => {
      dispatch(fetchedSwapTokensWithBalance({ tokens, account } as any));
    },
    [dispatch, account]
  );
}
export function useSwapTokensWithBalance() {
  const { account } = useWalletWeb3();
  const tokensWithBalance = useSelector(
    (state: AppState) => state.swapTokens.tokensWithBalance as any
  );
  return useMemo(() => {
    return Object.values((tokensWithBalance ?? {})[account] ?? {}) || [];
  }, [account, tokensWithBalance]);
}

export function useCombineTokens(...arrays: any) {
  return useMemo(() => {
    const tokens: any = [];
    arrays.reduce((re: any, array: any) => {
      array.forEach((token: any) => {
        if (!re[token.id]) {
          tokens.push(token);
        }
        re[token.id] = true;
      });
      return re;
    }, {});
    return tokens;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...arrays]);
}

export function useTokenTags({ code }: { code: string }) {
  const tags = useSelector((state: AppState) => state.swapTokens.tags);
  return useMemo(() => {
    const codeLower = code.toLowerCase();
    return tags[codeLower];
  }, [tags, code]);
}

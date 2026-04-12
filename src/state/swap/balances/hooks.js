import { useCallback, useMemo } from 'react';
import { orderBy as orderByFn } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';

import { TOKEN_USDC } from 'src/constants/consts';
import { FUNGIBLE_USDC_ID, TOKEN_SOL_CODE } from 'src/da';
import { mapToken } from 'src/hooks/useAssets';
import {
  useFungbileChains,
  useShowModal,
  useUsdcTokensMap,
} from 'src/state/application/hooks';
import ModalKeys from 'src/state/application/modalKeys';
import digit from 'src/utils/digit';
import { plus } from 'src/utils/numberUtils';

import useWallet, { useWalletWeb3 } from 'js/providers/useWallet';
import { useDexAccount } from 'js/state/dexAccount/hooks';

import {
  refreshSwapBalance,
  updateExceptedUpdateSwapBalanceTime,
} from './reducer';
import { createDexBalanceKey, formatBalanceDisplay, zeroResult } from './utils';

function _isSwapBalanceLoading({
  account,
  balances,
  hasAccessToken,
  hasSyncDA,
  loadingDexAccount,
  walletStateReady,
}) {
  if (!walletStateReady) {
    return true;
  }
  if (hasSyncDA && !hasAccessToken) {
    return false;
  }
  if (!loadingDexAccount && !hasSyncDA) {
    return false;
  }
  if (!account) {
    return false;
  }

  return (
    !balances[account] ||
    balances[account]?.loading ||
    balances[account]?.loadingUpdate
  );
}

export function useAllSwapBalances() {
  const balances = useSelector((state) => state.swapBalance.balances);
  const { account } = useWalletWeb3();

  return useMemo(() => {
    const cur = balances[account];
    if (!cur) return [];
    return Object.values(cur)
      .filter((d) => d.data)
      .map((d) => ({ ...d.data, ...d.data?.token }))
      .filter((d) => d);
  }, [balances, account]);
}

export function useSwapBalance({ token }) {
  const [tokenBalance] = useSwapBalances({ tokens: token ? [token] : [] });
  return useMemo(() => {
    return tokenBalance;
  }, [tokenBalance]);
}

export function useSwapBalances({ tokens }) {
  const dexAccount = useDexAccount();
  const { walletStateReady } = useWallet();
  const balances = useSelector((state) => state.swapBalance.balances);
  const { account } = useWalletWeb3();
  const formatedTokens = useMemo(() => {
    return tokens.reduce((re, token) => {
      if (token?.code) {
        re.push({
          ...token,
          balanceKey: createDexBalanceKey({ token, account }),
        });
      }
      return re;
    }, []);
  }, [tokens, account]);

  const formatedTokensStr = useMemo(() => {
    return JSON.stringify(tokens);
  }, [tokens]);

  return useMemo(() => {
    return formatedTokens.map((token) => {
      const loading = _isSwapBalanceLoading({
        account,
        balances,
        hasAccessToken: dexAccount?.hasAccessToken,
        hasSyncDA: dexAccount?.hasSyncDA,
        loadingDexAccount: dexAccount?.loading,
        walletStateReady: walletStateReady !== false,
      });
      const result = !loading
        ? balances[account]?.[token?.balanceKey]?.data ?? zeroResult
        : undefined;
      const balance = result;
      return { ...token, ...balance, loadingBalance: loading };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    balances,
    formatedTokensStr,
    account,
    dexAccount?.hasAccessToken,
    dexAccount?.hasSyncDA,
    dexAccount?.loading,
    walletStateReady,
  ]);
}

export function useIsLoadingDABalance() {
  const dexAccount = useDexAccount();
  const { walletStateReady } = useWallet();
  const balances = useSelector((state) => state.swapBalance.balances);
  const { account } = useWalletWeb3();
  return useMemo(() => {
    return _isSwapBalanceLoading({
      account,
      balances,
      hasAccessToken: dexAccount?.hasAccessToken,
      hasSyncDA: dexAccount?.hasSyncDA,
      loadingDexAccount: dexAccount?.loading,
      walletStateReady: walletStateReady !== false,
    });
  }, [
    balances,
    account,
    dexAccount?.hasAccessToken,
    dexAccount?.hasSyncDA,
    dexAccount?.loading,
    walletStateReady,
  ]);
}

export function useRefreshSwapBalanceIndex() {
  return useSelector((state) => state.swapBalance.refreshSwapBalanceIndex);
}

export function useRefreshSwapBalance() {
  const dispatch = useDispatch();
  return useCallback(
    ({ refreshIndex } = {}) => {
      dispatch(refreshSwapBalance({ refreshIndex }));
    },
    [dispatch]
  );
}

export function useSwapBalanceTokens() {
  const allSwapBalances = useAllSwapBalances();
  return useMemo(() => {
    return allSwapBalances
      .filter((d) => d.chain !== 'ETH')
      .map((d) => {
        const { available, availableDisplay, frozenOrder, frozenWithdraw } = d;
        const token = d.token || {};
        return {
          ...d,
          chain: token.chain,
          id: token?.id,
          icon: token.icon,
          code: token.code,
          decimals: token.decimals,
          symbol: token.symbol,
          available: available || '0',
          availableDisplay: availableDisplay || '0',
          availableNumber: Number(available),
          locked: d.locked || '0',
          lockedDisplay: d.lockedDisplay || '0',
          isDefaultToken: token.is_list_token,
          wrap: token.wrap,
          frozenOrder,
          frozenWithdraw,
        };
      });
  }, [allSwapBalances]);
}

export function useSwapBalancesFormated({ tokens }) {
  const balances = useSwapBalances({ tokens });
  return useMemo(() => {
    return balances.map((d) => {
      const { available, availableDisplay } = d;
      return {
        id: d?.id,
        icon: d.icon,
        code: d.code,
        decimals: d.decimals,
        symbol: d.symbol,
        name: d.name,
        available,
        availableDisplay,
        availableNumber: Number(d.availableNumber),
        isDefaultToken: d.is_list_token,
      };
    });
  }, [balances]);
}

// 检查dexBalance更新时间
export function useCheckSwapBalanceUpdateTime() {
  const dispatch = useDispatch();
  return useCallback(
    ({ timestamp }) => {
      dispatch(updateExceptedUpdateSwapBalanceTime({ timestamp }));
    },
    [dispatch]
  );
}

// 期望更新时间
export function useExceptedRefreshSwapBalanceTime() {
  return useSelector((state) => state.swapBalance.excepteRefreshTime);
}

export function useFungibleUsdc() {
  const swapBalances = useSwapBalanceTokens();
  const fungibleChains = useFungbileChains();
  const usdcTokensMap = useUsdcTokensMap();

  const balances = useMemo(() => {
    return fungibleChains.map((chain) => {
      const token = usdcTokensMap[chain];
      const curSwapBalance = swapBalances.find(
        (d) =>
          d.code?.toLowerCase() === token?.code?.toLowerCase() &&
          d.chain === chain
      );

      if (curSwapBalance) {
        const total = curSwapBalance?.available;
        return {
          ...zeroResult,
          ...token,
          ...curSwapBalance,
          availableValueDisplay: formatBalanceDisplay(
            curSwapBalance?.available ?? 0,
            6
          ),
          chain,
          total,
          totalNumber: Number(total),
          totalDisplay: formatBalanceDisplay(total, 6),
        };
      }
      return { chain, ...token, ...zeroResult };
    });
  }, [swapBalances, fungibleChains, usdcTokensMap]);

  const availableTotal = useMemo(() => {
    if (!balances.length) return '0';
    const available = balances.reduce((re, d) => {
      return plus(re, d.available ?? 0);
    }, 0);

    return digit.formatWithDecimals(available, TOKEN_USDC?.decimals, {
      floor: true,
    });
  }, [balances]);

  const balanceTotal = useMemo(() => {
    if (!balances.length) return '0';
    const total = balances.reduce((re, d) => {
      return plus(re, d.total ?? 0);
    }, 0);

    return digit.formatWithDecimals(total, TOKEN_USDC?.decimals, {
      floor: true,
    });
  }, [balances]);

  return useMemo(() => {
    return mapToken({
      ...TOKEN_USDC,
      id: FUNGIBLE_USDC_ID,
      is_list_token: true,
      locked: '0',
      lockedDisplay: '0',
      available: availableTotal,
      availableDisplay: formatBalanceDisplay(availableTotal, 6),
      total: balanceTotal,
      totalDisplay: formatBalanceDisplay(balanceTotal, 6),
      price: 1,
      balances: orderByFn(balances, ['totalNumber', 'chain'], ['desc', 'asc']),
      availableValueDisplay: formatBalanceDisplay(availableTotal, 6),
    });
  }, [balances, availableTotal, balanceTotal]);
}

export function useDexBalanceSol() {
  const balances = useAllSwapBalances();
  return useMemo(() => {
    return (
      balances.find(
        (d) => d.chain === 'SOLANA' && d.code === TOKEN_SOL_CODE
      ) || {
        ...zeroResult,
        symbol: 'SOL',
        chain: 'SOLANA',
        code: TOKEN_SOL_CODE,
      }
    );
  }, [balances]);
}

export function useUsdcBalance({ token }) {
  const balances = useAllSwapBalances();
  const isLoading = useIsLoadingDABalance();
  return useMemo(() => {
    if (!token) return undefined;
    if (isLoading) {
      return {
        ...token,
        ...zeroResult,
      };
    }
    const balance = balances.find(
      (d) => d.code === token?.code && d.chain === token.chain
    );
    return {
      ...token,
      ...(balance || zeroResult),
    };
  }, [balances, token, isLoading]);
}

export function useCheckTryBalance() {
  const showModal = useShowModal();
  return useCallback(
    (tryResp, onSelectPayGasToken, { isSwap = false, balance = '0' } = {}) => {
      if (!tryResp.is_gas_pay_token_enough) {
        if (isSwap) {
          const { gasNeedToken, gasTokenIsOrderOutToken } = tryResp;
          if (
            gasNeedToken &&
            gasTokenIsOrderOutToken &&
            gasNeedToken?.code !== 'BTC'
          ) {
            showModal({
              modal: ModalKeys.insufficientGasPayTokenBalanceTipsForSwap,
              tryResp,
              balance,
            });
            return false;
          }
        }
        showModal({
          modal: ModalKeys.insufficientGasPayTokenBalanceTips,
          tryResp,
          onSelectPayGasToken,
        });
        return false;
      }
      return true;
    },
    [showModal]
  );
}

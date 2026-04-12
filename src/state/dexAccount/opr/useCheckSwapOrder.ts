import { useCallback, useMemo } from 'react';
import { formatUnits } from '@ethersproject/units';

import { OrderDirs } from 'src/constants/interface';
import { TOKEN_SOL_CODE } from 'src/da';
import { useInfo } from 'src/state/application/hooks';
import { useSwapBalance } from 'src/state/swap/balances/hooks';
import { useCurrentSwapPair } from 'src/state/swap/pair/hooks';
import {
  useSwapQuoteTokenBalance,
  useSwapSellMaxBalance,
  useSwapTradeInfo,
} from 'src/state/swap/trade/hooks';

import { useIntl } from 'js/locals';
import { useDexAccount } from 'js/state/dexAccount/hooks';
import {
  isLessOrEqualThan,
  isLessThan,
  isNumber,
  minus,
} from 'js/utils/numberUtils';

export function useSwapSolTips() {
  const { baseToken } = useCurrentSwapPair();
  const { orderDir, baseAmount } = useSwapTradeInfo();
  const baseBalance = useSwapBalance({ token: baseToken });
  const { solBalanceLimit } = useInfo();
  const intl = useIntl();
  const available = baseBalance?.available;

  return useMemo(() => {
    if (orderDir === OrderDirs.BUY) {
      return '';
    }
    if (baseToken?.code !== TOKEN_SOL_CODE || baseToken?.chain !== 'SOLANA') {
      return '';
    }
    if (!isNumber(available)) return '';
    if (!isNumber(baseAmount) || Number(baseAmount) < 0) return '';
    if (!solBalanceLimit) return '';
    if (Number(available) < Number(solBalanceLimit)) {
      if (isLessThan(available, baseAmount)) return intl.insufficient_balance;
      return intl.minimum_XXX.replace(
        '$XXX',
        `${solBalanceLimit} ${baseToken?.symbol}`
      );
    }
    if (Number(available) >= Number(solBalanceLimit)) {
      if (!isNumber(baseAmount) || Number(baseAmount) < 0) return '';
      const max = minus(available, solBalanceLimit);
      if (isLessThan(max, baseAmount))
        return intl.maximum_XXX.replace('$XXX', `${max} ${baseToken?.symbol}`);
      return '';
    }
    return '';
  }, [baseToken, orderDir, solBalanceLimit, available, baseAmount, intl]);
}

export function useSwapBtcTips() {
  const { baseToken } = useCurrentSwapPair();
  const { orderDir, baseAmount } = useSwapTradeInfo();
  const baseBalance = useSwapBalance({ token: baseToken });
  const { btcSwapBalanceLimit } = useInfo();
  const intl = useIntl();
  const available = baseBalance?.available;

  return useMemo(() => {
    if (orderDir === OrderDirs.BUY) {
      return '';
    }
    if (baseToken?.code !== 'BTC' || baseToken?.chain !== 'BITCOIN') {
      return '';
    }
    if (!isNumber(available)) return '';
    if (!isNumber(baseAmount) || Number(baseAmount) < 0) return '';
    if (!btcSwapBalanceLimit) return '';
    // 余额大于等于最小金额
    if (Number(available) < Number(btcSwapBalanceLimit)) {
      if (isLessThan(available, baseAmount)) return intl.insufficient_balance;
      return intl.minimum_XXX.replace(
        '$XXX',
        `${btcSwapBalanceLimit} ${baseToken?.symbol}`
      );
    }
    // 输入金额要大于等于最小金额
    if (Number(baseAmount) < Number(btcSwapBalanceLimit)) {
      return intl.minimum_XXX.replace(
        '$XXX',
        `${btcSwapBalanceLimit} ${baseToken?.symbol}`
      );
    }
    // 剩余余额大于等于最小金额
    if (Number(available) >= Number(btcSwapBalanceLimit)) {
      if (!isNumber(baseAmount) || Number(baseAmount) < 0) return '';
      const max = minus(available, btcSwapBalanceLimit);
      if (isLessThan(max, baseAmount))
        return intl.maximum_XXX.replace('$XXX', `${max} ${baseToken?.symbol}`);
      return '';
    }
    return '';
  }, [baseToken, orderDir, btcSwapBalanceLimit, available, baseAmount, intl]);
}

export function useCheckSwapOrder() {
  const intl = useIntl();
  const { orderDir, baseAmount, quoteAmount, estimating, tryResp, usdcToken } =
    useSwapTradeInfo();
  const dexAccount = useDexAccount();
  const solTips = useSwapSolTips();
  const btcTips = useSwapBtcTips();
  // 单链版本判断余额
  const quoteTokenBalance = useSwapQuoteTokenBalance();
  const sellMaxBalance = useSwapSellMaxBalance();

  const maxTips = useMemo(() => {
    if (!tryResp?.is_bridge_limited) {
      return '';
    }
    if (!quoteAmount || !isNumber(quoteAmount) || Number(quoteAmount) <= 0) {
      return '';
    }
    const volume = tryResp?.max_bridge_amount;
    if (!isNumber(volume) || Number(volume) <= 0) {
      return '';
    }
    const amount = formatUnits(volume, usdcToken?.decimals);
    if (!isNumber(amount) || Number(amount) <= 0) {
      return '';
    }
    return intl.maximum_XXX.replace('$XXX', `${amount} ${usdcToken?.symbol}`);
  }, [tryResp, usdcToken, intl, quoteAmount]);

  const baseAmountError = useMemo(() => {
    return !isNumber(baseAmount) || isLessOrEqualThan(baseAmount, 0);
  }, [baseAmount]);

  const quoteAmountError = useMemo(() => {
    return !isNumber(quoteAmount) || isLessOrEqualThan(quoteAmount, 0);
  }, [quoteAmount]);

  const liquityError = useMemo(() => {
    if (orderDir === OrderDirs.BUY && baseAmount === '0') {
      return true;
    }
    if (orderDir === OrderDirs.SELL && quoteAmount === '0') {
      return true;
    }
    return false;
  }, [baseAmount, quoteAmount, orderDir]);

  const baseBalanceErr = useMemo(() => {
    return (
      orderDir === OrderDirs.SELL &&
      dexAccount.hasAccessToken &&
      isLessThan(sellMaxBalance, baseAmount)
    );
  }, [dexAccount.hasAccessToken, orderDir, baseAmount, sellMaxBalance]);

  const quoteBalanceErr = useMemo(() => {
    return (
      orderDir === OrderDirs.BUY &&
      dexAccount.hasAccessToken &&
      isLessThan(quoteTokenBalance, quoteAmount)
    );
  }, [orderDir, dexAccount.hasAccessToken, quoteAmount, quoteTokenBalance]);

  const errTips = useMemo(() => {
    if (liquityError) {
      return intl.insufficient_pool_liquidity;
    }
    if (baseAmountError || quoteAmountError) return intl.please_enter_amount;
    if (solTips) {
      return solTips;
    }
    if (btcTips) {
      return btcTips;
    }
    return '';
  }, [baseAmountError, quoteAmountError, liquityError, intl, solTips, btcTips]);

  return {
    baseAmountError,
    quoteAmountError,
    baseBalanceErr,
    quoteBalanceErr,
    liquityError,
    solTips,
    maxTips,
    btcTips,

    errTips,
    disabled:
      !!errTips ||
      estimating ||
      !baseAmount ||
      !quoteAmount ||
      !!solTips ||
      !!maxTips ||
      !!btcTips,
  };
}

export function useCheckSwapOrderMinTips() {
  return useCallback(() => {
    // if (orderDir === OrderDirs.BUY && isLessThan(quoteAmount, minSwapAmount)) {
    //   showModal({
    //     modal: ModalKeys.tips_SwapMinTips,
    //     minSwapAmount,
    //     orderDir,
    //   });
    //   return false;
    // }
    // if (
    //   orderDir === OrderDirs.SELL &&
    //   isLessThan(minimumReceive, minSwapSellAmount)
    // ) {
    //   showModal({
    //     modal: ModalKeys.tips_SwapMinTips,
    //     minSwapAmount: minSwapSellAmount,
    //     orderDir,
    //   });
    //   return false;
    // }
    return true;
  }, []);
}

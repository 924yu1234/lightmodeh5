import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { SWAP_AMOUNT_DECIMAL } from 'src/constants/dex';
import { OrderDirs, Token } from 'src/constants/interface';
import { Type_DAChains } from 'src/da';
import { parseUnits } from 'src/ethers/utils';
import useWallet from 'src/providers/useWallet';
import { AppState } from 'src/state';
import { useChainInfo, useInfo } from 'src/state/application/hooks';
import { useDexAccount } from 'src/state/dexAccount/hooks';
import { useSwapEstimate } from 'src/state/intent/estimateProvider';
import digit from 'src/utils/digit';
import {
  isNumber,
  maxEffectiveNumber,
  minus,
  multiply,
} from 'src/utils/numberUtils';

import { useSwapBalances, useUsdcBalance } from '../balances/hooks';
import { useCurrentSwapPair, useSwapTickerVal } from '../pair/hooks';
import {
  changeOrderDir,
  refreshEstimate,
  resetSwapTrade,
  typeInput,
} from './reducer';

export function useSwapOrderDir(): OrderDirs {
  return useSelector((state: AppState) => state.swapTrade?.orderDir);
}

export function useChangeSwapOrderDir() {
  const dispatch = useDispatch();
  return useCallback(
    (orderDir: any) => {
      dispatch(changeOrderDir({ orderDir }));
    },
    [dispatch]
  );
}

export function useResetSwapTrade() {
  const dispatch = useDispatch();
  return useCallback(() => {
    dispatch(resetSwapTrade());
  }, [dispatch]);
}

export function useSwapTradeInfo() {
  const { account } = useDexAccount();
  const swapTrade = useSelector((state: AppState) => state.swapTrade);
  const {
    orderDir,
    baseAmount,
    quoteAmount,
    maxSlippage,
    estimating,
    balanceEstimate,
    tryResp,
    usdcToken,
    gasToken,
    isMaxModel,
    isTryingMax,
  } = swapTrade;

  const { baseToken, quoteToken } = useCurrentSwapPair();
  const buyTokenDecimals = useMemo(() => {
    return orderDir === OrderDirs.BUY
      ? baseToken?.decimals
      : quoteToken?.decimals;
  }, [orderDir, baseToken, quoteToken]);

  const sellAmount = useMemo(() => {
    return orderDir === OrderDirs.BUY ? quoteAmount : baseAmount;
  }, [baseAmount, quoteAmount, orderDir]);

  const estimateParamsKey = getEstimateIntentSwapKey({
    isMaxModel: !!isMaxModel,
    baseToken,
    quoteToken,
    orderDir,
    usdcToken,
    sellAmount,
    maxSlippage,
    account,
    gasToken,
  });

  const hasTryResp = useMemo(() => {
    return !estimateParamsKey || tryResp?.key === estimateParamsKey;
  }, [tryResp, estimateParamsKey]);

  return useMemo(() => {
    const buyAmount = orderDir === OrderDirs.BUY ? baseAmount : quoteAmount;

    const minimumReceive = maxEffectiveNumber(
      multiply(buyAmount, minus(1, maxSlippage)),
      SWAP_AMOUNT_DECIMAL,
      {
        maxDecimals: buyTokenDecimals,
        floor: true,
      }
    );

    return {
      orderDir,
      price: tryResp?.price,
      buyAmount,
      baseAmount,
      quoteAmount,
      maxSlippage,
      estimating: estimating || !hasTryResp,
      hasTryResp,
      minimumReceive,
      balanceEstimate,
      tryResp,
      usdcToken,
      gasToken,
      isMaxModel,
      isTryingMax,
    };
  }, [
    orderDir,
    baseAmount,
    quoteAmount,
    maxSlippage,
    estimating,
    buyTokenDecimals,
    balanceEstimate,
    tryResp,
    usdcToken,
    gasToken,
    hasTryResp,
    isMaxModel,
    isTryingMax,
  ]);
}

export function useEstimateParams() {
  const { baseToken, quoteToken } = useCurrentSwapPair();
  const { account, da_owner } = useDexAccount();
  const {
    orderDir,
    baseAmount = '',
    quoteAmount = '',
    estimating,
    maxSlippage,
    usdcToken,
    gasToken,
    isMaxModel,
  } = useSwapTradeInfo();

  const takerFee = useSwapTickerVal('takerFee');

  const { solverAddresses, DAs } = useWallet();
  const quoteTokenBalance = useSwapQuoteTokenBalance();
  const sellMaxBalance = useSwapSellMaxBalance();

  const sellAmount = useMemo(() => {
    if (isMaxModel) {
      return orderDir === OrderDirs.BUY ? quoteTokenBalance : sellMaxBalance;
    }
    return orderDir === OrderDirs.BUY ? quoteAmount : baseAmount;
  }, [
    baseAmount,
    quoteAmount,
    orderDir,
    isMaxModel,
    quoteTokenBalance,
    sellMaxBalance,
  ]);

  const userChainAddress = useMemo(() => {
    return DAs ? DAs[baseToken?.chain as Type_DAChains]?.address : '';
  }, [DAs, baseToken?.chain]);

  const userUsdcTokenAddress = useMemo(() => {
    return DAs ? DAs[usdcToken?.chain as Type_DAChains]?.address : '';
  }, [DAs, usdcToken?.chain]);

  const userQuoteTokenAddress = useMemo(() => {
    return DAs ? DAs[quoteToken?.chain as Type_DAChains]?.address : '';
  }, [DAs, quoteToken?.chain]);

  const solverBaseChainAddressMap = useMemo(() => {
    return solverAddresses
      ? solverAddresses[baseToken?.chain as Type_DAChains]
      : ({} as any);
  }, [solverAddresses, baseToken?.chain]);

  const solverQuoteChainAddressMap = useMemo(() => {
    return solverAddresses
      ? solverAddresses[quoteToken?.chain as Type_DAChains]
      : ({} as any);
  }, [solverAddresses, quoteToken?.chain]);

  const solverUsdcChainAddressMap = useMemo(() => {
    return solverAddresses
      ? solverAddresses[usdcToken?.chain as Type_DAChains]
      : ({} as any);
  }, [solverAddresses, usdcToken?.chain]);

  return useMemo(() => {
    let params: any;
    if (!solverBaseChainAddressMap?.solver) return {};
    if (!usdcToken && orderDir === OrderDirs.BUY) return {};

    const _sellAmount = isNumber(sellAmount) ? sellAmount : '0';
    if (orderDir === OrderDirs.BUY) {
      params = {
        maxSlippage,
        chain: baseToken?.chain || '',
        sellToken: usdcToken,
        buyToken: baseToken,
        sellAmount: _sellAmount,
        sellVolume: parseUnits(
          digit.formatWithDecimals(_sellAmount, usdcToken?.decimals, {
            floor: true,
          }),
          usdcToken?.decimals
        ).toString(),
        buyTokenDecimals: baseToken?.decimals,
        account,
        gasAddress: solverBaseChainAddressMap.gas,
        feeAddress: solverBaseChainAddressMap.solver,
        sellAddress: userUsdcTokenAddress || solverUsdcChainAddressMap.solver,
        buyAddress: userChainAddress || solverBaseChainAddressMap.solver,
        gasToken,
      };
    } else {
      params = {
        maxSlippage,
        chain: baseToken?.chain || '',
        sellToken: baseToken,
        buyToken: quoteToken,
        sellAmount: _sellAmount,
        sellVolume: parseUnits(
          digit.formatWithDecimals(_sellAmount, baseToken?.decimals, {
            floor: true,
          }),
          baseToken?.decimals
        ).toString(),
        buyTokenDecimals: quoteToken?.decimals,
        account,
        gasAddress: solverBaseChainAddressMap.gas,
        feeAddress: solverBaseChainAddressMap.solver,
        sellAddress: userChainAddress || solverBaseChainAddressMap?.solver,
        buyAddress: userQuoteTokenAddress || solverQuoteChainAddressMap?.solver,
        gasToken,
      };
    }

    const key = getEstimateIntentSwapKey({
      isMaxModel: !!isMaxModel,
      baseToken,
      quoteToken,
      orderDir,
      usdcToken,
      sellAmount,
      maxSlippage,
      account,
      gasToken,
    });

    return {
      ...params,
      isMaxModel,
      orderDir,
      takerFee,
      da_owner,
      key,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    maxSlippage,
    orderDir,
    baseToken?.code,
    baseToken?.decimals,
    quoteToken?.decimals,
    quoteToken?.code,
    sellAmount,
    estimating,
    account,
    solverAddresses,
    userChainAddress,
    takerFee,
    da_owner,
    usdcToken,
    gasToken,
    solverBaseChainAddressMap,
    solverQuoteChainAddressMap,
    solverUsdcChainAddressMap,
    userQuoteTokenAddress,
    userUsdcTokenAddress,
  ]);
}

// 买单使用可用余额预估
export function useBuyOrderBalnaceEstimateParams() {
  const quoteTokenBalance = useSwapQuoteTokenBalance();
  const { baseToken, quoteToken } = useCurrentSwapPair();

  const { account, da_owner } = useDexAccount();
  const { maxSlippage, usdcToken, gasToken, isMaxModel } = useSwapTradeInfo();

  const takerFee = useSwapTickerVal('takerFee');

  const { solverAddresses, DAs } = useWallet();

  const userChainAddress = useMemo(() => {
    return DAs ? DAs[baseToken?.chain as Type_DAChains]?.address : '';
  }, [DAs, baseToken?.chain]);

  const userUsdcTokenAddress = useMemo(() => {
    return DAs ? DAs[usdcToken?.chain as Type_DAChains]?.address : '';
  }, [DAs, usdcToken?.chain]);

  return useMemo(() => {
    if (!da_owner || !userChainAddress) return {} as any;
    if (!isNumber(quoteTokenBalance) || Number(quoteTokenBalance) <= 0)
      return {} as any;
    const solverAddress =
      solverAddresses?.[baseToken?.chain as Type_DAChains] ?? {};
    if (!solverAddress || !usdcToken) return {} as any;

    const params = {
      maxSlippage,
      chain: baseToken?.chain || '',
      sellToken: usdcToken,
      buyToken: baseToken,
      buyTokenDecimals: baseToken?.decimals,
      account,
      gasAddress: solverAddress.gas,
      feeAddress: solverAddress.solver,
      sellAddress: userUsdcTokenAddress || solverAddress.solver,
      buyAddress: userChainAddress || solverAddress.solver,
      sellAmount: quoteTokenBalance,
      sellVolume: parseUnits(quoteTokenBalance, usdcToken?.decimals).toString(),
    };
    const key = getEstimateIntentSwapKey({
      isMaxModel: !!isMaxModel,
      baseToken,
      quoteToken,
      orderDir: OrderDirs.BUY,
      usdcToken,
      sellAmount: quoteTokenBalance,
      maxSlippage,
      account,
      gasToken,
    });
    return {
      ...params,
      orderDir: OrderDirs.BUY,
      takerFee,
      da_owner,
      key,
      estimateKey: `buy_${params.chain}_${quoteTokenBalance}`,
      usdcToken,
      gasToken,
    };
  }, [
    userUsdcTokenAddress,
    takerFee,
    maxSlippage,
    solverAddresses,
    quoteTokenBalance,
    account,
    baseToken,
    da_owner,
    userChainAddress,
    usdcToken,
    gasToken,
    quoteToken,
    isMaxModel,
  ]);
}

// 卖单使用可用余额预估
export function useSellOrderBalnaceEstimateParams() {
  const { baseToken, quoteToken } = useCurrentSwapPair();
  const sellMaxBalance = useSwapSellMaxBalance();

  const { account, da_owner } = useDexAccount();
  const { maxSlippage, gasToken, isMaxModel } = useSwapTradeInfo();

  const takerFee = useSwapTickerVal('takerFee');

  const { solverAddresses, DAs } = useWallet();

  const userChainAddress = useMemo(() => {
    return DAs ? DAs[baseToken?.chain as Type_DAChains]?.address : '';
  }, [DAs, baseToken?.chain]);

  const userQuoteTokenAddress = useMemo(() => {
    return DAs ? DAs[quoteToken?.chain as Type_DAChains]?.address : '';
  }, [DAs, quoteToken?.chain]);

  return useMemo(() => {
    if (!da_owner || !userChainAddress) return {} as any;
    if (!isNumber(sellMaxBalance) || Number(sellMaxBalance) <= 0)
      return {} as any;
    const solverAddress =
      solverAddresses?.[baseToken?.chain as Type_DAChains] ?? {};
    if (!solverAddress) return {} as any;

    const params = {
      maxSlippage,
      chain: baseToken?.chain || '',
      sellToken: baseToken,
      buyToken: quoteToken,
      sellAmount: sellMaxBalance,
      sellVolume: parseUnits(
        digit.formatWithDecimals(sellMaxBalance, baseToken?.decimals, {
          floor: true,
        }),
        baseToken?.decimals
      ).toString(),
      buyTokenDecimals: quoteToken?.decimals,
      account,
      gasAddress: solverAddress.gas,
      feeAddress: solverAddress.solver,
      sellAddress: userChainAddress || solverAddress.solver,
      buyAddress: userQuoteTokenAddress || solverAddress.solver,
      gasToken,
    };
    const key = getEstimateIntentSwapKey({
      isMaxModel: !!isMaxModel,
      baseToken,
      quoteToken,
      orderDir: OrderDirs.SELL,
      sellAmount: sellMaxBalance,
      maxSlippage,
      account,
      gasToken,
    });
    return {
      ...params,
      orderDir: OrderDirs.SELL,
      takerFee,
      da_owner,
      key,
      estimateKey: `sell_${params.chain}_${sellMaxBalance}`,
      gasToken,
    };
  }, [
    takerFee,
    maxSlippage,
    solverAddresses,
    account,
    baseToken,
    da_owner,
    userChainAddress,
    gasToken,
    quoteToken,
    userQuoteTokenAddress,
    sellMaxBalance,
    isMaxModel,
  ]);
}

export function useSwapTypeInput() {
  const dispatch = useDispatch();

  return useCallback(
    ({ fields }: any) => {
      dispatch(typeInput({ fields }));
    },
    [dispatch]
  );
}

export function useSetEstimating() {
  const typeInput = useSwapTypeInput();
  return useCallback(() => {
    typeInput({ fields: [{ field: 'estimating', val: true }] });
  }, [typeInput]);
}

export function useSelectUsdc() {
  const dispatch = useDispatch();
  return useCallback(
    (usdc: Token) => {
      dispatch(
        typeInput({
          fields: [
            { field: 'usdcToken', val: usdc },
            { field: 'isMaxModel', val: false },
          ],
        })
      );
    },
    [dispatch]
  );
}

export function useRefreshEstimate() {
  const dispatch = useDispatch();
  return useCallback(() => {
    dispatch(refreshEstimate());
  }, [dispatch]);
}

export function useRefreshTime() {
  return useSelector((state: AppState) => state.swapTrade.refreshTime);
}

export const getEstimateIntentSwapKey = ({
  baseToken,
  quoteToken,
  orderDir,
  usdcToken,
  sellAmount,
  maxSlippage,
  account,
  gasToken,
  isMaxModel,
}: {
  baseToken: Token;
  quoteToken: Token;
  orderDir: OrderDirs;
  usdcToken?: Token;
  sellAmount: string;
  maxSlippage: string;
  account: string;
  gasToken?: Token;
  isMaxModel: boolean;
}) => {
  const usdc = orderDir === OrderDirs.BUY ? usdcToken?.code : '';
  if (isMaxModel) {
    return `${baseToken?.code}-${quoteToken?.code}-${orderDir}-${usdc}-max-${maxSlippage}-${account}-${gasToken?.code}`;
  }
  if (!isNumber(sellAmount) || Number(sellAmount) <= 0) return '';
  // 卖单没有usdc
  return `${baseToken?.code}-${quoteToken?.code}-${orderDir}-${usdc}-${sellAmount}-${maxSlippage}-${account}-${gasToken?.code}`;
};

export function useIsSellGasToken() {
  const { baseToken } = useCurrentSwapPair();
  const { balanceEstimate } = useSwapTradeInfo();
  const { gasTokens } = balanceEstimate || {};
  return useMemo(() => {
    return (gasTokens || [])?.some(
      (gasToken: any) =>
        gasToken.code === baseToken.code && gasToken?.chain === baseToken?.chain
    );
  }, [gasTokens, baseToken]);
}

export function useSwapSellMaxBalance() {
  const { baseToken } = useCurrentSwapPair();
  const chainInfo = useChainInfo(baseToken?.chain as Type_DAChains);
  const isLifi = chainInfo?.isLifi;
  const [baseBalance] = useSwapBalances({ tokens: [baseToken] });
  const { btcSwapBalanceLimit } = useInfo();

  const isBtc = baseToken?.chain === 'BITCOIN' && baseToken?.code === 'BTC';
  return useMemo(() => {
    if (isBtc) {
      let res = minus(baseBalance?.available, btcSwapBalanceLimit);
      if (Number(res) < 0) {
        res = '0';
      }
      return res;
    }
    if (isLifi) {
      return digit.formatWithDecimals(
        baseBalance?.available,
        Number(baseToken?.decimals) - 1,
        {
          floor: true,
        }
      );
    }

    // sol切换jupiter，不需要扣除
    // if (isSol) {
    //   return minus(baseBalance?.available, SOL_BALANCE_LIMIT_AFTER_SELL);
    // }
    return baseBalance?.available;
  }, [
    baseBalance?.available,
    baseToken?.decimals,
    isLifi,
    isBtc,
    btcSwapBalanceLimit,
  ]);
}

export function useSwapQuoteTokenBalance() {
  const { usdcToken } = useSwapTradeInfo();
  const balance = useUsdcBalance({ token: usdcToken });
  return balance?.available;
}

export function useDoTrySwap() {
  const typeInput = useSwapTypeInput();
  const parmas = useEstimateParams();
  const { estimate } = useSwapEstimate();
  const { orderDir } = useSwapTradeInfo();

  return useCallback(
    (gasToken: Token) => {
      typeInput({
        fields: [
          {
            field: 'estimating',
            val: true,
          },
          {
            field: 'gasToken',
            val: gasToken,
          },
        ],
      });
      return estimate({ ...parmas, gasToken })
        .then((res) => {
          typeInput({
            fields: [
              {
                field:
                  orderDir === OrderDirs.BUY ? 'baseAmount' : 'quoteAmount',
                val: res.receiveAmount,
              },
              { field: 'tryResp', val: res },
              { field: 'estimating', val: false },
            ],
          });
          return res;
        })
        .catch((err) => {
          typeInput({
            fields: [{ field: 'estimating', val: false }],
          });
          return Promise.reject(err);
        });
    },
    [parmas, typeInput, orderDir, estimate]
  );
}

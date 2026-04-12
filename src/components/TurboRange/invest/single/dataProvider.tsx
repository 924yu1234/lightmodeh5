import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useDebounce } from 'ahooks';

import { Token } from 'src/constants/interface';
import { Type_DAChains } from 'src/da';
import { formatUnits } from 'src/ethers/utils';
import { useIntl } from 'src/locals';
import { useDexAccount } from 'src/state/dexAccount/hooks';
import { useCreateTurboRangeDepositTryData } from 'src/state/dexAccount/opr/useCreateTurboRangeOrder';
import { usePostIntentTry } from 'src/state/intent/intentService';
import { useUsdcBalance } from 'src/state/swap/balances/hooks';
import { isNumber } from 'src/utils/digit';
import { logTurboRange } from 'src/utils/log/swap';
import message from 'src/utils/message';
import {
  divide,
  isEqual,
  isLessThan,
  multiply,
  plus,
} from 'src/utils/numberUtils';

import { useApyContext } from '../apyProvider';

export interface InvestContext {
  userDA: string;
  usdcToken?: Token;
  setUsdcToken: (usdcToken: Token) => void;
  gasToken?: Token;
  setGasToken: (gasToken: Token) => void;
  amount: string;
  setAmount: (amount: string) => void;
  isMaxModel: number;
  setIsMaxModel: (isMaxModel: number) => void;
  isTrying: boolean;
  tryResp: any;
  showError: boolean;
  setShowError: (showError: boolean) => void;
  overBalance: boolean;
  overMax: boolean;
  overPriceImpact: boolean;
  belowMin: boolean;
  doTry: (gasToken?: Token) => Promise<any>;
  isTryingMax: boolean;
  setIsTryingMax: (isTryingMax: boolean) => void;
}
const max = 500000;
const min = 0.01;

const SetContext = React.createContext<InvestContext>({} as InvestContext);

export default function InvestProvider({
  children,
}: {
  children: React.ReactElement;
}) {
  const [showError, setShowError] = useState(false);
  const [usdcToken, setUsdcToken] = useState<Token | undefined>();
  const [gasToken, setGasToken] = useState<Token | undefined>();
  const [amount, setAmount] = useState<string>('');
  const [tryRespMap, setTryRespMap] = useState<{ [key: string]: any }>({});
  const [refreshIndex, setRefreshIndex] = useState(0);
  const [isMaxModel, setIsMaxModel] = useState(0);
  const [isTryingMax, setIsTryingMax] = useState(false);
  const intl = useIntl();

  // 从 apyProvider 获取 product 和 price 相关数据
  const { product, minPrice, maxPrice } = useApyContext();

  const debouncedAmount = useDebounce(amount, { wait: 500 });
  const usdcBalance = useUsdcBalance({ token: usdcToken });
  const { account, DAs, da_owner } = useDexAccount();
  const overBalance =
    !!account && isLessThan(usdcBalance?.available ?? 0, debouncedAmount);
  const debouncedAmountError = Number(debouncedAmount) > 0 && overBalance;
  const belowMin =
    !!account &&
    Number(debouncedAmount) > 0 &&
    isLessThan(debouncedAmount, min);

  const createTryData = useCreateTurboRangeDepositTryData();
  const postIntentTry = usePostIntentTry();

  const tryKey = useMemo(() => {
    if (!product.poolAddress || !usdcToken || belowMin) {
      return '';
    }
    if (
      !isMaxModel &&
      (!isNumber(debouncedAmount) ||
        Number(debouncedAmount) <= 0 ||
        debouncedAmountError)
    ) {
      return '';
    }
    return `${da_owner}_${product.poolAddress}_${
      usdcToken?.code
    }_${maxPrice}_${minPrice}_${isMaxModel ? 'max' : debouncedAmount}_${
      gasToken?.code
    }`;
  }, [
    debouncedAmount,
    debouncedAmountError,
    belowMin,
    product.poolAddress,
    maxPrice,
    minPrice,
    gasToken,
    usdcToken,
    isMaxModel,
    da_owner,
  ]);

  const tryResp = useMemo(() => {
    return tryRespMap[tryKey];
  }, [tryKey, tryRespMap]);

  const timer = useRef<NodeJS.Timeout | null>(null);

  const doTry = useCallback(
    (gasToken?: Token) => {
      setGasToken(gasToken);
      if (timer.current) clearTimeout(timer.current);

      if (!product.poolAddress || !usdcToken || belowMin) {
        return Promise.resolve(undefined);
      }
      if (
        !isMaxModel &&
        (!isNumber(debouncedAmount) ||
          Number(debouncedAmount) <= 0 ||
          debouncedAmountError)
      ) {
        return Promise.resolve(undefined);
      }
      if (isMaxModel && Number(usdcBalance?.available) <= 0) {
        return Promise.resolve(undefined);
      }
      const tryData = createTryData({
        isMaxModel: !!isMaxModel,
        product,
        amount: isMaxModel ? usdcBalance?.available : debouncedAmount,
        maxPrice,
        minPrice,
        usdcToken,
        gasToken,
      });
      if (!tryData) {
        return Promise.resolve(undefined);
      }
      return postIntentTry(
        { ...tryData, tryKey: undefined },
        { isMaxModel: !!isMaxModel }
      )
        .then((resp) => {
          if (isMaxModel) setIsTryingMax(false);
          setTryRespMap({
            [tryData?.tryKey]: resp,
          });
          logTurboRange({
            event: 'turbo range deposit try success',
            poolAddress: product.poolAddress,
            amount: isMaxModel ? usdcBalance?.available : debouncedAmount,
            isMaxModel,
            usdcChain: usdcToken?.chain,
            tryKey: tryData?.tryKey,
            tryData,
          });
          timer.current = setTimeout(() => {
            setRefreshIndex((pre) => pre + 1);
          }, 6000);
          return resp;
        })
        .catch((err) => {
          if (isMaxModel) setIsTryingMax(false);
          logTurboRange({
            event: 'turbo range deposit try failed',
            poolAddress: product.poolAddress,
            amount: isMaxModel ? usdcBalance?.available : debouncedAmount,
            error: err,
            isMaxModel,
            usdcChain: usdcToken?.chain,
            tryKey: tryData?.tryKey,
            tryData,
          });
          message.error(intl.common_err);
          timer.current = setTimeout(() => {
            setRefreshIndex((pre) => pre + 1);
          }, 6000);
        });
    },
    [
      createTryData,
      postIntentTry,
      intl,
      product,
      maxPrice,
      minPrice,
      debouncedAmount,
      debouncedAmountError,
      isMaxModel,
      usdcBalance,
      usdcToken,
      belowMin,
    ]
  );

  useEffect(() => {
    doTry(gasToken);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tryKey, refreshIndex, isMaxModel]);

  useEffect(() => {
    if (isMaxModel && tryResp) {
      const { tokenOutAmount } = tryResp || {};
      setAmount(tokenOutAmount || '');
    }
  }, [isMaxModel, tryResp]);

  useEffect(() => {
    setAmount('');
    setIsMaxModel(0);
    setIsTryingMax(false);
  }, [product?.poolAddress, da_owner]);

  const isTrying = useMemo(() => {
    return !!tryKey && tryRespMap[tryKey] === undefined;
  }, [tryKey, tryRespMap]);

  const showPriceImpactWarning = useMemo(() => {
    if (!tryResp || isTrying) return false;
    const tryTokenIn = tryResp?.action?.token_in;
    const tryTokenOut = tryResp?.action?.token_out;
    const tryTokenOutAmount = tryTokenOut?.[0]?.amount ?? '0';
    const tryTokenOutAmountFormatted = isNumber(tryTokenOutAmount)
      ? formatUnits(tryTokenOutAmount, product.quoteToken.decimals)
      : '0';
    if (!isEqual(Number(tryTokenOutAmountFormatted), Number(amount))) {
      return false;
    }

    const base = tryTokenIn?.find(
      (t: any) => t.token === product.baseToken.code
    );
    const quote = tryTokenIn?.find(
      (t: any) => t.token === product.quoteToken.code
    );
    if (!base || !quote) return false;
    const baseAmount = isNumber(base.amount)
      ? formatUnits(base.amount, product.baseToken.decimals)
      : '0';
    const quoteAmount = isNumber(quote.amount)
      ? formatUnits(quote.amount, product.quoteToken.decimals)
      : '0';
    const baseToQuoteAmount = multiply(baseAmount, product.currentPrice);
    const toQuoteAmount = plus(quoteAmount, baseToQuoteAmount);
    const priceImpact = divide(toQuoteAmount, amount);
    return isLessThan(priceImpact, 0.97);
  }, [tryResp, product, amount, isTrying]);

  const userDA = useMemo(() => {
    return DAs?.[product.chain as Type_DAChains]?.address ?? '';
  }, [DAs, product.chain]);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  const value = useMemo(() => {
    return {
      userDA,
      isTrying,
      amount,
      setAmount,
      tryResp,
      showError,
      setShowError,
      overBalance,
      overMax: isLessThan(max, amount),
      overPriceImpact: showPriceImpactWarning,
      belowMin,
      usdcToken,
      setUsdcToken,
      gasToken,
      setGasToken,
      doTry,
      isMaxModel,
      setIsMaxModel,
      isTryingMax,
      setIsTryingMax,
    };
  }, [
    userDA,
    amount,
    setAmount,
    isTrying,
    tryResp,
    showError,
    setShowError,
    overBalance,
    showPriceImpactWarning,
    belowMin,
    usdcToken,
    setUsdcToken,
    gasToken,
    setGasToken,
    doTry,
    isMaxModel,
    setIsMaxModel,
    isTryingMax,
    setIsTryingMax,
  ]);

  return <SetContext.Provider value={value}>{children}</SetContext.Provider>;
}

export function useInvest() {
  return useContext(SetContext);
}

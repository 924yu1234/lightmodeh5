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
import { useChainInfo } from 'src/state/application/hooks';
import { useDexAccount } from 'src/state/dexAccount/hooks';
import { useCreateTurboRangeDualIncreaseInvestmentTryData } from 'src/state/dexAccount/opr/useCreateTurboRangeOrder';
import { usePostIntentTry } from 'src/state/intent/intentService';
import { useUsdcBalance } from 'src/state/swap/balances/hooks';
import { useTurboRangeProduct } from 'src/state/turboRange/hooks';
import {
  TurboRangePosition,
  TurboRangeProduct,
} from 'src/state/turboRange/reducer';
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

export interface DualIncreaseContext {
  userDA: string;
  product: TurboRangeProduct;
  position: TurboRangePosition;
  usdcToken?: Token;
  setUsdcToken: (usdcToken: Token) => void;
  gasToken?: Token;
  setGasToken: (gasToken: Token) => void;
  quoteAmount: string;
  setQuoteAmount: (amount: string) => void;
  isQuoteMaxModel: number;
  setIsQuoteMaxModel: (isQuoteMaxModel: number) => void;
  isBaseMaxModel: number;
  setIsBaseMaxModel: (isBaseMaxModel: number) => void;
  quoteBalance: string;
  overQuoteBalance: boolean;
  belowQuoteMin: boolean;
  baseAmount: string;
  setBaseAmount: (amount: string) => void;
  baseBalance: string;
  overBaseBalance: boolean;
  isTrying: boolean;
  tryResp: any;
  showError: boolean;
  setShowError: (showError: boolean) => void;
  overMax: boolean;
  overPriceImpact: boolean;
  doTry: (gasToken?: Token) => Promise<any>;
  isTryingQuoteMax: boolean;
  setIsTryingQuoteMax: (isTryingQuoteMax: boolean) => void;
  isTryingBaseMax: boolean;
  setIsTryingBaseMax: (isTryingBaseMax: boolean) => void;
  baseTokenIsGasToken: boolean;
}

const max = 500000;
const min = 0.01;

const DualContext = React.createContext<DualIncreaseContext>(
  {} as DualIncreaseContext
);

function getAdjustedTokenOutAmount(tryResp: any, token?: Token): string {
  if (!token) return '';
  const { add_on } = tryResp as any;

  const addOnBridgeTokenIn = add_on?.find(
    (item: any) => item.type === 'BRIDGE_OUT'
  )?.token_in?.[0];

  if (
    addOnBridgeTokenIn &&
    addOnBridgeTokenIn?.chain === token?.chain &&
    addOnBridgeTokenIn?.token === token?.code
  ) {
    return formatUnits(addOnBridgeTokenIn?.amount, token?.decimals);
  }

  const actionOutToken = tryResp?.action?.token_out?.find(
    (item: any) => item?.chain === token.chain && item?.token === token.code
  );
  if (actionOutToken?.amount) {
    return formatUnits(actionOutToken.amount, token.decimals);
  }

  return '';
}

export default function DualIncreaseInvestmentProvider({
  children,
  position,
}: {
  children: React.ReactElement;
  position: TurboRangePosition;
}) {
  const [showError, setShowError] = useState(false);
  const [usdcToken, setUsdcToken] = useState<Token | undefined>();
  const [gasToken, setGasToken] = useState<Token | undefined>();
  const [quoteAmount, setQuoteAmount] = useState<string>('');
  const [isQuoteMaxModel, setIsQuoteMaxModel] = useState(0);
  const [isTryingQuoteMax, setIsTryingQuoteMax] = useState(false);
  const [baseAmount, setBaseAmount] = useState<string>('');
  const [isBaseMaxModel, setIsBaseMaxModel] = useState(0);
  const [isTryingBaseMax, setIsTryingBaseMax] = useState(false);
  const [tryRespMap, setTryRespMap] = useState<{ [key: string]: any }>({});
  const [refreshIndex, setRefreshIndex] = useState(0);
  const intl = useIntl();

  const product = useTurboRangeProduct(position.poolAddress);
  const chainInfo = useChainInfo(product.baseToken?.chain as Type_DAChains);

  const baseTokenIsGasToken =
    !!chainInfo?.gasTokenCode &&
    chainInfo.gasTokenCode === product.baseToken?.code?.toLowerCase();

  const positionAddress = position.positionAddress;

  const _debouncedQuoteAmount = useDebounce(quoteAmount || '0', { wait: 500 });
  const _debouncedBaseAmount = useDebounce(baseAmount || '0', { wait: 500 });

  const debouncedQuoteAmount =
    Number(_debouncedQuoteAmount) > 0 ? _debouncedQuoteAmount : '0';
  const debouncedBaseAmount =
    Number(_debouncedBaseAmount) > 0 ? _debouncedBaseAmount : '0';

  const usdcBalance = useUsdcBalance({ token: usdcToken });
  const baseTokenBalance = useUsdcBalance({ token: product.baseToken });

  const { account, DAs, da_owner } = useDexAccount();

  const overQuoteBalance =
    !!account && isLessThan(usdcBalance?.available ?? 0, debouncedQuoteAmount);
  const debouncedQuoteAmountError =
    Number(debouncedQuoteAmount) > 0 && overQuoteBalance;
  const belowQuoteMin =
    !!account &&
    Number(debouncedQuoteAmount) > 0 &&
    isLessThan(debouncedQuoteAmount, min);

  const overBaseBalance =
    !!account &&
    isLessThan(baseTokenBalance?.available ?? 0, debouncedBaseAmount);
  const debouncedBaseAmountError =
    Number(debouncedBaseAmount) > 0 && overBaseBalance;

  const createDualTryData = useCreateTurboRangeDualIncreaseInvestmentTryData();
  const postIntentTry = usePostIntentTry();

  const tryKey = useMemo(() => {
    if (!positionAddress || !usdcToken || belowQuoteMin) {
      return '';
    }
    const hasQuoteInput =
      isNumber(debouncedQuoteAmount) && Number(debouncedQuoteAmount) > 0;
    const hasBaseInput =
      isNumber(debouncedBaseAmount) && Number(debouncedBaseAmount) > 0;
    const quoteReady =
      !!isQuoteMaxModel || !hasQuoteInput || !debouncedQuoteAmountError;
    const baseReady =
      !!isBaseMaxModel || !hasBaseInput || !debouncedBaseAmountError;
    const hasAnyInput =
      !!isQuoteMaxModel || !!isBaseMaxModel || hasQuoteInput || hasBaseInput;

    if (!hasAnyInput || !quoteReady || !baseReady) {
      return '';
    }
    if (isQuoteMaxModel && Number(usdcBalance?.available) <= 0) {
      return '';
    }
    if (isBaseMaxModel && Number(baseTokenBalance?.available) <= 0) {
      return '';
    }

    return `${da_owner}_${positionAddress}_${usdcToken?.code}_${
      isQuoteMaxModel ? 'max' : debouncedQuoteAmount
    }_${isBaseMaxModel ? 'max' : debouncedBaseAmount}_${gasToken?.code}_dual`;
  }, [
    debouncedQuoteAmount,
    debouncedBaseAmount,
    debouncedQuoteAmountError,
    debouncedBaseAmountError,
    belowQuoteMin,
    positionAddress,
    isQuoteMaxModel,
    gasToken,
    usdcToken,
    usdcBalance?.available,
    da_owner,
    isBaseMaxModel,
    baseTokenBalance?.available,
  ]);

  const tryResp = useMemo(() => {
    return tryRespMap[tryKey];
  }, [tryKey, tryRespMap]);

  const timer = useRef<NodeJS.Timeout | null>(null);

  const doTry = useCallback(
    (gasToken?: Token) => {
      setGasToken(gasToken);
      if (timer.current) clearTimeout(timer.current);

      if (!positionAddress || !usdcToken || belowQuoteMin) {
        return Promise.resolve(undefined);
      }
      const hasQuoteInput =
        isNumber(debouncedQuoteAmount) && Number(debouncedQuoteAmount) > 0;
      const hasBaseInput =
        isNumber(debouncedBaseAmount) && Number(debouncedBaseAmount) > 0;
      const quoteReady =
        !!isQuoteMaxModel || !hasQuoteInput || !debouncedQuoteAmountError;
      const baseReady =
        !!isBaseMaxModel || !hasBaseInput || !debouncedBaseAmountError;
      if (!quoteReady || !baseReady) {
        return Promise.resolve(undefined);
      }
      if (isQuoteMaxModel && Number(usdcBalance?.available) <= 0) {
        return Promise.resolve(undefined);
      }
      if (isBaseMaxModel && Number(baseTokenBalance?.available) <= 0) {
        return Promise.resolve(undefined);
      }
      if (
        !isQuoteMaxModel &&
        !isBaseMaxModel &&
        !hasQuoteInput &&
        !hasBaseInput
      ) {
        return Promise.resolve(undefined);
      }

      let quoteTryAmount = debouncedQuoteAmount;
      if (isQuoteMaxModel) {
        quoteTryAmount = usdcBalance?.available || '0';
      }
      let baseTryAmount = debouncedBaseAmount;
      if (isBaseMaxModel) {
        baseTryAmount = baseTokenBalance?.available || '0';
      }

      const tryData = createDualTryData({
        isQuoteMaxModel: !!isQuoteMaxModel,
        isBaseMaxModel: !!isBaseMaxModel,
        product,
        position,
        quoteAmount: quoteTryAmount,
        baseAmount: baseTryAmount,
        usdcToken,
        gasToken,
      });

      if (!tryData) {
        return Promise.resolve(undefined);
      }

      return postIntentTry(
        { ...tryData, tryKey: undefined },
        { isMaxModel: !!isQuoteMaxModel || !!isBaseMaxModel }
      )
        .then((resp) => {
          if (isQuoteMaxModel) {
            setIsTryingQuoteMax(false);
          }
          if (isBaseMaxModel) {
            setIsTryingBaseMax(false);
          }
          setTryRespMap({
            [tryData?.tryKey]: resp,
          });
          logTurboRange({
            event: 'turbo range dual increase investment try success',
            poolAddress: product.poolAddress,
            position: positionAddress,
            quoteAmount: quoteTryAmount,
            baseAmount: baseTryAmount,
            usdcChain: usdcToken?.chain,
            tryKey: tryData?.tryKey,
            isMaxModel: !!isQuoteMaxModel || !!isBaseMaxModel,
            isQuoteMaxModel: !!isQuoteMaxModel,
            isBaseMaxModel: !!isBaseMaxModel,
          });
          timer.current = setTimeout(() => {
            setRefreshIndex((pre) => pre + 1);
          }, 6000);
          return resp;
        })
        .catch((err) => {
          if (isQuoteMaxModel) setIsTryingQuoteMax(false);
          if (isBaseMaxModel) setIsTryingBaseMax(false);
          logTurboRange({
            event: 'turbo range dual increase investment try failed',
            poolAddress: product.poolAddress,
            position: positionAddress,
            quoteAmount: quoteTryAmount,
            baseAmount: baseTryAmount,
            error: err,
            usdcChain: usdcToken?.chain,
            tryKey: tryData?.tryKey,
            isMaxModel: !!isQuoteMaxModel || !!isBaseMaxModel,
            isQuoteMaxModel: !!isQuoteMaxModel,
            isBaseMaxModel: !!isBaseMaxModel,
          });
          message.error(intl.common_err);
          timer.current = setTimeout(() => {
            setRefreshIndex((pre) => pre + 1);
          }, 6000);
        });
    },
    [
      createDualTryData,
      postIntentTry,
      intl,
      product,
      position,
      positionAddress,
      debouncedQuoteAmount,
      debouncedBaseAmount,
      debouncedQuoteAmountError,
      debouncedBaseAmountError,
      isQuoteMaxModel,
      usdcBalance?.available,
      usdcToken,
      belowQuoteMin,
      isBaseMaxModel,
      baseTokenBalance?.available,
    ]
  );

  useEffect(() => {
    doTry(gasToken);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tryKey, refreshIndex, isQuoteMaxModel, isBaseMaxModel]);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  useEffect(() => {
    if (isQuoteMaxModel && tryResp) {
      setQuoteAmount(getAdjustedTokenOutAmount(tryResp, usdcToken) || '');
    }
  }, [isQuoteMaxModel, tryResp, usdcToken]);

  useEffect(() => {
    if (isBaseMaxModel && tryResp) {
      setBaseAmount(
        getAdjustedTokenOutAmount(tryResp, product.baseToken as Token) || ''
      );
    }
  }, [isBaseMaxModel, product.baseToken, tryResp]);

  useEffect(() => {
    setQuoteAmount('');
    setIsQuoteMaxModel(0);
    setIsBaseMaxModel(0);
    setIsTryingQuoteMax(false);
    setIsTryingBaseMax(false);
    setBaseAmount('');
  }, [positionAddress, da_owner]);

  const isTrying = useMemo(() => {
    return !!tryKey && tryRespMap[tryKey] === undefined;
  }, [tryKey, tryRespMap]);

  const showPriceImpactWarning = useMemo(() => {
    if (!tryResp || isTrying || Number(quoteAmount) <= 0) return false;
    const tryTokenIn = tryResp?.action?.token_in;
    const tryTokenOut = tryResp?.action?.token_out;
    const tryTokenOutAmount = tryTokenOut?.[0]?.amount ?? '0';
    const tryTokenOutAmountFormatted = isNumber(tryTokenOutAmount)
      ? formatUnits(tryTokenOutAmount, product.quoteToken.decimals)
      : '0';
    if (!isEqual(Number(tryTokenOutAmountFormatted), Number(quoteAmount))) {
      return false;
    }

    const base = tryTokenIn?.find(
      (t: any) => t.token === product.baseToken.code
    );
    const quote = tryTokenIn?.find(
      (t: any) => t.token === product.quoteToken.code
    );
    if (!base || !quote) return false;
    const baseAmountVal = isNumber(base.amount)
      ? formatUnits(base.amount, product.baseToken.decimals)
      : '0';
    const quoteAmountVal = isNumber(quote.amount)
      ? formatUnits(quote.amount, product.quoteToken.decimals)
      : '0';
    const baseToQuoteAmount = multiply(baseAmountVal, product.currentPrice);
    const toQuoteAmount = plus(quoteAmountVal, baseToQuoteAmount);
    const priceImpact = divide(toQuoteAmount, quoteAmount);
    return isLessThan(priceImpact, 0.97);
  }, [tryResp, isTrying, product, quoteAmount]);

  const userDA = useMemo(() => {
    return DAs?.[product.chain as Type_DAChains]?.address ?? '';
  }, [DAs, product.chain]);

  const value = useMemo(() => {
    return {
      userDA,
      product,
      position,
      usdcToken,
      setUsdcToken,
      gasToken,
      setGasToken,
      quoteAmount,
      setQuoteAmount,
      isQuoteMaxModel,
      setIsQuoteMaxModel,
      isTryingQuoteMax,
      setIsTryingQuoteMax,
      isTryingBaseMax,
      setIsTryingBaseMax,
      quoteBalance: usdcBalance?.available ?? '0',
      overQuoteBalance,
      belowQuoteMin,
      baseAmount,
      setBaseAmount,
      baseBalance: baseTokenBalance?.available ?? '0',
      overBaseBalance,
      isTrying,
      tryResp,
      showError,
      setShowError,
      overMax: isLessThan(max, quoteAmount),
      overPriceImpact: showPriceImpactWarning,
      doTry,
      baseTokenIsGasToken,
      isBaseMaxModel,
      setIsBaseMaxModel,
    };
  }, [
    userDA,
    product,
    position,
    usdcToken,
    gasToken,
    quoteAmount,
    isQuoteMaxModel,
    isTryingQuoteMax,
    isTryingBaseMax,
    usdcBalance,
    overQuoteBalance,
    belowQuoteMin,
    baseAmount,
    baseTokenBalance,
    overBaseBalance,
    isTrying,
    tryResp,
    showError,
    showPriceImpactWarning,
    doTry,
    baseTokenIsGasToken,
    isBaseMaxModel,
    setIsBaseMaxModel,
  ]);

  return <DualContext.Provider value={value}>{children}</DualContext.Provider>;
}

export function useDualIncrease() {
  return useContext(DualContext);
}

import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { formatUnits } from '@ethersproject/units';
import { useDebounce } from 'ahooks';

import { Token } from 'src/constants/interface';
import { useIntl } from 'src/locals';
import { useDexAccount } from 'src/state/dexAccount/hooks';
import { useCreateBridgeUsdcTryData } from 'src/state/dexAccount/opr/useCreateBridgeUsdcOrder';
import { usePostIntentTry } from 'src/state/intent/intentService';
import {
  useFungibleUsdc,
  useIsLoadingDABalance,
  useUsdcBalance,
} from 'src/state/swap/balances/hooks';
import { isNumber } from 'src/utils/digit';
import { logBridgeUsdc } from 'src/utils/log/swap';
import message from 'src/utils/message';
import { isLessThan } from 'src/utils/numberUtils';

export interface BridgeUsdcContext {
  fromToken?: Token;
  setFromToken: (fromToken?: Token) => void;
  toToken?: Token;
  setToToken: (toToken?: Token) => void;
  amount: string;
  setAmount: (amount: string) => void;
  isMaxModel: number;
  setIsMaxModel: (isMaxModel: number) => void;
  isTryingMax: boolean;
  setIsTryingMax: (isTryingMax: boolean) => void;
  isTrying: boolean;
  tryResp: any;
  overBalance: boolean;
  doTry: (gasToken?: Token) => Promise<any>;
  maxAmount: string;
}
const SetContext = React.createContext<BridgeUsdcContext>(
  {} as BridgeUsdcContext
);

export default function BridgeUsdcProvider({
  children,
  fromToken: initialFromToken,
  fromTokenId: initialFromTokenId,
}: {
  children: React.ReactElement;
  fromToken?: Token;
  fromTokenId?: number;
}) {
  const [fromToken, setFromToken] = useState<Token | undefined>(
    initialFromToken
  );
  const [toToken, setToToken] = useState<Token | undefined>();
  const [amount, setAmount] = useState<string>('');
  const [tryRespMap, setTryRespMap] = useState<{ [key: string]: any }>({});
  const [preTryResp, setPreTryResp] = useState<any>(null);
  const [refreshIndex, setRefreshIndex] = useState(0);
  const [maxAmount, setMaxAmount] = useState<string>('');
  const [isMaxModel, setIsMaxModel] = useState(0);
  const [isTryingMax, setIsTryingMax] = useState(false);
  const intl = useIntl();
  const { account, da_owner } = useDexAccount();
  const [gasToken, setGasToken] = useState<Token | undefined>(undefined);
  const createTryData = useCreateBridgeUsdcTryData();
  const postIntentTry = usePostIntentTry();
  const debouncedAmount = useDebounce(amount, { wait: 500 });

  const loadingBalances = useIsLoadingDABalance();
  const fungibleUsdc = useFungibleUsdc();

  useEffect(() => {
    if (fungibleUsdc?.balances?.length && !toToken && !fromToken) {
      if (initialFromTokenId) {
        const token = fungibleUsdc?.balances?.find(
          (d: any) => d.id === initialFromTokenId
        );
        if (token) {
          setFromToken(token);
        }
      } else if (!loadingBalances) {
        setFromToken(fungibleUsdc?.balances?.[0]);
      }
    }
  }, [
    fungibleUsdc,
    fromToken,
    loadingBalances,
    toToken,
    initialFromTokenId,
    initialFromToken,
  ]);

  const usdcBalance = useUsdcBalance({ token: fromToken });
  const available = usdcBalance?.available;

  const overBalance = !!account && isLessThan(available, debouncedAmount);

  const tryKey = useMemo(() => {
    if (!fromToken?.code || !toToken?.code) {
      return '';
    }
    if (isMaxModel) {
      return `${da_owner}_${fromToken.code}_${toToken.code}_max_${gasToken?.code}`;
    }
    if (
      !isNumber(debouncedAmount) ||
      Number(debouncedAmount) <= 0 ||
      overBalance
    ) {
      return '';
    }
    return `${da_owner}_${fromToken.code}_${toToken.code}_${debouncedAmount}_${gasToken?.code}`;
  }, [
    overBalance,
    fromToken?.code,
    toToken?.code,
    debouncedAmount,
    gasToken?.code,
    isMaxModel,
    da_owner,
  ]);

  useEffect(() => {
    setAmount('');
    setIsMaxModel(0);
    setIsTryingMax(false);
  }, [da_owner]);

  const tryResp = useMemo(() => {
    return tryRespMap[tryKey];
  }, [tryKey, tryRespMap]);

  const timer = useRef<NodeJS.Timeout | null>(null);

  const doTry = useCallback(
    (gasToken?: Token) => {
      setGasToken(gasToken);
      if (timer.current) clearTimeout(timer.current);
      if (!fromToken || !toToken) {
        return Promise.resolve(undefined);
      }
      if (
        !isMaxModel &&
        (!isNumber(debouncedAmount) || Number(debouncedAmount) <= 0)
      ) {
        return Promise.resolve(undefined);
      }
      if (!!isMaxModel && Number(usdcBalance?.available) <= 0) {
        return Promise.resolve(undefined);
      }
      const tryData = createTryData({
        isMaxModel: !!isMaxModel,
        fromToken,
        toToken,
        amount: isMaxModel ? usdcBalance?.available : debouncedAmount,
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
          if (isNumber(resp.max_bridge_amount)) {
            setMaxAmount(
              formatUnits(resp.max_bridge_amount, fromToken?.decimals)
            );
          } else {
            setMaxAmount('');
          }
          setPreTryResp(resp);
          setTryRespMap({
            [tryData?.tryKey]: resp,
          });
          logBridgeUsdc({
            event: 'bridge usdc try success',
            fromToken,
            toToken,
            amount: debouncedAmount,
          });
          timer.current = setTimeout(() => {
            setRefreshIndex((pre) => pre + 1);
          }, 6000);
          return resp;
        })
        .catch((err: any) => {
          if (isMaxModel) setIsTryingMax(false);
          logBridgeUsdc({
            event: 'bridge usdc try failed',
            fromToken,
            toToken,
            amount: debouncedAmount,
            error: err,
          });
          message.error(intl.common_err);
          timer.current = setTimeout(() => {
            setRefreshIndex((pre) => pre + 1);
          }, 6000);
          return Promise.reject(err);
        });
    },
    [
      createTryData,
      intl,
      fromToken,
      toToken,
      debouncedAmount,
      postIntentTry,
      isMaxModel,
      usdcBalance,
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
  }, [isMaxModel, tryResp, usdcBalance]);

  const isTrying = useMemo(() => {
    return !!tryKey && tryRespMap[tryKey] === undefined;
  }, [tryKey, tryRespMap]);

  const value = useMemo(() => {
    return {
      isTrying,
      fromToken,
      setFromToken,
      toToken,
      setToToken,
      amount,
      setAmount,
      tryResp,
      overBalance,
      preTryResp,
      maxAmount,
      doTry,
      isMaxModel,
      setIsMaxModel,
      isTryingMax,
      setIsTryingMax,
    };
  }, [
    amount,
    setAmount,
    isTrying,
    tryResp,
    fromToken,
    toToken,
    setFromToken,
    setToToken,
    overBalance,
    preTryResp,
    doTry,
    maxAmount,
    isMaxModel,
    setIsMaxModel,
    isTryingMax,
    setIsTryingMax,
  ]);

  return <SetContext.Provider value={value}>{children}</SetContext.Provider>;
}

export function useBridgeUsdcData() {
  return useContext(SetContext);
}

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
import { TOKEN_SOL_CODE, Type_DAChains } from 'src/da';
import { useSwapSendV2Tokens } from 'src/hooks/useSendTokens';
import { useIntl } from 'src/locals';
import {
  useChainInfos,
  useFirstPaymentUsdcToken,
  useInfo,
} from 'src/state/application/hooks';
import { useDexAccount } from 'src/state/dexAccount/hooks';
import { useCreateSendV2TryData } from 'src/state/dexAccount/opr/useCreateSendV2Data';
import { usePostIntentTry } from 'src/state/intent/intentService';
import {
  useIsLoadingDABalance,
  useSwapBalance,
} from 'src/state/swap/balances/hooks';
import { useIsFungibleUsdc } from 'src/state/swap/tokens/hook';
import { isNumber } from 'src/utils/digit';
import { isAddressValid } from 'src/utils/isAddress';
import { logSendV2 } from 'src/utils/log/swap';
import message from 'src/utils/message';
import { isLessOrEqualThan, isLessThan, minus } from 'src/utils/numberUtils';
import { tokenIsBtc, tokenIsSol } from 'src/utils/token';

export interface SendDataProviderContext {
  page: 'token' | 'fungibleUsdc' | 'address' | 'amout';
  setPage: (page: 'token' | 'fungibleUsdc' | 'address' | 'amout') => void;
  token?: Token;
  setToken: (token: Token) => void;
  chain?: Type_DAChains;
  setChain: (chain: Type_DAChains) => void;
  recipient: string;
  setRecipient: (recipient: string) => void;
  amount: string;
  setAmount: (amount: string) => void;
  tryResp: any;
  isDAUsdc: boolean;
  isTrying: boolean;
  isMaxModel: number;
  setIsMaxModel: (isMaxModel: number) => void;
  isTryingMax: boolean;
  setIsTryingMax: (isTryingMax: boolean) => void;
  doTry: (gasToken?: Token, amount?: string) => Promise<any>;
  tryErrorCode: number;
  validedFungibleChains: Type_DAChains[];
  outChain?: Type_DAChains;
  overBalance: boolean;
  paramsValid: {
    overMax: boolean;
    tokenTips: string;
    amountErr: boolean;
    tokenErr: boolean;
    recipientError: boolean;
    disabled: boolean;
  };
}

const SetContext = React.createContext<SendDataProviderContext>(
  {} as SendDataProviderContext
);

export default function SendDataProvider({
  children,
  token: token_,
}: {
  token?: Token;
  children: React.ReactElement;
}) {
  const [token, setToken] = useState<Token | undefined>(token_);
  const [recipient, setRecipient] = useState<string>('');
  const [tryRespMap, setTryRespMap] = useState<{ [key: string]: any }>({});
  const [amount, setAmount] = useState<string>('');
  const [refreshIndex, setRefreshIndex] = useState(0);
  const [tryErrorCode, setTryErrorCode] = useState(0);
  const [chain, setChain] = useState<Type_DAChains>();
  const [page, setPage] = useState<
    'token' | 'fungibleUsdc' | 'address' | 'amout'
  >(token_?.id ? 'address' : 'token');
  const [isMaxModel, setIsMaxModel] = useState(0);
  const [isTryingMax, setIsTryingMax] = useState(false);
  const intl = useIntl();
  const { account } = useDexAccount();
  const { da_owner } = useDexAccount();
  const createTryData = useCreateSendV2TryData();
  const postIntentTry = usePostIntentTry();
  const loadingBalance = useIsLoadingDABalance();
  const balances = useSwapSendV2Tokens();

  const firstPaymentUsdcToken = useFirstPaymentUsdcToken();

  useEffect(() => {
    if (!loadingBalance && !token) {
      if (balances.length > 0) {
        setToken(balances[0]);
      } else {
        setToken(firstPaymentUsdcToken);
      }
    }
  }, [loadingBalance, balances, firstPaymentUsdcToken, token]);
  const chainInfos = useChainInfos();
  const isDAUsdc = useIsFungibleUsdc({ token });

  const validedFungibleChains = useMemo(() => {
    if (!isDAUsdc) {
      return [];
    }
    if (!recipient) {
      return chainInfos.filter((d) => d.isFungibleChain).map((d) => d.chain);
    }
    return chainInfos
      .filter((d) => d.isFungibleChain)
      .filter((d) => {
        return isAddressValid(d.chain, recipient, d?.addressRegex);
      })
      .map((d) => d.chain);
  }, [chainInfos, recipient, isDAUsdc]);

  const [gasToken, setGasToken] = useState<Token | undefined>(undefined);
  const outChain = useMemo(() => {
    return (isDAUsdc ? chain : token?.chain) as Type_DAChains;
  }, [isDAUsdc, token?.chain, chain]);

  const paramsValid = useCheckParams({
    isMaxModel: !!isMaxModel,
    recipient,
    amount,
    token: token as Token,
    chain: outChain as Type_DAChains,
    validedFungibleChains: validedFungibleChains as Type_DAChains[],
  });
  const { recipientError, disabled } = paramsValid;

  const debouncedAmount = useDebounce(amount, { wait: 300 });
  const available = token?.available;

  const overBalance = !!account && isLessThan(available, debouncedAmount);

  const tryKey = useMemo(() => {
    if (!token?.code || !recipient || disabled) {
      return '';
    }
    if (
      !isMaxModel &&
      (!isNumber(debouncedAmount) || Number(debouncedAmount) <= 0)
    ) {
      return '';
    }
    return `${da_owner}_${token.code}_${outChain}_${recipient}_${
      isMaxModel > 0 ? 'max' : debouncedAmount
    }_${gasToken?.code}`;
  }, [
    token?.code,
    outChain,
    recipient,
    debouncedAmount,
    gasToken?.code,
    disabled,
    isMaxModel,
    da_owner,
  ]);

  useEffect(() => {
    setAmount('');
    setIsMaxModel(0);
    setIsTryingMax(false);
  }, [da_owner, token?.code, outChain, recipient]);

  const tryResp = useMemo(() => {
    return tryRespMap[tryKey];
  }, [tryKey, tryRespMap]);

  const timer = useRef<NodeJS.Timeout | null>(null);

  const maxAmount = useSendMaxAmount({ token });

  const doTry = useCallback(
    (gasToken?: Token, amount?: string) => {
      setGasToken(gasToken);
      if (timer.current) clearTimeout(timer.current);
      if (!token || !outChain || !recipient || recipientError || disabled) {
        return Promise.resolve(undefined);
      }
      const _amount = isMaxModel ? maxAmount : amount || debouncedAmount;
      if (!!isMaxModel && (!isNumber(_amount) || Number(_amount) <= 0)) {
        return Promise.resolve(undefined);
      }
      if (!!isMaxModel && Number(_amount) <= 0) {
        return Promise.resolve(undefined);
      }
      const tryData = createTryData({
        isMaxModel: !!isMaxModel,
        token,
        isDAUsdc,
        chain: outChain as Type_DAChains,
        recipient,
        amount: _amount,
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
          logSendV2({
            event: 'send v2 try success',
            token: token?.code,
            chain: outChain,
            recipient,
            amount: _amount,
          });
          timer.current = setTimeout(() => {
            setRefreshIndex((pre) => pre + 1);
          }, 6000);
          return resp;
        })
        .catch((err) => {
          if (isMaxModel) setIsTryingMax(false);
          setTryErrorCode(err?.code || 0);
          logSendV2({
            event: 'send v2 try failed',
            token,
            chain: outChain,
            recipient,
            amount: _amount,
            error: err,
          });
          message.error(intl.common_err);
          timer.current = setTimeout(() => {
            setRefreshIndex((pre) => pre + 1);
          }, 6000);
          return Promise.reject(err);
        });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [
      isMaxModel,
      createTryData,
      postIntentTry,
      intl,
      token,
      outChain,
      recipient,
      debouncedAmount,
      recipientError,
      isDAUsdc,
      disabled,
      maxAmount,
    ]
  );

  useEffect(() => {
    doTry(gasToken);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tryKey, refreshIndex, isMaxModel]);

  useEffect(() => {
    if (!!isMaxModel && tryResp) {
      const { tokenOutAmount } = tryResp || {};
      setAmount(tokenOutAmount || '');
    }
  }, [isMaxModel, tryResp]);

  const isTrying = useMemo(() => {
    return !!tryKey && tryRespMap[tryKey] === undefined;
  }, [tryKey, tryRespMap]);

  const value = useMemo(() => {
    return {
      isTrying,
      token,
      setToken,
      isDAUsdc,
      chain,
      setChain,
      recipient,
      setRecipient,
      amount,
      setAmount,
      tryResp,
      overBalance,
      page,
      setPage,
      recipientError,
      tryErrorCode,
      validedFungibleChains,
      doTry,
      paramsValid,
      outChain,
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
    token,
    chain,
    setToken,
    setChain,
    setRecipient,
    overBalance,
    recipient,
    page,
    setPage,
    recipientError,
    isDAUsdc,
    tryErrorCode,
    validedFungibleChains,
    doTry,
    paramsValid,
    outChain,
    isMaxModel,
    setIsMaxModel,
    isTryingMax,
    setIsTryingMax,
  ]);

  return <SetContext.Provider value={value}>{children}</SetContext.Provider>;
}

export function useSendV2Data() {
  return useContext(SetContext);
}

export function useSendMaxAmount({ token }: { token?: Token }) {
  const baseBalance = useSwapBalance({ token });
  const available = baseBalance?.available;
  const { solBalanceLimit, btcBalanceLimit } = useInfo();
  return useMemo(() => {
    const isSol = tokenIsSol(token);
    const isBtc = tokenIsBtc(token);
    let res = available;
    if (isSol) {
      res = minus(available, solBalanceLimit);
    }
    if (isBtc) {
      res = minus(available, btcBalanceLimit);
    }
    if (Number(res) < 0) {
      res = '0';
    }
    return res;
  }, [available, solBalanceLimit, btcBalanceLimit, token]);
}

export function useSendSolTips({
  token,
  amount,
}: {
  token: Token;
  amount: string;
}) {
  const tokenBalance = useSwapBalance({ token });
  const { solBalanceLimit } = useInfo();
  const intl = useIntl();
  const available = tokenBalance?.available;

  return useMemo(() => {
    if (token?.code !== TOKEN_SOL_CODE || token?.chain !== 'SOLANA') {
      return '';
    }
    if (!solBalanceLimit) return '';
    if (!isNumber(available)) return '';

    if (!isNumber(amount) || Number(amount) <= 0) return '';
    if (available < solBalanceLimit) {
      if (isLessThan(available, amount)) return intl.insufficient_balance;
      return intl.minimum_XXX.replace(
        '$XXX',
        `${solBalanceLimit} ${token?.symbol}`
      );
    }
    if (available >= solBalanceLimit) {
      const max = minus(available, solBalanceLimit);
      if (isLessThan(max, amount))
        return intl.maximum_XXX.replace('$XXX', `${max} ${token?.symbol}`);
      return '';
    }
    return '';
  }, [token, amount, solBalanceLimit, intl, available]);
}

export function useSendBtcTips({
  token,
  amount,
}: {
  token: Token;
  amount: string;
}) {
  const intl = useIntl();
  const baseBalance = useSwapBalance({ token });
  const { btcBalanceLimit } = useInfo();
  const available = baseBalance?.available;
  return useMemo(() => {
    if (token?.code !== 'BTC' || token?.chain !== 'BITCOIN') {
      return '';
    }
    if (!isNumber(amount) || Number(amount) <= 0) return '';
    if (isLessThan(amount, btcBalanceLimit))
      return intl.minimum_XXX.replace(
        '$XXX',
        `${btcBalanceLimit} ${token?.symbol}`
      );

    if (Number(available) >= Number(btcBalanceLimit)) {
      if (!isNumber(amount) || Number(amount) < 0) return '';
      const max = minus(available, btcBalanceLimit);
      if (isLessThan(max, amount))
        return intl.maximum_XXX.replace('$XXX', `${max} ${token?.symbol}`);
      return '';
    }
    return '';
  }, [token, amount, intl, btcBalanceLimit, available]);
}

export function useCheckParams({
  isMaxModel,
  recipient,
  amount,
  token: token_,
  chain: chain_,
  validedFungibleChains,
}: {
  isMaxModel: boolean;
  recipient: string;
  amount: string;
  token: Token;
  chain: Type_DAChains;
  validedFungibleChains: Type_DAChains[];
}) {
  const token = useSwapBalance({ token: token_ });

  const isDAUsdc = useIsFungibleUsdc({ token });
  const chain = isDAUsdc ? chain_ : token?.chain;

  const chainInfos = useChainInfos();
  const solTips = useSendSolTips({ token, amount });
  const btcTips = useSendBtcTips({ token, amount });
  const tokenTips = useMemo(() => {
    return btcTips || solTips;
  }, [btcTips, solTips]);

  const isValidRecipient = useMemo(() => {
    if (!recipient) return true;
    if (!isDAUsdc) {
      const curChainInfo = chainInfos.find((d) => d.chain === chain);
      return isAddressValid(
        curChainInfo?.chain as Type_DAChains,
        recipient,
        curChainInfo?.addressRegex
      );
    }
    if (!chain) return validedFungibleChains.length > 0;
    return validedFungibleChains.includes(chain);
  }, [chain, recipient, chainInfos, isDAUsdc, validedFungibleChains]);

  return useMemo(() => {
    let maxNum = token?.available || '0';
    if (isLessThan(maxNum, 0)) {
      maxNum = '0';
    }

    const overMax = isLessThan(maxNum, amount);
    const amountErr =
      !isMaxModel && (!isNumber(amount) || isLessOrEqualThan(amount, 0));
    return {
      overMax,
      amountErr,
      tokenErr: !token?.code,
      recipientError: !isValidRecipient,
      maxNum,
      tokenTips,
      disabled:
        overMax ||
        amountErr ||
        !recipient ||
        !token?.code ||
        !isValidRecipient ||
        !!tokenTips,
    };
  }, [isValidRecipient, amount, recipient, token, tokenTips, isMaxModel]);
}

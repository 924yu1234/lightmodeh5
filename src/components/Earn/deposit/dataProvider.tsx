import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useDebounce } from 'ahooks';

import { BalanceToken, CommonToken, Token } from 'src/constants/interface';
import { TOKEN_SOL_CODE, Type_DAChains } from 'src/da';
import { useIntl } from 'src/locals';
import { useInfo, useUsdcTokensMap } from 'src/state/application/hooks';
import { useDexAccount } from 'src/state/dexAccount/hooks';
import { useCreateTryData } from 'src/state/dexAccount/opr/useCreateEarnOrder';
import { useVault } from 'src/state/intent/earn/hooks';
import { usePostIntentTry } from 'src/state/intent/intentService';
import { useSwapBalance } from 'src/state/swap/balances/hooks';
import { useSwapTokenInfo } from 'src/state/swap/tokenInfo/hooks';
import digit, { isNumber } from 'src/utils/digit';
import { logEarn } from 'src/utils/log/swap';
import message from 'src/utils/message';
import { isLessThan, minus } from 'src/utils/numberUtils';

export interface VaultDepositContext {
  vault: any;
  token: CommonToken;
  amount: string;
  setAmount: (amount: string) => void;
  showBalanceError: boolean;
  solTips: string;
  dailyRewards: string;
  isTrying: boolean;
  usdcToken?: Token;
  gasToken?: Token;
  setUsdcToken: (usdcToken: Token) => void;
  setGasToken: (gasToken: Token) => void;
  tryResp: any;
  tokenOut: Token;
  tokenOutBalance: BalanceToken;
  balanceTotal: string;
  balanceTotalDisplay: string;
  isUsdc: boolean;
  doTry: (gasToken?: Token) => Promise<any>;
  isMaxModel: number;
  setIsMaxModel: (isMaxModel: number) => void;
  isTryingMax: boolean;
  setIsTryingMax: (isTryingMax: boolean) => void;
}

const SetContext = React.createContext<VaultDepositContext>(
  {} as VaultDepositContext
);

export default function VaultDepositProvider({
  children,
  id,
}: {
  children: React.ReactElement;
  id: number;
}) {
  const [amount, setAmount] = useState<string>('');
  const [tryRespMap, setTryRespMap] = useState<Record<string, any>>({});
  const [refreshIndex, setRefreshIndex] = useState(0);
  const [usdcToken, setUsdcToken] = useState<Token | undefined>();
  const [gasToken, setGasToken] = useState<Token | undefined>();
  const [isMaxModel, setIsMaxModel] = useState(0);
  const [isTryingMax, setIsTryingMax] = useState(false);
  const intl = useIntl();

  const vault = useVault(id);
  const { da_owner } = useDexAccount();

  const usdcTokensMap = useUsdcTokensMap();
  const createTryData = useCreateTryData();
  const postIntentTry = usePostIntentTry();
  const debouncedAmount = useDebounce(amount, { wait: 500 });

  const isUsdc = useMemo(() => {
    if (!vault || !vault?.token) return false;
    const code = usdcTokensMap[vault?.chain as Type_DAChains]?.code;
    return code?.toLowerCase() === vault?.token?.code?.toLowerCase();
  }, [vault, usdcTokensMap]);

  const tokenOut = useMemo(() => {
    if (!isUsdc) {
      return vault?.token;
    }
    return usdcToken;
  }, [vault?.token, usdcToken, isUsdc]);
  const tokenOutBalance = useSwapBalance({ token: tokenOut });

  const balanceTotal = tokenOutBalance?.available ?? 0;

  const balanceTotalDisplay = useMemo(() => {
    return digit.formatWithDecimalsLess8(balanceTotal, tokenOut?.decimals, {
      precision: '#',
      groupSeparator: true,
      floor: true,
    });
  }, [balanceTotal, tokenOut?.decimals]);

  const tokenPrice = useSwapTokenInfo(isUsdc ? 0 : vault?.token?.id);
  const solTips = '';
  // useEarnSolTips({ token: tokenOut, amount });

  const showBalanceError =
    (Number(amount) > 0 && isLessThan(balanceTotal, amount)) || !!solTips;

  const debouncedAmountError =
    (Number(debouncedAmount) > 0 &&
      isLessThan(balanceTotal, debouncedAmount)) ||
    !!solTips;

  useEffect(() => {
    setAmount('');
    setIsMaxModel(0);
    setIsTryingMax(false);
  }, [id, da_owner]);

  const dailyRewards = useMemo(() => {
    const apy = vault?.detail?.totalApy;
    const price = isUsdc ? 1 : tokenPrice?.price;
    if (!apy || !price || !amount) return '--';
    const dailyRewards = (apy * price * Number(amount)) / 365;

    if (dailyRewards < 0.01) return '<$0.01';
    return `$${digit.formatWithDecimals(dailyRewards, 2)}`;
  }, [vault, tokenPrice, amount, isUsdc]);

  const timer = useRef<NodeJS.Timeout | null>(null);

  const tryKey = useMemo(() => {
    if (!vault.detail?.orderAddress || !tokenOut) {
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
    return `${da_owner}_${vault?.token?.code}_deposit_${tokenOut?.code}_${
      isMaxModel > 0 ? 'max' : debouncedAmount
    }_${gasToken?.code}`;
  }, [
    vault,
    debouncedAmount,
    debouncedAmountError,
    tokenOut,
    gasToken,
    isMaxModel,
    da_owner,
  ]);

  const doTry = useCallback(
    (gasToken?: Token) => {
      setGasToken(gasToken);
      if (timer.current) clearTimeout(timer.current);
      if (!vault.detail?.orderAddress || !tokenOut) {
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
      if (!!isMaxModel && Number(tokenOutBalance?.available) <= 0) {
        return Promise.resolve(undefined);
      }
      const tryData = createTryData({
        isMaxModel: !!isMaxModel,
        type: 'deposit',
        token: vault?.token,
        tokenOut,
        marketAddress: vault.detail?.orderAddress,
        address: vault.address,
        protocol: vault.detail?.protocol,
        amount: isMaxModel ? tokenOutBalance?.available : debouncedAmount,
        gasToken,
      });
      if (!tryData) return Promise.resolve(undefined);
      return postIntentTry(
        { ...tryData, tryKey: undefined },
        { isMaxModel: !!isMaxModel }
      )
        .then((resp) => {
          if (isMaxModel) setIsTryingMax(false);
          setTryRespMap({
            [tryData?.tryKey as string]: resp,
          });

          logEarn({
            event: 'earn try success',
            vault: {
              id: vault.id,
            },
            amount,
          });
          timer.current = setTimeout(() => {
            setRefreshIndex((pre) => pre + 1);
          }, 6000);
          return resp;
        })
        .catch((err) => {
          if (isMaxModel) setIsTryingMax(false);
          timer.current = setTimeout(() => {
            setRefreshIndex((pre) => pre + 1);
          }, 6000);
          logEarn({
            event: 'earn try failed',
            vault: {
              id: vault.id,
            },
            amount,
            error: err,
          });
          message.error(intl.common_err);
        });
    },
    [
      vault,
      debouncedAmount,
      debouncedAmountError,
      createTryData,
      tokenOut,
      postIntentTry,
      intl,
      amount,
      isMaxModel,
      tokenOutBalance,
    ]
  );

  const tryResp = useMemo(() => {
    return tryRespMap[tryKey];
  }, [tryRespMap, tryKey]);

  const isTrying = useMemo(() => {
    return !!tryKey && tryRespMap[tryKey] === undefined;
  }, [tryKey, tryRespMap]);

  useEffect(() => {
    if (isMaxModel && tryResp) {
      const { tokenOutAmount } = tryResp || {};
      setAmount(tokenOutAmount || '');
    }
  }, [isMaxModel, tryResp]);

  useEffect(() => {
    doTry(gasToken);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tryKey, refreshIndex]);

  const value = useMemo(() => {
    return {
      token: vault?.token || {},
      vault: vault || {},
      amount,
      setAmount,
      showBalanceError,
      dailyRewards,
      isTrying,
      tryResp,
      usdcToken,
      gasToken,
      setUsdcToken,
      setGasToken,
      tokenOut,
      tokenOutBalance,
      isUsdc,
      balanceTotal,
      balanceTotalDisplay,
      doTry,
      solTips,
      isMaxModel,
      setIsMaxModel,
      isTryingMax,
      setIsTryingMax,
    };
  }, [
    vault,
    amount,
    setAmount,
    showBalanceError,
    dailyRewards,
    isTrying,
    tryResp,
    usdcToken,
    gasToken,
    setUsdcToken,
    setGasToken,
    tokenOut,
    tokenOutBalance,
    balanceTotal,
    balanceTotalDisplay,
    isUsdc,
    doTry,
    solTips,
    isMaxModel,
    setIsMaxModel,
    isTryingMax,
    setIsTryingMax,
  ]);

  return <SetContext.Provider value={value}>{children}</SetContext.Provider>;
}

export function useVaultDeposit() {
  return useContext(SetContext);
}

export function useEarnSolTips({
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

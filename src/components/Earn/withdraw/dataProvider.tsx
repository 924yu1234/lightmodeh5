import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useDebounce } from 'ahooks';

import { CommonToken, Token } from 'src/constants/interface';
import { useIntl } from 'src/locals';
import { useCreateTryData } from 'src/state/dexAccount/opr/useCreateEarnOrder';
import { useVault } from 'src/state/intent/earn/hooks';
import { usePostIntentTry } from 'src/state/intent/intentService';
import digit, { isNumber } from 'src/utils/digit';
import { logEarn } from 'src/utils/log/swap';
import message from 'src/utils/message';
import { isLessThan } from 'src/utils/numberUtils';

export interface VaultWithdrawContext {
  isTrying: boolean;
  vault: any;
  token: CommonToken;
  amount: string;
  setAmount: (amount: string) => void;
  available: string;
  availableDisplay: string;
  showAvailableError: boolean;
  tryResp: any;
  doTry: (gasToken?: Token) => Promise<any>;
}

const SetContext = React.createContext<VaultWithdrawContext>(
  {} as VaultWithdrawContext
);

export default function VaultWithdrawProvider({
  children,
  id,
}: {
  children: React.ReactElement;
  id: number;
}) {
  const [amount, setAmount] = useState<string>('');
  const [isTrying, setIsTrying] = useState(false);
  const [tryResp, setTryResp] = useState<any>(null);
  const vault = useVault(id);
  const available = vault?.detail?.myDepositAmount;

  const createTryData = useCreateTryData();
  const postIntentTry = usePostIntentTry();
  const intl = useIntl();
  const debouncedAmount = useDebounce(amount, { wait: 500 });
  const [refreshIndex, setRefreshIndex] = useState(0);
  const [gasToken, setGasToken] = useState<Token | undefined>(undefined);

  const showAvailableError =
    Number(amount) > 0 && isLessThan(available, amount);
  const debouncedAmountError =
    Number(debouncedAmount) > 0 && isLessThan(available, debouncedAmount);

  useEffect(() => {
    setAmount('');
  }, [id]);

  const timer = useRef<NodeJS.Timeout | null>(null);
  const doTry = useCallback(
    // eslint-disable-next-line react/no-unused-prop-types
    (gasToken?: Token) => {
      setGasToken(gasToken);
      if (timer.current) clearTimeout(timer.current);
      if (
        !vault.detail?.orderAddress ||
        !isNumber(debouncedAmount) ||
        Number(debouncedAmount) <= 0 ||
        debouncedAmountError
      ) {
        return Promise.resolve(undefined);
      }
      const tryData = createTryData({
        type: 'withdraw',
        token: vault?.token,
        marketAddress: vault.detail?.orderAddress,
        address: vault.address,
        protocol: vault.detail?.protocol,
        amount: debouncedAmount,
        gasToken,
        detail: vault.detail,
      });
      if (!tryData) return Promise.resolve(undefined);
      setIsTrying(true);
      return postIntentTry({ ...tryData, tryKey: undefined })
        .then((resp) => {
          setIsTrying(false);
          setTryResp(resp);
          logEarn({
            event: 'earn withdraw try success',
            vault: {
              id: vault.id,
            },
            amount: debouncedAmount,
          });
          timer.current = setTimeout(() => {
            setRefreshIndex(refreshIndex + 1);
          }, 6000);
          return resp;
        })
        .catch((err) => {
          logEarn({
            event: 'earn try failed',
            vault: {
              id: vault.id,
            },
            amount: debouncedAmount,
            error: err,
          });
          message.error(intl.common_err);
          return Promise.reject(err);
        });
    },
    [
      vault,
      debouncedAmount,
      debouncedAmountError,
      createTryData,
      postIntentTry,
      refreshIndex,
      intl,
    ]
  );

  useEffect(() => {
    doTry(gasToken);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [doTry]);

  const value = useMemo(() => {
    return {
      token: vault?.token || {},
      vault: vault || {},
      amount,
      setAmount,
      available,
      availableDisplay: digit.formatWithDecimalsLess8(
        available,
        vault?.token?.decimals,
        {
          floor: true,
        }
      ),
      showAvailableError,
      isTrying,
      tryResp,
      doTry,
    };
  }, [
    vault,
    amount,
    setAmount,
    showAvailableError,
    available,
    isTrying,
    tryResp,
    doTry,
  ]);

  return <SetContext.Provider value={value}>{children}</SetContext.Provider>;
}

export function useVaultWithdraw() {
  return useContext(SetContext);
}

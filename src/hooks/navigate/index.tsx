import { useCallback } from 'react';

import useNavigateApp, {
  useAppChoosePair,
  useAppNavigateAdd,
  useAppNavigateSend,
} from 'src/h5/navigateApp';
import { useIsAppH5 } from 'src/providers/useWallet';
import useReceive from 'src/state/dexAccount/opr/useReceive';
import useSend from 'src/state/dexAccount/opr/useSend';

import useChoosePair from '../choosePair';
import useCustomNavigate from '../useCustomNavigate';

export function useToSend() {
  const send = useSend();
  const sendApp = useAppNavigateSend();
  const isApp = useIsAppH5();
  return useCallback(
    ({ token }: any) => {
      if (isApp) {
        sendApp({ token });
      } else {
        send({ token });
      }
    },
    [isApp, send, sendApp]
  );
}

export function useToReceive() {
  const receive = useReceive();
  const addApp = useAppNavigateAdd();
  const isApp = useIsAppH5();
  return useCallback(
    ({ token }: any) => {
      if (isApp) {
        addApp({ token });
      } else {
        receive({ token });
      }
    },
    [isApp, receive, addApp]
  );
}

export function useToSwap() {
  const navigate = useCustomNavigate();
  const navitateApp = useNavigateApp();
  const isApp = useIsAppH5();
  return useCallback(
    ({ token }: any) => {
      if (isApp) {
        const url = token
          ? `/swap?chain=${token?.chain}&code=${token?.code}`
          : '/swap';
        navitateApp(url);
      } else {
        const url = token
          ? `/swap/USDC/${token?.code}?chain=${token?.chain}`
          : '/swap';
        navigate(url);
      }
    },
    [isApp, navigate, navitateApp]
  );
}

export function useToChoosePair() {
  const appChoosePair = useAppChoosePair();
  const isApp = useIsAppH5();
  const choosePair = useChoosePair();

  return useCallback(
    (pair: any, page: any) => {
      if (isApp) {
        appChoosePair(pair, page);
      } else {
        choosePair(pair, page);
      }
    },
    [isApp, choosePair, appChoosePair]
  );
}

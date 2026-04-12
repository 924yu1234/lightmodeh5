import { useCallback } from 'react';

import { useSetLocale } from 'src/locals';
import getTimeZone from 'src/utils/getTimeZone';

import useEventTrack from '..';
import { EventType } from '../service';

export type Start_Source = 'connect_wallet' | 'switch_address';

export function useLogWalletStart() {
  const eventTrack = useEventTrack();
  const { locale } = useSetLocale();

  return useCallback(
    (source: Start_Source) => {
      const timeZone = getTimeZone();
      const logInfo = {
        source,
        dataParams: {
          timeZone,
          broswer_locale: navigator.language,
          locale,
        },
      };
      eventTrack({ type: EventType.connect_wallet_started, data: logInfo });
    },
    [eventTrack, locale]
  );
}

export type Action_Source =
  | 'metamask'
  | 'browser_wallet'
  | 'ledger'
  | 'wallet_connect'
  | 'canceled';

export function useLogWalletAction() {
  const eventTrack = useEventTrack();

  return useCallback(
    (action: Action_Source) => {
      const logInfo = {
        action,
      };
      eventTrack({ type: EventType.connect_wallet_action, data: logInfo });
    },
    [eventTrack]
  );
}

type Completed_Source = 'success_account' | 'success' | 'refused' | 'faild';

export function useLogWalletCompleted() {
  const eventTrack = useEventTrack();

  return useCallback(
    ({
      action,
      source,
      error,
      owner,
      walletName,
    }: {
      action: Completed_Source;
      source: Action_Source;
      error?: any;
      owner?: string;
      walletName?: string;
    }) => {
      const logInfo = {
        action,
        source,
        dataParams: error ? { error, source, walletName } : { walletName },
        owner,
      };

      eventTrack({ type: EventType.connect_wallet_completed, data: logInfo });
    },
    [eventTrack]
  );
}

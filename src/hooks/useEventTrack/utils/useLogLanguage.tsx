import { useCallback } from 'react';

import useWallet from 'src/providers/useWallet';

import useEventTrack from '..';
import { EventType } from '../service';

export function useLogLanguageStart() {
  const eventTrack = useEventTrack();

  return useCallback(() => {
    const time = new Date().getTime();
    const logInfo = {
      time,
    };
    eventTrack({ type: EventType.change_language_started, data: logInfo });
  }, [eventTrack]);
}

export function useLogLanguageCompleted() {
  const { account } = useWallet();
  const eventTrack = useEventTrack();

  return useCallback(
    (before: string, after: string) => {
      const time = new Date().getTime();
      const logInfo = {
        time,
        owner: account,
        dataParams: { before, after },
      };
      eventTrack({ type: EventType.change_language_completed, data: logInfo });
    },
    [eventTrack, account]
  );
}

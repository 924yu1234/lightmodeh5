import { useCallback } from 'react';

import useEventTrack from '..';
import { EventType } from '../service';

export function useLogSwapInput() {
  const eventTrack = useEventTrack();

  return useCallback(
    (action: string, data?: any) => {
      const time = new Date().getTime();
      const logInfo = {
        time,
        action,
        dataParams: data,
      };
      eventTrack({ type: EventType.swap_input, data: logInfo });
    },
    [eventTrack]
  );
}

export function useLogSwapEstimate() {
  const eventTrack = useEventTrack();

  return useCallback(
    (info: any) => {
      if (info.calcTime > 0) {
        const logInfo = {
          dataParams: { info },
        };
        eventTrack({ type: EventType.swap_calculation, data: logInfo });
      }
    },
    [eventTrack]
  );
}

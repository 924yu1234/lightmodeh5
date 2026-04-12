import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import useEventTrack from 'src/hooks/useEventTrack';
import { EventType } from 'src/hooks/useEventTrack/service';
import useWallet from 'src/providers/useWallet';

export default function useLogPageVisit() {
  const location = useLocation();
  const eventTrack = useEventTrack();
  const { account, referrer } = useWallet();
  const pathname = location.pathname;

  useEffect(() => {
    const url = pathname + location.search;
    const visitTime = new Date().getTime();

    const visitInfo = {
      url,
      time: visitTime,
      owner: account,
      source: referrer,
    };
    eventTrack({ type: EventType.page_view, data: visitInfo });

    return () => {
      const leaveTime = new Date().getTime();
      const stayDuration = leaveTime - visitTime;
      const data = {
        url,
        time: leaveTime,
        owner: account,
        dwell_time: stayDuration,
      };
      eventTrack({ type: EventType.time_on_page, data });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, account, eventTrack, referrer]);
}

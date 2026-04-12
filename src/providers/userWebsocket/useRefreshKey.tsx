import { useEffect, useRef, useState } from 'react';

import { useDexAccount } from 'js/state/dexAccount/hooks';

import { useRefreshListenKey } from './service';

export default function useRefreshKey(listenKeyData: any) {
  const refreshTimer = useRef<ReturnType<typeof setTimeout>>();
  const dexAccount = useDexAccount();
  const [index, setIndex] = useState(1);
  const refreshListenKey = useRefreshListenKey();

  useEffect(() => {
    if (
      listenKeyData?.listenKey &&
      listenKeyData?.account === dexAccount.account
    ) {
      if (refreshTimer.current) {
        clearTimeout(refreshTimer.current);
      }
      refreshTimer.current = setTimeout(() => {
        setIndex(index + 1);
        refreshListenKey({ listenKey: listenKeyData?.listenKey }).catch(
          () => {}
        );
      }, 1800000); // 30 minutes
    }
  }, [index, dexAccount.account, listenKeyData, refreshListenKey]);
}

import { useCallback, useEffect } from 'react';

import { useWalletOprs } from 'src/providers/useWallet';
import { usePostSyncToApp } from 'src/state/dexAccount/service';

export default function PrivyInitializeModal() {
  const { syncPrivyToApp } = useWalletOprs();
  const post = usePostSyncToApp();
  // const [signResp, setSignResp] = useState<any>(null);
  const uploadHash = useCallback(
    ({ hash, uuid }: { hash: string; uuid: string }): Promise<boolean> => {
      return post({ uuid, hash });
    },
    [post]
  );

  useEffect(() => {
    syncPrivyToApp({ uploadHash });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}

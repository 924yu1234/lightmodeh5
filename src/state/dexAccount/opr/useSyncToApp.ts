import { useCallback } from 'react';

import { useWalletOprs } from 'src/providers/useWallet';

import { usePostSyncToApp } from '../service';

export default function useSyncToApp() {
  const { syncToApp } = useWalletOprs();

  const post = usePostSyncToApp();
  const uploadHash = useCallback(
    ({ hash, uuid }: { hash: string; uuid: string }): Promise<boolean> => {
      return post({ uuid, hash });
    },
    [post]
  );
  return useCallback(() => {
    return syncToApp({ uploadHash });
  }, [syncToApp, uploadHash]);
}

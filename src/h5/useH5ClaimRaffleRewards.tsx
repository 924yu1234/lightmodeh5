import { useCallback } from 'react';

import { useWalletOprs } from 'src/providers/useWallet';

export function formatSignDate(dateObj: Date): string {
  const year = dateObj.getUTCFullYear();
  const month = String(dateObj.getUTCMonth() + 1).padStart(2, '0');
  const day = String(dateObj.getUTCDate()).padStart(2, '0');
  const hours = String(dateObj.getUTCHours()).padStart(2, '0');
  const minutes = String(dateObj.getUTCMinutes()).padStart(2, '0');
  const seconds = String(dateObj.getUTCSeconds()).padStart(2, '0');
  const milliseconds = String(dateObj.getUTCMilliseconds()).padStart(3, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds} UTC`;
}

function getSignClaimRaffleMsg(time: Date): string {
  return `Claim\n${formatSignDate(time)}`;
}

export function useH5ClaimRaffleRewards() {
  const { callAppPromise } = useWalletOprs();
  return useCallback(() => {
    const time = new Date();
    const msg = getSignClaimRaffleMsg(time);
    return callAppPromise('walletIdSign', msg).then((signature: any) => {
      return {
        signature,
        time: time.valueOf(),
      };
    });
  }, [callAppPromise]);
}

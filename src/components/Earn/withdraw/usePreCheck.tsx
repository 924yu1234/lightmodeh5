// 1. kamino需要账户最少0.05SOL资产才可以买理财

import { useCallback } from 'react';

import { TOKEN_SOL_CODE } from 'src/da';
import { useTotalSwapBalances } from 'src/hooks/useAssets';

import { useVaultWithdraw } from './dataProvider';

export function usePreCheckSolBalance() {
  const { vault } = useVaultWithdraw();
  const swapBalances = useTotalSwapBalances();
  return useCallback(() => {
    const checkSolBalance = vault.protocol === 'Kamino';
    if (!checkSolBalance) return true;
    const solBalance = swapBalances.find(
      (item: any) => item.code === TOKEN_SOL_CODE
    );
    if (!solBalance || Number(solBalance?.available) < 0.01) {
      return false;
    }
    return true;
  }, [vault, swapBalances]);
}

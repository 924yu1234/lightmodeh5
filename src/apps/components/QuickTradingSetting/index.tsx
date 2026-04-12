import React, { useMemo } from 'react';

import useWallet, { useWalletOprs } from 'src/providers/useWallet';
import { useDexAccount } from 'src/state/dexAccount/hooks';
import { useThemeParams } from 'src/theme';

import { useIntl } from 'js/locals';

import ModeSelectMobile from './mSelect';
import ModeSelectPC from './pcSelect';

export default function QuickTradingSetting() {
  const intl = useIntl();
  const dexAccount = useDexAccount();
  const { isMobile } = useThemeParams();

  const { allowQuickTrading } = useWallet();
  const { updateAllowQuickTrading } = useWalletOprs();

  const options = useMemo(() => {
    return [
      {
        value: 'Standard',
        label: intl.authorization_mode_standard,
      },
      {
        value: 'Single-Use',
        label: intl.authorization_mode_single_use,
      },
    ];
  }, [intl]);
  if (!dexAccount.hasSyncDA) return null;
  return isMobile ? (
    <ModeSelectMobile
      options={options}
      value={allowQuickTrading ? 'Standard' : 'Single-Use'}
      onChange={(val: string) => {
        updateAllowQuickTrading(val === 'Standard');
      }}
    />
  ) : (
    <ModeSelectPC
      options={options}
      value={allowQuickTrading ? 'Standard' : 'Single-Use'}
      onChange={(val: string) => {
        updateAllowQuickTrading(val === 'Standard');
      }}
    />
  );
}

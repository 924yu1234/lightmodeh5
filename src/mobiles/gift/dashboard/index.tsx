import React from 'react';

import { useIsAppH5 } from 'src/providers/useWallet';

import DashboardInApph5 from './app';
import DashboardMobile from './mobile';

export default function Dashboard() {
  const isAppH5 = useIsAppH5();
  if (isAppH5) {
    return <DashboardInApph5 />;
  }
  return <DashboardMobile />;
}

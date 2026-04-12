import React from 'react';

import PositionsTabs from 'src/components/TurboRange/positions/tabs';
import useWallet from 'src/providers/useWallet';

import NoAccountTips from './noAccountTips';
import PositionSummary from './positionSummary';

export default function Account() {
  const { account } = useWallet();

  if (!account) {
    return <NoAccountTips />;
  }

  return (
    <div className="account-tpl">
      <div className="account-inner">
        <PositionSummary />
        <div className="positions-tab-wrapper">
          <PositionsTabs />
        </div>
      </div>
    </div>
  );
}

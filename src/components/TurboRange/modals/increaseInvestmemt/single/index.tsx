import React from 'react';

import { TurboRangePosition } from 'src/state/turboRange/reducer';

import ActiveCapital from './activeCapital';
import Amount from './amount';
import Balance from './balance';
import Btn from './btn';
import IncreaseInvestmentProvider from './dataProvider';
import FeeView from './fee';

export default function SingleIncreaseInvestment({
  position,
}: {
  position: TurboRangePosition;
}) {
  return (
    <IncreaseInvestmentProvider position={position}>
      <>
        <Amount />
        <Balance />
        <ActiveCapital />
        <FeeView />
        <Btn />
      </>
    </IncreaseInvestmentProvider>
  );
}

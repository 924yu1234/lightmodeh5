import React from 'react';

import { useIntl } from 'src/locals';
import { TurboRangePosition } from 'src/state/turboRange/reducer';

import ActiveCapital from './activeCapital';
import BaseAmount from './baseAmount';
import BaseBalance from './baseBalance';
import Btn from './btn';
import DualIncreaseInvestmentProvider from './dataProvider';
import FeeView from './fee';
import QuoteAmount from './quoteAmount';
import QuoteBalance from './quoteBalance';

export default function DualIncreaseInvestment({
  position,
}: {
  position: TurboRangePosition;
}) {
  const intl = useIntl();

  return (
    <DualIncreaseInvestmentProvider position={position}>
      <>
        <div className="item-title" style={{ marginTop: '4px' }}>
          {intl.amount}
        </div>
        <BaseAmount />
        <BaseBalance />
        <QuoteAmount />
        <QuoteBalance />
        <ActiveCapital />
        <FeeView />
        <Btn />
      </>
    </DualIncreaseInvestmentProvider>
  );
}

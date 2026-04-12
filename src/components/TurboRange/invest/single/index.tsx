import React from 'react';

import SingleBacktest from 'src/components/TurboRange/invest/single/views/backtest';
import InvestModeTab from 'src/components/TurboRange/invest/tab';

import ApySection from '../apy';
import InvestProvider from './dataProvider';
import Amount from './views/amount';
import Balance from './views/balance';
import Btn from './views/btn';
import FeeView from './views/fee';
import Token from './views/token';

export default function SingleInvest() {
  return (
    <InvestProvider>
      <>
        <Token />
        <InvestModeTab />
        <Amount />
        <Balance />
        <ApySection />
        <SingleBacktest />
        <FeeView />
        <Btn />
      </>
    </InvestProvider>
  );
}

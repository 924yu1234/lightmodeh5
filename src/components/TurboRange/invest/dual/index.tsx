import React from 'react';
import styled from 'styled-components';

import InvestModeTab from 'src/components/TurboRange/invest/tab';

import ApySection from '../apy';
import DualInvestProvider from './dataProvider';
import DualBacktest from './views/backtest';
import BaseAmount from './views/baseAmount';
import BaseBalance from './views/baseBalance';
import Btn from './views/btn';
import FeeView from './views/fee';
import QuoteAmount from './views/quoteAmount';
import QuoteBalance from './views/quoteBalance';
import Token from './views/token';

export default function DualInvest() {
  return (
    <DualInvestProvider>
      <StyledDualInvest>
        <Token />
        <InvestModeTab />
        <BaseAmount />
        <BaseBalance />
        <QuoteAmount />
        <QuoteBalance />
        <ApySection />
        <DualBacktest />
        <FeeView />
        <Btn />
      </StyledDualInvest>
    </DualInvestProvider>
  );
}

const StyledDualInvest = styled.div`
  .item-title {
    margin-bottom: 7px;
    margin-top: 0;
  }
`;

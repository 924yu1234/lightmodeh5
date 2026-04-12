import React from 'react';

import { useShowH5Header } from 'src/h5/utils';
import { useIntl } from 'src/locals';
import { useThemeParams } from 'src/theme';

import Header from '../components/header';
import StocksPairs from '../home/list/common';
import { StyledChart } from './style';

export default function StockPairs() {
  const showH5Header = useShowH5Header();
  const intl = useIntl();
  const { windowHeight } = useThemeParams();

  const popupHeight = windowHeight - 60;

  return (
    <StyledChart>
      {showH5Header && <Header title={intl.Stocks} backUrl="/" />}
      <StocksPairs popupHeight={popupHeight} type="stocks" chain="all" />
    </StyledChart>
  );
}

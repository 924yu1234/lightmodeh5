import React from 'react';
import styled from 'styled-components';

import ChooseSwapPair from 'src/apps/components/chooseSwapPair';

import Ticker from './ticker';

export default function Top() {
  return (
    <StyledTop>
      <ChooseSwapPair />
      <Ticker />
    </StyledTop>
  );
}

export const StyledTop = styled.div`
  ${(props) => props.theme.fontRegular};
  display: flex;
  align-items: center;
  padding: 0 20px;
  height: 100%;
  width: 100%;
`;

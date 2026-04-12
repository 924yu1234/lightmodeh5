import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import Header from 'src/mobiles/components/header';
import { ThemeType } from 'src/theme';

import { useShowH5Header } from '../utils';
import SwapPair from './swap';

export default function PairInfo() {
  const { id } = useParams();
  const pairId = Number(id);
  const showH5Header = useShowH5Header();

  return (
    <StyledPairInfo>
      {showH5Header && <Header />}
      <div className="page-inner">
        <SwapPair pairId={pairId} />
      </div>
    </StyledPairInfo>
  );
}

const StyledPairInfo = styled.div`
  width: 100%;
  height: 100%;
  padding-top: ${({ theme }: { theme: ThemeType }) =>
    !theme.showH5Header ? 0 : 52}px;
  .page-inner {
    height: ${(props) =>
      props.theme.windowHeight - (!props.theme.showH5Header ? 0 : 52)}px;
    width: ${(props) => props.theme.windowWidth}px;
    overflow: hidden auto;
  }
`;

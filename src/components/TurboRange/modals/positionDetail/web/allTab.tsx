import React from 'react';
import styled from 'styled-components';

import { TurboRangePosition } from 'src/state/turboRange/reducer';

import BottomInfo from '../views/bottomInfo';
import YieldCards from '../views/yieldCards';

export default function AllTab({ position }: { position: TurboRangePosition }) {
  return (
    <StyledAllTab>
      <YieldCards position={position} />
      <BottomInfo position={position} />
    </StyledAllTab>
  );
}

const StyledAllTab = styled.div``;

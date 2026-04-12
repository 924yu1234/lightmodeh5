import React from 'react';
import styled from 'styled-components';

import useWindowSize from 'src/hooks/useWindowSize';
import MSwapHistory from 'src/mobiles/account/history/swap';

export default function SwapHistory() {
  const { height } = useWindowSize();
  const contentHeight = height - 250;
  return (
    <StyledSwapHistory>
      <MSwapHistory height={contentHeight} />
    </StyledSwapHistory>
  );
}

const StyledSwapHistory = styled.div``;

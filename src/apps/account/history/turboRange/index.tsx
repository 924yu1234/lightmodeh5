import React from 'react';
import styled from 'styled-components';

import useWindowSize from 'src/hooks/useWindowSize';
import MTurboRangeHistory from 'src/mobiles/account/history/turboRange';

export default function TurboRangeHistory() {
  const { height } = useWindowSize();
  const contentHeight = height - 250;
  return (
    <StyledTurboRangeHistory>
      <MTurboRangeHistory height={contentHeight} />
    </StyledTurboRangeHistory>
  );
}

const StyledTurboRangeHistory = styled.div``;

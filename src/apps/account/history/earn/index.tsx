import React from 'react';
import styled from 'styled-components';

import useWindowSize from 'src/hooks/useWindowSize';
import MEarnHistory from 'src/mobiles/account/history/earn';

export default function EarnHistory() {
  const { height } = useWindowSize();
  const contentHeight = height - 250;
  return (
    <StyledEarnHistory>
      <MEarnHistory height={contentHeight} />
    </StyledEarnHistory>
  );
}

const StyledEarnHistory = styled.div``;

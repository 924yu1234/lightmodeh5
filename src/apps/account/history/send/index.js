import React from 'react';
import styled from 'styled-components';

import useWindowSize from 'src/hooks/useWindowSize';
import MSendHistory from 'src/mobiles/account/history/send';

export default function SendHistory() {
  const { height } = useWindowSize();
  const contentHeight = height - 250;
  return (
    <StyledSendHistory>
      <MSendHistory height={contentHeight} />
    </StyledSendHistory>
  );
}

const StyledSendHistory = styled.div``;

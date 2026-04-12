import React from 'react';
import styled from 'styled-components';

import useWindowSize from 'src/hooks/useWindowSize';
import MBridgeHistory from 'src/mobiles/account/history/bridge';

export default function BridgeHistory() {
  const { height } = useWindowSize();
  const contentHeight = height - 250;
  return (
    <StyledBridgeHistory>
      <MBridgeHistory height={contentHeight} />
    </StyledBridgeHistory>
  );
}

const StyledBridgeHistory = styled.div``;

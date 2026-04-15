import React from 'react';
import styled from 'styled-components';

import PositionHistoryList from 'src/components/TurboRange/modals/positionHistory/HistoryList';
import { TurboRangePosition } from 'src/state/turboRange/reducer';

export default function HistoryTab({
  position,
}: {
  position: TurboRangePosition;
}) {
  return (
    <StyledHistoryTab>
      <PositionHistoryList position={position} />
    </StyledHistoryTab>
  );
}

const StyledHistoryTab = styled.div`
  max-height: 500px;
  overflow-y: auto;
`;

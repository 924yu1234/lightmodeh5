import React from 'react';
import styled from 'styled-components';

import { usePositionRangeStatus } from 'src/state/turboRange/hooks';
import { TurboRangeRangeStatusTarget } from 'src/state/turboRange/reducer';
import { ThemeType } from 'src/theme';

export default function PositionStatusIcon({
  position,
}: {
  position: TurboRangeRangeStatusTarget;
}) {
  const rangeStatus = usePositionRangeStatus(position);

  if (!rangeStatus) return null;

  return (
    <StyledPositionStatus
      className={`position-status-icon ${
        rangeStatus === 'in-range' ? 'in-range' : 'out-range'
      }`}
    >
      <div className="status-pointer-icon"></div>
    </StyledPositionStatus>
  );
}

const StyledPositionStatus = styled.div`
  height: 13px;
  width: 13px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid ${(props) => props.theme.border3};

  &.in-range {
    .status-pointer-icon {
      height: 9px;
      width: 9px;
      border-radius: 50%;
      background: ${({ theme }: { theme: ThemeType }) => theme.green};
      box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.5);
    }
  }

  &.out-range {
    .status-pointer-icon {
      background: ${({ theme }: { theme: ThemeType }) => theme.yellow};
      height: 9px;
      width: 9px;
      border-radius: 50%;
    }
  }
`;

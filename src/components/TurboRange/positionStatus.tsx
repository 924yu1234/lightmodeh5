import React from 'react';
import styled from 'styled-components';

import { useIntl } from 'src/locals';
import { usePositionRangeStatus } from 'src/state/turboRange/hooks';
import { TurboRangeRangeStatusTarget } from 'src/state/turboRange/reducer';
import { ThemeType } from 'src/theme';

export default function PositionStatus({
  position,
  hideInRange,
}: {
  position: TurboRangeRangeStatusTarget;
  hideInRange?: boolean;
}) {
  const intl = useIntl();
  const { status } = position;
  const rangeStatus = usePositionRangeStatus(position);
  if (status === 'CLOSED')
    return (
      <StyledPositionStatus className="position-status">
        {intl.Closed}
      </StyledPositionStatus>
    );

  if (!rangeStatus) return null;

  if (hideInRange && rangeStatus === 'in-range') return null;

  return (
    <StyledPositionStatus
      className={`position-status ${
        rangeStatus === 'in-range' ? 'in-range' : 'out-range'
      }`}
    >
      <div className="status-pointer-icon"></div>
      {rangeStatus === 'in-range' && intl.turboRange.in_range}
      {rangeStatus === 'out-of-range' && intl.turboRange.out_of_range}
    </StyledPositionStatus>
  );
}

const StyledPositionStatus = styled.div`
  background: ${({ theme }) => theme.bg_b7b_10};
  padding: 0 10px;
  height: 23px;
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
  color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b};
  font-size: 12px;
  line-height: 20px;
  gap: 5px;
  border-radius: 5px;

  &.in-range {
    background: ${({ theme }: { theme: ThemeType }) => theme.buy_10};
    color: ${({ theme }: { theme: ThemeType }) => theme.green};
    .status-pointer-icon {
      background: ${({ theme }: { theme: ThemeType }) => theme.green};
      width: 5px;
      height: 5px;
      border-radius: 50%;
    }
  }

  &.out-range {
    background: ${({ theme }: { theme: ThemeType }) => theme.yellow_10};
    color: ${({ theme }: { theme: ThemeType }) => theme.yellow};
    .status-pointer-icon {
      background: ${({ theme }: { theme: ThemeType }) => theme.yellow};
      width: 5px;
      height: 5px;
      border-radius: 50%;
    }
  }
`;

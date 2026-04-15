import React from 'react';

import { TurboRangePosition } from 'src/state/turboRange/reducer';

import HourlyBreakdownContent from './hourlyBreakdownContent';

export default function Last24hTab({
  position,
}: {
  position: TurboRangePosition;
}) {
  return <HourlyBreakdownContent position={position} />;
}

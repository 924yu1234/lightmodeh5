import React from 'react';

import { useTurboRangeProductName } from 'src/state/turboRange/hooks';

export default function ProductName({ poolAddress }: { poolAddress?: string }) {
  const name = useTurboRangeProductName(poolAddress || '');
  return <>{name}</>;
}

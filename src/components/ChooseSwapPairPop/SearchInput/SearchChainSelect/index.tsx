import React from 'react';

import { useThemeParams } from 'src/theme';

import DAChainsSelectM from './mobile';
import DAChainsSelectPC from './pc';

export default function SearchChainSelect({
  maxHeight,
}: {
  maxHeight: number;
}) {
  const { isMobile } = useThemeParams();

  if (isMobile) {
    return <DAChainsSelectM />;
  }
  return <DAChainsSelectPC maxHeight={maxHeight} />;
}

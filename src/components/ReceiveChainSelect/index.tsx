import React from 'react';

import { Type_DAChains } from 'src/da';
import { useThemeParams } from 'src/theme';

import DAChainsSelectM from './mobile';
import DAChainsSelectWeb from './web';

export default function ReceiveChainSelect({
  value,
  onChange,
}: {
  value?: Type_DAChains | '';
  onChange: (chainId: Type_DAChains) => void;
}) {
  const { isMobile } = useThemeParams();

  if (isMobile) {
    return <DAChainsSelectM value={value} onChange={onChange} />;
  }
  return <DAChainsSelectWeb value={value} onChange={onChange} />;
}

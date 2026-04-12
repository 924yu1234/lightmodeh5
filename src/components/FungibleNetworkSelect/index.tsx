import React, { useMemo } from 'react';

import { Type_DAChains } from 'src/da';
import { useFungbileChains } from 'src/state/application/hooks';
import { useThemeParams } from 'src/theme';

import FungibleNetworkSelectM from './mobile';
import FungibleNetworkSelectPC from './pc';

export default function FungibleNetworkSelect({
  chain,
  onChange,
  validedFungibleChains,
}: {
  chain: Type_DAChains;
  onChange: (network: Type_DAChains) => void;
  validedFungibleChains: Type_DAChains[];
}) {
  const fungibleChains = useFungbileChains();
  const { isMobile } = useThemeParams();

  const options = useMemo(() => {
    const validChains = fungibleChains
      .filter((d) => validedFungibleChains.includes(d))
      .map((d) => ({
        valid: true,
        chain: d,
      }));
    const invalidChains = fungibleChains
      .filter((d) => !validedFungibleChains.includes(d))
      .map((d) => ({
        valid: false,
        chain: d,
      }));
    return validChains.concat(invalidChains);
  }, [fungibleChains, validedFungibleChains]);

  if (isMobile) {
    return (
      <FungibleNetworkSelectM
        showErr={false}
        value={chain}
        options={options as { valid: boolean; chain: Type_DAChains }[]}
        onChange={onChange}
      />
    );
  }
  return (
    <FungibleNetworkSelectPC
      showErr={false}
      value={chain}
      options={options as { valid: boolean; chain: Type_DAChains }[]}
      onChange={onChange}
    />
  );
}

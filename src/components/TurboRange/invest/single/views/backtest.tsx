import React from 'react';

import { useApyContext } from 'src/components/TurboRange/invest/apyProvider';
import ApyBacktest from 'src/components/TurboRange/modals/apyBacktest';

export default function SingleBacktest() {
  const { product, minPrice, maxPrice, setPrice } = useApyContext();
  return (
    <ApyBacktest
      poolAddress={product.poolAddress}
      minPrice={minPrice}
      maxPrice={maxPrice}
      onChange={({ minPrice, maxPrice }: any) => {
        setPrice({ minPrice, maxPrice });
      }}
    />
  );
}

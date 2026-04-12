import React from 'react';

import { CommonToken } from 'src/constants/interface';
import { useTurboRangeProduct } from 'src/state/turboRange/hooks';

export default function CommonSenseSymbol({
  poolAddress,
  token,
}: {
  poolAddress: string;
  token?: CommonToken;
}) {
  const product = useTurboRangeProduct(poolAddress);
  if (!product?.poolAddress) return null;
  if (token && token.symbol !== product.baseToken?.symbol) {
    return <>{token.symbol}</>;
  }
  return <>{product.commonSenseSymbol || product?.name}</>;
}

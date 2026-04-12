import React from 'react';

import SwapPairItem from './swapPairItem';

export default function PairItem({
  pair,
  style,
  ...rest
}: {
  pair: any;
  style?: any;
}) {
  return <SwapPairItem pair={pair} style={style} {...rest} />;
}

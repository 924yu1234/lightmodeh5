import React from 'react';

import { CommonToken } from 'src/constants/interface';

import TokenIcon from '../Token/icon';

export default function PairLogo({
  baseToken,
  size = 32,
}: {
  baseToken: CommonToken;
  size?: number;
}) {
  return <TokenIcon token={baseToken} size={size} className="pair-logo" />;
}

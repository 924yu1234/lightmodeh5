import React from 'react';

import { CommonToken } from 'src/constants/interface';
import { useSwapToken } from 'src/hooks/SwapToken';

import TokenSymbol from '../Token/symbol';

export default function RewardTokenSymbol({ token }: { token: CommonToken }) {
  const { token: _token } = useSwapToken({ code: token.code });
  return <TokenSymbol token={_token || token} />;
}

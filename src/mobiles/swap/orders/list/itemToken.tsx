import React from 'react';

import { useToSwap } from 'src/hooks/navigate';
import { useIsDAUsdc } from 'src/state/swap/tokens/hook';

export default function ItemToken({ token }: { token: any }) {
  const toSwap = useToSwap();
  const isDAUsdc = useIsDAUsdc({ token });
  if (isDAUsdc) {
    return <div>{token?.symbol}</div>;
  }
  return (
    <div
      className="text-underline-dotted"
      onClick={(e) => {
        e.stopPropagation();
        toSwap({ token });
      }}
    >
      {token?.symbol}
    </div>
  );
}

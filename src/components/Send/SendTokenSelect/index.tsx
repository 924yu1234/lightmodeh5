import React, { useMemo } from 'react';

import { useSwapSendTokens } from 'src/hooks/useSendTokens';
import { zeroResult } from 'src/state/swap/balances/utils';

import { useSendData } from '../sendDataProvider';
import TokenSelectPC from './pc';

export default function SendTokenSelect() {
  const { token, setToken } = useSendData();
  const tokens = useSwapSendTokens();
  const _showTokens = useMemo(() => {
    if (token && !tokens.find((d) => d.code === token.code)) {
      return [{ ...token, ...zeroResult }, ...tokens];
    }
    return tokens;
  }, [tokens, token]);
  return (
    <TokenSelectPC value={token} tokens={_showTokens} onChange={setToken} />
  );
}

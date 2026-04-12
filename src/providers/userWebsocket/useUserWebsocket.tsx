// UED project: Mock User WebSocket provider — no real WS connection
import React, { useCallback, useContext, useMemo } from 'react';
import PropTypes from 'prop-types';

import {
  ReadyState,
  Result,
  Subscribe,
  Unsubscribe,
} from '../useWebsocket';

const SetContext = React.createContext<Result>({} as Result);

export default function UserWebSocketProvicer({
  children,
}: {
  children: React.ReactElement;
}) {
  const subscribe = useCallback(() => {}, []);
  const unsubscribe = useCallback(() => {}, []);
  const reSub = useCallback(() => {}, []);

  const val = useMemo(
    (): Result => ({
      readyState: ReadyState.Open,
      subscribe: subscribe as unknown as Subscribe,
      unsubscribe: unsubscribe as unknown as Unsubscribe,
      reSub,
      retryTimes: 0,
    }),
    [subscribe, unsubscribe, reSub]
  );

  return <SetContext.Provider value={val}>{children}</SetContext.Provider>;
}

UserWebSocketProvicer.propTypes = {
  children: PropTypes.any,
};

export function useUserWebSocket() {
  return useContext(SetContext);
}

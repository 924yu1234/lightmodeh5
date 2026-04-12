// UED project: Mock WebSocket provider — no real WS connection
import React, { useCallback, useContext, useMemo } from 'react';
import PropTypes from 'prop-types';

export enum ReadyState {
  Connecting = 0,
  Open = 1,
  Closing = 2,
  Closed = 3,
}

export type Callback = (res: any) => void;
export type Subscribe = ({
  params,
  callback,
  componentkey,
  withoutSendingRequest,
}: {
  params: any;
  callback: Callback;
  componentkey: string;
  withoutSendingRequest?: boolean;
}) => void;

export type Unsubscribe = ({
  params,
  componentkey,
}: {
  params: any;
  componentkey: string;
}) => void;

export interface Result {
  readyState: ReadyState;
  subscribe: Subscribe;
  unsubscribe: Unsubscribe;
  reSub: () => void;
  retryTimes?: number;
}

const SetContext = React.createContext<Result>({} as Result);

export default function WebSocketProvicer({
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

WebSocketProvicer.propTypes = {
  children: PropTypes.any,
};

export function useScoket() {
  return useContext(SetContext);
}

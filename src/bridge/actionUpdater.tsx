import { useEffect, useMemo, useRef } from 'react';

import {
  addWalletBridgeEventListener,
  emitWalletBridgeEvent,
  notifyWalletBridgeReady,
  registerWalletBridgeAction,
} from 'src/bridge/walletBridge';
import useEventTrack from 'src/hooks/useEventTrack';
import {
  useLogWalletAction,
  useLogWalletCompleted,
} from 'src/hooks/useEventTrack/utils/useLogWallet';
import { logWallet } from 'src/utils/log';

import { appHistory } from 'js/history';
import useWallet from 'js/providers/useWallet';
import { usePostSyncToApp } from 'js/state/dexAccount/service';

const BRIDGE_ACTIVITY_THROTTLE_MS = 1000;

function _isBridgeMode() {
  return window !== window.top && !window._degate_app;
}

export default function BridgeActionUpdater() {
  const { updateWallet } = useWallet();
  const bridgeMode = useMemo(() => _isBridgeMode(), []);
  const lastActivityRef = useRef(0);
  const syncedRouteRef = useRef<string | null>(null);
  const postSyncToApp = usePostSyncToApp();
  const eventTrack = useEventTrack();
  const logWalletAction = useLogWalletAction();
  const logWalletCompleted = useLogWalletCompleted();

  useEffect(() => {
    if (!bridgeMode) {
      return undefined;
    }

    const removeStateListener = addWalletBridgeEventListener(
      'wallet.state',
      (payload) => {
        updateWallet(payload as any);
      }
    );

    const removeUploadHashHandler = registerWalletBridgeAction(
      'app.uploadHash',
      (payload) => {
        return postSyncToApp(payload as { hash: string; uuid: string });
      }
    );

    const removeWalletLogListener = addWalletBridgeEventListener(
      'wallet.logWallet',
      (payload) => {
        logWallet(payload);
      }
    );

    const removeWalletEventTrackListener = addWalletBridgeEventListener(
      'wallet.eventTrack',
      (payload) => {
        if (payload) {
          eventTrack(payload as { data: any; type: any });
        }
      }
    );

    const removeWalletLogActionListener = addWalletBridgeEventListener(
      'wallet.logWalletAction',
      (payload) => {
        const action = (payload as { action?: string })?.action;
        if (action) {
          logWalletAction(action as Parameters<typeof logWalletAction>[0]);
        }
      }
    );

    const removeWalletLogCompletedListener = addWalletBridgeEventListener(
      'wallet.logWalletCompleted',
      (payload) => {
        if (payload) {
          logWalletCompleted(
            payload as Parameters<typeof logWalletCompleted>[0]
          );
        }
      }
    );

    const buildPath = (location: {
      hash?: string;
      pathname?: string;
      search?: string;
    }) => {
      return `${location.pathname || ''}${location.search || ''}${
        location.hash || ''
      }`;
    };

    const emitRouteChange = (
      location: {
        hash?: string;
        pathname?: string;
        search?: string;
      },
      action = 'REPLACE'
    ) => {
      const path = buildPath(location);
      if (syncedRouteRef.current && syncedRouteRef.current === path) {
        syncedRouteRef.current = null;
        return;
      }

      emitWalletBridgeEvent('trade.routeChange', {
        action,
        hash: location.hash || '',
        path,
        pathname: location.pathname || '',
        search: location.search || '',
      });
    };

    const removeWalletRouteListener = addWalletBridgeEventListener(
      'wallet.routeChange',
      (payload) => {
        const {
          action = 'PUSH',
          hash = '',
          path,
          pathname,
          search = '',
        } = (payload || {}) as {
          action?: 'POP' | 'PUSH' | 'REPLACE';
          hash?: string;
          path?: string;
          pathname?: string;
          search?: string;
        };
        const nextPath = path || `${pathname || ''}${search}${hash}`;
        const currentPath = buildPath(appHistory.location);
        if (!nextPath || nextPath === currentPath) return;
        syncedRouteRef.current = nextPath;

        if (action === 'REPLACE' || action === 'POP') {
          appHistory.replace(nextPath);
          return;
        }

        appHistory.push(nextPath);
      }
    );

    const emitActivity = () => {
      const now = Date.now();
      if (now - lastActivityRef.current < BRIDGE_ACTIVITY_THROTTLE_MS) return;
      lastActivityRef.current = now;
      emitWalletBridgeEvent('trade.activity', { time: now });
    };

    const passiveOptions = { passive: true } as AddEventListenerOptions;

    document.addEventListener('mousemove', emitActivity, passiveOptions);
    document.addEventListener('keydown', emitActivity);
    document.addEventListener('touchstart', emitActivity, passiveOptions);
    document.addEventListener('scroll', emitActivity, true);
    window.addEventListener('focus', emitActivity);

    emitRouteChange(appHistory.location, 'REPLACE');
    const unlisten = appHistory.listen(({ action, location }) => {
      emitRouteChange(location, action);
    });

    notifyWalletBridgeReady();

    return () => {
      removeStateListener();
      removeWalletRouteListener();
      removeUploadHashHandler();
      removeWalletLogListener();
      removeWalletEventTrackListener();
      removeWalletLogActionListener();
      removeWalletLogCompletedListener();
      document.removeEventListener('mousemove', emitActivity);
      document.removeEventListener('keydown', emitActivity);
      document.removeEventListener('touchstart', emitActivity);
      document.removeEventListener('scroll', emitActivity, true);
      window.removeEventListener('focus', emitActivity);
      unlisten();
    };
  }, [
    bridgeMode,
    eventTrack,
    logWalletAction,
    logWalletCompleted,
    postSyncToApp,
    updateWallet,
  ]);

  return null;
}

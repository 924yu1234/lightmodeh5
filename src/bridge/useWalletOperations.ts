import { useEffect, useMemo } from 'react';

import { callWalletBridge } from 'src/bridge/walletBridge';
import { useWalletModalOperations } from 'src/wallet/operations';
import { Operations } from 'src/constants/interface/operations';
import { Wallet } from 'src/constants/interface/wallet';

import { logCommon } from 'js/utils/log';

const INTERACTIVE_OPERATION_TIMEOUT = 10 * 60 * 1000;
const LONG_RUNNING_OPERATION_NAMES = new Set([
  'connectWallet',
  'createBridgeUsdcOrder',
  'createEarnOrder',
  'createSendOrder',
  'createSwapOrder',
  'createTurboRangeOrder',
  'signClaimRaffleRewards',
  'switchNetwork',
  'syncPrivyToApp',
  'unlock',
  'walletIdSign',
]);

function _holdPromise(): Promise<never> {
  return new Promise<never>(() => {});
}

function _ignoreArgs(..._args: unknown[]) {
  return _args.length;
}

const navigate404 = (): Promise<never> => {
  location.href = 'degate://unsupport';
  return _holdPromise();
};

const noopCallAppPromise: Operations['callAppPromise'] = () => {
  return Promise.resolve(undefined);
};

const noopWindowOpen: Operations['windowOpen'] = () => undefined;
const noopWindowRefresh: Operations['windowRefresh'] = () => undefined;
const noopUpdateAccessToken: Operations['updateAccessToken'] = () => undefined;
const noopUpdateAllowQuickTrading: Operations['updateAllowQuickTrading'] = () =>
  undefined;
const noopUpdateHideQuickTradingTips: Operations['updateHideQuickTradingTips'] =
  () => undefined;
const noopCheckHasUnLocked: Operations['checkHasUnLocked'] = () => false;
const noopDisconnect: Operations['disconnect'] = () => undefined;
const noopLock: Operations['lock'] = () => undefined;
const noopViewAddress: Operations['viewAddress'] = () => undefined;
const noopSyncToApp: Operations['syncToApp'] = () => undefined;

const noopCheckConnection: Operations['checkConnection'] = () => {
  return Promise.resolve({
    valid: false,
  });
};

const noopConnectWallet: Operations['connectWallet'] = (_params) => {
  _ignoreArgs(_params);
  return navigate404();
};
const noopSignAccessTokenWithEcdsa: Operations['signAccessTokenWithEcdsa'] =
  () => navigate404();
const noopSignClaimRaffleRewards: Operations['signClaimRaffleRewards'] = () =>
  navigate404();
const noopSwitchNetwork: Operations['switchNetwork'] = (
  _chainId,
  _chainName,
  _rpcs,
  _explorer,
  _nativeCurrency
) => {
  _ignoreArgs(_chainId, _chainName, _rpcs, _explorer, _nativeCurrency);
  return navigate404();
};
const noopUnlock: Operations['unlock'] = (_params) => {
  _ignoreArgs(_params);
  return navigate404();
};
const noopReceive: Operations['receive'] = (_token) => {
  _ignoreArgs(_token);
  return navigate404();
};
const noopCreateSwapOrder: Operations['createSwapOrder'] = (_params) => {
  _ignoreArgs(_params);
  return navigate404();
};
const noopCreateEarnOrder: Operations['createEarnOrder'] = (_params) => {
  _ignoreArgs(_params);
  return navigate404();
};
const noopCreateTurboRangeOrder: Operations['createTurboRangeOrder'] = (
  _params
) => {
  _ignoreArgs(_params);
  return navigate404();
};
const noopCreateBridgeUsdcOrder: Operations['createBridgeUsdcOrder'] = (
  _params
) => {
  _ignoreArgs(_params);
  return navigate404();
};
const noopCreateSendOrder: Operations['createSendOrder'] = (_params) => {
  _ignoreArgs(_params);
  return navigate404();
};
const noopSyncPrivyToApp: Operations['syncPrivyToApp'] = (_params) => {
  _ignoreArgs(_params);
  return navigate404();
};
const noopWalletIdSign: Operations['walletIdSign'] = (_message) => {
  _ignoreArgs(_message);
  return navigate404();
};

export function isWalletBridgeMode() {
  return window !== window.top && !window._degate_app;
}

function _getBridgeOperationTimeout(name: string) {
  if (LONG_RUNNING_OPERATION_NAMES.has(name)) {
    return INTERACTIVE_OPERATION_TIMEOUT;
  }
  return undefined;
}

function _createAppOperations(
  wallet: Wallet,
  operations: Operations | undefined
): Operations {
  return {
    callAppPromise: wallet.callAppPromise,
    connectWallet: noopConnectWallet,
    windowOpen: noopWindowOpen,
    windowRefresh: noopWindowRefresh,

    signAccessTokenWithEcdsa: noopSignAccessTokenWithEcdsa,
    updateAccessToken: (accessToken: string) => {
      wallet?.updateWallet({
        accessToken,
      });
    },
    updateAllowQuickTrading: noopUpdateAllowQuickTrading,
    updateHideQuickTradingTips: noopUpdateHideQuickTradingTips,

    checkConnection: noopCheckConnection,
    checkHasUnLocked: noopCheckHasUnLocked,
    disconnect: noopDisconnect,
    switchNetwork: noopSwitchNetwork,

    unlock: noopUnlock,
    lock: noopLock,

    receive: noopReceive,

    createSwapOrder: noopCreateSwapOrder,
    createEarnOrder: noopCreateEarnOrder,
    createTurboRangeOrder: noopCreateTurboRangeOrder,
    createBridgeUsdcOrder: noopCreateBridgeUsdcOrder,
    createSendOrder: noopCreateSendOrder,

    viewAddress: noopViewAddress,

    syncToApp: operations?.syncToApp || noopSyncToApp,
    syncPrivyToApp: operations?.syncPrivyToApp || noopSyncPrivyToApp,

    signClaimRaffleRewards: noopSignClaimRaffleRewards,

    walletIdSign: noopWalletIdSign,
  };
}

function _createBridgeOperations(wallet: Wallet): Operations {
  const bridgeWallet = wallet as Wallet & { hasUnlocked?: boolean };
  const callOperation = <T>(name: string, args: unknown[] = []): Promise<T> => {
    return callWalletBridge<T>(
      'wallet.operation',
      {
        args,
        name,
      },
      {
        timeoutMs: _getBridgeOperationTimeout(name),
      }
    );
  };

  const runOperation = (name: string, args: unknown[] = []) => {
    callOperation<void>(name, args).catch((error) => {
      logCommon({
        error,
        log_error: `bridge operation error: ${name}`,
        name,
      });
    });
  };

  return {
    callAppPromise: noopCallAppPromise,
    connectWallet: (params?: { logWallet?: unknown }) =>
      callOperation('connectWallet', [
        { ...(params || {}), logWallet: undefined },
      ]),
    windowOpen: (url: string, target?: string) => {
      runOperation('windowOpen', [url, target]);
    },
    windowRefresh: () => {
      runOperation('windowRefresh');
    },

    signAccessTokenWithEcdsa: () => callOperation('signAccessTokenWithEcdsa'),
    updateAccessToken: (
      accessToken: string,
      account: string,
      da_owner: string
    ) => {
      runOperation('updateAccessToken', [accessToken, account, da_owner]);
    },
    updateAllowQuickTrading: (allowQuiteTrading: boolean) => {
      runOperation('updateAllowQuickTrading', [allowQuiteTrading]);
    },
    updateHideQuickTradingTips: (isHide: boolean) => {
      runOperation('updateHideQuickTradingTips', [isHide]);
    },

    checkConnection: () => callOperation('checkConnection'),
    checkHasUnLocked: () => !!bridgeWallet.hasUnlocked,
    disconnect: () => {
      runOperation('disconnect');
    },
    switchNetwork: (
      chainId: number,
      chainName?: string,
      rpcs?: string[],
      explorer?: string,
      nativeCurrency?: string
    ) =>
      callOperation<void>('switchNetwork', [
        chainId,
        chainName,
        rpcs,
        explorer,
        nativeCurrency,
      ]),

    unlock: (params) => callOperation('unlock', [params]),
    lock: () => {
      runOperation('lock');
    },

    receive: (token) => callOperation('receive', [token]),

    createSwapOrder: (params) => callOperation('createSwapOrder', [params]),
    createEarnOrder: (params) => callOperation('createEarnOrder', [params]),
    createTurboRangeOrder: (params) =>
      callOperation('createTurboRangeOrder', [params]),
    createBridgeUsdcOrder: (params) =>
      callOperation('createBridgeUsdcOrder', [params]),
    createSendOrder: (params) => callOperation('createSendOrder', [params]),

    viewAddress: () => {
      runOperation('viewAddress');
    },

    syncToApp: () => {
      runOperation('syncToApp');
    },
    syncPrivyToApp: () => {
      return callOperation('syncPrivyToApp');
    },

    signClaimRaffleRewards: () => callOperation('signClaimRaffleRewards'),

    walletIdSign: (message: string) => callOperation('walletIdSign', [message]),
  };
}

function _createLegacyOperations(
  operations: Operations | undefined
): Operations {
  return {
    callAppPromise: operations?.callAppPromise || noopCallAppPromise,
    connectWallet: operations?.connectWallet || noopConnectWallet,
    windowOpen: operations?.windowOpen || noopWindowOpen,
    windowRefresh: operations?.windowRefresh || noopWindowRefresh,

    signAccessTokenWithEcdsa:
      operations?.signAccessTokenWithEcdsa || noopSignAccessTokenWithEcdsa,
    updateAccessToken: operations?.updateAccessToken || noopUpdateAccessToken,
    updateAllowQuickTrading:
      operations?.updateAllowQuickTrading || noopUpdateAllowQuickTrading,
    updateHideQuickTradingTips:
      operations?.updateHideQuickTradingTips || noopUpdateHideQuickTradingTips,

    checkConnection: operations?.checkConnection || noopCheckConnection,
    checkHasUnLocked: operations?.checkHasUnLocked || noopCheckHasUnLocked,
    disconnect: operations?.disconnect || noopDisconnect,
    switchNetwork: operations?.switchNetwork || noopSwitchNetwork,

    unlock: operations?.unlock || noopUnlock,
    lock: operations?.lock || noopLock,

    receive: operations?.receive || noopReceive,

    createSwapOrder: operations?.createSwapOrder || noopCreateSwapOrder,
    createEarnOrder: operations?.createEarnOrder || noopCreateEarnOrder,
    createTurboRangeOrder:
      operations?.createTurboRangeOrder || noopCreateTurboRangeOrder,
    createBridgeUsdcOrder:
      operations?.createBridgeUsdcOrder || noopCreateBridgeUsdcOrder,
    createSendOrder: operations?.createSendOrder || noopCreateSendOrder,

    viewAddress: operations?.viewAddress || noopViewAddress,

    syncToApp: operations?.syncToApp || noopSyncToApp,
    syncPrivyToApp: operations?.syncPrivyToApp || noopSyncPrivyToApp,

    signClaimRaffleRewards:
      operations?.signClaimRaffleRewards || noopSignClaimRaffleRewards,

    walletIdSign: operations?.walletIdSign || noopWalletIdSign,
  };
}

export default function useWalletOperations(wallet: Wallet) {
  const bridgeMode = useMemo(() => isWalletBridgeMode(), []);
  const operations = wallet?.operations;

  // UED: wallet modal operations to show confirm modals
  const modalOps = useWalletModalOperations();

  const walletOperations = useMemo((): Operations => {
    let baseOps: Operations;
    if (bridgeMode) {
      baseOps = _createBridgeOperations(wallet);
    } else if (wallet.isApp) {
      baseOps = _createAppOperations(wallet, operations);
    } else {
      baseOps = _createLegacyOperations(operations);
    }

    // UED: override order creation operations with modal-based versions
    return {
      ...baseOps,
      ...modalOps,
    };
  }, [bridgeMode, operations, wallet, modalOps]);

  useEffect(() => {
    if (wallet.isApp) {
      window.windowOpen = (url: string) => {
        window.location.href = `degate://browser?url=${encodeURIComponent(
          url
        )}`;
      };
      return;
    }

    if (walletOperations.windowOpen) {
      window.windowOpen = walletOperations.windowOpen;
    }
  }, [wallet.isApp, walletOperations]);

  return walletOperations;
}

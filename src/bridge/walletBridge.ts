import { logger } from 'src/utils/logger';

interface BridgeEnvelope<T = unknown> {
  action: string;
  channel: 'degate-wallet-bridge';
  kind: 'event' | 'request' | 'response';
  source: 'trade' | 'wallet';
  timestamp: number;
  version: 1;
  payload?: T;
  requestId?: string;
  error?: {
    code?: string;
    message: string;
  };
}

type ActionHandler = (
  payload: unknown,
  message: BridgeEnvelope
) => Promise<unknown> | unknown;

type EventListener = (payload: unknown, message: BridgeEnvelope) => void;

interface PendingRequest {
  reject: (reason?: unknown) => void;
  resolve: (value: unknown) => void;
  timer?: ReturnType<typeof setTimeout>;
}

interface BridgeRequestOptions {
  timeoutMs?: number;
}

interface SwapSubmitResult {
  data: unknown;
  onSignError?: (error: unknown) => void;
  onSignSuccess?: (result: unknown) => void;
}

type SwapSubmitHandler = () => Promise<SwapSubmitResult>;

interface SwapCallbacks {
  onSignError?: (error: unknown) => void;
  onSignSuccess?: (result: unknown) => void;
}

const CHANNEL = 'degate-wallet-bridge';
const BRIDGE_VERSION = 1;
const MAX_MESSAGE_AGE = 5 * 60 * 1000;
const REQUEST_TIMEOUT = 30000;

const pendingRequests = new Map<string, PendingRequest>();
const actionHandlers = new Map<string, ActionHandler>();
const eventListeners = new Map<string, Set<EventListener>>();
const swapSubmitHandlers = new Map<string, SwapSubmitHandler>();
const swapCallbacks = new Map<string, SwapCallbacks>();

let initialized = false;

function _generateRequestId() {
  return `trade-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

function _isBridgeMode() {
  return window !== window.top && !window._degate_app;
}

function _isTrustedOrigin(origin: string) {
  try {
    const { hostname, protocol } = new URL(origin);
    const isLocalhost = hostname === 'localhost' || hostname === '127.0.0.1';
    if (isLocalhost) {
      return protocol === 'http:' || protocol === 'https:';
    }
    return (
      protocol === 'https:' &&
      (hostname === 'degate.com' || hostname.endsWith('.degate.com'))
    );
  } catch (error) {
    return false;
  }
}

function _createEnvelope<T = unknown>(
  kind: BridgeEnvelope['kind'],
  action: string,
  payload?: T,
  requestId?: string,
  error?: BridgeEnvelope['error']
): BridgeEnvelope<T> {
  return {
    action,
    channel: CHANNEL,
    error,
    kind,
    payload,
    requestId,
    source: 'trade',
    timestamp: Date.now(),
    version: BRIDGE_VERSION,
  };
}

function _sanitizeFallbackPayload(
  value: unknown,
  seen: WeakSet<object>
): unknown {
  if (value === null || value === undefined) {
    return value;
  }

  if (typeof value === 'function') {
    logger.error('trade fallback function', value);
    return undefined;
  }

  if (Array.isArray(value)) {
    return value.map((item) => _sanitizeFallbackPayload(item, seen));
  }

  if (typeof value !== 'object') {
    return value;
  }

  if (seen.has(value)) {
    return undefined;
  }

  const prototype = Object.getPrototypeOf(value);
  if (prototype !== Object.prototype && prototype !== null) {
    return value;
  }

  seen.add(value);
  const result: Record<string, unknown> = {};
  Object.entries(value).forEach(([key, entryValue]) => {
    const nextValue = _sanitizeFallbackPayload(entryValue, seen);
    if (nextValue !== undefined) {
      result[key] = nextValue;
    }
  });
  seen.delete(value);
  return result;
}

function _makeBridgeSafeMessage(message: BridgeEnvelope) {
  if (typeof structuredClone === 'function') {
    try {
      return structuredClone(message);
    } catch (error) {
      // Fall through to the recursive sanitizer when payload includes
      // non-cloneable values such as callbacks.
    }
  }

  return {
    ...message,
    error: message.error
      ? (_sanitizeFallbackPayload(
          message.error,
          new WeakSet<object>()
        ) as BridgeEnvelope['error'])
      : undefined,
    payload: _sanitizeFallbackPayload(message.payload, new WeakSet<object>()),
  };
}

function _getTargetOrigin() {
  if (document.referrer) {
    try {
      const targetOrigin = new URL(document.referrer).origin;
      return _isTrustedOrigin(targetOrigin) ? targetOrigin : '';
    } catch (error) {
      return '';
    }
  }
  return '';
}

function _isAllowedOrigin(origin: string) {
  const targetOrigin = _getTargetOrigin();
  return !!targetOrigin && origin === targetOrigin;
}

function _isBridgeEnvelope(message: unknown): message is BridgeEnvelope {
  if (!message || typeof message !== 'object') return false;
  const bridgeMessage = message as Partial<BridgeEnvelope>;
  return (
    bridgeMessage.channel === CHANNEL &&
    typeof bridgeMessage.action === 'string' &&
    (bridgeMessage.kind === 'event' ||
      bridgeMessage.kind === 'request' ||
      bridgeMessage.kind === 'response') &&
    (bridgeMessage.source === 'trade' || bridgeMessage.source === 'wallet') &&
    typeof bridgeMessage.timestamp === 'number' &&
    bridgeMessage.version === BRIDGE_VERSION
  );
}

function _isFreshMessage(message: BridgeEnvelope) {
  return Math.abs(Date.now() - message.timestamp) <= MAX_MESSAGE_AGE;
}

function _postMessage(message: BridgeEnvelope) {
  if (window.parent === window) return;
  const targetOrigin = _getTargetOrigin();
  if (!targetOrigin) return;
  window.parent.postMessage(_makeBridgeSafeMessage(message), targetOrigin);
}

function _emitEvent(action: string, payload?: unknown) {
  _postMessage(_createEnvelope('event', action, payload));
}

function _handleRequest(message: BridgeEnvelope) {
  const handler = actionHandlers.get(message.action);
  if (!handler || !message.requestId) return;
  Promise.resolve(handler(message.payload, message))
    .then((result) => {
      _postMessage(
        _createEnvelope('response', message.action, result, message.requestId)
      );
    })
    .catch((error: any) => {
      _postMessage(
        _createEnvelope(
          'response',
          message.action,
          undefined,
          message.requestId,
          {
            code: error?.code,
            message: error?.message || 'Wallet bridge request failed',
          }
        )
      );
    });
}

function _handleResponse(message: BridgeEnvelope) {
  if (!message.requestId) return;
  const pending = pendingRequests.get(message.requestId);
  if (!pending) return;
  if (pending.timer) {
    clearTimeout(pending.timer);
  }
  pendingRequests.delete(message.requestId);
  if (message.error) {
    pending.reject(message.error);
    return;
  }
  pending.resolve(message.payload);
}

function _handleEvent(message: BridgeEnvelope) {
  const listeners = eventListeners.get(message.action);
  if (listeners) {
    listeners.forEach((listener) => {
      listener(message.payload, message);
    });
  }
}

function _handleSwapPrepare(
  payload: { contextId?: string } | undefined,
  message: BridgeEnvelope
) {
  const contextId = payload?.contextId;
  if (!contextId || !message.requestId) {
    throw new Error('Invalid swap prepare payload');
  }
  const submitHandler = swapSubmitHandlers.get(contextId);
  if (!submitHandler) {
    throw new Error('Swap submit handler not found');
  }
  return submitHandler().then((result) => {
    swapCallbacks.set(message.requestId as string, {
      onSignError: result.onSignError,
      onSignSuccess: result.onSignSuccess,
    });
    return {
      data: result.data,
    };
  });
}

function _handleSwapSuccess(payload: { requestId?: string; result?: unknown }) {
  if (!payload?.requestId) return;
  const callbacks = swapCallbacks.get(payload.requestId);
  swapCallbacks.delete(payload.requestId);
  callbacks?.onSignSuccess?.(payload.result);
}

function _handleSwapError(payload: { error?: unknown; requestId?: string }) {
  if (!payload?.requestId) return;
  const callbacks = swapCallbacks.get(payload.requestId);
  swapCallbacks.delete(payload.requestId);
  callbacks?.onSignError?.(payload.error);
}

function _ensureInitialized() {
  if (initialized || !_isBridgeMode()) return;
  initialized = true;

  actionHandlers.set('swap.prepare', _handleSwapPrepare as ActionHandler);
  addWalletBridgeEventListener('swap.error', (payload) => {
    _handleSwapError(payload as { error?: unknown; requestId?: string });
  });
  addWalletBridgeEventListener('swap.success', (payload) => {
    _handleSwapSuccess(payload as { requestId?: string; result?: unknown });
  });

  window.addEventListener('message', (event: MessageEvent<BridgeEnvelope>) => {
    const message = event.data;
    if (!_isBridgeEnvelope(message)) return;
    if (!_isAllowedOrigin(event.origin)) return;
    if (event.source !== window.parent) return;
    if (message.source !== 'wallet' || !_isFreshMessage(message)) return;

    if (message.kind === 'request') {
      _handleRequest(message);
      return;
    }
    if (message.kind === 'response') {
      _handleResponse(message);
      return;
    }
    _handleEvent(message);
  });
}

export function callWalletBridge<T = unknown>(
  action: string,
  payload?: unknown,
  options: BridgeRequestOptions = {}
): Promise<T> {
  if (!_isBridgeMode()) {
    return Promise.reject({
      code: 'BRIDGE_UNAVAILABLE',
      message: `Wallet bridge unavailable: ${action}`,
    });
  }
  _ensureInitialized();

  const targetOrigin = _getTargetOrigin();
  if (!targetOrigin) {
    return Promise.reject({
      code: 'BRIDGE_ORIGIN_INVALID',
      message: `Wallet bridge origin is not allowed: ${action}`,
    });
  }

  return new Promise<T>((resolve, reject) => {
    const requestId = _generateRequestId();
    const timeoutMs = options.timeoutMs ?? REQUEST_TIMEOUT;
    const timer =
      timeoutMs > 0
        ? setTimeout(() => {
            pendingRequests.delete(requestId);
            reject({
              code: 'TIMEOUT',
              message: `Wallet bridge timeout: ${action}`,
            });
          }, timeoutMs)
        : undefined;

    pendingRequests.set(requestId, {
      resolve: resolve as (value: unknown) => void,
      reject,
      timer,
    });

    _postMessage(_createEnvelope('request', action, payload, requestId));
  });
}

export function emitWalletBridgeEvent(action: string, payload?: unknown) {
  if (!_isBridgeMode()) return;
  _ensureInitialized();
  _emitEvent(action, payload);
}

export function addWalletBridgeEventListener(
  action: string,
  listener: EventListener
) {
  if (!_isBridgeMode()) {
    return () => {};
  }
  _ensureInitialized();
  const listeners = eventListeners.get(action) || new Set<EventListener>();
  listeners.add(listener);
  eventListeners.set(action, listeners);
  return () => {
    const current = eventListeners.get(action);
    current?.delete(listener);
    if (!current?.size) {
      eventListeners.delete(action);
    }
  };
}

export function registerWalletBridgeAction(
  action: string,
  handler: ActionHandler
) {
  if (!_isBridgeMode()) {
    return () => {};
  }
  _ensureInitialized();
  actionHandlers.set(action, handler);
  return () => {
    actionHandlers.delete(action);
  };
}

export function registerSwapSubmitHandler(
  contextId: string,
  handler: SwapSubmitHandler
) {
  if (!_isBridgeMode()) {
    return () => {};
  }
  _ensureInitialized();
  swapSubmitHandlers.set(contextId, handler);
  return () => {
    swapSubmitHandlers.delete(contextId);
  };
}

export function notifyWalletBridgeReady() {
  if (!_isBridgeMode()) return;
  _ensureInitialized();
  _emitEvent('trade.ready', {
    path: `${window.location.pathname}${window.location.search}`,
  });
}

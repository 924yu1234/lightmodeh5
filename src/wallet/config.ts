/**
 * UED Wallet Configuration
 *
 * Two ways to supply a walletSnapshot:
 *
 *   A) Runtime override via the UED settings panel (⚙ button →
 *      "Wallet Config" → "Paste JSON"). Pasted snapshot is persisted in
 *      localStorage under WALLET_STORAGE_KEY and used on every page load.
 *      This is the ONLY way to configure a deployed/public build — no
 *      credentials live in source.
 *
 *   B) The DEFAULT_WALLET_SNAPSHOT baked into this file below, used as a
 *      fallback when localStorage is empty. For local dev you can keep
 *      your own snapshot here; for a public deploy, leave it empty.
 *
 * The walletSnapshot shape contains all wallet state trade-fe needs:
 *   - account, accessToken (for API auth)
 *   - DAs (chain addresses)
 *   - solverAddresses
 *   - providerInfo, locale, etc.
 */

export const WALLET_STORAGE_KEY = 'ued_wallet_snapshot';

// Default (baked-in) wallet snapshot used when localStorage is empty.
// For public deploys, replace with an empty object `{}`.
const DEFAULT_WALLET_SNAPSHOT: any = {};

// Accepts either strict JSON or a JavaScript object literal (as produced
// by Chrome DevTools "Copy object" — unquoted keys, trailing commas, etc.).
// Returns the parsed object or throws.
function parseSnapshotText(text: string): any {
  const trimmed = (text || '').trim();
  if (!trimmed) throw new Error('Empty input');
  // First try strict JSON
  try {
    return JSON.parse(trimmed);
  } catch {
    // fall through
  }
  // Fallback: evaluate as a JS expression (safe here — user explicitly
  // pastes into a dev/settings UI in their own browser).
  // eslint-disable-next-line no-new-func
  const fn = new Function(`"use strict"; return (${trimmed});`);
  const result = fn();
  if (!result || typeof result !== 'object') {
    throw new Error('Not a valid object');
  }
  return result;
}

// When REACT_APP_PUBLIC_DEPLOY=1 is set at build time (e.g. on Vercel),
// the baked-in DEFAULT_WALLET_SNAPSHOT is ignored so no credentials ship
// in the build artifact. Users must paste their own snapshot via the UED
// settings panel on first visit (saved to localStorage).
const IS_PUBLIC_DEPLOY = process.env.REACT_APP_PUBLIC_DEPLOY === '1';
const EFFECTIVE_DEFAULT: any = IS_PUBLIC_DEPLOY ? {} : DEFAULT_WALLET_SNAPSHOT;

function loadWalletSnapshot(): any {
  try {
    const saved =
      typeof localStorage !== 'undefined'
        ? localStorage.getItem(WALLET_STORAGE_KEY)
        : null;
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed && typeof parsed === 'object') {
        return parsed;
      }
    }
  } catch {
    // ignore corrupt storage, fall back to default
  }
  return EFFECTIVE_DEFAULT;
}

// The live walletSnapshot that the app reads. Consumers import this as a
// value; changes via the settings panel require a page reload to take
// effect (we save to localStorage then reload).
export const walletSnapshot: any = loadWalletSnapshot();

/** Save a new snapshot from a JSON / JS object literal string. */
export function setWalletSnapshotFromText(text: string): {
  ok: boolean;
  error?: string;
} {
  try {
    const parsed = parseSnapshotText(text);
    localStorage.setItem(WALLET_STORAGE_KEY, JSON.stringify(parsed));
    return { ok: true };
  } catch (e: any) {
    return { ok: false, error: e?.message || 'Parse error' };
  }
}

/** Remove the localStorage override and revert to the baked-in default. */
export function clearWalletSnapshot() {
  try {
    localStorage.removeItem(WALLET_STORAGE_KEY);
  } catch {
    // ignore
  }
}

/** Is the current snapshot loaded from localStorage (vs the baked-in default)? */
export function isWalletSnapshotOverridden(): boolean {
  try {
    return !!localStorage.getItem(WALLET_STORAGE_KEY);
  } catch {
    return false;
  }
}

/** Short human-readable summary for the settings panel. */
export function getWalletSnapshotSummary() {
  const ws = walletSnapshot || {};
  const account = ws.account || '';
  const accountShort = account
    ? `${account.slice(0, 6)}…${account.slice(-4)}`
    : '(none)';
  return {
    account,
    accountShort,
    hasToken: !!ws.accessToken?.token,
    daOwner: ws.accessToken?.da_owner || '',
    locale: ws.locale || '',
    overridden: isWalletSnapshotOverridden(),
  };
}

import React, { useMemo, useState } from 'react';
import styled from 'styled-components';

import { UEDMode, UEDTheme, useUEDSettings } from 'src/mock/MockModeContext';
import {
  clearWalletSnapshot,
  getWalletSnapshotSummary,
  setWalletSnapshotFromText,
} from 'src/wallet/config';

const MODES: { value: UEDMode; label: string }[] = [
  { value: 'pc', label: 'PC' },
  { value: 'mobile', label: 'Mobile' },
  { value: 'h5', label: 'APP H5' },
];

const THEMES: { value: UEDTheme; label: string }[] = [
  { value: 'dark', label: 'Dark' },
  { value: 'light', label: 'Light' },
];

const DELAYS = [
  { value: 0, label: '0ms' },
  { value: 500, label: '500ms' },
  { value: 2000, label: '2s' },
  { value: 5000, label: '5s' },
];

interface Props {
  onClose: () => void;
}

export default function UEDSettingsPanel({ onClose }: Props) {
  const settings = useUEDSettings();
  const walletSummary = useMemo(() => getWalletSnapshotSummary(), []);
  const [showWalletEditor, setShowWalletEditor] = useState(false);
  const [walletJsonInput, setWalletJsonInput] = useState('');
  const [walletSaveError, setWalletSaveError] = useState<string | null>(null);

  const handleSaveWallet = () => {
    const result = setWalletSnapshotFromText(walletJsonInput);
    if (!result.ok) {
      setWalletSaveError(result.error || 'Parse error');
      return;
    }
    setWalletSaveError(null);
    window.location.reload();
  };

  const handleClearWallet = () => {
    // eslint-disable-next-line no-alert
    const ok = window.confirm(
      'Clear the saved wallet override and reload with the baked-in default?'
    );
    if (!ok) return;
    clearWalletSnapshot();
    window.location.reload();
  };

  return (
    <StyledOverlay onClick={onClose}>
      <StyledPanel onClick={(e) => e.stopPropagation()}>
        <div className="panel-header">
          <span>UED Settings</span>
          <button type="button" className="close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="quick-links">
          <a className="quick-link" href="/ued-components">
            📐 UI Components Library
          </a>
        </div>

        <div className="section">
          <div className="section-label">Display Mode</div>
          <div className="btn-group">
            {MODES.map((m) => (
              <button
                type="button"
                key={m.value}
                className={settings.mode === m.value ? 'active' : ''}
                onClick={() => settings.setMode(m.value)}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>

        <div className="section">
          <div className="section-label">Theme</div>
          <div className="btn-group">
            {THEMES.map((t) => (
              <button
                type="button"
                key={t.value}
                className={settings.theme === t.value ? 'active' : ''}
                onClick={() => settings.setTheme(t.value)}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div className="section">
          <div className="section-label">User Status</div>
          <div className="toggle-row">
            <span>{settings.isLoggedIn ? 'Logged In' : 'Not Logged In'}</span>
            <button
              type="button"
              className={`toggle ${settings.isLoggedIn ? 'on' : ''}`}
              onClick={() => settings.setIsLoggedIn(!settings.isLoggedIn)}
            >
              <span className="toggle-knob" />
            </button>
          </div>
        </div>

        <div className="section">
          <div className="section-label">Network Delay</div>
          <div className="btn-group">
            {DELAYS.map((d) => (
              <button
                type="button"
                key={d.value}
                className={settings.networkDelay === d.value ? 'active' : ''}
                onClick={() => settings.setNetworkDelay(d.value)}
              >
                {d.label}
              </button>
            ))}
          </div>
        </div>

        <div className="section">
          <div className="section-label">Simulate Errors</div>
          <div className="toggle-row">
            <span>{settings.simulateError ? 'On (20% failure)' : 'Off'}</span>
            <button
              type="button"
              className={`toggle ${settings.simulateError ? 'on' : ''}`}
              onClick={() => settings.setSimulateError(!settings.simulateError)}
            >
              <span className="toggle-knob" />
            </button>
          </div>
        </div>

        <div className="section">
          <div className="section-label">Wallet Config</div>
          <div className="wallet-info">
            <div className="wallet-row">
              <span className="wallet-row-label">Account</span>
              <span className="wallet-row-value mono">
                {walletSummary.accountShort}
              </span>
            </div>
            <div className="wallet-row">
              <span className="wallet-row-label">Token</span>
              <span
                className={`wallet-row-value ${
                  walletSummary.hasToken ? 'ok' : 'warn'
                }`}
              >
                {walletSummary.hasToken ? '✓ set' : '✗ missing'}
              </span>
            </div>
            <div className="wallet-row">
              <span className="wallet-row-label">Source</span>
              <span className="wallet-row-value">
                {walletSummary.overridden ? 'localStorage' : 'baked-in'}
              </span>
            </div>
          </div>
          {!showWalletEditor ? (
            <div className="btn-group wallet-btns">
              <button
                type="button"
                onClick={() => {
                  setWalletJsonInput('');
                  setWalletSaveError(null);
                  setShowWalletEditor(true);
                }}
              >
                Paste JSON
              </button>
              <button type="button" onClick={handleClearWallet}>
                Clear
              </button>
            </div>
          ) : (
            <div className="wallet-editor">
              <textarea
                className="wallet-textarea"
                value={walletJsonInput}
                onChange={(e) => {
                  setWalletJsonInput(e.target.value);
                  if (walletSaveError) setWalletSaveError(null);
                }}
                placeholder={
                  'Paste walletSnapshot from dg-wallet console\n' +
                  '(Chrome DevTools → Copy object, or JSON)'
                }
                spellCheck={false}
              />
              {walletSaveError && (
                <div className="wallet-error">{walletSaveError}</div>
              )}
              <div className="btn-group wallet-btns">
                <button
                  type="button"
                  className="primary"
                  onClick={handleSaveWallet}
                >
                  Save &amp; Reload
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowWalletEditor(false);
                    setWalletJsonInput('');
                    setWalletSaveError(null);
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="hint">
          Mode changes require page reload to take effect.
          <button
            type="button"
            className="reload-btn"
            onClick={() => window.location.reload()}
          >
            Reload Now
          </button>
        </div>
      </StyledPanel>
    </StyledOverlay>
  );
}

const StyledOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 99998;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  padding: 80px 20px 20px;
`;

const StyledPanel = styled.div`
  background: #1a1a2e;
  border-radius: 12px;
  padding: 16px;
  width: 320px;
  max-height: 80vh;
  overflow-y: auto;
  color: #e0e0e0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 13px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);

  .panel-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
    font-size: 15px;
    font-weight: 600;
    color: #fff;
  }
  .close-btn {
    background: none;
    border: none;
    color: #888;
    font-size: 16px;
    cursor: pointer;
    &:hover {
      color: #fff;
    }
  }

  .quick-links {
    margin-bottom: 14px;
    padding-bottom: 14px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }
  .quick-link {
    display: block;
    padding: 10px 14px;
    background: rgba(80, 228, 162, 0.1);
    border: 1px solid rgba(80, 228, 162, 0.3);
    border-radius: 6px;
    color: #50e4a2;
    font-size: 13px;
    text-decoration: none;
    text-align: center;
    transition: all 0.15s;
    &:hover {
      background: rgba(80, 228, 162, 0.18);
    }
  }

  .section {
    margin-bottom: 14px;
  }
  .section-label {
    color: #888;
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 6px;
  }

  .btn-group {
    display: flex;
    gap: 6px;
    flex-wrap: wrap;
    button {
      padding: 5px 12px;
      border-radius: 6px;
      border: 1px solid rgba(255, 255, 255, 0.15);
      background: rgba(255, 255, 255, 0.05);
      color: #ccc;
      cursor: pointer;
      font-size: 12px;
      transition: all 0.15s;
      &:hover {
        background: rgba(255, 255, 255, 0.1);
      }
      &.active {
        background: #50e4a2;
        color: #000;
        border-color: #50e4a2;
        font-weight: 600;
      }
    }
  }

  .toggle-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .toggle {
    width: 40px;
    height: 22px;
    border-radius: 11px;
    border: none;
    background: #444;
    cursor: pointer;
    position: relative;
    transition: background 0.2s;
    &.on {
      background: #50e4a2;
    }
    .toggle-knob {
      display: block;
      width: 18px;
      height: 18px;
      border-radius: 50%;
      background: #fff;
      position: absolute;
      top: 2px;
      left: 2px;
      transition: transform 0.2s;
    }
    &.on .toggle-knob {
      transform: translateX(18px);
    }
  }

  .wallet-info {
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 6px;
    padding: 8px 10px;
    margin-bottom: 8px;
  }
  .wallet-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 11px;
    line-height: 18px;
  }
  .wallet-row-label {
    color: #888;
  }
  .wallet-row-value {
    color: #e0e0e0;
    &.mono {
      font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
    }
    &.ok {
      color: #50e4a2;
    }
    &.warn {
      color: #febe2f;
    }
  }
  .wallet-btns {
    margin-top: 4px;
    button.primary {
      background: #50e4a2;
      color: #000;
      border-color: #50e4a2;
      font-weight: 600;
    }
  }
  .wallet-editor {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  .wallet-textarea {
    width: 100%;
    min-height: 140px;
    max-height: 240px;
    resize: vertical;
    padding: 8px;
    border-radius: 6px;
    border: 1px solid rgba(255, 255, 255, 0.15);
    background: rgba(0, 0, 0, 0.3);
    color: #e0e0e0;
    font-size: 11px;
    font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
    outline: none;
    &:focus {
      border-color: #50e4a2;
    }
    &::placeholder {
      color: #555;
    }
  }
  .wallet-error {
    color: #ff6b81;
    font-size: 11px;
    padding: 4px 6px;
    background: rgba(255, 107, 129, 0.08);
    border-radius: 4px;
  }

  .hint {
    margin-top: 12px;
    padding-top: 12px;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    color: #888;
    font-size: 11px;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .reload-btn {
    padding: 3px 10px;
    border-radius: 4px;
    border: 1px solid #50e4a2;
    background: transparent;
    color: #50e4a2;
    cursor: pointer;
    font-size: 11px;
    &:hover {
      background: rgba(80, 228, 162, 0.1);
    }
  }
`;

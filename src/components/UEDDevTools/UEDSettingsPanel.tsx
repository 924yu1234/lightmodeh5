import React from 'react';
import styled from 'styled-components';

import { UEDMode, UEDTheme, useUEDSettings } from 'src/mock/MockModeContext';
import { ThemeType } from 'src/theme';

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

  return (
    <StyledOverlay onClick={onClose} role="presentation">
      <StyledPanel
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-label="UED Settings"
      >
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
              aria-pressed={settings.isLoggedIn}
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
              aria-pressed={settings.simulateError}
            >
              <span className="toggle-knob" />
            </button>
          </div>
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
  background: ${({ theme }: { theme: ThemeType }) => theme.bg_black_30};
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  padding: 80px 20px 20px;
`;

const StyledPanel = styled.div`
  background: ${({ theme }: { theme: ThemeType }) => theme.modalBg};
  border-radius: 12px;
  padding: 16px;
  width: 320px;
  max-height: 80vh;
  overflow-y: auto;
  color: ${({ theme }: { theme: ThemeType }) => theme.t_d4d};
  ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
  font-size: 13px;
  box-shadow: 0 8px 32px
    ${({ theme }: { theme: ThemeType }) => theme.border_black_80};

  .panel-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
    font-size: 15px;
    font-weight: 600;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
  }
  .close-btn {
    background: none;
    border: none;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_60};
    font-size: 16px;
    cursor: pointer;
    border-radius: 4px;
    line-height: 1;
    padding: 4px 6px;
    transition: color 0.15s ease-out, background 0.15s ease-out;

    &:hover {
      color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
      background: ${({ theme }: { theme: ThemeType }) => theme.bg_white_10};
    }

    &:focus-visible {
      outline: 2px solid ${({ theme }: { theme: ThemeType }) => theme.blue};
      outline-offset: 2px;
    }
  }

  .quick-links {
    margin-bottom: 14px;
    padding-bottom: 14px;
    border-bottom: 1px solid
      ${({ theme }: { theme: ThemeType }) => theme.border_white_10};
  }
  .quick-link {
    display: block;
    padding: 10px 14px;
    background: ${({ theme }: { theme: ThemeType }) => theme.bg_buy_10};
    border: 1px solid ${({ theme }: { theme: ThemeType }) => theme.border_buy};
    border-radius: 6px;
    color: ${({ theme }: { theme: ThemeType }) => theme.green};
    font-size: 13px;
    text-decoration: none;
    text-align: center;
    transition: background 0.15s ease-out, border-color 0.15s ease-out;

    &:hover {
      background: ${({ theme }: { theme: ThemeType }) => theme.bg_buy_40};
    }

    &:focus-visible {
      outline: 2px solid ${({ theme }: { theme: ThemeType }) => theme.blue};
      outline-offset: 2px;
    }
  }

  .section {
    margin-bottom: 14px;
  }
  .section-label {
    color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_60};
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
      border: 1px solid
        ${({ theme }: { theme: ThemeType }) => theme.border_white_10};
      background: ${({ theme }: { theme: ThemeType }) => theme.bg_white_05};
      color: ${({ theme }: { theme: ThemeType }) => theme.t_c4c4c4};
      cursor: pointer;
      font-size: 12px;
      transition: background 0.15s ease-out, border-color 0.15s ease-out,
        color 0.15s ease-out;

      &:hover {
        background: ${({ theme }: { theme: ThemeType }) => theme.bg_white_10};
      }

      &:focus-visible {
        outline: 2px solid ${({ theme }: { theme: ThemeType }) => theme.blue};
        outline-offset: 2px;
      }

      &.active {
        background: ${({ theme }: { theme: ThemeType }) => theme.green};
        color: ${({ theme }: { theme: ThemeType }) => theme.t_000};
        border-color: ${({ theme }: { theme: ThemeType }) => theme.green};
        ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
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
    background: ${({ theme }: { theme: ThemeType }) => theme.bg_333};
    cursor: pointer;
    position: relative;
    transition: background 0.2s ease-out;
    flex-shrink: 0;

    &:focus-visible {
      outline: 2px solid ${({ theme }: { theme: ThemeType }) => theme.blue};
      outline-offset: 2px;
    }

    &.on {
      background: ${({ theme }: { theme: ThemeType }) => theme.green};
    }
    .toggle-knob {
      display: block;
      width: 18px;
      height: 18px;
      border-radius: 50%;
      background: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
      position: absolute;
      top: 2px;
      left: 2px;
      transition: transform 0.2s ease-out;
    }
    &.on .toggle-knob {
      transform: translateX(18px);
    }
  }

  .hint {
    margin-top: 12px;
    padding-top: 12px;
    border-top: 1px solid
      ${({ theme }: { theme: ThemeType }) => theme.border_white_10};
    color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_60};
    font-size: 11px;
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
  }
  .reload-btn {
    padding: 3px 10px;
    border-radius: 4px;
    border: 1px solid ${({ theme }: { theme: ThemeType }) => theme.green};
    background: transparent;
    color: ${({ theme }: { theme: ThemeType }) => theme.green};
    cursor: pointer;
    font-size: 11px;
    transition: background 0.15s ease-out;

    &:hover {
      background: ${({ theme }: { theme: ThemeType }) => theme.bg_buy_10};
    }

    &:focus-visible {
      outline: 2px solid ${({ theme }: { theme: ThemeType }) => theme.blue};
      outline-offset: 2px;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .close-btn,
    .quick-link,
    .btn-group button,
    .toggle,
    .toggle .toggle-knob,
    .reload-btn {
      transition: none;
    }
  }
`;

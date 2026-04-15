import React from 'react';
import styled from 'styled-components';

import { UEDMode, useUEDSettings } from 'src/mock/MockModeContext';

const MODES: { value: UEDMode; label: string }[] = [
  { value: 'pc', label: 'PC' },
  { value: 'mobile', label: 'Mobile' },
  { value: 'h5', label: 'APP H5' },
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

/**
 * UED Connect Wallet Modal
 *
 * Multi-step flow that mirrors the original dg-wallet Connect Wallet modal:
 *  Step 1 (select): Email verification + wallet list (MetaMask, Phantom, OKX, WalletConnect)
 *  Step 2 (code):   6-digit email confirmation code (mock — accepts any 6 digits)
 *  Step 3 (paste):  Paste walletSnapshot JSON from dg-wallet console
 *
 * Clicking any non-email wallet → skips to step 3 directly.
 * Email flow → step 1 → step 2 → step 3.
 */
import React, { useCallback, useMemo, useState } from 'react';
import ConnectMetamaskIcon from 'imgs/metamask.svg';
import ConnectWalletConnectIcon from 'imgs/walletConnect.svg';
import styled from 'styled-components';

import PrivyCodeModal from './PrivyCodeModal';

import { Input, Modal, PrimaryBtn } from 'src/UI';

import Close from 'src/components/Icons/close';
import { useUEDSettings } from 'src/mock/MockModeContext';
import { useModals } from 'src/state/application/hooks';
import ModalKeys from 'src/state/application/modalKeys';
import { ThemeType } from 'src/theme';
import { setWalletSnapshotFromText } from 'src/wallet/config';

type Step = 'select' | 'code' | 'paste';

// Simple inline SVG data URIs for wallets without local icons
const PHANTOM_ICON =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSIxMiIgZmlsbD0iIzUzNDBGRiIvPjxwYXRoIGQ9Ik0xNy42IDguNGMtLjIgMi4yLTEuOSA0LTQuMSA0aC0uOWMtLjMgMC0uNS4yLS42LjVsLS4zIDEuOGMtLjEuMy0uMy41LS42LjVoLTEuM2MtLjMgMC0uNS0uMy0uNC0uNmwuMS0uNGMuMS0uMy0uMS0uNi0uNC0uNkg3LjhjLS4zIDAtLjUtLjMtLjQtLjZsMS44LTguN2MuMS0uNC40LS43LjgtLjdoNC41YzIuNSAwIDMuMyAxLjYgMy4xIDMuOHoiIGZpbGw9IiNmZmYiLz48L3N2Zz4=';
const OKX_ICON =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHJ4PSI0IiBmaWxsPSIjMDAwIi8+PHJlY3QgeD0iNSIgeT0iNSIgd2lkdGg9IjUiIGhlaWdodD0iNSIgcng9IjEiIGZpbGw9IiNmZmYiLz48cmVjdCB4PSIxNCIgeT0iNSIgd2lkdGg9IjUiIGhlaWdodD0iNSIgcng9IjEiIGZpbGw9IiNmZmYiLz48cmVjdCB4PSI5LjUiIHk9IjkuNSIgd2lkdGg9IjUiIGhlaWdodD0iNSIgcng9IjEiIGZpbGw9IiNmZmYiLz48cmVjdCB4PSI1IiB5PSIxNCIgd2lkdGg9IjUiIGhlaWdodD0iNSIgcng9IjEiIGZpbGw9IiNmZmYiLz48cmVjdCB4PSIxNCIgeT0iMTQiIHdpZHRoPSI1IiBoZWlnaHQ9IjUiIHJ4PSIxIiBmaWxsPSIjZmZmIi8+PC9zdmc+';
const EMAIL_ICON =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSIxMiIgZmlsbD0iIzFEQTFGMiIvPjxwYXRoIGQ9Ik02IDhsMSAxaDEwbDEtMUg2em0wIDFWMTZoMTJWOUw2IDl6bTYgNC41TDE4IDlINiw2IDEzLjV6IiBmaWxsPSIjZmZmIi8+PC9zdmc+';

const WALLETS = [
  { id: 'metamask', name: 'MetaMask', icon: ConnectMetamaskIcon },
  { id: 'phantom', name: 'Phantom', icon: PHANTOM_ICON },
  { id: 'okx', name: 'OKX Wallet', icon: OKX_ICON },
  {
    id: 'walletconnect',
    name: 'WalletConnect',
    icon: ConnectWalletConnectIcon,
  },
];

export default function ConnectWalletModal() {
  const { visible, hide } = useModals(ModalKeys.ued_connect_wallet) as any;
  const { setIsLoggedIn } = useUEDSettings();

  const [step, setStep] = useState<Step>('select');
  const [email, setEmail] = useState('');
  const [jsonInput, setJsonInput] = useState('');
  const [jsonError, setJsonError] = useState<string | null>(null);
  const [selectedWallet, setSelectedWallet] = useState('');

  const emailValid = useMemo(
    () =>
      !!email && /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email),
    [email]
  );

  const handleClose = useCallback(() => {
    setStep('select');
    setEmail('');
    setJsonInput('');
    setJsonError(null);
    setSelectedWallet('');
    hide();
  }, [hide]);

  // Step 1: Send code → transition to PrivyCodeModal
  const handleSendCode = useCallback(() => {
    if (!emailValid) return;
    setStep('code');
  }, [emailValid]);

  // Step 1: Click a wallet → go directly to paste JSON
  const handleWalletClick = useCallback((walletId: string) => {
    setSelectedWallet(walletId);
    setStep('paste');
    setJsonInput('');
    setJsonError(null);
  }, []);

  // Step 2 is handled by PrivyCodeModal (separate component)

  // Step 3: Connect (save JSON to localStorage + reload)
  const handleConnect = useCallback(() => {
    if (!jsonInput.trim()) {
      setJsonError('Please paste the walletSnapshot JSON');
      return;
    }
    const result = setWalletSnapshotFromText(jsonInput);
    if (!result.ok) {
      setJsonError(result.error || 'Invalid JSON');
      return;
    }
    setJsonError(null);
    setIsLoggedIn(true);
    window.location.reload();
  }, [jsonInput, setIsLoggedIn]);

  if (!visible) return null;

  const title =
    step === 'select'
      ? 'Connect Wallet'
      : step === 'code'
      ? 'Enter Confirmation Code'
      : `Connect via ${selectedWallet || 'Email'}`;

  return (
    <Modal
      opened={visible}
      onClose={handleClose}
      centered
      title={null}
      withCloseButton={false}
    >
      <StyledConnectWallet>
        <div className="modal-title">
          {step !== 'select' && (
            <span
              className="back-btn"
              onClick={() =>
                setStep(step === 'paste' && email ? 'code' : 'select')
              }
            >
              ←
            </span>
          )}
          {title}
          <Close onClick={handleClose} />
        </div>

        <div className="inner">
          {/* ====== Step 1: Wallet Selection ====== */}
          {step === 'select' && (
            <>
              <div className="email-section">
                <div className="email-title">Via Email Verification</div>
                <div className="email-input-row">
                  <Input
                    value={email}
                    onChange={(e: any) => setEmail(e.target.value)}
                    onKeyDown={(e: any) => {
                      if (e.key === 'Enter' && emailValid) handleSendCode();
                    }}
                    placeholder="your@email.com"
                    leftSection={
                      <img
                        src={EMAIL_ICON}
                        alt="email"
                        style={{ width: 24, height: 24 }}
                      />
                    }
                  />
                </div>
                <PrimaryBtn
                  eventName="btn_ued_send_code"
                  onClick={handleSendCode}
                  disabled={!emailValid}
                >
                  Send confirmation code
                </PrimaryBtn>
              </div>

              <div className="or">
                <div className="or-line" />
                <div className="or-text">or</div>
                <div className="or-line" />
              </div>

              <div className="wallet-list">
                {WALLETS.map((w) => (
                  <div
                    className="item"
                    key={w.id}
                    onClick={() => handleWalletClick(w.id)}
                  >
                    <img src={w.icon} alt={w.name} className="item-icon" />
                    <div className="item-text">{w.name}</div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* ====== Step 2: Code Input (separate modal from wallet code) ====== */}
          <PrivyCodeModal
            visible={step === 'code'}
            email={email}
            onClose={handleClose}
            onSuccess={() => {
              setStep('paste');
              setJsonInput('');
              setJsonError(null);
            }}
          />

          {/* ====== Step 3: Paste JSON ====== */}
          {step === 'paste' && (
            <div className="paste-section">
              <div className="paste-desc">
                Paste your <code>walletSnapshot</code> JSON from dg-wallet
                browser console to connect.
              </div>
              <textarea
                className="json-input"
                value={jsonInput}
                onChange={(e) => {
                  setJsonInput(e.target.value);
                  if (jsonError) setJsonError(null);
                }}
                placeholder={
                  "{ account: '0x...', accessToken: { ... }, DAs: { ... }, ... }"
                }
                spellCheck={false}
              />
              {jsonError && <div className="json-error">{jsonError}</div>}
              <PrimaryBtn
                eventName="btn_ued_connect_json"
                onClick={handleConnect}
                disabled={!jsonInput.trim()}
              >
                Connect
              </PrimaryBtn>
            </div>
          )}
        </div>
      </StyledConnectWallet>
    </Modal>
  );
}

const StyledConnectWallet = styled.div`
  width: 100%;
  padding: 0 0 20px;
  ${({ theme }: { theme: ThemeType }) => theme.fontMedium};

  .modal-title {
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    font-size: 16px;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
    ${({ theme }: { theme: ThemeType }) => theme.fontBold};
    .icon-close {
      margin-left: auto;
      cursor: pointer;
      color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b};
    }
  }
  .back-btn {
    margin-right: 10px;
    cursor: pointer;
    font-size: 18px;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b};
    &:hover {
      color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
    }
  }

  .inner {
    padding: 0 20px;
    max-height: 500px;
    overflow-y: auto;
  }

  /* ====== Step 1: Select ====== */
  .email-section {
    margin-bottom: 20px;
  }
  .email-title {
    ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
    font-size: 14px;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_60};
    line-height: 20px;
    margin-bottom: 10px;
  }
  .email-input-row {
    .mantine-Input-wrapper {
      height: 50px;
      .mantine-Input-input {
        height: 100%;
        padding-left: 52px;
      }
      .mantine-Input-section[data-position='left'] {
        padding-left: 10px;
      }
    }
  }
  .email-section .dg-primary {
    width: 100%;
    margin-top: 15px;
  }

  .or {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 20px;
    ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
    color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_60};
    font-size: 14px;
    .or-line {
      height: 1px;
      background-color: ${({ theme }: { theme: ThemeType }) => theme.bg_b7b_15};
      flex: 1;
    }
  }

  .item {
    margin-bottom: 10px;
    padding: 0 20px;
    background: ${({ theme }: { theme: ThemeType }) => theme.bg_white_10};
    border: 1px solid transparent;
    border-radius: 5px;
    height: 50px;
    display: flex;
    align-items: center;
    cursor: pointer;
    &:hover {
      border-color: ${({ theme }: { theme: ThemeType }) => theme.blue};
    }
    .item-icon {
      width: 24px;
      height: 24px;
      margin-right: 10px;
      border-radius: 50%;
    }
    .item-text {
      ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
      font-size: 14px;
      color: ${({ theme }: { theme: ThemeType }) => theme.t_d4d};
    }
  }

  /* Step 2 (code) is rendered by PrivyCodeModal in its own Modal */

  /* ====== Step 3: Paste JSON ====== */
  .paste-section {
    .paste-desc {
      font-size: 13px;
      color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b};
      margin-bottom: 14px;
      line-height: 20px;
      code {
        background: ${({ theme }: { theme: ThemeType }) => theme.bg_white_10};
        padding: 1px 5px;
        border-radius: 3px;
        font-size: 12px;
      }
    }
  }
  .json-input {
    width: 100%;
    min-height: 150px;
    max-height: 260px;
    resize: vertical;
    padding: 10px;
    border-radius: 8px;
    border: 1px solid
      ${({ theme }: { theme: ThemeType }) => theme.border_white_10};
    background: ${({ theme }: { theme: ThemeType }) => theme.bg_white_05};
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
    font-size: 12px;
    font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
    outline: none;
    &:focus {
      border-color: ${({ theme }: { theme: ThemeType }) => theme.blue};
    }
    &::placeholder {
      color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_40};
    }
  }
  .json-error {
    color: ${({ theme }: { theme: ThemeType }) => theme.red};
    font-size: 12px;
    margin-top: 6px;
    padding: 4px 8px;
    background: ${({ theme }: { theme: ThemeType }) => theme.sell_10};
    border-radius: 4px;
  }
  .paste-section .dg-primary {
    width: 100%;
    margin-top: 14px;
  }
`;

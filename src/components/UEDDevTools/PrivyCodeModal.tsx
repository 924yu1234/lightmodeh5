/**
 * Privy-style 6-digit code input modal.
 * Migrated from dg-wallet/src/modals/WalletModal/PrivyConnectModal/code.tsx
 * — same styled-components, same layout — but with mocked verification:
 * any 6-digit code succeeds → transitions to paste-JSON step.
 */
import React, { useCallback, useRef, useState } from 'react';
import PrivyLogo from 'imgs/privy.svg';
import styled from 'styled-components';

import { Input, Modal } from 'src/UI';

import Close from 'src/components/Icons/close';
import connectEmailIcon from 'src/imgs/connect_email.svg';
import { ThemeType } from 'src/theme';

interface PrivyCodeModalProps {
  visible: boolean;
  email: string;
  onClose: () => void;
  onSuccess: () => void;
}

export default function PrivyCodeModal({
  visible,
  email,
  onClose,
  onSuccess,
}: PrivyCodeModalProps) {
  const [values, setValues] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [codeErr, setCodeErr] = useState(0);
  const [inResend, setInResend] = useState(false);

  const inputsRef = useRef<any[]>([]);

  const verify = useCallback(
    (_code: string) => {
      setLoading(true);
      // Mock: any 6-digit code succeeds after short delay
      setTimeout(() => {
        setLoading(false);
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          setValues(['', '', '', '', '', '']);
          onSuccess();
        }, 800);
      }, 600);
    },
    [onSuccess]
  );

  const handleChange = useCallback(
    (e: any, index: number) => {
      setCodeErr(0);
      const val = e.target.value;
      if (!/^\d*$/.test(val)) return;
      const newValues = [...values];
      newValues[index] = val?.toString().slice(-1);
      setValues(newValues);

      if (val && newValues.join('').length === 6) {
        verify(newValues.join(''));
        e.target.blur();
        return;
      }
      if (val && index < 5) {
        inputsRef.current[index + 1]?.focus();
      }
    },
    [values, verify]
  );

  const handleKeyDown = useCallback(
    (e: any, index: number) => {
      if (e.key === 'Backspace' && !values[index] && index > 0) {
        inputsRef.current[index - 1]?.focus();
      }
    },
    [values]
  );

  const handlePaste = useCallback(
    (e: any) => {
      const pasteData = e.clipboardData.getData('text').slice(0, 6).split('');
      const newValues = values.map((v: string, i: number) => pasteData[i] || v);
      setValues(newValues);
      e.target.blur();

      if (pasteData.length < 6) {
        inputsRef.current[pasteData.length]?.focus();
      }
      if (pasteData.length === 6) {
        verify(newValues.join(''));
      }
    },
    [values, verify]
  );

  const resend = useCallback(() => {
    if (inResend) return;
    setInResend(true);
    setTimeout(() => setInResend(false), 60000);
  }, [inResend]);

  const handleClose = useCallback(() => {
    setValues(['', '', '', '', '', '']);
    setSuccess(false);
    setLoading(false);
    setCodeErr(0);
    onClose();
  }, [onClose]);

  if (!visible) return null;

  return (
    <Modal title={null} onClose={handleClose} opened={visible} centered>
      <StyledPrivyLogin success={success} codeErr={codeErr}>
        <div className="modal-title">
          <Close onClick={handleClose} />
        </div>
        <img src={connectEmailIcon} alt="email" className="logo" />
        <div className="title">Enter Confirmation Code</div>
        <div className="desc">
          Check your email {email} for a confirmation code.
        </div>
        <div className="items">
          {values.map((value: string, index: number) => (
            <React.Fragment key={index}>
              <Input
                ref={(el: any) => {
                  inputsRef.current[index] = el;
                }}
                value={value}
                onChange={(e: any) => handleChange(e, index)}
                onKeyDown={(e: any) => handleKeyDown(e, index)}
                onPaste={handlePaste}
                className="item-input"
                autoComplete="off"
                inputMode="numeric"
              />
              {index === 2 && <div className="line" />}
            </React.Fragment>
          ))}
        </div>
        {loading && (
          <div className="loading-box">
            <span className="spinner" />
          </div>
        )}
        {success && (
          <div className="success-box">
            <span className="success-text">✓ Success</span>
          </div>
        )}
        {codeErr === 1 && (
          <div className="code-err-box">
            <span className="code-err-text">
              Invalid or expired verification code
            </span>
          </div>
        )}
        <div className="resend">
          <div className="resend-text">{"Didn't get an email?"}</div>
          <div
            className={`resend-btn ${inResend ? 'disabled' : ''}`}
            onClick={resend}
          >
            Resend code
          </div>
        </div>
        <StyledFooter>
          <img src={PrivyLogo} alt="privy-logo" />
          Powered by Privy
        </StyledFooter>
      </StyledPrivyLogin>
    </Modal>
  );
}

// Copied from dg-wallet code.tsx — identical styled-components
const StyledPrivyLogin = styled.div<{ success: boolean; codeErr: number }>`
  padding: 0 20px 20px;
  display: flex;
  min-height: 425px;
  flex-direction: column;
  align-items: center;
  ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
  .modal-title {
    margin-bottom: 30px;
  }
  .logo {
    width: 50px;
    min-height: 38px;
  }
  .title {
    margin: 30px 0 15px;
    ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
    line-height: 22px;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
    font-size: 16px;
  }
  .desc {
    ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
    line-height: 20px;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff_80};
    font-size: 14px;
    text-align: center;
    margin-bottom: 20px;
  }
  .items {
    display: flex;
    align-items: center;
    justify-content: center;
    .item-input.mantine-Input-wrapper {
      width: 40px;
      height: 50px;
      margin: 0 10px 0 0;
      &:last-child {
        margin-right: 0;
      }
      .mantine-Input-input {
        height: 100%;
        text-align: center;
        font-size: 18px;
        &:focus {
          border-color: ${({ theme }: { theme: ThemeType }) => theme.blue};
        }
        border-color: ${({
          theme,
          success,
          codeErr,
        }: {
          theme: ThemeType;
          success: boolean;
          codeErr: number;
        }) => (success ? theme.green : codeErr ? theme.red : 'transparent')};
      }
    }

    .line {
      width: 10px;
      height: 1px;
      margin: 0 10px 0 0;
      background: ${({ theme }: { theme: ThemeType }) => theme.t_fff_80};
    }
  }

  .success-box,
  .loading-box,
  .code-err-box {
    width: 100%;
    display: flex;
    height: 20px;
    margin-top: 5px;
    align-items: center;
    justify-content: flex-start;
    margin-bottom: -25px;
    ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
    font-size: 14px;
    color: ${({ theme }: { theme: ThemeType }) => theme.green};
    line-height: 20px;
    .code-err-text {
      color: ${({ theme }: { theme: ThemeType }) => theme.red};
    }
  }
  .spinner {
    display: inline-block;
    width: 14px;
    height: 14px;
    border: 2px solid ${({ theme }: { theme: ThemeType }) => theme.t_b7b_40};
    border-top-color: ${({ theme }: { theme: ThemeType }) => theme.blue};
    border-radius: 50%;
    animation: spin 0.6s linear infinite;
  }
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  .resend {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: auto;
    margin-top: 40px;
    ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
    font-size: 14px;
    line-height: 20px;

    .resend-text {
      color: ${({ theme }: { theme: ThemeType }) => theme.t_fff_80};
    }
    .resend-btn {
      margin-left: 10px;
      ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
      color: ${({ theme }: { theme: ThemeType }) => theme.blue};
      cursor: pointer;
      display: flex;
      align-items: center;
      &.disabled {
        color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_50};
      }
    }
  }
`;

const StyledFooter = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
  ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
  font-size: 12px;
  line-height: 16px;
  color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_60};
  img {
    width: 16px;
    margin-right: 5px;
  }
`;

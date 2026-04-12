import React, { useCallback, useState } from 'react';
import { trim } from 'lodash';
import { isMobile } from 'react-device-detect';
import styled from 'styled-components';

import { Textarea, Tooltip } from 'src/UI';

import { useIntl } from 'src/locals';
import { useShowModal } from 'src/state/application/hooks';
import { ModalKeys } from 'src/state/application/reducer';
import { ThemeType } from 'src/theme';

import IconDelete from '../Icons/delete';
import IconScan from '../Icons/scan';

export default function TokenAddressInput({
  showErr,
  value,
  onChangeAddress,
  placeholder,
  focusTooltip,
  handleFocus,
  onCopy,
  className,
  ...rest
}: {
  value: string;
  onChangeAddress: (address: string) => void;
  handleFocus?: (focus: boolean) => void;
  showErr?: boolean;
  placeholder?: string;
  focusTooltip?: string;
  onCopy?: (address: string) => void;
  className?: string;
}) {
  const intl = useIntl();
  const [focus, setFocus] = useState(false);
  const showModal = useShowModal();

  const scan = useCallback(() => {
    showModal({
      modal: ModalKeys.ADDRESS_SCANNER,
      options: { onChangeAddress },
    });
  }, [showModal, onChangeAddress]);

  return (
    <StyledAddressInput
      className={`token_address_input ${className} ${focus ? 'focus' : ''} ${
        showErr ? 'err' : ''
      } ${onCopy ? 'show-copy' : ''}`}
    >
      <Tooltip opened={!!focusTooltip && focus} label={focusTooltip}>
        <Textarea
          autosize
          spellCheck={false}
          onKeyDown={(e) => {
            if (e.code === 'Enter') {
              e.preventDefault();
            }
            if (e.code === 'Space') {
              e.preventDefault();
            }
          }}
          onFocus={() => {
            setFocus(true);
            if (handleFocus) handleFocus(true);
          }}
          onBlur={() => {
            setFocus(false);
            if (handleFocus) handleFocus(false);
          }}
          autoComplete="off"
          placeholder={placeholder || '0x...'}
          value={value}
          onChange={(e) => {
            const _value = e.target.value.replace(/[^a-zA-Z0-9]/g, '');
            onChangeAddress(trim(_value));
          }}
          rightSection={
            value ? (
              <IconDelete
                onClick={() => {
                  onChangeAddress('');
                }}
              />
            ) : (
              isMobile && <IconScan onClick={scan} />
            )
          }
          {...rest}
        />
      </Tooltip>
      {onCopy && !value && (
        <div
          className="copy-clear-btn"
          onClick={() => {
            navigator.clipboard.readText().then((clipText) => {
              onCopy(clipText);
            });
          }}
        >
          {intl.paste}
        </div>
      )}
      {onCopy && value && (
        <div
          className="copy-clear-btn"
          onClick={() => {
            onChangeAddress('');
          }}
        >
          {intl.clear}
        </div>
      )}
    </StyledAddressInput>
  );
}

const StyledAddressInput = styled.div`
  min-height: 50px;
  border-radius: 5px;
  height: auto;
  border: 1px solid transparent !important;
  display: flex;
  background: ${({ theme }: { theme: ThemeType }) => theme.inputBg};
  align-items: center;
  padding: 8px 0;
  position: relative;

  .copy-clear-btn {
    position: absolute;
    right: 12px;
    top: 12px;
    ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
    font-size: 12px;
    cursor: pointer;
    color: ${({ theme }: { theme: ThemeType }) => theme.blue};
  }

  .mantine-InputWrapper-root {
    background: none;
    height: auto;
    width: 100%;
    .mantine-Input-input.mantine-Textarea-input {
      overflow: hidden;
      font-size: 14px;
      color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
      background: none;
      min-height: auto;
      line-height: 20px;
      padding: 0 30px 0 16px;
      border: none !important;
      &:hover {
        border: none !important;
      }
    }
  }

  .anticon-close-circle {
    top: 4px !important;
  }

  &.focus {
    border: 1px solid
      ${({ theme }: { theme: ThemeType }) => theme.inputFocusBorder} !important;
    &.err,
    &.err-border {
      border: 1px solid ${({ theme }: { theme: ThemeType }) => theme.red} !important;
    }
  }

  &:hover {
    border: 1px solid
      ${({ theme }: { theme: ThemeType }) => theme.inputHoverBorder} !important;
    &.focus {
      border: 1px solid
        ${({ theme }: { theme: ThemeType }) => theme.inputFocusBorder} !important;
      &.err,
      &.err-border {
        border: 1px solid ${({ theme }: { theme: ThemeType }) => theme.red} !important;
      }
    }
  }

  &.err,
  &.err-border {
    border: 1px solid ${({ theme }: { theme: ThemeType }) => theme.red} !important;
  }
  &.show-copy {
    .ant-input {
      padding: 0 50px 0 12px;
    }
  }
`;

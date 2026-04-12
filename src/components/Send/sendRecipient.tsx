/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useState } from 'react';
import styled from 'styled-components';

import TokenAddressInput from 'src/components/Input/addressInput';
import { useIntl } from 'src/locals';
import { ThemeType } from 'src/theme';

import { useSendData } from './sendDataProvider';

export default function SendRecipient() {
  const intl = useIntl();
  const { recipient, setRecipient, showError, paramsValid } = useSendData();

  const changeAddress = useCallback(
    (address: string) => {
      setRecipient(address);
    },
    [setRecipient]
  );

  const { recipientError } = paramsValid;
  const [isFocus, setIsFocus] = useState(false);

  const showRecipientError = !isFocus && !!recipient && recipientError;

  return (
    <Wrapper>
      <TokenAddressInput
        showErr={(showError && !recipient) || showRecipientError}
        value={recipient}
        onChangeAddress={changeAddress}
        placeholder={intl.enter_address}
        handleFocus={(focus) => {
          setIsFocus(focus);
        }}
      />
      <div className="error"></div>
      {showRecipientError && recipient && (
        <div className="error_tips recipient">{intl.check_address_format}</div>
      )}
      {showError && !recipient && (
        <div className="error_tips recipient">{intl.required}</div>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  width: 100%;

  :hover {
    cursor: pointer;
  }
  &.show-dropdown {
    .icon-down {
      transform: rotate(180deg);
    }
  }
`;

const Dropdown = styled.div`
  position: absolute;
  background: ${({ theme }: { theme: ThemeType }) => theme.modalBg};
  box-shadow: ${({ theme }: { theme: ThemeType }) => theme.boxShadow};
  border-radius: 5px;
  left: 0;
  width: 100%;
  z-index: 111;
  margin-top: 1px;

  .select-Dropdown-inner {
    padding: 10px 0 10px;
    border-radius: 5px;
    .recipient-title {
      min-height: 30px;
      ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
      font-size: 14px;
      color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_80};
      padding: 0 12px;
      line-height: 30px;
    }
    .recipient-item {
      min-height: 30px;
      display: flex;
      padding: 11px 10px 11px 12px;
      align-items: center;
      ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
      color: ${({ theme }) => theme.t_fff};
      font-size: 14px;
      line-height: 19px;
      .recipient-item-text {
        white-space: normal;
        word-break: break-all;
        max-width: calc(100% - 30px);
        margin-right: 10px;
      }
      .icon-del {
        margin-left: auto;
      }
      &:hover {
        background: ${({ theme }: { theme: ThemeType }) => theme.hover};
      }
    }
  }

  .tag_me {
    margin-left: 3px;
    width: 28px;
    height: 20px;
    background: ${({ theme }) => theme.bg_white_10};
    border-radius: 2px;
    ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
    font-size: 12px;
    color: ${({ theme }: { theme: ThemeType }) => theme.blue};
    text-align: center;
    line-height: 20px;
  }

  :hover {
    cursor: pointer;
  }
  .search {
    padding: 0 12px;
    margin-bottom: 10px;
  }
`;

/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useState } from 'react';
import styled from 'styled-components';

import { PrimaryBtn, Textarea } from 'src/UI';

import { Type_DAChains } from 'src/da';
import { useIntl } from 'src/locals';
import { useChainInfosMap, useShowModal } from 'src/state/application/hooks';
import { ModalKeys } from 'src/state/application/reducer';
import { ThemeType } from 'src/theme';

import FungibleNetworkSelect from '../FungibleNetworkSelect';
import IconClear from '../Icons/clear';
import IconCopyGrid2 from '../Icons/copyGrid2';
import IconScan from '../Icons/scan';
import { useSendV2Data } from './sendDataProvider';

export default function SendV2Address() {
  const intl = useIntl();
  const [isFocused, setIsFocused] = useState(false);
  const {
    recipient,
    setRecipient,
    token,
    isDAUsdc,
    chain,
    setChain,
    validedFungibleChains,
    paramsValid,
    setPage,
    outChain,
  } = useSendV2Data();
  const { recipientError } = paramsValid;
  const showModal = useShowModal();
  const scan = useCallback(() => {
    showModal({
      modal: ModalKeys.ADDRESS_SCANNER,
      options: { onChangeAddress: setRecipient },
    });
  }, [showModal, setRecipient]);
  const chainInfosMap = useChainInfosMap();
  const showRecipientError = recipientError && recipient && !isFocused;
  return (
    <Wrapper>
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
        className={`${showRecipientError ? 'error-border' : ''}`}
        minRows={4}
        autoComplete="off"
        placeholder={intl.enter_address}
        value={recipient}
        onChange={(e) => {
          const _value = e.target.value.replace(/[^a-zA-Z0-9]/g, '');
          setRecipient(_value.trim());
        }}
        onFocus={() => {
          setIsFocused(true);
        }}
        onBlur={() => {
          setIsFocused(false);
        }}
      />
      {showRecipientError && (
        <div className="error_tips recipient">{intl.invalid_address}</div>
      )}
      <div className="btns">
        {showRecipientError ? (
          <div className="btn-item">
            <IconClear
              onClick={() => {
                setRecipient('');
              }}
            />
            {intl.clear}
          </div>
        ) : (
          <div className="btn-item">
            <IconCopyGrid2
              onClick={() => {
                navigator.clipboard.readText().then((clipText) => {
                  setRecipient(clipText);
                });
              }}
            />
            {intl.paste}
          </div>
        )}
        <div className="btn-item">
          <IconScan size={12} onClick={scan} />
          {intl.scan}
        </div>
      </div>

      <div className="network">
        <div className="network-title">{intl.Network}</div>
        {!isDAUsdc ? (
          <div className="network-value">
            {chainInfosMap[token?.chain as Type_DAChains]?.name}
          </div>
        ) : (
          <FungibleNetworkSelect
            chain={chain as Type_DAChains}
            onChange={setChain}
            validedFungibleChains={validedFungibleChains}
          />
        )}
      </div>

      <PrimaryBtn
        eventName="btn_send_confirm"
        disabled={recipientError || !recipient || !outChain}
        onClick={() => {
          setPage('amout');
        }}
      >
        {intl.Continue}
      </PrimaryBtn>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  padding: 10px 20px 0;

  display: flex;
  flex-direction: column;

  .btns {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 10px;
    margin-top: 15px;
    .btn-item {
      display: flex;
      align-items: center;
      gap: 5px;
      border: 1px solid ${(props) => props.theme.border_blue_30};
      border-radius: 15px;
      height: 30px;
      padding: 0px 20px;
      cursor: pointer;
      font-size: 14px;
      line-height: 16px;
      ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
      color: ${({ theme }: { theme: ThemeType }) => theme.blue};
      .icon-scan {
        color: ${({ theme }: { theme: ThemeType }) => theme.blue};
      }
    }
  }

  .error-border .mantine-Input-input {
    border: 1px solid ${({ theme }: { theme: ThemeType }) => theme.red} !important;
  }

  .error_tips {
    margin-top: 5px;
    ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
    font-size: 13px;
    color: ${({ theme }: { theme: ThemeType }) => theme.red};
    line-height: 18px;
    position: relative;
    display: flex;
    align-items: flex-start;
    margin-top: 5px;
  }

  .network {
    margin-top: 20px;
    .network-title {
      ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
      color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_80};
      font-size: 14px;
      line-height: 20px;
      margin-bottom: 10px;
    }
    .network-value {
      ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
      color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
      font-size: 14px;
      line-height: 20px;
    }
  }

  .dg-primary {
    margin-top: auto;
    width: 100%;
  }
`;

import React from 'react';
import styled from 'styled-components';

import { Token } from 'src/constants/interface';
import { Type_DAChains } from 'src/da';
import { useIntl } from 'src/locals';
import { useChainInfosMap, useModals } from 'src/state/application/hooks';
import ModalKeys from 'src/state/application/modalKeys';
import { ThemeType } from 'src/theme';

import FungibleNetworkSelect from '../FungibleNetworkSelect';
import Close from '../Icons/close';
import FullModal from '../Modals/fullModal';
import SendAmount from './amount';
import SendBtn from './btn';
import NetworkFee from './networkFee';
import SendDataProvider, { useSendData } from './sendDataProvider';
import SendRecipient from './sendRecipient';
import SendTokenSelect from './SendTokenSelect';

export default function SendModal() {
  const { visible, hide, token: token_ } = useModals(ModalKeys.send);

  const closeModal = () => {
    hide();
  };

  return (
    <FullModal
      onClose={closeModal}
      opened={visible}
      closeOnClickOutside={false}
    >
      <SendDataProvider token={token_ as Token}>
        <SendInner />
      </SendDataProvider>
    </FullModal>
  );
}

export function SendInner() {
  const intl = useIntl();
  const { token, chain, validedFungibleChains, isDAUsdc, setChain, tryResp } =
    useSendData();
  const { hide } = useModals(ModalKeys.send);

  const closeModal = () => {
    hide();
  };

  const minutes = Math.ceil((tryResp?.estimate_time ?? 0) / 60);
  const chainInfoMap = useChainInfosMap();

  return (
    <StyledSendModal className="modal-wrapper">
      <div className="modal-title">
        {intl.Send}
        <Close onClick={closeModal} />
      </div>
      <div className="modal-content">
        <div className="send-item">
          <div className="send-item-title">{intl.token}</div>
          <SendTokenSelect />
        </div>
        <div className="send-item">
          <div className="send-item-title">{intl.Recipient}</div>
          <SendRecipient />
        </div>
        {isDAUsdc && (
          <div className="send-item">
            <div className="send-item-title">{intl.Network}</div>
            <FungibleNetworkSelect
              chain={chain as Type_DAChains}
              onChange={setChain}
              validedFungibleChains={validedFungibleChains}
            />
          </div>
        )}

        <div className="send-item amount-item">
          <div className="send-item-title">{intl.amount}</div>
          <SendAmount />
        </div>

        {tryResp?.estimate_time > 0 && tryResp?.need_rebalance && (
          <div className="info-item">
            <div className="info-item-label">{intl.arrival_time}</div>
            <div className="info-item-value">
              {intl.around}
              {minutes === 1
                ? intl.time_1_minute
                : intl.time_M_minutes.replace('M', minutes)}
            </div>
          </div>
        )}

        {!isDAUsdc && (
          <div className="info-item">
            <div className="info-item-label">{intl.Network}</div>
            <div className="info-item-value">
              {chainInfoMap[token?.chain as Type_DAChains]?.name}
            </div>
          </div>
        )}
        <NetworkFee />
        <SendBtn />
      </div>
    </StyledSendModal>
  );
}

const StyledSendModal = styled.div`
  width: 100%;
  ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
  display: flex;
  flex-direction: column;
  .modal-title {
    padding: 0 20px;
  }
  .title {
    margin: 0 0 5px;
    font-size: 14px;
    color: ${({ theme }: { theme: ThemeType }) => theme.modalText};
    line-height: 20px;
  }
  --maxHeight: ${(props: any) => {
    return props.theme.windowHeight - props.theme.modalTop - 82 - 50;
  }}px;

  .modal-content {
    display: flex;
    flex-direction: column;
    padding: 2px 20px;
    width: 100%;
    max-height: var(--maxHeight);
    overflow: auto;
  }
  .send-item {
    margin-top: 10px;
    .send-item-title {
      font-size: 14px;
      line-height: 16px;
      ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
      color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_80};
      white-space: nowrap;
      margin-bottom: 10px;
      display: flex;
      align-items: center;
    }
  }
  .amount-item {
    margin-bottom: ${({ theme }: { theme: ThemeType }) =>
      theme.isMobile ? 'auto' : '35px'};
  }
  .chain-tips {
    border: 1px solid ${({ theme }) => theme.border_b7b_20};
    border-radius: 8px;
    min-height: 275px;
    display: flex;
    align-items: center;
    justify-content: center;
    ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
    font-size: 14px;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_80};
    text-align: center;
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

  .info-item {
    margin-top: 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    .info-item-label {
      font-size: 14px;
      line-height: 16px;
      ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
      color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_80};
    }
    .info-item-value {
      font-size: 14px;
      line-height: 16px;
      ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
      color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
    }
  }

  .dg-primary {
    margin-top: 20px;
    width: 100%;
    min-height: 40px;
    flex-shrink: 0;
  }
`;

import React, { useMemo, useState } from 'react';
import QRCode from 'qrcode.react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import styled from 'styled-components';

import { PrimaryBtn } from 'src/UI';

import Close from 'src/components/Icons/close';
import IconMobileBack from 'src/components/Icons/mobileBack';
import FullModal from 'src/components/Modals/fullModal';
import { Type_DAChains } from 'src/da';
import { useIntl } from 'src/locals';
import useMessage from 'src/providers/useMessage';
import { useChainInfosMap, useModals } from 'src/state/application/hooks';
import ModalKeys from 'src/state/application/modalKeys';
import { useDexAccount } from 'src/state/dexAccount/hooks';
import { ThemeType } from 'src/theme';

import WalletReceiveChainSelect from './chainSelect';

const UserCancel = 100000000;

export default function MobileReceiveModal() {
  const intl = useIntl();
  const { visible, hide, ...options } = useModals(
    ModalKeys.WALLET_RECEIVE
  ) as any;
  const { resPromise, token } = options as any;
  const [chain, setChain] = useState<Type_DAChains | ''>(token?.chain ?? '');
  const chainInfoMap = useChainInfosMap();
  const message = useMessage();
  const dexAccount = useDexAccount();

  const address = useMemo(() => {
    if (!chain) return '';
    const das = dexAccount?.DAs || {};
    return (das as any)[chain]?.address ?? '';
  }, [chain, dexAccount?.DAs]);

  const closeModal = () => {
    hide();
    resPromise?.reject?.({ code: UserCancel });
  };

  return (
    <FullModal
      onClose={closeModal}
      opened={visible}
      closeOnClickOutside={false}
    >
      <StyledReceiveModal className="modal-wrapper">
        <div className="modal-title">
          {!!chain && (
            <IconMobileBack
              onClick={() => {
                setChain('');
              }}
            />
          )}
          {!chain ? intl.Select_Network : intl.Receive}
          <Close onClick={closeModal} />
        </div>
        {!chain && (
          <div className="modal-content">
            <WalletReceiveChainSelect value={chain} onChange={setChain} />
          </div>
        )}
        {!!chain && !!address && (
          <div className="modal-content">
            <div className="address-inner">
              <div className="address-qrcode">
                <QRCode value={address} size={236} level="H" />
              </div>
              <div className="address-title">
                {intl.My_CHAIN_Address?.replace(
                  'CHAIN',
                  chainInfoMap[chain as Type_DAChains]?.name ?? chain
                )}
              </div>
              <div className="address">
                <div className="address-value">{address}</div>
                <CopyToClipboard
                  text={address}
                  onCopy={() => message.success(intl.copied)}
                >
                  <PrimaryBtn eventName="btn_receive_address_copy">
                    {intl.Copy}
                  </PrimaryBtn>
                </CopyToClipboard>
              </div>
            </div>
            <div className="tips">
              {intl.funds_received_to_this_address_are_entirely_self_custodied}
            </div>
          </div>
        )}
      </StyledReceiveModal>
    </FullModal>
  );
}

const StyledReceiveModal = styled.div`
  width: 100%;
  padding: 22px 15px 30px;
  ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
  min-height: 525px;
  .modal-title {
    padding: 0 20px;
    margin-bottom: 17px;
  }
  .modal-content {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  .address-inner {
    border-radius: 8px;
    padding: 25px 15px 30px;
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .address-qrcode {
      background: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
      height: 246px;
      width: 246px;
      padding: 5px;
      margin-bottom: 25px;
      position: relative;
    }
    .address-title {
      ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
      font-size: 14px;
      color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
      line-height: 18px;
      margin-bottom: 10px;
    }
    .address {
      word-break: break-all;
      ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
      font-size: 14px;
      line-height: 20px;
      cursor: pointer;
      display: flex;
      align-items: center;
      flex-direction: column;
      gap: 10px;
      .address-value {
        max-width: 240px;
        text-align: center;
        color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
      }
      .dg-primary {
        margin-left: 10px;
        height: 32px;
        font-size: 14px;
        padding: 0 15px;
        min-width: 100px;
        border-radius: 16px;
      }
    }
  }
  .tips {
    width: 100%;
    margin-bottom: 5px;
    margin-top: auto;
    ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
    color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_80};
    font-size: 12px;
    position: relative;
    text-align: center;
    line-height: 20px;
    display: flex;
    align-items: flex-start;
  }
`;

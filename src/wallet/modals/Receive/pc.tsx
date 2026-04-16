import React, { useMemo, useState } from 'react';
import QRCode from 'qrcode.react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import styled from 'styled-components';

import { PrimaryBtn } from 'src/UI';

import Close from 'src/components/Icons/close';
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

export default function PCReceiveModal() {
  const intl = useIntl();
  const { visible, hide, ...options } = useModals(
    ModalKeys.WALLET_RECEIVE
  ) as any;
  const { resPromise, token } = options as any;
  const chainOption = token?.chain ?? '';
  const [chain, setChain] = useState<Type_DAChains | ''>(chainOption);
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
      <StyledAddModal className="modal-wrapper">
        <div className="modal-title">
          {intl.Receive}
          <Close onClick={closeModal} />
        </div>
        <div className="modal-content">
          <WalletReceiveChainSelect value={chain} onChange={setChain} />
          {!!chain && !!address && (
            <>
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
                {
                  intl.funds_received_to_this_address_are_entirely_self_custodied
                }
              </div>
            </>
          )}
        </div>
      </StyledAddModal>
    </FullModal>
  );
}

const StyledAddModal = styled.div`
  width: 100%;
  padding: 22px 15px 30px;
  ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
  min-height: 525px;
  .modal-title {
    padding: 0 20px;
    margin-bottom: 17px;
  }
  .title {
    margin: 0 0 5px;
    font-size: 14px;
    color: ${({ theme }: { theme: ThemeType }) => theme.modalLabel};
    line-height: 20px;
  }
  .modal-content {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  .address-inner {
    border: 1px solid ${({ theme }: { theme: ThemeType }) => theme.border_02};
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
      margin-bottom: 20px;
      position: relative;
      .token-icon {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
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
      line-height: 18px;
      cursor: pointer;
      display: flex;
      align-items: center;
      .address-value {
        color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
      }
      .dg-primary {
        margin-left: 10px;
        height: 32px;
        font-size: 14px;
        padding: 0 15px;
        min-width: 70px;
      }
    }
  }
  .tips {
    width: 100%;
    margin-bottom: 5px;
    margin-top: 20px;
    ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
    color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_80};
    font-size: 12px;
    position: relative;
    line-height: 20px;
    display: flex;
    align-items: flex-start;
  }

  .btn-view-explorer {
    width: 100%;
    margin-top: auto;
  }
`;

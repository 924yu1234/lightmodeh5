import React, { useCallback } from 'react';
import styled, { createGlobalStyle } from 'styled-components';

import { Modal } from 'src/UI';

import { useIntl } from 'src/locals';
import { useModals } from 'src/state/application/hooks';
import { ModalKeys } from 'src/state/application/reducer';
import { ThemeType } from 'src/theme';
import { logSendV2 } from 'src/utils/log/swap';

import IconWrapper from '../Icons/IconWrapper';
import IconMobileBack from '../Icons/mobileBack';
import QrReader from './scanner';

export default function AddressScanner() {
  const { visible, hide, options } = useModals(ModalKeys.ADDRESS_SCANNER);

  const { onChangeAddress } = options as {
    onChangeAddress: (address: string) => void;
  };
  const intl = useIntl();

  const handleScan = useCallback(
    (text: string) => {
      let address = text.trim();
      if (address.includes(':')) {
        address = address.split(':')[1];
      }
      onChangeAddress(address);
      hide();
    },
    [onChangeAddress, hide]
  );

  const handleError = useCallback((error: any) => {
    logSendV2({
      event: 'error scan qr code',
      error,
    });
  }, []);

  return (
    <Modal
      title={null}
      onClose={hide}
      opened={visible}
      className="address-scanner-modal"
    >
      <ScannerModal>
        <div className="qr-title">
          <IconWrapper size={24} onClick={hide}>
            <IconMobileBack size={16} />
          </IconWrapper>
          {intl.scan_qr_code}
        </div>
        <div className="scanner-container">
          <QrReader onResult={handleScan} onError={handleError} />
        </div>
      </ScannerModal>
      <AddressScannerModal />
    </Modal>
  );
}

const ScannerModal = styled.div`
  border-radius: 20px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  .qr-title {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 44px;
    gap: 8px;
    width: 100%;
    .dg-icon-wrapper {
      position: absolute;
      left: 12px;
    }
  }

  .scanner-container {
    margin: auto;
    height: 270px;
    width: 270px;
    position: relative;
    border-radius: 12px;
  }
`;

const AddressScannerModal = createGlobalStyle`
  .address-scanner-modal.mantine-Modal-root {
    .mantine-Modal-inner {
      width: 100%;
      height: 100%;
      padding: 0;
      max-width: none;
      .mantine-Modal-content {
        height: 100%;
        border-radius: 0px;
        max-width: ${({ theme }: { theme: ThemeType }) => theme.windowWidth}px;
        .mantine-Modal-body {
          height: 100%;
        }
      }
    }
  }
`;

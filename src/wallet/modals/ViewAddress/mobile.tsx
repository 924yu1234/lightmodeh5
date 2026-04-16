import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';

import { Modal } from 'src/UI';

import IconMobileBack from 'src/components/Icons/mobileBack';
import { useIntl } from 'src/locals';
import { useModals } from 'src/state/application/hooks';
import ModalKeys from 'src/state/application/modalKeys';
import { ThemeType } from 'src/theme';

import ViewAddressInner from './inner';

export default function ViewAddressMobileModal() {
  const intl = useIntl();
  const { visible, hide } = useModals(ModalKeys.WALLET_VIEW_ADDRESS) as any;

  return (
    <Modal
      title={null}
      onClose={hide}
      opened={visible}
      className="view-address-modal"
    >
      <StyledViewAddressMobile>
        <div className="modal-title">
          <IconMobileBack onClick={hide} />
          {intl.view_address}
        </div>
        <div className="modal-content modal-overflow">
          <ViewAddressInner />
        </div>
      </StyledViewAddressMobile>
      <ViewAddressMobileGlobalCss />
    </Modal>
  );
}

const StyledViewAddressMobile = styled.div`
  width: 100%;
  ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
  display: flex;
  flex-direction: column;
  background: ${({ theme }: { theme: ThemeType }) => theme.bg};
  position: relative;
  padding: 52px 0 0;
  height: 100%;
  .modal-title {
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 27px;
    padding: 0;
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    height: 52px;
    width: 100%;
    .icon-m-back {
      position: absolute;
      left: 15px;
    }
  }
  .modal-content {
    padding: 0;
    width: 100%;
    max-height: ${(props: any) => {
      return props.theme.windowHeight - 52;
    }}px;
    overflow: auto;
  }

  .addr {
    padding: 0 15px;
  }

  .das {
    padding: 15px 15px 30px 15px;
    border-top: 4px solid #030303;
  }
`;

const ViewAddressMobileGlobalCss = createGlobalStyle`
  .view-address-modal.mantine-Modal-root {
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

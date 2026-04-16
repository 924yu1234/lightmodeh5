import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';

import { Modal } from 'src/UI';

import Close from 'src/components/Icons/close';
import { useIntl } from 'src/locals';
import { useModals } from 'src/state/application/hooks';
import ModalKeys from 'src/state/application/modalKeys';
import { ThemeType } from 'src/theme';

import ViewAddressInner from './inner';

export default function ViewAddressPCModal() {
  const intl = useIntl();
  const { visible, hide } = useModals(ModalKeys.WALLET_VIEW_ADDRESS) as any;

  return (
    <Modal
      title={null}
      onClose={hide}
      opened={visible}
      className="view-address-modal"
    >
      <StyledViewAddress>
        <div className="modal-title">
          {intl.view_address}
          <Close onClick={hide} />
        </div>
        <div className="modal-content modal-overflow">
          <ViewAddressInner />
        </div>
      </StyledViewAddress>
      <ViewAddressPCGlobalCss />
    </Modal>
  );
}

const StyledViewAddress = styled.div`
  width: 100%;
  padding: 0 0 30px;
  ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
  display: flex;
  flex-direction: column;
  .modal-title {
    margin-bottom: 20px;
  }
  .modal-content {
    padding: 0 20px;
    width: 100%;
    max-height: ${(props: any) => {
      return props.theme.maxModalHeight - 120;
    }}px;
    overflow: auto;
  }
`;

const ViewAddressPCGlobalCss = createGlobalStyle`
  .view-address-modal.mantine-Modal-root {
    padding-bottom: 0;
    .mantine-Modal-content {
      width: 390px;
      max-width: 390px;
    }
  }
`;

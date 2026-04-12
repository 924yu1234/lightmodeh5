import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';

import { Modal } from 'src/UI';

import { useThemeParams } from 'src/theme';

import Close from 'js/components/Icons/close';
import { useIntl } from 'js/locals';
import { useModals } from 'js/state/application/hooks';
import { ModalKeys } from 'js/state/application/reducer';

import TermsOfServiceContent from './TermsOfServiceContent';

export default function TermsModal() {
  const intl = useIntl();
  const { isMobile } = useThemeParams();
  const { visible, hide } = useModals(ModalKeys.terms_of_service);

  return (
    <Modal
      title={null}
      onClose={hide}
      opened={visible}
      size={isMobile ? 'auto' : 740}
      className="terms-modal"
    >
      <StyledTermsModal>
        <div className="modal-title">
          {intl.terms_of_service}
          <Close onClick={hide} />
        </div>
        <TermsOfServiceContent />
      </StyledTermsModal>
      {!isMobile && <GlobalStyle />}
    </Modal>
  );
}

TermsModal.propTypes = {};

const StyledTermsModal = styled.div`
  padding: 0 20px 20px;
  .modal-title {
    margin-bottom: 20px;
  }
  .terms-content {
    max-height: calc(100vh - 300px);
    overflow: auto;
  }
`;

const GlobalStyle = createGlobalStyle`
  html .mantine-Modal-root.terms-modal .mantine-Modal-inner {
    padding-top: 150px;
    .mantine-Modal-content {
      max-width: calc(100vw - 60px);
    }
  }
`;

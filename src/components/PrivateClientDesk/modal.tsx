import React, { useCallback } from 'react';
import styled, { createGlobalStyle } from 'styled-components';

import { Modal } from 'src/UI';

import Close from 'src/components/Icons/close';
import { useModals, useShowModal } from 'src/state/application/hooks';
import { ModalKeys } from 'src/state/application/reducer';
import { ThemeType, useThemeParams } from 'src/theme';

import PrivateClientDeskContent from './content';

export default function PrivateClientDeskModal() {
  const { isMobile } = useThemeParams();
  const { visible, hide, showHideEntryBtn } = useModals(
    ModalKeys.privateClientDesk
  ) as {
    visible: boolean;
    hide: () => void;
    showHideEntryBtn?: boolean;
  };
  const showModal = useShowModal();

  const handleClickHideEntryBtn = useCallback(() => {
    showModal({
      modal: ModalKeys.privateClientDeskHideEntryConfirm,
      isWebFloatingEntry: true,
    });
  }, [showModal]);

  if (isMobile) return null;

  return (
    <Modal
      title={null}
      className="PrivateClientDesk-modal"
      onClose={hide}
      opened={visible}
      style={{ width: 675 }}
    >
      <StyledPrivateClientDeskModal>
        <div className="modal-title">
          <Close onClick={hide} />
        </div>

        <PrivateClientDeskContent
          showHideEntryBtn={!!showHideEntryBtn}
          onClickHideEntryBtn={handleClickHideEntryBtn}
          className="modal-content"
        />
      </StyledPrivateClientDeskModal>
      <GlobalStyle />
    </Modal>
  );
}

const StyledPrivateClientDeskModal = styled.div`
  width: 100%;
  padding: 0 20px 20px;
  position: relative;

  .close-btn {
    position: absolute;
    right: 10px;
    top: 10px;
    border: none;
    background: transparent;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff_60};
    cursor: pointer;
    width: 28px;
    height: 28px;
    border-radius: 14px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0;
  }
`;

const GlobalStyle = createGlobalStyle`
  html .mantine-Modal-root.PrivateClientDesk-modal .mantine-Modal-inner {
    .mantine-Modal-content {
      min-width: ${({ theme }: { theme: ThemeType }) =>
        theme.isMobile ? 'auto' : '675px'};
      min-height: ${({ theme }: { theme: ThemeType }) =>
        theme.isMobile ? 'auto' : '550px'};
      border-radius: 20px;
      background: ${({ theme }: { theme: ThemeType }) => theme.modalBg};
      box-shadow: 0 2px 4px 0
        ${({ theme }: { theme: ThemeType }) => theme.bg_black_50};
    }
  }
`;

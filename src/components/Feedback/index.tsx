import React from 'react';
import { createGlobalStyle } from 'styled-components';

import FeedbackInner from 'src/components/Feedback/inner';
import { ThemeType, useThemeParams } from 'src/theme';

import Close from 'js/components/Icons/close';
import { useIntl } from 'js/locals';
import { useModals } from 'js/state/application/hooks';
import { ModalKeys } from 'js/state/application/reducer';

import BottomModal from '../Modals/bottomModal';

export default function Feedback() {
  const intl = useIntl();
  const { isMobile } = useThemeParams();
  const { visible, hide } = useModals(ModalKeys.feedback);

  return (
    <BottomModal
      onClose={hide}
      opened={visible}
      className="Feedback-modal full-modal"
      closeOnClickOutside={false}
    >
      <div className="modal-wrapper">
        <div className="modal-title">
          {isMobile ? intl.feedback : null}
          <Close size={18} onClick={hide} />
        </div>
        <FeedbackInner />
      </div>
      <GlobalStyle />
    </BottomModal>
  );
}

const GlobalStyle = createGlobalStyle`
  html .mantine-Modal-root.Feedback-modal .mantine-Modal-inner {
    .mantine-Modal-content {
      min-width: ${({ theme }: { theme: ThemeType }) =>
        theme.isMobile ? 'auto' : '600px'};
    }
  }
`;

import React from 'react';
import styled from 'styled-components';

import { GhostBtn, Modal, UIButton } from 'src/UI';

import Close from 'js/components/Icons/close';
import { DISCORD } from 'js/constants/dex';
import { useIntl } from 'js/locals';
import { useModals } from 'js/state/application/hooks';
import { ModalKeys } from 'js/state/application/reducer';
import windowOpen from 'js/utils/windowOpen';

import IconStatusSuccess from '../Icons/StatusSuccess';

export default function FeedbackSuccessModal() {
  const intl = useIntl();
  const { visible, hide } = useModals(ModalKeys.feedbackSuccessTip);

  const goToDiscord = () => {
    windowOpen(DISCORD);
  };

  return (
    <Modal title={null} onClose={hide} opened={visible}>
      <StyledFeedbackSuccessModal>
        <div className="modal-title">
          <Close onClick={hide} />
        </div>
        <IconStatusSuccess size={50} />
        <div className="status">{intl.feedback_success}</div>
        <div className="status">{intl.feedback_success_2}</div>
        <div className="modal-btns">
          <UIButton
            eventName="btn_feedback_success_open_discord"
            onClick={goToDiscord}
          >
            {intl.open_discord}
          </UIButton>
          <GhostBtn className="modal-cancel" onClick={hide}>
            {intl.Close}
          </GhostBtn>
        </div>
      </StyledFeedbackSuccessModal>
    </Modal>
  );
}

FeedbackSuccessModal.propTypes = {};

const StyledFeedbackSuccessModal = styled.div`
  width: 100%;
  padding: 0 20px 20px;
  ${(props) => props.theme.fontRegular};
  display: flex;
  flex-direction: column;
  align-items: center;
  .modal-title {
    margin-bottom: 20px;
  }
  .icon-status-success {
    margin: 0 0 30px;
    width: 50px;
    height: 50px;
  }
  .title {
    margin-bottom: 10px;
    color: ${(props) => props.theme.t_d4d};
    line-height: 26px;
    font-size: 14px;
    text-align: center;
  }
  .status {
    ${(props) => props.theme.fontRegular};
    font-size: 14px;
    margin-top: 10px;
  }
  .modal-btns {
    margin-top: 20px;
  }
`;

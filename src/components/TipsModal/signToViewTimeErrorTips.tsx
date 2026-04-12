import React from 'react';
import styled from 'styled-components';

import { Modal, PrimaryBtn } from 'src/UI';

import Close from 'js/components/Icons/close';
import IconPopupWarning from 'js/components/Icons/Warning';
import { useIntl } from 'js/locals';
import { useModals } from 'js/state/application/hooks';
import { ModalKeys } from 'js/state/application/reducer';

export default function SignToViewTimeError() {
  const { visible, hide } = useModals(ModalKeys.tips_signToViewTimeError);
  const intl = useIntl();

  return (
    <Modal title={null} onClose={hide} opened={visible}>
      <StyledModal>
        <div className="modal-title">
          <Close onClick={hide} />
        </div>
        <IconPopupWarning size={50} />
        <div className="title">{intl.invalid_signature}</div>
        <div className="desc">{intl.possible_cause}</div>
        <div className="desc">{intl.locale_time_error}</div>
        <PrimaryBtn
          eventName="btn_sign_to_view_time_error_close"
          onClick={hide}
        >
          {intl.Close}
        </PrimaryBtn>
      </StyledModal>
    </Modal>
  );
}

const StyledModal = styled.div`
  width: 100%;
  padding: 0 20px 30px;
  ${(props) => props.theme.fontRegular};
  display: flex;
  flex-direction: column;
  align-items: center;
  .modal-title {
    margin-bottom: 20px;
  }

  .icon-popup-warning {
    margin: 0 auto 10px;
    display: block;
  }

  .title {
    margin-bottom: 15px;
    ${(props) => props.theme.fontMedium};
    color: ${(props) => props.theme.modalTitle};
    line-height: 22px;
    font-size: 16px;
    text-align: center;
  }
  .desc {
    color: ${(props) => props.theme.modalText};
    line-height: 20px;
    font-size: 14px;
    text-align: center;
  }

  .dg-primary {
    margin-top: 30px;
    width: 100%;
  }
`;

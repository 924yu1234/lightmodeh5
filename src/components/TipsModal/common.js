import React from 'react';
import styled from 'styled-components';

import { Modal, PrimaryBtn } from 'src/UI';

import Close from 'js/components/Icons/close';
import { useIntl } from 'js/locals';
import { useModals } from 'js/state/application/hooks';
import { ModalKeys } from 'js/state/application/reducer';

export default function TipsCommon() {
  const { visible, hide, title, content, onHide } = useModals(
    ModalKeys.tips_common
  );

  const intl = useIntl();

  const hideModal = () => {
    if (onHide) onHide();
    hide();
  };

  return (
    <Modal title={null} onClose={hideModal} opened={visible}>
      <StyledCommonTips>
        <div className="modal-title">
          {title}
          <Close onClick={hideModal} />
        </div>
        <div className="title">{content}</div>
        <PrimaryBtn onClick={hideModal}>{intl.btn_confirm}</PrimaryBtn>
      </StyledCommonTips>
    </Modal>
  );
}

TipsCommon.propTypes = {};

const StyledCommonTips = styled.div`
  width: 100%;
  padding: 0 16px 30px;
  display: flex;
  align-items: center;
  flex-direction: column;

  .modal-title {
    margin-bottom: 20px;
  }

  .title {
    ${(props) => props.theme.fontRegular};
    color: ${(props) => props.theme.modalText};
    font-size: 14px;
    line-height: 24px;
    width: 100%;
    text-align: center;
  }

  .desc {
    ${(props) => props.theme.fontRegular};
    color: ${(props) => props.theme.modalDesc};
    font-size: 14px;
    line-height: 24px;
    margin: 10px 0 0;
  }

  .dg-primary {
    width: 100%;
    margin-top: 30px;
  }
`;

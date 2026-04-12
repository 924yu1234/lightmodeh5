import React from 'react';
import styled from 'styled-components';

import { Modal, PrimaryBtn } from 'src/UI';

import Close from 'js/components/Icons/close';
import { useIntl } from 'js/locals';
import { useModals } from 'js/state/application/hooks';
import { ModalKeys } from 'js/state/application/reducer';

export default function InsufficientFeeModal() {
  const { visible, hide } = useModals(ModalKeys.err_insufficientFee);
  const intl = useIntl();

  return (
    <Modal title={null} onClose={hide} opened={visible}>
      <StyledInsufficientFee>
        <div className="modal-title">
          <Close onClick={hide} />
        </div>
        <div className="title">{intl.insufficientFee_gas_fee}</div>
        <div className="desc">{intl['trade.err_insufficientFee_desc']}</div>

        <PrimaryBtn eventName="btn_insufficient_fee_close" onClick={hide}>
          {intl.Close}
        </PrimaryBtn>
      </StyledInsufficientFee>
    </Modal>
  );
}

InsufficientFeeModal.propTypes = {};

const StyledInsufficientFee = styled.div`
  width: 100%;
  padding: 0 20px 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  .modal-title {
    margin-bottom: 20px;
  }

  .title {
    ${(props) => props.theme.fontMedium};
    font-size: 14px;
    color: ${(props) => props.theme.modalText};
    text-align: center;
    line-height: 22px;
    margin-bottom: 10px;
  }
  .desc {
    ${(props) => props.theme.fontRegular};
    font-size: 14px;
    color: ${(props) => props.theme.modalDesc};
    text-align: center;
    line-height: 20px;
  }
  .dg-primary {
    width: 100%;
    margin-top: 30px;
  }
`;

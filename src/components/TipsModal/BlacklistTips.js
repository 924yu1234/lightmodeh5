/* eslint-disable react/no-danger */
import React from 'react';
import styled from 'styled-components';

import { Modal, PrimaryBtn } from 'src/UI';

import { useIntl } from 'js/locals';
import { useModals } from 'js/state/application/hooks';
import { ModalKeys } from 'js/state/application/reducer';

import Close from '../Icons/close';
import IconPopupWarning from '../Icons/Warning';

export default function BlacklistTips() {
  const intl = useIntl();
  const { visible, hide } = useModals(ModalKeys.tips_blacklist);
  return (
    <Modal
      title={null}
      onClose={hide}
      opened={visible}
      closeOnClickOutside={false}
      closeOnEscape={false}
    >
      <StyledBlacklistTips>
        <div className="modal-title">
          <Close onClick={hide} />
        </div>
        <IconPopupWarning />
        <div
          className="title"
          dangerouslySetInnerHTML={{
            __html: intl.service_unavailable_for_blacklist,
          }}
        />
        <PrimaryBtn eventName="btn_blacklist_tips_close" onClick={hide}>
          {intl.Close}
        </PrimaryBtn>
      </StyledBlacklistTips>
    </Modal>
  );
}

BlacklistTips.propTypes = {};

const StyledBlacklistTips = styled.div`
  ${(props) => props.theme.fontMedium};
  padding: 0 20px 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  .modal-title {
    margin-bottom: 20px;
  }
  .icon-popup-warning {
    width: 50px;
    margin-bottom: 20px;
  }
  .title {
    font-size: 16px;
    color: ${(props) => props.theme.t_fff};
    text-align: center;
    line-height: 22px;
    margin: 0 auto 25px;
  }
  .dg-primary {
    width: 100%;
  }
`;

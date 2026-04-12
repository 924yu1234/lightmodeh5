/* eslint-disable react/no-danger */
import React from 'react';
import styled from 'styled-components';

import { Modal, PrimaryBtn } from 'src/UI';

import { OrderDirs } from 'src/constants/interface';

import Close from 'js/components/Icons/close';
import { useIntl } from 'js/locals';
import { useModals } from 'js/state/application/hooks';
import { ModalKeys } from 'js/state/application/reducer';

export default function SwapMinTips() {
  const { visible, hide, minSwapAmount, orderDir } = useModals(
    ModalKeys.tips_SwapMinTips
  );

  const intl = useIntl();

  const hideModal = () => {
    hide();
  };

  return (
    <Modal title={null} onClose={hideModal} opened={visible}>
      <StyledLimitOrderMinTips>
        <div className="modal-title">
          <Close onClick={hideModal} />
        </div>
        <div className="title">{intl.insufficient_order_value}</div>
        <div className="desc">
          {orderDir === OrderDirs.BUY ? intl.minimum_buy : intl.minimum_sell}: $
          {minSwapAmount}
        </div>
        <PrimaryBtn eventName="btn_swap_tips_min_close" onClick={hideModal}>
          {intl.Close}
        </PrimaryBtn>
      </StyledLimitOrderMinTips>
    </Modal>
  );
}

const StyledLimitOrderMinTips = styled.div`
  width: 100%;
  padding: 0 20px 30px;
  display: flex;
  align-items: center;
  flex-direction: column;

  .modal-title {
    margin-bottom: 20px;
  }

  .title {
    ${(props) => props.theme.fontMedium};
    color: ${(props) => props.theme.modalTitle};
    font-size: 16px;
    line-height: 22px;
  }

  .desc {
    ${(props) => props.theme.fontRegular};
    color: ${(props) => props.theme.modalDesc};
    font-size: 14px;
    line-height: 20px;
    width: 100%;
    margin-top: 10px;
    text-align: center;
    b {
      ${(props) => props.theme.fontBold};
    }
  }

  .dg-primary {
    margin-top: 30px;
    width: 100%;
  }
`;

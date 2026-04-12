import React from 'react';
import styled from 'styled-components';

import { Modal, PrimaryBtn } from 'src/UI';

import Close from 'src/components/Icons/close';
import { SwapOrderStatus } from 'src/constants/consts';
import useCustomNavigate from 'src/hooks/useCustomNavigate';
import { useIntl } from 'src/locals';
import { useModals } from 'src/state/application/hooks';
import { ModalKeys } from 'src/state/application/reducer';
import { ThemeType } from 'src/theme';

import StatusView from './statusView';
import useSendOrderProgress from './useSendOrderProgress';

export default function SendOrderProgressModal() {
  const intl = useIntl();
  const { order, hide, visible, data } = useModals(ModalKeys.sendOrderProgress);
  const resp = useSendOrderProgress({ order, withdraw_id: data?.withdraw_id });
  const status = resp?.status;

  const closeModal = () => {
    hide();
  };

  const navigate = useCustomNavigate();

  return (
    <Modal centered title={null} onClose={closeModal} opened={!!visible}>
      <StyledOrder>
        <div className="modal-title">
          <Close onClick={closeModal} />
        </div>
        <StatusView
          status={status || SwapOrderStatus.processing}
          amount={order?.amount}
          token={order?.token}
        />
        <PrimaryBtn
          eventName="btn_send_progress_view_history"
          onClick={() => {
            closeModal();
            navigate('/account/history/send');
          }}
        >
          {intl.view_history}
        </PrimaryBtn>
      </StyledOrder>
    </Modal>
  );
}

const StyledOrder = styled.div`
  width: 100%;
  padding: 0 20px 30px;
  ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
  display: flex;
  flex-direction: column;
  align-items: center;

  .modal-title {
    margin-bottom: 20px;
  }

  .dg-primary {
    margin-top: 20px;
    width: 100%;
  }
`;

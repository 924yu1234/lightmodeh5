import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { Modal } from 'src/UI';

import { TurboRangeOrderStatus } from 'src/constants/consts';
import { useModals } from 'src/state/application/hooks';
import { ModalKeys } from 'src/state/application/reducer';
import { useRefreshSwapBalance } from 'src/state/swap/balances/hooks';
import { useRefreshTurboRangePostions } from 'src/state/turboRange/hooks';
import { useTurboRangeOrderProgress } from 'src/state/turboRange/useTurboRangeOrderProgress';
import { ThemeType } from 'src/theme';

import InvestFailed from './increaseFailed';
import InvestProcessing from './increaseProcessing';
import InvestSuccess from './increaseSuccess';

export default function TurboRangeIncreaseProgressModal() {
  const { order, hide, intent_id, visible } = useModals(
    ModalKeys.turboRangeIncreaseProgress
  );
  const resp = useTurboRangeOrderProgress({ order, intent_id });
  const status = resp?.status;
  const refrehPostions = useRefreshTurboRangePostions();
  const refrehSwapBalance = useRefreshSwapBalance();
  const [refreshIndex, setRefreshIndex] = useState(0);

  useEffect(() => {
    if (status === TurboRangeOrderStatus.success) {
      refrehPostions();
    }
    const timer = setTimeout(() => {
      setRefreshIndex((pre) => pre + 1);
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [status, refreshIndex, hide, refrehPostions]);

  const closeModal = () => {
    refrehPostions();
    refrehSwapBalance();
    hide();
  };

  return (
    <Modal
      title={null}
      centered
      onClose={closeModal}
      opened={!!visible}
      closeOnClickOutside={false}
    >
      <StyledOrder>
        <div className="modal-title"></div>
        {status === TurboRangeOrderStatus.success && (
          <InvestSuccess order={resp} closeModal={closeModal} />
        )}
        {status === TurboRangeOrderStatus.processing && (
          <InvestProcessing closeModal={closeModal} />
        )}
        {status === TurboRangeOrderStatus.failed && (
          <InvestFailed closeModal={closeModal} />
        )}
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
    margin-top: 15px;
    width: 100%;
  }
`;

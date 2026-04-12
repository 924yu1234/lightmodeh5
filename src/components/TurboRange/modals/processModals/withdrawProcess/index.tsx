import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { Modal } from 'src/UI';

import { TurboRangeOrderStatus } from 'src/constants/consts';
import { useModals, useShowModal } from 'src/state/application/hooks';
import { ModalKeys } from 'src/state/application/reducer';
import { useRefreshSwapBalance } from 'src/state/swap/balances/hooks';
import { useRefreshTurboRangePostions } from 'src/state/turboRange/hooks';
import { useTurboRangeOrderProgress } from 'src/state/turboRange/useTurboRangeOrderProgress';
import { ThemeType } from 'src/theme';

import Failed from './failed';
import Processing from './process';
import Success from './success';

export default function TurboRangeWithdrawProgressModal() {
  const { order, hide, intent_id, visible } = useModals(
    ModalKeys.turboRangeWithdrawProgress
  );
  const showModal = useShowModal();
  const resp = useTurboRangeOrderProgress({
    order,
    intent_id,
  });
  const status = resp?.status;
  const refrehPostions = useRefreshTurboRangePostions();
  const refrehSwapBalance = useRefreshSwapBalance();

  const { hide: hideDetail } = useModals(ModalKeys.turboRangeDetail);
  const [refreshIndex, setRefreshIndex] = useState(0);
  const poolAddress = order?.product?.poolAddress;

  useEffect(() => {
    if (status === TurboRangeOrderStatus.success) {
      refrehPostions();
    }
    const timer = setTimeout(() => {
      setRefreshIndex((pre) => pre + 1);
    }, 3000);
    return () => {
      clearTimeout(timer);
    };
  }, [status, refreshIndex, hide, refrehPostions]);

  const closeModal = () => {
    hideDetail();
    refrehPostions();
    refrehSwapBalance();
    hide();
  };

  useEffect(() => {
    if (resp?.errorCode > 0) {
      showModal({
        modal: ModalKeys.tips_intent_error,
        errorCode: resp?.errorCode,
      });
      closeModal();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resp?.errorCode]);

  return (
    <Modal title={null} centered onClose={closeModal} opened={!!visible}>
      <StyledOrder>
        <div className="modal-title"></div>
        {status === TurboRangeOrderStatus.success && (
          <Success
            order={resp}
            poolAddress={poolAddress}
            closeModal={closeModal}
          />
        )}
        {status === TurboRangeOrderStatus.processing && (
          <Processing closeModal={closeModal} />
        )}
        {status === TurboRangeOrderStatus.failed && (
          <Failed closeModal={closeModal} />
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

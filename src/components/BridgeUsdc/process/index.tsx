import React from 'react';
import styled from 'styled-components';

import { Modal } from 'src/UI';

import { IntentOrderStatus } from 'src/constants/consts';
import { useModals } from 'src/state/application/hooks';
import { ModalKeys } from 'src/state/application/reducer';
import { useRefreshSwapBalance } from 'src/state/swap/balances/hooks';
import { ThemeType } from 'src/theme';

import { useBridgeUsdcOrderProgress } from '../useBridgeUsdcOrderProgress';
import Failed from './failed';
import Processing from './processing';
import Success from './success';

export default function BridgeUsdcProgressModal() {
  const { order, hide, intent_id, visible } = useModals(
    ModalKeys.bridgeUsdcProgress
  );
  const resp = useBridgeUsdcOrderProgress({ order, intent_id });
  const status = resp?.status;
  const refrehSwapBalance = useRefreshSwapBalance();

  const closeModal = () => {
    refrehSwapBalance();
    hide();
  };

  return (
    <Modal centered title={null} onClose={closeModal} opened={!!visible}>
      <StyledOrder>
        <div className="modal-title"></div>
        {status === IntentOrderStatus.success && (
          <Success closeModal={closeModal} order={resp} />
        )}
        {status === IntentOrderStatus.processing && (
          <Processing closeModal={closeModal} />
        )}
        {status === IntentOrderStatus.failed && (
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
`;

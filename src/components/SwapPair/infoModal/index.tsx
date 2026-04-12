import React from 'react';
import styled from 'styled-components';

import { Modal } from 'src/UI';

import SwapPairInfo from 'src/commonComponents/pairInfo/swapPairInfo';
import { useIntl } from 'src/locals';
import { ThemeType } from 'src/theme';

import Close from 'js/components/Icons/close';
import { useModals } from 'js/state/application/hooks';
import { ModalKeys } from 'js/state/application/reducer';

export default function SwapPairInfoModal() {
  const { pair, visible, hide } = useModals(ModalKeys.swapPairCode);
  const { baseToken } = pair || {};
  const intl = useIntl();

  return (
    <Modal title={null} onClose={hide} opened={visible}>
      <StyledPairInfoModal>
        <div className="modal-title">
          {intl['trade.token_info']}
          <Close onClick={hide} />
        </div>
        <SwapPairInfo baseToken={baseToken} />
      </StyledPairInfoModal>
    </Modal>
  );
}

const StyledPairInfoModal = styled.div`
  width: 100%;
  padding: 0 10px 30px;
  ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
  .modal-title {
    margin-bottom: 10px;
  }
`;

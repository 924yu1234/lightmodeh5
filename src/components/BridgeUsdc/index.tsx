import React from 'react';
import styled from 'styled-components';

import { useIntl } from 'src/locals';
import { useModals } from 'src/state/application/hooks';
import { ModalKeys } from 'src/state/application/reducer';
import { ThemeType } from 'src/theme';

import Close from '../Icons/close';
import FullModal from '../Modals/fullModal';
import BridgeUsdcProvider from './dataProvider';
import BridgeUsdcInner from './inner';

export default function BridgeUsdcModal() {
  const { visible, hide, fromToken, fromTokenId } = useModals(
    ModalKeys.bridgeUsdc
  );
  const intl = useIntl();

  return (
    <FullModal opened={visible} onClose={hide} className="bg13">
      <BridgeUsdcProvider fromToken={fromToken} fromTokenId={fromTokenId}>
        <StyledAssetModal className="modal-wrapper">
          <div className="modal-title">
            {intl.Bridge}
            <Close onClick={hide} />
          </div>
          <BridgeUsdcInner />
        </StyledAssetModal>
      </BridgeUsdcProvider>
    </FullModal>
  );
}

const StyledAssetModal = styled.div`
  .modal-title {
    display: flex;
    align-items: center;
    justify-content: center;
    .token-symbol {
      .token-symbol-inner {
        color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
      }
    }
  }
  .modal-content {
    display: flex;
    flex-direction: column;
    max-height: ${({ theme }: { theme: ThemeType }) => {
      return theme.windowHeight - 52;
    }}px;
  }
`;

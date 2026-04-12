import React from 'react';
import styled from 'styled-components';

import { useIntl } from 'src/locals';
import { ThemeType } from 'src/theme';

import Close from 'js/components/Icons/close';
import {
  useGasPaymentCandidatesWithTokenInfo,
  useModals,
} from 'js/state/application/hooks';
import { ModalKeys } from 'js/state/application/reducer';

import BottomModal from '../Modals/bottomModal';
import TokenItem from './tokenItem';

export default function ChooseGasTokenModal() {
  const intl = useIntl();
  const { visible, hide, payGasToken, onSelectPayGasToken } = useModals(
    ModalKeys.chooseGasToken
  );
  const hideModal = () => {
    hide();
  };
  const gasTokens = useGasPaymentCandidatesWithTokenInfo();

  return (
    <BottomModal onClose={hideModal} opened={visible} zIndex={201}>
      <StyledModal className="modal-wrapper">
        <div className="modal-title">
          {intl.change_fee_token}
          <Close onClick={hideModal} />
        </div>
        <div className="modal-content" style={{ padding: '0 0 30px 0' }}>
          {gasTokens.map((item: any) => {
            return (
              <TokenItem
                className={`${item.id === payGasToken?.id ? 'selected' : ''}`}
                key={item.id}
                token={item}
                onClick={() => {
                  if (item.id === payGasToken?.id) return;
                  onSelectPayGasToken(item);
                  hideModal();
                }}
              />
            );
          })}
        </div>
      </StyledModal>
    </BottomModal>
  );
}

const StyledModal = styled.div`
  width: 100%;

  .modal-content {
    max-height: ${({ theme }: { theme: ThemeType }) =>
      theme.windowHeight - theme.modalTop * 2 - 100}px;
    overflow: auto;
    height: 100%;
  }
`;

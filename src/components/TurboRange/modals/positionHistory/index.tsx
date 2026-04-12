import React from 'react';

import { Modal, PrimaryBtn } from 'src/UI';

import IconBack from 'src/components/Icons/back';
import IconWrapper from 'src/components/Icons/IconWrapper';
import { useIntl } from 'src/locals';
import { TurboRangePosition } from 'src/state/turboRange/reducer';

import Close from 'js/components/Icons/close';
import { useModals } from 'js/state/application/hooks';
import { ModalKeys } from 'js/state/application/reducer';

import PositionHistoryList from './HistoryList';
import { HistoryPanelTitle, HistoryPanelWrap, StyledModal } from './styles';

export function PositionHistoryPanel({
  position,
  visible,
  toggleHistory,
}: {
  position: TurboRangePosition;
  visible: boolean;
  toggleHistory: () => void;
}) {
  const intl = useIntl();
  return (
    <HistoryPanelWrap className={visible ? 'show' : ''}>
      <HistoryPanelTitle>
        <IconWrapper showHoverBG size={32} onClick={toggleHistory}>
          <IconBack />
        </IconWrapper>
        {intl.turboRange.position_history}
      </HistoryPanelTitle>
      <PositionHistoryList position={position} />
    </HistoryPanelWrap>
  );
}

export { usePositionHistoryData } from './data';

export default function TurboRangePositionHistoryModal() {
  const { visible, hide, position } = useModals(
    ModalKeys.turboRangePositionHistory
  );
  const intl = useIntl();

  return (
    <Modal onClose={hide} opened={visible}>
      <StyledModal className="modal-wrap">
        <div className="modal-title">
          <IconBack />
          {intl.turboRange.position_history}
          <Close onClick={hide} />
        </div>
        <div className="modal-content">
          <PositionHistoryList position={position} />
          <div className="modal-footer">
            <PrimaryBtn onClick={hide}>{intl.Close}</PrimaryBtn>
          </div>
        </div>
      </StyledModal>
    </Modal>
  );
}

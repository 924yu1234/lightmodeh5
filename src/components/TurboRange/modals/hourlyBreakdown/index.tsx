import React from 'react';
import styled from 'styled-components';

import IconBack from 'src/components/Icons/back';
import BottomModal from 'src/components/Modals/bottomModal';
import { useIntl } from 'src/locals';
import { ThemeType } from 'src/theme';

import { useModals } from 'js/state/application/hooks';
import { ModalKeys } from 'js/state/application/reducer';

import HourlyBreakdownContent from '../positionDetail/views/hourlyBreakdownContent';

export default function HourlyBreakdownModal() {
  const { visible, hide, position } = useModals(
    ModalKeys.turboRangeHourlyBreakdown
  );
  const intl = useIntl();

  if (!position) return null;

  return (
    <StyledBottomModal opened={visible} onClose={hide} noHeader>
      <StyledModal>
        <div className="modal-header">
          <div className="back-btn" onClick={hide}>
            <IconBack />
          </div>
          <div className="modal-title">{intl.turboRange.hourly_breakdown}</div>
        </div>
        <div className="modal-content">
          <HourlyBreakdownContent position={position} />
        </div>
      </StyledModal>
    </StyledBottomModal>
  );
}

const StyledBottomModal = styled(BottomModal)``;

const StyledModal = styled.div`
  .modal-header {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 15px;
    .back-btn {
      cursor: pointer;
      display: flex;
      align-items: center;
    }
    .modal-title {
      font-size: 16px;
      ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
      color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
    }
  }
  .modal-content {
    max-height: 70vh;
    overflow-y: auto;
  }
`;

/**
 * Auto-Lock notification modal.
 * Migrated from dg-wallet/src/modals/AutoLockedTips.tsx (simplified).
 */
import React from 'react';
import styled from 'styled-components';

import { Modal, PrimaryBtn } from 'src/UI';

import { useIntl } from 'src/locals';
import { useModals } from 'src/state/application/hooks';
import ModalKeys from 'src/state/application/modalKeys';
import { ThemeType } from 'src/theme';

export default function AutoLockedTips() {
  const { visible, hide } = useModals(ModalKeys.WALLET_AUTO_LOCKED) as any;
  const intl = useIntl();

  if (!visible) return null;

  return (
    <Modal opened={visible} onClose={hide} centered withCloseButton={false}>
      <StyledContent>
        <div className="lock-icon">🔒</div>
        <div className="title">
          {(intl as any).wallet_auto_locked || 'Session Locked'}
        </div>
        <div className="desc">
          {(intl as any).wallet_auto_locked_desc ||
            'Your session has been locked due to inactivity.'}
        </div>
        <PrimaryBtn fullWidth onClick={hide}>
          {intl.confirm || 'OK'}
        </PrimaryBtn>
      </StyledContent>
    </Modal>
  );
}

const StyledContent = styled.div`
  padding: 24px;
  text-align: center;
  .lock-icon {
    font-size: 48px;
    margin-bottom: 16px;
  }
  .title {
    font-size: 18px;
    ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
    margin-bottom: 8px;
  }
  .desc {
    font-size: 14px;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_80};
    margin-bottom: 24px;
  }
`;

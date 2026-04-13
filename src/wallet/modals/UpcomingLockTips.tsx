/**
 * Upcoming lock warning modal.
 * Migrated from dg-wallet/src/modals/UpcomingLockTips.tsx (simplified).
 */
import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

import { GhostBtn, Modal, PrimaryBtn } from 'src/UI';

import { useIntl } from 'src/locals';
import { useModals, useShowModal } from 'src/state/application/hooks';
import ModalKeys from 'src/state/application/modalKeys';
import { ThemeType } from 'src/theme';

export default function UpcomingLockTips() {
  const { visible, hide } = useModals(ModalKeys.WALLET_UPCOMING_LOCK) as any;
  const showModal = useShowModal();
  const intl = useIntl();
  const [secondsLeft, setSecondsLeft] = useState(60);

  useEffect(() => {
    if (!visible) {
      setSecondsLeft(60);
      return undefined;
    }
    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          hide();
          showModal({ modal: ModalKeys.WALLET_AUTO_LOCKED });
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [visible, hide, showModal]);

  const handleKeep = useCallback(() => {
    hide();
  }, [hide]);

  const handleLockNow = useCallback(() => {
    hide();
    showModal({ modal: ModalKeys.WALLET_AUTO_LOCKED });
  }, [hide, showModal]);

  if (!visible) return null;

  return (
    <Modal
      opened={visible}
      onClose={() => {}}
      centered
      closeOnClickOutside={false}
      closeOnEscape={false}
      withCloseButton={false}
    >
      <StyledContent>
        <div className="title">
          {(intl as any).wallet_upcoming_lock || 'Session Expiring'}
        </div>
        <div className="timer">{secondsLeft}s</div>
        <div className="desc">
          {(intl as any).wallet_upcoming_lock_desc ||
            'Your session will be locked due to inactivity.'}
        </div>
        <div className="actions">
          <GhostBtn onClick={handleLockNow}>
            {(intl as any).wallet_lock_now || 'Lock Now'}
          </GhostBtn>
          <PrimaryBtn onClick={handleKeep}>
            {(intl as any).wallet_keep_unlocked || 'Keep Unlocked'}
          </PrimaryBtn>
        </div>
      </StyledContent>
    </Modal>
  );
}

const StyledContent = styled.div`
  padding: 24px;
  text-align: center;
  .title {
    font-size: 18px;
    ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
    margin-bottom: 16px;
  }
  .timer {
    font-size: 36px;
    ${({ theme }: { theme: ThemeType }) => theme.fontBold};
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
    margin-bottom: 8px;
  }
  .desc {
    font-size: 14px;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_80};
    margin-bottom: 24px;
  }
  .actions {
    display: flex;
    gap: 12px;
    button {
      flex: 1;
    }
  }
`;

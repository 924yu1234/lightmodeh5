/**
 * Auto-lock hook (simplified from dg-wallet).
 * Tracks user activity and shows warning before locking.
 * Lock timeout: 15 minutes of inactivity.
 */
import { useCallback, useEffect, useRef } from 'react';

import { useShowModal } from 'src/state/application/hooks';
import ModalKeys from 'src/state/application/modalKeys';
import { walletSnapshot } from 'src/wallet/config';

const LOCK_TIMEOUT = 15 * 60 * 1000; // 15 minutes
const WARNING_BEFORE = 60 * 1000; // show warning 60s before lock

export default function useAutoLock() {
  const showModal = useShowModal();
  const nextLockTimeRef = useRef(Date.now() + LOCK_TIMEOUT);
  const warningShownRef = useRef(false);

  const resetTimer = useCallback(() => {
    if (!walletSnapshot.hasUnlocked || !walletSnapshot.allowQuickTrading) {
      return;
    }
    nextLockTimeRef.current = Date.now() + LOCK_TIMEOUT;
    warningShownRef.current = false;
  }, []);

  useEffect(() => {
    if (!walletSnapshot.hasUnlocked || !walletSnapshot.allowQuickTrading) {
      return undefined;
    }

    const checkTimer = setInterval(() => {
      const remaining = nextLockTimeRef.current - Date.now();
      if (remaining <= 0 && !warningShownRef.current) {
        // Lock expired — show locked tips
        warningShownRef.current = true;
        showModal({ modal: ModalKeys.WALLET_AUTO_LOCKED });
      } else if (
        remaining <= WARNING_BEFORE &&
        remaining > 0 &&
        !warningShownRef.current
      ) {
        // Show upcoming lock warning
        warningShownRef.current = true;
        showModal({ modal: ModalKeys.WALLET_UPCOMING_LOCK });
      }
    }, 5000);

    // Reset on user activity
    const events = ['mousemove', 'keydown', 'touchstart', 'click'];
    events.forEach((e) => document.addEventListener(e, resetTimer, true));

    return () => {
      clearInterval(checkTimer);
      events.forEach((e) => document.removeEventListener(e, resetTimer, true));
    };
  }, [resetTimer, showModal]);
}

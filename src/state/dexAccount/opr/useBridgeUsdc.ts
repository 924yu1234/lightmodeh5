import { useCallback } from 'react';

import { Token } from 'src/constants/interface';
import useCustomNavigate from 'src/hooks/useCustomNavigate';
import { useShowModal } from 'src/state/application/hooks';
import { ModalKeys } from 'src/state/application/reducer';
import { useThemeParams } from 'src/theme';

export default function useBridgeUsdc() {
  const showModal = useShowModal();
  const { isMobile } = useThemeParams();
  const navigate = useCustomNavigate();

  return useCallback(
    ({ fromToken }: { fromToken?: Token }) => {
      if (isMobile) {
        navigate(`/bridge-usdc?from=${fromToken?.id || ''}`);
      } else {
        showModal({
          modal: ModalKeys.bridgeUsdc,
          fromToken,
        });
      }
    },
    [showModal, navigate, isMobile]
  );
}

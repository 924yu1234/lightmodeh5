import { useCallback } from 'react';

import { Token } from 'src/constants/interface';
import useCheckRegion from 'src/state/regionCheck/hooks';
import { useThemeParams } from 'src/theme';

import { useShowModal } from 'js/state/application/hooks';
import { ModalKeys } from 'js/state/application/reducer';

export default function useSend() {
  const showModal = useShowModal();
  const checkRegion = useCheckRegion();
  const { isMobile } = useThemeParams();

  return useCallback(
    async ({ token }: { token: Token | undefined }) => {
      if (!checkRegion()) return;
      if (isMobile) {
        showModal({
          modal: ModalKeys.sendV2,
          token,
        });
      } else {
        showModal({
          modal: ModalKeys.send,
          token,
        });
      }
    },
    [isMobile, showModal, checkRegion]
  );
}

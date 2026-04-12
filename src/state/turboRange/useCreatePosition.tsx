import { useCallback } from 'react';

import useCustomNavigate from 'src/hooks/useCustomNavigate';
import { useThemeParams } from 'src/theme';

import { useShowModal } from '../application/hooks';
import ModalKeys from '../application/modalKeys';

export function useCreatePosition() {
  const showModal = useShowModal();
  const { isMobile } = useThemeParams();
  const navigate = useCustomNavigate();
  return useCallback(
    ({
      poolAddress,
      minPrice,
      maxPrice,
      source = 'create',
    }: {
      poolAddress: string;
      minPrice?: string;
      maxPrice?: string;
      source?: 'reopen' | 'create' | 'product' | 'strategy';
    }) => {
      if (isMobile) {
        navigate(
          `/turbo-range/invest/${poolAddress}?minPrice=${minPrice}&maxPrice=${maxPrice}`
        );
        return;
      }
      showModal({
        modal: ModalKeys.turboRangeCreatePosition,
        poolAddress,
        minPrice,
        maxPrice,
        source,
      });
    },
    [showModal, isMobile, navigate]
  );
}

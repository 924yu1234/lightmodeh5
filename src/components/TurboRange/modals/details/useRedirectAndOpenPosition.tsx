import { useCallback } from 'react';

import useCustomNavigate from 'src/hooks/useCustomNavigate';
import {
  useTurboRangePositionByIntentId,
  useTurboRangePositionByPositionAddress,
} from 'src/state/turboRange/hooks';
import { useThemeParams } from 'src/theme';

export default function useRedirectAndOpenPosition({ order }: { order: any }) {
  const navigate = useCustomNavigate();
  const { isMobile } = useThemeParams();
  const position = useTurboRangePositionByIntentId(order?.intent_id);
  const position2 = useTurboRangePositionByPositionAddress(order?.position);
  return useCallback(() => {
    let url = '/turbo-range';
    if (isMobile) {
      url = '/turbo-range/positions';
    }
    if (position || position2) {
      const _position = position || position2;
      // showModal({
      //   modal: ModalKeys.turboRangeDetail,
      //   position,
      // });
      url += `?position=${_position?.positionAddress}&tab=${
        _position?.status === 'OPEN' ? 'active' : 'closed'
      }`;
    }
    navigate(url);
  }, [navigate, isMobile, position, position2]);
}

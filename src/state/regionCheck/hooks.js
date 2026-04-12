import { useCallback } from 'react';

import { useSetLocale } from 'src/locals';

import { useRegionInfo, useShowModal } from '../application/hooks';
import { ModalKeys } from '../application/reducer';
import { useDexAccount } from '../dexAccount/hooks';

export function useShowRegionTips() {
  const showModal = useShowModal();
  return useCallback(() => {
    showModal({ modal: ModalKeys.tips_region });
  }, [showModal]);
}

export function useRegionIntl() {
  const { regionCode, regionIntl } = useRegionInfo();
  const { locale } = useSetLocale();
  const region = regionIntl?.[regionCode]?.[locale] || regionCode;
  return region;
}

export default function useCheckRegion({ noModal = false } = {}) {
  const showTips = useShowRegionTips();
  const { isRegionDisabled } = useRegionInfo();
  const { isInWhitelist } = useDexAccount();
  // app h5 中不显示弹窗
  const checkRegion = useCallback(() => {
    if (isInWhitelist) {
      return true;
    }
    if (isRegionDisabled) {
      if (!noModal) showTips();
      return false;
    }
    return true;
  }, [isRegionDisabled, showTips, noModal, isInWhitelist]);
  return checkRegion;
}

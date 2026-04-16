import React from 'react';

import { useModals } from 'src/state/application/hooks';
import ModalKeys from 'src/state/application/modalKeys';
import { useThemeParams } from 'src/theme';

import ViewAddressMobileModal from './mobile';
import ViewAddressPCModal from './pc';

export default function ViewAddressModal() {
  const { isMobile } = useThemeParams();
  const { visible } = useModals(ModalKeys.WALLET_VIEW_ADDRESS) as any;

  if (!visible) return null;

  return isMobile ? <ViewAddressMobileModal /> : <ViewAddressPCModal />;
}

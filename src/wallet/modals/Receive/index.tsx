import React from 'react';

import { useModals } from 'src/state/application/hooks';
import ModalKeys from 'src/state/application/modalKeys';
import { useThemeParams } from 'src/theme';

import MobileReceiveModal from './mobile';
import PCReceiveModal from './pc';

export default function ReceiveModal() {
  const { isMobile } = useThemeParams();
  const { visible } = useModals(ModalKeys.WALLET_RECEIVE) as any;

  if (!visible) return null;

  return isMobile ? <MobileReceiveModal /> : <PCReceiveModal />;
}

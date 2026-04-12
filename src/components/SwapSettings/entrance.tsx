import React from 'react';

import { useShowModal } from 'src/state/application/hooks';
import { ModalKeys } from 'src/state/application/reducer';

import IconAdvancedSetting from 'js/components/Icons/advancedSetting';

export default function SwapSettingsEntrance() {
  const showModal = useShowModal();

  return (
    <div
      className="advanded-config"
      onClick={() => {
        showModal({ modal: ModalKeys.swapSettings });
      }}
    >
      <IconAdvancedSetting size={18} />
    </div>
  );
}

import React, { useCallback } from 'react';

import IconWrapper from 'src/components/Icons/IconWrapper';
import IconMTopInfo from 'src/components/Icons/mTopInfo';
import { SwapPair } from 'src/constants/interface/swap';

import { useShowModal } from 'js/state/application/hooks';
import { ModalKeys } from 'js/state/application/reducer';

export default function SwapPairInfo({
  pair,
  size = 22,
  outSize = 22,
}: {
  pair: SwapPair;
  size?: number;
  outSize?: number;
}) {
  const showModal = useShowModal();
  const showInfoModal = useCallback(() => {
    showModal({ modal: ModalKeys.swapPairCode, pair });
  }, [showModal, pair]);
  return (
    <IconWrapper
      size={outSize || size}
      onClick={showInfoModal}
      className="icon-info-wrapper"
    >
      <IconMTopInfo className="icon-info" size={size} />
    </IconWrapper>
  );
}

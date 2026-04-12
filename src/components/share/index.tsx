import React from 'react';

import { useShowModal } from 'src/state/application/hooks';
import { ModalKeys } from 'src/state/application/reducer';

import IconWrapper from '../Icons/IconWrapper';
import IconShare from '../Icons/share';

export default function Share({
  url,
  outSize,
  size,
}: {
  url: string;
  outSize?: number;
  size?: number;
}) {
  const showModal = useShowModal();
  return (
    <IconWrapper
      className="share-icon"
      showHoverBG
      size={outSize || 30}
      onClick={() => {
        showModal({
          modal: ModalKeys.share,
          url,
        });
      }}
    >
      <IconShare size={size || 20} />
    </IconWrapper>
  );
}

import React from 'react';

import { useModals } from 'src/state/application/hooks';
import { ModalKeys } from 'src/state/application/reducer';

import FullModal from '../Modals/fullModal';
import SendV2Inner from './inner';
import SendDataProvider from './sendDataProvider';

export default function SendV2() {
  const { visible, hide, token } = useModals(ModalKeys.sendV2);

  return (
    <FullModal onClose={hide} opened={visible}>
      <SendDataProvider token={token}>
        <SendV2Inner />
      </SendDataProvider>
    </FullModal>
  );
}

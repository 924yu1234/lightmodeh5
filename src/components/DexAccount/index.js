import React from 'react';

import InitializeModal from 'js/components/DexAccount/initializeModal';
import LeaveSurveyModal from 'js/components/DexAccount/leaveSurveyModal';
import UnlockModal from 'js/components/DexAccount/unlockModal';
import Feedback from 'js/components/Feedback';
import FeedbackSuccessModal from 'js/components/Feedback/feedbackSuccessModal';
import { useModals } from 'js/state/application/hooks';
import { ModalKeys } from 'js/state/application/reducer';

import PrivyInitializeModal from './privyInitializeModal';

export default function DexAccount() {
  const modals = useModals();

  return (
    <>
      {modals[ModalKeys.feedback]?.visible && <Feedback />}
      {modals[ModalKeys.feedbackSuccessTip]?.visible && (
        <FeedbackSuccessModal />
      )}
      {modals[ModalKeys.register]?.visible && <InitializeModal />}
      {modals[ModalKeys.privy_initialize]?.visible && <PrivyInitializeModal />}
      {modals[ModalKeys.unlock]?.visible && <UnlockModal />}
      {modals[ModalKeys.leaveSurvey]?.visible && <LeaveSurveyModal />}
    </>
  );
}

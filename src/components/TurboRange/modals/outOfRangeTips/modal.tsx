import React, { useState } from 'react';
import styled from 'styled-components';

import { Modal } from 'src/UI';

import Close from 'src/components/Icons/close';
import { useModals } from 'src/state/application/hooks';
import ModalKeys from 'src/state/application/modalKeys';

import Step1 from './step1';
import Step2 from './step2';
import Step3 from './step3';
import StepIndex from './stepIndex';

export default function OutOfRangeTipsModal() {
  const { visible, hide } = useModals(ModalKeys.turboRangeOutOfRangeTips);
  const [step, setStep] = useState<'index' | 'step1' | 'step2' | 'step3'>(
    'index'
  );
  return (
    <Modal title={null} opened={visible} onClose={hide} zIndex={1000}>
      <StyledOutOfRangeTipsModal className="modal-wrapper">
        <div className="modal-title">
          <Close onClick={hide} />
        </div>
        {step === 'index' && <StepIndex setStep={setStep} />}
        {step === 'step1' && <Step1 setStep={setStep} />}
        {step === 'step2' && <Step2 setStep={setStep} />}
        {step === 'step3' && <Step3 setStep={setStep} />}
      </StyledOutOfRangeTipsModal>
    </Modal>
  );
}

const StyledOutOfRangeTipsModal = styled.div`
  padding: 0 20px 30px;
  .modal-title {
    margin-bottom: 10px;
  }
`;

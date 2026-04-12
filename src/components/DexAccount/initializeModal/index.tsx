import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';

import { Modal } from 'src/UI';

import { EventType } from 'src/hooks/useEventTrack/service';
import {
  useLogInitializeStart,
  useLogInitializeStep,
} from 'src/hooks/useEventTrack/utils/useLogInitialize';
import useWindowSize from 'src/hooks/useWindowSize';
import { ThemeType, useThemeParams } from 'src/theme';

import { useModals } from 'js/state/application/hooks';
import { ModalKeys } from 'js/state/application/reducer';

import Step1Welcome from './step1_welcome';
import Step2AccountError from './step2_accountError';
import Step3Sign from './step3_sign';
import Step4Success from './step4_success';
import WalletIncompatibleTips from './walletIncompatibleTips';

export type Steps =
  | 'step1_welcome'
  | 'step2_accountError'
  | 'step3_sign'
  | 'step4_success'
  | 'step3_walletIncompatible';

export default function RegisterModal() {
  const { visible, hide, source, isFull } = useModals(ModalKeys.register);
  const [step, setStep] = useState<Steps>('step1_welcome');
  const { width, height } = useWindowSize();
  const { isMobile } = useThemeParams();
  const logInitializeStart = useLogInitializeStart();
  const logInitializeStep = useLogInitializeStep({ isFull: false });
  const [referralCode, setReferralCode] = useState('');
  useEffect(() => {
    logInitializeStart(isFull, source);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // mantine使用rem作为单位，这里不能再使用rem自动缩放，会影响mantine样式，改为手动缩放
  const ratio = useMemo(() => {
    if (width < 1024) return 1;
    if (width < 1280) return 1;
    if (width < 1440) return 1 + ((width - 1024) / (1440 - 1024)) * 0.14;
    if (width < 1600) return 1 + ((width - 1024) / (1600 - 1024)) * 0.21;
    if (width < 1920) return 1 + ((width - 1024) / (1920 - 1024)) * 0.42;
    if (width < 2560) return 1 + ((width - 1024) / (2560 - 1024)) * 0.86;
    return 2;
  }, [width]);

  const top = useMemo(() => {
    if (!isMobile) return height * 0.2;
    const top = (height - 600) / 2;
    if (top < 50) return 50;
    return 100;
  }, [height, isMobile]);

  const hideModal = useCallback(() => {
    hide();
    logInitializeStep(EventType.initialization_action, {
      action: 'exit',
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hide]);

  return (
    <StyledModal
      title={null}
      onClose={hide}
      opened={visible}
      ratio={ratio}
      top={top}
    >
      {step === 'step1_welcome' && (
        <Step1Welcome
          referralCode={referralCode}
          setReferralCode={setReferralCode}
          goToStep={setStep}
          ratio={ratio}
          hideModal={hideModal}
        />
      )}
      {step === 'step2_accountError' && (
        <Step2AccountError ratio={ratio} hideModal={hideModal} />
      )}
      {step === 'step3_sign' && (
        <Step3Sign
          referralCode={referralCode}
          goToStep={setStep}
          ratio={ratio}
          hideModal={hideModal}
        />
      )}
      {step === 'step3_walletIncompatible' && (
        <WalletIncompatibleTips ratio={ratio} />
      )}
      {step === 'step4_success' && <Step4Success ratio={ratio} />}
    </StyledModal>
  );
}

const StyledModal = styled(Modal)<{ ratio: number; top: number }>`
  &.mantine-Modal-root {
    .mantine-Modal-inner {
      padding-top: ${({ top }: { top: number }) => {
        return top;
      }}px;
      .mantine-Modal-content {
        min-width: ${({ theme }: { theme: ThemeType }) => {
          return theme.isMobile ? `${theme.windowWidth - 32}px` : '420px';
        }};
        max-width: ${({ theme }: { theme: ThemeType }) =>
          theme.windowWidth * 0.33}px;
        flex: auto;
        border: 1px solid ${({ theme }: { theme: ThemeType }) => theme.blue};
        box-shadow: 0px 0px 4px 5px rgba(0, 160, 255, 0.24);
        .mantine-Modal-body {
          padding: ${({ ratio, theme }: { ratio: number; theme: ThemeType }) =>
            `${ratio * 22}px ${theme.isMobile ? '30px' : '40px'} ${
              ratio * 30
            }px`};
        }
      }
    }
  }
  .dg-primary.mantine-Button-root,
  .dg-ghost.mantine-Button-root,
  .step-btn {
    width: 100%;
    height: ${({ ratio }) => `${ratio * 40}px`};
    min-height: ${({ ratio }) => `${ratio * 40}px`};
    border-radius: ${({ ratio }) => `${ratio * 6}px`};
    font-size: ${({ ratio }) => `${ratio * 14}px`};
    line-height: ${({ ratio }) => `${ratio * 40}px`};
  }
`;

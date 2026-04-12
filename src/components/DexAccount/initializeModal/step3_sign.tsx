/* eslint-disable react/no-danger */
import React, { useCallback, useEffect, useState } from 'react';
import queryString from 'query-string';
import styled from 'styled-components';

import { PrimaryBtn } from 'src/UI';

import { ExplanationsType } from 'src/components/Explanations';
import IconStatusSuccess from 'src/components/Icons/StatusSuccess';
import LoaderWithNumber from 'src/components/LoaderWithNumber';
import StepperWithNumber from 'src/components/StepperWithNumber';
import { DexAccount } from 'src/constants/interface';
import useCustomNavigate from 'src/hooks/useCustomNavigate';
import { EventType } from 'src/hooks/useEventTrack/service';
import { useLogInitializeStep } from 'src/hooks/useEventTrack/utils/useLogInitialize';
import { useSyncDA } from 'src/state/dexAccount/services/service_da';
import { ThemeType } from 'src/theme';

import Close from 'js/components/Icons/close';
import { ACCOUNT_EXIST } from 'js/constants/apiErr';
import useCreateWalletErrorTips from 'js/hooks/useCreateWalletErrorTips';
import { useIntl } from 'js/locals';
import {
  NetworkErr,
  useWalletOprs,
  useWalletWeb3,
} from 'js/providers/useWallet';
import {
  useInfo,
  useModals,
  useShowExplantion,
  useShowModal,
} from 'js/state/application/hooks';
import { ModalKeys } from 'js/state/application/reducer';
import { useDexAccount, useUpdateDexAccount } from 'js/state/dexAccount/hooks';
import useUnlock from 'js/state/dexAccount/opr/useUnlock';
import { AccountStatus } from 'js/state/dexAccount/reducer';
import { logDexRegister } from 'js/utils/log/dexAccount';
import message from 'js/utils/message';

import { Steps } from '.';

export default function Step3Sign({
  ratio,
  goToStep,
  hideModal,
  referralCode,
}: {
  ratio: number;
  goToStep: (step: Steps) => void;
  hideModal: any;
  referralCode: string;
}) {
  const { order } = useModals(ModalKeys.register);
  const { hide } = useModals(ModalKeys.register);
  const dexAccount = useDexAccount();
  const { selectedWallet } = useWalletWeb3();
  const { account } = useWalletWeb3();
  const { windowRefresh, checkConnection } = useWalletOprs();
  const logInitializeStep = useLogInitializeStep({ isFull: !!order });

  const uploadKeyNonce = dexAccount.keyNonce ?? 1;
  const [step, setStep] = useState<
    'signStep1' | 'signStep2' | 'signStep3' | 'init'
  >('init');
  const [step2Data, setStep2Data] = useState<any>(null);
  const updateDexAccount = useUpdateDexAccount();
  const info = useInfo();
  const intl = useIntl();
  const createErrorTips = useCreateWalletErrorTips();
  const showModal = useShowModal();
  const navigate = useCustomNavigate();

  const unlock = useUnlock();
  const syncDa = useSyncDA();
  const { gift = '', ...rest } = queryString.parse(location.search) ?? {};

  const toNext = useCallback(
    (dexAccount: DexAccount) => {
      // 去掉location.search上的gift

      syncDa({
        DAs: dexAccount.DAs,
        keyNonce: dexAccount.keyNonce,
        referralCode,
        giftCode: (gift || window.gift_code) as string,
      })
        .then((resp) => {
          setStep('init');
          logDexRegister({
            method: 'success',
            wallet: selectedWallet,
            account,
          });
          logInitializeStep(EventType.initialization_completed);
          const newData = {
            ...dexAccount,
            state: AccountStatus.REGISTERING,
          };
          updateDexAccount({
            dexAccount: newData,
          });
          if (resp.gifted) {
            const search = queryString.stringify({
              ...rest,
            });
            hide();
            // 更新URL，去掉gift参数
            navigate(
              {
                pathname: window.location.pathname,
                search: search ? `?${search}` : '',
              },
              { replace: true }
            );
            showModal({
              modal: ModalKeys.raffleFlashOPFreeEntries,
            });
          } else {
            goToStep('step4_success');
          }
        })
        .catch((err) => {
          logInitializeStep(EventType.initialization_action, {
            action: '2nd_signature_canceled',
          });
          if (err?.code === ACCOUNT_EXIST) {
            message.error(intl.common_err);
            setTimeout(() => {
              windowRefresh();
            }, 300);
            return;
          }

          if (err?.code === NetworkErr) {
            setStep('init');
            return;
          }
          logDexRegister({
            wallet: selectedWallet,
            method: 'error',
            account,
            error: { code: err.code, message: err.message },
          });
          setStep('init');
          message.error(createErrorTips(err) || intl.common_err);
        });
    },
    [
      account,
      selectedWallet,
      updateDexAccount,
      goToStep,
      logInitializeStep,
      intl,
      createErrorTips,
      windowRefresh,
      syncDa,
      referralCode,
      gift,
      navigate,
      rest,
      showModal,
      hide,
    ]
  );

  const signStep2 = useCallback(
    async ({ publicKeyX }: { publicKeyX: string }) => {
      unlock(uploadKeyNonce, 'register')
        .then((resp) => {
          if (resp.publicKeyX === publicKeyX) {
            toNext(resp as DexAccount);
          } else {
            setStep('init');
            goToStep('step3_walletIncompatible');
          }
        })
        .catch((err) => {
          if (err?.message && err?.message?.includes('MPC')) {
            setStep('init');
            goToStep('step3_walletIncompatible');
            return;
          }
          logInitializeStep(EventType.initialization_action, {
            action: '1st_signature_canceled',
          });
          setStep('init');
          const tips = createErrorTips(err);
          if (tips) {
            message.error(tips);
          }
        });
    },
    [
      goToStep,
      toNext,
      setStep,
      logInitializeStep,
      unlock,
      uploadKeyNonce,
      createErrorTips,
    ]
  );

  // step1
  const signStep1 = useCallback(async () => {
    const { valid } = await checkConnection();
    if (!valid) return;
    if (!info?.exchangeAddress) return;
    logDexRegister({
      method: 'pending createKey',
      wallet: selectedWallet,
      account,
    });
    setStep('signStep1');

    unlock(uploadKeyNonce, 'register')
      .then((resp) => {
        setStep('signStep2');
        setTimeout(() => {
          setStep2Data(resp);
        }, 200);

        logInitializeStep(EventType.initialization_action, {
          action: '1st_signature_received',
        });
      })
      .catch((err) => {
        logInitializeStep(EventType.initialization_action, {
          action: '1st_signature_canceled',
        });
        setStep('init');
        const tips = createErrorTips(err);
        if (tips) {
          message.error(tips);
        }
      });
  }, [
    checkConnection,
    info,
    selectedWallet,
    account,
    setStep,
    setStep2Data,
    logInitializeStep,
    unlock,
    uploadKeyNonce,
    createErrorTips,
  ]);

  useEffect(() => {
    if (step === 'signStep2' && step2Data) {
      signStep2(step2Data);
      setStep2Data(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step2Data, step]);

  const showExplanation = useShowExplantion(ExplanationsType.AboutSignature);

  return (
    <>
      <StyledSign ratio={ratio}>
        <div className="modal-title">
          <Close onClick={hideModal} />
        </div>
        <div className="title">{intl.create_account}</div>
        <div
          className="desc"
          dangerouslySetInnerHTML={{ __html: intl.initialization_desc }}
        />

        <div className="steps">
          <div className="step step1">
            {step === 'init' && (
              <StepperWithNumber size={36 * ratio} active>
                1
              </StepperWithNumber>
            )}
            {step === 'signStep1' && (
              <LoaderWithNumber size={36 * ratio}>1</LoaderWithNumber>
            )}
            {step === 'signStep2' && <IconStatusSuccess size={36 * ratio} />}
            <div className="step-label">{intl.verify_ownership}</div>
          </div>
          <div className="step step3">
            {(step === 'signStep1' || step === 'init') && (
              <StepperWithNumber size={36 * ratio}>2</StepperWithNumber>
            )}
            {step === 'signStep2' && (
              <LoaderWithNumber size={36 * ratio}>2</LoaderWithNumber>
            )}
            <div className="step-label">{intl.check_wallet_compatibility}</div>
          </div>
        </div>
        {step === 'init' && (
          <PrimaryBtn eventName="btn_initialize_step3_sign" onClick={signStep1}>
            {intl.sign}
          </PrimaryBtn>
        )}
        {step !== 'init' && (
          <div className="step-btn">
            {step === 'signStep1' && intl.sign_step1}
            {step === 'signStep2' && intl.sign_step2}
          </div>
        )}
        <div className="learn-more" onClick={showExplanation}>
          {intl.learn_more_about_signatures_link}
        </div>
      </StyledSign>
    </>
  );
}

const StyledSign = styled.div<{ ratio: number }>`
  width: 100%;
  ${({ theme }: { theme: ThemeType }) => theme.fontRegular};

  .title {
    ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
    font-size: ${({ ratio }) => `${ratio * 24}px`};
    color: ${({ theme }: { theme: ThemeType }) => theme.blue};
    height: ${({ ratio }) => `${ratio * 51}px`};
    line-height: ${({ ratio }) => `${ratio * 51}px`};
  }

  .desc {
    ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
    font-size: ${({ ratio }) => `${ratio * 14}px`};
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
    line-height: 1.375;
    margin-bottom: ${({ ratio }) => `${ratio * 30}px`};
  }

  .step {
    display: flex;
    align-items: center;
    margin-bottom: ${({ ratio }) => `${ratio * 20}px`};
    height: ${({ ratio }) => `${ratio * 36}px`};

    .step-label {
      ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
      font-size: ${({ ratio }) => `${ratio * 14}px`};
      color: ${({ theme }) => theme.t_fff};
      letter-spacing: 0;
      line-height: 1.375;
      margin-right: auto;
      display: flex;
      align-items: center;
      margin-right: auto;
      margin-left: ${({ ratio }) => `${ratio * 10}px`};
    }
  }
  .dg-primary.mantine-Button-root {
    height: ${({ ratio }) => `${ratio * 40}px`};
    min-height: ${({ ratio }) => `${ratio * 40}px`};
    font-size: ${({ ratio }) => `${ratio * 14}px`};
    line-height: ${({ ratio }) => `${ratio * 40}px`};
    width: 100%;
  }
  .step-btn {
    width: 100%;
    background: ${({ theme }: { theme: ThemeType }) => theme.bg_black_40};
    border: 1px solid ${(props) => props.theme.border_b7b_05};
    color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_60};
    text-align: center;
    ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
  }
  .learn-more {
    ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
    margin-top: ${({ ratio }) => `${ratio * 8}px`};
    font-size: ${({ ratio }) => `${ratio * 14}px`};
    color: ${({ theme }: { theme: ThemeType }) => theme.blue};
    cursor: pointer;
  }
`;

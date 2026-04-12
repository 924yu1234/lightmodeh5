import React, { useCallback, useEffect, useMemo, useState } from 'react';
import data from 'imgs/welcome.json';
import Lottie from 'lottie-react';
import queryString from 'query-string';
import styled from 'styled-components';

import { Checkbox as DeCheckbox, Input, PrimaryBtn } from 'src/UI';

import { checkReferralCode } from 'src/apps/referral/service';
import Close from 'src/components/Icons/close';
import LinkWrapper from 'src/components/LinkWrapper';
import { EventType } from 'src/hooks/useEventTrack/service';
import { useLogInitializeStep } from 'src/hooks/useEventTrack/utils/useLogInitialize';
import { useIntl } from 'src/locals';
import { useWalletWeb3 } from 'src/providers/useWallet';
import { useModals } from 'src/state/application/hooks';
import { ModalKeys } from 'src/state/application/reducer';
import { useDexAccount, useUpdateDexAccount } from 'src/state/dexAccount/hooks';
import { AccountStatus } from 'src/state/dexAccount/reducer';
import { ThemeType } from 'src/theme';
import WindowOpen from 'src/utils/windowOpen';

import { Steps } from '.';
export default function Step1Welcome({
  goToStep,
  ratio,
  hideModal,
  referralCode,
  setReferralCode,
}: {
  goToStep: (step: Steps) => void;
  ratio: number;
  hideModal: any;
  referralCode: string;
  setReferralCode: (code: string) => void;
}) {
  const intl = useIntl();
  const { account } = useWalletWeb3();
  const dexAccount = useDexAccount();
  const updateDexAccount = useUpdateDexAccount();
  const [showText, setShowText] = useState(false);
  const { order } = useModals(ModalKeys.register);
  const [checked1, setChecked1] = useState(false);
  const [checkResMap, setCheckResMap] = useState<
    Record<string, 'valid' | 'invalid' | 'checking'>
  >({});
  const [checkingReferralCode, setCheckingReferralCode] = useState(true);

  const logInitializeStep = useLogInitializeStep({ isFull: !!order });

  const { s = '', gift = '' } = queryString.parse(location.search) ?? {};
  const giftCode = (gift || window.gift_code) as string;
  // 检查白名单
  // 检查地址是否已开户
  useEffect(() => {
    updateDexAccount({
      dexAccount: {
        state: AccountStatus.REFRESH,
      },
    });
  }, [account, updateDexAccount]);

  // 检查如果已经开户则结束流程
  useEffect(() => {
    if (dexAccount?.hasSyncDA) hideModal();
  }, [dexAccount?.hasSyncDA, hideModal]);

  const loading = dexAccount?.state === AccountStatus.FETCHING;

  const next = useCallback(() => {
    logInitializeStep(EventType.initialization_action, {
      action: 'click_sign',
    });
    goToStep('step3_sign');
  }, [goToStep, logInitializeStep]);

  useEffect(() => {
    setTimeout(() => {
      setShowText(true);
    }, 1200);
  }, []);

  useEffect(() => {
    if (s) {
      setReferralCode(s as string);
    } else {
      setReferralCode('');
    }
  }, [s, setReferralCode]);

  useEffect(() => {
    if (checkResMap[referralCode]) return;
    if (referralCode) {
      setCheckingReferralCode(true);
      checkReferralCode(referralCode)
        .then((res) => {
          if (!res.is_valid) {
            setCheckResMap((prev) => ({ ...prev, [referralCode]: 'invalid' }));
          } else {
            setCheckResMap((prev) => ({ ...prev, [referralCode]: 'valid' }));
          }
          setCheckingReferralCode(false);
        })
        .catch(() => {
          setCheckResMap((prev) => ({ ...prev, [referralCode]: 'invalid' }));
          setCheckingReferralCode(false);
        });
    } else {
      setCheckingReferralCode(false);
    }
  }, [referralCode, checkResMap]);

  const referralCodeError = useMemo(() => {
    return checkResMap[referralCode] === 'invalid';
  }, [checkResMap, referralCode]);

  const showReferralInput = useMemo(() => {
    return !giftCode && showText && s && checkResMap[s as string] === 'valid';
  }, [giftCode, checkResMap, s, showText]);

  return (
    <StyledStep1 ratio={ratio} showText={showText}>
      <div className="modal-title">
        <Close onClick={hideModal} />
      </div>
      <div className="svg">
        <Lottie animationData={data} loop={false} />
      </div>
      <div
        className="desc"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: intl.create_account_tips,
        }}
      />
      <DeCheckbox
        showHoverBg
        label={
          <div className="terms">
            {intl.i_accept}
            <LinkWrapper
              url="/terms"
              onClick={() => {
                WindowOpen('/terms');
              }}
            >
              {intl.degate_terms_of_service}
            </LinkWrapper>
          </div>
        }
        checked={checked1}
        onChange={(e) => {
          setChecked1(e.target.checked);
        }}
      />
      {!giftCode && !!showReferralInput && (
        <div className="referral">
          <Input
            placeholder={intl.referral_code_optional}
            value={referralCode}
            onChange={(e: any) => {
              setReferralCode(e.target.value.trim());
            }}
          />
          {referralCodeError && (
            <div className="referral-error">{intl.invalid_referral_code}</div>
          )}
        </div>
      )}
      <PrimaryBtn
        eventName="btn_initialize_step1_next"
        disabled={!checked1 || referralCodeError}
        onClick={next}
        loading={loading || checkingReferralCode}
      >
        {intl['account.next_step']}
      </PrimaryBtn>
    </StyledStep1>
  );
}

const StyledStep1 = styled.div<{ ratio: number; showText: boolean }>`
  width: 100%;
  ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
  .svg > div {
    height: ${({ ratio }) => `${ratio * 50}px`};
    width: ${({ ratio }) => `${ratio * 200}px`};
    margin-bottom: ${({ ratio }) => `${ratio * 5}px`};
    margin-left: ${({ ratio }) => `-${ratio * 15}px`};
  }
  .desc {
    font-size: ${({ ratio }) => `${ratio * 14}px`};
    line-height: 1.7em;
    color: ${({ theme }: { theme: ThemeType }) => theme.modalDesc};
    visibility: ${({ showText }) => (showText ? 'visible' : 'hidden')};
    opacity: ${({ showText }) => (showText ? 1 : 0)};
    transition: all 0.5s ease-in-out;
    b {
      ${({ theme }: { theme: ThemeType }) => theme.fontBold};
      color: ${({ theme }: { theme: ThemeType }) => theme.blue};
    }
  }

  .referral {
    font-size: ${({ ratio }) => `${ratio * 14}px`};
    visibility: ${({ showText }) => (showText ? 'visible' : 'hidden')};
    line-height: 1.7em;
    margin-top: ${({ ratio }) => `${ratio * 10}px`};
    overflow: hidden;
    .mantine-Input-wrapper {
      margin-bottom: ${({ ratio }) => `${ratio * 5}px`};
    }
    .referral-error {
      font-size: ${({ ratio }) => `${ratio * 14}px`};
      color: ${({ theme }: { theme: ThemeType }) => theme.red};
    }
  }

  .mantine-Checkbox-root {
    width: 100%;
    margin-bottom: 5px;
    .terms {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      .link-wrapper {
        margin-left: 5px;
      }
    }
  }

  .mantine-Checkbox-root {
    margin-top: ${({ ratio }) => `${ratio * 20}px`};
    visibility: ${({ showText }) => (showText ? 'visible' : 'hidden')};
    opacity: ${({ showText }) => (showText ? 1 : 0)};
    ${({ theme }: { theme: ThemeType }) => theme.fontRegular};

    .terms {
      line-height: 1.7em;
      font-size: ${({ ratio }) => `${ratio * 14}px`};
    }
  }

  .dg-primary.mantine-Button-root {
    margin-top: ${({ ratio }) => `${ratio * 15}px`};
    visibility: ${({ showText }) => (showText ? 'visible' : 'hidden')};
    opacity: ${({ showText }) => (showText ? 1 : 0)};
    transition: all 0.5s ease-in-out;
  }
`;

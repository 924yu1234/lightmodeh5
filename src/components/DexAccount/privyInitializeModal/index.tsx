import React, { useCallback, useEffect, useState } from 'react';
import queryString from 'query-string';
import styled from 'styled-components';

import {
  Checkbox as DeCheckbox,
  GhostBtn,
  Input,
  Modal,
  PrimaryBtn,
} from 'src/UI';

import { checkReferralCode } from 'src/apps/referral/service';
import Close from 'src/components/Icons/close';
import LinkWrapper from 'src/components/LinkWrapper';
import { ACCOUNT_EXIST } from 'src/constants/apiErr';
import { PrivyTerms } from 'src/constants/dex';
import { DexAccount } from 'src/constants/interface';
import useCreateWalletErrorTips from 'src/hooks/useCreateWalletErrorTips';
import useCustomNavigate from 'src/hooks/useCustomNavigate';
import { EventType } from 'src/hooks/useEventTrack/service';
import { useLogInitializeStep } from 'src/hooks/useEventTrack/utils/useLogInitialize';
import { useIsPrivy } from 'src/hooks/useWalletHooks';
import { useIntl } from 'src/locals';
import { useWalletOprs } from 'src/providers/useWallet';
import { useDexAccount, useUpdateDexAccount } from 'src/state/dexAccount/hooks';
import useUnlock from 'src/state/dexAccount/opr/useUnlock';
import { AccountStatus } from 'src/state/dexAccount/reducer';
import { useSyncDA } from 'src/state/dexAccount/services/service_da';
import { ThemeType } from 'src/theme';
import { logDexRegister } from 'src/utils/log/dexAccount';
import message from 'src/utils/message';
import WindowOpen from 'src/utils/windowOpen';

import { useModals, useShowModal } from 'js/state/application/hooks';
import { ModalKeys } from 'js/state/application/reducer';

export default function PrivyInitializeModal() {
  const intl = useIntl();
  const { visible, hide, signResp } = useModals(ModalKeys.privy_initialize);
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [loading, setLoading] = useState(false);
  const syncDA = useSyncDA();
  const createErrorTips = useCreateWalletErrorTips();
  const logInitializeStep = useLogInitializeStep({ isFull: false });
  const isPrivy = useIsPrivy();
  const dexAccount = useDexAccount();
  const { disconnect } = useWalletOprs();
  const updateDexAccount = useUpdateDexAccount();
  const unlock = useUnlock();
  const showModal = useShowModal();
  const navigate = useCustomNavigate();

  const [referralCode, setReferralCode] = useState('');
  const [referralCodeError, setReferralCodeError] = useState(false);
  const [checkingReferralCode, setCheckingReferralCode] = useState(false);
  const {
    s = '',
    gift = '',
    ...rest
  } = queryString.parse(location.search) ?? {};
  const giftCode = (gift || window.gift_code) as string;

  const reject = useCallback(() => {
    logInitializeStep(EventType.initialization_action, {
      action: 'exit',
    });
    hide();
    disconnect();
  }, [hide, logInitializeStep, disconnect]);

  const sign = useCallback(
    (sign: DexAccount) => {
      setLoading(true);
      syncDA({
        DAs: sign.DAs,
        keyNonce: sign.keyNonce,
        referralCode,
        giftCode,
      })
        .then((resp) => {
          if (resp.gifted) {
            const search = queryString.stringify({
              ...rest,
            });

            showModal({
              modal: ModalKeys.raffleFlashOPFreeEntries,
            });
            navigate(
              {
                pathname: window.location.pathname,
                search: search ? `?${search}` : '',
              },
              { replace: true }
            );
          }
          setLoading(false);
          hide();
          logDexRegister({
            method: 'success',
            wallet: 'privy',
            account: sign.account,
          });
          logInitializeStep(EventType.initialization_completed);
          const newData = {
            ...dexAccount,
            ...sign,
            state: AccountStatus.REGISTERING,
          };
          updateDexAccount({
            dexAccount: newData,
          });
        })
        .catch((err: any) => {
          setLoading(false);
          logInitializeStep(EventType.initialization_action, {
            action: '2nd_signature_canceled',
          });
          if (err?.code === ACCOUNT_EXIST) {
            return;
          }
          logDexRegister({
            wallet: 'privy',
            method: 'error',
            account: sign.account,
            error: { code: err.code, message: err.message },
          });
          message.error(createErrorTips(err));
        });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      dexAccount,
      hide,
      syncDA,
      updateDexAccount,
      createErrorTips,
      logInitializeStep,
      referralCode,
      showModal,
      navigate,
      giftCode,
    ]
  );

  useEffect(() => {
    if (
      dexAccount?.hasSyncDA &&
      (dexAccount?.account === signResp?.account || !signResp)
    ) {
      hide();
    }
  }, [visible, signResp, dexAccount?.account, dexAccount?.hasSyncDA, hide]);

  const agree = useCallback(() => {
    setLoading(true);
    if (signResp) {
      sign(signResp);
    } else {
      unlock(1, 'register').then((resp) => {
        sign(resp as DexAccount);
      });
      // TODO: privy注册
      // signUploadKeyPair({} as any).then((res) => {
      //   sign(res as any);
      // });
    }
  }, [sign, signResp, unlock]);

  useEffect(() => {
    if (s) {
      setReferralCode(s as string);
    } else {
      setReferralCode('');
    }
  }, [s, setReferralCode]);

  useEffect(() => {
    if (referralCode) {
      setCheckingReferralCode(true);
      checkReferralCode(referralCode)
        .then((res) => {
          if (!res.is_valid) {
            setReferralCodeError(true);
          } else {
            setReferralCodeError(false);
          }
          setCheckingReferralCode(false);
        })
        .catch(() => {
          setReferralCodeError(false);
          setCheckingReferralCode(false);
        });
    } else {
      setReferralCodeError(false);
    }
  }, [referralCode]);

  if (dexAccount?.loading || !isPrivy || dexAccount?.hasSyncDA) {
    return null;
  }

  return (
    <Modal
      title={null}
      onClose={hide}
      opened={visible}
      closeOnClickOutside={false}
      closeOnEscape={false}
    >
      <StyledModal>
        <div className="modal-title">
          {intl.terms_of_service}
          <Close onClick={reject} />
        </div>
        <DeCheckbox
          height={34}
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
        <DeCheckbox
          height={34}
          showHoverBg
          label={
            <div className="terms">
              {intl.i_accept}
              <LinkWrapper
                url={PrivyTerms}
                onClick={() => {
                  WindowOpen(PrivyTerms);
                }}
              >
                {intl.privy_terms_of_service}
              </LinkWrapper>
            </div>
          }
          checked={checked2}
          onChange={(e) => {
            setChecked2(e.target.checked);
          }}
        />
        {!giftCode && (
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
        <div className="btns">
          <GhostBtn eventName="btn_initialize_privy_reject" onClick={reject}>
            {intl.reject}
          </GhostBtn>
          <PrimaryBtn
            eventName="btn_initialize_privy_agree"
            disabled={!checked1 || !checked2 || checkingReferralCode}
            onClick={agree}
            loading={loading || checkingReferralCode}
          >
            {intl.agree}
          </PrimaryBtn>
        </div>
      </StyledModal>
    </Modal>
  );
}

const StyledModal = styled.div`
  padding: 0 20px 30px;
  ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
  .modal-title {
    margin-bottom: 40px;
  }
  .mantine-Checkbox-root {
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

  .referral {
    font-size: 14px;
    margin-top: 25px;
    .referral-error {
      font-size: 14px;
      margin-top: 5px;
      color: ${({ theme }: { theme: ThemeType }) => theme.red};
    }
  }
  .btns {
    margin-top: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    width: 100%;
    .mantine-Button-root {
      width: 100%;
      flex: 1;
    }
  }
`;

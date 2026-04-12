import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDebounce } from 'ahooks';
import styled from 'styled-components';

import { Input, PrimaryBtn } from 'src/UI';

import {
  checkReferralCode,
  useUpdateReferralCode,
} from 'src/apps/referral/service';
import { useIntl } from 'src/locals';
import Header from 'src/mobiles/components/header';
import { useShowModalLogin } from 'src/state/application/hooks';
import { useDexAccount } from 'src/state/dexAccount/hooks';
import { ThemeType } from 'src/theme';
import message from 'src/utils/message';

import { useShowH5Header } from '../utils';

export default function CheckReferral() {
  const { usedReferralCode, account } = useDexAccount();
  const showH5Header = useShowH5Header();
  const [_usedReferralCode, setUsedReferralCode] = useState(usedReferralCode);

  const [checkingReferralCode, setCheckingReferralCode] = useState(false);
  const [checkResMap, setCheckResMap] = useState<Record<string, string>>({});
  const intl = useIntl();
  const [referralCode, setReferralCode] = useState('');
  const updateReferralCode = useUpdateReferralCode();
  const login = useShowModalLogin();

  const debouncedReferralCode = useDebounce(referralCode, { wait: 500 });

  useEffect(() => {
    setUsedReferralCode('');
  }, [account]);

  useEffect(() => {
    if (usedReferralCode) {
      setUsedReferralCode(usedReferralCode);
    }
  }, [usedReferralCode]);

  useEffect(() => {
    if (debouncedReferralCode) {
      if (checkResMap[debouncedReferralCode]) {
        return;
      }
      setCheckingReferralCode(true);
      checkReferralCode(debouncedReferralCode)
        .then((res) => {
          if (!res.is_valid) {
            setCheckResMap((prev) => ({
              ...prev,
              [debouncedReferralCode]: 'invalid',
            }));
          } else {
            setCheckResMap((prev) => ({
              ...prev,
              [debouncedReferralCode]: 'valid',
            }));
          }
          setCheckingReferralCode(false);
        })
        .catch(() => {
          setCheckResMap((prev) => ({
            ...prev,
            [debouncedReferralCode]: 'invalid',
          }));
          setCheckingReferralCode(false);
        });
    } else {
      setCheckingReferralCode(false);
    }
  }, [debouncedReferralCode, checkResMap]);

  const isInvalidReferralCode = useMemo(() => {
    return (
      !!referralCode &&
      checkResMap[referralCode] &&
      checkResMap[referralCode] === 'invalid'
    );
  }, [referralCode, checkResMap]);

  const submit = useCallback(() => {
    updateReferralCode({ referralCode }).then(() => {
      setUsedReferralCode(referralCode);
      message.success(intl.status_success);
    });
  }, [referralCode, updateReferralCode, setUsedReferralCode, intl]);

  return (
    <StyledPairInfo>
      {showH5Header && <Header />}
      <div className="page-inner">
        {_usedReferralCode ? (
          <>
            <div className="referral-title">{intl.your_referrer}</div>
            <div className="referral-code">{_usedReferralCode}</div>
          </>
        ) : (
          <>
            <div className="referral-title">{intl.referral_code}</div>
            <Input
              placeholder=""
              value={referralCode}
              className={`${isInvalidReferralCode ? 'error-border' : ''}`}
              onChange={(e: any) => {
                setReferralCode(e.target.value?.trim());
              }}
            />
            {isInvalidReferralCode && (
              <div className="referral-error">{intl.invalid_referral_code}</div>
            )}
            <PrimaryBtn
              eventName="btn_submit_referral_code"
              loading={checkingReferralCode}
              disabled={!referralCode || !!isInvalidReferralCode}
              onClick={() => {
                if (!account) {
                  login();
                } else {
                  submit();
                }
              }}
            >
              {intl.Submit}
            </PrimaryBtn>
          </>
        )}
      </div>
    </StyledPairInfo>
  );
}

const StyledPairInfo = styled.div`
  width: 100%;
  height: 100%;
  padding-top: ${({ theme }: { theme: ThemeType }) =>
    !theme.showH5Header ? 0 : 52}px;
  .page-inner {
    height: ${(props) =>
      props.theme.windowHeight - (!props.theme.showH5Header ? 0 : 52)}px;
    width: ${(props) => props.theme.windowWidth}px;
    overflow: hidden auto;
    padding: 10px 20px 0;

    .referral-title {
      font-size: 16px;
      line-height: 40px;
      ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
      margin-bottom: 10px;
    }

    .referral-code {
      font-size: 14px;
      line-height: 20px;
      ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
      color: ${({ theme }: { theme: ThemeType }) => theme.t_fff_50};
    }

    .error-border .mantine-Input-input {
      border: 1px solid ${({ theme }: { theme: ThemeType }) => theme.red} !important;
    }

    .referral-error {
      font-size: 14px;
      margin-top: 10px;
      color: ${({ theme }: { theme: ThemeType }) => theme.red};
    }

    .dg-primary {
      width: 100%;
      margin-top: 30px;
    }
  }
`;

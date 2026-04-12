import React, { useEffect, useState } from 'react';
import logo_dark from 'imgs/logo_dark.svg';
import queryString from 'query-string';
import { useParams } from 'react-router-dom';

import { UIButton } from 'src/UI';

import H5AccountCheck from 'src/components/Empty/H5AccountCheck';
import InviteContent from 'src/components/invite/content';
import InviteInvalid from 'src/components/invite/invalid';
import InviteSuccess from 'src/components/invite/success';
import { useIntl } from 'src/locals';
import Header from 'src/mobiles/components/header';
import useWallet from 'src/providers/useWallet';
import { useDexAccount } from 'src/state/dexAccount/hooks';
import { useThemeParams } from 'src/theme';
import { logAPPH5 } from 'src/utils/log';
import message from 'src/utils/message';

import useNavigateApp from '../navigateApp';
import { useShowH5Header } from '../utils';
import { useClaimInviteCode, useGetInviteCodeInfo } from './service';
import { StyledCardDetail } from './style';

export default function CardDetail() {
  const { code } = useParams();
  const { card_key } = queryString.parse(location.search) ?? {};
  const { deviceId, callAppPromise } = useWallet();
  const { isInWhitelist } = useDexAccount();
  const intl = useIntl();
  const showH5Header = useShowH5Header();
  const getInviteCodeInfo = useGetInviteCodeInfo();
  const { viewWidth } = useThemeParams();
  const navigate = useNavigateApp();
  const claimInviteCode = useClaimInviteCode();

  // eligible	可领取
  // invalid	card_id 不存在
  // expired	已过期
  // inactive	未激活
  // claimedByThisOne	当前账户已领取
  // claimedByOther	已被其他账户领取
  // ineligible	wallet / device 曾领取过其他卡

  const [status, setStatus] = useState<
    'checking' | 'eligible' | 'invalid' | 'claiming' | 'claimSuccess'
  >('eligible');
  const [refreshIndex, setRefreshIndex] = useState(0);

  useEffect(() => {
    if (status === 'claiming') {
      setTimeout(() => {
        setRefreshIndex(refreshIndex + 1);
      }, 3000);
    }
  }, [status, refreshIndex]);

  useEffect(() => {
    if (isInWhitelist) {
      setStatus('claimSuccess');
      return;
    }
    if (code) {
      getInviteCodeInfo({ inviteCode: code })
        .then((res: any) => {
          logAPPH5({
            event: 'getCardInfo success',
            inviteCode: code,
            isInWhitelist: res.isInWhitelist,
            usable: res.usable,
          });
          if (res.isInWhitelist) {
            setStatus('claimSuccess');
            return;
          }
          if (res.usable) {
            setStatus('eligible');
          } else {
            setStatus('invalid');
          }
        })
        .catch((err: any) => {
          logAPPH5({
            event: 'getCardInfo error',
            error: err,
          });
          setStatus('invalid');
        });
    }
  }, [isInWhitelist, code, card_key, getInviteCodeInfo, refreshIndex]);

  const claim = () => {
    setStatus('claiming');
    logAPPH5({
      event: 'claimCard pending',
      message: 'claim invite code',
      inviteCode: code,
    });
    callAppPromise('getAllWalletId', '')
      .then((resp) => {
        return claimInviteCode({
          inviteCode: code,
          walletIds: resp,
          deviceId,
        })
          .then(() => {
            callAppPromise('refreshDaAddress', '');
            logAPPH5({
              event: 'claimInvite success',
            });
            setRefreshIndex((prev) => prev + 1);
            setStatus('claimSuccess');
          })
          .catch((err: any) => {
            logAPPH5({
              event: 'claimInvite error',
              error: err,
            });
            setStatus('eligible');
          });
      })
      .catch((err: any) => {
        logAPPH5({
          event: 'claimInvite error',
          error: err,
        });
        setRefreshIndex((prev) => prev + 1);
        setStatus('eligible');
        message.error(intl.common_err);
      });
  };

  return (
    <StyledCardDetail>
      {showH5Header && <Header />}
      <div className="page-inner">
        <img src={logo_dark} alt="logo" className="logo" />
        {(status === 'checking' ||
          status === 'eligible' ||
          status === 'claiming') && <InviteContent width={viewWidth} />}
        {status === 'claimSuccess' && <InviteSuccess width={viewWidth} />}
        {status === 'invalid' && <InviteInvalid width={viewWidth} />}

        <H5AccountCheck>
          <>
            {(status === 'claiming' || status === 'eligible') && (
              <UIButton
                eventName="card_claim"
                className="claim-btn"
                onClick={claim}
                loading={status === 'claiming'}
              >
                {intl.join_now}
              </UIButton>
            )}
            {(status === 'claimSuccess' || status === 'invalid') && (
              <UIButton
                eventName="card_claim"
                className="claim-btn"
                onClick={() => navigate('/home')}
              >
                {intl.Return}
              </UIButton>
            )}
          </>
        </H5AccountCheck>
      </div>
    </StyledCardDetail>
  );
}

import React, { useEffect, useState } from 'react';
import queryString from 'query-string';
import { useParams } from 'react-router-dom';

import { UIButton } from 'src/UI';

import CardItem from 'src/components/Card/cardItem';
import { getCardValue } from 'src/components/Card/utils';
import H5AccountCheck from 'src/components/Empty/H5AccountCheck';
import { useIntl } from 'src/locals';
import Header from 'src/mobiles/components/header';
import useWallet from 'src/providers/useWallet';
import { logAPPH5 } from 'src/utils/log';
import message from 'src/utils/message';

import useNavigateApp from '../navigateApp';
import { useShowH5Header } from '../utils';
import { useClaimCard, useGetCardInfo } from './service';
import { StyledCardDetail } from './style';

export default function CardDetail() {
  const { cardId, cardName } = useParams();
  const { card_key } = queryString.parse(location.search) ?? {};
  const intl = useIntl();
  const showH5Header = useShowH5Header();
  const navigateApp = useNavigateApp();
  const { deviceId, callAppPromise } = useWallet();
  const claimCard = useClaimCard();
  const getCardInfo = useGetCardInfo();

  // eligible	可领取
  // invalid	card_id 不存在
  // expired	已过期
  // inactive	未激活
  // claimedByThisOne	当前账户已领取
  // claimedByOther	已被其他账户领取
  // ineligible	wallet / device 曾领取过其他卡

  const [status, setStatus] = useState<
    | 'checking'
    | 'eligible'
    | 'invalid'
    | 'expired'
    | 'inactive'
    | 'claimedByThisOne'
    | 'claimedByOther'
    | 'ineligible'
    | 'claiming'
    | 'claimSuccess'
    | 'loading'
  >('checking');
  const [refreshIndex, setRefreshIndex] = useState(0);

  useEffect(() => {
    if (status === 'claiming') {
      setTimeout(() => {
        setRefreshIndex(refreshIndex + 1);
      }, 3000);
    }
  }, [status, refreshIndex]);

  useEffect(() => {
    if (cardId && cardName) {
      getCardInfo({ cardName, cardId })
        .then((res) => {
          setStatus(res.status);
          logAPPH5({
            event: 'getCardInfo success',
            cardId,
            status: res.status,
          });
        })
        .catch((err) => {
          logAPPH5({
            event: 'getCardInfo error',
            error: err,
          });
          setStatus('invalid');
        });
    }
  }, [cardId, cardName, card_key, getCardInfo, refreshIndex]);

  const claim = () => {
    const timestamp = Date.now();
    const signMessage = `claim:${cardName}:${cardId}:${deviceId}:${timestamp}`;
    setStatus('loading');
    logAPPH5({
      event: 'claimCard pending',
      message: signMessage,
    });
    callAppPromise('walletIdSign', signMessage)
      .then((resp: any) => {
        claimCard({
          deviceId,
          cardName,
          cardId,
          signature: resp.signature || resp,
          timestamp,
          cardKey: card_key as string,
        })
          .then(() => {
            logAPPH5({
              event: 'claimCard success',
            });
            setRefreshIndex((prev) => prev + 1);
            setStatus('claiming');
          })
          .catch((err) => {
            logAPPH5({
              event: 'claimCard error',
              error: err,
            });
            if (err?.code === 220017) {
              setStatus('ineligible');
              message.error(intl.sorry_youve_already_claimed_once);
              return;
            }
            if (err?.code === 220018) {
              setStatus('expired');
              message.error(intl.gift_card_expired);
              return;
            }
            if (err?.code === 220019) {
              setStatus('inactive');
              message.error(intl.gift_card_has_not_been_activated);
              return;
            }
            if (err?.code === 220020) {
              setStatus('claimedByOther');
              message.error(intl.gift_card_has_been_claimed);
              return;
            }
            setRefreshIndex((prev) => prev + 1);
            setStatus('eligible');
            message.error(intl.common_err);
            // if (
            //   err?.code === 220014 ||
            //   err?.code === 220015 ||
            //   err?.code === 220016
            // ) {
            // }
          });
      })
      .catch(() => {
        setStatus('eligible');
      });
  };

  return (
    <StyledCardDetail>
      {showH5Header && <Header />}
      <div className="page-inner">
        <CardItem cardId={cardId || ''} size={330} />
        <H5AccountCheck>
          <>
            {status === 'ineligible' && (
              <div className="status-text">
                {intl.sorry_youve_already_claimed_once}
              </div>
            )}
            {status === 'expired' && (
              <div className="status-text">{intl.gift_card_expired}</div>
            )}
            {(status === 'inactive' || status === 'invalid') && (
              <div className="status-text">
                {intl.gift_card_has_not_been_activated}
              </div>
            )}
            {status === 'claimedByOther' && (
              <div className="status-text">
                {intl.gift_card_has_been_claimed}
              </div>
            )}
            {(status === 'eligible' || status === 'loading') && (
              <UIButton
                eventName="card_claim"
                className="claim-btn"
                onClick={claim}
                loading={status === 'loading'}
              >
                {intl.claim_now}
              </UIButton>
            )}
            {status === 'claiming' && (
              <>
                <div className="status-text">
                  {intl.please_wait_it_takes_xx_seconds.replace('xx', '15')}
                </div>
                <UIButton
                  eventName="card_claiming"
                  className="claim-btn"
                  loading
                >
                  {intl.Claiming}
                </UIButton>
              </>
            )}
            {(status === 'claimSuccess' || status === 'claimedByThisOne') && (
              <>
                <div className="claim-success-text">
                  {intl['mining.claimed_success']}
                </div>
                <div className="status-text">
                  {intl.you_have_received_a_Turbo_Range_position_worth_XXX.replace(
                    'XXX',
                    getCardValue(cardId || '')
                  )}
                </div>
                <UIButton
                  eventName="card_claim_success"
                  className="claim-btn"
                  onClick={() => {
                    navigateApp('balance?tab=turbo_range');
                  }}
                >
                  {intl.view_my_balance}
                </UIButton>
              </>
            )}
          </>
        </H5AccountCheck>
      </div>
    </StyledCardDetail>
  );
}

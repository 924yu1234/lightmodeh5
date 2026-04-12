import React, { useState } from 'react';
import Lottie from 'lottie-react';
import styled from 'styled-components';

import { PrimaryBtn } from 'src/UI';

import openData from 'src/apps/gift/open.json';
import data from 'src/apps/gift/waiting.json';
import { useIntl } from 'src/locals';
import { ThemeType } from 'src/theme';
import { formatTimeDDHHMM } from 'src/utils/timeFormat';

import ClaimeSuccess from './claimeSuccess';

export default function Step1({ giftInfo }: { giftInfo: any }) {
  const intl = useIntl();
  const { expiredAt } = giftInfo;
  const [showOpenAnimation, setShowOpenAnimation] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  if (showSuccess) {
    return <ClaimeSuccess giftInfo={giftInfo} />;
  }

  return (
    <StyledUnclaimable className="cannot-claim">
      <div className="gift-wrapper">
        <div className="gift-bg"></div>
        <div className="gift-svg">
          {showOpenAnimation ? (
            <Lottie animationData={openData} loop={false} />
          ) : (
            <Lottie animationData={data} loop={false} />
          )}
        </div>
      </div>
      {expiredAt && (
        <div className="box-tips">
          {intl.gift.Expired_in_DATE.replace(
            'DATE',
            formatTimeDDHHMM(expiredAt - Date.now(), intl)
          )}
        </div>
      )}
      <div className="tips">{intl.gift.Your_gift_awaits}</div>
      <PrimaryBtn
        eventName="btn_gift_box_open_now"
        onClick={() => {
          setShowOpenAnimation(true);
          setTimeout(() => {
            setShowSuccess(true);
          }, 1800);
        }}
      >
        {intl.gift.Open_Now}
      </PrimaryBtn>
    </StyledUnclaimable>
  );
}

const StyledUnclaimable = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .gift-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 300px;
    height: 300px;
    margin-top: 30px;
  }
  .gift-bg {
    width: 200px;
    height: 200px;
    background: ${({ theme }: { theme: ThemeType }) => theme.green};
    border-radius: 50%;
    position: relative;
    position: absolute;
  }
  .gift-svg {
    z-index: 1;
    position: absolute;
    top: -40px;
    left: 0;
    width: 300px;
    height: 380px;
  }

  .tips {
    ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
    color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b};
    font-size: 14px;
    line-height: 20px;
    text-align: center;
    margin-top: 30px;
  }
  .dg-primary {
    margin-top: 10px;
    min-width: 230px;
  }
`;

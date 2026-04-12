import React from 'react';
import gift from 'imgs/giftbox1.png';
import styled from 'styled-components';

import { PrimaryBtn } from 'src/UI';

import useCustomNavigate from 'src/hooks/useCustomNavigate';
import { useIntl } from 'src/locals';
import { ThemeType } from 'src/theme';

export default function Step1UnClaimable({ giftInfo }: { giftInfo: any }) {
  const intl = useIntl();
  const navigate = useCustomNavigate();
  return (
    <StyledUnclaimable className="cannot-claim">
      <div className="gift-wrapper">
        <div className="gift-bg"></div>
        <img src={gift} alt="gift" className="gift" />
      </div>
      <div className="tips">
        {intl.gift.Others_were_faster_Try_again_next_time}
      </div>
      <PrimaryBtn
        eventName="btn_gift_box_to_view_gift"
        onClick={() => {
          navigate(`/gift/detail/${giftInfo?.code}`);
        }}
      >
        {intl.gift.View_Gift_Box}
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
  }
  .gift {
    z-index: 1;
    position: absolute;
    top: 60px;
    left: 60px;
    width: 180px;
    height: 180px;
  }

  .tips {
    ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
    color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b};
    font-size: 14px;
    line-height: 20px;
    text-align: center;
    margin-top: 10px;
  }
  .dg-primary {
    margin-top: 10px;
    min-width: 230px;
  }
`;

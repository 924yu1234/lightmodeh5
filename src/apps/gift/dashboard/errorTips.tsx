import React from 'react';
import gift from 'imgs/giftbox2.png';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { PrimaryBtn } from 'src/UI';

import { useIntl } from 'src/locals';
import { ThemeType } from 'src/theme';

export default function ErrorTips() {
  const intl = useIntl();
  const navigate = useNavigate();
  return (
    <StyledErrorTips className="cannot-claim">
      <img src={gift} alt="gift" className="gift" />
      <div className="tips">{intl.common_err}</div>
      <PrimaryBtn
        eventName="btn_gift_box_error_tips_close"
        onClick={() => {
          navigate(`/swap`);
        }}
      >
        {intl.Close}
      </PrimaryBtn>
    </StyledErrorTips>
  );
}

const StyledErrorTips = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 75px;

  .gift {
    width: 220px;
    height: 220px;
  }

  .tips {
    ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
    color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b};
    font-size: 14px;
    line-height: 20px;
    text-align: center;
    margin-top: 50px;
  }
  .dg-primary {
    margin-top: 10px;
    min-width: 230px;
  }
  .link {
    margin-top: 20px;
    ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
    font-size: 14px;
    line-height: 30px;
    color: ${({ theme }: { theme: ThemeType }) => theme.blue};
    cursor: pointer;
  }
`;

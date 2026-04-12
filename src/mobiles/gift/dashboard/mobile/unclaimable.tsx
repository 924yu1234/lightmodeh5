import React from 'react';
import gift from 'imgs/giftbox2.png';
import queryString from 'query-string';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { UIButton } from 'src/UI';

import GALinkWrapper from 'src/components/GA/LinkWrapper';
import { useNavigateAppH5 } from 'src/h5/navigateApp';
import { useIntl } from 'src/locals';
import { ThemeType } from 'src/theme';

export default function Unclaimable({ giftInfo }: { giftInfo: any }) {
  const intl = useIntl();
  const navigate = useNavigate();
  const navigateApp = useNavigateAppH5();
  const { s = '' } = queryString.parse(location.search) ?? {};

  return (
    <StyledUnclaimable className="cannot-claim">
      <img src={gift} alt="gift" className="gift" />
      <div className="tips">
        {intl.gift.Others_were_faster_Try_again_next_time}
      </div>
      <UIButton
        eventName="btn_gift_box_to_view_gift"
        onClick={() => {
          navigateApp(
            `${window.location.origin}/gift/${giftInfo?.code}?s=${s}`
          );
        }}
        uiVariant="primary"
      >
        {intl.gift.View_Gift_Box}
      </UIButton>
      <GALinkWrapper
        eventName="btn_gift_box_to_view_account"
        className="link"
        onClick={() => {
          navigate('/download');
        }}
      >
        {intl.gift.Download_App}
      </GALinkWrapper>
    </StyledUnclaimable>
  );
}

const StyledUnclaimable = styled.div`
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

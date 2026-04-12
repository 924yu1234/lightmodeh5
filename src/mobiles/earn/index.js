import React from 'react';
import commingSoon from 'imgs/popup_comingsoon.png';
import styled from 'styled-components';

import { useShowH5Header } from 'src/h5/utils';

import { useIntl } from 'js/locals';
import Header from 'js/mobiles/components/header';

export default function EarnPage() {
  const intl = useIntl();
  const showH5Header = useShowH5Header();

  return (
    <StyledEarn>
      {showH5Header && (
        <Header title={intl.turboRange.Simple_Earn} backUrl="/home" />
      )}
      <div className="page-inner">
        <img src={commingSoon} alt="coming soon" className="coming-soon-img" />
        <div className="earn-item-title">{intl.Coming_soon}</div>
      </div>
    </StyledEarn>
  );
}

export const StyledEarn = styled.div`
  width: 100%;
  margin: 0 auto;
  position: relative;
  padding-top: ${(props) => (!props.theme.showH5Header ? 0 : 52)}px;
  .page-inner {
    padding: 0 10px 10px;
    height: ${(props) =>
      props.theme.windowHeight - (!props.theme.showH5Header ? 0 : 52)}px;
    width: ${(props) => props.theme.windowWidth}px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    ${(props) => props.theme.fontRegular};
    font-size: 16px;
    color: ${(props) => props.theme.t_b7b};
    padding-bottom: 50px;
  }
  .coming-soon-img {
    width: 50px;
    height: 50px;
    margin-bottom: 10px;
  }
`;

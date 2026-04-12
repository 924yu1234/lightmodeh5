import React from 'react';
import dayjs from 'dayjs';
import icon from 'imgs/icon_maintain.png';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { PrimaryBtn } from 'src/UI';

import { DISCORD } from 'js/constants/dex';
import { useIntl } from 'js/locals';
import getTimeZone from 'js/utils/getTimeZone';
import { yearFormat } from 'js/utils/timeFormat';
import windowOpen from 'js/utils/windowOpen';

export default function SiteMaintenance({ time }) {
  const intl = useIntl();
  let timeStr = '';
  if (time) {
    timeStr = yearFormat(
      dayjs(time).format(`YYYY-MM-DD HH:mm:ss ${getTimeZone()}`)
    );
  }
  return (
    <StyledSiteMaintenance>
      <img src={icon} alt="SiteMaintenance" className="site-maintenance-icon" />
      <div className="site-maintenance-text">{intl.stop_service_1}</div>
      {time > 0 && (
        <div className="site-maintenance-text">{intl.stop_service_2}</div>
      )}
      {time > 0 && <div className="site-maintenance-text">{timeStr}</div>}

      <PrimaryBtn
        eventName="btn_discord"
        onClick={() => {
          windowOpen(DISCORD);
        }}
      >
        Discord
      </PrimaryBtn>
    </StyledSiteMaintenance>
  );
}

SiteMaintenance.propTypes = {
  time: PropTypes.any,
};

export const StyledSiteMaintenance = styled.div`
  width: 100%;
  height: 100%;
  text-align: center;
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: center;
  background: ${({ theme }) => theme.bg};
  justify-content: center;

  .site-maintenance-icon {
    margin: 0 0 17px;
    width: 100px;
    height: 100px;
  }
  .site-maintenance-text {
    ${(props) => props.theme.fontRegular};
    font-size: 16px;
    line-height: 30px;
  }
  .dg-primary {
    margin: 32px 0 0;
    min-width: 110px;
  }
`;

import React from 'react';
import icon from 'imgs/icon_upgrade.png';
import styled from 'styled-components';

import { useIntl } from 'js/locals';

export default function TradePageMaintenance() {
  const intl = useIntl();
  return (
    <StyledTradePageMaintenance className="trading-maintenance">
      <img
        src={icon}
        alt="TradePageMaintenance"
        className="trade-maintenance-icon"
      />
      <div className="trade-maintenance-text">{intl.stop_trading_1}</div>
      <div className="trade-maintenance-text">{intl.stop_trading_2}</div>
    </StyledTradePageMaintenance>
  );
}

TradePageMaintenance.propTypes = {};

export const StyledTradePageMaintenance = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${({ theme }) => theme.bg_main_80};
  justify-content: center;
  z-index: 1;
  .trade-maintenance-icon {
    margin: 0 0 17px;
    width: 100px;
    height: 100px;
  }
  .trade-maintenance-text {
    ${(props) => props.theme.fontRegular};
    font-size: 16px;
    line-height: 30px;
  }
`;

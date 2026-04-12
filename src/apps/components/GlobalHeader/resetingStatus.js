import React from 'react';
import icon from 'imgs/icon_reactive2.gif';
import styled from 'styled-components';

import Tooltip from 'js/components/Tooltip';
import { useIntl } from 'js/locals';
import { useDexAccount } from 'js/state/dexAccount/hooks';

export default function ResetingStatus() {
  const intl = useIntl();
  const dexAccount = useDexAccount();

  if (!dexAccount?.updating) {
    return null;
  }

  return (
    <StyledResetingStatus>
      <Tooltip
        overlayClassName="degate-tips"
        title={intl['menu.reset_processing_title']}
        position="bottom"
      >
        <img src={icon} alt="icon" className="icon" />
      </Tooltip>
    </StyledResetingStatus>
  );
}

ResetingStatus.propTypes = {};

const StyledResetingStatus = styled.div`
  .icon {
    width: 20px;
    margin-right: 10px;
    cursor: pointer;
  }
`;

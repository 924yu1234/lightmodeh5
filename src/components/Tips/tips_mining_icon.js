import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { useIntl } from 'js/locals';

import DeTooltip from '../DeTooltip';
import IconWrapper from '../Icons/IconWrapper';
import IconInfo from '../Icons/info';
import IconMining from '../Icons/mining';

export default function TipsMiningIcon({ children }) {
  const intl = useIntl();
  const ele = (
    <StyledTips>
      <div className="tips-item available">
        <IconMining size={18} className="available" />
        {intl['mining.mining_available_tips']}
      </div>
      <div className="tips-item">
        <IconMining size={18} className="unavailable" />
        {intl['mining.mining_unavailable_tips']}
      </div>
    </StyledTips>
  );
  return (
    <StyledTipsGas>
      {children}
      <DeTooltip modalTitle={children} title={ele}>
        <IconWrapper>
          <IconInfo />
        </IconWrapper>
      </DeTooltip>
    </StyledTipsGas>
  );
}

TipsMiningIcon.propTypes = {
  children: PropTypes.any,
};

const StyledTipsGas = styled.span`
  display: flex;
  align-items: center;
`;
const StyledTips = styled.div`
  background: ${({ theme }) => theme.bg_white_10};
  border-radius: 5px;
  padding: 15px;
  .tips-item {
    display: flex;
    .dg-icon {
      margin-right: 6px;
    }
    ${(props) => props.theme.fontRegular};
    font-size: 14px;
    line-height: 20px;
    color: ${({ theme }) => theme.t_fff};
    &.available {
      margin-bottom: 15px;
    }
  }
`;

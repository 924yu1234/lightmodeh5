import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { useIntl } from 'js/locals';

import DeTooltip from '../DeTooltip';

export default function TipsGas({ children }) {
  const intl = useIntl();
  return (
    <StyledTipsGas>
      <DeTooltip
        modalTitle={intl.gas_fee}
        title={intl.tips_gas}
        childrenTitle={children}
      />
    </StyledTipsGas>
  );
}

TipsGas.propTypes = {
  children: PropTypes.any,
};

const StyledTipsGas = styled.span`
  display: flex;
  align-items: center;
`;

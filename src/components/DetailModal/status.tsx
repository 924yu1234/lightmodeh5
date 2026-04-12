import React from 'react';
import styled from 'styled-components';

import IconStatusFailed from 'src/components/Icons/StatusFailed';
import IconStatusSuccess from 'src/components/Icons/StatusSuccess';
import { SwapOrderStatus } from 'src/constants/consts';
import { useIntl } from 'src/locals';

import IconWrapper from '../Icons/IconWrapper';
import Loader from '../Loader';
export default function Status({ status }: { status: string }): any {
  const intl = useIntl();
  const text = {
    [SwapOrderStatus.processing]: intl.status_processing,
    [SwapOrderStatus.success]: intl.status_success,
    [SwapOrderStatus.quickSuccess]: intl.status_success,
    [SwapOrderStatus.failed]: intl.status_fail,
  }[status];
  return (
    <StyledStatus className="status">
      <IconWrapper size={18}>
        <>
          {status === SwapOrderStatus.processing && <Loader />}
          {status === SwapOrderStatus.success && <IconStatusSuccess />}
          {status === SwapOrderStatus.quickSuccess && <IconStatusSuccess />}
          {status === SwapOrderStatus.failed && <IconStatusFailed />}
        </>
      </IconWrapper>
      {text}
    </StyledStatus>
  );
}

const StyledStatus = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
`;

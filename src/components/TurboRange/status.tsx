import React from 'react';
import styled from 'styled-components';

import IconStatusFailed from 'src/components/Icons/StatusFailed';
import IconStatusSuccess from 'src/components/Icons/StatusSuccess';
import { TurboRangeOrderStatus } from 'src/constants/consts';
import { useIntl } from 'src/locals';

import IconWrapper from '../Icons/IconWrapper';
import Loader from '../Loader';
export default function TurboRangeOrderStatusEle({
  status,
}: {
  status: string;
}): any {
  const intl = useIntl();
  const text = {
    [TurboRangeOrderStatus.pending]: intl.status_processing,
    [TurboRangeOrderStatus.processing]: intl.status_processing,
    [TurboRangeOrderStatus.success]: intl.status_success,
    [TurboRangeOrderStatus.failed]: intl.status_fail,
  }[status];
  return (
    <StyledStatus className="turbo-range-status">
      <IconWrapper size={18}>
        <>
          {status === TurboRangeOrderStatus.pending && <Loader />}
          {status === TurboRangeOrderStatus.processing && <Loader />}
          {status === TurboRangeOrderStatus.success && <IconStatusSuccess />}
          {status === TurboRangeOrderStatus.failed && <IconStatusFailed />}
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

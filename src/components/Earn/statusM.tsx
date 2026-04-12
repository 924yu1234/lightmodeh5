import React from 'react';
import styled from 'styled-components';

import { SwapOrderStatus } from 'src/constants/consts';
import { useIntl } from 'src/locals';

export default function StatusM({ status }: { status: string }) {
  const intl = useIntl();
  const text = {
    [SwapOrderStatus.processing]: intl.status_processing,
    [SwapOrderStatus.success]: intl.status_success,
    [SwapOrderStatus.quickSuccess]: intl.status_success,
    [SwapOrderStatus.failed]: intl.status_fail,
  }[status];

  return (
    <StyledStatus className={`earn-status ${status}`}>
      <i className="status-icon" />
      <span className="earn-status_txt">{text}</span>
    </StyledStatus>
  );
}

const StyledStatus = styled.div`
  display: flex;
  align-items: center;
  .status-icon {
    display: inline-block;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background-color: ${(props) => props.theme.blue1};
    margin-right: 6px;
  }
  &.FAILED,
  &.PROCESSING {
    i {
      background-color: ${(props) => props.theme.gray};
    }
  }
  &.SUCCESS {
    i {
      background-color: ${(props) => props.theme.green};
    }
  }
`;

import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import StatusIcon from 'src/components/StatusIcon';

import { useIntl } from 'js/locals';

export default function TransferTxStatus({ status }) {
  const intl = useIntl();
  const statusStr = useMemo(() => {
    if (status === 'failed') return intl.status_failed;
    if (status === 'completed') return intl.status_completed;
    if (status === 'success') return intl.status_success;
    return status;
  }, [intl, status]);

  return (
    <StyledTxStatus className={`tx_status ${status}`}>
      <StatusIcon status={status} />
      <span className="status-txt">{statusStr}</span>
    </StyledTxStatus>
  );
}

TransferTxStatus.propTypes = {
  status: PropTypes.string,
};

const StyledTxStatus = styled.div`
  display: flex;
  align-items: center;
  .status-txt {
    margin: 0 0 0 5px;
  }
`;

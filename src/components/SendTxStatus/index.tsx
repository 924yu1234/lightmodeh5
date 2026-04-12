import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { SendStatus } from 'src/constants/consts';
import { useThemeParams } from 'src/theme';

import { DISCORD } from 'js/constants/dex';
import { useIntl } from 'js/locals';
import windowOpen from 'js/utils/windowOpen';

import StatusIcon from '../StatusIcon';

export default function SendTxStatus({ data }: { data: any }) {
  const intl = useIntl();
  const { isMobile } = useThemeParams();
  const status = data?.status;
  let progress = data?.progress ?? 0;
  const showConfirms = status === SendStatus.processing;

  if (showConfirms) {
    if (progress < 0) {
      progress = 0;
    } else if (progress >= 100) {
      progress = 99;
    }
  }

  const statusStr = useMemo(
    () =>
      ((
        {
          processing: intl['account.withdraw_status_pending'],
          success: intl.status_success,
          completed: intl.status_completed,
          failed: intl.status_failed,
        } as any
      )[status] ?? status),
    [intl, status]
  );

  return (
    <StyledTxStatus
      className={`tx_status ${status} ${isMobile ? 'isMobile' : ''}`}
    >
      <div className="tx_status_inner">
        {!showConfirms && <StatusIcon status={status} />}
        <div className="status-txt">
          <div className="txt">{statusStr}</div>
        </div>
        {status === 'failed' && (
          <div
            className={`de-btn `}
            onClick={() => {
              windowOpen(DISCORD);
            }}
          >
            {intl.Support}
          </div>
        )}
      </div>
    </StyledTxStatus>
  );
}

SendTxStatus.propTypes = {
  status: PropTypes.object,
};

const StyledTxStatus = styled.div`
  .tx_status_inner {
    display: flex;
    align-items: center;
  }
  .tx_status_progress {
    max-width: 138px;
    margin-top: 5px;
    .mantine-Progress-root .mantine-Progress-bar {
      min-width: 0;
      padding: 0;
    }
  }
  .status-txt {
    display: flex;
    align-items: center;
    .txt {
      margin: 0 0 0 5px;
    }
  }
  .de-btn {
    ${(props) => props.theme.fontRegular};
    font-size: 14px;
    color: ${(props) => props.theme.blue};
    margin: 0 0 0 5px;
    cursor: pointer;
  }
`;

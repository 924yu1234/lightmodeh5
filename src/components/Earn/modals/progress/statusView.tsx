import React from 'react';
import styled from 'styled-components';

import IconStatusFailed from 'src/components/Icons/StatusFailed';
import IconStatusProcessingAni from 'src/components/Icons/StatusProcessingAni';
import IconStatusSuccess from 'src/components/Icons/StatusSuccess';
import { IntentOrderStatus } from 'src/constants/consts';
import { ThemeType } from 'src/theme';

import { useIntl } from 'js/locals';
export default function StatusView({ status }: { status: any }) {
  const intl = useIntl();
  const text = {
    [IntentOrderStatus.processing]: intl.status_processing,
    [IntentOrderStatus.success]: intl.status_success,
    [IntentOrderStatus.failed]: intl.status_fail,
  }[status];
  return (
    <StyledView className="status-view">
      {status === IntentOrderStatus.success && <IconStatusSuccess size={50} />}
      {status === IntentOrderStatus.failed && <IconStatusFailed size={50} />}
      {status === IntentOrderStatus.processing && (
        <IconStatusProcessingAni size={50} />
      )}

      <div className="text">{text}</div>
    </StyledView>
  );
}

const StyledView = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  .text {
    font-size: 16px;
    ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
    line-height: 22px;
    margin-top: 10px;
  }
`;

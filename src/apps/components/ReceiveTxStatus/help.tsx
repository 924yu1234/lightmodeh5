import React from 'react';
import styled from 'styled-components';

import DeTooltip from 'src/components/DeTooltip';
import IconWrapper from 'src/components/Icons/IconWrapper';
import IconInfo from 'src/components/Icons/info';
import { useIntl } from 'src/locals';
import { useShowTipsModal } from 'src/state/application/hooks';
import { ModalKeys } from 'src/state/application/reducer';
import { useThemeParams } from 'src/theme';

export default function TransferStatusHelp() {
  const intl = useIntl();
  const { isMobile } = useThemeParams();
  const showTips = useShowTipsModal();
  const content = intl['account.transfer_status_help'];
  if (isMobile) {
    return (
      <StyledTooltip className="dg-tooltip">
        <span
          onClick={() => {
            showTips({
              modal: ModalKeys.tips_common,
              content,
              title: '',
            });
          }}
        >
          {intl['account.th_status']}
          <IconWrapper>
            <IconInfo />
          </IconWrapper>
        </span>
      </StyledTooltip>
    );
  }
  return (
    <DeTooltip title={content} position="top" align="left">
      <StyledTooltip>
        {intl['account.th_status']}
        <IconWrapper>
          <IconInfo />
        </IconWrapper>
      </StyledTooltip>
    </DeTooltip>
  );
}

const StyledTooltip = styled.span`
  display: flex;
  align-items: center;
  .icon-question {
    margin-left: 4px;
  }
`;

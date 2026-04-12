import React from 'react';
import styled from 'styled-components';

import { useIntl } from 'src/locals';
import { useShowTipsModal } from 'src/state/application/hooks';
import { ModalKeys } from 'src/state/application/reducer';
import { useThemeParams } from 'src/theme';

import DeTooltip from '../DeTooltip';
import IconWrapper from '../Icons/IconWrapper';
import IconInfo from '../Icons/info';

export default function SendStatusHelp() {
  const intl = useIntl();
  const { isMobile } = useThemeParams();
  const showTips = useShowTipsModal();
  const content = (
    // eslint-disable-next-line react/no-danger
    <div dangerouslySetInnerHTML={{ __html: intl.send_status_help }} />
  );
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
        {intl['account.th_status']}{' '}
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

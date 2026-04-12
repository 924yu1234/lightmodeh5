import React from 'react';
import styled from 'styled-components';

import useCustomNavigate from 'src/hooks/useCustomNavigate';
import { useIntl, useSetLocale } from 'src/locals';
import {
  useOperationMessagesPop,
  useReadOperationsMessages,
} from 'src/state/message/hooks';
import { ThemeType } from 'src/theme';
import WindowOpen from 'src/utils/windowOpen';

import Close from '../Icons/close';
import IconWrapper from '../Icons/IconWrapper';
import IconRightOutlined from '../Icons/RightOutlined';
export default function MessagesPop() {
  const popMessages = useOperationMessagesPop();
  const showMessage = popMessages?.[0] || {};
  const { locale } = useSetLocale();
  const intl = useIntl();
  const readOperationsMessages = useReadOperationsMessages();

  const title = (showMessage.title || {}) as any;
  const content = (showMessage.content || {}) as any;

  const titleStr = title?.[locale] || title['en-US'];
  const contentStr = content?.[locale] || content['en-US'];

  const url = showMessage.url;
  const navigate = useCustomNavigate();

  return (
    <StyledPop>
      <div className="message-title">
        {titleStr}
        <IconWrapper
          size={50}
          onClick={(e) => {
            e.stopPropagation();
            readOperationsMessages({ ids: [showMessage.id] });
          }}
        >
          <Close />
        </IconWrapper>
      </div>
      <div className="message-content">{contentStr}</div>
      {!!url && (
        <div
          className="message-url"
          onClick={(e) => {
            e.stopPropagation();
            if (url) {
              if (url.includes(window.location.origin)) {
                // 去除origin
                navigate(url.replace(window.location.origin, ''));
              } else {
                WindowOpen(url);
              }
            }
          }}
        >
          {intl.learn_more}
          <IconRightOutlined />
        </div>
      )}
    </StyledPop>
  );
}

const StyledPop = styled.div`
  padding: 15px 25px;
  position: relative;
  .message-title {
    padding-right: 30px;
    ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
    font-size: 16px;
    line-height: 22px;
    margin-bottom: 15px;
    .dg-icon-wrapper {
      position: absolute;
      right: 0;
      top: 0;
    }
  }
  .message-content {
    ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
    color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_80};
    font-size: 14px;
    line-height: 20px;
  }
  .message-url {
    margin-top: 15px;
    ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
    color: ${({ theme }: { theme: ThemeType }) => theme.blue};
    font-size: 14px;
    line-height: 20px;
  }
`;

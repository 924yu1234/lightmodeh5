/* eslint-disable react/no-danger */
import React from 'react';
import styled from 'styled-components';

import IconWrapper from 'src/components/Icons/IconWrapper';
import IconRightOutlined from 'src/components/Icons/RightOutlined';
import useCustomNavigate from 'src/hooks/useCustomNavigate';
import { useSetLocale } from 'src/locals';
import { useReadOperationsMessages } from 'src/state/message/hooks';
import { OperationMessage } from 'src/state/message/reducer';
import { ThemeType } from 'src/theme';
import WindowOpen from 'src/utils/windowOpen';

import MessageTime from '../messageTime';

export default function OperationMessageItem({
  data,
}: {
  data: OperationMessage;
}) {
  const readed = data.readed;
  const navigate = useCustomNavigate();
  const readOperationsMessages = useReadOperationsMessages();
  const { locale } = useSetLocale();
  const title = (data.title || {}) as any;
  const content = (data.content || {}) as any;

  const titleStr = title?.[locale] || title['en-US'];
  const contentStr = content?.[locale] || content['en-US'];

  if (!titleStr && !contentStr) return null;

  return (
    <StyledItem
      className={`${readed ? '' : 'unreaded'}`}
      onClick={() => {
        if (!readed) {
          readOperationsMessages({ ids: [data.id] });
        }
        if (data.url) {
          if (data.url.includes(window.location.origin)) {
            // 去除origin
            navigate(data.url.replace(window.location.origin, ''));
          } else {
            WindowOpen(data.url);
          }
        }
      }}
    >
      <div className="item-title">
        <span dangerouslySetInnerHTML={{ __html: titleStr }} />
        <div className="point-wrapper">
          {!readed && <div className="point" />}
        </div>
        <div className="item-time">
          <MessageTime time={data.startTime as number} />
        </div>
        <IconWrapper size={20}>
          {data.url ? <IconRightOutlined size={12} /> : <div />}
        </IconWrapper>
      </div>
      <div
        className="item-content"
        dangerouslySetInnerHTML={{ __html: contentStr }}
      />
    </StyledItem>
  );
}

const StyledItem = styled.div`
  padding: 15px 0;
  border-bottom: 1px solid
    ${({ theme }: { theme: ThemeType }) => theme.innerBorder};
  cursor: pointer;
  word-break: break-word;

  .item-title {
    ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
    font-size: 14px;
    line-height: 20px;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
    display: flex;
    align-items: flex-start;
    position: relative;

    .dg-icon-wrapper {
      position: absolute;
      right: -20px;
      color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_80};
    }

    .item-time {
      padding-left: 5px;
      ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
      font-size: 12px;
      color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_80};
      word-break: normal;
      white-space: nowrap;
    }
    .point-wrapper {
      margin-left: auto;
      margin-right: 5px;
      width: 6px;
      margin-top: 7px;
      .point {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background-color: ${({ theme }: { theme: ThemeType }) => theme.blue};
      }
    }
  }
  &.unreaded {
    cursor: pointer;
  }
  .item-content {
    margin-top: 5px;
    ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
    font-size: 14px;
    line-height: 20px;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_80};
  }
`;

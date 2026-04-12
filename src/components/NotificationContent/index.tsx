import React, { useEffect, useState } from 'react';
import { hideNotification } from '@mantine/notifications';
import styled from 'styled-components';

import { ThemeType } from 'src/theme';
export default function NotificationContent({
  title,
  desc,
  notificationId,
}: {
  title: string;
  desc: string;
  notificationId: string;
}) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    setTimeout(() => {
      setIndex(1);
    }, 1500);
  }, []);
  useEffect(() => {
    const hide = () => {
      hideNotification(notificationId);
    };
    const item = document.getElementById(notificationId);
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    if (!item) return () => {};
    item.addEventListener('transitionEnd', hide);
    item.addEventListener('animationend', hide);
    return () => {
      item.removeEventListener('transitionEnd', hide);
      item.removeEventListener('animationend', hide);
    };
  }, [index, notificationId]);
  return (
    <StyledNotificationBody className="notification-body dg-notification-body">
      <div className="message-content">
        <div className="title">{title}</div>
        <div className="msg">{desc}</div>
      </div>
      <div className="progress">
        <div className="progress-inner" id={notificationId}></div>
      </div>
    </StyledNotificationBody>
  );
}

const StyledNotificationBody = styled.div`
  .message-content {
    padding: 19px 10px 17px 24px;
    display: flex;
    flex-direction: column;
    ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
    font-size: 14px;
    line-height: 18px;

    .title {
      margin-bottom: 4px;
      color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
    }
    .msg {
      color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_80};
    }
  }

  @keyframes move {
    0% {
      width: 99%;
    }

    100% {
      width: 0;
    }
  }
  &:hover .progress .progress-inner {
    animation-play-state: paused;
  }
  .progress {
    width: 100%;
    border-radius: 0 0 10px 10px;
    background: ${({ theme }: { theme: ThemeType }) => theme.bg_blue_10};
    .progress-inner {
      background: ${({ theme }: { theme: ThemeType }) => theme.blue};
      height: 5px;
      animation: move 3s linear;
      animation-fill-mode: forwards;
      border-radius: 0 0 0 10px;
    }
  }
`;

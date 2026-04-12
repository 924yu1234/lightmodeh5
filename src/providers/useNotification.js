import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useDocumentVisibility } from '@mantine/hooks';
import { cleanNotifications, showNotification } from '@mantine/notifications';
import PropTypes from 'prop-types';
import styled, { createGlobalStyle } from 'styled-components';

import NotificationSwapOrder from 'src/components/NotificationContent/SwapOrder';
import { useIsLessThanMinSafeHeight } from 'src/state/notification/utils';

import NotificationContent from 'js/components/NotificationContent';

const SetContext = React.createContext({
  // eslint-disable-next-line no-unused-vars
  showMobileMessage: (text) => {},
});
// 用户下单时，如果前端先收到了WS的推送，需要等待下单API的返回值，但最多等待500ms，然后才显示推送toast
const initWaitTime = 500;
export default function NotificationProvider(props) {
  const { children } = props;
  const [queue, setQueue] = useState([]);

  const [mobileMessage, setMobileMessage] = useState('');
  const documentState = useDocumentVisibility();
  const needWait = useIsLessThanMinSafeHeight();
  const waitTime = needWait ? initWaitTime : -1;
  const checkInterval = needWait ? 100 : 10;

  useEffect(() => {
    cleanNotifications();
  }, []);

  const show = useCallback(
    (params) => {
      if (documentState === 'hidden') return;
      setQueue((prevQueue) => [
        ...prevQueue,
        { ...params, timestamp: new Date().getTime() },
      ]);
    },
    [documentState]
  );

  // 检查队列，如果超过waitTime 或者没有显示trade按钮，则显示通知
  const checkQueue = useCallback(() => {
    const currentTime = new Date().getTime();

    let i = 0;
    while (i < queue.length) {
      const { title, desc, id, order, timestamp, orderType, ...rest } =
        queue[i];
      const notificationId = `${id}-${order?.statusKey}`;
      if (currentTime - timestamp >= waitTime) {
        showNotification({
          autoClose: false,
          id: notificationId,
          title: '',
          message:
            orderType && orderType === 'swap' ? (
              <NotificationSwapOrder
                order={order}
                id={id}
                notificationId={notificationId}
                {...rest}
              />
            ) : (
              <NotificationContent
                title={title}
                desc={desc}
                notificationId={notificationId}
              />
            ),
          className: 'degate-nofification degate-nofification_success',
        });
      }
      i++;
    }
    setQueue((prevQueue) => {
      if (!prevQueue?.length) return prevQueue;
      return prevQueue.filter((item) => {
        return currentTime - item.timestamp < waitTime;
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queue]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (queue.length > 0) checkQueue();
    }, checkInterval);
    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queue]);

  const showMobileMessage = useCallback((text) => {
    setMobileMessage(text);
    setTimeout(() => {
      setMobileMessage('');
    }, 2000);
  }, []);

  const val = useMemo(() => {
    return {
      show,
      showMobileMessage,
    };
  }, [show, showMobileMessage]);

  return (
    <SetContext.Provider value={val}>
      {children}
      <GlobalStyle />
      {mobileMessage && (
        <MobileMessage>
          <div className="message-inner">{mobileMessage}</div>
        </MobileMessage>
      )}
    </SetContext.Provider>
  );
}

NotificationProvider.propTypes = {
  children: PropTypes.any,
};

export function useNotification() {
  return useContext(SetContext);
}

const GlobalStyle = createGlobalStyle`
  html .mantine-Notification-root {
    display: flex;
    align-items: center;
    padding: 0;
    background: ${(props) => props.theme.bgMenu};
    background-color: ${(props) => props.theme.bgMenu};
    border-radius: 10px;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,0.50);
    ${(props) => props.theme.fontRegular};
    border: none;
    &::before {
      display: none;
    }
    &:not(:first-of-type) {
      margin-top: 12px;
    }
    
    .mantine-Notification-body {
      margin: 0;
    }
    .mantine-Notification-closeButton {
      right: 10px;
      top: 8px;
      position: absolute;
      font-size: 14px;
      color: ${(props) => props.theme.t_fff};
      &:hover {
        background: none;
      }
    }
  }
`;

const MobileMessage = styled.div`
  height: 40px;
  width: 100%;
  background: ${({ theme }) => theme.bg};
  .message-inner {
    padding: 0 10px;
    background: ${(props) => props.theme.bg_blue_20};
    white-space: nowrap;
  }
  ${(props) => props.theme.fontRegular};
  font-size: 14px;
  line-height: 40px;
  color: ${({ theme }) => theme.t_fff};
  position: fixed;
  top: 0;
  left: 0;
  z-index: 11;
`;

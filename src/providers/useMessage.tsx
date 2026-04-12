import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import ReactDOM from 'react-dom';
import styled, { keyframes } from 'styled-components';

import useWindowSize from 'src/hooks/useWindowSize';
import { useIntl } from 'src/locals';
import { logger } from 'src/utils/logger';

import IconMessageError from 'js/components/Icons/messageError';
import IconMessageSuccess from 'js/components/Icons/messageSuccess';
import IconMessageWarning from 'js/components/Icons/messageWarning';

type MessageType = 'info' | 'success' | 'error' | 'warning';

interface Message {
  text: string;
  id: number;
  type: MessageType;
  closeTime: number;
}

export interface MessageInterface {
  info: (text: string, time?: number) => void;
  error: (text: string, time?: number) => void;
  warning: (text: string, time?: number) => void;
  success: (text: string, time?: number) => void;
}

const SetContext = React.createContext<MessageInterface>({
  info: () => null,
  error: () => null,
  warning: () => null,
  success: () => null,
});

const showTime = 3000;

export function MessageProvider({ children }: { children: React.ReactNode }) {
  const [queue, setQueue] = useState<Message[]>([]);
  const intl = useIntl();
  const { width } = useWindowSize();

  useEffect(() => {
    setQueue([]);
  }, []);

  const checkQueue = useCallback(() => {
    const currentTime = Date.now();
    setQueue((prevQueue) => {
      if (!prevQueue?.length) return prevQueue;
      return prevQueue.filter((item) => item.closeTime >= currentTime);
    });
  }, []);

  useEffect(() => {
    if (!queue.length) return () => {};
    const timer = setTimeout(checkQueue, 200);
    return () => clearTimeout(timer);
  }, [queue, checkQueue]);

  const createFn = useCallback(
    (type: MessageType) => {
      return (text: string, time?: number) => {
        if (!text) return;
        let showText = text;
        if (text.includes('Loading chunk')) {
          showText = intl.common_err;
        }
        let _time = showTime;
        try {
          const length = text?.length;
          if (length > 60) {
            _time = 6000;
          } else if (length > 30) {
            _time = 4000;
          }
        } catch (error) {
          logger.error(error);
        }
        const id = Date.now();
        setQueue((pre) => [
          ...pre,
          {
            id,
            text: showText,
            type,
            closeTime: id + (time || _time),
          },
        ]);
      };
    },
    [intl]
  );

  const info = useMemo(() => {
    return createFn('info');
  }, [createFn]);
  const warning = useMemo(() => {
    return createFn('warning');
  }, [createFn]);
  const error = useMemo(() => {
    return createFn('error');
  }, [createFn]);
  const success = useMemo(() => {
    return createFn('success');
  }, [createFn]);

  const contextValue = useMemo(
    () => ({ info, error, warning, success }),
    [info, error, warning, success]
  );

  return (
    <SetContext.Provider value={contextValue}>
      {children}
      {!!queue.length &&
        ReactDOM.createPortal(
          <StyledMessage className="dg-messages" width={width}>
            {queue.map((message) => (
              <div
                className={`dg-message-item message-${message.type}`}
                key={message.id}
              >
                <div className="dg-message-inner">
                  <div className="dg-message-content">
                    <div className="dg-message-icon">
                      {message.type === 'error' && <IconMessageError />}
                      {message.type === 'warning' && <IconMessageWarning />}
                      {message.type === 'success' && <IconMessageSuccess />}
                    </div>
                    <div className="dg-message-text">{message.text}</div>
                  </div>
                </div>
              </div>
            ))}
          </StyledMessage>,
          document.body
        )}
    </SetContext.Provider>
  );
}

export default function useMessage() {
  return useContext(SetContext);
}

const fadeInAnimation = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const StyledMessage = styled.div<{ width: number }>`
  position: fixed;
  top: 10px;
  left: 0;
  z-index: 400;
  width: 100%;
  pointer-events: none;

  .dg-message-item {
    padding: 0 0 10px 0;
    text-align: center;
    animation: ${fadeInAnimation} 0.3s ease-in;
    font-family: OpenSansRegular, PingFang SC; font-weight: 400
  }
  
  .dg-message-inner {
    display: inline-block;
    padding: 15px;
    white-space: nowrap;
    background: #fff;
    margin: 0 auto;
    border-radius: 10px;
    max-width: ${({ width }: { width: number }) => {
      return width ? Math.min(width - 20, 400) : 400;
    }}px;
    .dg-message-content {
      pointer-events: all;
      display: flex;
      align-items: flex-start;
      .dg-message-icon {
        position: relative;
        top: 2px;
        margin-right: 8px;
        font-size: 16px;
        display: inline-block;
        color: inherit;
        font-style: normal;
        line-height: 0;
        text-align: center;
        text-transform: none;
        vertical-align: -0.125em;
        text-rendering: optimizelegibility;
      }
      .dg-message-text {
        color: ${({ theme }) => theme.t_000 || '#000'};
        font-size: 14px;
        line-height: 20px;
        text-align: left;
        white-space: normal;
      }
    }
  }
};`;

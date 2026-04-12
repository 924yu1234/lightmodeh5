// 通知系统
import React, { useCallback, useState } from 'react';

import { Tabs } from 'src/UI';

import { useIntl } from 'src/locals';
import {
  useReadAssetMessages,
  useReadOperationsMessages,
} from 'src/state/message/hooks';

import Close from '../Icons/close';
import IconWrapper from '../Icons/IconWrapper';
import AssetMessages from './assets';
import OperationMessages from './operations';
import { StyledMessages } from './style';
import UnreadNum from './unreadNum';
import UnreadTips from './unreadPoint';

export default function MessagesInner({
  popupHeight,
  hide,
}: {
  popupHeight: number;
  hide?: () => void;
}) {
  const intl = useIntl();
  const [type, setType] = useState('operations');
  const readOperationsMessages = useReadOperationsMessages();
  const readMessage = useReadAssetMessages();

  const readAll = useCallback(() => {
    readMessage({ ids: undefined, readAll: true });
    readOperationsMessages({ ids: undefined, readAll: true });
  }, [readOperationsMessages, readMessage]);

  return (
    <StyledMessages listHeight={popupHeight - 140}>
      <div className="messages-title">
        {intl.Notification}
        <div className="read-all" onClick={readAll}>
          {intl.read_all}
        </div>
        {!!hide && (
          <IconWrapper size={40}>
            <Close onClick={hide} />
          </IconWrapper>
        )}
      </div>
      <Tabs
        value={type}
        onChange={(val: any) => {
          setType(val);
        }}
      >
        <Tabs.List>
          <Tabs.Tab value="operations">{intl.important}</Tabs.Tab>
          <UnreadNum />
          <Tabs.Tab value="assets">
            {intl.general}
            <UnreadTips />
          </Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="operations">
          <OperationMessages />
        </Tabs.Panel>
        <Tabs.Panel value="assets">
          <AssetMessages />
        </Tabs.Panel>
      </Tabs>
    </StyledMessages>
  );
}

import React from 'react';
import styled from 'styled-components';

import { Tooltip } from 'src/UI';

import IconWrapper from 'src/components/Icons/IconWrapper';
import IconNotification from 'src/components/Icons/notification';
import { useOperationMessagesPop } from 'src/state/message/hooks';
import UpdaterAssetMessages from 'src/state/message/updater_asset';
import UpdaterOperationMessages from 'src/state/message/updater_operation';
import { ThemeType } from 'src/theme';

import MessagesPop from './pop';
import UnreadNum from './unreadNum';

export default function MessagesEntrance() {
  const popMessages = useOperationMessagesPop();
  return (
    <StyledEntrance className="messages-wrapper">
      <Tooltip
        label={<MessagesPop />}
        opened={popMessages.length > 0}
        position="bottom-end"
        withinPortal={false}
        withArrow={false}
        offset={8}
        portalProps={{
          className: 'message-tooltip',
        }}
      >
        <IconWrapper size={40}>
          <IconNotification />
        </IconWrapper>
      </Tooltip>
      <UnreadNum />
      <UpdaterOperationMessages />
      <UpdaterAssetMessages />
    </StyledEntrance>
  );
}

const StyledEntrance = styled.div`
  position: relative;
  cursor: pointer;
  .messages-num {
    position: absolute;
    top: 3px;
    left: 20px;
  }

  .mantine-Tooltip-tooltip {
    width: 400px;
    max-width: ${({ theme }: { theme: ThemeType }) => theme.viewWidth - 20}px;
    padding: 0;
  }

  .message-tooltip {
    width: 300px;
  }
`;

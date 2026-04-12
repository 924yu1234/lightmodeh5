import React from 'react';
import styled from 'styled-components';

import { useAssetMessages } from 'src/state/message/hooks';
import { ThemeType } from 'src/theme';
import { isNumber } from 'src/utils/digit';

export default function UnreadTips() {
  const { unread, list } = useAssetMessages();
  if ((unread <= 0 || !isNumber(unread)) && !list.some((l) => !l.readed))
    return null;
  return <StyledTips className="messages-tips"></StyledTips>;
}

const StyledTips = styled.div`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: ${({ theme }: { theme: ThemeType }) => theme.blue};
`;

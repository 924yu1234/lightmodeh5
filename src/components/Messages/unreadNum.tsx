import React from 'react';
import styled from 'styled-components';

import { useOperationMessages } from 'src/state/message/hooks';
import { isNumber } from 'src/utils/digit';

export default function UnreadNum() {
  const { unreadNum } = useOperationMessages({
    current: 1,
    pageSize: 10,
  });
  if (unreadNum <= 0 || !isNumber(unreadNum)) return null;
  return (
    <StyledNum className="messages-num">
      {unreadNum > 99 ? '99+' : unreadNum}
    </StyledNum>
  );
}

const StyledNum = styled.div`
  background: ${({ theme }) => theme.blue};
  border-radius: 7px;
  height: 16px;
  border-radius: 8px;
  min-width: 16px;
  line-height: 16px;
  text-align: center;
  font-size: 12px;
  color: ${({ theme }) => theme.t_fff};
  padding: 0 2px;
`;

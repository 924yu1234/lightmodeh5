import React from 'react';
import styled from 'styled-components';

import ReceiveChainSelect from 'src/components/ReceiveChainSelect';
import useWindowSize from 'src/hooks/useWindowSize';
import MReceiveHistory from 'src/mobiles/account/history/receive';
import { useChangeFlag, useUserFlag } from 'src/state/user/hooks';

export default function ReceiveHistory() {
  const { height } = useWindowSize();
  const contentHeight = height - 250;
  const receiveChain = useUserFlag('receive_history_filter_chain');
  const setReceiveChain = useChangeFlag('receive_history_filter_chain');
  return (
    <StyledReceiveHistory>
      <div className="history-header">
        <ReceiveChainSelect value={receiveChain} onChange={setReceiveChain} />
      </div>
      <MReceiveHistory height={contentHeight} />
    </StyledReceiveHistory>
  );
}

const StyledReceiveHistory = styled.div`
  .history-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    background-color: ${({ theme }) => theme.c_181818};
  }
`;

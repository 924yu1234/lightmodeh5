import React from 'react';
import styled from 'styled-components';

import {
  useIsFetchingDetails,
  useMyVaultsSorted,
} from 'src/state/intent/earn/hooks';

import Spin from 'js/components/Spin';

import Vault from './vault';

export default function EarnList() {
  const list = useMyVaultsSorted();
  const isFetchingDetail = useIsFetchingDetails();

  return (
    <Spin spinning={isFetchingDetail}>
      <StyledList>
        {list.map((d) => (
          <Vault vault={d} key={d.name} />
        ))}
      </StyledList>
    </Spin>
  );
}

export const StyledList = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100px;
  padding: 10px 0 20px;
`;

import React from 'react';
import styled from 'styled-components';

import { Button } from 'src/UI';

import Empty from 'src/components/Empty';
import useCustomNavigate from 'src/hooks/useCustomNavigate';
import { useIntl } from 'src/locals';
import {
  useIsFetchingDetails,
  useMyVaultsSorted,
} from 'src/state/intent/earn/hooks';

import Spin from 'js/components/Spin';

import Vault from './vault';

export default function SimpleEarn() {
  const list = useMyVaultsSorted();
  const isFetchingDetail = useIsFetchingDetails();
  const intl = useIntl();
  const navigate = useCustomNavigate();

  return (
    <Spin spinning={isFetchingDetail}>
      {!isFetchingDetail && list.length === 0 && (
        <Empty>
          <div className="empty-text">
            {intl.turboRange.you_have_no_position}
            <Button
              uiVariant="ghost"
              onClick={() => navigate('/earn')}
              style={{ marginTop: '15px', minWidth: '200px' }}
            >
              {intl.go_to_earn}
            </Button>
          </div>
        </Empty>
      )}
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

import React from 'react';
import styled from 'styled-components';

import Empty from 'src/components/Empty';
import { useIntl } from 'src/locals';
import {
  useIntentEarnState,
  useMyVaults,
  useVaults,
} from 'src/state/intent/earn/hooks';
import { ThemeType } from 'src/theme';

import Item from './item';
import EarnItemSkeleton from './itemSkeleton';

export default function EarnList({ type }: { type: 'all' | 'my' }) {
  const vaults = useVaults();
  const myVaults = useMyVaults();
  const list = type === 'all' ? vaults : myVaults;
  const total = list.length;
  const intl = useIntl();
  const { showLoading } = useIntentEarnState();

  return (
    <StyledList className="earn-list" id={`mobileEarnList_${type}`}>
      {showLoading ? (
        <>
          {new Array(6).fill(0).map((_, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <EarnItemSkeleton key={index} />
          ))}
        </>
      ) : (
        <>
          {list.map((d) => (
            <Item key={d.id} item={d} />
          ))}
          {!total &&
            (type === 'all' ? (
              <StyledEmpty className="dg-empty">
                <div className="empty-text">{intl.no_data}</div>
              </StyledEmpty>
            ) : (
              <Empty>
                <div className="empty-text">{intl.no_data}</div>
              </Empty>
            ))}
        </>
      )}
    </StyledList>
  );
}

const StyledList = styled.div``;

export const StyledEmpty = styled.div`
  padding: 55px 0 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .empty-text {
    font-size: 14px;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
    line-height: 24px;
    text-align: center;
    margin-bottom: 10px;
  }
`;

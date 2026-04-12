import React from 'react';
import styled from 'styled-components';

import { useFungibleUsdc } from 'src/state/swap/balances/hooks';
import { ThemeType } from 'src/theme';

import { useSendV2Data } from './sendDataProvider';
import TokenItem from './tokenItem';

export default function SendV2ChooseUsdc() {
  const { setToken, setPage } = useSendV2Data();
  const fungibleUsdc = useFungibleUsdc();

  return (
    <StyledChooseToken>
      <div className="token-list">
        {fungibleUsdc?.balances?.map((item: any) => {
          return (
            <TokenItem
              key={item.id}
              token={item}
              onClick={() => {
                if (Number(item.available) === 0) {
                  return;
                }
                setToken(item);
                setPage('address');
              }}
            />
          );
        })}
      </div>
    </StyledChooseToken>
  );
}

const StyledChooseToken = styled.div`
  padding: 10px 0 0;
  .search {
    margin-bottom: 10px;
    padding: 0 20px;
    .mantine-Input-wrapper {
      height: 36px;
    }
  }
  .token-list {
    padding: 0 20px;
    overflow-y: auto;
    max-height: ${({ theme }: { theme: ThemeType }) =>
      theme.windowHeight - 100}px;
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
`;

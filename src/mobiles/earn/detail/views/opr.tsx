import React, { useState } from 'react';
import styled from 'styled-components';

import { Tabs } from 'src/UI';

import EarnDeposit from 'src/components/Earn/deposit';
import EarnWithdraw from 'src/components/Earn/withdraw';
import { useIntl } from 'src/locals';
import { ThemeType } from 'src/theme';

export default function Opr({ id }: { id: number }) {
  const intl = useIntl();
  const [tab, setTab] = useState<'deposit' | 'withdraw'>('deposit');
  return (
    <StyledOpr>
      <Tabs value={tab} onChange={(v) => setTab(v as 'deposit' | 'withdraw')}>
        <Tabs.List>
          <Tabs.Tab value="deposit">{intl.Deposit}</Tabs.Tab>
          <Tabs.Tab value="withdraw">{intl.Withdraw}</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="deposit">
          <EarnDeposit id={id} />
        </Tabs.Panel>
        <Tabs.Panel value="withdraw">
          <EarnWithdraw id={id} />
        </Tabs.Panel>
      </Tabs>
    </StyledOpr>
  );
}

const StyledOpr = styled.div`
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.bg};
  border-top: 4px solid #030303;

  border-radius: 5px;
  padding: 0 10px;
  margin-top: 20px;
  .mantine-Tabs-root {
    height: 100%;
  }

  .mantine-Tabs-root {
    .mantine-Tabs-list {
      padding: 0;
      .mantine-Tabs-tab {
        ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
        font-size: 14px;
        display: flex;
        flex: 1;
        color: ${({ theme }: { theme: ThemeType }) => theme.t_fff_50};
        height: 44px;

        &[data-active] {
          color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
          font-size: 14px;
          @media (hover: hover) {
            &:hover {
              color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
            }
          }
        }
        & + .mantine-Tabs-tab {
          margin: 0;
        }
      }
    }
    .mantine-Tabs-panel {
      height: calc(100% - 44px);
    }
  }
`;

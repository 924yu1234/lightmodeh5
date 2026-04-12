import React, { useState } from 'react';
import queryString from 'query-string';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

import { Tabs } from 'src/UI';

import EarnDeposit from 'src/components/Earn/deposit';
import EarnWithdraw from 'src/components/Earn/withdraw';
import { useIntl } from 'src/locals';
import { ThemeType } from 'src/theme';

export default function Opr({ id }: { id: number }) {
  const intl = useIntl();
  const location = useLocation();
  const { type = 'deposit' } = queryString.parse(location.search) ?? {};
  const [tab, setTab] = useState<'deposit' | 'withdraw'>(
    (type as 'deposit' | 'withdraw') || 'deposit'
  );
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
  min-width: 375px;
  height: 100%;
  background: ${({ theme }: { theme: ThemeType }) => theme.bg_3a4259_25};
  border-radius: 5px;
  padding: 0 10px;
  min-height: 420px;

  .mantine-Tabs-root .mantine-Tabs-list {
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
        &:hover {
          color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
        }
      }
      & + .mantine-Tabs-tab {
        margin: 0;
      }
    }
  }
`;

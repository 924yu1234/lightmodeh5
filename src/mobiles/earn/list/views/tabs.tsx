import React, { useState } from 'react';
import styled from 'styled-components';

import { Tabs } from 'src/UI';

import { ThemeType } from 'src/theme';

import { useIntl } from 'js/locals';

import EarnList from './list';

// import PairsTable from './table';

export default function EarnTabs() {
  const intl = useIntl();
  const [tab, setTab] = useState<'all' | 'my'>('all');

  return (
    <StyledTopsPairs className="info-top-pairs" id="infoTopPairs">
      <Tabs
        value={tab}
        onChange={(v) => setTab(v as 'all' | 'my')}
        keepMounted={false}
      >
        <Tabs.List>
          <Tabs.Tab value="all">{intl.all}</Tabs.Tab>
          <Tabs.Tab value="my">{intl.My}</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="all">
          <EarnList type="all" />
        </Tabs.Panel>
        <Tabs.Panel value="my">
          <EarnList type="my" />
        </Tabs.Panel>
      </Tabs>
    </StyledTopsPairs>
  );
}

export const StyledTopsPairs = styled.div`
  border-top: 4px solid #030303;
  padding-top: 10px;

  .mantine-Tabs-root .mantine-Tabs-list {
    margin-bottom: 10px;
    height: 35px;
    .mantine-Tabs-tab {
      min-width: 50px;
      line-height: 30px;
      color: ${({ theme }: { theme: ThemeType }) => theme.t_fff_50};
      &.mantine-Tabs-tab[data-active] {
        color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
      }
    }
  }
`;

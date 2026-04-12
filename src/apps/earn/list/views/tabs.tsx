import React, { useState } from 'react';
import styled from 'styled-components';

import { Tabs } from 'src/UI';

import IconAllOrders from 'src/components/Icons/allOrders';
import useCustomNavigate from 'src/hooks/useCustomNavigate';

import { useIntl } from 'js/locals';

import EarnTable from './table';

export default function EarnTabs() {
  const intl = useIntl();
  const [tab, setTab] = useState<'all' | 'my'>('all');
  const navigate = useCustomNavigate();

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
          <div
            className="tabs-extra"
            onClick={() => navigate('/account/history/simple-earn')}
          >
            <IconAllOrders />
            {intl.history}
          </div>
        </Tabs.List>
        <Tabs.Panel value="all">
          <EarnTable type="all" />
        </Tabs.Panel>
        <Tabs.Panel value="my">
          <EarnTable type="my" />
        </Tabs.Panel>
      </Tabs>
    </StyledTopsPairs>
  );
}

export const StyledTopsPairs = styled.div`
  .mantine-Tabs-root .mantine-Tabs-list {
    margin-bottom: 10px;
    .mantine-Tabs-tab {
      min-width: 50px;
    }
    .tabs-extra {
      position: relative;
      top: -3px;
    }
  }
`;

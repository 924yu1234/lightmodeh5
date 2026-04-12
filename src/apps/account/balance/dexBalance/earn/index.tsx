import React from 'react';
import styled from 'styled-components';

import { Tabs } from 'src/UI';

import { useIntl } from 'src/locals';
import { useChangeFlag, useUserFlag } from 'src/state/user/hooks';

import SimpleEarn from './simpleEarn';
import TurboRangeList from './turboRange';

export default function EarnList() {
  const intl = useIntl();
  const tab = useUserFlag('earn_tab') || 'turbo-range';
  const changeTab = useChangeFlag('earn_tab');
  return (
    <StyledEarnList>
      <Tabs
        value={tab}
        onChange={(v) => changeTab(v as 'simpleEarn' | 'turbo-range')}
      >
        <Tabs.List>
          <Tabs.Tab value="turboRange">{intl.turboRange.Turbo_Range}</Tabs.Tab>
          <Tabs.Tab value="simpleEarn">{intl.turboRange.Simple_Earn}</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="simpleEarn">
          <SimpleEarn />
        </Tabs.Panel>
        <Tabs.Panel value="turboRange">
          <TurboRangeList />
        </Tabs.Panel>
      </Tabs>
    </StyledEarnList>
  );
}

const StyledEarnList = styled.div`
  .mantine-Tabs-root {
    .mantine-Tabs-list {
      display: flex;
      margin-bottom: 10px;
      height: 40px;
      align-items: center;
      .mantine-Tabs-tab {
        line-height: 39px;
        min-height: 39px;
        padding: 0;
        display: flex;
        align-items: center;
        .mantine-Tabs-tabLabel {
          white-space: normal;
          font-size: 16px;
          text-align: center;
          line-height: 16px;
        }
      }
    }
  }
  .turbo-range-list {
    padding: 0 10px;
    .item {
      max-width: 500px;
    }
  }
`;

import React from 'react';

import { PillTabs, Tabs } from 'src/UI';

import { useIntl } from 'src/locals';
import { useInvestMode, useSetInvestMode } from 'src/state/turboRange/hooks';

export default function InvestModeTab() {
  const investMode = useInvestMode();
  const setInvestMode = useSetInvestMode();
  const intl = useIntl();
  return (
    <PillTabs
      value={investMode}
      onChange={(v) => setInvestMode(v as 'single' | 'dual')}
      style={{ marginBottom: 20 }}
    >
      <Tabs.List>
        <Tabs.Tab value="single"> {intl.turboRange?.investModeSingle}</Tabs.Tab>
        <Tabs.Tab value="dual">{intl.turboRange?.investModeDual}</Tabs.Tab>
      </Tabs.List>
    </PillTabs>
  );
}

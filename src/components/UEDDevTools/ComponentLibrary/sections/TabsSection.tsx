import React, { useState } from 'react';
import styled from 'styled-components';

import { PillTabs, Tabs, UITabs } from 'src/UI';

import { ThemeType } from 'src/theme';

import ComponentCard from '../shared/ComponentCard';

export default function TabsSection() {
  const [pillTab, setPillTab] = useState<string | null>('single');
  const [uiTab, setUiTab] = useState<string | null>('overview');

  return (
    <StyledSection>
      <h2 className="section-title">Tabs</h2>

      <ComponentCard
        title="PillTabs"
        description="Pill-shaped tabs with background highlight. Most common in trade-fe."
      >
        <PillTabs fullWidth value={pillTab} onChange={setPillTab}>
          <Tabs.List>
            <Tabs.Tab value="single">Single</Tabs.Tab>
            <Tabs.Tab value="dual">Dual</Tabs.Tab>
          </Tabs.List>
        </PillTabs>
      </ComponentCard>

      <ComponentCard
        title="UITabs"
        description="Standard tabs with content panels."
      >
        <UITabs value={uiTab} onChange={setUiTab}>
          <Tabs.List>
            <Tabs.Tab value="overview">Overview</Tabs.Tab>
            <Tabs.Tab value="orders">Orders</Tabs.Tab>
            <Tabs.Tab value="history">History</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="overview" pt="md">
            <div className="panel">Overview content</div>
          </Tabs.Panel>
          <Tabs.Panel value="orders" pt="md">
            <div className="panel">Orders content</div>
          </Tabs.Panel>
          <Tabs.Panel value="history" pt="md">
            <div className="panel">History content</div>
          </Tabs.Panel>
        </UITabs>
      </ComponentCard>
    </StyledSection>
  );
}

const StyledSection = styled.div`
  .section-title {
    ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
    font-size: 22px;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
    margin: 0 0 16px;
  }
  .panel {
    padding: 16px;
    background: ${({ theme }: { theme: ThemeType }) => theme.panelBg};
    border: 1px solid ${({ theme }: { theme: ThemeType }) => theme.cardBorder};
    border-radius: 8px;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b};
    font-size: 13px;
  }
`;

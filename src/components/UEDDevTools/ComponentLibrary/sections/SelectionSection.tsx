import React, { useState } from 'react';
import styled from 'styled-components';

import { Checkbox, SegmentedControl, Switch } from 'src/UI';

import { ThemeType } from 'src/theme';

import ComponentCard from '../shared/ComponentCard';

export default function SelectionSection() {
  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(true);
  const [switch1, setSwitch1] = useState(false);
  const [switch2, setSwitch2] = useState(true);
  const [seg2, setSeg2] = useState('buy');
  const [seg3, setSeg3] = useState('month');
  const [seg4, setSeg4] = useState('all');

  return (
    <StyledSection>
      <h2 className="section-title">Selection Controls</h2>

      <ComponentCard
        title="Checkbox"
        description="Standard checkbox + radio variant via className."
      >
        <div className="row">
          <Checkbox
            checked={check1}
            onChange={(e: any) => setCheck1(e.currentTarget.checked)}
            label="Unchecked"
          />
          <Checkbox
            checked={check2}
            onChange={(e: any) => setCheck2(e.currentTarget.checked)}
            label="Checked"
          />
          <Checkbox checked disabled label="Disabled (checked)" />
          <Checkbox disabled label="Disabled (unchecked)" />
        </div>
      </ComponentCard>

      <ComponentCard title="Switch" description="Toggle switch (40x24px).">
        <div className="row">
          <Switch
            checked={switch1}
            onChange={(e: any) => setSwitch1(e.currentTarget.checked)}
            label="Off"
          />
          <Switch
            checked={switch2}
            onChange={(e: any) => setSwitch2(e.currentTarget.checked)}
            label="On"
          />
          <Switch checked disabled label="Disabled" />
        </div>
      </ComponentCard>

      <ComponentCard
        title="SegmentedControl"
        description="All variants follow ⚙ theme. Swap: Light = pill Buy/Sell; Dark = legacy bordered (swap page). Default uses dark black + b7b track only when ⚙ Dark."
        variants={[
          {
            label: 'Swap Buy / Sell',
            node: (
              <SegmentedControl
                appearance="swap"
                value={seg2}
                onChange={setSeg2}
                data={[
                  { label: 'Buy', value: 'buy' },
                  { label: 'Sell', value: 'sell' },
                ]}
              />
            ),
          },
          {
            label: '24H / 7D / 30D (compact)',
            node: (
              <SegmentedControl
                appearance="compact"
                style={{ width: 200 }}
                value={seg3}
                onChange={setSeg3}
                data={[
                  { label: '24H', value: 'day' },
                  { label: '7D', value: 'week' },
                  { label: '30D', value: 'month' },
                ]}
              />
            ),
          },
          {
            label: 'Default — follows ⚙ theme (4 segments)',
            node: (
              <SegmentedControl
                appearance="default"
                value={seg4}
                onChange={setSeg4}
                data={[
                  { label: 'All', value: 'all' },
                  { label: 'Open', value: 'open' },
                  { label: 'Filled', value: 'filled' },
                  { label: 'Cancelled', value: 'cancelled' },
                ]}
              />
            ),
          },
        ]}
      >
        <></>
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
  .row {
    display: flex;
    gap: 24px;
    align-items: center;
    flex-wrap: wrap;
  }
`;

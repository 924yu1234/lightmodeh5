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
  const [seg3, setSeg3] = useState('1d');
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
          <Checkbox checked disabled label="Disabled" />
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
        description="Pill-style button group selector."
        variants={[
          {
            label: '2 options',
            node: (
              <SegmentedControl
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
            label: '3 options',
            node: (
              <SegmentedControl
                value={seg3}
                onChange={setSeg3}
                data={[
                  { label: '1H', value: '1h' },
                  { label: '1D', value: '1d' },
                  { label: '1W', value: '1w' },
                ]}
              />
            ),
          },
          {
            label: '4 options',
            node: (
              <SegmentedControl
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

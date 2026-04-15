import React, { useState } from 'react';
import styled from 'styled-components';

import { Select } from 'src/UI';

import { ThemeType } from 'src/theme';

import ComponentCard from '../shared/ComponentCard';

const TOKENS = [
  { label: 'Ethereum (ETH)', value: 'ETH' },
  { label: 'USD Coin (USDC)', value: 'USDC' },
  { label: 'Tether (USDT)', value: 'USDT' },
  { label: 'Wrapped Bitcoin (WBTC)', value: 'WBTC' },
  { label: 'Solana (SOL)', value: 'SOL' },
];

export default function SelectSection() {
  const [val1, setVal1] = useState<string | null>('ETH');
  const [val2, setVal2] = useState<string | null>(null);
  const [val3, setVal3] = useState<string | null>(null);

  return (
    <StyledSection>
      <h2 className="section-title">Select</h2>

      <ComponentCard
        title="Select"
        description="Dropdown selector with optional search and clear."
      >
        <div className="grid">
          <div className="item">
            <span className="label">Default</span>
            <Select
              value={val1}
              onChange={setVal1}
              data={TOKENS}
              placeholder="Choose a token"
            />
          </div>
          <div className="item">
            <span className="label">Searchable</span>
            <Select
              value={val2}
              onChange={setVal2}
              data={TOKENS}
              placeholder="Search tokens..."
              searchable
            />
          </div>
          <div className="item">
            <span className="label">Clearable</span>
            <Select
              value={val3}
              onChange={setVal3}
              data={TOKENS}
              placeholder="With clear button"
              clearable
            />
          </div>
          <div className="item">
            <span className="label">Disabled</span>
            <Select data={TOKENS} placeholder="Disabled" disabled />
          </div>
        </div>
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
  .grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }
  .item {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .label {
    font-size: 11px;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_80};
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
`;

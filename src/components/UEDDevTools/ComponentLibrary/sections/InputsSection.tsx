import React, { useState } from 'react';
import styled from 'styled-components';

import { Input, Textarea } from 'src/UI';

import { ThemeType } from 'src/theme';

import ComponentCard from '../shared/ComponentCard';

export default function InputsSection() {
  const [text, setText] = useState('');
  const [textarea, setTextarea] = useState('');

  return (
    <StyledSection>
      <h2 className="section-title">Inputs</h2>

      <ComponentCard
        title="Input"
        description="Single-line text input. Use src/UI Input wrapper."
      >
        <div className="grid">
          <div className="item">
            <span className="label">Default</span>
            <Input
              placeholder="Enter amount"
              value={text}
              onChange={(e: any) => setText(e.currentTarget.value)}
            />
          </div>
          <div className="item">
            <span className="label">Disabled</span>
            <Input placeholder="Disabled" disabled />
          </div>
          <div className="item">
            <span className="label">With suffix</span>
            <Input
              placeholder="0.0"
              rightSection={<span className="suffix">USDC</span>}
            />
          </div>
          <div className="item">
            <span className="label">Error state</span>
            <Input placeholder="Invalid" className="err-border" />
          </div>
        </div>
      </ComponentCard>

      <ComponentCard title="Textarea" description="Multi-line text input.">
        <div className="grid">
          <div className="item">
            <span className="label">Default</span>
            <Textarea
              placeholder="Enter notes..."
              value={textarea}
              onChange={(e: any) => setTextarea(e.currentTarget.value)}
            />
          </div>
          <div className="item">
            <span className="label">Disabled</span>
            <Textarea placeholder="Disabled" disabled />
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
  .suffix {
    color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_80};
    font-size: 13px;
    padding-right: 8px;
  }
`;

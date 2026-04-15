import React from 'react';
import styled from 'styled-components';

import { GhostBtn, Skeleton, UISectionCard, UISectionTitle } from 'src/UI';

import { ThemeType } from 'src/theme';

import ComponentCard from '../shared/ComponentCard';

export default function DataDisplaySection() {
  return (
    <StyledSection>
      <h2 className="section-title">Data Display</h2>

      <ComponentCard
        title="SectionCard"
        description="Rounded card container with subtle background."
      >
        <UISectionCard>
          <div className="card-content">
            <strong>Card Content</strong>
            <p>This is a section card with default 12px padding.</p>
          </div>
        </UISectionCard>
      </ComponentCard>

      <ComponentCard
        title="SectionTitle"
        description="Section header with optional right element."
        variants={[
          {
            label: 'Title only',
            node: <UISectionTitle title="Portfolio Overview" />,
          },
          {
            label: 'With right element',
            node: (
              <UISectionTitle
                title="Active Positions"
                right={<GhostBtn uiSize="small">View All</GhostBtn>}
              />
            ),
          },
        ]}
      >
        <></>
      </ComponentCard>

      <ComponentCard
        title="Skeleton"
        description="Loading placeholder with shimmer animation."
      >
        <div className="grid">
          <div className="item">
            <span className="label">Text line</span>
            <Skeleton height={16} width={200} />
          </div>
          <div className="item">
            <span className="label">Circle (avatar)</span>
            <Skeleton circle width={40} height={40} />
          </div>
          <div className="item">
            <span className="label">Token icon</span>
            <Skeleton tokenIcon width={32} height={32} />
          </div>
          <div className="item">
            <span className="label">Multiple lines</span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <Skeleton height={12} width={240} />
              <Skeleton height={12} width={180} />
              <Skeleton height={12} width={210} />
            </div>
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
  .card-content {
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
    strong {
      display: block;
      margin-bottom: 4px;
    }
    p {
      margin: 0;
      font-size: 13px;
      color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_80};
    }
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

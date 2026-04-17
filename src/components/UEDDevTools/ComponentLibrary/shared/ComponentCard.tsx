import React from 'react';
import styled from 'styled-components';

import { ThemeType } from 'src/theme';

interface Props {
  title: string;
  description?: string;
  children: React.ReactNode;
  /** Optional set of variant labels with their preview elements */
  variants?: Array<{ label: string; node: React.ReactNode }>;
}

export default function ComponentCard({
  title,
  description,
  children,
  variants,
}: Props) {
  return (
    <StyledCard>
      <div className="card-header">
        <h3>{title}</h3>
        {description && <p>{description}</p>}
      </div>
      <div className="card-body">
        {children}
        {variants && variants.length > 0 && (
          <div className="variants">
            {variants.map((v) => (
              <div className="variant-item" key={v.label}>
                <span className="variant-label">{v.label}</span>
                <div className="variant-preview">{v.node}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </StyledCard>
  );
}

const StyledCard = styled.div`
  background: ${({ theme }: { theme: ThemeType }) => theme.cardBg};
  border: 1px solid ${({ theme }: { theme: ThemeType }) => theme.cardBorder};
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 24px;
  box-shadow: ${({ theme }: { theme: ThemeType }) =>
    theme.componentLibraryCardShadow};

  .card-header {
    margin-bottom: 16px;

    h3 {
      ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
      font-size: 16px;
      color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
      margin: 0 0 6px;
    }

    p {
      font-size: 13px;
      color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_80};
      margin: 0;
    }
  }

  .card-body {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .variants {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 16px;
    padding-top: 8px;
  }

  .variant-item {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .variant-label {
    font-size: 11px;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_80};
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .variant-preview {
    background: transparent;
    border: 1px dashed ${({ theme }: { theme: ThemeType }) => theme.divider};
    border-radius: 8px;
    padding: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 60px;
  }
`;

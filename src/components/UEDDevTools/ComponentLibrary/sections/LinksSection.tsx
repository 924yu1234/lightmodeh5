import React from 'react';
import styled from 'styled-components';

import IconRightOutlined from 'src/components/Icons/RightOutlined';
import { useIntl } from 'src/locals';
import { ThemeType } from 'src/theme';

import ComponentCard from '../shared/ComponentCard';

/** Swap amount row — Max pill (same tokens as global `.max-btn`). */
const MaxTextLink = styled.span`
  cursor: pointer;
  background: ${({ theme }: { theme: ThemeType }) => theme.bg_blue_10};
  border-radius: 2px;
  padding: 0 4px;
  font-size: 12px;
  line-height: 20px;
  color: ${({ theme }: { theme: ThemeType }) => theme.blue};
  height: 20px;
  display: inline-flex;
  align-items: center;
  ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
  transition: background-color 0.15s ease;

  @media (hover: hover) {
    &:hover {
      background: ${({ theme }: { theme: ThemeType }) => theme.infoBarBg};
    }
  }

  &:active {
    background: ${({ theme }: { theme: ThemeType }) =>
      theme.segmentedCompactActiveBg};
  }
`;

/** Swap / Add funds row — `StyledAddFunds` from AddFunds component. */
const AddFundsLink = styled.span`
  height: 26px;
  padding: 5px 8px;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  font-size: 14px;
  line-height: 16px;
  ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
  color: ${({ theme }: { theme: ThemeType }) => theme.blue};
  border-radius: 8px;
  .icon-right-outlined {
    color: ${({ theme }: { theme: ThemeType }) => theme.blue};
  }
  transition: background-color 0.15s ease;

  &:active {
    background: ${({ theme }: { theme: ThemeType }) =>
      theme.segmentedCompactActiveBg};
  }
  @media (hover: hover) {
    &:hover {
      background: ${({ theme }: { theme: ThemeType }) => theme.pressTint};
    }
  }
`;

const DemoRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 24px;
  padding: 12px 0;
`;

export default function LinksSection() {
  const intl = useIntl();
  return (
    <StyledSection>
      <h2 className="section-title">Text links</h2>

      <ComponentCard
        title="Swap — inline actions"
        description="Max: compact blue pill. Add Funds: blue label + chevron. Hover uses theme.pressTint (light green wash); active uses segmentedCompactActiveBg — aligned with Swap inline actions."
      >
        <DemoRow>
          <div className="pair">
            <span className="hint">Max</span>
            <MaxTextLink tabIndex={0} role="button">
              {intl.btn_max}
            </MaxTextLink>
          </div>
          <div className="pair">
            <span className="hint">Add Funds</span>
            <AddFundsLink tabIndex={0} role="button">
              {intl.Add_Funds} <IconRightOutlined />
            </AddFundsLink>
          </div>
        </DemoRow>
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

  .pair {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .hint {
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_80};
  }
`;

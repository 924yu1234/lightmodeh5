import React from 'react';
import styled from 'styled-components';

import { BuyBtn, GhostBtn, MiniBtn, PrimaryBtn, SellBtn } from 'src/UI';

import { useIntl } from 'src/locals';
import { ThemeType } from 'src/theme';

import ComponentCard from '../shared/ComponentCard';

export default function ButtonsSection() {
  const intl = useIntl();
  return (
    <StyledSection>
      <h2 className="section-title">Buttons</h2>

      <ComponentCard
        title="PrimaryBtn"
        description="Main action button. Use for the primary CTA in any view."
        variants={[
          { label: 'Default', node: <PrimaryBtn>Confirm</PrimaryBtn> },
          {
            label: 'Disabled',
            node: <PrimaryBtn disabled>Confirm</PrimaryBtn>,
          },
          {
            label: 'With tips (disabled)',
            node: (
              <PrimaryBtn withTips disabled fullWidth>
                {intl.turboRange.enter_amount_to_continue}
              </PrimaryBtn>
            ),
          },
          { label: 'Loading', node: <PrimaryBtn loading>Confirm</PrimaryBtn> },
          {
            label: 'Full Width',
            node: <PrimaryBtn fullWidth>Confirm</PrimaryBtn>,
          },
          {
            label: 'Small',
            node: <PrimaryBtn uiSize="small">Confirm</PrimaryBtn>,
          },
        ]}
      >
        <></>
      </ComponentCard>

      <ComponentCard
        title="GhostBtn"
        description="Secondary / outline action button."
        variants={[
          { label: 'Default', node: <GhostBtn>Cancel</GhostBtn> },
          { label: 'Disabled', node: <GhostBtn disabled>Cancel</GhostBtn> },
          { label: 'Loading', node: <GhostBtn loading>Cancel</GhostBtn> },
          { label: 'Small', node: <GhostBtn uiSize="small">Cancel</GhostBtn> },
        ]}
      >
        <></>
      </ComponentCard>

      <ComponentCard
        title="BuyBtn / SellBtn"
        description="Buy = green, Sell = red. Used in trading views."
        variants={[
          { label: 'Buy', node: <BuyBtn>Buy ETH</BuyBtn> },
          { label: 'Sell', node: <SellBtn>Sell ETH</SellBtn> },
          { label: 'Buy Disabled', node: <BuyBtn disabled>Buy</BuyBtn> },
          { label: 'Sell Disabled', node: <SellBtn disabled>Sell</SellBtn> },
        ]}
      >
        <></>
      </ComponentCard>

      <ComponentCard
        title="MiniBtn"
        description="Small button for inline actions (26px height)."
        variants={[
          {
            label: 'Primary',
            node: <MiniBtn variant="primary">Confirm</MiniBtn>,
          },
          { label: 'Ghost', node: <MiniBtn variant="ghost">Cancel</MiniBtn> },
          { label: 'Buy', node: <MiniBtn variant="buy">Buy</MiniBtn> },
          { label: 'Sell', node: <MiniBtn variant="sell">Sell</MiniBtn> },
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
`;

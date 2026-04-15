import React from 'react';
import styled from 'styled-components';

import {
  GhostBtn,
  UIMenu,
  UIMenuDivider,
  UIMenuDropdown,
  UIMenuItem,
  UIMenuLabel,
  UIMenuTarget,
} from 'src/UI';

import { ThemeType } from 'src/theme';

import ComponentCard from '../shared/ComponentCard';

export default function MenuSection() {
  return (
    <StyledSection>
      <h2 className="section-title">Menu</h2>

      <ComponentCard
        title="UIMenu"
        description="Dropdown menu with sections, dividers and labels."
      >
        <UIMenu>
          <UIMenuTarget>
            <GhostBtn>Open Menu</GhostBtn>
          </UIMenuTarget>
          <UIMenuDropdown>
            <UIMenuLabel>Account</UIMenuLabel>
            <UIMenuItem>Profile</UIMenuItem>
            <UIMenuItem>Settings</UIMenuItem>
            <UIMenuItem>Notifications</UIMenuItem>
            <UIMenuDivider />
            <UIMenuLabel>Actions</UIMenuLabel>
            <UIMenuItem>Export Data</UIMenuItem>
            <UIMenuItem>Help Center</UIMenuItem>
            <UIMenuDivider />
            <UIMenuItem>Sign Out</UIMenuItem>
          </UIMenuDropdown>
        </UIMenu>
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

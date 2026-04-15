import React from 'react';
import { Tabs, TabsProps } from '@mantine/core';
import styled from 'styled-components';

import { ThemeType } from 'src/theme';

export interface PillTabsProps extends TabsProps {
  tabHeight?: number;
}

const StyledTabs = styled(Tabs)<{ $tabHeight: number }>`
  .mantine-Tabs-list {
    border: none;
    border-radius: 999px;
    background: ${({ theme }: { theme: ThemeType }) => theme.pillTabsTrack};
    padding: 3px;
    gap: 0;
    &:before {
      display: none;
    }
  }

  .mantine-Tabs-tab {
    flex: 1;
    justify-content: center;
    border: none;
    border-radius: 999px;
    height: ${({ $tabHeight }: { $tabHeight: number }) => `${$tabHeight}px`};
    color: ${({ theme }: { theme: ThemeType }) => theme.pillTabsInactiveText};
    ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
    font-size: 15px;
    line-height: 20px;
    letter-spacing: 0.01em;
    padding: 0 12px;
    background: ${({ theme }) => theme.bg_transparent};
    transition: color 240ms cubic-bezier(0.25, 1, 0.5, 1),
      background 320ms cubic-bezier(0.34, 1.36, 0.64, 1);

    &[data-active] {
      color: ${({ theme }: { theme: ThemeType }) => theme.pillTabsActiveText};
      background: ${({ theme }: { theme: ThemeType }) =>
        theme.pillTabsActiveBg};
      ${({ theme }: { theme: ThemeType }) => theme.fontBold};
      font-weight: 600;
      letter-spacing: -0.01em;
      box-shadow: 0 1px 6px rgba(9, 45, 31, 0.22);
    }
  }
`;

export default function PillTabs({ tabHeight = 40, ...props }: PillTabsProps) {
  return <StyledTabs $tabHeight={tabHeight} {...props} />;
}

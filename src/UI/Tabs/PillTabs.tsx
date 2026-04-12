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
    background: ${({ theme }: { theme: ThemeType }) => theme.bg_10};
    padding: 2px;
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
    color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b};
    ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
    font-size: 16px;
    line-height: 20px;
    padding: 0 12px;
    background: ${({ theme }) => theme.bg_transparent};

    &[data-active] {
      color: ${({ theme }: { theme: ThemeType }) => theme.t_000};
      background: ${({ theme }: { theme: ThemeType }) => theme.blue};
    }
  }
`;

export default function PillTabs({ tabHeight = 40, ...props }: PillTabsProps) {
  return <StyledTabs $tabHeight={tabHeight} {...props} />;
}

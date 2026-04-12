import React from 'react';
import { Tabs, TabsProps } from '@mantine/core';
import styled from 'styled-components';

import { ThemeType } from 'src/theme';

export interface UnderlineTabsProps extends TabsProps {
  withBorder?: boolean;
}

const StyledTabs = styled(Tabs)<{ $withBorder: boolean }>`
  .mantine-Tabs-list {
    gap: 8px;
    border-bottom: ${({ $withBorder }: { $withBorder: boolean }) =>
      $withBorder ? '1px solid rgba(255, 255, 255, 0.1)' : 'none'};
  }

  .mantine-Tabs-tab {
    border: none;
    border-bottom: 2px solid transparent;
    padding: 8px 4px;
    border-radius: 0;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b};
    ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
    font-size: 14px;
    line-height: 20px;

    &[data-active] {
      color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
      border-bottom-color: ${({ theme }: { theme: ThemeType }) => theme.blue};
    }
  }
`;

export default function UnderlineTabs({
  withBorder = true,
  ...props
}: UnderlineTabsProps) {
  return <StyledTabs $withBorder={withBorder} {...props} />;
}

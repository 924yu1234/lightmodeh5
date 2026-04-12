import React from 'react';
import { Tabs as MantineTabs, TabsProps } from '@mantine/core';
import styled from 'styled-components';

import { ThemeType } from 'src/theme';

const StyledTabs = styled(MantineTabs)`
  && .mantine-Tabs-list {
    padding: 0 20px;
    flex-wrap: nowrap;
    overflow-x: auto;
    overflow-y: hidden;
  }

  && .mantine-Tabs-list::-webkit-scrollbar {
    display: none;
  }

  && .mantine-Tabs-list::before {
    border-bottom: 1px solid
      ${({ theme }: { theme: ThemeType }) => theme.innerBorder};
    inset-inline-start: 0;
    inset-inline-end: 0;
  }

  && .mantine-Tabs-tab {
    ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
    font-size: 14px;
    line-height: 20px;
    padding: 0 0 3px 0;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b};
    margin: 0;
    outline: none;
    border-radius: 0;
    border-bottom-width: 1.2px;
  }

  && .mantine-Tabs-tab[data-active] {
    color: ${({ theme }: { theme: ThemeType }) => theme.blue};
    border-color: ${({ theme }: { theme: ThemeType }) => theme.blue} !important;
  }

  && .mantine-Tabs-tab:hover {
    background: none;
    border-color: transparent !important;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
  }

  && .mantine-Tabs-tab:hover[data-active] {
    color: ${({ theme }: { theme: ThemeType }) => theme.blue};
    border-color: ${({ theme }: { theme: ThemeType }) => theme.blue} !important;
  }

  && .mantine-Tabs-tab + .mantine-Tabs-tab {
    margin: 0 0 0 30px;
  }
`;

const UITabsBase = React.forwardRef<HTMLDivElement, TabsProps>((props, ref) => (
  <StyledTabs {...props} ref={ref as any} />
));

UITabsBase.displayName = 'UITabsBase';

const UITabs = Object.assign(UITabsBase, {
  List: MantineTabs.List,
  Tab: MantineTabs.Tab,
  Panel: MantineTabs.Panel,
});

export type { TabsProps as UITabsProps };
export default UITabs;

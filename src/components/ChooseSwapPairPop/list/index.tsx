import React, { useEffect } from 'react';
import styled from 'styled-components';

import { Tabs } from 'src/UI';

import SwapFavoritePairs from 'src/components/ChoosePair/favorites/swapFavorites';
import CommonPairs from 'src/mobiles/home/list/common';
import { useHomeTabs } from 'src/mobiles/home/service';
import { useThemeParams } from 'src/theme';

import { useSetLocale } from 'js/locals';
import { useChangeFlag, useUserFlag } from 'js/state/user/hooks';

import Pairs from './pairs';

export default function ChoosePairList({ height }: { height: number }) {
  const { locale } = useSetLocale();
  const currentTab = useUserFlag('choose_swap_pair_show_tabs');
  const changeTab = useChangeFlag('choose_swap_pair_show_tabs');
  const { isMobile } = useThemeParams();
  const showTabs = useHomeTabs(isMobile ? 'Mobile' : 'PC');

  useEffect(() => {
    if (showTabs?.length) {
      if (showTabs.some((d: any) => d.tab === currentTab)) {
        return;
      }
      const defaultTab = showTabs.find((d: any) => d.isDefault);
      if (defaultTab) {
        changeTab(defaultTab?.tab);
      } else if (showTabs.some((d: any) => d.tab === 'stocks')) {
        changeTab('stocks');
      } else {
        changeTab(showTabs[0].tab);
      }
    }
  }, [showTabs, currentTab, changeTab]);

  return (
    <StyledChoosePairList className="list">
      <Tabs
        value={currentTab}
        onChange={(v) => changeTab(v)}
        keepMounted={false}
      >
        <Tabs.List>
          {showTabs.map((tab: any) => {
            const title = tab.title[locale] || tab.title['en-US'];
            return <Tabs.Tab value={tab.tab}>{title}</Tabs.Tab>;
          })}
          {/*         
          <Tabs.Tab value="favorites">{intl['trade.pair_favorite']}</Tabs.Tab>
          <Tabs.Tab value="all">{intl['m.hot']}</Tabs.Tab> */}
        </Tabs.List>
        {showTabs.map((tab: any) => {
          return (
            <Tabs.Panel value={tab.tab}>
              {tab.tab === 'hotPairs' && <Pairs height={height - 40} />}
              {tab.tab === 'favorites' && (
                <SwapFavoritePairs
                  height={height - 40}
                  needFilterChain={false}
                />
              )}
              {tab.tab !== 'hotPairs' && tab.tab !== 'favorites' && (
                <CommonPairs
                  popupHeight={height - 40}
                  type={tab.tab}
                  chain="all" // 暂时不过滤链
                />
              )}
            </Tabs.Panel>
          );
        })}
      </Tabs>
    </StyledChoosePairList>
  );
}

const StyledChoosePairList = styled.div`
  margin-top: 16px;
  .mantine-Tabs-root {
    .mantine-Tabs-list {
      .mantine-Tabs-tab {
        ${(props) => props.theme.fontMedium};
        font-size: 16px;
      }
      .mantine-Tabs-tab + .mantine-Tabs-tab {
        margin: ${(props) =>
          props.theme.isMobile ? '0 0 0 20px;' : '0 0 0 28px'};
      }
      padding: 0 0 0 0;
      margin: 0 20px 0;
    }
  }
`;

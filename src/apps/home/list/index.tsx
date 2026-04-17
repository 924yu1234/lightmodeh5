import React, { useEffect } from 'react';
import styled from 'styled-components';

import { PillTabs, Tabs } from 'src/UI';

import { useHomeTabs } from 'src/mobiles/home/service';
import { useChangeFlag, useUserFlag } from 'src/state/user/hooks';
import { ThemeType } from 'src/theme';

import { useIntl, useSetLocale } from 'js/locals';

import CommonPairsTable from './commonPairsTable';
import FavoritesTable from './favoritesTable';
import HotPairsTable from './hotTable';

export default function HomeList() {
  const intl = useIntl();
  const showTabs = useHomeTabs('PC');
  const currentTab = useUserFlag('choose_swap_pair_show_tabs');
  const changeTab = useChangeFlag('choose_swap_pair_show_tabs');
  const { locale } = useSetLocale();

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
    <StyledTopPairs className="top-list">
      <div className="section-title">{intl.Markets}</div>
      {!!showTabs?.length && (
        <div className="home-markets-tabs">
          <PillTabs
            className="home-markets-pill-tabs"
            fullWidth
            tabHeight={40}
            value={currentTab}
            onChange={(v) => {
              if (v) changeTab(v);
            }}
          >
            <Tabs.List>
              {showTabs.map((tab: any) => (
                <Tabs.Tab key={tab.tab} value={tab.tab}>
                  {tab.title[locale] || tab.title['en-US']}
                </Tabs.Tab>
              ))}
            </Tabs.List>
          </PillTabs>
        </div>
      )}
      {currentTab === 'favorites' && (
        <div className="list-content">
          <FavoritesTable />
        </div>
      )}
      {currentTab === 'hotPairs' && (
        <div className="list-content">
          <HotPairsTable />
        </div>
      )}
      {currentTab !== 'favorites' && currentTab !== 'hotPairs' && (
        <div className="list-content">
          <CommonPairsTable type={currentTab} />
        </div>
      )}
    </StyledTopPairs>
  );
}

export const StyledTopPairs = styled.div`
  margin-top: 10px;

  .home-markets-tabs {
    margin-bottom: 8px;
    width: 40%;
    max-width: 40%;

    .home-markets-pill-tabs.mantine-SegmentedControl-root {
      width: 100%;
      max-width: 100%;

      .mantine-SegmentedControl-label {
        padding: 0 12px;
        font-size: 13px;
        ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
        letter-spacing: 0.01em;
      }
    }
  }

  /* Markets tables — flat header (no gray slab); see impeccable light-mode doc */
  .dg-table-wrapper .dg-table .dg-table-thead {
    background: transparent !important;
    height: auto;
    border-bottom: 1px solid
      ${({ theme }: { theme: ThemeType }) => theme.innerBorder};

    tr th {
      border-radius: 0 !important;
      padding-top: 10px;
      padding-bottom: 10px;
      color: ${({ theme }: { theme: ThemeType }) => theme.mutedText};
      font-size: 13px;
      ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
      letter-spacing: 0.02em;
      text-transform: none;
    }
  }

  .list-content {
    margin-top: 8px;
  }

  .dg-table {
    .dg-table-thead tr th {
      line-height: 34px;
    }
    .sort-title {
      padding: 0 10px;
    }
  }
`;

export const BottomAll = styled.div`
  margin: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.t_b7b};
  font-size: 14px;
  gap: 8px;
`;

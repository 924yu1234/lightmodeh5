import React, { useEffect } from 'react';
import styled from 'styled-components';

import { useHomeTabs } from 'src/mobiles/home/service';
import { useChangeFlag, useUserFlag } from 'src/state/user/hooks';

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
      <div className="list-title">
        {showTabs.map((tab: any) => {
          const title = tab.title[locale] || tab.title['en-US'];
          return (
            <div
              className={`list-title-item ${
                currentTab === tab.tab ? 'active' : ''
              }`}
              onClick={() => changeTab(tab.tab)}
            >
              {title}
            </div>
          );
        })}
      </div>
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
  .list-title {
    display: flex;
    align-items: center;
    border-bottom: 1px solid ${(props) => props.theme.innerBorder};
    .list-title-item {
      margin-bottom: -1px;
      font-size: 14px;
      ${(props) => props.theme.fontRegular};
      cursor: pointer;
      color: ${({ theme }) => theme.t_f4f};
      line-height: 34px;
      margin-right: 40px;
      border-bottom: 1px solid transparent;
      &.active {
        color: ${(props) => props.theme.blue};
        border-bottom-color: ${(props) => props.theme.blue};
      }
    }
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

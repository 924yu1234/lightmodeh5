import React, { useEffect } from 'react';
import styled from 'styled-components';

import SwapFavoritePairs from 'src/components/ChoosePair/favorites/swapFavorites';
import {
  useChangeFlag,
  useShowMHomeDownloadBanner,
  useUserFlag,
} from 'src/state/user/hooks';
import { useThemeParams } from 'src/theme';

import { useSetLocale } from 'js/locals';

import { useHomeTabs } from '../service';
import CommonPairs from './common';
import HotsPairs from './hots';

export default function HomeList() {
  const { show } = useShowMHomeDownloadBanner();

  const { windowHeight } = useThemeParams();
  const currentTab = useUserFlag('choose_swap_pair_show_tabs');
  const changeTab = useChangeFlag('choose_swap_pair_show_tabs');
  const popupHeight = windowHeight - 80 - (show ? 44 : 0) - 52 - 38;
  const { locale } = useSetLocale();
  const showTabs = useHomeTabs('Mobile');

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
      <div className="list-title">
        {showTabs.map((tab: any) => {
          const title = tab.title[locale] || tab.title['en-US'];
          return (
            <div
              className={`list-title-item ${
                currentTab === tab.tab ? 'active' : ''
              }`}
              onClick={() => changeTab(tab.tab)}
              key={tab.tab}
            >
              {title}
            </div>
          );
        })}
      </div>
      {currentTab === 'favorites' && (
        <div className="list-content">
          <SwapFavoritePairs height={popupHeight} needFilterChain={false} />
        </div>
      )}
      {currentTab === 'hotPairs' && (
        <div className="list-content">
          <HotsPairs height={popupHeight} />
        </div>
      )}
      {currentTab !== 'favorites' && currentTab !== 'hotPairs' && (
        <div className="list-content">
          <CommonPairs
            popupHeight={popupHeight}
            type={currentTab}
            chain="all"
          />
        </div>
      )}
    </StyledTopPairs>
  );
}

export const StyledTopPairs = styled.div`
  margin-top: 10px;
  .list-title {
    padding: 0 20px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid ${(props) => props.theme.innerBorder};
    .list-title-item {
      margin-bottom: -1px;
      font-size: 18px;
      ${(props) => props.theme.fontBold};
      color: ${({ theme }) => theme.t_f4f};
      line-height: 34px;
      margin-right: 30px;
      border-bottom: 2px solid transparent;
      &.active {
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

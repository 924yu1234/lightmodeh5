import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

import { Tabs } from 'src/UI';

import useCustomNavigate from 'src/hooks/useCustomNavigate';
import IconOndo from 'src/imgs/ondo@3x.png';
import IconXStocks from 'src/imgs/xStocks@3x.png';
import { useChangeFlag, useUserFlag } from 'src/state/user/hooks';
import { ThemeType } from 'src/theme';
import digit from 'src/utils/digit';

import OndoDashboard from '../ondo/dashboard';
import { useOndo } from '../ondo/dashboard/dataProvider';
import XStocksDashboard from '../xstocks/dashboard';
import { useDailyTokenSupply } from '../xstocks/dashboard/hooks';

// 已访问过的 Tab 保持挂载，未访问过的不挂载
function useMountedTabs(activeTab: string) {
  const [mountedTabs, setMountedTabs] = useState<Set<string>>(
    () => new Set([activeTab || 'xstocks'])
  );

  useEffect(() => {
    if (activeTab && !mountedTabs.has(activeTab)) {
      setMountedTabs((prev) => new Set(prev).add(activeTab));
    }
  }, [activeTab, mountedTabs]);

  return mountedTabs;
}

export default function StocksTabs() {
  const navigate = useCustomNavigate();
  const tab = useUserFlag('stocks_tab');
  const changeTab = useChangeFlag('stocks_tab');

  const mountedTabs = useMountedTabs(tab);

  const [totalAumOndo, setTotalAumOndo] = useState<string>(
    localStorage.getItem('totalAumOndo') || ''
  );
  const [totalAumXStocks, setTotalAumXStocks] = useState<string>(
    localStorage.getItem('totalAumXStocks') || ''
  );

  const { totalAum: ondoTotalAum } = useOndo();

  const { totalAum: xStocksTotalAum } = useDailyTokenSupply();

  useEffect(() => {
    if (!ondoTotalAum) return;
    setTotalAumOndo(`${ondoTotalAum}`);
    localStorage.setItem('totalAumOndo', `${ondoTotalAum}`);
  }, [ondoTotalAum]);

  useEffect(() => {
    if (!xStocksTotalAum) return;
    setTotalAumXStocks(`${xStocksTotalAum}`);
    localStorage.setItem('totalAumXStocks', `${xStocksTotalAum}`);
  }, [xStocksTotalAum]);

  const handleChangeTab = useCallback(
    (v: string) => {
      changeTab(v);
      navigate(`/stocks/${v}`, { replace: true });
    },
    [changeTab, navigate]
  );

  return (
    <StyledStocks>
      <Tabs
        value={tab}
        onChange={(v: string | null) => v && handleChangeTab(v)}
      >
        <Tabs.List>
          <Tabs.Tab value="xstocks">
            <div className="tab-item">
              <div className="tab-item-inner">
                <img src={IconXStocks} alt="xStocks" className="icon" />
                <div className="tab-label">xStocks</div>
              </div>
              <div className="tab-item-aum">
                AUM{' '}
                <span className="tab-item-aum-value">
                  ${digit.format(totalAumXStocks, '0,0') || '--'}
                </span>
              </div>
            </div>
          </Tabs.Tab>
          <Tabs.Tab value="ondo">
            <div className="tab-item">
              <div className="tab-item-inner">
                <img src={IconOndo} alt="Ondo" className="icon icon-ondo" />
                <div className="tab-label">Ondo</div>
              </div>
              <div className="tab-item-aum">
                AUM{' '}
                <span className="tab-item-aum-value">
                  ${digit.format(totalAumOndo, '0,0') || '--'}
                </span>
              </div>
            </div>
          </Tabs.Tab>
        </Tabs.List>
      </Tabs>
      {/* 手动控制挂载：访问过的 Tab 保持挂载（display 切换），未访问过的不渲染 */}
      <div style={{ display: tab === 'xstocks' ? 'block' : 'none' }}>
        <XStocksDashboard />
      </div>
      {mountedTabs.has('ondo') && (
        <div style={{ display: tab === 'ondo' ? 'block' : 'none' }}>
          <OndoDashboard />
        </div>
      )}
    </StyledStocks>
  );
}

export const StyledStocks = styled.div`
  margin-bottom: 15px;

  .mantine-Tabs-root {
    .mantine-Tabs-list {
      display: flex;
      margin-bottom: 15px;
      padding: 0;
      align-items: center;
      .mantine-Tabs-tab {
        padding: 0;
        display: flex;
        align-items: center;
        border-bottom-width: 2px;
        .mantine-Tabs-tabLabel {
          white-space: normal;
          text-align: center;
          line-height: 16px;
        }
      }
      .mantine-Tabs-tab[data-active] {
        color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
        border-bottom: 2px solid
          ${({ theme }: { theme: ThemeType }) => theme.blue};
      }
    }
  }

  .tab-item {
    display: flex;
    align-items: center;
    cursor: pointer;
    flex-direction: column;
    position: relative;
    gap: 5px;
    height: 55px;
    min-width: ${({ theme }: { theme: ThemeType }) =>
      theme.isMobile ? '50%' : 200}px;
    .tab-item-inner {
      display: flex;
      align-items: center;
    }
    .tab-item-aum {
      ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
      color: ${({ theme }: { theme: ThemeType }) => theme.t_fff_60};
      font-size: 12px;
      display: flex;
      align-items: center;
      gap: 5px;
      .tab-item-aum-value {
        ${({ theme }: { theme: ThemeType }) => theme.fontBold};
        color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
      }
    }
    .icon {
      width: 30px;
      height: 30px;
    }
    .icon-ondo {
      ${({ theme }: { theme: ThemeType }) =>
        theme.darkMode ? '' : 'filter: brightness(0.15);'}
    }
    .tab-label {
      ${({ theme }: { theme: ThemeType }) => theme.fontBold};
      color: ${({ theme }: { theme: ThemeType }) => theme.t_fff_60};
      font-size: 20px;
    }
  }
`;

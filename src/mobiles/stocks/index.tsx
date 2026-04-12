import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import OndoDataProvider from 'src/apps/ondo/dashboard/dataProvider';
import XStocksDataProvider from 'src/apps/xstocks/dashboard/dataProvider';
import { useChangeFlag, useUserFlag } from 'src/state/user/hooks';

import Ondo from '../ondo/dashboard';
import XStocks from '../xstocks/dashboard';

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

export default function Stocks() {
  const tab = useUserFlag('stocks_tab');
  const changeTab = useChangeFlag('stocks_tab');
  const location = useLocation();
  const mountedTabs = useMountedTabs(tab);

  useEffect(() => {
    if (location.pathname.includes('ondo')) {
      changeTab('ondo');
    } else if (location.pathname.includes('xstocks')) {
      changeTab('xstocks');
    }
  }, [location.pathname, changeTab]);

  return (
    <XStocksDataProvider>
      <OndoDataProvider>
        <>
          <div style={{ display: tab === 'xstocks' ? 'block' : 'none' }}>
            <XStocks />
          </div>
          {mountedTabs.has('ondo') && (
            <div style={{ display: tab === 'ondo' ? 'block' : 'none' }}>
              <Ondo />
            </div>
          )}
        </>
      </OndoDataProvider>
    </XStocksDataProvider>
  );
}

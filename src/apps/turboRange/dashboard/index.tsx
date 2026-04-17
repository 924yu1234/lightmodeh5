/* eslint-disable react/no-danger */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import data from 'imgs/strategies.json';
import Lottie from 'lottie-react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

import { PillTabs, Tabs } from 'src/UI';

import IconStrategies from 'src/components/Icons/strategies';
import PrivateClientDeskFloatingEntry from 'src/components/PrivateClientDesk/floatingEntry';
import LightRays from 'src/components/TurboRange/lightRays';
import FAQ from 'src/components/TurboRange/modals/faq/web';
import useRefresh from 'src/hooks/useRefreshData/useRefresh';
import { useIntl } from 'src/locals';
import useCheckRegion from 'src/state/regionCheck/hooks';
import { useRefreshTurboRangePostions } from 'src/state/turboRange/hooks';
import { useThemeParams } from 'src/theme';

import { StyledDashboard } from './style';
import Account from './views/account';
import Products from './views/products';
import Strategies from './views/strategies';

const LIGHT_RAYS_COLOR_DARK = '#0f574b';

const MAIN_TABS = ['products', 'strategies', 'positions'] as const;
type MainTab = typeof MAIN_TABS[number];

const DEFAULT_MAIN_TAB: MainTab = 'products';

function parseMainTab(raw: string | null): MainTab {
  if (raw && (MAIN_TABS as readonly string[]).includes(raw)) {
    return raw as MainTab;
  }
  return DEFAULT_MAIN_TAB;
}

export default function TurboRange() {
  const intl = useIntl();
  const checkRegion = useCheckRegion();
  const refreshTurboRangePostions = useRefreshTurboRangePostions();
  const refreshIndex = useRefresh(30000);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [activeTab, setActiveTab] = useState<MainTab>(DEFAULT_MAIN_TAB);

  useEffect(() => {
    if (!searchParams.has('tab')) {
      return;
    }
    const raw = searchParams.get('tab');
    setActiveTab(parseMainTab(raw));
    const next = new URLSearchParams(searchParams);
    next.delete('tab');
    const qs = next.toString();
    navigate({ pathname, search: qs ? `?${qs}` : '' }, { replace: true });
  }, [navigate, pathname, searchParams]);

  const handleTabChange = useCallback((v: string | null) => {
    if (!v) return;
    setActiveTab(v as MainTab);
  }, []);

  useEffect(() => {
    refreshTurboRangePostions();
  }, [refreshIndex, refreshTurboRangePostions]);

  const { viewWidth, darkMode, green } = useThemeParams();
  const className = useMemo(() => {
    if (viewWidth >= 2560) {
      return 'view-2560';
    }
    if (viewWidth >= 1920) {
      return 'view-1920';
    }
    return '';
  }, [viewWidth]);

  useEffect(() => {
    checkRegion();
  }, [checkRegion]);

  return (
    <StyledDashboard className={className} id="turboRangeDashboard">
      <div className="bg">
        <LightRays
          raysOrigin="top-center"
          raysColor={darkMode ? LIGHT_RAYS_COLOR_DARK : green}
          raysSpeed={darkMode ? 0.5 : 0.35}
          lightSpread={2}
          rayLength={2}
          pulsating={false}
          fadeDistance={1}
          saturation={darkMode ? 1 : 0.42}
          noiseAmount={0}
          distortion={0}
        />
      </div>
      <div className="page-inner">
        <div className="dashboard-title">{intl.turboRange.Turbo_Range}</div>
        <div
          className="dashboard-tips"
          dangerouslySetInnerHTML={{
            __html:
              intl.turboRange
                .turbo_range_puts_your_funds_into_a_liquidity_pool_within_the_price_range_you_set_when_others_trade_in_that_range_you_earn_fees,
          }}
        ></div>
        <div className="dashboard-actions">
          <FAQ />
          <PrivateClientDeskFloatingEntry />
        </div>
        <div className="main-tabs-wrapper">
          <div className="tabs-row">
            <PillTabs
              className="main-pill-tabs"
              value={activeTab}
              onChange={handleTabChange}
              tabHeight={44}
            >
              <Tabs.List>
                <Tabs.Tab value="products">
                  {intl.turboRange.all_products}
                </Tabs.Tab>
                <Tabs.Tab value="strategies">
                  <div className="strategies-icon">
                    {activeTab === 'strategies' ? (
                      <IconStrategies size={20} />
                    ) : (
                      <div className="svg">
                        <Lottie animationData={data} loop />
                      </div>
                    )}
                  </div>
                  {intl.turboRange.strategies}
                </Tabs.Tab>
                <Tabs.Tab value="positions">
                  {intl.turboRange.my_positions}
                </Tabs.Tab>
              </Tabs.List>
            </PillTabs>
          </div>
          <div className="tab-content">
            {activeTab === 'products' && <Products />}
            {activeTab === 'strategies' && <Strategies />}
            {activeTab === 'positions' && <Account />}
          </div>
        </div>
      </div>
    </StyledDashboard>
  );
}

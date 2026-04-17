import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';

import { PillTabs, Tabs } from 'src/UI';

import PrivateClientDeskFloatingEntry from 'src/components/PrivateClientDesk/floatingEntry_m';
import FAQMobile from 'src/components/TurboRange/modals/faq/mobile';
import { useShowH5Header } from 'src/h5/utils';
import useRefresh from 'src/hooks/useRefreshData/useRefresh';
import { useIntl } from 'src/locals';
import Header from 'src/mobiles/components/header';
import { useSetTitle } from 'src/providers/useWallet';
import useCheckRegion from 'src/state/regionCheck/hooks';
import { useRefreshTurboRangePostions } from 'src/state/turboRange/hooks';

import { StyledList } from './style';
import Account from './views/account';
import Products from './views/products';
import MobileStrategies from './views/strategies';

const SCROLL_STORAGE_KEY = 'turboRangeDashboardScrollTop';

const MAIN_TAB_PRODUCTS = 'products';
const MAIN_TAB_STRATEGIES = 'strategies';

export default function TurboRangeDashboard() {
  const showH5Header = useShowH5Header();
  const intl = useIntl();
  const checkRegion = useCheckRegion();
  const setDocumentTitle = useSetTitle();
  const refreshTurboRangePostions = useRefreshTurboRangePostions();
  const refreshIndex = useRefresh(30000);
  const [searchParams, setSearchParams] = useSearchParams();

  const activeTab = useMemo(() => {
    const main = searchParams.get('main');
    return main === MAIN_TAB_STRATEGIES
      ? MAIN_TAB_STRATEGIES
      : MAIN_TAB_PRODUCTS;
  }, [searchParams]);

  const handleMainTabChange = useCallback(
    (v: string | null) => {
      if (!v) return;
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          next.set('main', v);
          if (v === MAIN_TAB_STRATEGIES && !next.get('sub')) {
            next.set('sub', 'topApy');
          }
          return next;
        },
        { replace: true }
      );
    },
    [setSearchParams]
  );

  useEffect(() => {
    refreshTurboRangePostions();
  }, [refreshIndex, refreshTurboRangePostions]);

  const lastScrollTopRef = useRef(0);

  useEffect(() => {
    setDocumentTitle('');
  }, [setDocumentTitle]);

  useEffect(() => {
    checkRegion();
  }, [checkRegion]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return () => undefined;
    }

    const container = document.getElementById('turboRangeDashboardScrollTop');
    if (!container) {
      return () => undefined;
    }

    const persist = (value: number) => {
      try {
        window.sessionStorage.setItem(SCROLL_STORAGE_KEY, String(value));
      } catch {
        // ignore write errors
      }
    };

    const restoreScrollPosition = () => {
      try {
        const cached = window.sessionStorage.getItem(SCROLL_STORAGE_KEY);
        if (cached) {
          const scrollTop = Number(cached);
          if (!Number.isNaN(scrollTop)) {
            container.scrollTop = scrollTop;
            lastScrollTopRef.current = scrollTop;
            return;
          }
        }
      } catch {
        // ignore read errors
      }
      lastScrollTopRef.current = container.scrollTop;
      persist(lastScrollTopRef.current);
    };

    const handleScroll = () => {
      lastScrollTopRef.current = container.scrollTop;
      persist(lastScrollTopRef.current);
    };

    restoreScrollPosition();
    container.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      persist(lastScrollTopRef.current);
    };
  }, []);

  return (
    <StyledList>
      {showH5Header && (
        <Header
          title={intl.turboRange.Turbo_Range}
          backUrl="/home"
          extraEle={<FAQMobile />}
        />
      )}
      <div className="page-inner" id="turboRangeDashboardScrollTop">
        <Account />
        <PillTabs fullWidth value={activeTab} onChange={handleMainTabChange}>
          <Tabs.List className="mobile-main-tabs">
            <Tabs.Tab value="products">{intl.turboRange.all_products}</Tabs.Tab>
            <Tabs.Tab value="strategies">{intl.turboRange.strategies}</Tabs.Tab>
          </Tabs.List>
        </PillTabs>
        {activeTab === 'products' && <Products />}
        {activeTab === 'strategies' && <MobileStrategies />}
      </div>
      <PrivateClientDeskFloatingEntry />
    </StyledList>
  );
}

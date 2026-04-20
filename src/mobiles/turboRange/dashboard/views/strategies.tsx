import React, { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

import { Tabs } from 'src/UI';

import { useIntl } from 'src/locals';
import { ThemeType } from 'src/theme';

import StrategyTabBestReturns from './strategyTabBestReturns';
import StrategyTabHotToday from './strategyTabHotToday';
import StrategyTabTopApy from './strategyTabTopApy';

type StrategyTab = 'topApy' | 'hotToday' | 'bestReturns';

const STRATEGY_SUB_VALUES: readonly StrategyTab[] = [
  'topApy',
  'hotToday',
  'bestReturns',
];

function parseStrategySub(raw: string | null): StrategyTab {
  if (raw && STRATEGY_SUB_VALUES.includes(raw as StrategyTab)) {
    return raw as StrategyTab;
  }
  return 'topApy';
}

export default function MobileStrategies() {
  const intl = useIntl();
  const [searchParams, setSearchParams] = useSearchParams();

  const activeTab = useMemo(
    () => parseStrategySub(searchParams.get('sub')),
    [searchParams]
  );

  const handleStrategyTabChange = useCallback(
    (v: string | null) => {
      if (!v) return;
      const nextSub = parseStrategySub(v);
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          next.set('main', 'strategies');
          next.set('sub', nextSub);
          return next;
        },
        { replace: true }
      );
    },
    [setSearchParams]
  );

  return (
    <StyledMobileStrategies>
      <Tabs value={activeTab} onChange={handleStrategyTabChange}>
        <Tabs.List className="strategy-tabs-list" grow>
          <Tabs.Tab value="topApy">{intl.turboRange.top_apy}</Tabs.Tab>
          <Tabs.Tab value="hotToday">{intl.turboRange.hot_today}</Tabs.Tab>
          <Tabs.Tab value="bestReturns">
            {intl.turboRange.best_returns}
          </Tabs.Tab>
        </Tabs.List>
      </Tabs>

      {activeTab === 'topApy' && <StrategyTabTopApy />}
      {activeTab === 'hotToday' && <StrategyTabHotToday />}
      {activeTab === 'bestReturns' && <StrategyTabBestReturns />}
    </StyledMobileStrategies>
  );
}

const StyledMobileStrategies = styled.div`
  .mantine-Tabs-root .mantine-Tabs-list {
    border-bottom: 1px solid ${({ theme }) => theme.bg_white_10};
    padding: 0 20px;
    .mantine-Tabs-tab {
      padding: 0 5px;
      font-size: 14px;
      height: 40px;
      padding: 0;
      border-bottom: 2px solid transparent;
      ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
      &[data-active] {
        border-bottom: 2px solid
          ${({ theme }: { theme: ThemeType }) => theme.blue};
      }
    }
  }
  .strategy-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .empty-state {
    text-align: center;
    padding: 40px 0;
    color: ${({ theme }: { theme: ThemeType }) =>
      theme.darkMode ? theme.t_fff_60 : theme.mutedText};
    font-size: 14px;
  }
`;

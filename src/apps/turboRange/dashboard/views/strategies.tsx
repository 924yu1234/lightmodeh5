import React, { useState } from 'react';
import styled from 'styled-components';

import { Tabs } from 'src/UI';

import { useIntl } from 'src/locals';
import { ThemeType } from 'src/theme';

import StrategyTabBestReturns from './strategyTabBestReturns';
import StrategyTabHotToday from './strategyTabHotToday';
import StrategyTabTopApy from './strategyTabTopApy';

type StrategyTab = 'topApy' | 'hotToday' | 'bestReturns';

export default function Strategies() {
  const intl = useIntl();
  const [activeTab, setActiveTab] = useState<StrategyTab>('topApy');

  return (
    <StyledStrategies className="strategies-tpl">
      <Tabs
        value={activeTab}
        onChange={(v: string | null) => v && setActiveTab(v as StrategyTab)}
      >
        <Tabs.List className="strategy-tabs-list">
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
    </StyledStrategies>
  );
}

const StyledStrategies = styled.div`
  padding: 0;

  .strategy-tabs-list {
    margin-bottom: 20px;
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

  .strategy-cards {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    min-height: 200px;
    align-content: start;
  }

  .empty-state {
    grid-column: 1 / -1;
    text-align: center;
    padding: 60px 0;
    color: ${({ theme }: { theme: ThemeType }) =>
      theme.darkMode ? theme.t_fff_60 : theme.mutedText};
    font-size: 14px;
  }

  .strategy-card {
    background: ${({ theme }: { theme: ThemeType }) => theme.cardBg};
    border: 1px solid ${({ theme }: { theme: ThemeType }) => theme.cardBorder};
    border-radius: 10px;
    padding: 20px 24px;
    box-shadow: ${({ theme }: { theme: ThemeType }) =>
      theme.darkMode ? 'none' : theme.componentLibraryCardShadow};
    transition: transform 0.2s ease, box-shadow 0.2s ease,
      background-color 0.2s ease;

    @media (hover: hover) {
      &:hover {
        transform: translateY(-4px);
        background: ${({ theme }: { theme: ThemeType }) => theme.infoBarBg};
        box-shadow: ${({ theme }: { theme: ThemeType }) =>
          theme.darkMode ? 'none' : theme.primaryBtnHoverShadow};
      }
    }

    @media (prefers-reduced-motion: reduce) {
      transition: none;
      @media (hover: hover) {
        &:hover {
          transform: none;
        }
      }
    }

    &.skeleton {
      min-height: 200px;
      .skeleton-line {
        height: 14px;
        background: ${({ theme }) => theme.bg_white_10};
        border-radius: 4px;
        margin-bottom: 12px;
        &.w60 {
          width: 60%;
        }
        &.w100 {
          width: 100%;
        }
        &.w40 {
          width: 40%;
        }
        &.w80 {
          width: 80%;
        }
      }
    }
  }

  .card-header {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 12px;

    .card-name {
      ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
      color: ${({ theme }: { theme: ThemeType }) =>
        theme.darkMode ? theme.t_fff : theme.ink};
      font-size: 16px;
      line-height: 22px;
    }

    .card-duration {
      margin-left: auto;
      font-size: 12px;
      line-height: 18px;
      color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_60};
      padding: 2px 8px;
      border-radius: 10px;
    }
  }

  .card-primary {
    margin: 14px 0;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    gap: 10px;
    background: ${({ theme }: { theme: ThemeType }) => theme.bg_buy_10};
    padding: 12px 16px;

    .primary-label {
      font-size: 14px;
      line-height: 20px;
      color: ${({ theme }: { theme: ThemeType }) =>
        theme.darkMode ? theme.t_fff_60 : theme.mutedText};
    }

    .primary-value {
      font-size: 14px;
      line-height: 20px;
      ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
      color: ${({ theme }: { theme: ThemeType }) => theme.green};
    }
  }

  .card-secondary {
    display: flex;
    gap: 20px;
    margin-bottom: 16px;

    .secondary-item {
      flex: 1;
      .secondary-label {
        font-size: 12px;
        line-height: 18px;
        color: ${({ theme }: { theme: ThemeType }) =>
          theme.darkMode ? theme.t_fff_60 : theme.mutedText};
        margin-bottom: 2px;
      }
      .secondary-value {
        font-size: 14px;
        line-height: 20px;
        ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
        color: ${({ theme }: { theme: ThemeType }) =>
          theme.darkMode ? theme.t_fff : theme.ink};
      }
    }
  }

  .card-actions {
    display: flex;
    gap: 15px;
    .dg-primary,
    .dg-ghost {
      height: 36px;
      min-height: 36px;
      flex: 1;
    }
  }
`;

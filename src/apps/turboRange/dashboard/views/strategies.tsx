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
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff_60};
    font-size: 14px;
  }

  .strategy-card {
    background-image: linear-gradient(
      0deg,
      rgba(255, 255, 255, 0.01) -102.86%,
      rgba(255, 255, 255, 0.1) 165%
    );
    border-radius: 10px;
    padding: 20px 24px;
    transition: all 0.2s ease;

    &:hover {
      transform: translateY(-4px);
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
      color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
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
    background: #50e4a219;
    padding: 12px 16px;

    .primary-label {
      font-size: 14px;
      line-height: 20px;
      color: ${({ theme }: { theme: ThemeType }) => theme.t_fff_60};
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
        color: ${({ theme }: { theme: ThemeType }) => theme.t_fff_60};
        margin-bottom: 2px;
      }
      .secondary-value {
        font-size: 14px;
        line-height: 20px;
        ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
        color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
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

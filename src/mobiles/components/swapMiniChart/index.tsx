import React, { useRef } from 'react';
import styled from 'styled-components';

import IconDown from 'src/components/Icons/downIcon';
import TvSwapResolutions from 'src/components/tv/swapResolutions';
import { useToggleWalletTradeBtn } from 'src/state/application/hooks';
import { useCurrentSwapPair } from 'src/state/swap/pair/hooks';
import { ThemeType } from 'src/theme';

import { useIntl, useSetLocale } from 'js/locals';
import { useChangeFlag, useUserFlag } from 'js/state/user/hooks';

import TradingView from './tradeview';

export default function MiniSwapChart() {
  const intl = useIntl();
  const tradingViewRef = useRef();
  const resolution = useUserFlag('swap_chart_resolution');
  const setResolution = useChangeFlag('swap_chart_resolution');
  const { market } = useCurrentSwapPair();
  const { locale } = useSetLocale();
  const hidedMiniChart = useUserFlag('m_hide_mini_chart');
  const changeFlag = useChangeFlag('m_hide_mini_chart');
  const toogleWalletTrade = useToggleWalletTradeBtn();

  const changePeriod = (_period: any) => {
    setResolution(_period);
  };

  return (
    <StyledChart>
      {hidedMiniChart ? (
        <div className="mini-chart-title">
          {intl.MARKET_Chart.replace('MARKET', market)}
          <div
            className="icon"
            onClick={() => {
              toogleWalletTrade(true);
              changeFlag(false);
              setTimeout(() => {
                toogleWalletTrade(false);
              }, 300);
            }}
          >
            <IconDown />
          </div>
        </div>
      ) : (
        <>
          <div className="mini-chart-title borderB">
            <TvSwapResolutions value={resolution} onChange={setResolution} />
            <div
              className="icon rotate"
              onClick={() => {
                toogleWalletTrade(true);
                changeFlag(true);
                setTimeout(() => {
                  toogleWalletTrade(false);
                }, 300);
              }}
            >
              <IconDown />
            </div>
          </div>
          <TradingView
            key={locale}
            changePeriod={changePeriod}
            resolution={resolution}
            chartType={1}
            tradingViewRef={tradingViewRef}
          />
        </>
      )}
    </StyledChart>
  );
}

const StyledChart = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 0 0;
  background: ${(props) => props.theme.bg};
  margin-bottom: 10px;
  border-top: 1px solid
    ${({ theme }: { theme: ThemeType }) => theme.innerBorder};
  border-bottom: 1px solid
    ${({ theme }: { theme: ThemeType }) => theme.innerBorder};
  .mini-chart-title {
    &.borderB {
      border-bottom: 1px solid
        ${({ theme }: { theme: ThemeType }) => theme.innerBorder};
      padding-left: 5px;
    }
    ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
    font-size: 14px;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b};
    display: flex;
    align-items: center;
    padding: 0 0 0 15px;
    height: 30px;
    .icon {
      height: 100%;
      padding-right: 15px;
      flex: 1;
      margin-left: 40px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      .icon-down {
        margin-left: auto;
      }
      &.rotate {
        .icon-down {
          transform: rotate(180deg);
        }
      }
    }
  }
  #mini_swap_tradeview {
    height: 190px;
  }
`;

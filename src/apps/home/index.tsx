import React, { useEffect, useState } from 'react';
import top from 'imgs/banner_airdrop_top_2.svg';
import styled from 'styled-components';

import { fetchConfigs } from 'src/state/application/service';
import { ThemeType, useThemeParams } from 'src/theme';

import Banner from './banner';
import HomeList from './list';
import Airdrops from './views/airdrops';
import Earn from './views/earn';
import Stocks from './views/stocks';
import TurboRange from './views/turboRange';

export default function Home() {
  const { viewWidth } = useThemeParams();
  const width = viewWidth > 1120 ? 1120 : viewWidth - 40;

  const [configs, setConfigs] = useState([]);

  useEffect(() => {
    fetchConfigs('homeCards_Web').then((res) => {
      setConfigs(res);
    });
  }, []);

  const cardSize = 260;

  return (
    <StyledHome width={width}>
      <div className="home-inner">
        <Banner width={width - 40} />
        <div className="views-container">
          {configs.map((item: any) => (
            <div key={item.key}>
              {item.key === 'turboRange' && (
                <TurboRange config={item} cardSize={cardSize} />
              )}
              {item.key === 'stocks' && (
                <Stocks config={item} cardSize={cardSize} />
              )}
              {item.key === 'earn' && (
                <Earn config={item} cardSize={cardSize} />
              )}
              {item.key === 'airdrops' && (
                <Airdrops config={item} cardSize={cardSize} />
              )}
            </div>
          ))}
        </div>
        <HomeList />
      </div>
    </StyledHome>
  );
}

const StyledHome = styled.div<{ width: number }>`
  height: 100%;
  background: ${({ theme }) => theme.bg};
  overflow: hidden;
  background-image: url(${top});
  background-repeat: no-repeat;
  background-position: center top;
  background-size: 100%
    ${({ theme }: { theme: ThemeType }) => (theme.viewWidth / 1690) * 329}px;
  padding: 30px 0;

  .page-inner {
    padding: 0 20px;
    max-width: 1120px;
    margin: 0 auto;
  }

  .section-title {
    ${(props) => props.theme.fontMedium};
    color: ${({ theme }: { theme: ThemeType }) =>
      theme.darkMode ? theme.t_fff : theme.ink};
    font-size: 20px;
    line-height: 24px;
    margin-bottom: 20px;
    letter-spacing: 0.01em;
  }
  .home-inner {
    width: ${({ width }) => width}px;
    padding: 0 20px 30px;
    margin: 40px auto 0;
  }

  .views-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 30px 20px;
    margin-bottom: 60px;
    .item-title {
      font-size: 20px;
      line-height: 24px;
      ${({ theme }) => theme.fontMedium};
      color: ${({ theme }: { theme: ThemeType }) =>
        theme.darkMode ? theme.t_fff : theme.ink};
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      letter-spacing: 0.01em;
      .title-more {
        display: flex;
        font-size: 12px;
        line-height: 20px;
        cursor: pointer;
        ${({ theme }) => theme.fontMedium};
        color: ${({ theme }: { theme: ThemeType }) =>
          theme.darkMode ? theme.t_fff_60 : theme.mutedText};
        align-items: center;
        gap: 4px;
        transition: color 150ms ease;
        &:hover {
          color: ${({ theme }) => theme.blue};
          .icon-right-outlined {
            color: ${({ theme }) => theme.blue};
          }
        }
      }
    }
  }
`;

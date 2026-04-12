import top from 'imgs/banner_airdrop_top_2.svg';
import bg from 'imgs/turbo_rang_bg.png';
import styled, { css } from 'styled-components';

import { ThemeType } from 'src/theme';

export const StyledDetail2560 = css`
  .detail-inner {
    max-width: 2155px;
    .go_back {
      font-size: 18px;
    }
  }
  .invest-content {
    grid-template-columns: 1fr 465px;

    .chart-container {
      height: 1200px;
      padding-top: 22px;
      .chart-top {
        padding: 0 30px 15px;
        min-height: 70px;
        .token-title {
          font-size: 26px;
        }
        .token-price {
          font-size: 26px;
          margin-left: 10px;
        }
        .token-price-change {
          font-size: 14px;
        }
      }
      .spin-root {
        height: 1140px;
      }
    }
    .invest-wrapper {
      height: 1200px;
    }
  }
`;

export const StyledDetail1920 = css`
  .detail-inner {
    max-width: 1575px;
  }
  .invest-content {
    grid-template-columns: 1fr 465px;

    .chart-container {
      height: 800px;
      padding-top: 22px;
      .chart-top {
        padding: 0 30px 15px;
        min-height: 50px;
        .token-title {
          font-size: 26px;
        }
        .token-price {
          font-size: 26px;
          margin-left: 10px;
        }
        .token-price-change {
          font-size: 14px;
        }
      }
      .spin-root {
        height: 760px;
      }
    }
    .invest-wrapper {
      height: 800px;
    }
  }
`;

export const StyledDetail = styled.div`
  background: ${({ theme }) => theme.bg};
  overflow: hidden;
  height: 100%;
  background-image: url(${top});
  background-repeat: no-repeat;
  background-position: center top;
  background-size: 100%
    ${({ theme }: { theme: ThemeType }) => (theme.viewWidth / 1690) * 329}px;

  .detail-inner {
    margin: 15px auto 0;
    max-width: 1230px;
    position: relative;
    z-index: 1;
  }

  .bg {
    z-index: 0;
    position: absolute;
    bottom: 0;
    left: 0;
    width: ${({ theme }: { theme: ThemeType }) => theme.viewWidth}px;
    height: ${({ theme }: { theme: ThemeType }) =>
      (theme.viewWidth / 1369) * 513}px;
    background-image: url(${bg});
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-position: center bottom;
  }

  .go_back {
    ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
    font-size: 14px;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_80};
    line-height: 20px;
    display: flex;
    width: 100%;
    height: 100%;
    .go_back_inner {
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 2px;
    }
  }

  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 20px;
    line-height: 24px;
    height: 74px;
    display: flex;
    padding: 0 30px;
    align-items: center;
    ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
  }

  .invest-content {
    display: grid;
    grid-template-columns: 1fr 415px;
    gap: 20px;
    margin: 25px auto 0;

    .chart-container {
      height: 680px;
      overflow: hidden;
      background: ${({ theme }) => theme.bg_main_80};
      border-radius: 8px;
      padding-top: 22px;
      .chart-top {
        padding: 0 30px 15px;
        .token-title {
          font-size: 20px;
        }
        .token-price {
          font-size: 20px;
          margin-left: 10px;
        }
        .token-price-change {
          font-size: 14px;
        }
      }
      .spin-root {
        height: 610px;
        width: 100%;
        .spin-inner {
          padding-bottom: 40px;
        }
        .spin-container {
          height: 100%;
          width: 100%;
        }
      }
    }
    .invest-wrapper {
      background: ${({ theme }) => theme.bg_main_80};
      border-radius: 8px;
      height: 680px;
      position: relative;
      overflow: hidden;
      .invest-slider {
        display: flex;
        width: 200%;
        height: 100%;
        transform: translateX(0);
        transition: transform 0.3s ease;
      }
      .invest-slider[data-has-modal='true'] {
        transform: translateX(-50%);
      }
      .invest-panel {
        width: 50%;
        height: 100%;
        flex-shrink: 0;
      }
      .invest-panel.modal {
        position: relative;
      }
      .invest-wrapper-inner {
        border-radius: 8px;
        padding: 0 0 22px;
        width: 100%;
        height: 100%;
        .turbo-range-invest {
          padding: 0 30px;
          height: calc(100% - 75px);
          overflow: auto;
        }
      }
      .invest-apy {
        margin-bottom: 0;
      }
    }
  }

  &.view-2560 {
    ${StyledDetail2560}
  }
  &.view-1920 {
    ${StyledDetail1920}
  }
`;

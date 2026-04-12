import styled from 'styled-components';

import { ThemeType } from 'src/theme';

export const StyledXStocksDetail = styled.div`
  height: 100%;
  display: flex;
  align-items: flex-start;

  background-color: ${({ theme }) => theme.bg};

  overflow: hidden;
  position: relative;

  .detail-inner {
    flex: 1;
    position: relative;
    z-index: 1;
    margin: 0 auto;
    padding: 15px 20px 40px 30px;
  }

  .go_back {
    ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
    font-size: 12px;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_80};
    cursor: pointer;
    line-height: 20px;
    display: flex;
    align-items: center;
    gap: 2px;
    margin-bottom: 20px;
  }

  .detail-content {
    display: flex;
    gap: 20px;
    .detail-content-left {
      width: 280px;
      .btns {
        display: flex;
        gap: 10px;
        margin-top: 20px;
      }
    }
    .detail-content-right {
      flex: 1;
      .charts-container {
        background-color: ${({ theme }) => theme.bg};
        margin-top: -40px;
        padding-top: 20px;
        z-index: 1;
        position: relative;
        display: flex;
        flex-direction: ${({ theme }: { theme: ThemeType }) =>
          theme.windowWidth < 1280 ? 'column' : 'row'};
        gap: 20px;
        .chart-item {
          flex: 1;
        }
      }
    }
  }
  .detail-content-portfolio {
    &.open {
      width: 300px;
    }
    height: 100%;
    padding-left: 20px;
    display: flex;
    align-items: flex-start;
    background-color: ${({ theme }: { theme: ThemeType }) => theme.bg_05};
    position: relative;
    .icon-container {
      background-color: ${({ theme }: { theme: ThemeType }) => theme.bg_05};
      height: 46px;
      width: 32px;
      position: absolute;
      left: -32px;
      top: 0px;
      z-index: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 5px 0 0 5px;
      cursor: pointer;
    }
  }
`;

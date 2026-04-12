import styled from 'styled-components';

import { ThemeType } from 'src/theme';

export const StyledXStocksDetail = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: ${(props) => (!props.theme.showH5Header ? 0 : 52)}px;

  background-color: ${({ theme }) => theme.bg};

  overflow: hidden;
  position: relative;

  .detail-inner {
    position: relative;
    height: ${(props) =>
      props.theme.windowHeight - (!props.theme.showH5Header ? 0 : 52)}px;
    overflow: hidden auto;
    z-index: 1;
    margin: 0 auto;
    width: 100%;
    padding: 0 10px 30px;
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

  .charts-container {
    background-color: ${({ theme }) => theme.bg};
    margin-top: -40px;
    padding-top: 20px;
    z-index: 1;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 20px;
    .chart-item {
      flex: 1;
    }
  }

  .btns {
    display: flex;
    gap: 10px;
    margin-top: 20px;
  }
`;

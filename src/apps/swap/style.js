import styled, { css } from 'styled-components';

// width > 1920
export const StyledFullView = css`
  position: relative;
  min-height: 100%;
  display: grid;
  grid-template-columns: ${(props) => props.theme.viewWidth - 320 - 1}px 320px;
  grid-template-rows: 50px 460px 1fr 410px;
  background: ${(props) => props.theme.tradeBg};
  grid-template-areas:
    'chart placeorder'
    'chart placeorder'
    'chart placeorder'
    'orders placeorder';

  gap: 1px;
  .box-shadow {
    background: ${(props) => props.theme.bg};
    width: 100%;
    height: 100%;
    border-radius: 12px;
    border: 1px solid ${(props) => props.theme.innerBorder};
    box-sizing: border-box;
    overflow: hidden;
    box-shadow: ${(props) =>
      props.theme.darkMode ? 'none' : props.theme.componentLibraryCardShadow};
  }
  .area-top {
    grid-area: top;
    position: absolute;
    top: 0;
    left: 0;
    height: 50px;
    width: 100%;
    border-bottom: 1px solid ${(props) => props.theme.tradeBg};
  }
  .my-order {
    grid-area: orders;
    z-index: 1;
  }
  .chart-container {
    padding-top: 50px;
    margin-bottom: -40px;
    position: relative;
    grid-area: chart;
  }
  .trade-right {
    grid-area: placeorder;
  }
`;

export const StyledMiniView = css`
  position: relative;
  min-height: 100%;
  display: grid;
  grid-template-columns: ${(props) => props.theme.viewWidth - 300 - 1}px 300px;
  grid-template-rows: 50px 460px 1fr 410px;
  background: ${(props) => props.theme.tradeBg};
  grid-template-areas:
    'chart placeorder'
    'chart placeorder'
    'chart placeorder'
    'orders placeorder';

  gap: 1px;
  .box-shadow {
    background: ${(props) => props.theme.bg};
    width: 100%;
    height: 100%;
    border-radius: 12px;
    border: 1px solid ${(props) => props.theme.innerBorder};
    box-sizing: border-box;
    overflow: hidden;
    box-shadow: ${(props) =>
      props.theme.darkMode ? 'none' : props.theme.componentLibraryCardShadow};
  }
  .area-top {
    grid-area: top;
    position: absolute;
    top: 0;
    left: 0;
    height: 50px;
    width: 100%;
    border-bottom: 1px solid ${(props) => props.theme.tradeBg};
  }
  .my-order {
    grid-area: orders;
    z-index: 1;
  }
  .chart-container {
    padding-top: 50px;
    margin-bottom: -40px;
    position: relative;
    grid-area: chart;
  }
  .trade-right {
    grid-area: placeorder;
  }
`;

export const StyledView = styled.div`
  &.MiniView {
    ${StyledMiniView}
  }
  &.FullView {
    ${StyledFullView}
  }
  .chart-container {
    .spin-root {
      height: 100%;
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
  .my-order {
    z-index: 2;
  }
  .iframe-error-message {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-bottom: 40px;
    color: ${({ theme }) => theme.t_b7b};
  }
`;

export const StyledToken = styled.div`
  display: flex;
  align-items: center;
  .token-icon {
    margin-right: 4px;
  }
`;

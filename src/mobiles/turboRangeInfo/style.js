import styled from 'styled-components';

export const StyledChart = styled.div`
  background: ${(props) => props.theme.bg};
  position: relative;
  padding-top: ${(props) => (!props.theme.showH5Header ? 0 : 52)}px;

  .chart-top {
    display: flex;
    align-items: center;
    gap: 5px;
    padding: 0 20px 0;
    margin-bottom: 10px;
    ${({ theme }) => theme.fontMedium};
    line-height: 20px;

    .token-title {
      font-size: 18px;
      color: ${({ theme }) => theme.t_fff};
    }
    .token-price {
      font-size: 14px;
      color: ${({ theme }) => theme.t_fff};
      margin-left: 5px;
    }
    .token-price-change {
      font-size: 14px;
      color: ${({ theme }) => theme.t_fff};
    }
    .dg-icon-wrapper2 {
      margin-left: auto;
      &.refresh-rotating {
        .dg-icon {
          color: ${({ theme }) => theme.blue};
        }
        animation: refresh-rotate 0.6s linear;
      }
    }
  }

  .page-inner {
    height: ${(props) =>
      props.theme.windowHeight - (!props.theme.showH5Header ? 0 : 52)}px;
    width: ${(props) => props.theme.windowWidth}px;
    overflow: hidden auto;
    display: flex;
    padding-bottom: 36px;
    flex-direction: column;

    .loader {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 0;
    }
    .iframe-container {
      z-index: 1;
      flex: 1;
    }
    iframe {
      width: 100%;
      height: 100%;
      z-index: 1;
      flex: 1;
      position: relative;
    }
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

  .btns {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    min-height: 66px;
    background: ${(props) => props.theme.bg_main_80};
    box-shadow: 0px 4px 12px 0px rgba(255, 255, 255, 0.15);
    padding: 10px 15px 20px;
    display: flex;
    z-index: 1;
    .dg-primary {
      flex: 1;
    }
  }

  @keyframes refresh-rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

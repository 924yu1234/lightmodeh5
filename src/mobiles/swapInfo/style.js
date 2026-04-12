import styled from 'styled-components';

export const StyledChart = styled.div`
  background: ${(props) => props.theme.bg};
  position: relative;
  padding-top: ${(props) => (props.isApp ? 0 : 52)}px;

  .page-inner {
    height: ${(props) => props.theme.windowHeight - (props.isApp ? 0 : 52)}px;
    width: ${(props) => props.theme.windowWidth}px;
    overflow: ${(props) => (props.isFullScreen ? '123' : 'hidden auto')};
    padding-bottom: ${(props) => (props.isApp ? 0 : 36)}px;
    display: flex;
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

  .swap-pair-more-info {
    padding: 0 10px;
  }

  .s-chart {
    border-bottom: 4px solid #030303;
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
    padding: 10px 0 20px 15px;
    display: flex;
    z-index: 1;
    .dg-primary {
      flex: 1;
      margin-right: 15px;
    }
  }
`;

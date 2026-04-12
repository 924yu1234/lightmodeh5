import styled from 'styled-components';

const sidePadding = '10px';

export const StyledSwap = styled.div`
  width: 100%;
  height: ${(props) => props.theme.windowHeight}px;
  background: ${(props) => props.theme.bg};
  padding-bottom: 80px;
  padding-top: 52px;
  position: relative;

  .trading-maintenance {
    justify-content: flex-start;
    padding-top: 200px;
  }

  .maker-free {
    position: absolute;
    bottom: 90px;
    left: 0;
    width: 100%;
    padding: 0 10px;
  }

  .page-inner {
    width: ${(props) => props.theme.windowWidth}px;
    height: ${(props) => props.theme.windowHeight - 132}px;
    overflow: hidden auto;
    .order-warpper {
      padding: 0 ${sidePadding};
    }
    .orders {
      padding: 0 ${sidePadding};
    }
  }

  .top {
    padding: 0 90px 0 ${sidePadding};
    background: ${(props) => props.theme.bg};
    position: absolute;
    top: 0;
    left: 0;
    height: 52px;
    z-index: 1;
    width: 100%;
  }
  .center {
    padding: 0 ${sidePadding} 10px;
    background: ${(props) => props.theme.bg};
    display: flex;
    align-items: flex-start;
    .placeOrder {
      flex: 1;
    }
    .orderBook {
      margin-left: 5px;
      min-width: 145px;
      width: 39%;
    }
  }
  .settings {
    background: ${(props) => props.theme.bg};
    padding: 0 ${sidePadding} 25px;
  }
  .orders {
    border-top: 4px solid #030303;
    padding: 0 0 20px;
    background: ${(props) => props.theme.bg};
  }
`;

export const StyledToken = styled.div`
  display: flex;
  align-items: center;
  .token-icon {
    margin-right: 4px;
  }
`;

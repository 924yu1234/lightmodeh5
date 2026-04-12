import styled, { createGlobalStyle } from 'styled-components';

export const StyledRightbar = styled.div`
  padding: 17px 18px 55px;
  position: relative;
  min-height: 100%;

  .icon-close {
    margin-left: auto;
    margin-bottom: 17px;
  }
  .mantine-Button-root {
    width: 100%;
    margin-bottom: 10px;
  }
  .updating {
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
    ${({ theme }) => theme.fontRegular};
    font-size: 14px;
    color: ${({ theme }) => theme.blue};
    background: ${({ theme }) => theme.bg};
    margin-bottom: 10px;
    justify-content: center;
    border-radius: 5px;
    padding: 0 10px;
    .icon-reset {
      margin-left: 5px;
    }
  }
  .menu-wrapper {
    position: relative;
    border-bottom: 0.5px solid rgba(183, 189, 198, 0.15);
    .hide {
      display: none;
    }
    .show {
      display: block;
    }
  }
  .menu-item {
    width: 100%;
    height: 60px;
    line-height: 40px;
    ${({ theme }) => theme.fontRegular};
    font-size: 16px;
    color: ${({ theme }) => theme.t_f4f};
    display: flex;
    align-items: center;

    .dg-icon {
      margin-right: 3px;
      color: ${({ theme }) => theme.t_b7b_60};
    }

    .icon-right-outlined,
    .icon-up-outlined {
      margin-left: auto;
      font-size: 14px;
    }
    &.last-child {
      border-bottom: 0.5px solid rgba(183, 189, 198, 0.15);
    }
  }

  .menu-item-child {
    width: 100%;
    height: 60px;
    line-height: 40px;
    ${({ theme }) => theme.fontRegular};
    font-size: 16px;
    opacity: 0.8;
    color: ${({ theme }) => theme.t_b7b};
    display: flex;
    align-items: center;
    gap: 10px;
    padding-left: 40px;
    .dg-choose {
      display: flex;
      align-items: center;
      width: 20px;
      margin-right: 16px;
    }
  }

  .bottom-btns {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    margin-top: auto;
    display: flex;
    ${({ theme }) => theme.fontRegular};
    font-size: 14px;
    line-height: 24px;
    color: ${({ theme }) => theme.t_b7b};
    margin-bottom: 20px;
    padding: 0 15px;
    .btn {
      flex: 1;
      display: flex;
      align-items: center;
      height: 40px;
      justify-content: center;
      background: ${({ theme }) => theme.bg_f5f5f5_10};
      border-radius: 5px;

      &.btn-switch {
        margin-right: 10px;
      }
    }
  }
`;

export const GlobalRightbar = createGlobalStyle`
  .m-right-bar .mantine-Drawer-inner {
    right: 0;
    max-width: ${(props) => props.theme.windowWidth * 0.8}px;
    width: 275px;
    .mantine-Drawer-content {
      height: 100%;
    }
    .mantine-Drawer-body {
      height: 100%;
    }
  }
`;

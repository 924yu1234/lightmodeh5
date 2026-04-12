import styled, { createGlobalStyle } from 'styled-components';

export const StyledLeftbar = styled.div`
  padding: 17px 18px 55px;
  position: relative;
  min-height: 100%;

  .logos {
    min-height: 20px;
    .logo {
      height: 16px;
    }
    .globalHeader-beta {
      width: 36px;
      margin-left: 2px;
      margin-top: 2px;
    }
  }
  .icon-close {
    margin-right: auto;
    margin-bottom: 17px;
  }
  .mantine-Button-root {
    width: 100%;
    margin-bottom: 10px;
    margin-top: 20px;
  }
  .updating {
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
    ${({ theme }) => theme.fontRegular};
    font-size: 14px;
    color: ${({ theme }) => theme.blue};
    background: ${(props) => props.theme.bg_10};
    margin-bottom: 10px;
    justify-content: center;
    border-radius: 5px;
    padding: 0 10px;
    .icon-reset {
      margin-left: 5px;
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
    border-top: 0.5px solid rgba(183, 189, 198, 0.15);
    border-bottom: 0.5px solid rgba(183, 189, 198, 0.15);
    .dg-icon {
      margin-right: 16px;
    }

    .icon-right-outlined,
    .icon-up-outlined {
      margin-left: auto;
      font-size: 14px;
    }
    &.last-child {
      border-bottom: 1px solid ${(props) => props.theme.innerBorder};
    }
  }
  .language-select {
    border-bottom: 1px solid ${(props) => props.theme.innerBorder};
  }

  .menu-item-child {
    width: 100%;
    height: 60px;
    line-height: 40px;
    ${({ theme }) => theme.fontRegular};
    font-size: 16px;
    color: ${({ theme }) => theme.t_f4f};
    display: flex;
    align-items: center;
    padding-left: 5px;
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
      height: 46px;
      justify-content: center;
      background: ${({ theme }) => theme.bg_f5f5f5_10};
      border-radius: 5px;

      &.btn-switch {
        margin-right: 10px;
      }
    }
  }
`;

export const GlobalLeftbar = createGlobalStyle`
  .m-left-bar .mantine-Drawer-inner {
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

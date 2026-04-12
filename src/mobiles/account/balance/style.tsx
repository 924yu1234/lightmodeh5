import styled from 'styled-components';

import { ThemeType } from 'src/theme';

import { isBuggySticky } from 'js/utils/browser';

export const StyledBalance = styled.div`
  padding-top: 52px;
  .page-inner {
    height: ${(props) => props.theme.windowHeight - 52 - 80}px;
    width: ${(props) => props.theme.windowWidth}px;
    overflow: hidden auto;
  }

  .mantine-Tabs-root {
    .mantine-Tabs-list {
      padding: 0 20px;
      height: 42px;
      .mantine-Tabs-tab {
        padding-top: 10px;
        line-height: 30px;
        ${({ theme }) => theme.fontBold};
        font-size: 18px;
        &.mantine-Tabs-tab[data-active] {
          ${({ theme }) => theme.fontBold};
          color: ${(props) => props.theme.t_fff};
        }
      }
      .tabs-inner {
        display: flex;
        align-items: center;
        ${(props) => props.theme.fontMedium};
        .wallet-icon,
        .icon-DexBalance {
          margin-right: 6px;
        }
      }
    }
  }
  .dg-empty {
    margin-top: 50px;
  }
`;

export const StyledAccountAsset = styled.div`
  .excessive-balance-tips-entry {
    height: 44px;
    padding: 0 5px;
    margin-top: 10px;
    .excessive-balance-tips-entry-content {
      background: ${({ theme }) => theme.bg_black};
      border: 1px solid ${({ theme }) => theme.border_b7b_30};
      border-radius: 4px;
    }
  }
  .total-asset {
    padding: 0 20px;
    ${({ theme }: { theme: ThemeType }) => theme.fontBold};
    font-size: 24px;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
  }
  .balance-tabs {
    display: flex;
    align-items: flex-end;
    .balance-tab {
      width: 50%;
      flex: 1;
      height: 55px;
      background: ${({ theme }: { theme: ThemeType }) => theme.bg_05};
      box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.03);
      border-radius: 5px 5px 0px 0px;
      cursor: pointer;
      position: relative;

      .balance-tab-title {
        ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
        font-size: 16px;
        color: ${({ theme }: { theme: ThemeType }) => theme.t_f4f};
        line-height: 24px;
        text-align: center;
        display: flex;
        align-items: center;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        width: 100%;
      }
      &.active {
        height: 60px;
        padding-top: 5px;
        background: ${({ theme }) => theme.bg};

        &::before {
          height: 5px;
          width: 100%;
          position: absolute;
          content: '';
          top: 0;
          left: 0;
          background: ${({ theme }: { theme: ThemeType }) => theme.bg_blue_80};
          border-radius: 5px 5px 0px 0px;
        }
      }
      &:last-child {
        margin-right: 0;
      }
    }
  }
  .balances-tpl {
    background: ${(props) => props.theme.modalBg};
    width: 100%;
    padding: 15px;
    min-height: ${(props) => props.theme.windowHeight - 340}px;
  }
  .table-tpl {
    padding: 4px 0 14px;
    width: 100%;
    .search-tpl {
      display: flex;
      align-items: center;
      padding: 10px 20px 10px;
      position: ${isBuggySticky() ? 'relative' : 'sticky'};
      top: 0;
      background: ${({ theme }) => theme.bg};
      z-index: 2;

      .manage-entry {
        width: 40px;
        min-width: 40px;
        height: 40px;
        margin-left: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b};
      }

      .mantine-Input-wrapper {
        margin-right: auto;
        .mantine-Input-input {
          border-radius: 18px;
          flex: 1;
          height: 36px;

          width: 166px;
          height: 36px;
          padding-left: 40px;
          font-size: 14px;
          ${(props) => props.theme.fontRegular};
          .mantine-Input-icon {
            width: 40px;
            .search-icon {
              width: 16px;
            }
          }
        }
      }
    }
  }
`;

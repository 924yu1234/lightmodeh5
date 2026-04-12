import styled from 'styled-components';

import { ThemeType } from 'src/theme';

export const StyledAccountAsset = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  .balance-tabs {
    display: flex;
    align-items: flex-end;
    .balance-tab {
      width: 210px;
      margin-right: 5px;
      height: 65px;
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
      &::after {
        height: 3px;
        width: 100%;
        position: absolute;
        content: '';
        bottom: 0;
        left: 0;
        background: ${({ theme }: { theme: ThemeType }) => theme.bg};
      }
      &.active {
        height: 70px;
        padding-top: 5px;
        background: ${({ theme }: { theme: ThemeType }) => theme.bg_05};

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
        &::after {
          background: ${({ theme }) => theme.bg_transparent};
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
    margin-top: 15px;
    width: 100%;
    .dg-spin-nested-loading .dg-spin-spinning {
      min-height: 300px;
    }
    .dg-empty {
      display: none;
    }
    .search-tpl {
      display: flex;
      align-items: center;
      .mantine-Input-wrapper {
        width: 350px;
        height: 30px;
        margin-right: 15px;
        .mantine-Input-input {
          height: 30px;
          min-height: 30px;
          font-size: 14px;
          border-radius: 20px;
        }

        .mantine-Input-icon {
          .search-icon {
            width: 16px;
          }
        }
      }
    }
    .dg-table {
      .dg-table-placeholder {
        visibility: hidden;
      }
      margin-top: 20px;
      .add_token_to_metamask_icon {
        visibility: hidden;
      }
      .dg-table-cell-row-hover {
        .add_token_to_metamask_icon {
          visibility: visible;
        }
      }
    }
  }
`;

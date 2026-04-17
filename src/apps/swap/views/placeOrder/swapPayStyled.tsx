import styled from 'styled-components';

import { Popover } from 'src/UI';

import { ThemeType } from 'src/theme';

import { swapPayInnerShell } from './swapPayShell';

export const StyledSwapInputs = styled.div`
  margin-top: 10px;
  min-height: 88px;

  .swap-input-inner {
    ${swapPayInnerShell};
  }

  ${({ theme }: { theme: ThemeType }) => theme.fontRegular};

  .pay-title {
    font-size: 13px;
    line-height: 18px;
    margin-bottom: 6px;
    ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
    color: ${({ theme }: { theme: ThemeType }) =>
      theme.darkMode ? theme.t_b7b_60 : theme.green};
  }

  .pay-content {
    display: flex;
    align-items: center;
    margin-bottom: 12px;
    line-height: 36px;
    .pay-vol {
      font-size: 18px;
      color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_50};
      width: 100%;
      .rc-input-affix-wrapper {
        height: 28px;
        background: ${({ theme }) => theme.bg_transparent};
        padding: 0;
        &:hover {
          border-color: ${({ theme }) => theme.border_transparent};
          &.err-border {
            border-color: ${({ theme }) => theme.border_transparent};
          }
          &.rc-input-affix-wrapper-focused,
          &.rc-input-affix-wrapper:focus {
            border-color: ${({ theme }) => theme.border_transparent};
            &.err-border {
              border-color: ${({ theme }) => theme.border_transparent};
            }
          }
        }
        .rc-input {
          font-size: 18px;
          ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
        }
        .rc-input::placeholder {
          color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_50};
          opacity: 1;
        }
        .rc-input-suffix {
          font-size: 18px;
          color: ${({ theme }: { theme: ThemeType }) => theme.t_f4f};
        }
        &.rc-input-affix-wrapper-focused,
        &.rc-input-affix-wrapper:focus {
          border-color: ${({ theme }) => theme.border_transparent};
          &.err-border {
            border-color: ${({ theme }) => theme.border_transparent};
          }
        }
      }
    }
    .pay-symbol {
      margin-left: 4px;
      font-size: 18px;
      color: ${({ theme }: { theme: ThemeType }) => theme.t_f4f};
    }
  }

  .pay-footer {
    display: flex;
    align-items: center;
    font-size: 13px;
    line-height: 20px;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_60};
    .base_value {
      color: ${({ theme }: { theme: ThemeType }) => theme.mutedText};
    }
    .balance {
      display: flex;
      align-items: center;
      margin-left: auto;
      .balance-num {
        margin: 0 4px;
      }
      .loader {
        margin: 0 4px;
      }
    }
  }
`;

export const StyledDropdown = styled(Popover.Dropdown)`
  &.mantine-Popover-dropdown {
    padding-right: 45px;
    .dg-icon-wrapper {
      position: absolute;
      top: 0;
      right: 0;
    }
  }
`;

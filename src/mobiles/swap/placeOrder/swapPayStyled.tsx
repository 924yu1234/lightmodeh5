import styled from 'styled-components';

import { ThemeType } from 'src/theme';

/** Mobile swap pay inputs — shared by `payBase` / `payQuote` (keeps styled helper out of component modules to avoid parse issues). */
export const StyledSwapInputs = styled.div`
  margin-top: 15px;
  margin-bottom: 10px;
  min-height: 88px;
  .swap-input-inner {
    background: ${({ theme }) => theme.bg_white_10};
    border-radius: 5px;
    border: 1px solid ${({ theme }) => theme.border_transparent};
    min-height: 85px;
    padding: 8px 12px;
    @media (hover: hover) {
      &:hover {
        border-color: ${(props) => props.theme.inputHoverBorder};
      }
    }
    &.focus {
      border-color: ${({ theme }: { theme: ThemeType }) =>
        theme.inputFocusBorder};
    }
    &.err-border {
      border-color: ${({ theme }: { theme: ThemeType }) => theme.red};
    }
  }
  ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
  .pay-title {
    font-size: 13px;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_60};
    line-height: 18px;
  }
  .pay-content {
    display: flex;
    align-items: center;
    margin-bottom: 8px;
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
    .balance {
      margin-left: auto;
      display: flex;
      align-items: center;
      .balance-num {
        margin: 0 4px;
      }
      .loader {
        margin: 0 4px;
      }
    }
  }
`;

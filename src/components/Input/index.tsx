import React from 'react';
import RcInput, { InputProps } from 'rc-input';
import styled from 'styled-components';

import { ThemeType } from 'src/theme';

import IconDelete from '../Icons/delete';

const Input = React.forwardRef((props: InputProps, ref) => {
  const { className, allowClear, value, suffix, ...reset } = props;
  return (
    <StyledInput
      className={`${className} dg-input`}
      {...reset}
      value={value}
      allowClear={allowClear && !!value ? { clearIcon: <IconDelete /> } : false}
      suffix={suffix ? <div>{suffix}</div> : <div></div>}
      ref={ref as any}
    />
  );
});

Input.displayName = 'Input';

export default Input;

export const StyledInput = styled(RcInput)`
  &.rc-input,
  .rc-input {
    outline: none;
    margin: 0;
    font-variant: tabular-nums;
    list-style: none;
    font-feature-settings: 'tnum';
    position: relative;
    display: inline-block;
    width: 100%;
    min-width: 0;
    font-size: 14px;
    color: ${({ theme }: { theme: ThemeType }) => theme.input};

    line-height: 1.2;
    transition: all 0.3s;
    text-align: left;

    background: ${({ theme }: { theme: ThemeType }) => theme.bg_white_10};
    border: 1px solid
      ${({ theme }: { theme: ThemeType }) => theme.border_transparent};
    border-radius: 5px;

    height: 40px;
    padding: 0 12px;

    &:focus {
      border-color: ${({ theme }: { theme: ThemeType }) => theme.border_blue};
      border-right-width: 1px;
      outline: 0;
    }
    &.err-border {
      border-color: ${({ theme }) => theme.sell};
    }
  }
  &.rc-input-affix-wrapper {
    color: ${({ theme }) => theme.t_f4f};
    display: inline-flex;
    font-size: 14px;
    line-height: 1.2;
    min-width: 0;
    position: relative;
    transition: all 0.3s;
    width: 100%;
    -webkit-box-align: center;
    align-items: center;
    background: ${({ theme }: { theme: ThemeType }) => theme.bg_white_10};
    border: 1px solid
      ${({ theme }: { theme: ThemeType }) => theme.border_transparent};
    border-radius: 5px;
    padding: 0 12px;
    height: 40px;

    input.rc-input {
      border: none;
      outline: none;
      background: none;
      padding: 0;
      border-radius: 0;
    }
    &.err-border,
    &.rc-input-affix-wrapper-disabled.err-border {
      border-color: ${({ theme }) => theme.sell};
    }
  }

  &.rc-input-affix-wrapper::placeholder {
    user-select: none;
  }

  &.rc-input-affix-wrapper:placeholder-shown {
    text-overflow: ellipsis;
  }

  &.rc-input-affix-wrapper:hover {
    border-color: ${(props: { theme: ThemeType }) =>
      props.theme.inputHoverBorder};
    border-right-width: 1px;
    &.err-border {
      border-color: ${(props: { theme: ThemeType }) => props.theme.red};
    }
    &.rc-input-affix-wrapper-focused,
    &.rc-input-affix-wrapper:focus {
      border-color: ${(props: { theme: ThemeType }) =>
        props.theme.inputFocusBorder};
      &.err-border {
        border-color: ${(props: { theme: ThemeType }) => props.theme.red};
      }
    }
  }

  &.rc-input-affix-wrapper-focused,
  &.rc-input-affix-wrapper:focus {
    border-color: ${(props: { theme: ThemeType }) =>
      props.theme.inputFocusBorder};
    border-right-width: 1px;
    outline: 0;
    &.err-border {
      border-color: ${(props: { theme: ThemeType }) => props.theme.red};
    }
    .rc-input-suffix .icon-delete {
      display: block;
    }
  }

  .rc-input-prefix {
    margin-right: 4px;
    & + input.rc-input {
      text-align: right;
    }
  }
  .rc-input-suffix {
    margin-left: 7.5px;
    min-width: auto;
    text-align: right;
    justify-content: flex-end;
    .rc-input-clear-icon + * {
      margin-left: 5px;
    }
    .icon-delete {
      display: none;
    }
  }

  .rc-input-prefix,
  .rc-input-suffix {
    ${(props: { theme: ThemeType }) => props.theme.fontRegular};
    align-items: center;
    display: flex;
    flex: none;
    font-weight: 500;
    color: ${({ theme }) => theme.t_f4f};
    font-size: 14px;
  }
  .rc-input-prefix {
    color: ${(props: { theme: ThemeType }) => props.theme.t_b7b_80};
  }

  &.rc-input-affix-wrapper-disabled {
    box-shadow: none;
    cursor: default;
    color: ${(props: { theme: ThemeType }) => props.theme.t_b7b_60};
    opacity: 1;
    background: ${({ theme }: { theme: ThemeType }) => theme.bg_white_10};
    border-color: ${({ theme }) => theme.border_151_25};
    border-radius: 5px;
  }

  &.rc-input-affix-wrapper.rc-input-affix-wrapper-disabled {
    background: ${(props) => props.theme.bg_white_10} !important;
    border: 1px solid ${(props) => props.theme.border_0e0f12};
    cursor: not-allowed;
    &:hover {
      border: 1px solid ${(props) => props.theme.border_0e0f12};
    }
    input:disabled {
      cursor: not-allowed;
      color: ${(props: { theme: ThemeType }) => props.theme.t_b7b_60};
    }
    .rc-input-suffix {
      color: ${(props: { theme: ThemeType }) => props.theme.t_b7b_60};
    }
  }

  &.rc-input-affix-wrapper-disabled:hover {
    border-color: ${({ theme }) => theme.border_151_25};
  }

  &.rc-input-affix-wrapper[disabled] {
    background-color: ${({ theme }) => theme.bg_f5f5f5};
    border-color: ${({ theme }) => theme.border_d9d9d9};
    box-shadow: none;
    color: ${(props) => props.theme.t_000_25};
    cursor: not-allowed;
    opacity: 1;
  }

  &.rc-input-affix-wrapper[disabled]:hover {
    border-color: ${({ theme }) => theme.border_d9d9d9};
    border-right-width: 1px;
  }

  &.rc-input-affix-wrapper-borderless,
  &.rc-input-affix-wrapper-borderless-disabled,
  &.rc-input-affix-wrapper-borderless-focused,
  &.rc-input-affix-wrapper-borderless:focus,
  &.rc-input-affix-wrapper-borderless:hover,
  &.rc-input-affix-wrapper-borderless[disabled] {
    background-color: ${({ theme }: { theme: ThemeType }) =>
      theme.bg_transparent};
    border: none;
    box-shadow: none;
  }
`;

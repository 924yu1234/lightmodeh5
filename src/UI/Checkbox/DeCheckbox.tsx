import React from 'react';
import { Checkbox, CheckboxProps } from '@mantine/core';
import styled, { css } from 'styled-components';

import { ThemeType } from 'src/theme';

interface CheckBoxProps extends CheckboxProps {
  showHoverBg?: boolean;
  height?: number;
}

const DeCheckbox = React.forwardRef<HTMLInputElement, CheckBoxProps>(
  (props, ref) => {
    const { checked, showHoverBg, className, height, ...rest } = props;
    return (
      <StyledCheckbox
        {...rest}
        ref={ref as any}
        height={height}
        className={`${className ?? ''} ${showHoverBg ? 'showHoverBg' : ''}`}
        checked={checked}
      />
    );
  }
) as React.ForwardRefExoticComponent<
  CheckBoxProps & React.RefAttributes<HTMLInputElement>
> & {
  Group: typeof Checkbox.Group;
};

DeCheckbox.displayName = 'DeCheckbox';
DeCheckbox.Group = Checkbox.Group;

const CssPc = css<{ height?: number }>`
  padding: 0 7px;
  min-height: ${({ height }: { height?: number }) => height || 30}px;
  display: inline-flex;
  border-radius: 6px;
  &:hover {
    background: ${({ theme }) => theme.bg_white_10};
  }
`;

const StyledCheckbox = styled(Checkbox)<{ height?: number }>`
  &.mantine-Checkbox-root {
    .mantine-Checkbox-body {
      align-items: center;
      width: 100%;
    }
    .mantine-Checkbox-inner {
      width: 16px;
      height: 16px;
      .mantine-Checkbox-input {
        width: 16px;
        height: 16px;
        background: none;
        border-radius: 2px;
        cursor: pointer;
        &:checked {
          background-color: ${(props) => props.theme.bg_177ddc};
          border-color: ${(props) => props.theme.border_177ddc};
        }
        &:disabled {
          cursor: not-allowed;
          background-color: ${({ theme }: { theme: ThemeType }) =>
            theme.checkboxDisabledBg} !important;
          border-color: ${({ theme }: { theme: ThemeType }) =>
            theme.checkboxDisabledBorder} !important;
        }
        &:disabled:checked {
          background-color: ${({ theme }: { theme: ThemeType }) =>
            theme.checkboxDisabledCheckedBg} !important;
          border-color: ${({ theme }: { theme: ThemeType }) =>
            theme.checkboxDisabledCheckedBorder} !important;
        }
      }
      .mantine-Checkbox-inner
        .mantine-Checkbox-input:disabled
        ~ .mantine-Checkbox-icon {
        color: ${({ theme }: { theme: ThemeType }) =>
          theme.checkboxDisabledIcon} !important;
      }
    }
    .mantine-Checkbox-labelWrapper {
      width: 100%;
    }
    .mantine-Checkbox-label {
      cursor: pointer;
      ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
      color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
      font-size: 12px;
      line-height: 20px;
      padding-left: 8px;
    }
    &.showHoverBg {
      ${CssPc}
    }

    &:hover .mantine-Checkbox-label {
      color: ${({ theme }) => theme.t_fff};
    }
    .mantine-Checkbox-label {
      color: ${({ checked, theme }: any) =>
        checked ? '#fff' : theme.t_b7b_60};
      user-select: none;
      &[data-disabled] {
        color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_50};
        cursor: default;
      }
    }
    &.dg-ratio .mantine-Checkbox-body {
      .mantine-Checkbox-inner {
        .mantine-Checkbox-input {
          border-radius: 50%;
          border-color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_60};
          &:checked {
            background-color: ${({ theme }: { theme: ThemeType }) =>
              theme.green};
            border-color: ${({ theme }: { theme: ThemeType }) => theme.green};
          }
          &:disabled {
            cursor: not-allowed;
            background-color: ${({ theme }: { theme: ThemeType }) =>
              theme.checkboxDisabledBg} !important;
            border-color: ${({ theme }: { theme: ThemeType }) =>
              theme.checkboxDisabledBorder} !important;
          }
          &:disabled:checked {
            background-color: ${({ theme }: { theme: ThemeType }) =>
              theme.checkboxDisabledCheckedBg} !important;
            border-color: ${({ theme }: { theme: ThemeType }) =>
              theme.checkboxDisabledCheckedBorder} !important;
          }
        }
        .mantine-Checkbox-icon {
          color: ${({ theme }: { theme: ThemeType }) => theme.t_000};
        }
        .mantine-Checkbox-input:disabled ~ .mantine-Checkbox-icon {
          color: ${({ theme }: { theme: ThemeType }) =>
            theme.checkboxDisabledIcon} !important;
        }
      }
    }
  }
`;

export default DeCheckbox;

import React from 'react';
import { TextInput, TextInputProps } from '@mantine/core';
import styled from 'styled-components';

import { ThemeType } from 'src/theme';

/** TextInput（InputBase）会把 props 传到原生 input；低阶 Input 的根是包装层，不支持 onTouchMove 等 */
const StyledInput = styled(TextInput)`
  .mantine-Input-input {
    height: 40px;
    border-radius: 5px;
    ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
    border: 1px solid ${({ theme }) => theme.border_transparent};
    font-size: 14px;
    color: ${({ theme }: { theme: ThemeType }) => theme.input};
    background: ${({ theme }: { theme: ThemeType }) => theme.inputBackground};
    min-height: auto;

    height: 40px;
    flex: 1;
    border-radius: 5px;
    ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
    border: 1px solid ${({ theme }) => theme.border_transparent};
    font-size: 14px;
    color: ${({ theme }: { theme: ThemeType }) => theme.input};
    background: ${({ theme }: { theme: ThemeType }) => theme.inputBackground};
    font-variant: normal;
    font-feature-settings: normal;
    min-height: auto;
    &:focus,
    &:focus-within {
      box-shadow: none;
      border-color: ${({ theme }: { theme: ThemeType }) =>
        theme.inputFocusBorder};
    }
    &:hover {
      box-shadow: none;
      border-color: ${({ theme }: { theme: ThemeType }) =>
        theme.inputHoverBorder};

      &:focus,
      &:focus-within {
        border-color: ${({ theme }: { theme: ThemeType }) =>
          theme.inputFocusBorder};
      }
    }
    &.mantine-Input-disabled {
      border-color: ${({ theme }) => theme.border_151_25};
      opacity: 1;
      cursor: default;
    }
    &::placeholder {
      color: ${({ theme }: { theme: ThemeType }) => theme.placeholder};
    }
  }
  .mantine-Input-icon {
    padding-left: 12px;
    justify-content: flex-start;
  }
  .mantine-Input-section {
    ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
    color: ${({ theme }: { theme: ThemeType }) => theme.input};
    font-size: 14px;
    margin-left: 7.5px;
    display: flex;
    padding-right: 12px;
    justify-content: flex-end;
    pointer-events: unset;
    height: 100%;
  }
  &.err-border .mantine-Input-input {
    border-color: ${(props) => props.theme.border_sell_important} !important;
  }
  &.small .mantine-Input-input {
    height: 20px;
    width: 34px;
    font-size: 12px;
    margin-right: 10px;
    padding: 2px 6px;
    line-height: 14px;
    min-height: auto;
  }
`;

export type UIInputProps = TextInputProps & {
  ref?: React.RefObject<HTMLInputElement>;
};

const UIInput = React.forwardRef<HTMLInputElement, UIInputProps>(
  ({ onTouchMove, onTouchStart, ...rest }, ref) => {
    return (
      <StyledInput
        ref={ref as any}
        {...rest}
        onTouchMove={(e: React.TouchEvent<HTMLInputElement>) => {
          e.stopPropagation();
          onTouchMove?.(e);
        }}
        onTouchStart={(e: React.TouchEvent<HTMLInputElement>) => {
          e.stopPropagation();
          onTouchStart?.(e);
        }}
      />
    );
  }
);

UIInput.displayName = 'UIInput';

export default UIInput;

import React from 'react';
import { Textarea, TextareaProps } from '@mantine/core';
import styled from 'styled-components';

import { ThemeType } from 'src/theme';

export type UITextareaProps = TextareaProps;

const StyledTextarea = styled(Textarea)`
  && .mantine-Input-input {
    height: 40px;
    border-radius: ${({ theme }: { theme: ThemeType }) =>
      theme.darkMode ? '5px' : '8px'};
    ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
    border: 1px solid
      ${({ theme }: { theme: ThemeType }) =>
        theme.darkMode ? theme.inputDefaultBorder : theme.cardBorder};
    font-size: 14px;
    color: ${({ theme }: { theme: ThemeType }) => theme.input};
    background: ${({ theme }: { theme: ThemeType }) =>
      theme.darkMode ? theme.inputBackground : theme.cardBg};
    box-shadow: ${({ theme }: { theme: ThemeType }) =>
      theme.darkMode ? 'none' : theme.componentLibraryCardShadow};
    min-height: auto;
    transition: border-color 150ms ease, box-shadow 150ms ease,
      background-color 150ms ease;
  }

  && .mantine-Input-input:focus,
  && .mantine-Input-input:focus-within {
    border-color: ${({ theme }: { theme: ThemeType }) =>
      theme.inputFocusBorder};
    box-shadow: ${({ theme }: { theme: ThemeType }) => theme.inputFocusRing};
  }

  && .mantine-Input-input:hover {
    border-color: ${({ theme }: { theme: ThemeType }) =>
      theme.inputHoverBorder};
  }

  && .mantine-Input-input:hover:focus,
  && .mantine-Input-input:hover:focus-within {
    border-color: ${({ theme }: { theme: ThemeType }) =>
      theme.inputFocusBorder};
    box-shadow: ${({ theme }: { theme: ThemeType }) => theme.inputFocusRing};
  }

  && .mantine-Input-input::placeholder {
    color: ${({ theme }: { theme: ThemeType }) => theme.placeholder};
  }

  && .mantine-Input-input:disabled {
    border-color: ${({ theme }: { theme: ThemeType }) =>
      theme.inputDisabledBorder};
    color: ${({ theme }: { theme: ThemeType }) => theme.mutedText};
    background: ${({ theme }: { theme: ThemeType }) =>
      theme.darkMode ? theme.bg_white_10 : theme.shellSurfaceSecondary};
    cursor: default;
    box-shadow: none;
  }

  &&.err-border .mantine-Input-input {
    border-color: ${({ theme }: { theme: ThemeType }) =>
      theme.border_sell_important} !important;
    box-shadow: none;
    background: ${({ theme }: { theme: ThemeType }) =>
      theme.darkMode ? theme.inputBackground : theme.cardBg};
  }
`;

const UITextarea = React.forwardRef<HTMLTextAreaElement, UITextareaProps>(
  (props, ref) => <StyledTextarea {...props} ref={ref} />
);

UITextarea.displayName = 'UITextarea';

export default UITextarea;

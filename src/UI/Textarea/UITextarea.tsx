import React from 'react';
import { Textarea, TextareaProps } from '@mantine/core';
import styled from 'styled-components';

import { ThemeType } from 'src/theme';

export type UITextareaProps = TextareaProps;

const StyledTextarea = styled(Textarea)`
  && .mantine-Input-input {
    height: 40px;
    border-radius: 5px;
    ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
    border: 1px solid ${({ theme }) => theme.border_transparent};
    font-size: 14px;
    color: ${({ theme }: { theme: ThemeType }) => theme.input};
    background: ${({ theme }: { theme: ThemeType }) => theme.inputBackground};
    min-height: auto;
  }

  && .mantine-Input-input:focus,
  && .mantine-Input-input:focus-within {
    box-shadow: none;
    border-color: ${({ theme }: { theme: ThemeType }) =>
      theme.inputFocusBorder};
  }

  && .mantine-Input-input:hover {
    box-shadow: none;
    border-color: ${({ theme }: { theme: ThemeType }) =>
      theme.inputHoverBorder};
  }

  && .mantine-Input-input::placeholder {
    color: ${({ theme }: { theme: ThemeType }) => theme.placeholder};
  }
`;

const UITextarea = React.forwardRef<HTMLTextAreaElement, UITextareaProps>(
  (props, ref) => <StyledTextarea {...props} ref={ref} />
);

UITextarea.displayName = 'UITextarea';

export default UITextarea;

import React from 'react';
import { Select, SelectProps } from '@mantine/core';
import { createGlobalStyle } from 'styled-components';

export type UISelectProps = SelectProps;

const SelectGlobalStyle = createGlobalStyle`
  .mantine-Select-dropdown {
    box-shadow: ${({ theme }) => theme.boxShadow};
    background: ${({ theme }) => theme.bgMenu};
    padding: 13px 0;
    border: none;
    border-radius: 4px;
  }

  .mantine-Select-options {
    padding: 0;
  }

  .mantine-Select-option {
    color: ${({ theme }) => theme.t_b7b};
    background: ${({ theme }) => theme.bgMenu};
    font-size: 14px;
    margin: 0;
    border-radius: 0;
    height: 40px;
    padding: 0 12px;
    line-height: 40px;
  }

  .mantine-Select-input {
    height: 40px;
    border-radius: 5px;
    border: 1px solid transparent;
    font-size: 14px;
    color: ${({ theme }) => theme.input};
    background: ${({ theme }) => theme.inputBackground};
    min-height: auto;
  }
`;

const UISelect = React.forwardRef<HTMLInputElement, UISelectProps>(
  (props, ref) => {
    return (
      <>
        <SelectGlobalStyle />
        <Select {...props} ref={ref as any} />
      </>
    );
  }
);

UISelect.displayName = 'UISelect';

export default UISelect;

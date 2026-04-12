import React from 'react';
import { Popover, PopoverProps } from '@mantine/core';
import { createGlobalStyle } from 'styled-components';

export type UIPopoverProps = PopoverProps;

const PopoverGlobalStyle = createGlobalStyle`
  html .mantine-Popover-dropdown {
    ${({ theme }) => theme.fontRegular};
    font-weight: 500;
    font-size: 13px;
    line-height: 18px;
    min-height: auto;
    border: none;
    background-color: ${({ theme }) => theme.bgMenu};
    color: ${({ theme }) => theme.t_f4f};
    box-shadow: ${({ theme }) => theme.boxShadow};
    max-width: 250px;
    white-space: normal;
    pointer-events: auto;
    padding: 10px 16px;
  }

  html .mantine-Popover-arrow {
    border-color: ${({ theme }) => theme.border_transparent};
  }
`;

function UIPopoverBase(props: UIPopoverProps) {
  return (
    <>
      <Popover {...props} />
      <PopoverGlobalStyle />
    </>
  );
}

const UIPopover = Object.assign(UIPopoverBase, {
  Target: Popover.Target,
  Dropdown: Popover.Dropdown,
});

export default UIPopover;

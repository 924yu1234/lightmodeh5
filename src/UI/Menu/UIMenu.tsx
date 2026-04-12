import React from 'react';
import { Menu, MenuProps } from '@mantine/core';
import { createGlobalStyle } from 'styled-components';

export type UIMenuProps = MenuProps;

const MenuGlobalStyle = createGlobalStyle`
  html .mantine-Menu-dropdown {
    box-shadow: ${({ theme }) => theme.boxShadow};
    background: ${({ theme }) => theme.bgMenu};
    padding: 13px 0;
    border: none;
    border-radius: 4px;
    .mantine-Menu-item {
      color: ${({ theme }) => theme.t_b7b};
      background: ${({ theme }) => theme.bgMenu};
      font-size: 14px;
      margin: 0;
      border-radius: 0;
      min-height: 40px;
    }
  
    .mantine-Menu-itemLabel {
      line-height: 40px;
    }
    [aria-hidden="true"][data-autofocus="true"] {
      display: none;
    }
  }
`;

function UIMenuBase(props: UIMenuProps) {
  return (
    <>
      <MenuGlobalStyle />
      <Menu
        {...props}
        offset={props.offset ?? 5}
        position={props.position ?? 'bottom-start'}
      />
    </>
  );
}

const UIMenu = Object.assign(UIMenuBase, {
  Target: Menu.Target,
  Dropdown: Menu.Dropdown,
  Item: Menu.Item,
  Label: Menu.Label,
  Divider: Menu.Divider,
});

export default UIMenu;
export const UIMenuTarget = UIMenu.Target;
export const UIMenuDropdown = UIMenu.Dropdown;
export const UIMenuItem = UIMenu.Item;
export const UIMenuLabel = UIMenu.Label;
export const UIMenuDivider = UIMenu.Divider;

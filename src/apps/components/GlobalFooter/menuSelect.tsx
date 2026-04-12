import React from 'react';
import styled from 'styled-components';

import { Menu } from 'src/UI';

import LinkWrapper from 'src/components/LinkWrapper';
import useCustomNavigate from 'src/hooks/useCustomNavigate';
import useWallet from 'src/providers/useWallet';

export default function MenuSelect({ menu }: { menu: any }) {
  const { ele, childs } = menu;
  const [opened, toggleMenu] = React.useState(false);
  const navigate = useCustomNavigate();
  const { renderSwapBtn } = useWallet();
  return (
    <Menu
      keepMounted
      trigger="click"
      opened={opened}
      position="top-start"
      offset={2}
      onOpen={() => {
        toggleMenu(true);
      }}
      onClose={() => {
        toggleMenu(false);
      }}
    >
      <Menu.Target>
        <div
          className={`menu-item ${opened ? 'opened' : ''}`}
          onClick={() => {
            toggleMenu(true);
          }}
        >
          {ele}
        </div>
      </Menu.Target>
      <StyledDropdown style={{ padding: '0px' }}>
        {childs
          .filter((d: any) => !d.hide)
          .map((menu: any) => {
            return (
              <StyledMenuItem
                className="item"
                onClick={() => toggleMenu(false)}
                key={menu.key}
              >
                {menu?.url ? (
                  <LinkWrapper
                    key={menu.key}
                    url={menu.url}
                    onClick={() => {
                      if (menu.onHander) {
                        menu.onHander();
                        return;
                      }
                      if (renderSwapBtn) renderSwapBtn({ width: 0 } as any);
                      navigate(menu.url);
                    }}
                    className={`child-item ${menu.isActive ? 'active' : ''}`}
                  >
                    {menu.ele}
                  </LinkWrapper>
                ) : (
                  <div
                    key={menu.key}
                    onClick={() => {
                      if (menu.onHander) {
                        menu.onHander();
                        return;
                      }
                      if (renderSwapBtn) renderSwapBtn({ width: 0 } as any);
                      navigate(menu.url);
                    }}
                    className={`child-item ${menu.isActive ? 'active' : ''}`}
                  >
                    {menu.ele}
                  </div>
                )}
              </StyledMenuItem>
            );
          })}
      </StyledDropdown>
    </Menu>
  );
}

const StyledDropdown = styled(Menu.Dropdown)`
  &.mantine-Menu-dropdown {
    box-shadow: none;
    border-radius: 4px 4px 0 0;
  }
`;

const StyledMenuItem = styled.div`
  cursor: pointer;
  width: 100%;
  display: flex;
  align-items: center;
  height: 36px;
  color: ${(props) => props.theme.t_b7b};
  ${(props) => props.theme.fontRegular};
  font-size: 12px;
  line-height: 18px;
  .link-wrapper {
    color: ${(props) => props.theme.t_b7b};
    &:hover {
      color: ${(props) => props.theme.t_b7b};
    }
  }
  .child-item {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    padding: 0 20px 0 20px;
  }
  &:hover {
    background: ${(props) => props.theme.bgMenuHover};
  }
`;

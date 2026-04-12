import React from 'react';
import styled from 'styled-components';

import { Menu } from 'src/UI';

import LinkWrapper from 'src/components/LinkWrapper';
import useCustomNavigate from 'src/hooks/useCustomNavigate';
import useWallet from 'src/providers/useWallet';

import IconArrows from 'js/components/Icons/arrowDown';

export default function MenuSelect({ menu }: { menu: any }) {
  const { ele, childs } = menu;
  const [opened, toggleMenu] = React.useState(false);
  const navigate = useCustomNavigate();
  const { renderSwapBtn } = useWallet();
  return (
    <Menu
      keepMounted
      trigger="hover"
      opened={opened}
      position="bottom-start"
      offset={0}
      onOpen={() => {
        toggleMenu(true);
      }}
      onClose={() => {
        toggleMenu(false);
      }}
    >
      <Menu.Target>
        <StyledMenuSelect
          className={`menu-item ${opened ? 'opened' : ''}`}
          onClick={() => {
            toggleMenu(true);
          }}
        >
          {ele}
          <IconArrows />
        </StyledMenuSelect>
      </Menu.Target>
      <Menu.Dropdown style={{ padding: '0px' }}>
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
      </Menu.Dropdown>
    </Menu>
  );
}

const StyledMenuSelect = styled.div`
  &:hover {
    color: ${(props) => props.theme.t_b7b};
  }
  .icon-arrows {
    margin-left: 6px;
  }
  &.opened {
    .icon-arrows {
      transform: rotate(180deg);
    }
  }
`;

const StyledMenuItem = styled.div`
  cursor: pointer;
  width: 100%;
  display: flex;
  align-items: center;
  height: 50px;
  color: ${(props) => props.theme.t_b7b};
  ${(props) => props.theme.fontRegular};
  font-size: 14px;
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
    padding: 0 25px 0 20px;
    .nav-campaign {
      position: relative;
      display: flex;
      align-items: center;
      .fire {
        width: 30px;
      }
      .icon-nav-campaign,
      .icon-nav-earn {
        margin-right: 5px;
      }
      .icon-nav-earn {
        margin-top: 2px;
      }
      .svg {
        position: absolute;
        pointer-events: none;
        right: -60px;
        top: -50px;
        z-index: 1;
        & > div {
          width: 100px;
        }
      }
    }
  }
  &:hover {
    background: ${(props) => props.theme.bgMenuHover};
  }
`;

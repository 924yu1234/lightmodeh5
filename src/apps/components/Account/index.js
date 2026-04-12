import React from 'react';
import styled from 'styled-components';

import { Menu, PrimaryBtn } from 'src/UI';

import IconAccount from 'src/components/Icons/account';
import { useShowAccount } from 'src/hooks/useShowAccount';
import { useThemeParams } from 'src/theme';

import IconArrows from 'js/components/Icons/arrowDown';
import { useIntl } from 'js/locals';
import { useWalletWeb3 } from 'js/providers/useWallet';
import {
  useIsShowingMenu,
  useShowModalLogin,
  useToggleMenu,
} from 'js/state/application/hooks';

import Menus from './menu';

export default function GlobalAccount() {
  const { account } = useWalletWeb3();
  const intl = useIntl();
  const { isMobile, windowWidth } = useThemeParams();
  const login = useShowModalLogin();
  const showAccount = useShowAccount();

  const hideAccount = windowWidth <= 1024;

  const toggleMenu = useToggleMenu();
  const opened = useIsShowingMenu();
  return (
    <StyledAccount isMobile={isMobile} className="global-account">
      {account ? (
        <>
          <Menu
            trigger="hover"
            opened={opened}
            position="bottom"
            offset={0}
            onOpen={() => {
              toggleMenu(true);
            }}
            onClose={() => {
              toggleMenu(false);
            }}
          >
            <Menu.Target>
              <div
                className={`account ${opened ? 'opened' : ''}`}
                onClick={() => {
                  toggleMenu(true);
                }}
              >
                <IconAccount size={20} />
                {!hideAccount && <p>{showAccount}</p>}
                <IconArrows />
              </div>
            </Menu.Target>
            <Menu.Dropdown style={{ padding: 0 }}>
              <Menus />
            </Menu.Dropdown>
          </Menu>
        </>
      ) : (
        <PrimaryBtn
          eventName="btn_wallet_connect"
          className="login"
          onClick={login}
        >
          {intl.connect_wallet}
        </PrimaryBtn>
      )}
    </StyledAccount>
  );
}

const StyledAccount = styled.div`
  margin-left: auto;
  height: 100%;
  display: flex;
  align-items: center;
  .account {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    cursor: pointer;
    border-radius: 5px;
    white-space: nowrap;
    font-size: 14px;
    gap: 5px;
    ${(props) => props.theme.fontRegular};
    color: ${(props) => props.theme.t_b7b};
    &:hover {
      color: ${(props) => props.theme.blue};
      .icon-account {
        color: ${(props) => props.theme.blue};
      }
    }
    &.opened {
      .icon-arrows {
        transform: rotate(180deg);
      }
    }
  }
  .dg-primary.login.mantine-Button-root {
    margin-right: 10px;
    ${(props) => props.theme.fontRegular};
    height: 30px;
    min-height: 30px;
    font-size: 14px;
    min-width: 120px;
  }
`;

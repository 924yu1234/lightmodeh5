import React, { useMemo } from 'react';
import { useLocation, useMatch } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';

import useCustomNavigate, { isPage } from 'src/hooks/useCustomNavigate';
import { useShowTurboRangeFeature } from 'src/state/dexAccount/hooks';
import { useCurrentSwapPair } from 'src/state/swap/pair/hooks';
// import IconNavEarn from 'src/components/Icons/NavEarn';
import { useThemeParams } from 'src/theme';

import LinkWrapper from 'js/components/LinkWrapper';
import { getUrlPath } from 'js/hooks/choosePair';
import { useIntl } from 'js/locals';
import useWallet from 'js/providers/useWallet';

import MenuSelect from './menuSelect';

export default function GlobalHeaderMenus() {
  const location = useLocation();
  const intl = useIntl();
  const navigate = useCustomNavigate();
  const { renderSwapBtn } = useWallet();
  const showTurboRangeFeature = useShowTurboRangeFeature();

  const { viewWidth } = useThemeParams();
  let menuPadding = 35;
  if (viewWidth < 1280) {
    menuPadding = 20;
  } else if (viewWidth < 1440) {
    menuPadding = 25;
  } else if (viewWidth < 1920) {
    menuPadding = 35;
  } else if (viewWidth < 2560) {
    menuPadding = 40;
  } else if (viewWidth >= 2560) {
    menuPadding = 50;
  }

  const pathname = location.pathname;

  const isSwap = useMatch('/:lang/swap/:quote/:base');
  const { baseToken: swapBaseToken, quoteToken: swapQuoteToken } =
    useCurrentSwapPair();

  const swapUrl = useMemo(() => {
    return getUrlPath({
      baseToken: swapBaseToken,
      quoteToken: swapQuoteToken,
      page: 'swap',
    });
  }, [swapBaseToken, swapQuoteToken]);

  const menus = useMemo(() => {
    const _menus = [
      {
        key: 'Home',
        isActive: isPage(pathname, '/home'),
        ele: intl['m.home'],
        url: '/home',
      },
      {
        key: 'Swap',
        isActive: isPage(pathname, '/swap') || isSwap,
        ele: intl.Swap,
        url: swapUrl,
      },
      {
        key: 'Turbo Range',
        isActive: isPage(pathname, '/turbo-range'),
        ele: intl.turboRange.Turbo_Range,
        url: '/turbo-range',
        hide: !showTurboRangeFeature,
      },
      {
        key: 'Earn',
        isActive: isPage(pathname, '/simple-earn') || isPage(pathname, '/earn'),
        ele: intl.turboRange.Simple_Earn,
        url: '/simple-earn',
      },
      {
        key: 'stocks',
        isActive: isPage(pathname, '/stocks'),
        ele: intl.Stocks,
        url: '/stocks',
      },
    ];
    // _menus.push({
    //   key: 'Meme',
    //   isActive: isPage(pathname, '/meme') || isPage(pathname, '/meme/'),
    //   ele: intl.Meme,
    //   url: '/meme',
    // });
    return _menus;
  }, [intl, pathname, isSwap, swapUrl, showTurboRangeFeature]);

  return (
    <StyledGlobalHeaderMenus className="menus" menuPadding={menuPadding}>
      {menus
        .filter((d) => !d.hide)
        .map((menu) => {
          if (menu.childs) {
            return <MenuSelect menu={menu} key={menu.key} />;
          }
          return (
            <LinkWrapper
              key={menu.key}
              url={menu.url}
              onClick={() => {
                if (menu.onHander) {
                  menu.onHander();
                  return;
                }
                if (renderSwapBtn) renderSwapBtn({ width: 0 });
                navigate(menu.url);
              }}
              className={`menu-item ${menu.isActive ? 'active' : ''}`}
            >
              {menu.ele}
            </LinkWrapper>
          );
        })}
      <DropdownMoreSelect />
    </StyledGlobalHeaderMenus>
  );
}

GlobalHeaderMenus.propTypes = {};

const StyledGlobalHeaderMenus = styled.div`
  ${(props) => props.theme.fontRegular};
  flex: 1;
  padding: 0 20px 0 30px;
  display: flex;
  width: 100%;
  justify-content: flex-start;
  height: 100%;
  .menu-item {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 10px;
    margin-right: ${({ menuPadding }) => menuPadding - 20}px;
    color: ${({ theme }) => theme.t_b7b};
    ${(props) => props.theme.fontBold};
    line-height: ${(props) => (props.theme.isMobile ? '24px' : '24px')};
    text-align: center;
    white-space: nowrap;
    cursor: pointer;
    position: relative;
    font-size: 14px;
    border-radius: 5px;

    &:hover {
      color: ${(props) => props.theme.blue};
    }
    &.active {
      color: ${(props) => props.theme.blue};
    }
    .icon-beta {
      margin-left: 2px;
    }

    .fire {
      & > div {
        width: 25px;
      }
    }
  }
`;

const DropdownMoreSelect = createGlobalStyle`
  .dropdown-more-select {
    .menus {
      box-shadow: ${(props) => props.theme.boxShadow};
      border-radius: 5px;
    }
  }
`;

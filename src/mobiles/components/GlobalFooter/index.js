import React, { useMemo } from 'react';
import { useLocation, useMatch } from 'react-router-dom';
import styled from 'styled-components';

import useCustomNavigate, { isPage } from 'src/hooks/useCustomNavigate';

import { useIntl } from 'js/locals';
import useWallet from 'js/providers/useWallet';

import IconAsset from './icons/iconAsset';
import IconHome from './icons/iconHome';
import IconSwap from './icons/iconSwap';

export default function GlobalFooter() {
  const location = useLocation();
  const navigate = useCustomNavigate();

  const intl = useIntl();
  const { pathname } = location;

  const swapMatch = useMatch('/:lang/swap/:quote/:base');
  const isSwap = swapMatch || isPage(pathname, '/swap');

  const { renderSwapBtn } = useWallet();

  const tabs = useMemo(
    () => [
      {
        key: '/home',
        title: intl['m.home'],
        active: isPage(pathname, '/home') || isPage(pathname, '/'),
        icon: <IconHome className="footer-icon" size={22} />,
      },
      {
        key: '/swap',
        title: intl.Swap,
        active: isSwap,
        icon: <IconSwap className="footer-icon" size={22} />,
      },
      {
        key: '/account/balance',
        title: intl['m.balance'],
        active: pathname.includes('/account/balance'),
        icon: <IconAsset className="footer-icon" size={22} />,
      },
    ],
    [intl, pathname, isSwap]
  );

  return (
    <StyledFooter>
      <div className="tabs">
        {tabs
          .filter((item) => !item.hide)
          .map((item) => (
            <div
              className={`tab-item ${item?.active ? 'active' : ''}`}
              key={item.key}
              onClick={() => {
                if (item.active) return;
                if (renderSwapBtn) renderSwapBtn({ width: 0 });
                navigate(item.url || item.key);
              }}
            >
              {item.icon}
              <div className="item-text">{item.title}</div>
            </div>
          ))}
      </div>
    </StyledFooter>
  );
}

GlobalFooter.propTypes = {};

const StyledFooter = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  align-items: center;
  min-height: 80px;

  background: ${(props) => props.theme.bg_main_15};
  box-shadow: 0px 4px 12px 0px rgba(255, 255, 255, 0.15);
  padding: 10px 0 15px;
  z-index: 11;
  backdrop-filter: blur(12px);

  .tabs {
    display: flex;
    align-items: center;
    padding: 0 10px;
    width: 100%;

    .tab-item {
      display: flex;
      flex: 1;
      align-items: center;
      flex-direction: column;
      margin: 0 auto;
      position: relative;
      .icon-beta-m {
        position: absolute;
        top: 0px;
        right: 5px;
        transform: translateY(-40%);
      }
      .item-text {
        ${(props) => props.theme.fontRegular};
        font-size: 12px;
        line-height: 20px;
        color: ${(props) => props.theme.t_b7b};
        letter-spacing: 0;
      }
      &.active {
        .dg-icon {
          color: ${({ theme }) => theme.blue};
        }
        .item-text {
          color: ${({ theme }) => theme.blue};
        }
      }
    }
  }
`;

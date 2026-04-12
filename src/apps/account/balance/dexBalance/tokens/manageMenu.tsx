import React, { useCallback, useState } from 'react';
import { useClickOutside } from '@mantine/hooks';
import iconHide from 'imgs/icon_hide.svg';
import iconShow from 'imgs/icon_show.svg';
import styled from 'styled-components';

import { Switch } from 'src/UI';

import IconFilter from 'src/components/Icons/filter';
import IconManageTokens from 'src/components/Icons/manageTokens';
import IconRightOutlined from 'src/components/Icons/RightOutlined';
import SearchChainIcon from 'src/components/SearchChainSelect/searchChainIcon';
import { Type_DAChains } from 'src/da';
import { useIntl } from 'src/locals';
import { ThemeType } from 'src/theme';

import ManageMenuNetworkPanel from './manageMenuNetworkPanel';

type ManagePanelKey = 'root' | 'network';

export default function ManageMenu({
  chain,
  setChain,
  hideSmallbalances,
  updateFlag,
  onOpenManageTokens,
}: {
  chain: Type_DAChains | 'all';
  setChain: (chain: Type_DAChains | 'all') => void;
  hideSmallbalances: boolean;
  updateFlag: (value: boolean) => void;
  onOpenManageTokens: () => void;
}) {
  const intl = useIntl();
  const [opened, setOpened] = useState(false);
  const [activePanel, setActivePanel] = useState<ManagePanelKey>('root');
  const ref = useClickOutside(() => {
    setOpened(false);
    setActivePanel('root');
  });

  const closeMenu = useCallback(() => {
    setOpened(false);
    setActivePanel('root');
  }, []);

  const handleToggleMenu = useCallback(() => {
    setOpened((prev) => {
      if (!prev) {
        setActivePanel('root');
      }
      return !prev;
    });
  }, []);

  const handleOpenManageTokens = useCallback(() => {
    closeMenu();
    onOpenManageTokens();
  }, [closeMenu, onOpenManageTokens]);

  const handleToggleHideBalances = useCallback(() => {
    updateFlag(!hideSmallbalances);
  }, [hideSmallbalances, updateFlag]);

  return (
    <StyledManageMenu ref={ref}>
      <div className="manage-btn" onClick={handleToggleMenu}>
        <IconFilter className="manage-trigger-icon" size={16} />
        <span>{intl.manage_tokens_short}</span>
      </div>

      {opened && (
        <div className="manage-dropdown">
          <div className="manage-panel manage-panel-root">
            <div
              className="manage-item"
              onClick={handleOpenManageTokens}
              onMouseEnter={() => setActivePanel('root')}
            >
              <div className="manage-item-icon">
                <IconManageTokens size={20} />
              </div>
              <div className="manage-item-label">
                {intl.manage_tokens_title}
              </div>
            </div>

            <div
              className={`manage-item ${
                activePanel === 'network' ? 'active' : ''
              }`}
              onClick={() => setActivePanel('network')}
              onMouseEnter={() => setActivePanel('network')}
            >
              <div className="manage-item-icon">
                <SearchChainIcon chain="all" size={18} />
              </div>
              <div className="manage-item-label">{intl.filter_by_network}</div>
              <IconRightOutlined className="manage-item-arrow" size={10} />
            </div>

            <div
              className="manage-item"
              onMouseEnter={() => setActivePanel('root')}
            >
              <div className="manage-item-icon">
                <img
                  src={hideSmallbalances ? iconHide : iconShow}
                  alt="hide"
                  className="asset-toggle-icon"
                />
              </div>
              <div className="manage-item-label">
                {intl.hide_balances_less_than_10.replace('10', '0.1')}
              </div>
              <Switch
                checked={hideSmallbalances}
                onChange={handleToggleHideBalances}
              />
            </div>
          </div>

          {activePanel === 'network' && (
            <ManageMenuNetworkPanel
              chain={chain}
              setChain={setChain}
              onClose={closeMenu}
            />
          )}
        </div>
      )}
    </StyledManageMenu>
  );
}

export const StyledManageMenu = styled.div`
  position: relative;
  margin-left: 10px;

  .manage-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;

    &:hover {
      color: ${({ theme }: { theme: ThemeType }) => theme.blue};
      .manage-trigger-icon {
        color: ${({ theme }: { theme: ThemeType }) => theme.blue};
      }
    }

    .manage-trigger-icon {
      color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b};
    }
  }

  .manage-dropdown {
    position: absolute;
    top: calc(100% + 10px);
    left: 0;
    z-index: 30;
    display: flex;
    align-items: flex-start;
    gap: 8px;
  }

  .manage-panel {
    background: ${({ theme }: { theme: ThemeType }) => theme.bgMenu};
    border-radius: 5px;
    background: #22223c;
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.5);
    overflow: hidden;
  }

  .manage-panel-root {
    width: 255px;
    padding: 10px 0;
  }

  .manage-panel-network {
    width: 190px;
    padding: 10px 0;
  }

  .asset-toggle-icon {
    width: 20px;
    height: 20px;
  }

  .manage-item {
    display: flex;
    align-items: center;
    gap: 6px;
    min-height: 54px;
    padding: 0 18px;
    cursor: pointer;
    ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
    font-size: 14px;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
    transition: background 0.2s ease;

    &:hover,
    &.active {
      background: ${({ theme }: { theme: ThemeType }) => theme.bgMenuHover};
    }
  }

  .manage-item-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    min-width: 20px;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b};
  }

  .manage-item-label {
    flex: 1;
    line-height: 20px;
  }

  .manage-item-arrow {
    color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b};
    font-size: 12px;
  }

  .manage-status-pill {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 46px;
    height: 24px;
    padding: 0 10px;
    border-radius: 999px;
    ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
    font-size: 12px;
    letter-spacing: 0.02em;
  }

  .manage-status-pill.on {
    background: ${({ theme }: { theme: ThemeType }) => theme.green2};
    color: ${({ theme }: { theme: ThemeType }) => theme.green};
  }

  .manage-status-pill.off {
    background: ${({ theme }: { theme: ThemeType }) => theme.bg_10};
    color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b};
  }

  .chain-list-shell {
    .chain-item {
      min-height: 52px;
      padding: 0 18px;
    }

    .chain-title {
      padding: 0 18px;
      border-top-color: ${({ theme }: { theme: ThemeType }) => theme.bg_10};
    }
  }
`;

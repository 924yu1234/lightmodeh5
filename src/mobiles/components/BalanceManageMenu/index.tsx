import React, { useCallback } from 'react';
import iconHide from 'imgs/icon_hide.svg';
import iconShow from 'imgs/icon_show.svg';
import styled from 'styled-components';

import { Switch } from 'src/UI';

import IconManageTokens from 'src/components/Icons/manageTokens';
import IconRightOutlined from 'src/components/Icons/RightOutlined';
import BottomModal from 'src/components/Modals/bottomModal';
import SearchChainIcon from 'src/components/SearchChainSelect/searchChainIcon';
import { useIntl } from 'src/locals';
import { useModals, useShowModal } from 'src/state/application/hooks';
import ModalKeys from 'src/state/application/modalKeys';
import { useChangeFlag, useUserFlag } from 'src/state/user/hooks';
import { ThemeType } from 'src/theme';

export default function BalanceManageMenu() {
  const intl = useIntl();
  const showModal = useShowModal();
  const { visible, chain, hide, setChain } = useModals(
    ModalKeys.balanceManageMenu
  );
  const hideSmallbalances = useUserFlag('hide_small_balances');
  const updateFlag = useChangeFlag('hide_small_balances');

  const closeMenu = useCallback(() => {
    hide();
  }, [hide]);

  const handleOpenManageTokens = useCallback(() => {
    closeMenu();
    showModal({ modal: ModalKeys.manageTokens });
  }, [closeMenu, showModal]);

  const handleOpenFilterNetwork = useCallback(() => {
    closeMenu();
    showModal({
      modal: ModalKeys.filterNetwork,
      chain,
      setChain,
    });
  }, [chain, closeMenu, setChain, showModal]);

  const handleToggleHideSmallBalances = useCallback(() => {
    updateFlag(!hideSmallbalances);
  }, [hideSmallbalances, updateFlag]);

  return (
    <StyledManageBottomModal
      opened={visible}
      onClose={closeMenu}
      noHeader
      zIndex={201}
    >
      <div className="modal-wrapper">
        <div className="modal-content">
          <div className="menu-list">
            <div className="menu-item" onClick={handleOpenManageTokens}>
              <div className="menu-item-icon">
                <IconManageTokens size={20} />
              </div>
              <div className="menu-item-label">{intl.manage_tokens_title}</div>
              <IconRightOutlined className="menu-item-arrow" size={14} />
            </div>

            <div className="menu-item" onClick={handleOpenFilterNetwork}>
              <div className="menu-item-icon">
                <SearchChainIcon chain="all" size={20} />
              </div>
              <div className="menu-item-label">{intl.filter_by_network}</div>
              <IconRightOutlined className="menu-item-arrow" size={14} />
            </div>

            <div className="menu-item toggle-item">
              <div className="menu-item-icon">
                <img
                  src={hideSmallbalances ? iconHide : iconShow}
                  alt="hide"
                  className="asset-toggle-icon"
                />
              </div>
              <div className="menu-item-label">
                {intl.hide_balances_less_than_10.replace('10', '0.1')}
              </div>
              <Switch
                checked={hideSmallbalances}
                onChange={handleToggleHideSmallBalances}
              />
            </div>
          </div>
        </div>
      </div>
    </StyledManageBottomModal>
  );
}

const StyledManageBottomModal = styled(BottomModal)`
  .modal-wrapper {
    width: 100%;
  }

  .modal-content {
    width: 100%;
    padding: 0 20px 24px;
  }

  .menu-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .menu-item {
    display: flex;
    align-items: center;
    min-height: 50px;
    padding: 0 20px;
    gap: 16px;
    background: ${({ theme }: { theme: ThemeType }) => theme.bg_white_10};
    border-radius: 8px;
    ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
    font-size: 14px;
    line-height: 20px;
  }

  .menu-item-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b};
  }

  .asset-toggle-icon {
    width: 20px;
    height: 20px;
    object-fit: contain;
  }

  .menu-item-label {
    flex: 1;
  }

  .menu-item-arrow {
    color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b};
  }
`;

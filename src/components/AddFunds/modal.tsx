import React from 'react';
import styled from 'styled-components';

import { useAppNavigateBrowserUrl } from 'src/h5/navigateApp';
import { useIntl } from 'src/locals';
import { useIsAppH5 } from 'src/providers/useWallet';
import { useInfo, useModals } from 'src/state/application/hooks';
import ModalKeys from 'src/state/application/modalKeys';
import { useDexAccount } from 'src/state/dexAccount/hooks';
import useReceive from 'src/state/dexAccount/opr/useReceive';
import { ThemeType } from 'src/theme';
import { formatTokenSymbol } from 'src/utils/format';
import WindowOpen from 'src/utils/windowOpen';

import IconOprBuy from '../Icons/oprBuy';
import IconOprReceive from '../Icons/oprReceive';
import IconRightOutlined from '../Icons/RightOutlined';
import BottomModal from '../Modals/bottomModal';

export default function AddFundsModal() {
  const { visible, hide, token } = useModals(ModalKeys.addFunds);
  const intl = useIntl();
  const receive = useReceive();
  const { buyWithCashLink } = useInfo();

  const isApp = useIsAppH5();
  const navigateBrowserUrl = useAppNavigateBrowserUrl();
  const { account, hasSyncDA } = useDexAccount();
  if (!account || !hasSyncDA) return null;

  const handleReceive = () => {
    hide();
    receive({ token });
  };

  const links = buyWithCashLink?.split(';') || [];

  const handleBuy = (link: string) => {
    hide();
    if (isApp) {
      navigateBrowserUrl(link);
    } else {
      WindowOpen(link, '_blank');
    }
  };

  return (
    <BottomModal
      onClose={hide}
      opened={visible}
      closeOnClickOutside
      noHeader
      zIndex={201}
    >
      <StyledModal className="modal-wrapper">
        <div className="modal-content">
          <div className="item" onClick={handleReceive}>
            <IconOprReceive size={24} />
            <div>
              {intl.receive_usdc.replace(
                'USDC',
                formatTokenSymbol(token?.symbol || 'USDC')
              )}
            </div>
            <IconRightOutlined />
          </div>

          {buyWithCashLink &&
            links.map((link: string) => (
              <div className="item" key={link} onClick={() => handleBuy(link)}>
                <IconOprBuy size={24} />
                <div>
                  {intl.Buy_with_cash_card} {link.split('/')[2]}
                </div>
                <IconRightOutlined />
              </div>
            ))}
        </div>
      </StyledModal>
    </BottomModal>
  );
}

const StyledModal = styled.div`
  width: 100%;
  .item {
    width: 100%;
    display: flex;
    align-items: center;
    background: ${({ theme }) => theme.bg_white_10};
    border-radius: 5px;
    margin-bottom: 10px;
    gap: 10px;
    padding: 0 20px;
    min-height: 50px;
    ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
    font-size: 14px;
    line-height: 20px;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
    cursor: pointer;
    border: 1px solid ${({ theme }) => theme.border_transparent};
    .icon-right-outlined {
      margin-left: auto;
    }
    &:hover {
      background: ${({ theme }: { theme: ThemeType }) => theme.bgMenuHover};
    }
    &:active {
      border: 1px solid ${({ theme }) => theme.border_blue};
    }
  }
`;

// PC 菜单样式
export const AddFundsMenuStyle = styled.div`
  .add-funds-menu {
    padding: 6px;
  }
  .menu-item {
    display: flex;
    align-items: center;
    gap: 10px;
    min-height: 42px;
    .menu-text {
      flex: 1;
    }
    .icon-right-outlined {
      margin-left: auto;
    }
  }
`;

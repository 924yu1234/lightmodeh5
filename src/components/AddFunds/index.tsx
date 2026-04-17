import React, { useMemo, useState } from 'react';
import { useClickOutside } from '@mantine/hooks';
import styled from 'styled-components';

import { Menu } from 'src/UI';

import { Token } from 'src/constants/interface';
import { useAppNavigateBrowserUrl } from 'src/h5/navigateApp';
import { useCommonConfig } from 'src/hooks/useClientConfig';
import { useIntl } from 'src/locals';
import { useIsAppH5 } from 'src/providers/useWallet';
import {
  useOprBuyWithCashLink,
  useShowModal,
} from 'src/state/application/hooks';
import ModalKeys from 'src/state/application/modalKeys';
import { useDexAccount } from 'src/state/dexAccount/hooks';
import useReceive from 'src/state/dexAccount/opr/useReceive';
import { ThemeType, useThemeParams } from 'src/theme';
import { formatTokenSymbol } from 'src/utils/format';
import WindowOpen from 'src/utils/windowOpen';

import GALinkWrapper from '../GA/LinkWrapper';
import IconOprBuy from '../Icons/oprBuy';
import IconOprReceive from '../Icons/oprReceive';
import IconRightOutlined from '../Icons/RightOutlined';

export default function AddFunds({
  token,
  filterToken,
}: {
  token?: Token;
  filterToken?: boolean;
}) {
  const intl = useIntl();
  const receive = useReceive();
  const buyWithCashLink = useOprBuyWithCashLink(token);
  const [showMenus, setShowMenus] = useState(false);
  const { isMobile } = useThemeParams();
  const isApp = useIsAppH5();
  const navigateBrowserUrl = useAppNavigateBrowserUrl();
  const { account, hasSyncDA } = useDexAccount();
  const showModal = useShowModal();
  const { data: unlimitTokens } = useCommonConfig('cryptoUnlimitTokens');

  const showUnlimit = useMemo(() => {
    if (!filterToken) return true;
    if (!unlimitTokens || !buyWithCashLink) return false;
    const tokens = Object.values(unlimitTokens || {});
    let tokenSymbol = token?.symbol?.toLowerCase();
    if (tokenSymbol === 'cbbtc') {
      tokenSymbol = 'btc';
    }
    return tokens.some(
      (item: any) => item.symbol?.toLowerCase() === tokenSymbol
    );
  }, [filterToken, unlimitTokens, token?.symbol, buyWithCashLink]);

  const ref = useClickOutside(() => {
    setShowMenus(false);
  });

  if (!account || !hasSyncDA) return null;

  const handleReceive = () => {
    setShowMenus(false);
    receive({ token });
  };

  const handleBuy = () => {
    setShowMenus(false);
    if (isApp) {
      navigateBrowserUrl(buyWithCashLink);
    } else {
      WindowOpen(buyWithCashLink, '_blank');
    }
  };

  if (!isMobile) {
    return (
      <AddFundsMenuStyle>
        <Menu
          opened={showMenus}
          position="bottom-start"
          shadow="md"
          width={240}
        >
          <Menu.Target>
            <div ref={ref}>
              <GALinkWrapper
                eventName="btn_turbo_range_invest_add_funds"
                onClick={() => {
                  setShowMenus((v) => !v);
                }}
              >
                <StyledAddFunds className="add_funds_link">
                  {intl.Add_Funds} <IconRightOutlined />
                </StyledAddFunds>
              </GALinkWrapper>
            </div>
          </Menu.Target>
          <Menu.Dropdown className="add-funds-menu">
            <Menu.Item className="menu-item" onClick={handleReceive}>
              <StyledFundsItem>
                <IconOprReceive size={20} />
                <div className="menu-text">
                  {intl.receive_usdc.replace(
                    'USDC',
                    formatTokenSymbol(token?.symbol) || 'USDC'
                  )}
                </div>
              </StyledFundsItem>
            </Menu.Item>
            {showUnlimit && (
              <Menu.Item className="menu-item" onClick={handleBuy}>
                <StyledFundsItem>
                  <IconOprBuy size={20} />
                  <div className="menu-text">{intl.Buy_with_cash_card}</div>
                </StyledFundsItem>
              </Menu.Item>
            )}
          </Menu.Dropdown>
        </Menu>
      </AddFundsMenuStyle>
    );
  }

  return (
    <GALinkWrapper
      eventName="btn_turbo_range_invest_add_funds"
      onClick={() => {
        if (!showUnlimit) {
          receive({ token });
        } else {
          showModal({ modal: ModalKeys.addFunds, token });
        }
      }}
    >
      <StyledAddFunds className="add_funds_link">
        {intl.Add_Funds} <IconRightOutlined />
      </StyledAddFunds>
    </GALinkWrapper>
  );
}

const StyledAddFunds = styled.div`
  height: 26px;
  padding: 5px 8px;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  font-size: 14px;
  line-height: 16px;
  ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
  color: ${({ theme }: { theme: ThemeType }) => theme.blue};
  border-radius: 8px;
  transition: background-color 0.15s ease, color 0.15s ease;
  .icon-right-outlined {
    color: ${({ theme }: { theme: ThemeType }) => theme.blue};
    transition: color 0.15s ease;
  }
  &:active {
    background: ${({ theme }) => theme.segmentedCompactActiveBg};
  }
  @media (hover: hover) {
    &:hover {
      background: ${({ theme }) => theme.pressTint};
      color: ${({ theme }) => theme.blue};
      .icon-right-outlined {
        color: ${({ theme }) => theme.blue};
      }
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

const StyledFundsItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

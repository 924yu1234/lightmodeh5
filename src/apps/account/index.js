import React from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import styled from 'styled-components';

import Referral from 'src/apps/referral';
import useCustomNavigate from 'src/hooks/useCustomNavigate';
import { useDexAccount } from 'src/state/dexAccount/hooks';

import TipsConnect from 'js/apps/components/Tips/tips_connect';
import IconAccountAsset from 'js/components/Icons/accountAsset';
import IconAccountOrder from 'js/components/Icons/accountOrder';
import IconReferral from 'js/components/Icons/referral';
import { useIntl, useSetLocale } from 'js/locals';
import { useWalletWeb3 } from 'js/providers/useWallet';

import AccountBalance from './balance';
// import IconDown from 'js/components/Icons/downIcon';
import History from './history';

export default function Account() {
  const intl = useIntl();
  const location = useLocation();
  const pathname = location.pathname;
  const { account } = useWalletWeb3();
  const { hasAccessToken, ownerReferralCode } = useDexAccount();
  const { languagePath } = useSetLocale();
  const navigate = useCustomNavigate();
  const showReferralTab = !!account && !!hasAccessToken && !!ownerReferralCode;

  const tabs = [
    {
      label: intl['menu.menu_balance'],
      iconComponent: <IconAccountAsset size={20} />,
      url: `/${languagePath}/account/balance`,
    },
    {
      label: intl['menu.menu_history'],
      iconComponent: <IconAccountOrder size={20} />,
      url: `/${languagePath}/account/history`,
    },
    ...(showReferralTab
      ? [
          {
            label: intl.referral,
            iconComponent: <IconReferral size={20} />,
            url: `/${languagePath}/account/referral`,
          },
        ]
      : []),
  ];

  return (
    <StyledAccount>
      <div className="account-left-tabs">
        <div className="account-left-fixed">
          {tabs.map((tab) => {
            const { label, url, iconComponent } = tab;
            const isActive = pathname.includes(url);
            return (
              <div key={url}>
                {/* <Link to={url}> */}
                <StyledSideItem
                  key={label}
                  className={`account-left-tab-item ${
                    isActive ? 'active' : ''
                  } `}
                  onClick={() => {
                    navigate(url);
                  }}
                >
                  {React.isValidElement(iconComponent)
                    ? React.cloneElement(iconComponent, {
                        active: isActive,
                      })
                    : iconComponent}
                  {label}
                </StyledSideItem>
                {/* </Link> */}
              </div>
            );
          })}
        </div>
      </div>
      <div className="account-right">
        {!account ? (
          <TipsConnect />
        ) : (
          <>
            <Routes>
              <Route path="balance" element={<AccountBalance />} />
              <Route path="balance/:tab" element={<AccountBalance />} />

              <Route path="history" element={<History />} />
              <Route
                path="history/internalTransfer"
                element={<Navigate to="/account/history/receive" replace />}
              />
              <Route path="history/:tab" element={<History />} />
              <Route path="history/:tab/:type" element={<History />} />
              <Route path="referral" element={<Referral />} />
              <Route
                path="*"
                element={<Navigate to="/account/balance" replace />}
              />
            </Routes>
          </>
        )}
      </div>
    </StyledAccount>
  );
}

const StyledAccount = styled.div`
  display: flex;
  min-height: 100%;
  width: 100%;
  margin-top: 1px;
  .account-left-tabs {
    font-size: 14px;
    width: 200px;
    min-width: 200px;
    background: transparent;
    border-right: 1px solid ${({ theme }) => theme.divider};

    .account-left-fixed {
      width: 200px;
      padding: 14px 0;

      .account-left-tab-item-left {
        padding-left: 57px;
      }
    }
  }
  .account-right {
    position: relative;
    //height: 100%;
    width: 100%;
    max-width: ${(props) => props.theme.viewWidth - 200}px;
    .title {
      ${(props) => props.theme.fontMedium};
      font-size: 18px;
      line-height: 24px;
      color: ${(props) => props.theme.t_d4d};
    }
  }
  .childs-tpl {
    background: ${({ theme }) => theme.bg_white_05};
    padding: 5px 0 0;
    overflow: hidden;
    margin-bottom: 5px;
  }
  .more {
    margin-left: 20px;
    margin-top: 20px;
    margin-bottom: 20px;
    ${(props) => props.theme.fontRegular};
    font-size: 14px;
    color: ${(props) => props.theme.blue};
    letter-spacing: 0;
    cursor: pointer;
    display: flex;
  }
  .dg-breadcrumb {
    padding: 0 0 0 20px;
    margin-bottom: 40px;
  }
`;

const StyledSideItem = styled.div`
  height: 55px;
  display: flex;
  padding-left: 30px;
  align-items: center;
  line-height: 24px;
  cursor: pointer;
  ${(props) => props.theme.fontMedium};
  font-size: 16px;
  color: ${(props) => props.theme.t_b7b};
  letter-spacing: 0.01em;
  border-radius: 10px;
  border: 1px solid transparent;
  margin: 0 10px 5px;
  transition: background-color 0.15s ease, color 0.15s ease,
    border-color 0.15s ease;

  .dg-icon {
    margin-right: 10px;
    color: ${(props) => props.theme.t_b7b};
    transition: color 0.15s ease;
  }
  &.collapse .icon-down {
    transform: rotate(0);
  }
  .icon-down {
    margin-left: auto;
    margin-right: 20px;
    transform: rotate(180deg);
  }

  @media (hover: hover) {
    &:hover:not(.active) {
      background: ${({ theme }) => theme.pressTint};
      color: ${(props) => props.theme.ink};

      .dg-icon {
        color: ${(props) => props.theme.green};
      }
    }
  }

  &.active {
    ${(props) => props.theme.fontMedium};
    background: ${({ theme }) =>
      theme.darkMode ? theme.bg_white_10 : theme.infoBarBg};
    color: ${(props) => props.theme.ink};
    border: 1px solid
      ${({ theme }) =>
        theme.darkMode ? theme.border_transparent : theme.infoBarBorder};

    .dg-icon {
      color: ${(props) => props.theme.green};
    }
  }

  &.child-item {
    padding-left: 60px;
  }
`;

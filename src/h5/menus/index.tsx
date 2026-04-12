import React, { useCallback, useState } from 'react';

import usePrivateClientDeskContacts from 'src/components/PrivateClientDesk/usePrivateClientDeskContacts';
import { DOC_LINK } from 'src/constants/dex';
import {
  useHideMenuFeedback,
  useHideMenuPrivateClientDesk,
} from 'src/h5/utils';
import useCustomNavigate from 'src/hooks/useCustomNavigate';
import { useIntl } from 'src/locals';
import Header from 'src/mobiles/components/header';
import { useShowModalFeedback } from 'src/state/application/hooks';
import { useThemeParams } from 'src/theme';
import WindowOpen from 'src/utils/windowOpen';

import RightOutlined from 'js/components/Icons/RightOutlined';

import Community from './Community';
import { StyledRightbar } from './style';

enum MenuKey {
  Account,
  Earn,
  More,
  Community,
  Language,
}

export default function Menus() {
  const intl = useIntl();
  const [openedMenu, setOpenMenu] = useState<MenuKey | ''>('');
  const { showH5Header } = useThemeParams();
  const navigate = useCustomNavigate();
  const privateClientContacts = usePrivateClientDeskContacts();
  const showPrivateClientDesk = privateClientContacts?.hasConfig;

  const toggleMenu = useCallback(
    (menuKey: MenuKey) => {
      if (openedMenu === menuKey) {
        setOpenMenu('');
      } else {
        setOpenMenu(menuKey);
      }
    },
    [openedMenu]
  );
  const hideMenuFeedback = useHideMenuFeedback();
  const hideMenuPrivateClientDesk = useHideMenuPrivateClientDesk();
  const feedback = useShowModalFeedback();

  return (
    <StyledRightbar>
      {showH5Header && <Header />}
      <div className="page-inner">
        {showPrivateClientDesk && !hideMenuPrivateClientDesk && (
          <div className="menu-wrapper">
            <div
              className="menu-item"
              onClick={() => {
                navigate('/private-client-desk');
              }}
            >
              {intl.private_client_desk}
              <RightOutlined />
            </div>
          </div>
        )}
        {!hideMenuFeedback && (
          <div className="menu-wrapper">
            <div className="menu-item" onClick={feedback}>
              {intl.feedback}
              <RightOutlined />
            </div>
          </div>
        )}

        <div className="menu-wrapper">
          <div
            className="menu-item"
            onClick={() => {
              WindowOpen(DOC_LINK);
            }}
          >
            {intl.document}
            <RightOutlined />
          </div>
        </div>

        <div className="menu-wrapper">
          <div
            className="menu-item"
            onClick={() => {
              navigate('/check_referral');
            }}
          >
            {intl.referral}
            <RightOutlined />
          </div>
        </div>
        <Community
          isShowSelect={openedMenu === MenuKey.Community}
          setIsShowSelect={() => toggleMenu(MenuKey.Community)}
        />
      </div>
    </StyledRightbar>
  );
}

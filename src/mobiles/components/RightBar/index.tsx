import React, { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { Drawer } from 'src/UI';

import usePrivateClientDeskContacts from 'src/components/PrivateClientDesk/usePrivateClientDeskContacts';
import useCustomNavigate from 'src/hooks/useCustomNavigate';

import Close from 'js/components/Icons/close';
import RightOutlined from 'js/components/Icons/RightOutlined';
import { useIntl } from 'js/locals';
import {
  useHideModals,
  useModals,
  useShowModalFeedback,
} from 'js/state/application/hooks';
import { ModalKeys } from 'js/state/application/reducer';

import Community from './Community';
import LanguageChoose from './Language';
import More from './More';
import { GlobalRightbar, StyledRightbar } from './style';

enum MenuKey {
  Account,
  Earn,
  More,
  Community,
  Language,
}

export default function RightBar() {
  const { visible } = useModals(ModalKeys.m_rightBar);
  const hide = useHideModals(ModalKeys.m_rightBar);
  const navigate = useCustomNavigate();
  const location = useLocation();
  const feedback = useShowModalFeedback();
  const intl = useIntl();
  const privateClientContacts = usePrivateClientDeskContacts();
  const showPrivateClientDesk = privateClientContacts?.hasConfig;
  const [openedMenu, setOpenMenu] = useState<MenuKey | ''>('');
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
  useEffect(() => {
    hide();
    setOpenMenu('');
  }, [location.pathname, hide]);

  return (
    <>
      <GlobalRightbar />
      <Drawer
        keepMounted
        opened={visible}
        withCloseButton={false}
        onClose={hide}
        position="right"
        className="m-right-bar"
      >
        <StyledRightbar>
          <Close size={16} onClick={hide} />
          {showPrivateClientDesk && (
            <div className="menu-wrapper">
              <div
                className="menu-item"
                onClick={() => {
                  hide();
                  navigate('/private-client-desk');
                }}
              >
                {intl.private_client_desk}
                <RightOutlined />
              </div>
            </div>
          )}
          <div className="menu-wrapper">
            <div className="menu-item" onClick={feedback}>
              {intl.feedback}
              <RightOutlined />
            </div>
          </div>
          <More
            isShowSelect={openedMenu === MenuKey.More}
            setIsShowSelect={() => toggleMenu(MenuKey.More)}
          />
          <Community
            isShowSelect={openedMenu === MenuKey.Community}
            setIsShowSelect={() => toggleMenu(MenuKey.Community)}
          />
          <LanguageChoose
            isShowSelect={openedMenu === MenuKey.Language}
            setIsShowSelect={() => toggleMenu(MenuKey.Language)}
          />
        </StyledRightbar>
      </Drawer>
    </>
  );
}

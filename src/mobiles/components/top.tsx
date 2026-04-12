import React from 'react';
import updatingIcon from 'imgs/icon_reset.svg';
import styled from 'styled-components';

import { Input } from 'src/UI';

import IconWrapper from 'src/components/Icons/IconWrapper';
import IconMobileMore from 'src/components/Icons/mobileMore';
import IconMobileWallet from 'src/components/Icons/mobileWallet';
import IconSearch from 'src/components/Icons/serch';
import useCustomNavigate from 'src/hooks/useCustomNavigate';
import Messages from 'src/mobiles/components/Messages';
import { useShowMHomeDownloadBanner } from 'src/state/user/hooks';

import IconMobileUser from 'js/components/Icons/mobileUser';
import { useIntl } from 'js/locals';
import { useWalletWeb3 } from 'js/providers/useWallet';
import { useShowModal, useShowModalLogin } from 'js/state/application/hooks';
import { ModalKeys } from 'js/state/application/reducer';
import { useDexAccount } from 'js/state/dexAccount/hooks';

import HomeDownload from '../home/components/download';

export default function Top() {
  const intl = useIntl();
  const dexAccount = useDexAccount();
  const { account } = useWalletWeb3();
  const hasAccessToken = dexAccount?.hasAccessToken;
  const updating = dexAccount?.updating;
  const login = useShowModalLogin();
  const showModal = useShowModal();
  const navigate = useCustomNavigate();

  const { show } = useShowMHomeDownloadBanner();

  return (
    <StyledTop showDownload={show}>
      {show && <HomeDownload />}
      <div className="top-inner">
        <StyledUser
          connected={!!account}
          onClick={() => {
            if (!account) login();
            else showModal({ modal: ModalKeys.m_leftBar });
          }}
        >
          <div className="icon-action">
            {!account ? (
              <IconMobileWallet size={26} />
            ) : (
              <IconMobileUser size={26} />
            )}
            {updating && hasAccessToken && (
              <img
                src={updatingIcon}
                alt="updatingIcon"
                className="updating-icon"
              />
            )}
          </div>
          {!account ? (
            <div className="action">{intl.connect_wallet}</div>
          ) : (
            <></>
          )}
        </StyledUser>
        <Input
          className="search"
          leftSection={<IconSearch />}
          value=""
          onClick={() => {
            navigate('/search');
          }}
          onChange={() => {}}
          placeholder={intl.btn_search}
        />
        <div className="menu-more-wrap">
          <Messages />
          <IconWrapper
            onClick={() => showModal({ modal: ModalKeys.m_rightBar })}
            size={40}
          >
            <IconMobileMore />
          </IconWrapper>
        </div>
      </div>
    </StyledTop>
  );
}

const StyledTop = styled.div<{ showDownload: boolean }>`
  position: absolute;
  width: 100%;
  height: ${({ showDownload }) => (showDownload ? '96px' : '52px')};
  top: 0;
  left: 0;
  .top-inner {
    background: ${(props) => props.theme.bg_main_80};
    display: flex;
    align-items: center;
    padding: 0 5px 0 20px;
    ${(props) => props.theme.fontRegular};
    min-height: 52px;
  }
  .mantine-Input-wrapper.search {
    margin-left: 10px;
    flex: 1;
    .mantine-Input-input {
      border-radius: 18px;
      flex: 1;
      height: 32px;
      padding-left: 40px;
      font-size: 14px;
      ${(props) => props.theme.fontRegular};
      .mantine-Input-icon {
        width: 40px;
        .search-icon {
          width: 16px;
        }
      }
    }
  }
  .menu-more-wrap {
    display: flex;
    align-items: center;
    font-size: 12px;
    margin-left: auto;
    padding: 0 0 0 10px;
  }
  .tvl-link {
    display: block;
    height: 40px;
    line-height: 40px;
    padding: 0 10px;
  }
`;

export const StyledUser = styled.div<{ connected: boolean }>`
  display: flex;
  align-items: center;
  .icon-action {
    display: flex;
    align-items: center;
    position: relative;
    .updating-icon {
      position: absolute;
      z-index: 1;
      width: 12px;
      bottom: 0px;
      right: 0px;
    }
  }
  .dg-icon {
    color: ${({ theme }) => theme.t_b7b};
  }

  .action {
    ${({ theme }) => theme.fontRegular};
    padding: 0 10px;
    font-size: 12px;
    color: ${({ theme }) => theme.blue};
    line-height: 20px;
    font-weight: 400;
  }
`;

export const StyledAddress = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.t_b7b};
  margin: 0 10px 0 7px;
  line-height: 20px;
  font-weight: 400;
`;

export const StyledIconWrapper = styled.div`
  width: 26px;
  height: 26px;
  background: ${({ theme }) => theme.bg_b7b_10};
  border-radius: 13px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

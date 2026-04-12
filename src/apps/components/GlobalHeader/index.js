import React from 'react';
import logo from 'imgs/logo.svg';
import logo_dark from 'imgs/logo_dark.svg';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

import { GhostBtn } from 'src/UI';

import LinkWrapper from 'src/components/LinkWrapper';
import useCustomNavigate, { isPage } from 'src/hooks/useCustomNavigate';
import { useIntl } from 'src/locals';
import useWallet from 'src/providers/useWallet';
import { useShowAppFeature } from 'src/state/dexAccount/hooks';
import { useThemeParams } from 'src/theme';
import WindowOpen from 'src/utils/windowOpen';

import { useThemeType } from 'js/state/user/hooks';

import Account from '../Account';
import LanguageChoose from '../LanguageChoose';
import Messages from '../Messages';
import Download from './download';
import Feedback from './feedback';
import Menus from './menus';
import ResetingStatus from './resetingStatus';
export default function GlobalHeader() {
  // const intl = useIntl();
  // const setTheme = useSetTheme();
  const theme = useThemeType();
  const { isMobile } = useThemeParams();
  const navigate = useCustomNavigate();
  const location = useLocation();
  const pathname = location.pathname;
  const intl = useIntl();
  const isTerms = isPage(pathname, '/terms');
  const { account } = useWallet();
  const showApp = useShowAppFeature();

  return (
    <StyledGlobalHeader
      isMobile={isMobile}
      className={`${isMobile ? 'isMobile' : ''} box-shadow`}
    >
      <div className="container">
        <div className="global-header-top">
          <LinkWrapper url="https://degate.com">
            <img
              src={theme === 'dark' ? logo_dark : logo}
              className="globalHeader-logo"
              alt="globalHeader-logo"
              onClick={() => {
                WindowOpen('https://degate.com');
              }}
            />
          </LinkWrapper>
          {!isTerms && (
            <>
              <Menus />
              {account && (
                <>
                  <LinkWrapper url="/account/balance">
                    <GhostBtn
                      eventName="btn_globalHeader_view_balance"
                      className="dg-ghost my-balance"
                      onClick={() => {
                        navigate('/account/balance');
                      }}
                    >
                      {intl.my_balance}
                    </GhostBtn>
                  </LinkWrapper>
                </>
              )}
              <ResetingStatus />
              <Account />
              <LanguageChoose />
              <Messages />
              {showApp && <Download />}
              <Feedback />
            </>
          )}
        </div>
      </div>
    </StyledGlobalHeader>
  );
}

GlobalHeader.propTypes = {};

const StyledGlobalHeader = styled.div`
  ${(props) => props.theme.fontMedium};
  width: 100%;
  padding: 0 40px 0 25px;
  background: ${(props) => props.theme.bg};
  border-bottom: 1px solid ${({ theme }) => theme.border};
  min-width: ${(props) => props.theme.viewWidth}px;

  .theme {
    margin-right: 10px;
    cursor: pointer;
  }
  .container {
    height: 56px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    .global-header-top {
      display: flex;
      align-items: center;
      width: 100%;
      height: 100%;
      .account-tpl {
        display: flex;
        margin-left: auto;
        align-items: center;
      }
      .login-btn {
        margin-left: auto;
      }
    }
  }
  .chain-tag {
    margin-right: 10px;
  }
  .globalHeader-logo {
    width: 94.1px;
    min-width: 94.1px;
    cursor: pointer;
  }
  .globalHeader-beta {
    cursor: pointer;
    width: 36px;
    margin-left: 2px;
    margin-top: 4px;
  }
  .language-wrapper {
    margin: 0 10px 0 30px;
  }
  .messages-wrapper {
    margin-right: 10px;
  }
  .download-wrapper {
    margin-right: 20px;
  }
  .my-balance.mantine-Button-root {
    height: 30px;
    min-height: 30px;
    padding: 0 10px;
    font-size: 12px;
    margin-right: ${({ theme }) =>
      theme.windowWidth < 1220 ? '20px' : '40px'};
  }
`;

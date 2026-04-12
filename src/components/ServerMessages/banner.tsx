/* eslint-disable react/no-danger */
import React, { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

import { removeLanguagePath } from 'src/hooks/useCustomNavigate';
import { pages, useBannerMessage } from 'src/state/notification/hooks';
import { useCloseBanner } from 'src/state/user/hooks';
import { ThemeType, useThemeParams } from 'src/theme';

import { useSetLocale } from 'js/locals';

import Close from '../Icons/close';
import IconWrapper from '../Icons/IconWrapper';
import IconNotice from '../Icons/notice';

export default function BannerMessage() {
  const bannerMessage = useBannerMessage();
  const closeBanner = useCloseBanner();
  const { locale } = useSetLocale();
  const location = useLocation();
  const { isMobile } = useThemeParams();

  const checkPage = useMemo(() => {
    if (!bannerMessage) return false;
    const pathname = location.pathname;
    const path = removeLanguagePath(pathname);
    return pages.some((p) => {
      return (
        p.isAppDomain &&
        p.isMobile === isMobile &&
        path.startsWith(p.path) &&
        bannerMessage.show_page[p.index] === '1'
      );
    });
  }, [location, bannerMessage, isMobile]);

  if (!bannerMessage || !checkPage) return null;
  const message = bannerMessage.i18n[locale] || bannerMessage.i18n['en-US'];
  if (!message) return null;

  return (
    <StyledMessage
      className="serverMessage-banner"
      isCloseable={bannerMessage?.is_closeable}
    >
      <IconNotice />
      {bannerMessage?.is_html ? (
        <div
          className="msg-content"
          dangerouslySetInnerHTML={{ __html: message }}
        />
      ) : (
        <div className="msg-content">{message}</div>
      )}
      {bannerMessage?.is_closeable && (
        <IconWrapper
          size={40}
          onClick={() => {
            // 解决wallet按钮错位
            closeBanner({ id: bannerMessage?.id });
          }}
        >
          <Close />
        </IconWrapper>
      )}
    </StyledMessage>
  );
}

const StyledMessage = styled.div<{ isCloseable: boolean }>`
  padding: ${({ isCloseable, theme }) =>
    theme.isMobile
      ? `10px ${isCloseable ? '45px' : '20px'} 15px 20px`
      : `10px ${isCloseable ? '60px' : '20px'} 10px 28px`};
  width: ${({ theme }: { theme: ThemeType }) => theme.viewWidth}px;
  background: ${(props) => props.theme.bg_yellow_10};
  border-radius: 0;
  position: relative;
  display: flex;
  align-items: flex-start;
  .dg-icon-wrapper {
    position: absolute;
    margin-left: ${(props) => (props.theme.isMobile ? '0px' : '10px')};
    top: 0;
    right: 0;
  }
  .icon-notice {
    margin-right: 10px;
  }
  .dg-icon {
    color: ${({ theme }) => theme.yellow};
  }
  .msg-content {
    margin-right: auto;
    ${(props) => props.theme.fontRegular};
    font-size: 14px;
    color: ${({ theme }) => theme.yellow};
    letter-spacing: 0;
    line-height: 20px;
    text-align: ${(props) => (props.theme.isMobile ? 'left' : 'left')};
    white-space: ${(props) => (props.theme.isMobile ? 'normal' : 'pre-line')};
    a {
      padding-bottom: 1px;
      color: ${({ theme }) => theme.yellow};
      border-bottom: 1px solid #febe2f;
    }
    b {
      ${(props) => props.theme.fontBold};
    }
  }
`;

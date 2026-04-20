/* eslint-disable react-hooks/rules-of-hooks */
import React, { Component, useCallback, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import {
  Navigate,
  Route,
  Routes,
  unstable_HistoryRouter as HistoryRouter,
} from 'react-router-dom';
import GlobalStyled from 'style/global-styles';
import { ThemeProvider } from 'styled-components';

import Disabled from 'js/apps/disabledRoutes';
import { DISABLED_ROUTES } from 'js/constants/dex';
import App from 'js/containers/app';
import AppH5 from 'js/containers/h5';
import Mobile from 'js/containers/mobile';
import { appHistory } from 'js/history';
import { useSetLocale } from 'js/locals';
import NotificationProvider from 'js/providers/useNotification';
import getTheme from 'js/theme';

import ComponentLibrary from './components/UEDDevTools/ComponentLibrary';
import UEDSettingsButton from './components/UEDDevTools/UEDSettingsButton';
import { useShowH5Header } from './h5/utils';
import useWindowSize from './hooks/useWindowSize';
import { useUEDSettings } from './mock/MockModeContext';
import useMessage from './providers/useMessage';
import useWallet, { useIsAppH5, useIsMobile } from './providers/useWallet';
import MantineThemeProvider from './UI/Provider';
import { logCsp } from './utils/log';

/** Surfaces render errors instead of a blank screen after the initial HTML spinner. */
class RootErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  render() {
    const { error } = this.state;
    if (error) {
      return (
        <div
          style={{
            padding: 24,
            color: '#fff',
            background: '#2a1010',
            fontFamily: 'monospace',
            whiteSpace: 'pre-wrap',
            minHeight: '100vh',
            boxSizing: 'border-box',
          }}
        >
          <h2 style={{ marginTop: 0 }}>DeGate UED — 页面渲染出错</h2>
          <p>请把下面信息发给开发者或在 Console 查看完整堆栈。</p>
          <code>{String(error && error.message ? error.message : error)}</code>
        </div>
      );
    }
    return this.props.children;
  }
}

RootErrorBoundary.propTypes = {
  children: PropTypes.node,
};

export default function root({ updaters }) {
  let disabledRoutes = [];
  if (DISABLED_ROUTES) {
    disabledRoutes = DISABLED_ROUTES.split(';');
  }
  const { locale } = useSetLocale();
  const { width, height } = useWindowSize();
  const isMobile = useIsMobile();
  const isAppH5 = useIsAppH5();
  const showH5Header = useShowH5Header();
  const { theme: uedTheme, fontPreset: uedFontPreset } = useUEDSettings();
  const themeObject = useMemo(
    () =>
      getTheme({
        width,
        height,
        isMobile: isMobile || isAppH5,
        isAppH5,
        showH5Header,
        theme: uedTheme,
        fontPreset: uedFontPreset,
      }),
    [width, height, isMobile, isAppH5, showH5Header, uedTheme, uedFontPreset]
  );
  const message = useMessage();
  window.message = message;

  const logCSP = useCallback((event) => {
    const blockedURI = event.blockedURI;
    const documentURI = event.documentURI;
    const violatedDirective = event.violatedDirective;

    const errorData = {
      blockedURI,
      documentURI,
      violatedDirective,
    };
    logCsp({
      event: 'csp',
      data: errorData,
      log_error: 'csp error',
    });
  }, []);

  useEffect(() => {
    window.addEventListener('securitypolicyviolation', logCSP);
    return () => {
      window.removeEventListener('securitypolicyviolation', logCSP);
    };
  }, [logCSP]);
  const { walletStateReady } = useWallet();

  return (
    <ThemeProvider theme={{ ...themeObject, locale }}>
      <MantineThemeProvider>
        <NotificationProvider>
          {/* <ErrorBoundary> */}
          <HistoryRouter history={appHistory}>
            <RootErrorBoundary>
              {walletStateReady !== false && (
                <Routes>
                  {disabledRoutes.map((d) => {
                    return (
                      <Route
                        path={d}
                        key={d}
                        element={<Navigate to="/disabled" replace />}
                      />
                    );
                  })}
                  <Route path="/disabled" element={<Disabled />} />
                  <Route
                    path="/ued-components"
                    element={<ComponentLibrary />}
                  />
                  <Route
                    path="*"
                    element={
                      <>
                        {isMobile && <Mobile />}
                        {isAppH5 && <AppH5 />}
                        {!isMobile && !isAppH5 && <App />}
                      </>
                    }
                  />
                </Routes>
              )}
            </RootErrorBoundary>
            {updaters}
          </HistoryRouter>
          {/* </ErrorBoundary> */}
          <GlobalStyled />
        </NotificationProvider>
      </MantineThemeProvider>
      <UEDSettingsButton />
    </ThemeProvider>
  );
}

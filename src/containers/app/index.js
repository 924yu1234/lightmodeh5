import React, { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';

import DGLoading from 'src/apps/components/DGLoading';
import BannerMessage from 'src/components/ServerMessages/banner';
import useLogPageVisit from 'src/hooks/useEventTrack/utils/useLogPageVisit';
import { LANGUAGES } from 'src/locals/intlUtils';

import GlobalFooter from 'js/apps/components/GlobalFooter';
import GlobalHeader from 'js/apps/components/GlobalHeader';
import SiteMaintenance from 'js/components/siteMaintenance';
import { useInfo } from 'js/state/application/hooks';

import { RedirectLang } from '../redirectLang';
import Modals from './modals';
import navs from './navs';

export default function App() {
  const info = useInfo();
  useLogPageVisit();

  return (
    <StyledApp className="hideScrollBar" id="appContainer">
      <GlobalHeader />
      <BannerMessage />
      <div className="app-center">
        <div className="app-center-inner">
          {info?.serviceStatus?.stopService ? (
            <SiteMaintenance time={info?.serviceStatus?.stopServiceTime} />
          ) : (
            <Routes>
              {navs.map((nav) => {
                const Comp = nav.element;
                return (
                  <React.Fragment key={nav.path}>
                    {LANGUAGES.map((lang) => {
                      if (nav.redirect) {
                        return (
                          <Route
                            key={`/${lang.path}${nav.path}`}
                            path={`/${lang.path}${nav.path}`}
                            element={<Navigate to={nav.redirect} replace />}
                          />
                        );
                      }
                      return (
                        <Route
                          key={`/${lang.path}${nav.path}`}
                          path={`/${lang.path}${nav.path}`}
                          element={
                            <Suspense fallback={<DGLoading />}>
                              <RedirectLang>
                                <Comp />
                              </RedirectLang>
                            </Suspense>
                          }
                        />
                      );
                    })}
                    {nav.redirect ? (
                      <Route
                        key={nav.path}
                        path={`${nav.path}`}
                        element={<Navigate to={nav.redirect} replace />}
                      />
                    ) : (
                      <Route
                        key={nav.path}
                        path={`${nav.path}`}
                        element={
                          <Suspense fallback={<DGLoading />}>
                            <RedirectLang>
                              <Comp />
                            </RedirectLang>
                          </Suspense>
                        }
                      />
                    )}
                  </React.Fragment>
                );
              })}
              <Route path="*" element={<Navigate to="swap" replace />} />
            </Routes>
          )}
        </div>
        <GlobalFooter />
      </div>
      <Modals />
    </StyledApp>
  );
}

App.propTypes = {};

const StyledApp = styled.div`
  height: 100%;
  width: 100%;
  margin: 0 auto;
  color: ${(props) => props.theme.colorMain};
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: ${(props) => {
    return props.theme.windowWidth < props.theme.viewWidth ? 'auto' : 'hidden';
  }};

  .app-center {
    min-width: ${(props) => props.theme.viewWidth - 20}px;
    flex: 1;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    .app-center-inner {
      position: relative;
      flex: 1;
    }
  }
`;

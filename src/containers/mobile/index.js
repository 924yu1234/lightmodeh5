import React, { Suspense, useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import styled from 'styled-components';

import DGLoading from 'src/apps/components/DGLoading';
import { isPage } from 'src/hooks/useCustomNavigate';
import useLogPageVisit from 'src/hooks/useEventTrack/utils/useLogPageVisit';
import { LANGUAGES } from 'src/locals/intlUtils';

import SiteMaintenance from 'js/components/siteMaintenance';
import { useInfo } from 'js/state/application/hooks';

import { RedirectLang } from '../redirectLang';
import Modals from './modals';
import navs from './navs';

export default function Mobile() {
  const info = useInfo();
  const location = useLocation();
  const pathname = location.pathname;
  useLogPageVisit();

  useEffect(() => {
    if (isPage(pathname, '/')) {
      document.body.style.overscrollBehaviorX = 'none';
    } else {
      document.body.style.overscrollBehaviorX = 'auto';
    }
  }, [pathname]);

  return (
    <StyledMobile className="hideScrollBar" id="appContainer">
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
      </div>
      <Modals />
    </StyledMobile>
  );
}

Mobile.propTypes = {};

const StyledMobile = styled.div`
  height: 100%;
  width: 100%;
  margin: 0 auto;
  color: ${(props) => props.theme.colorMain};
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  user-select: none;

  .app-center {
    flex: 1;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    .app-center-inner {
      // padding-bottom: ${(props) => (props.showFooter ? '80px' : '0')};
      position: relative;
      flex: 1;
    }
  }
`;

import React, { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';

import DGLoading from 'src/apps/components/DGLoading';
import { appHistory } from 'src/history';
import { checkUrlHasLanguagePath } from 'src/hooks/useCustomNavigate';
import useLogPageVisit from 'src/hooks/useEventTrack/utils/useLogPageVisit';
import { useSetLocale } from 'src/locals';
import { LANGUAGES } from 'src/locals/intlUtils';

import SiteMaintenance from 'js/components/siteMaintenance';
import { useInfo } from 'js/state/application/hooks';

import { RedirectLang } from '../redirectLang';
import Modals from './modals';
import navs from './navs';

// app中的h5页面
export default function AppH5() {
  const info = useInfo();
  useLogPageVisit();
  // const customNavigate = useCustomNavigate();
  const { setLocale, locale } = useSetLocale();
  window.customNavigate = (path, options) => {
    const hasPath = checkUrlHasLanguagePath(path);
    if (hasPath) {
      const pathLocale = path.split('/')[1];
      if (pathLocale && pathLocale !== locale) {
        setLocale(pathLocale);
      }
    }
    window.DeGateHistory = appHistory;
    appHistory.replace(path, { ...options, replace: true });
    // customNavigate(path, { ...options, replace: true });
  };

  return (
    <StyledH5 className="hideScrollBar" id="appContainer">
      <div className="app-center">
        <div className="app-center-inner">
          {info?.serviceStatus?.stopService ? (
            <SiteMaintenance time={info?.serviceStatus?.stopServiceTime} />
          ) : (
            <Routes>
              {navs.map((nav) => {
                const Comp = nav.element;
                return (
                  <>
                    {LANGUAGES.map((lang) => {
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
                  </>
                );
              })}
              <Route path="*" element={<Navigate to="menus" replace />} />
            </Routes>
          )}
        </div>
      </div>
      <Modals />
    </StyledH5>
  );
}

const StyledH5 = styled.div`
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

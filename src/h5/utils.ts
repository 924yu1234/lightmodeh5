import { useMemo } from 'react';

import { useIsAppH5 } from 'src/providers/useWallet';
import { compareVersions } from 'src/utils/numberUtils';

// 1.0.17 版本后显示h5头部
export function useShowH5Header() {
  const isAppH5 = useIsAppH5();
  return useMemo(() => {
    const AppVersion = window._degate_app?.appVersion;
    if (!isAppH5 || !AppVersion) {
      return true;
    }
    return compareVersions(AppVersion, '1.0.17') >= 0;
  }, [isAppH5]);
}

// 1.0.20 版本后隐藏菜单反馈
export function useHideMenuFeedback() {
  const isAppH5 = useIsAppH5();
  return useMemo(() => {
    const AppVersion = window._degate_app?.appVersion;
    if (!isAppH5 || !AppVersion) {
      return true;
    }
    return compareVersions(AppVersion, '1.0.20') >= 0;
  }, [isAppH5]);
}

// 1.0.20 版本后 Private Client Desk 入口改版到 首页
export function useHideMenuPrivateClientDesk() {
  const isAppH5 = useIsAppH5();
  return useMemo(() => {
    const appVersion = window._degate_app?.appVersion;
    if (!isAppH5 || !appVersion) {
      return false;
    }
    return compareVersions(appVersion, '1.0.20') >= 0;
  }, [isAppH5]);
}

// 1.0.20版本或者ios设备显示share按钮
export function useShowShareButton() {
  return useIsAppH5();
  // return useMemo(() => {
  //   const appVersion = window._degate_app?.appVersion;
  //   if (!isAppH5 || !appVersion) {
  //     return false;
  //   }
  //   if (isIOS || isMacOs) {
  //     return true;
  //   }
  //   return compareVersions(appVersion, '1.0.20') >= 0;
  // }, [isAppH5]);
}

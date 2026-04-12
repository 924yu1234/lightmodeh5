import { useCallback } from 'react';
import queryString from 'query-string';
import { useNavigate } from 'react-router-dom';

import { useSetLocale } from 'src/locals';
import { LANGUAGES } from 'src/locals/intlUtils';
import { useGaEvent } from 'src/providers/useWallet';

export default function useCustomNavigate() {
  const navigate = useNavigate();
  const { languagePath } = useSetLocale();
  const gaEvent = useGaEvent();
  return useCallback(
    (to: any, options?: any) => {
      if (to === -1) {
        navigate(to, options);
        gaEvent('web_navigate', {
          path: to,
          from: window.location.pathname,
        });
        return;
      }
      const currentQuery = queryString.parse(window.location.search);
      const sParam = currentQuery.s;
      const prefix = `/${languagePath}`;
      if (typeof to === 'string') {
        const path = checkUrlHasLanguagePath(to) ? to : `${prefix}${to}`;

        // 解析目标URL的查询参数
        const [pathname, search] = path.split('?');
        const targetQuery = queryString.parse(search || '');

        // 保留s参数
        if (sParam) {
          targetQuery.s = sParam;
        }

        const newSearch = queryString.stringify(targetQuery);
        const newPath = `${pathname}${newSearch ? `?${newSearch}` : ''}`;
        gaEvent('web_navigate', {
          path: newPath,
        });
        navigate(newPath, options);
      } else {
        const path = {
          ...to,
          pathname: checkUrlHasLanguagePath(to.pathname)
            ? to.pathname
            : `${prefix}${to.pathname}`,
        };

        const targetQuery = queryString.parse(to.search || '');
        if (sParam) {
          targetQuery.s = sParam;
        }
        path.search = queryString.stringify(targetQuery);
        gaEvent('web_navigate', {
          path,
          from: window.location.pathname,
        });
        navigate(path, options);
      }
    },
    [languagePath, navigate, gaEvent]
  );
}

export function checkUrlHasLanguagePath(url: string) {
  return LANGUAGES.some((d) => {
    return (
      url.includes(`/${d.path}/`) ||
      url.includes(`/${d.path}?`) ||
      url === `/${d.path}` ||
      url === `/${d.path}?`
    );
  });
}

// 忽略languagePath
export function isPage(pathname: string, page: string) {
  const comparePath = removeLanguagePath(pathname);
  // console.log(
  //   'isPage',
  //   pathname,
  //   '===>',
  //   comparePath,
  //   ' vs ',
  //   page,
  //   ': ',
  //   comparePath === page
  // );
  return comparePath === page;
}

export function removeLanguagePath(pathname: string) {
  if (checkUrlHasLanguagePath(pathname)) {
    const res = pathname.replace(/\/[^/]*/, '');
    if (res === '') return '/';
    return res;
  }
  return pathname;
}

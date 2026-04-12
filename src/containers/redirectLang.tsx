import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import {
  checkUrlHasLanguagePath,
  removeLanguagePath,
} from 'src/hooks/useCustomNavigate';
import { useSetLocale } from 'src/locals';

export function RedirectLang({ children }: { children: any }) {
  const { languagePath } = useSetLocale();
  const navigate = useNavigate();

  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    const hasPath = checkUrlHasLanguagePath(pathname);
    if (!hasPath && languagePath) {
      navigate(`/${languagePath}${pathname}${location.search}`, {
        replace: true,
      });
    }
    // 如果路径有语言路径，但不是环境当前语言，默认跳转当前语言路径
    if (hasPath && !pathname.includes(`/${languagePath}/`)) {
      navigate(
        `/${languagePath}${removeLanguagePath(pathname)}${location.search}`,
        {
          replace: true,
        }
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [languagePath, pathname]);

  return children;
}

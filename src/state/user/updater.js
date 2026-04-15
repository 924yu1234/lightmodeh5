/* eslint-disable consistent-return */
import { useEffect } from 'react';
import queryString from 'query-string';
import { useLocation } from 'react-router-dom';

import useCustomNavigate from 'src/hooks/useCustomNavigate';

export default function UserExportDataUpdater() {
  const location = useLocation();
  const navigate = useCustomNavigate();

  // 推荐码
  useEffect(() => {
    const { utm_source, uuid, ...rest } =
      queryString.parse(location.search) ?? {};

    if (utm_source || uuid) {
      navigate(`${location.pathname}?${queryString.stringify(rest)}`, {
        replace: true,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}

UserExportDataUpdater.propTypes = {};

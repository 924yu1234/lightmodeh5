/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { fetchedBannerMessage } from './reducer';
import { fetchBanner } from './service';
export default function UpdaterNotificationBanner() {
  const dispatch = useDispatch();

  useEffect(() => {
    fetchBanner()
      .then((resp) => {
        dispatch(fetchedBannerMessage({ messages: resp }));
      })
      .catch(() => {});
  }, [fetchBanner]);
  return null;
}

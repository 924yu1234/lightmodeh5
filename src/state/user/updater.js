/* eslint-disable consistent-return */
import { useEffect, useState } from 'react';
import queryString from 'query-string';
import { useLocation } from 'react-router-dom';

import useCustomNavigate from 'src/hooks/useCustomNavigate';

import { useFetchExportDataStatus } from 'js/components/ExportData/service';
import { useDexAccount } from 'js/state/dexAccount/hooks';

import { useModals } from '../application/hooks';
import { ModalKeys } from '../application/reducer';
import { useExportDataJob, useSaveExportDataJob } from './hooks';

export default function UserExportDataUpdater() {
  const job = useExportDataJob();
  const { hide } = useModals(ModalKeys.exportData); // ORDER TRADE

  const [index, setIndex] = useState(0);

  const dexAccount = useDexAccount();
  const save = useSaveExportDataJob();
  const fetchStatus = useFetchExportDataStatus();

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

  const checkJob = () => {
    if (!job?.id || job?.download) return;
    fetchStatus({ id: job.id }).then((resp) => {
      // save(resp);
      if (resp.state === 'completed' || resp.state === 'expired') {
        const link = document.createElement('a');
        link.href = resp.download_url;
        link.click();
        save({ ...resp, download: true });
        hide();
      } else {
        save(resp);
      }
    });
  };

  useEffect(() => {
    if (!dexAccount.hasAccessToken) return;
    if (!job?.id) return;
    checkJob();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [job?.id, dexAccount.hasAccessToken, save, index]);

  useEffect(() => {
    if (!job?.id || job.state === 'completed') return () => {};
    const timer = setTimeout(() => {
      setIndex((pre) => pre + 1);
    }, 3000);
    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, job?.id]);

  return null;
}

UserExportDataUpdater.propTypes = {};

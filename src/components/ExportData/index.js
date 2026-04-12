import React, { useCallback, useEffect, useState } from 'react';
import { useThrottle } from 'ahooks';
import iconDownload from 'imgs/popup_download.svg';
import { min } from 'lodash';
import styled from 'styled-components';

import { Checkbox as DeCheckbox, Modal, PrimaryBtn } from 'src/UI';

import Close from 'js/components/Icons/close';
import { useIntl } from 'js/locals';
import { useModals } from 'js/state/application/hooks';
import { ModalKeys } from 'js/state/application/reducer';
import { useExportDataJob, useSaveExportDataJob } from 'js/state/user/hooks';
import digit from 'js/utils/digit';

import { useCreateExportData, useFetchExportDataStatus } from './service';

export default function ExportData() {
  const { visible, hide, type = 'ORDER' } = useModals(ModalKeys.exportData); // ORDER TRADE
  const [status, setStatus] = useState('check'); // init processing
  const [includeGridStrategyOrders, setIncludeGridStrategyOrders] =
    useState(true);
  const job = useExportDataJob();
  const saveJob = useSaveExportDataJob();

  const fetchStatus = useFetchExportDataStatus();
  const createData = useCreateExportData();

  useEffect(() => {
    if (job.id && (job.state === 'pending' || job.state === 'processing')) {
      setStatus('processing');
      return;
    }
    fetchStatus({ id: -1 }).then((resp) => {
      if (!resp?.id || resp.state === 'completed' || resp.state === 'expired') {
        setStatus('init');
      }
      if (resp.state === 'pending' || resp.state === 'processing') {
        setStatus('processing');
        saveJob(resp);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchStatus, job]);

  const intl = useIntl();

  let _percent = '0%';

  if (job.id) {
    if (job.state === 'completed' || job.state === 'expired') {
      _percent = '100%';
    } else {
      const now = new Date().valueOf();
      const time = now - job.create_time;
      const max = 60000;
      let p = min([0.99, time / max]);
      if (p < 0) {
        p = 0;
      }
      _percent = digit.format(p, '0%');
    }
  }

  const percent = useThrottle(_percent, 1000);

  const create = useCallback(() => {
    createData({ type, includeGridStrategyOrders }).then((resp) => {
      saveJob({
        id: resp,
        state: 'pending',
        create_time: new Date().valueOf(),
      });
    });
  }, [createData, type, includeGridStrategyOrders, saveJob]);

  return (
    <Modal title={null} onClose={hide} opened={visible}>
      <StyledExportData percent={percent}>
        <div className="modal-title">
          <Close onClick={hide} />
        </div>
        <img src={iconDownload} alt="iconDownload" className="icon-download" />
        <div className="title">{intl['orders.export_data_2_year']}</div>
        {status !== 'processing' && (
          <div className="checkbox-tpl">
            {type === 'ORDER' && (
              <DeCheckbox
                showHoverBg
                checked={includeGridStrategyOrders}
                onChange={(e) => setIncludeGridStrategyOrders(e.target.checked)}
                label={intl.including_grid_strategy_orders}
              />
            )}
          </div>
        )}
        {status === 'check' && (
          <PrimaryBtn eventName="btn_export_data" loading>
            {intl['orders.export']}
          </PrimaryBtn>
        )}
        {status === 'processing' && (
          <>
            <div className="tips">
              {intl['orders.export_processing']} ({percent})
            </div>
            <div className="process-tpl">
              <div className="process-inner"></div>
            </div>
            <div className="tips2">
              {intl['orders.export_tips_100_percent']}
            </div>
          </>
        )}
        {status === 'init' && (
          <PrimaryBtn eventName="btn_export_data" onClick={create}>
            {intl['orders.export']}
          </PrimaryBtn>
        )}
      </StyledExportData>
    </Modal>
  );
}

ExportData.propTypes = {};

const StyledExportData = styled.div`
  width: 100%;
  padding: 0 20px 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  ${(props) => props.theme.fontRegular};
  .modal-title {
    margin-bottom: 20px;
  }
  .icon-download {
    width: 60px;
    height: 60px;
  }
  .title {
    ${(props) => props.theme.fontRegular};
    font-size: 16px;
    color: ${({ theme }) => theme.t_fff};
    margin-top: 20px;
  }
  .tips {
    ${(props) => props.theme.fontRegular};
    font-size: 14px;
    opacity: 0.8;
    margin: 30px 0 10px;
  }
  .checkbox-tpl {
    margin-top: 30px;
    width: 100%;
  }
  .process-tpl {
    display: flex;
    align-items: center;
    width: 100%;
    .process-inner {
      background: ${(props) => props.theme.bg_white_15};
      border-radius: 4.5px;
      position: relative;
      height: 14px;
      width: 100%;
      &:before {
        content: '';
        position: absolute;
        width: ${(props) => props.percent};
        background: ${({ theme }) => theme.blue};
        border-radius: 6px;
        left: 0;
        top: 0;
        transition: width 1.5s ease;
        height: 14px;
      }
    }
  }
  .tips2 {
    ${(props) => props.theme.fontRegular};
    font-size: 14px;
    color: ${(props) => props.theme.modalDesc};
    margin: auto;
    margin-top: 20px;
    width: 270px;
    text-align: center;
  }
  .dg-primary {
    margin-top: 10px;
    width: 100%;
  }
`;

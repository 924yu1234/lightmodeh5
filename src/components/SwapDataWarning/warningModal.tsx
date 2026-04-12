import React, { useEffect, useMemo } from 'react';
import styled from 'styled-components';

import { Modal, PrimaryBtn } from 'src/UI';

import {
  useDABalanceDisconnected,
  useShowDataWarning,
  useSwapTickerVal,
} from 'src/state/swap/pair/hooks';
import { ThemeType } from 'src/theme';

import Close from 'js/components/Icons/close';
import { useIntl } from 'js/locals';
import { useModals } from 'js/state/application/hooks';
import { ModalKeys } from 'js/state/application/reducer';

import IconStatusFailed from '../Icons/StatusFailed';

export default function SwapDataWarningModal() {
  const { visible, hide } = useModals(ModalKeys.swapDataWarning);
  const showDataWarning = useShowDataWarning();

  useEffect(() => {
    if (!showDataWarning) {
      hide();
    }
  }, [showDataWarning, hide]);

  const intl = useIntl();
  const apiDisconnected = useDABalanceDisconnected();

  const last_updated = useSwapTickerVal('last_updated');

  const last_updated_time_str = useMemo(() => {
    const time = Date.now() - Number(last_updated) * 1000;
    if (time <= 300000) {
      return '';
    }
    if (time <= 3600000) {
      return intl.time_M_m.replace('M', Math.round(time / 60000));
    }
    if (time <= 86400000) {
      return intl.time_H_h.replace('H', Math.round(time / 3600000));
    }
    return intl.time_D_day.replace('D', Math.round(time / 86400000));
  }, [last_updated, intl]);

  const hideModal = () => {
    hide();
  };

  return (
    <Modal title={null} onClose={hideModal} opened={visible}>
      <StyledCommonTips>
        <div className="modal-title">
          {intl.Connection_Status}
          <Close onClick={hideModal} />
        </div>
        {!!last_updated_time_str && (
          <div className="item">
            <div className="item-title">{intl.Market_Info}</div>
            <div className="item-desc">{intl.Market_Info_tips}</div>
            <div className="item-content">
              <IconStatusFailed />
              <div className="last-updated">{intl.Last_updated}:</div>
              <div className="time-ago">
                {intl.TIME_ago.replace('TIME', last_updated_time_str)}
              </div>
            </div>
          </div>
        )}
        {apiDisconnected && (
          <div className="item">
            <div className="item-title">{intl.Asset_Info}</div>
            <div className="item-desc">{intl.Your_available_balance}</div>
            <div className="item-content">
              <IconStatusFailed />
              {intl.Disconnected}
            </div>
          </div>
        )}
        <PrimaryBtn
          eventName="btn_swap_data_warning_confirm"
          onClick={hideModal}
        >
          {intl.btn_confirm}
        </PrimaryBtn>
      </StyledCommonTips>
    </Modal>
  );
}

const StyledCommonTips = styled.div`
  width: 100%;
  padding: 0 16px 30px;
  display: flex;
  align-items: center;
  flex-direction: column;

  .modal-title {
    margin-bottom: 32px;
  }

  .item {
    width: 100%;
    margin-bottom: 15px;
    .item-title {
      font-size: 14px;
      line-height: 20px;
      ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
      color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_60};
      margin-bottom: 4px;
    }
    .item-desc {
      font-size: 12px;
      line-height: 18px;
      ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
      color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_60};
      margin-bottom: 15px;
    }
    .item-content {
      padding: 15px;
      display: flex;
      line-height: 20px;
      align-items: center;
      gap: 5px;
      background: ${({ theme }: { theme: ThemeType }) => theme.bg_10};
      border-radius: 5px;
      font-size: 14px;
      color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
      .last-updated {
        color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_80};
      }
    }
  }

  .dg-primary {
    width: 100%;
    margin-top: 15px;
  }
`;

/* eslint-disable react/no-danger */
import React from 'react';
import styled from 'styled-components';

import { Modal, PrimaryBtn } from 'src/UI';

import { useLocalTimeDiff } from 'src/state/dexAccount/hooks';
import { ThemeType } from 'src/theme';

import { useIntl } from 'js/locals';
import { useModals } from 'js/state/application/hooks';
import { ModalKeys } from 'js/state/application/reducer';

import Close from '../Icons/close';
import IconTimeFast from '../Icons/timeFast';
import IconTimeSlow from '../Icons/timeSlow';

export default function LocalTimeTips() {
  const intl = useIntl();
  const { visible, hide } = useModals(ModalKeys.tips_localTime);
  const localTimeDiff = useLocalTimeDiff();
  const time = Math.ceil(Math.abs(localTimeDiff / 1000));
  const Tips =
    localTimeDiff < 0
      ? intl.device_fast.replace('{time}', time)
      : intl.device_slow.replace('{time}', time);

  return (
    <Modal title={null} onClose={hide} opened={visible}>
      <StyledLocalTimeTipsModal>
        <div className="modal-title">
          <Close onClick={hide} />
        </div>
        {localTimeDiff < 0 ? <IconTimeFast /> : <IconTimeSlow />}
        <div className="title" dangerouslySetInnerHTML={{ __html: Tips }} />
        <div
          className="content"
          dangerouslySetInnerHTML={{ __html: intl.localTime_tips }}
        />
        <PrimaryBtn eventName="btn_local_time_tips_close" onClick={hide}>
          {intl.Close}
        </PrimaryBtn>
      </StyledLocalTimeTipsModal>
    </Modal>
  );
}

const StyledLocalTimeTipsModal = styled.div`
  width: 100%;
  padding: 0 20px 30px;
  ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
  display: flex;
  flex-direction: column;
  align-items: center;
  .modal-title {
    margin-bottom: 20px;
  }
  .dg-icon {
    margin: 0 0 10px;
    width: 50px;
    height: 50px;
  }
  .title {
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
    line-height: 22px;
    font-size: 16px;
    text-align: center;
    ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
    b {
      display: block;
      margin-top: 5px;
      ${({ theme }: { theme: ThemeType }) => theme.fontBold};
      color: ${({ theme }: { theme: ThemeType }) => theme.yellow};
    }
  }
  .content {
    background: ${({ theme }: { theme: ThemeType }) => theme.modalInnerBg};
    border-radius: 5px;
    padding: 16px;
    line-height: 20px;
    font-size: 14px;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff_80};
    margin-top: 15px;
    b {
      display: block;
      margin-top: 10px;
      ${({ theme }: { theme: ThemeType }) => theme.fontBold};
    }
  }
  .dg-primary {
    margin-top: 20px;
    width: 100%;
  }
`;

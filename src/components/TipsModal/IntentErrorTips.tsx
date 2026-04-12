/* eslint-disable react/no-danger */
import React, { useEffect } from 'react';
import styled from 'styled-components';

import { Modal, PrimaryBtn } from 'src/UI';

import { useCommonConfig } from 'src/hooks/useClientConfig';
import { ThemeType } from 'src/theme';

import { useIntl, useSetLocale } from 'js/locals';
import { useModals } from 'js/state/application/hooks';
import { ModalKeys } from 'js/state/application/reducer';

import IconStatusFailed2 from '../Icons/StatusFailed2';

export default function IntentErrorTips() {
  const intl = useIntl();
  const { visible, hide, errorCode } = useModals(ModalKeys.tips_intent_error);
  const { data: configs, loading: configsLoading } =
    useCommonConfig('api_errors');
  const config = (configs || []).find(
    (config: any) => config.code === errorCode
  );
  const localMap: Record<number, string> = {
    141001: intl.confirmation_expired,
  };
  const localMessage = localMap[errorCode] || '';
  const { locale } = useSetLocale();

  useEffect(() => {
    if (!configsLoading && !config && !localMessage) {
      hide();
    }
  }, [config, localMessage, configsLoading, hide]);

  if (!config && !localMessage) {
    return null;
  }
  const message = config?.message || {};
  const showMessage =
    message?.[locale] || message?.['en-US'] || localMessage || '';

  return (
    <Modal
      title={null}
      onClose={hide}
      opened={visible}
      closeOnClickOutside={false}
      closeOnEscape={false}
    >
      <StyledBlacklistTips>
        <IconStatusFailed2 size={50} />
        <div className="status-text">{intl.Failed}</div>
        <div
          className="title"
          dangerouslySetInnerHTML={{ __html: showMessage }}
        />
        <PrimaryBtn eventName="btn_error_tips_close" onClick={hide}>
          {intl.Close}
        </PrimaryBtn>
      </StyledBlacklistTips>
    </Modal>
  );
}

const StyledBlacklistTips = styled.div`
  padding: 40px 20px 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  .icons {
    display: flex;
    align-items: center;
  }
  .status-text {
    ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
    font-size: 20px;
    color: ${(props) => props.theme.t_fff};
    text-align: center;
    line-height: 28px;
    margin: 15px 0 10px;
  }
  .title {
    font-size: 16px;
    ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
    color: ${(props) => props.theme.t_fff};
    text-align: center;
    line-height: 22px;
  }
  .dg-primary {
    width: 100%;
    margin-top: 30px;
  }
`;

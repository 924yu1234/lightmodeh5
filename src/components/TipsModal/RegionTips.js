import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { Modal, PrimaryBtn } from 'src/UI';

import {
  useDexAccount,
  useRefreshDexAccount,
} from 'src/state/dexAccount/hooks';
import { useRegionIntl } from 'src/state/regionCheck/hooks';
import { logRequest } from 'src/utils/log';

import { useIntl } from 'js/locals';
import {
  useModals,
  useRefreshEnclavaInfo,
  useRegionInfo,
} from 'js/state/application/hooks';
import { ModalKeys } from 'js/state/application/reducer';

import IconPopupWarning from '../Icons/Warning';
import Spin from '../Spin';

export default function RegionTips() {
  const intl = useIntl();
  const { visible, hide, isRaffle } = useModals(ModalKeys.tips_region);
  const { isRegionDisabled } = useRegionInfo();
  const { isInWhitelist, hasFetchedDA, account } = useDexAccount();
  const region = useRegionIntl();
  const refreshEnclavaInfo = useRefreshEnclavaInfo();
  const [regionStr, setStr] = useState('--');
  const refreshDexAccount = useRefreshDexAccount();

  useEffect(() => {
    if (isInWhitelist) {
      hide();
    }
  }, [isInWhitelist, hide]);

  useEffect(() => {
    logRequest({
      event: 'region_tips',
      region,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loading = !isRegionDisabled && !isRaffle;

  // 切换VPN场景，需要刷新接口获取当前被禁止的regionCode
  useEffect(() => {
    if (!isRegionDisabled && !isRaffle) refreshEnclavaInfo();
    refreshDexAccount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isRegionDisabled || isRaffle) {
      setStr(region);
    }
  }, [isRegionDisabled, isRaffle, region]);

  if (account && !hasFetchedDA) {
    return null;
  }

  return (
    <Modal
      title={null}
      onClose={hide}
      opened={visible}
      closeOnClickOutside={false}
      closeOnEscape={false}
    >
      <StyledRegionTips>
        <Spin spinning={loading}>
          <div className="modal-title"></div>
          <IconPopupWarning />
          <div className="title">
            {intl.service_unavailable_for_region_REGION.replace(
              'REGION',
              regionStr
            )}
          </div>
        </Spin>
        {!isRaffle && (
          <PrimaryBtn eventName="btn_region_tips_close" onClick={hide}>
            {intl.btn_confirm}
          </PrimaryBtn>
        )}
      </StyledRegionTips>
    </Modal>
  );
}

RegionTips.propTypes = {};

const StyledRegionTips = styled.div`
  padding: 0 20px 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  .modal-title {
    margin-bottom: 20px;
  }
  .icon-popup-warning {
    margin: 0 auto 20px;
    display: block;
  }
  .title {
    font-size: 14px;
    color: ${(props) => props.theme.modalTitle};
    ${(props) => props.theme.fontRegular};
    text-align: center;
    line-height: 20px;
  }
  .dg-primary {
    margin-top: 30px;
    width: 100%;
  }
`;

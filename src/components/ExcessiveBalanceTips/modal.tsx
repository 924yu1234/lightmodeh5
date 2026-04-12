import React, { useMemo } from 'react';
import styled from 'styled-components';

import { Modal, PrimaryBtn } from 'src/UI';

import useCustomNavigate from 'src/hooks/useCustomNavigate';
import { useIsPrivy } from 'src/hooks/useWalletHooks';
import { useShowAppFeature } from 'src/state/dexAccount/hooks';
import digit from 'src/utils/digit';

import Close from 'js/components/Icons/close';
import { useIntl } from 'js/locals';
import { useModals } from 'js/state/application/hooks';
import { ModalKeys } from 'js/state/application/reducer';

export default function ExcessiveBalanceTips() {
  const intl = useIntl();
  const { visible, hide } = useModals(ModalKeys.tips_excessiveBalance);
  const showApp = useShowAppFeature();
  const navigate = useCustomNavigate();
  const isPrivy = useIsPrivy();

  const limitValue = useMemo(() => {
    return isPrivy ? 3000 : 10000;
  }, [isPrivy]);
  const limitDisplay = useMemo(() => {
    return digit.format(limitValue, '0,0');
  }, [limitValue]);
  const tips1Text = useMemo(() => {
    return intl.warning_excessive_balance_detected_tips1.replace(
      'XXX',
      limitDisplay
    );
  }, [intl.warning_excessive_balance_detected_tips1, limitDisplay]);

  return (
    <Modal title={null} onClose={hide} opened={visible}>
      <StyledExcessiveBalanceTips>
        <div className="modal-title">
          <Close onClick={hide} />
        </div>
        <div className="title">{intl.warning_excessive_balance_detected}</div>
        <div className="tips">{tips1Text}</div>
        <div className="tips">
          {showApp
            ? intl.warning_excessive_balance_detected_tips2_app
            : intl.warning_excessive_balance_detected_tips2}
        </div>
        <PrimaryBtn
          eventName="btn_excessive_balance_tips_close"
          onClick={() => {
            if (showApp) {
              navigate('/download');
            }
            hide();
          }}
        >
          {showApp ? intl.download_app : intl.Close}
        </PrimaryBtn>
      </StyledExcessiveBalanceTips>
    </Modal>
  );
}

const StyledExcessiveBalanceTips = styled.div`
  width: 100%;
  padding: 0 20px 30px;

  .modal-title {
    margin-bottom: 20px;
  }

  .title {
    ${(props) => props.theme.fontMedium};
    color: ${(props) => props.theme.t_fff};
    font-size: 16px;
    line-height: 22px;
    margin-bottom: 20px;
    text-align: center;
  }

  .tips {
    ${(props) => props.theme.fontRegular};
    color: ${(props) => props.theme.t_fff_50};
    font-size: 14px;
    line-height: 20px;
    margin: 0 0 10px;
  }

  .dg-primary {
    width: 100%;
    margin-top: 30px;
  }
`;

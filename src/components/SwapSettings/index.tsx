import React from 'react';
import styled from 'styled-components';

import { Modal, PrimaryBtn } from 'src/UI';

import QuickTradingSetting from 'src/apps/components/QuickTradingSetting';
import { useModals } from 'src/state/application/hooks';
import { ModalKeys } from 'src/state/application/reducer';
import { ThemeType } from 'src/theme';

import Close from 'js/components/Icons/close';
import { useIntl } from 'js/locals';

import Slippage from './slippage';

export default function SwapSettingsModal() {
  const intl = useIntl();
  const { visible, hide } = useModals(ModalKeys.swapSettings);

  return (
    <Modal title={null} onClose={hide} opened={visible}>
      <StyledModal>
        <div className="modal-title">
          {intl['m.advanced_settings']}
          <Close onClick={hide} />
        </div>
        <Slippage />
        <QuickTradingSetting />

        <PrimaryBtn
          eventName="btn_swap_settings_close"
          onClick={() => {
            if (hide) {
              hide();
            }
          }}
        >
          {intl.Close}
        </PrimaryBtn>
      </StyledModal>
    </Modal>
  );
}

const StyledModal = styled.div`
  width: 100%;
  padding: 0 20px 30px;
  ${(props) => props.theme.fontMedium};
  .modal-title {
    margin-bottom: 20px;
  }

  .slippage {
    padding-bottom: 20px;
    border-bottom: 1px solid
      ${({ theme }: { theme: ThemeType }) => theme.innerBorder};
  }
  .quick-trading-setting {
    margin: 0;
    min-height: 60px;
  }
  .dg-primary {
    width: 100%;
    margin-top: 10px;
  }
`;

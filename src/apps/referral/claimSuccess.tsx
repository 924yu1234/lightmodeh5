import React from 'react';
import styled from 'styled-components';

import { Modal, PrimaryBtn } from 'src/UI';

import Close from 'src/components/Icons/close';
import IconStatusSuccess from 'src/components/Icons/StatusSuccess';
import { ThemeType } from 'src/theme';

import { useIntl } from 'js/locals';
import { useModals } from 'js/state/application/hooks';
import { ModalKeys } from 'js/state/application/reducer';

export default function ClaimSuccessModal() {
  const { visible, hide, netAmountDisplay } = useModals(
    ModalKeys.kol_claim_success
  );

  const intl = useIntl();

  return (
    <Modal title={null} onClose={hide} opened={visible} size={350}>
      <StyledRes>
        <div className="modal-title">
          <Close onClick={hide} />
        </div>
        <IconStatusSuccess size={50} />
        <div className="text">{intl.turboRange.claim_successful}</div>

        <div className="token-info">{netAmountDisplay}</div>
        <div className="tips">
          {intl.turboRange.has_been_added_to_your_account}
        </div>
        <PrimaryBtn
          eventName="btn_turbo_range_claim_progress_close"
          onClick={() => {
            hide();
          }}
        >
          {intl.Close}
        </PrimaryBtn>
      </StyledRes>
    </Modal>
  );
}

const StyledRes = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 16px 30px;
  position: relative;
  min-height: 288px;

  .modal-title {
    margin-bottom: 20px;
  }

  .icon-status-success {
    width: 50px;
    height: 50px;
  }

  .text {
    font-size: 16px;
    ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
    line-height: 22px;
    margin-top: 20px;
    margin-bottom: 30px;
  }

  .token-info {
    gap: 5px;
    text-align: center;
    margin-top: 5px;
    ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
    font-size: 14px;
    line-height: 20px;
  }

  .tips {
    ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
    font-size: 14px;
    line-height: 20px;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_80};
    margin-top: 10px;
  }
  .dg-primary {
    margin-top: 30px;
    width: 100%;
  }
`;

import React from 'react';
import { isMobile } from 'react-device-detect';
import styled from 'styled-components';

import { Modal, PrimaryBtn } from 'src/UI';

import Close from 'src/components/Icons/close';
import { useNavigateBack } from 'src/h5/navigateApp';
import { useHideMenuPrivateClientDesk } from 'src/h5/utils';
import { useIntl } from 'src/locals';
import { useModals } from 'src/state/application/hooks';
import { ModalKeys } from 'src/state/application/reducer';
import { useChangeFlag } from 'src/state/user/hooks';
import { ThemeType } from 'src/theme';

export default function PrivateClientDeskHideEntryConfirmModal() {
  const intl = useIntl();
  const hideMenuPrivateClientDesk = useHideMenuPrivateClientDesk();
  const navigateBack = useNavigateBack();
  const { visible, hide, isWebFloatingEntry } = useModals(
    ModalKeys.privateClientDeskHideEntryConfirm
  ) as {
    visible: boolean;
    hide: () => void;
    isWebFloatingEntry?: boolean;
  };
  const updateFloatHiddenFlag = useChangeFlag(
    'private_client_desk_float_hidden'
  );

  let pathText = intl.private_client_desk_access_path_home_menu;
  if (hideMenuPrivateClientDesk) {
    pathText = intl.private_client_desk_access_path_home_settings;
  }
  const { hide: hidePrivateClientDeskModal } = useModals(
    ModalKeys.privateClientDesk
  );
  const onConfirm = () => {
    updateFloatHiddenFlag(true);
    hide();
    if (isWebFloatingEntry) {
      hidePrivateClientDeskModal();
    } else {
      navigateBack();
    }
  };

  return (
    <Modal title={null} onClose={hide} opened={visible}>
      <StyledPrivateClientDeskHideEntryConfirm>
        <div className="modal-title">
          <Close onClick={hide} />
        </div>
        {isMobile ? (
          <div className="modal-content">
            <div className="desc">
              {intl.private_client_desk_access_path_intro}
            </div>
            <div className="path">{pathText}</div>
            <div className="modal-btns">
              <PrimaryBtn onClick={onConfirm}>{intl.btn_ok}</PrimaryBtn>
            </div>
          </div>
        ) : (
          <div className="modal-content">
            <div className="web-desc">
              {intl.private_client_desk_access_bottom_left_corner}
            </div>
            <div className="modal-btns">
              <PrimaryBtn onClick={onConfirm}>{intl.btn_ok}</PrimaryBtn>
            </div>
          </div>
        )}
      </StyledPrivateClientDeskHideEntryConfirm>
    </Modal>
  );
}

const StyledPrivateClientDeskHideEntryConfirm = styled.div`
  width: 100%;
  padding: 0 20px 30px;
  ${(props) => props.theme.fontRegular};

  .desc {
    ${(props) => props.theme.fontRegular};
    color: ${(props) => props.theme.t_b7b_80};
    font-size: 14px;
    line-height: 20px;
    text-align: center;
    margin-bottom: 25px;
  }

  .path {
    ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
    background: rgba(0, 160, 255, 0.1);
    border-radius: 8px;
    font-size: 14px;
    width: 100%;
    min-height: 50px;
    padding: 15px;
    line-height: 20px;
    text-align: center;
    margin-bottom: 18px;
  }

  .web-desc {
    ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
    font-size: 16px;
    line-height: 24px;
    text-align: center;
    margin-bottom: 18px;
  }

  .modal-btns {
    width: 100%;
  }
`;

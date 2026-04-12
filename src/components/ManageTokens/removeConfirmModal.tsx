import React, { useMemo } from 'react';
import styled from 'styled-components';

import { GhostBtn, Modal, PrimaryBtn } from 'src/UI';

import { useManagedAssetCollections } from 'src/hooks/useAssets';
import { useIntl } from 'src/locals';
import { useModals } from 'src/state/application/hooks';
import { ModalKeys } from 'src/state/application/reducer';
import { ThemeType } from 'src/theme';

import Close from '../Icons/close';

export default function ManageTokensRemoveConfirmModal() {
  const intl = useIntl();
  const { visible, hide, token } = useModals(
    ModalKeys.manageTokensRemoveConfirm
  );
  const { removeToken } = useManagedAssetCollections();

  const tokenLabel = useMemo(() => {
    return token?.symbol || token?.code || '--';
  }, [token]);

  if (!visible) return null;

  return (
    <Modal title={null} onClose={hide} opened={visible} size={360}>
      <StyledManageTokensRemoveConfirm>
        <div className="modal-title">
          <Close onClick={hide} />
        </div>
        <div className="title">{intl.manage_tokens_remove_confirm_title}</div>
        <div className="content">
          {intl.manage_tokens_remove_confirm_desc.replace(
            '{TOKEN}',
            tokenLabel
          )}
        </div>
        <div className="btns">
          <GhostBtn onClick={hide}>{intl.Cancel}</GhostBtn>
          <PrimaryBtn
            eventName="btn_manage_tokens_confirm_remove"
            onClick={() => {
              removeToken(token);
              hide();
            }}
          >
            {intl.manage_tokens_remove_confirm_btn}
          </PrimaryBtn>
        </div>
      </StyledManageTokensRemoveConfirm>
    </Modal>
  );
}

const StyledManageTokensRemoveConfirm = styled.div`
  width: 100%;
  padding: 0 20px 24px;

  .modal-title {
    margin-bottom: 20px;
  }

  .title {
    ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
    font-size: 16px;
    line-height: 24px;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
    text-align: center;
    margin-bottom: 5px;
  }

  .content {
    text-align: center;
    font-size: 14px;
    line-height: 20px;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_d4d};
    margin-bottom: 30px;
  }

  .btns {
    display: flex;
    gap: 10px;

    .dg-ghost,
    .dg-primary {
      flex: 1;
    }
  }
`;

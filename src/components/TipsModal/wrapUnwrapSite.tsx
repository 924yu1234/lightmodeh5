import React from 'react';
import styled from 'styled-components';

import { Modal } from 'src/UI';

import { Wrap, WrapTokenConfig } from 'src/constants/consts';
import { ThemeType } from 'src/theme';

import Close from 'js/components/Icons/close';
import { useIntl } from 'js/locals';
import { useModals, useShowModal } from 'js/state/application/hooks';
import { ModalKeys } from 'js/state/application/reducer';

export default function WrapUnwrapSite() {
  const { visible, hide, wrap } = useModals(ModalKeys.tips_wrap_wnwrap);
  const intl = useIntl();
  const showModal = useShowModal();
  const WrapConfig = WrapTokenConfig[wrap as Wrap];

  return (
    <Modal title={null} onClose={hide} opened={visible}>
      <StyledModal>
        <div className="modal-title">
          {intl.wrap_unwrap}
          <Close onClick={hide} />
        </div>
        <div className="tips-desc">{intl.websites_for_more_information}</div>
        <div
          className="link-item"
          onClick={() => {
            showModal({
              modal: ModalKeys.tips_thirdPartySite,
              link: WrapConfig.officialSite,
            });
          }}
        >
          {intl.official_site} {' >'}
        </div>
        {WrapConfig.wrapSite && (
          <div
            className="link-item"
            onClick={() => {
              showModal({
                modal: ModalKeys.tips_thirdPartySite,
                link: WrapConfig.wrapSite,
              });
            }}
          >
            {intl.wrap_site} {' >'}
          </div>
        )}
      </StyledModal>
    </Modal>
  );
}

const StyledModal = styled.div`
  width: 100%;
  padding: 0px 20px 40px;
  ${(props) => props.theme.fontRegular};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  .modal-title {
    margin-bottom: 20px;
  }

  .tips-desc {
    line-height: 20px;
    font-size: 14px;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
  }
  .link-item {
    ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
    color: ${({ theme }: { theme: ThemeType }) => theme.blue};
    font-size: 14px;
    line-height: 20px;
    cursor: pointer;
    margin-top: 20px;
  }
`;

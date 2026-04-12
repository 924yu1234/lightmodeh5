import React from 'react';
import styled from 'styled-components';

import { Modal, PrimaryBtn } from 'src/UI';

import { ThemeType } from 'src/theme';
import WindowOpen from 'src/utils/windowOpen';

import Close from 'js/components/Icons/close';
import { useIntl } from 'js/locals';
import { useModals } from 'js/state/application/hooks';
import { ModalKeys } from 'js/state/application/reducer';

import LinkWrapper from '../LinkWrapper';

export default function ThirdPartySite() {
  const { visible, hide, link } = useModals(ModalKeys.tips_thirdPartySite);
  const intl = useIntl();

  return (
    <Modal title={null} onClose={hide} opened={visible}>
      <StyledModal>
        <div className="modal-title">
          <Close onClick={hide} />
        </div>
        <div className="title">{intl.Note}</div>
        <div className="tips-desc">
          {intl.tips_third_party_site}
          <LinkWrapper
            url={link}
            onClick={() => {
              WindowOpen(link);
            }}
          >
            {link}
          </LinkWrapper>
        </div>
        <PrimaryBtn
          eventName="btn_open_third_party_site"
          onClick={() => {
            hide();
            WindowOpen(link);
          }}
        >
          {intl.Continue}
        </PrimaryBtn>
      </StyledModal>
    </Modal>
  );
}

const StyledModal = styled.div`
  width: 100%;
  padding: 0 20px 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  .modal-title {
    margin-bottom: 20px;
  }

  .title {
    ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
    font-size: 16px;
    line-height: 22px;
    margin-bottom: 6px;
  }
  .tips-desc {
    line-height: 24px;
    font-size: 14px;
    ${(props) => props.theme.fontRegular};
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff_80};
    .link-wrapper {
      margin-left: 5px;
      display: inline-block;
    }
  }

  .dg-primary {
    margin-top: 30px;
    width: 100%;
  }
`;

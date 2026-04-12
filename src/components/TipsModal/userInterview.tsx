/* eslint-disable react/no-danger */
import React, { useEffect, useRef } from 'react';
import img from 'imgs/banner_invitation.jpeg';
import styled from 'styled-components';

import { GhostBtn, Modal, PrimaryBtn } from 'src/UI';

import { useCloseBanner } from 'src/state/user/hooks';

import { useIntl, useSetLocale } from 'js/locals';
import { useModals } from 'js/state/application/hooks';
import { ModalKeys } from 'js/state/application/reducer';

export default function UserInterview() {
  const intl = useIntl();
  const { visible, hide, bannerMessage } = useModals(
    ModalKeys.tips_userInterview
  );
  const { locale } = useSetLocale();
  const message = bannerMessage.i18n[locale];
  const ref = useRef<HTMLDivElement | null>(null);
  const triggerClick = () => {
    if (ref.current) {
      const anchor = ref.current.querySelector('a');
      if (anchor) {
        anchor.click();
        hide();
      }
    }
  };

  const closeBanner = useCloseBanner();
  // 只显示一次
  useEffect(() => {
    closeBanner({ id: bannerMessage.id });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!message) return null;

  return (
    <Modal
      title={null}
      onClose={hide}
      opened={visible}
      closeOnClickOutside={false}
      closeOnEscape={false}
    >
      <StyledTips>
        <img src={img} alt="img" className="img" />
        <div
          ref={ref}
          className="desc"
          dangerouslySetInnerHTML={{ __html: message }}
        />
        <div className="modal-btns">
          <PrimaryBtn
            eventName="btn_user_interview_let_s_go"
            onClick={triggerClick}
          >
            {intl.let_s_go}
          </PrimaryBtn>
          <GhostBtn
            eventName="btn_user_interview_reject"
            className="modal-cancel"
            onClick={hide}
          >
            {intl.reject}
          </GhostBtn>
        </div>
      </StyledTips>
    </Modal>
  );
}

const StyledTips = styled.div`
  ${(props) => props.theme.fontMedium};
  padding: 0 0 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  .modal-title {
  }
  .img {
    border-radius: 20px 20px 0px 0px;
    width: 100%;
  }

  .desc {
    padding: 0 20px;
    margin: 30px 0;
    ${(props) => props.theme.fontRegular};
    color: ${(props) => props.theme.modalText};
    font-size: 14px;
    line-height: 20px;
    width: 100%;
    text-align: left;
    a {
      margin-left: 5px;
      word-break: break-all;
      color: ${(props) => props.theme.t_00aaff};
      text-decoration: underline;
    }
  }

  .modal-btns {
    padding: 0 20px;
  }
`;

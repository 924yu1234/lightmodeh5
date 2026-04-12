import React, { useMemo } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import styled from 'styled-components';

import { Modal, PrimaryBtn } from 'src/UI';

import Close from 'src/components/Icons/close';
import { removeLanguagePath } from 'src/hooks/useCustomNavigate';
import { useIntl } from 'src/locals';
import { useModals } from 'src/state/application/hooks';
import { ModalKeys } from 'src/state/application/reducer';
import { useDexAccount } from 'src/state/dexAccount/hooks';
import { ThemeType } from 'src/theme';
import message from 'src/utils/message';

export default function ShareModal() {
  const intl = useIntl();
  const { visible, hide, url } = useModals(ModalKeys.share);
  const { ownerReferralCode } = useDexAccount();

  const link = useMemo(() => {
    const _url = removeLanguagePath(url);
    if (ownerReferralCode) {
      if (_url.includes('?')) {
        return `${window.location.origin}${_url}&s=${ownerReferralCode}`;
      }
      return `${window.location.origin}${_url}?s=${ownerReferralCode}`;
    }

    return window.location.origin + _url;
  }, [url, ownerReferralCode]);

  return (
    <Modal title={null} onClose={hide} opened={visible}>
      <StyledShareModal>
        <div className="modal-title">
          {intl.share}
          <Close onClick={hide} />
        </div>
        <div className="link">{link}</div>
        <CopyToClipboard
          text={link}
          onCopy={() => message.success(intl.copied)}
        >
          <PrimaryBtn eventName="btn_share_copy">{intl.Copy}</PrimaryBtn>
        </CopyToClipboard>
      </StyledShareModal>
    </Modal>
  );
}

const StyledShareModal = styled.div`
  width: 100%;
  padding: 0 20px 30px;
  ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
  display: flex;
  flex-direction: column;
  .modal-title {
    margin-bottom: 20px;
  }
  .link {
    background: ${({ theme }: { theme: ThemeType }) => theme.modalInnerBg};
    border-radius: 5px;
    padding: 15px;
    ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
    display: flex;
    font-size: 14px;
    justify-content: center;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_d4d};
    width: 100%;
    align-items: center;
    line-height: 25px;
  }
  .dg-primary {
    margin-top: 30px;
    width: 100%;
  }
`;

import React from 'react';
import styled from 'styled-components';

import { Modal } from 'src/UI';

import useWalletTips from 'src/hooks/useWalletTips';
import { ThemeType } from 'src/theme';

import Close from 'js/components/Icons/close';

import WalletAni from './WalletAni';

export default function WalletTips({
  title,
  desc,
  hide,
  top,
}: {
  title?: string;
  desc: any;
  hide: () => void;
  top?: React.ReactElement;
}) {
  const walletTips = useWalletTips();

  return (
    <Modal title={null} onClose={hide} opened>
      {top}
      <StyledWalletTipsModal>
        <div className="modal-title">
          {title}
          <Close onClick={hide} />
        </div>
        <WalletAni className="loading-gif" />
        <div className="title">{walletTips}</div>
        <div className="desc">{desc}</div>
      </StyledWalletTipsModal>
    </Modal>
  );
}

const StyledWalletTipsModal = styled.div`
  width: 100%;
  padding: 0px 20px 30px;
  ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
  display: flex;
  flex-direction: column;
  align-items: center;
  .modal-title {
    margin-bottom: 20px;
  }
  .loading-gif {
    margin: 0 0 25px;
    width: 50px;
    height: 50px;
  }
  .title {
    margin-bottom: 8px;
    ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
    color: ${({ theme }: { theme: ThemeType }) => theme.modalTitle};
    line-height: 22px;
    font-size: 16px;
    text-align: center;
  }
  .desc {
    color: ${({ theme }: { theme: ThemeType }) => theme.modalText};
    line-height: 20px;
    font-size: 14px;
    text-align: center;
  }
`;

import React from 'react';
import styled from 'styled-components';

import { Modal, PrimaryBtn } from 'src/UI';

import LinkWrapper from 'src/components/LinkWrapper';
import { Type_DAChains } from 'src/da';
import { ThemeType } from 'src/theme';
import WindowOpen from 'src/utils/windowOpen';

import Close from 'js/components/Icons/close';
import { useIntl } from 'js/locals';
import { useChainInfosMap, useModals } from 'js/state/application/hooks';
import { ModalKeys } from 'js/state/application/reducer';

export default function EarnMoreInfo() {
  const { visible, hide, vault } = useModals(ModalKeys.earnMoreInfo);

  const intl = useIntl();
  const chainInfosMap = useChainInfosMap();

  const hideModal = () => {
    hide();
  };

  return (
    <Modal title={null} onClose={hideModal} opened={visible}>
      <StyledCommonTips>
        <div className="modal-title">
          {intl.About_Vault}
          <Close onClick={hideModal} />
        </div>
        <div className="item">
          <div className="item-title">{intl.Protocol}</div>
          <div className="item-desc">{vault.protocol}</div>
        </div>
        <div className="item">
          <div className="item-title">{intl.Vault}</div>
          <div className="item-desc">{vault.name}</div>
        </div>
        <div className="item">
          <div className="item-title">{intl.Asset}</div>
          <div className="item-desc">{vault.token?.symbol}</div>
        </div>
        <div className="item">
          <div className="item-title">{intl.Network}</div>
          <div className="item-desc">
            {chainInfosMap[vault?.chain as Type_DAChains]?.name}
          </div>
        </div>
        {!!vault.website && (
          <div className="item">
            <div className="item-title">{intl.Website}</div>
            <div className="item-desc">
              <LinkWrapper
                url={vault.website}
                onClick={() => {
                  WindowOpen(vault.website);
                }}
              >
                {format(vault.website)}
              </LinkWrapper>
            </div>
          </div>
        )}
        <PrimaryBtn eventName="btn_earn_more_info_close" onClick={hideModal}>
          {intl.btn_confirm}
        </PrimaryBtn>
      </StyledCommonTips>
    </Modal>
  );
}

const StyledCommonTips = styled.div`
  width: 100%;
  padding: 0 16px 30px;
  display: flex;
  align-items: center;
  flex-direction: column;

  .modal-title {
    margin-bottom: 20px;
  }

  .item {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    margin-bottom: 15px;
    .item-title {
      ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
      color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_80};
      font-size: 14px;
      line-height: 20px;
    }
    .item-value {
      ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
      color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
      font-size: 14px;
      line-height: 20px;
    }
  }

  .dg-primary {
    width: 100%;
    margin-top: 30px;
  }
`;

// 只显示域名 不显示后面path
const format = (url: string) => {
  const urlObj = new URL(url);
  return urlObj.origin;
};

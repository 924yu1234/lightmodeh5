import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

import { GhostBtn, PrimaryBtn } from 'src/UI';

import { Type_DAChains } from 'src/da';
import { useDexAccount } from 'src/state/dexAccount/hooks';
import useUnlock from 'src/state/dexAccount/opr/useUnlock';
import { ThemeType, useThemeParams } from 'src/theme';

import Close from 'js/components/Icons/close';
import { useIntl } from 'js/locals';
import { useChainInfosMap, useModals } from 'js/state/application/hooks';
import { ModalKeys } from 'js/state/application/reducer';

import ChainIcon from '../ChainIcon';
import IconDG from '../Icons/DG';
import IconMobileBack from '../Icons/mobileBack';
import IconStatusProcessingAni from '../Icons/StatusProcessingAni';
import IconStatusSuccess from '../Icons/StatusSuccess';
import FullModal from '../Modals/fullModal';

export default function SyncDAsTips() {
  const { visible, hide, syncChains } = useModals(ModalKeys.sync_da_tips);
  const [loading, setLoading] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [success, setSuccess] = useState(false);
  const intl = useIntl();
  const chainInfos = useChainInfosMap();
  const unlock = useUnlock();
  const { DAs, hasFetchedDA } = useDexAccount();
  const dexAccount = useDexAccount();

  const sync = useCallback(() => {
    setLoading(true);
    unlock(dexAccount?.keyNonce, 'unlock').then(() => {
      setSyncing(true);
    });
  }, [unlock, dexAccount]);

  useEffect(() => {
    if (hasFetchedDA && syncing) {
      if (syncChains.some((chain: any) => DAs[chain])) {
        setLoading(false);
        setSyncing(false);
        setSuccess(true);
      }
    }
  }, [hasFetchedDA, syncing, DAs, dexAccount, syncChains, hide]);

  const hideModal = () => {
    hide();
  };

  const { isMobile } = useThemeParams();

  if (syncing) {
    return (
      <FullModal centered onClose={hideModal} opened={visible}>
        <StyledSyncing>
          <div className="modal-title">
            {isMobile && <IconMobileBack onClick={hideModal} />}
            {!isMobile && <Close onClick={hideModal} />}
          </div>
          <div className="modal-content">
            <IconStatusProcessingAni size={50} />
            <div className="title">{intl.updating}</div>
            <div className="desc">{intl.please_wait}</div>
          </div>
        </StyledSyncing>
      </FullModal>
    );
  }

  if (success) {
    return (
      <FullModal centered onClose={hideModal} opened={visible}>
        <StyledSyncing>
          <div className="modal-title">
            {isMobile && <IconMobileBack onClick={hideModal} />}
            {!isMobile && <Close onClick={hideModal} />}
          </div>
          <div className="modal-content">
            <IconStatusSuccess size={50} />
            <div className="title">{intl.status_success}</div>
            <div className="desc">
              {intl.close_this_window_to_resume_what_you_were_doing}
            </div>
            <PrimaryBtn eventName="btn_sync_das_tips_close" onClick={hideModal}>
              {intl.btn_ok}
            </PrimaryBtn>
          </div>
        </StyledSyncing>
      </FullModal>
    );
  }

  return (
    <FullModal onClose={hideModal} opened={visible}>
      <StyledSyncDAsTips>
        <div className="modal-title">
          {isMobile && <IconMobileBack onClick={hideModal} />}
          {!isMobile && <Close onClick={hideModal} />}
        </div>
        <div className="modal-content">
          <IconDG size={50} />
          <div className="title">{intl.generate_wallet_address}</div>
          <div className="title">{intl.generate_wallet_address_tips}</div>
          <div className="sync-chains">
            {syncChains.map((chain: Type_DAChains) => {
              const chainInfo = chainInfos[chain];
              return (
                <div key={chain} className="sync-chain">
                  <ChainIcon chain={chain} size={48} />
                  <div className="sync-chain-name">{chainInfo.name}</div>
                </div>
              );
            })}
          </div>
          <div className="modal-btns">
            <PrimaryBtn
              eventName="btn_sync_das_tips_confirm"
              onClick={sync}
              loading={loading}
            >
              {intl.Confirm}
            </PrimaryBtn>
            <GhostBtn
              eventName="btn_sync_das_tips_cancel"
              className="modal-cancel"
              onClick={hideModal}
            >
              {intl.icon_back}
            </GhostBtn>
          </div>
        </div>
      </StyledSyncDAsTips>
    </FullModal>
  );
}

const StyledSyncDAsTips = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 0 20px;
  display: flex;
  align-items: center;
  flex-direction: column;

  .modal-title {
    padding: 0 20px;
    margin-bottom: 17px;
  }

  .modal-content {
    display: flex;
    flex-direction: column;
    padding: 0 16px;
    height: 100%;
  }

  .title {
    ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff_80};
    font-size: 14px;
    line-height: 24px;
    width: 100%;
    text-align: center;
    margin-top: 10px;
  }

  .icon-dg {
    svg {
      border-radius: 50%;
    }
  }

  .sync-chains {
    margin-top: 40px;
    ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
    font-size: 14px;
    line-height: 24px;
    margin-bottom: 40px;
    flex-wrap: wrap;
    display: flex;
    justify-content: center;
    align-items: center;

    .sync-chain {
      width: 33%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      gap: 10px;
      margin-bottom: 20px;
    }
  }

  .modal-btns {
    margin-top: auto;
  }
`;

const StyledSyncing = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 0 30px;
  display: flex;
  align-items: center;
  flex-direction: column;
  .modal-title {
    padding: 0 20px;
    margin-bottom: 17px;
  }
  .modal-content {
    padding: 0 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    .loader,
    .icon-status-success {
      margin-top: ${({ theme }: { theme: ThemeType }) =>
        theme.isMobile ? '100px' : '30px'};
    }
    .title {
      ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
      color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
      font-size: 18px;
      line-height: 24px;
      width: 100%;
      text-align: center;
      margin-top: 10px;
    }
    .desc {
      ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
      color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b};
      font-size: 14px;
      text-align: center;
      line-height: 24px;
      margin-bottom: 30px;
    }
    .dg-primary {
      margin-top: auto;
      width: 100%;
      margin-bottom: 30px;
    }
  }
`;

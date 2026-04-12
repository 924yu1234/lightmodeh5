import React from 'react';
import styled from 'styled-components';

import { GhostBtn, PrimaryBtn } from 'src/UI';

import IconStatusSuccess from 'src/components/Icons/StatusSuccess';
import { Type_DAChains } from 'src/da';
import { useAppNavigateTokenDetail } from 'src/h5/navigateApp';
import useCustomNavigate from 'src/hooks/useCustomNavigate';
import { useIsAppH5 } from 'src/providers/useWallet';
import {
  useChainInfosMap,
  useShowModal,
  useUsdcTokensMap,
} from 'src/state/application/hooks';
import ModalKeys from 'src/state/application/modalKeys';
import { ThemeType } from 'src/theme';

import { useIntl } from 'js/locals';

export default function Success({
  order,
  closeModal,
}: {
  order: any;
  closeModal: () => void;
}) {
  const intl = useIntl();
  const navigate = useCustomNavigate();
  const isAppH5 = useIsAppH5();
  const navigateTokenDetail = useAppNavigateTokenDetail();

  const showModal = useShowModal();
  const chainInfoMap = useChainInfosMap();
  const usdc = useUsdcTokensMap();
  const usdcToken = usdc[order?.to_chain as Type_DAChains];
  return (
    <StyledView className="status-view">
      <IconStatusSuccess size={50} />
      <div className="text">{intl.bridge_successful}</div>

      <div className="item-info-item">
        <div className="item-info-item-title">{intl.amount}</div>
        <div className="item-info-item-value">{order?.amount_display} USDC</div>
      </div>
      <div className="item-info-item">
        <div className="item-info-item-title">{intl.From}</div>
        <div className="item-info-item-value">
          {chainInfoMap[order?.from_chain as Type_DAChains]?.name}
        </div>
      </div>
      <div className="item-info-item">
        <div className="item-info-item-title">{intl.To}</div>
        <div className="item-info-item-value">
          {chainInfoMap[order?.to_chain as Type_DAChains]?.name}
        </div>
      </div>
      <div className="btns">
        <GhostBtn
          eventName="bridge_usdc_progress_check_my_balance"
          onClick={() => {
            closeModal();
            if (isAppH5) {
              navigateTokenDetail(usdcToken?.id);
            } else {
              navigate(`/account/balance`);
              showModal({
                modal: ModalKeys.assetModal,
                token: usdcToken,
              });
            }
          }}
        >
          {intl.check_my_balance}
        </GhostBtn>
        <PrimaryBtn
          eventName="bridge_usdc_progress_close"
          onClick={() => {
            closeModal();
          }}
        >
          {intl.Close}
        </PrimaryBtn>
      </div>
    </StyledView>
  );
}

const StyledView = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  .text {
    font-size: 16px;
    ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
    line-height: 22px;
    margin-top: 20px;
    margin-bottom: 40px;
  }

  .item-info-item {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    width: 100%;
    margin-bottom: 10px;
    .item-info-item-title {
      font-size: 14px;
      ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
      color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_80};
      line-height: 20px;
    }
    .item-info-item-value {
      font-size: 14px;
      ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
      color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
      line-height: 20px;
      display: flex;
      flex-direction: column;
      gap: 5px;
      align-items: flex-end;
      .token {
        ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
        color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
      }
    }
  }

  .btns {
    display: flex;
    gap: 10px;
    width: 100%;
    justify-content: center;
    margin-top: 15px;
    .dg-ghost,
    .dg-primary {
      flex: 1;
    }
  }
`;

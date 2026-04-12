import React, { useCallback, useEffect } from 'react';
import styled from 'styled-components';

import { GhostBtn, PrimaryBtn } from 'src/UI';

import Close from 'src/components/Icons/close';
import { useIntl } from 'src/locals';
import { useAllowQuickTrading } from 'src/providers/useWallet';
import {
  useDexAccount,
  useRefreshDexAccount,
} from 'src/state/dexAccount/hooks';
import { useSignToViewEcdsa } from 'src/state/dexAccount/opr/useSignToView';
import { ThemeType } from 'src/theme';

import { useCommonAddFunds, useModals } from 'js/state/application/hooks';
import { ModalKeys } from 'js/state/application/reducer';

export default function Step4Success({ ratio }: { ratio: number }) {
  const intl = useIntl();
  const { hide } = useModals(ModalKeys.register);
  const dexAccount = useDexAccount();
  const refreshDexAccount = useRefreshDexAccount();
  const allowQuickTrading = useAllowQuickTrading();
  const signToViewEcdsa = useSignToViewEcdsa();
  const commonAddFunds = useCommonAddFunds();

  const next = useCallback(() => {
    commonAddFunds({ token: undefined });
    hide();
  }, [hide, commonAddFunds]);

  // 有可能注册上报asset key后account接口返回还未更新
  useEffect(() => {
    if (!dexAccount?.hasSyncDA) {
      refreshDexAccount();
    } else if (!allowQuickTrading) {
      // 注册成功后如果之前因其他账户设置关闭了快速下单，这里自动注册accessToken
      signToViewEcdsa();
    }
  }, [
    dexAccount?.hasSyncDA,
    allowQuickTrading,
    signToViewEcdsa,
    refreshDexAccount,
  ]);

  return (
    <StyledStep4 ratio={ratio}>
      <div className="modal-title">
        <Close onClick={hide} />
      </div>
      <div className="title">{intl.account_created}</div>
      <div className="modal-btns">
        <PrimaryBtn
          eventName="btn_initialize_step4_add_funds"
          onClick={next}
          loading={!dexAccount?.hasSyncDA}
        >
          {intl.Add_Funds}
        </PrimaryBtn>
        <GhostBtn
          eventName="btn_initialize_step4_hide"
          className="modal-cancel"
          onClick={hide}
        >
          {intl.not_now}
        </GhostBtn>
      </div>
    </StyledStep4>
  );
}

const StyledStep4 = styled.div<{ ratio: number }>`
  width: 100%;
  ${({ theme }: { theme: ThemeType }) => theme.fontRegular};

  .title {
    ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
    font-size: ${({ ratio }) => `${ratio * 24}px`};
    color: ${({ theme }: { theme: ThemeType }) => theme.blue};
    line-height: ${({ ratio }) => `${ratio * 51}px`};
    height: ${({ ratio }) => `${ratio * 51}px`};
    margin-bottom: ${({ ratio }) => `${ratio * 30}px`};
    text-align: center;
  }
  .modal-btns {
    margin-top: ${({ ratio }) => `${ratio * 30}px`};
  }
`;

/* eslint-disable react/no-danger */
import React from 'react';
import styled from 'styled-components';

import { PrimaryBtn } from 'src/UI';

import { ThemeType } from 'src/theme';

import Close from 'js/components/Icons/close';
import { useIntl } from 'js/locals';
import { useModals } from 'js/state/application/hooks';
import { ModalKeys } from 'js/state/application/reducer';

export default function WalletIncompatibleTips({ ratio }: { ratio: number }) {
  const { hide } = useModals(ModalKeys.register);

  const intl = useIntl();

  const hideModal = () => {
    hide();
  };

  return (
    <StyledWalletIncompatibleTips ratio={ratio}>
      <div className="modal-title">
        <Close onClick={hideModal} />
      </div>
      <div className="title">{intl.wallet_incompatible}</div>
      <div className="desc">{intl.wallet_incompatible_tips}</div>
      <PrimaryBtn
        eventName="btn_initialize_step2_wallet_incompatible_tips_close"
        onClick={hideModal}
      >
        {intl.Close}
      </PrimaryBtn>
    </StyledWalletIncompatibleTips>
  );
}

const StyledWalletIncompatibleTips = styled.div<{ ratio: number }>`
  .title {
    ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
    font-size: ${({ ratio }) => `${ratio * 24}px`};
    color: ${({ theme }: { theme: ThemeType }) => theme.blue};
    height: ${({ ratio }) => `${ratio * 51}px`};
    line-height: ${({ ratio }) => `${ratio * 51}px`};
  }

  .desc {
    ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
    font-size: ${({ ratio }) => `${ratio * 14}px`};
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
    line-height: 1.375;
    margin-bottom: ${({ ratio }) => `${ratio * 30}px`};
  }

  .dg-primary.mantine-Button-root {
    width: 100%;
    height: ${({ ratio }) => `${ratio * 40}px`};
    min-height: ${({ ratio }) => `${ratio * 40}px`};
    font-size: ${({ ratio }) => `${ratio * 14}px`};
    line-height: ${({ ratio }) => `${ratio * 40}px`};
  }
`;

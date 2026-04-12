import React from 'react';
import styled from 'styled-components';

import { PrimaryBtn } from 'src/UI';

import IconStatusProcessingAni from 'src/components/Icons/StatusProcessingAni';
import { useAppNavigateBalance } from 'src/h5/navigateApp';
import { useIsAppH5 } from 'src/providers/useWallet';
import { ThemeType } from 'src/theme';

import { useIntl } from 'js/locals';

export default function Processing({ closeModal }: { closeModal: () => void }) {
  const intl = useIntl();
  const isAppH5 = useIsAppH5();
  const navigateBalance = useAppNavigateBalance();
  return (
    <StyledView className="status-view">
      <IconStatusProcessingAni size={50} />
      <div className="text">{intl.moving_your_USDC_to_destination_network}</div>

      <div className="tips">
        {intl.turboRange.you_can_close_this_window_we_ll_handle_it}
      </div>

      <PrimaryBtn
        eventName="bridge_usdc_progress_close"
        onClick={() => {
          closeModal();
          if (isAppH5) {
            navigateBalance();
          }
        }}
      >
        {intl.Close}
      </PrimaryBtn>
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
    text-align: center;
  }

  .tips {
    margin-top: 50px;
    ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
    font-size: 14px;
    line-height: 20px;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_80};
    text-align: center;
  }

  .dg-primary {
    margin-top: 15px;
    width: 100%;
  }
`;

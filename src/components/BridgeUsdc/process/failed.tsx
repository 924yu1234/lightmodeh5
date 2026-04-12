import React from 'react';
import styled from 'styled-components';

import { PrimaryBtn } from 'src/UI';

import IconStatusFailed from 'src/components/Icons/StatusFailed';
import useNavigateApp from 'src/h5/navigateApp';
import { useIsAppH5 } from 'src/providers/useWallet';
import { ThemeType } from 'src/theme';

import { useIntl } from 'js/locals';

export default function Failed({ closeModal }: { closeModal: () => void }) {
  const isAppH5 = useIsAppH5();
  const navigate = useNavigateApp();
  const intl = useIntl();
  return (
    <StyledView className="status-view">
      <IconStatusFailed size={50} />
      <div className="text">{intl.Failed}</div>
      <PrimaryBtn
        eventName="bridge_usdc_progress_close"
        onClick={() => {
          closeModal();
          if (isAppH5) {
            navigate(`balance`);
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
  width: 100%;
  align-items: center;

  .text {
    font-size: 16px;
    ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
    line-height: 22px;
    margin-top: 20px;
  }
  .dg-primary {
    margin-top: 30px;
    width: 100%;
  }
`;

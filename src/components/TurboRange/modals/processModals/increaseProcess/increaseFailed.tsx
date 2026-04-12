import React from 'react';
import styled from 'styled-components';

import { PrimaryBtn } from 'src/UI';

import IconStatusFailed from 'src/components/Icons/StatusFailed';
import { ThemeType } from 'src/theme';

import { useIntl } from 'js/locals';

export default function IncreaseFailed({
  closeModal,
}: {
  closeModal: () => void;
}) {
  const intl = useIntl();
  return (
    <StyledView className="status-view">
      <IconStatusFailed size={50} />
      <div className="text">{intl.turboRange.increase_failed}</div>
      <PrimaryBtn
        eventName="btn_earn_progress_close"
        onClick={() => {
          closeModal();
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

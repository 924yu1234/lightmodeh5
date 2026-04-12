import React from 'react';
import styled from 'styled-components';

import { PrimaryBtn } from 'src/UI';

import IconStatusSuccess from 'src/components/Icons/StatusSuccess';
import { ThemeType } from 'src/theme';

import { useIntl } from 'js/locals';

import Invested from '../../details/depositDetail/invested';

export default function DepositSuccess({
  order,
  closeModal,
}: {
  order: any;
  closeModal: () => void;
}) {
  const intl = useIntl();

  return (
    <StyledView className="status-view">
      <IconStatusSuccess size={50} />
      <div className="text">{intl.turboRange.investment_successful}</div>

      <Invested data={order} />

      <PrimaryBtn
        eventName="btn_earn_progress_close"
        onClick={() => {
          closeModal();
        }}
      >
        {intl.turboRange.view_my_position}
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
`;

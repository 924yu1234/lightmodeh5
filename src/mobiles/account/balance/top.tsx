import React from 'react';
import styled from 'styled-components';

import IconArrowDown from 'src/components/Icons/arrowDown';
import { useShowAccount } from 'src/hooks/useShowAccount';
import { ThemeType } from 'src/theme';

import IconMobileUser from 'js/components/Icons/mobileUser';
import { useShowModal } from 'js/state/application/hooks';
import { ModalKeys } from 'js/state/application/reducer';

export default function BalanceTop() {
  const showModal = useShowModal();
  const showAccount = useShowAccount();

  return (
    <StyledTop>
      <div
        className="top-account"
        onClick={() => {
          showModal({ modal: ModalKeys.m_leftBar });
        }}
      >
        <IconMobileUser size={26} />
        {showAccount}
        <IconArrowDown />
      </div>
    </StyledTop>
  );
}

const StyledTop = styled.div`
  position: absolute;
  width: 100%;
  height: 52px;
  padding: 0 20px;
  display: flex;
  align-items: center;
  gap: 5px;
  top: 0;
  left: 0;
  ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
  font-size: 14px;
  color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
  .top-account {
    display: flex;
    align-items: center;
    gap: 5px;
  }
  .dg-icon {
    color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b};
  }
`;

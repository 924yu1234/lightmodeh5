import React from 'react';
import inviteBg from 'imgs/invitation_03.svg';
import styled from 'styled-components';

import { useIntl } from 'src/locals';
import { ThemeType } from 'src/theme';

export default function InviteInvalid({ width = 315 }: { width?: number }) {
  const intl = useIntl();
  return (
    <StyledInviteContent width={width}>
      <img src={inviteBg} alt="invite-bg" className="invite-img" />
      <div className="invite-text">{intl.link_expired}</div>
    </StyledInviteContent>
  );
}

const StyledInviteContent = styled.div`
  width: ${({ width }: { width?: number }) => width}px;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${({ theme }) => theme.t_fff};

  .invite-img {
    width: 100%;
  }

  .invite-text {
    ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
    font-size: 14px;
    line-height: 20px;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff_80};
    max-width: 320px;
    text-align: center;
    margin-bottom: 15px;
  }
`;

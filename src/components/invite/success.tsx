import React from 'react';
import inviteBg from 'imgs/invitation_02.svg';
import styled from 'styled-components';

import { useIntl } from 'src/locals';
import { ThemeType } from 'src/theme';

import IconStar from '../Icons/star';

export default function InviteSuccess({ width = 315 }: { width?: number }) {
  const intl = useIntl();
  return (
    <StyledInviteContent width={width}>
      <img src={inviteBg} alt="invite-bg" className="invite-img" />
      <div className="invite-text">{intl.welcome_aboard}</div>

      <IconStar />
      <div className="invite-tips">
        {
          intl.youre_now_among_a_select_group_enjoying_an_enhanced_degate_experience
        }
      </div>
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
    ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
    font-size: 18px;
    line-height: 30px;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
    max-width: 320px;
    text-align: center;
    margin-bottom: 20px;
  }

  .icon-star {
    width: 16px;
    height: 16px;
    color: ${({ theme }: { theme: ThemeType }) => theme.green};
  }

  .invite-tips {
    ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
    font-size: 14px;
    line-height: 20px;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
    text-align: center;
    max-width: 320px;
    margin-bottom: 30px;
    margin-top: 15px;
  }
`;

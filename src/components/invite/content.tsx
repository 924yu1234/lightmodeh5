import React from 'react';
import inviteBg from 'imgs/invitation_01.svg';
import styled from 'styled-components';

import { useIntl } from 'src/locals';
import { ThemeType } from 'src/theme';

import IconStar from '../Icons/star';

export default function InviteContent({ width = 315 }: { width?: number }) {
  const intl = useIntl();
  return (
    <StyledInviteContent width={width}>
      <img src={inviteBg} alt="invite-bg" className="invite-img" />
      <div className="invite-text">
        {intl.invite_to_degate_experience_enhancement_program}
      </div>

      <div className="features-container">
        <div className="features-title">
          {intl.as_a_selected_user_youll_get}
        </div>
        <div className="feature-list">
          <div className="feature-item">
            <IconStar />
            <span>{intl.a_smoother_app_experience}</span>
          </div>
          <div className="feature-item">
            <IconStar />
            <span>{intl.dedicated_one_on_one_support}</span>
          </div>
        </div>
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
  }

  .features-container {
    margin-top: 20px;
    width: 100%;
    padding: 20px 20px 35px;

    position: relative;
    border-radius: 10px;
    max-width: 320px;

    /* 使用伪元素和 mask 实现完美的渐变边框，不与背景叠加 */
    &::before {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: 16px;
      padding: 1px; /* 边框宽度 */

      /* 边框渐变色 */
      background: linear-gradient(
        180deg,
        rgba(220, 224, 229, 0.2) 0%,
        rgba(183, 189, 198, 0) 90%,
        rgba(255, 255, 255, 0) 100%
      );

      /* 关键：使用 mask 挖空中间，只保留边框 */
      -webkit-mask: linear-gradient(#fff 0 0) content-box,
        linear-gradient(#fff 0 0);
      -webkit-mask-composite: xor;
      mask-composite: exclude;
      pointer-events: none;
    }

    display: flex;
    flex-direction: column;
  }

  .features-title {
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff_60};
    font-size: 14px;
    text-align: center;
    margin-bottom: 5px;
  }

  .feature-list {
    width: fit-content;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
  }

  .feature-item {
    display: grid;
    grid-template-columns: 16px 1fr;
    gap: 8px;
    font-size: 14px;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
    margin-top: 15px;

    .icon-star {
      width: 16px;
      height: 16px;
      color: ${({ theme }: { theme: ThemeType }) => theme.green};
    }
  }
`;

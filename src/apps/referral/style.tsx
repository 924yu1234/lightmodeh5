import top from 'imgs/banner_airdrop_top_2.svg';
import styled from 'styled-components';

import { ThemeType } from 'src/theme';

export const StyledReferral = styled.div`
  ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
  width: ${({ theme }: { theme: ThemeType }) => theme.viewWidth - 200}px;
  height: ${({ theme }: { theme: ThemeType }) =>
    (theme.viewWidth / 1369) * 513}px;
  background: ${({ theme }) => theme.bg};
  overflow: hidden;
  height: 100%;
  background-image: url(${top});
  background-repeat: no-repeat;
  background-position: center top;
  background-size: 100%
    ${({ theme }: { theme: ThemeType }) => (theme.viewWidth / 1690) * 329}px;

  overflow: hidden;
  height: 100%;

  .transactions-tag-wrapper {
    display: flex;
    align-items: center;
    gap: 10px;
    .transaction-tag {
      display: flex;
      align-items: center;
      justify-content: center;
      background: ${({ theme }: { theme: ThemeType }) => theme.bg_blue_10};
      color: ${({ theme }: { theme: ThemeType }) => theme.blue};
      border-radius: 2px;
      min-width: 70px;
      width: auto;
      line-height: 28px;
      padding: 0 10px;
    }
  }

  .referral-inner {
    padding: 45px 40px;

    .referral-title {
      ${({ theme }: { theme: ThemeType }) => theme.fontBold};
      font-size: 24px;
      line-height: 34px;
      margin: 0 0 40px;
      color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
    }

    .referral-content {
      display: flex;
      flex-direction: column;
      width: 100%;
    }
  }
`;

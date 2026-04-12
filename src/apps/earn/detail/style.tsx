import top from 'imgs/banner_airdrop_top_2.svg';
import styled from 'styled-components';

import { ThemeType } from 'src/theme';

export const StyledDetail = styled.div`
  background: ${({ theme }) => theme.bg};
  overflow: hidden;
  height: 100%;
  background-image: url(${top});
  background-repeat: no-repeat;
  background-position: center top;
  background-size: 100%
    ${({ theme }: { theme: ThemeType }) => (theme.viewWidth / 1690) * 329}px;

  .go_back {
    ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
    font-size: 14px;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_b7b_80};
    line-height: 20px;
    display: flex;
    width: 100%;
    height: 100%;
    .go_back_inner {
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 2px;
    }
  }

  .detail-inner {
    margin: 15px auto 0;
    width: ${({ theme }: { theme: ThemeType }) =>
      theme.viewWidth > 1120 ? 1120 : theme.viewWidth - 40}px;
  }
  .detail-content {
    margin: 0 auto;
    width: 780px;
    display: flex;
    align-items: flex-start;
    gap: 30px;
    margin-top: 55px;
  }

  .title {
    font-size: 20px;
    line-height: 24px;
    ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
    margin-bottom: 25px;
  }
`;

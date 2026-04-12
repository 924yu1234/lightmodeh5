import top from 'imgs/banner_airdrop_top_2.svg';
import styled from 'styled-components';

import { ThemeType } from 'src/theme';

export const StyledCardDetail = styled.div`
  height: 100%;

  background: ${({ theme }) => theme.bg};
  overflow: hidden;
  height: 100%;
  background-image: url(${top});
  background-repeat: no-repeat;
  background-position: center top;
  background-size: 100%
    ${({ theme }: { theme: ThemeType }) => (theme.viewWidth / 1690) * 329}px;

  display: flex;
  align-items: center;
  flex-direction: column;
  padding-top: 60px;

  .invite-tips {
    ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
    margin-top: 35px;
    font-size: 16px;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff_80};
    letter-spacing: 0;
    text-align: center;
  }
`;

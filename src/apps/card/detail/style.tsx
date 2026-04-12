import bg from 'imgs/card/card_bg.jpg';
import styled from 'styled-components';

import { ThemeType } from 'src/theme';

export const StyledCardDetail = styled.div`
  background-color: ${({ theme }) => theme.t_000};
  overflow: hidden;
  height: 100%;
  background-image: url(${bg});
  background-repeat: no-repeat;
  background-position: center top;
  background-size: 1280px 808px;

  display: flex;
  align-items: center;
  flex-direction: column;

  padding-top: 150px;

  .card-tips {
    ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
    font-size: 16px;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff_80};
    letter-spacing: 0;
    text-align: center;
  }
`;

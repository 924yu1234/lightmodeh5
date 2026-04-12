import bg from 'imgs/card/bg_moble.jpg';
import styled from 'styled-components';

import { ThemeType } from 'src/theme';

export const StyledCardDetail = styled.div`
  background-color: ${({ theme }) => theme.t_000};
  overflow: hidden;
  height: 100%;
  background-image: url(${bg});
  background-repeat: no-repeat;
  background-position: center top;
  background-size: 150%
    ${({ theme }: { theme: ThemeType }) => (theme.viewWidth / 1554) * 1624}px;

  display: flex;
  align-items: center;
  flex-direction: column;

  padding-top: ${({ theme }: { theme: ThemeType }) =>
    (theme.viewWidth / 375) * 90}px;

  .card-tips {
    ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
    font-size: 16px;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff_80};
    letter-spacing: 0;
    text-align: center;
  }

  .btns {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    .claim-btn {
      width: 100%;
      min-width: 280px;
    }

    .download-btn {
      width: 100%;
      border: 1px solid ${({ theme }) => theme.border_transparent};
      &:active, &:focus {
        border: 1px solid ${({ theme }) => theme.border_transparent};
        color: ${({ theme }) => theme.blue};
        background: ${({ theme }) => theme.bg_transparent};
      }
      &:disabled, &[disabled]:hover, &[disabled]:focus {
        cursor: default;
        border: 1px solid ${({ theme }) => theme.border_transparent};
        background: transparent
        color: ${(props) => props.theme.t_666};
      }
    }
  }
`;

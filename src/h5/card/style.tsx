import bg from 'imgs/card/bg_moble.jpg';
import styled from 'styled-components';

import { ThemeType } from 'src/theme';

export const StyledCardDetail = styled.div`
  height: 100%;
  padding-top: ${({ theme }: { theme: ThemeType }) =>
    !theme.showH5Header ? 0 : 52}px;

  .page-inner {
    height: ${(props) =>
      props.theme.windowHeight - (!props.theme.showH5Header ? 0 : 52)}px;
    width: ${(props) => props.theme.windowWidth}px;
    overflow: hidden auto;
    padding: 80px 20px 0;
    padding-top: ${({ theme }: { theme: ThemeType }) =>
      (theme.viewWidth / 375) * 90}px;
    background-color: ${({ theme }) => theme.t_000};
    overflow: hidden;
    background-image: url(${bg});
    background-repeat: no-repeat;
    background-position: center -30px;
    background-size: 150%
      ${({ theme }: { theme: ThemeType }) => (theme.viewWidth / 1554) * 1624}px;
    display: flex;
    align-items: center;
    flex-direction: column;
  }

  .card-tips {
    ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
    font-size: 16px;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff_80};
    letter-spacing: 0;
    text-align: center;
  }

  .claim-success-text {
    ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
    font-size: 18px;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff};
    line-height: 22px;
    margin-bottom: 20px;
  }

  .status-text {
    ${({ theme }: { theme: ThemeType }) => theme.fontRegular};
    font-size: 14px;
    color: ${({ theme }: { theme: ThemeType }) => theme.t_fff_80};
    line-height: 20px;
    margin-bottom: 15px;
  }

  .claim-btn {
    width: 280px;
  }
`;

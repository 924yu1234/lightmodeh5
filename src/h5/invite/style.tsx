import bg from 'imgs/invitation_bg.svg';
import styled from 'styled-components';

import { ThemeType } from 'src/theme';

export const StyledCardDetail = styled.div`
  .page-inner {
    height: ${(props) =>
      props.theme.windowHeight - (!props.theme.showH5Header ? 0 : 52)}px;
    width: ${(props) => props.theme.windowWidth}px;
    padding: 80px 20px 0;
    overflow: hidden auto;
    background: ${({ theme }) => theme.bg};
    background-image: url(${bg});
    background-repeat: no-repeat;
    background-position: top center;
    background-size: 100%
      ${({ theme }: { theme: ThemeType }) => (theme.viewWidth / 460) * 460}px;

    display: flex;
    align-items: center;
    flex-direction: column;
  }

  .logo {
    width: 100px;
  }

  .dg-empty {
    padding: 0;
  }

  .claim-btn {
    width: 280px;
  }
`;

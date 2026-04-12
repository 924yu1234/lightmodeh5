import top from 'imgs/banner_airdrop_top_2.svg';
import styled from 'styled-components';

import { ThemeType } from 'src/theme';

export const StyledList = styled.div`
  background: ${({ theme }) => theme.bg};
  overflow: hidden;
  height: 100%;
  background-image: url(${top});
  background-repeat: no-repeat;
  background-position: center top;
  background-size: 100%
    ${({ theme }: { theme: ThemeType }) => (theme.viewWidth / 1690) * 329}px;

  .list-inner {
    width: ${({ theme }: { theme: ThemeType }) =>
      theme.viewWidth > 1120 ? 1120 : theme.viewWidth - 40}px;
    padding: 0 20px 30px;
    margin: 40px auto 0;
  }

  .tabs-extra {
    display: flex;
    align-items: center;
    gap: 4px;
    cursor: pointer;
    margin-left: auto;
  }

  .title {
    font-size: 20px;
    line-height: 24px;
    ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
    margin-bottom: 25px;
  }
`;

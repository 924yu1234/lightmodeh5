import styled from 'styled-components';

import { ThemeType } from 'src/theme';

export const StyledDetail = styled.div`
  background: ${({ theme }) => theme.bg};
  height: 100%;
  padding: 0 0 20px 0;
  display: flex;
  flex-direction: column;
  padding-top: ${({ theme }: { theme: ThemeType }) =>
    !theme.showH5Header ? 0 : 52}px;

  .rewards {
    min-height: 260px;
  }

  .title {
    font-size: 20px;
    line-height: 24px;
    ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
    margin-bottom: 25px;
  }
`;

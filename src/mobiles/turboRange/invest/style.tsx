import styled from 'styled-components';

import { ThemeType } from 'src/theme';

export const StyledInvest = styled.div`
  background: ${({ theme }) => theme.bg};
  height: 100%;
  display: flex;
  flex-direction: column;
  padding-top: ${({ theme }: { theme: ThemeType }) =>
    !theme.showH5Header ? 0 : 52}px;

  .page-inner {
    height: ${(props) =>
      props.theme.windowHeight - (!props.theme.showH5Header ? 0 : 52)}px;
    width: ${(props) => props.theme.windowWidth}px;
    overflow: hidden auto;
    padding: 0 20px 20px 20px;
  }

  .title {
    font-size: 20px;
    line-height: 24px;
    ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
    margin-bottom: 25px;
  }
`;

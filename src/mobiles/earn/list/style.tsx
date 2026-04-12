import styled from 'styled-components';

import { ThemeType } from 'src/theme';

export const StyledList = styled.div`
  overflow: hidden;
  background: ${({ theme }) => theme.bg};
  height: 100%;
  padding: 0 0 20px 0;
  padding-top: ${({ theme }: { theme: ThemeType }) =>
    !theme.showH5Header ? 0 : 52}px;

  .page-inner {
    height: ${(props) =>
      props.theme.windowHeight - (!props.theme.showH5Header ? 0 : 52)}px;
    width: ${(props) => props.theme.windowWidth}px;
    overflow: hidden auto;
  }

  .tabs-extra {
    display: flex;
    align-items: center;
    gap: 4px;
    margin-left: auto;
  }

  .title {
    font-size: 20px;
    line-height: 24px;
    ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
    margin-bottom: 25px;
  }
`;

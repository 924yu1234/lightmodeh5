import styled from 'styled-components';

import { ThemeType } from 'src/theme';

export const StyledList = styled.div`
  overflow: hidden;
  height: 100%;
  background: ${({ theme }: { theme: ThemeType }) => theme.bg};
  padding-top: ${({ theme }: { theme: ThemeType }) =>
    !theme.showH5Header ? 0 : 52}px;

  .page-inner {
    height: ${(props) =>
      props.theme.windowHeight - (!props.theme.showH5Header ? 0 : 52)}px;
    width: ${(props) => props.theme.windowWidth}px;
    overflow: hidden auto;
    overscroll-behavior-y: contain;
    padding: 0 20px 20px 20px;
  }

  .title {
    font-size: 24px;
    line-height: 34px;
    ${({ theme }: { theme: ThemeType }) => theme.fontMedium};
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .about-turbo-range {
      min-width: auto;
    }
  }

  .mobile-main-tabs.mantine-SegmentedControl-root {
    margin-bottom: 16px;
  }
`;

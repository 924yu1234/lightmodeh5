import React, { useMemo } from 'react';
import styled, { ThemeProvider } from 'styled-components';

import useWindowSize from 'src/hooks/useWindowSize';
import { useUEDSettings } from 'src/mock/MockModeContext';
import getTheme, { ThemeType } from 'src/theme';

const PreviewBed = styled.div`
  width: 100%;
  min-height: 60px;
  padding: 14px;
  border-radius: 8px;
  box-sizing: border-box;
  background: ${({ theme }: { theme: ThemeType }) => theme.bodyBg};
  display: flex;
  align-items: center;
  justify-content: center;
`;

type Props = {
  children: React.ReactNode;
};

/**
 * Renders children with a **dark** design token theme so library previews stay
 * visible even when global ⚙ theme is light (e.g. SegmentedControl default track).
 */
export default function DarkThemePreview({ children }: Props) {
  const { width, height } = useWindowSize();
  const { fontPreset } = useUEDSettings();
  const darkTheme = useMemo(
    () =>
      getTheme({
        width,
        height,
        isMobile: false,
        isAppH5: false,
        showH5Header: false,
        theme: 'dark',
        fontPreset,
      }),
    [width, height, fontPreset]
  );

  return (
    <ThemeProvider theme={darkTheme}>
      <PreviewBed>{children}</PreviewBed>
    </ThemeProvider>
  );
}

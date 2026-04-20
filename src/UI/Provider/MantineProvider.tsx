import React, { ReactNode } from 'react';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { useTheme } from 'styled-components';

import { useNotificationLimit } from 'src/state/notification/utils';
import { ThemeType } from 'src/theme';

import StyleOthers from './styleOthers';

import '@mantine/notifications/styles.css';

export default function MantineThemeProvider({
  children,
}: {
  children: ReactNode;
}) {
  const limit = useNotificationLimit();
  const t = useTheme() as ThemeType;
  return (
    <MantineProvider
      theme={{
        fontFamily: t.mantineFontFamily,
      }}
    >
      {children}
      <Notifications
        limit={limit}
        containerWidth={320}
        position="bottom-right"
      />
      <StyleOthers />
    </MantineProvider>
  );
}

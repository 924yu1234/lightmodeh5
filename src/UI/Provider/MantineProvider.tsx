import React, { ReactNode } from 'react';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';

import { useNotificationLimit } from 'src/state/notification/utils';

import StyleOthers from './styleOthers';

import '@mantine/notifications/styles.css';

export default function MantineThemeProvider({
  children,
}: {
  children: ReactNode;
}) {
  const limit = useNotificationLimit();
  return (
    <MantineProvider
      theme={{
        fontFamily: 'OpenSansRegular, PingFang SC; font-weight: 400;',
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

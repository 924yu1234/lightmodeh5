/* eslint-disable */
import 'core-js/stable';
import 'style/main.less';
import '@mantine/core/styles.css';

import IntlProvider from 'js/locals';
import UserWebSocketProvicer from 'js/providers/userWebsocket/useUserWebsocket';
import { useIsAppH5, WalletProvider } from 'js/providers/useWallet';
import WebSocketProvicer from 'js/providers/useWebsocket';
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import FontStyled from 'style/fonts-styles';

import { UEDSettingsProvider } from './mock/MockModeContext';
import { setupMockInterceptors } from './mock/interceptor';
import { MessageProvider } from './providers/useMessage';
import Root from './root';
import store, { persistor } from './state';
import ApplicationUpdate from './state/application/updater';
import DexAccountUpdate from './state/dexAccount/updater';
import DAUpdater from './state/dexAccount/updater_da';
import NotificationBannerUpdater from './state/notification/updater_banner';
import SwapPairsUpdater from './state/swap/pairs/updater';
import UserUpdater from './state/user/updater';
import SwapBalanceUpdater from './state/swap/balances/updater';
import SwapTokensUpdater from './state/swap/tokens/updater';
import IntentEarnUpdater from './state/intent/earn/updater';
import SwapTokenInfoUpdater from './state/swap/tokenInfo/updater';
import IntentUpdater from './state/intent/intent/updater';
import TurboRangeUpdater from './state/turboRange/updater';

// UED: Register mock interceptors before app renders
setupMockInterceptors();

function Updaters() {
  const isAppH5 = useIsAppH5();
  if (isAppH5) return (
    <>
      <SwapBalanceUpdater />
      <IntentEarnUpdater />
      <SwapTokenInfoUpdater />
      <TurboRangeUpdater />
      <SwapTokensUpdater />
    </>
  );

  return (
    <>
      <UserUpdater />
      <NotificationBannerUpdater />
      <SwapPairsUpdater />
      <SwapBalanceUpdater />
      <SwapTokensUpdater />
      <SwapTokenInfoUpdater />
      <IntentEarnUpdater />
      <IntentUpdater />
      <TurboRangeUpdater />
    </>
  );
}

const rootEle = document.getElementById('root');
const root = createRoot(rootEle);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 60, // 1 hour
    },
  },
});

root.render(
  <UEDSettingsProvider>
    <QueryClientProvider client={queryClient}>
      <WalletProvider>
        <Provider store={store}>
          <MessageProvider>
            <PersistGate loading={null} persistor={persistor}>
              <IntlProvider>
                <ApplicationUpdate />
                <DexAccountUpdate />
                <DAUpdater />
                <WebSocketProvicer>
                  <UserWebSocketProvicer>
                    <Root updaters={<Updaters />} />
                    <FontStyled />
                  </UserWebSocketProvicer>
                </WebSocketProvicer>
              </IntlProvider>
            </PersistGate>
          </MessageProvider>
        </Provider>
      </WalletProvider>
    </QueryClientProvider>
  </UEDSettingsProvider>
);

if (module.hot) {
  module.hot.accept();
}

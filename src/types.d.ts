import { MessageInterface } from './providers/useMessage';

declare global {
  interface Window {
    message: MessageInterface;
    isConnectingWallet: boolean;
    gaEvent: any;
    setDocumentTitle: (title: string) => void;
    gift_code: string;
    hasEarnDepositOrder: boolean;
    hasTurboRangeOrder: boolean;
    DeGateHistory: BrowserHistory;
  }
}

declare module 'ahooks';
declare module '@reduxjs/toolkit';
declare module 'react-copy-to-clipboard';
declare module 'uuid';

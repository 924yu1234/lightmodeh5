/**
 * UED Wallet Configuration
 *
 * How to update:
 *   1. Open dg-wallet project in browser, open DevTools Console
 *   2. Find the `console.log('walletSnapshot', walletSnapshot)` output
 *   3. Right-click the object → "Copy object"
 *   4. Replace the `walletSnapshot` value below with the copied object
 *   5. Save and the UED project will use the new wallet identity
 *
 * The walletSnapshot contains all wallet state that trade-fe needs:
 *   - account, accessToken (for API auth)
 *   - DAs (chain addresses)
 *   - solverAddresses
 *   - providerInfo, locale, etc.
 */

// Paste walletSnapshot from dg-wallet console output here:
export const walletSnapshot = {
  DAs: {
    BASE: {
      address: '0xBD8FA047e6b1Dc2cD75C3228A51197f9F02D407D',
      publicKey:
        '043c95dd4febcb0372d0dc9f14da266a3690add633c4811854f288458ad106389f9648d2f73de68130010ab988e0f8f7a77662620a06f998cdff0b7574140137e4',
      chain: 'BASE',
    },
    SOLANA: {
      address: '5wqJyC9x2JmcmPyLdGvryiMVMwQPciyWYMcQtWcjYKr4',
      publicKey:
        '497abc47b0ba436d13d88f2adf1d362719e8a1d5cbf13259eb54a1e0aee9a5bd',
      chain: 'SOLANA',
    },
    ETHEREUM: {
      address: '0xBD8FA047e6b1Dc2cD75C3228A51197f9F02D407D',
      publicKey:
        '043c95dd4febcb0372d0dc9f14da266a3690add633c4811854f288458ad106389f9648d2f73de68130010ab988e0f8f7a77662620a06f998cdff0b7574140137e4',
      chain: 'ETHEREUM',
    },
  },
  accessToken: {
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjIwODkyNzIxODYsIm9yaWdfYXQiOjE3NzM5MTIxODYsInNvdXJjZV9pcCI6IjE1LjE2NC4yMjcuMjIwIiwidXNlcl9pZCI6IjB4NmExODlmMDJlMTI1ZmZiNjZlY2FmZTg1ZTM0MDE5YjNjYmE5ZWJhY18wIn0.OcwpY2m8JERnPD6VoFyOdiJNXiryJ4ECVS9PfdnYKZE',
    da_owner: '0x6a189f02e125ffb66ecafe85e34019b3cba9ebac_0',
  },
  account: '0x6a189f02e125ffb66ecafe85e34019b3cba9ebac',
  allowQuickTrading: true,
  deviceId: '',
  dexChainId: 17000,
  hasUnlocked: true,
  isApp: false,
  isFullVersion: true,
  isHideQuickTradingTips: false,
  isMobile: false,
  locale: 'en-US',
  providerInfo: {
    name: 'privy',
    walletType: 'email',
    walletName: 'UED Wallet',
    accountName: 'UED Account',
  },
  referrer: '',
  selectedWallet: '',
  solverAddresses: {} as Record<string, { gas: string; solver: string }>,
  uuid: '',
  walletChainId: 17000,
};

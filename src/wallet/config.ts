/**
 * UED Wallet Configuration
 *
 * Two ways to supply a walletSnapshot:
 *
 *   A) Runtime override via the UED settings panel (⚙ button →
 *      "Wallet Config" → "Paste JSON"). Pasted snapshot is persisted in
 *      localStorage under WALLET_STORAGE_KEY and used on every page load.
 *      This is the ONLY way to configure a deployed/public build — no
 *      credentials live in source.
 *
 *   B) The DEFAULT_WALLET_SNAPSHOT baked into this file below, used as a
 *      fallback when localStorage is empty. For local dev you can keep
 *      your own snapshot here; for a public deploy, leave it empty.
 *
 * The walletSnapshot shape contains all wallet state trade-fe needs:
 *   - account, accessToken (for API auth)
 *   - DAs (chain addresses)
 *   - solverAddresses
 *   - providerInfo, locale, etc.
 */

export const WALLET_STORAGE_KEY = 'ued_wallet_snapshot';

// Default (baked-in) wallet snapshot used when localStorage is empty.
// For public deploys, replace with an empty object `{}`.
const DEFAULT_WALLET_SNAPSHOT: any = {
  DAs: {
    APTOS: {
      path: "m/44'/637'/0'/0'/0'",
      address:
        '0xf01f5c0c987e90ebc36b2d476d902a984c13615e5a6c22cd0e41af70544b7e51',
      publicKey:
        '3d026ec8f33d75bccf246697ac48a9c614f3665529b512cc7ed8c76fb3e73702',
      chain: 'APTOS',
    },
    ARBITRUM: {
      path: "m/44'/60'/0'/0/0",
      address: '0x9Cef71e4c0079D0883cB586B1fd3a458437f3305',
      publicKey:
        '044f3cf6b49318053a4e8aa24a56c19226ec9adeaeb2edb5fa662129f84ce2672fcef1329392209dfbc67d9a938146055cb81956614c8784a619820ff7162f76da',
      chain: 'ARBITRUM',
    },
    AVALANCHE: {
      path: "m/44'/60'/0'/0/0",
      address: '0x9Cef71e4c0079D0883cB586B1fd3a458437f3305',
      publicKey:
        '044f3cf6b49318053a4e8aa24a56c19226ec9adeaeb2edb5fa662129f84ce2672fcef1329392209dfbc67d9a938146055cb81956614c8784a619820ff7162f76da',
      chain: 'AVALANCHE',
    },
    BASE: {
      path: "m/44'/60'/0'/0/0",
      address: '0x9Cef71e4c0079D0883cB586B1fd3a458437f3305',
      publicKey:
        '044f3cf6b49318053a4e8aa24a56c19226ec9adeaeb2edb5fa662129f84ce2672fcef1329392209dfbc67d9a938146055cb81956614c8784a619820ff7162f76da',
      chain: 'BASE',
    },
    BITCOIN: {
      path: "m/86'/0'/0'/0/0",
      address: 'bc1p38sxx6sleqse6yecghyt3ctcqkydlcshmd20wstrwxuzpmlkyvkq666a0k',
      publicKey:
        '041c69ccbd12de2172c76f567ac254ea6ba2dc9a04a0bf9b7bfab4b56ef743fe5cf7ad10c134952388096b1e0c5a6f4e1bd26b4fa235cade8d096bec07ec459cec',
      chain: 'BITCOIN',
    },
    BSC: {
      path: "m/44'/60'/0'/0/0",
      address: '0x9Cef71e4c0079D0883cB586B1fd3a458437f3305',
      publicKey:
        '044f3cf6b49318053a4e8aa24a56c19226ec9adeaeb2edb5fa662129f84ce2672fcef1329392209dfbc67d9a938146055cb81956614c8784a619820ff7162f76da',
      chain: 'BSC',
    },
    ETHEREUM: {
      path: "m/44'/60'/0'/0/0",
      address: '0x9Cef71e4c0079D0883cB586B1fd3a458437f3305',
      publicKey:
        '044f3cf6b49318053a4e8aa24a56c19226ec9adeaeb2edb5fa662129f84ce2672fcef1329392209dfbc67d9a938146055cb81956614c8784a619820ff7162f76da',
      chain: 'ETHEREUM',
    },
    LINEA: {
      path: "m/44'/60'/0'/0/0",
      address: '0x9Cef71e4c0079D0883cB586B1fd3a458437f3305',
      publicKey:
        '044f3cf6b49318053a4e8aa24a56c19226ec9adeaeb2edb5fa662129f84ce2672fcef1329392209dfbc67d9a938146055cb81956614c8784a619820ff7162f76da',
      chain: 'LINEA',
    },
    MEGAETH_TESTNET: {
      path: "m/44'/60'/0'/0/0",
      address: '0x9Cef71e4c0079D0883cB586B1fd3a458437f3305',
      publicKey:
        '044f3cf6b49318053a4e8aa24a56c19226ec9adeaeb2edb5fa662129f84ce2672fcef1329392209dfbc67d9a938146055cb81956614c8784a619820ff7162f76da',
      chain: 'MEGAETH_TESTNET',
    },
    MONAD: {
      path: "m/44'/60'/0'/0/0",
      address: '0x9Cef71e4c0079D0883cB586B1fd3a458437f3305',
      publicKey:
        '044f3cf6b49318053a4e8aa24a56c19226ec9adeaeb2edb5fa662129f84ce2672fcef1329392209dfbc67d9a938146055cb81956614c8784a619820ff7162f76da',
      chain: 'MONAD',
    },
    MONAD_TESTNET: {
      path: "m/44'/60'/0'/0/0",
      address: '0x9Cef71e4c0079D0883cB586B1fd3a458437f3305',
      publicKey:
        '044f3cf6b49318053a4e8aa24a56c19226ec9adeaeb2edb5fa662129f84ce2672fcef1329392209dfbc67d9a938146055cb81956614c8784a619820ff7162f76da',
      chain: 'MONAD_TESTNET',
    },
    OPTIMISM: {
      path: "m/44'/60'/0'/0/0",
      address: '0x9Cef71e4c0079D0883cB586B1fd3a458437f3305',
      publicKey:
        '044f3cf6b49318053a4e8aa24a56c19226ec9adeaeb2edb5fa662129f84ce2672fcef1329392209dfbc67d9a938146055cb81956614c8784a619820ff7162f76da',
      chain: 'OPTIMISM',
    },
    POLYGON: {
      path: "m/44'/60'/0'/0/0",
      address: '0x9Cef71e4c0079D0883cB586B1fd3a458437f3305',
      publicKey:
        '044f3cf6b49318053a4e8aa24a56c19226ec9adeaeb2edb5fa662129f84ce2672fcef1329392209dfbc67d9a938146055cb81956614c8784a619820ff7162f76da',
      chain: 'POLYGON',
    },
    SOLANA: {
      path: "m/44'/501'/0'/0'",
      address: '9Faa9Qutk3STxz14NLfC978ETaHpByP9o8FmhXGtKFpe',
      publicKey:
        '7a99960bade24b2361433e300550de7416168426f27baf7bb0bc4bbe8a6f5ba3',
      chain: 'SOLANA',
    },
    SONIC: {
      path: "m/44'/60'/0'/0/0",
      address: '0x9Cef71e4c0079D0883cB586B1fd3a458437f3305',
      publicKey:
        '044f3cf6b49318053a4e8aa24a56c19226ec9adeaeb2edb5fa662129f84ce2672fcef1329392209dfbc67d9a938146055cb81956614c8784a619820ff7162f76da',
      chain: 'SONIC',
    },
    WORLDCHAIN: {
      path: "m/44'/60'/0'/0/0",
      address: '0x9Cef71e4c0079D0883cB586B1fd3a458437f3305',
      publicKey:
        '044f3cf6b49318053a4e8aa24a56c19226ec9adeaeb2edb5fa662129f84ce2672fcef1329392209dfbc67d9a938146055cb81956614c8784a619820ff7162f76da',
      chain: 'WORLDCHAIN',
    },
    XLAYER: {
      path: "m/44'/60'/0'/0/0",
      address: '0x9Cef71e4c0079D0883cB586B1fd3a458437f3305',
      publicKey:
        '044f3cf6b49318053a4e8aa24a56c19226ec9adeaeb2edb5fa662129f84ce2672fcef1329392209dfbc67d9a938146055cb81956614c8784a619820ff7162f76da',
      chain: 'XLAYER',
    },
  },
  accessToken: {
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjIwODkyMDI2ODAsIm9yaWdfYXQiOjE3NzM4NDI2ODAsInNvdXJjZV9pcCI6IjE1LjE2NC4yMjcuMjIwIiwidXNlcl9pZCI6IjB4NjZlMzkxMjk2ZGU1NjRhZTUyNzc4YjFiNmYyY2Y0NTgyZGU1MGYyMl8wIn0.BC1jC7A3DyDmby61Mip1Rh1MM90nWhVfK_qfXuB6XxU',
    da_owner: '0x66e391296DE564Ae52778b1B6f2Cf4582De50F22_0',
  },
  account: '0xc1D5A297106bE66dE1e199aB4aAE5f524650885c',
  allowQuickTrading: true,
  deviceId: 'bce054a2-ec37-5949-9399-e6d732c74826',
  dexChainId: 17000,
  hasUnlocked: false,
  isApp: false,
  isHideQuickTradingTips: true,
  isMobile: false,
  locale: 'en-US',
  providerInfo: {
    icon: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzUiIGhlaWdodD0iMzQiIHZpZXdCb3g9IjAgMCAzNSAzNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTMyLjcwNzcgMzIuNzUyMkwyNS4xNjg4IDMwLjUxNzRMMTkuNDgzMyAzMy45MDA4TDE1LjUxNjcgMzMuODk5MUw5LjgyNzkzIDMwLjUxNzRMMi4yOTIyNSAzMi43NTIyTDAgMjUuMDQ4OUwyLjI5MjI1IDE2LjQ5OTNMMCA5LjI3MDk0TDIuMjkyMjUgMC4zMTIyNTZMMTQuMDY3NCA3LjMxNTU0SDIwLjkzMjZMMzIuNzA3NyAwLjMxMjI1NkwzNSA5LjI3MDk0TDMyLjcwNzcgMTYuNDk5M0wzNSAyNS4wNDg5TDMyLjcwNzcgMzIuNzUyMloiIGZpbGw9IiNGRjVDMTYiLz4KPHBhdGggZD0iTTIuMjkzOTUgMC4zMTIyNTZMMTQuMDY5MSA3LjMyMDQ3TDEzLjYwMDggMTIuMTMwMUwyLjI5Mzk1IDAuMzEyMjU2WiIgZmlsbD0iI0ZGNUMxNiIvPgo8cGF0aCBkPSJNOS44Mjk1OSAyNS4wNTIyTDE1LjAxMDYgMjguOTgxMUw5LjgyOTU5IDMwLjUxNzVWMjUuMDUyMloiIGZpbGw9IiNGRjVDMTYiLz4KPHBhdGggZD0iTTE0LjU5NjYgMTguNTU2NUwxMy42MDA5IDEyLjEzMzNMNy4yMjY5MiAxNi41MDA5TDcuMjIzNjMgMTYuNDk5M1YxNi41MDI1TDcuMjQzMzUgMjAuOTk4M0w5LjgyODA5IDE4LjU1NjVIOS44Mjk3NEgxNC41OTY2WiIgZmlsbD0iI0ZGNUMxNiIvPgo8cGF0aCBkPSJNMzIuNzA3NyAwLjMxMjI1NkwyMC45MzI2IDcuMzIwNDdMMjEuMzk5MyAxMi4xMzAxTDMyLjcwNzcgMC4zMTIyNTZaIiBmaWxsPSIjRkY1QzE2Ii8+CjxwYXRoIGQ9Ik0yNS4xNzIyIDI1LjA1MjJMMTkuOTkxMiAyOC45ODExTDI1LjE3MjIgMzAuNTE3NVYyNS4wNTIyWiIgZmlsbD0iI0ZGNUMxNiIvPgo8cGF0aCBkPSJNMjcuNzc2NiAxNi41MDI1SDI3Ljc3ODNIMjcuNzc2NlYxNi40OTkzTDI3Ljc3NSAxNi41MDA5TDIxLjQwMSAxMi4xMzMzTDIwLjQwNTMgMTguNTU2NUgyNS4xNzIyTDI3Ljc1ODYgMjAuOTk4M0wyNy43NzY2IDE2LjUwMjVaIiBmaWxsPSIjRkY1QzE2Ii8+CjxwYXRoIGQ9Ik05LjgyNzkzIDMwLjUxNzVMMi4yOTIyNSAzMi43NTIyTDAgMjUuMDUyMkg5LjgyNzkzVjMwLjUxNzVaIiBmaWxsPSIjRTM0ODA3Ii8+CjxwYXRoIGQ9Ik0xNC41OTQ3IDE4LjU1NDlMMTYuMDM0MSAyNy44NDA2TDE0LjAzOTMgMjIuNjc3N0w3LjIzOTc1IDIwLjk5ODRMOS44MjYxMyAxOC41NTQ5SDE0LjU5M0gxNC41OTQ3WiIgZmlsbD0iI0UzNDgwNyIvPgo8cGF0aCBkPSJNMjUuMTcyMSAzMC41MTc1TDMyLjcwNzggMzIuNzUyMkwzNS4wMDAxIDI1LjA1MjJIMjUuMTcyMVYzMC41MTc1WiIgZmlsbD0iI0UzNDgwNyIvPgo8cGF0aCBkPSJNMjAuNDA1MyAxOC41NTQ5TDE4Ljk2NTggMjcuODQwNkwyMC45NjA3IDIyLjY3NzdMMjcuNzYwMiAyMC45OTg0TDI1LjE3MjIgMTguNTU0OUgyMC40MDUzWiIgZmlsbD0iI0UzNDgwNyIvPgo8cGF0aCBkPSJNMCAyNS4wNDg4TDIuMjkyMjUgMTYuNDk5M0g3LjIyMTgzTDcuMjM5OTEgMjAuOTk2N0wxNC4wMzk0IDIyLjY3NkwxNi4wMzQzIDI3LjgzODlMMTUuMDA4OSAyOC45NzZMOS44Mjc5MyAyNS4wNDcySDBWMjUuMDQ4OFoiIGZpbGw9IiNGRjhENUQiLz4KPHBhdGggZD0iTTM1LjAwMDEgMjUuMDQ4OEwzMi43MDc4IDE2LjQ5OTNIMjcuNzc4M0wyNy43NjAyIDIwLjk5NjdMMjAuOTYwNyAyMi42NzZMMTguOTY1OCAyNy44Mzg5TDE5Ljk5MTIgMjguOTc2TDI1LjE3MjIgMjUuMDQ3MkgzNS4wMDAxVjI1LjA0ODhaIiBmaWxsPSIjRkY4RDVEIi8+CjxwYXRoIGQ9Ik0yMC45MzI1IDcuMzE1NDNIMTcuNDk5OUgxNC4wNjczTDEzLjYwMDYgMTIuMTI1MUwxNi4wMzQyIDI3LjgzNEgxOC45NjU2TDIxLjQwMDggMTIuMTI1MUwyMC45MzI1IDcuMzE1NDNaIiBmaWxsPSIjRkY4RDVEIi8+CjxwYXRoIGQ9Ik0yLjI5MjI1IDAuMzEyMjU2TDAgOS4yNzA5NEwyLjI5MjI1IDE2LjQ5OTNINy4yMjE4M0wxMy41OTkxIDEyLjEzMDFMMi4yOTIyNSAwLjMxMjI1NloiIGZpbGw9IiM2NjE4MDAiLz4KPHBhdGggZD0iTTEzLjE3IDIwLjQxOTlIMTAuOTM2OUw5LjcyMDk1IDIxLjYwNjJMMTQuMDQwOSAyMi42NzI3TDEzLjE3IDIwLjQxODJWMjAuNDE5OVoiIGZpbGw9IiM2NjE4MDAiLz4KPHBhdGggZD0iTTMyLjcwNzcgMC4zMTIyNTZMMzQuOTk5OSA5LjI3MDk0TDMyLjcwNzcgMTYuNDk5M0gyNy43NzgxTDIxLjQwMDkgMTIuMTMwMUwzMi43MDc3IDAuMzEyMjU2WiIgZmlsbD0iIzY2MTgwMCIvPgo8cGF0aCBkPSJNMjEuODMzIDIwLjQxOTlIMjQuMDY5NEwyNS4yODUzIDIxLjYwNzlMMjAuOTYwNCAyMi42NzZMMjEuODMzIDIwLjQxODJWMjAuNDE5OVoiIGZpbGw9IiM2NjE4MDAiLz4KPHBhdGggZD0iTTE5LjQ4MTcgMzAuODM2MkwxOS45OTExIDI4Ljk3OTRMMTguOTY1OCAyNy44NDIzSDE2LjAzMjdMMTUuMDA3MyAyOC45Nzk0TDE1LjUxNjcgMzAuODM2MiIgZmlsbD0iIzY2MTgwMCIvPgo8cGF0aCBkPSJNMTkuNDgxNiAzMC44MzU5VjMzLjkwMjFIMTUuNTE2NlYzMC44MzU5SDE5LjQ4MTZaIiBmaWxsPSIjQzBDNENEIi8+CjxwYXRoIGQ9Ik05LjgyOTU5IDMwLjUxNDJMMTUuNTIgMzMuOTAwOFYzMC44MzQ2TDE1LjAxMDYgMjguOTc3OEw5LjgyOTU5IDMwLjUxNDJaIiBmaWxsPSIjRTdFQkY2Ii8+CjxwYXRoIGQ9Ik0yNS4xNzIxIDMwLjUxNDJMMTkuNDgxNyAzMy45MDA4VjMwLjgzNDZMMTkuOTkxMSAyOC45Nzc4TDI1LjE3MjEgMzAuNTE0MloiIGZpbGw9IiNFN0VCRjYiLz4KPC9zdmc+Cg==',
    name: 'MetaMask',
    ledgerAppVersion: '',
  },
  referrer: '',
  selectedWallet: 'injected-io.metamask',
  solverAddresses: {
    ETHEREUM: {
      solver: '0xAfdbBf92ba5C1924F7409Aa259b4C79e7fa5Ad72',
      gas: '0xBAab9598e027Ec72007c26F8104DF70f9B72C725',
    },
    SOLANA: {
      solver: 'E32ykUTbi4Ag8t4Hic41HtDVwAZca1oGorqvkt3YS7Dy',
      gas: '2cv84r1eketuLWg6uJ387XqiSQ5nh8rgDSeTshYQgV8i',
    },
    BITCOIN: {
      solver: 'bc1p34sxhd0vdzska47jqmeuvlj86a8ajuvmupsn9wp5w3urdvftnclqxhukff',
      gas: 'bc1pxnhx2sw9gww9da59ymk8xryxvqcmu5nmg8zs7thk9m5qkm99vnxsksggf9',
    },
    BASE: {
      solver: '0xAfdbBf92ba5C1924F7409Aa259b4C79e7fa5Ad72',
      gas: '0xBAab9598e027Ec72007c26F8104DF70f9B72C725',
    },
    APTOS: {
      solver:
        '0x3d8c71454eb1151a89f31541ec3d87e9b80bf39b1892a072426c33331cac624c',
      gas: '0x032389e187a931c890199a735b90e4260bf406e4250e7a5ad5626105f9f26907',
    },
    ARBITRUM: {
      solver: '0xAfdbBf92ba5C1924F7409Aa259b4C79e7fa5Ad72',
      gas: '0xBAab9598e027Ec72007c26F8104DF70f9B72C725',
    },
    AVALANCHE: {
      solver: '0xAfdbBf92ba5C1924F7409Aa259b4C79e7fa5Ad72',
      gas: '0xBAab9598e027Ec72007c26F8104DF70f9B72C725',
    },
    BSC: {
      solver: '0xAfdbBf92ba5C1924F7409Aa259b4C79e7fa5Ad72',
      gas: '0xBAab9598e027Ec72007c26F8104DF70f9B72C725',
    },
    LINEA: {
      solver: '0xAfdbBf92ba5C1924F7409Aa259b4C79e7fa5Ad72',
      gas: '0xBAab9598e027Ec72007c26F8104DF70f9B72C725',
    },
    MEGAETH_TESTNET: {
      solver: '0xAfdbBf92ba5C1924F7409Aa259b4C79e7fa5Ad72',
      gas: '0xBAab9598e027Ec72007c26F8104DF70f9B72C725',
    },
    MONAD: {
      solver: '0xAfdbBf92ba5C1924F7409Aa259b4C79e7fa5Ad72',
      gas: '0xBAab9598e027Ec72007c26F8104DF70f9B72C725',
    },
    MONAD_TESTNET: {
      solver: '0xAfdbBf92ba5C1924F7409Aa259b4C79e7fa5Ad72',
      gas: '0xBAab9598e027Ec72007c26F8104DF70f9B72C725',
    },
    OPTIMISM: {
      solver: '0xAfdbBf92ba5C1924F7409Aa259b4C79e7fa5Ad72',
      gas: '0xBAab9598e027Ec72007c26F8104DF70f9B72C725',
    },
    POLYGON: {
      solver: '0xAfdbBf92ba5C1924F7409Aa259b4C79e7fa5Ad72',
      gas: '0xBAab9598e027Ec72007c26F8104DF70f9B72C725',
    },
    SONIC: {
      solver: '0xAfdbBf92ba5C1924F7409Aa259b4C79e7fa5Ad72',
      gas: '0xBAab9598e027Ec72007c26F8104DF70f9B72C725',
    },
    WORLDCHAIN: {
      solver: '0xAfdbBf92ba5C1924F7409Aa259b4C79e7fa5Ad72',
      gas: '0xBAab9598e027Ec72007c26F8104DF70f9B72C725',
    },
    XLAYER: {
      solver: '0xAfdbBf92ba5C1924F7409Aa259b4C79e7fa5Ad72',
      gas: '0xBAab9598e027Ec72007c26F8104DF70f9B72C725',
    },
  },
  uuid: 'a02c443c-2a2f-4853-b6e9-5d270152dabb',
  walletChainId: 1,
};

// Accepts either strict JSON or a JavaScript object literal (as produced
// by Chrome DevTools "Copy object" — unquoted keys, trailing commas, etc.).
// Returns the parsed object or throws.
function parseSnapshotText(text: string): any {
  const trimmed = (text || '').trim();
  if (!trimmed) throw new Error('Empty input');
  // First try strict JSON
  try {
    return JSON.parse(trimmed);
  } catch {
    // fall through
  }
  // Fallback: evaluate as a JS expression (safe here — user explicitly
  // pastes into a dev/settings UI in their own browser).
  // eslint-disable-next-line no-new-func
  const fn = new Function(`"use strict"; return (${trimmed});`);
  const result = fn();
  if (!result || typeof result !== 'object') {
    throw new Error('Not a valid object');
  }
  return result;
}

// When REACT_APP_PUBLIC_DEPLOY=1 is set at build time (e.g. on Vercel),
// the baked-in DEFAULT_WALLET_SNAPSHOT is ignored so no credentials ship
// in the build artifact. Users must paste their own snapshot via the UED
// settings panel on first visit (saved to localStorage).
const IS_PUBLIC_DEPLOY = process.env.REACT_APP_PUBLIC_DEPLOY === '1';
const EFFECTIVE_DEFAULT: any = IS_PUBLIC_DEPLOY ? {} : DEFAULT_WALLET_SNAPSHOT;

function loadWalletSnapshot(): any {
  try {
    const saved =
      typeof localStorage !== 'undefined'
        ? localStorage.getItem(WALLET_STORAGE_KEY)
        : null;
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed && typeof parsed === 'object') {
        return parsed;
      }
    }
  } catch {
    // ignore corrupt storage, fall back to default
  }
  return EFFECTIVE_DEFAULT;
}

// The live walletSnapshot that the app reads. Consumers import this as a
// value; changes via the settings panel require a page reload to take
// effect (we save to localStorage then reload).
export const walletSnapshot: any = loadWalletSnapshot();

/** Save a new snapshot from a JSON / JS object literal string. */
export function setWalletSnapshotFromText(text: string): {
  ok: boolean;
  error?: string;
} {
  try {
    const parsed = parseSnapshotText(text);
    localStorage.setItem(WALLET_STORAGE_KEY, JSON.stringify(parsed));
    return { ok: true };
  } catch (e: any) {
    return { ok: false, error: e?.message || 'Parse error' };
  }
}

/** Remove the localStorage override and revert to the baked-in default. */
export function clearWalletSnapshot() {
  try {
    localStorage.removeItem(WALLET_STORAGE_KEY);
  } catch {
    // ignore
  }
}

/** Is the current snapshot loaded from localStorage (vs the baked-in default)? */
export function isWalletSnapshotOverridden(): boolean {
  try {
    return !!localStorage.getItem(WALLET_STORAGE_KEY);
  } catch {
    return false;
  }
}

/** Short human-readable summary for the settings panel. */
export function getWalletSnapshotSummary() {
  const ws = walletSnapshot || {};
  const account = ws.account || '';
  const accountShort = account
    ? `${account.slice(0, 6)}…${account.slice(-4)}`
    : '(none)';
  return {
    account,
    accountShort,
    hasToken: !!ws.accessToken?.token,
    daOwner: ws.accessToken?.da_owner || '',
    locale: ws.locale || '',
    overridden: isWalletSnapshotOverridden(),
  };
}

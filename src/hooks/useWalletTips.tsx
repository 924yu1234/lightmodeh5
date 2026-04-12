import { CONNECTION } from 'src/constants/interface/wallet';
import { useIntl } from 'src/locals';
import { useWalletWeb3 } from 'src/providers/useWallet';
import { useThemeParams } from 'src/theme';

export default function useWalletTips() {
  const intl = useIntl();
  const { isMobile } = useThemeParams();
  let walletTips = intl.wallet_tips;
  const { selectedWallet, providerInfo } = useWalletWeb3();
  if (selectedWallet === CONNECTION.LEDGER_ID) {
    walletTips = intl.wallet_ledger_tips;
  } else if (selectedWallet === CONNECTION.WALLET_CONNECT_CONNECTOR_ID) {
    walletTips = intl.wallet_walletconnect_tips;
  } else if (
    selectedWallet.includes(CONNECTION.INJECTED_CONNECTOR_TYPE) &&
    !isMobile
  ) {
    walletTips = intl.wallet_metamask_tips.replace(
      'MetaMask',
      providerInfo?.name
    );
  }

  return walletTips;
}

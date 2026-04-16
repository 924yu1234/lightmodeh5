import React from 'react';

import ClaimHistoryModal from 'src/apps/referral/claimHistoryModal';
import ClaimModal from 'src/apps/referral/claimModal';
import ClaimSuccessModal from 'src/apps/referral/claimSuccess';
import AssetModal from 'src/components/AssetModal';
import FungibleUsdcModal from 'src/components/AssetModal/fungibleUsdc';
import SwapQuoteTokenBalance from 'src/components/AssetModal/swapQuoteTokenBalance';
import TokenSitesModal from 'src/components/AssetModal/tokenSitesModal';
import BridgeUsdcModal from 'src/components/BridgeUsdc';
import BridgeUsdcProgressModal from 'src/components/BridgeUsdc/process';
import SignToViewModal from 'src/components/DexAccount/signToViewModal';
import AppCreateEarnOrderModal from 'src/components/Earn/modals/appCreate';
import EarnClaimModal from 'src/components/Earn/modals/claimModal';
import EarnMoreInfo from 'src/components/Earn/modals/moreInfo';
import EarnOrderProgressModal from 'src/components/Earn/modals/progress';
import InsufficientGasPayTokenBalanceTips from 'src/components/EstNetworkFee/insufficientBalanceTip';
import InsufficientGasPayTokenBalanceTipsForSwap from 'src/components/EstNetworkFee/insufficientBalanceTipForSwap';
import ExcessiveBalanceTips from 'src/components/ExcessiveBalanceTips/modal';
import Explanations from 'src/components/Explanations';
import ManageTokens from 'src/components/ManageTokens';
import ManageTokensRemoveConfirmModal from 'src/components/ManageTokens/removeConfirmModal';
import PrivateClientDeskHideEntryConfirmModal from 'src/components/PrivateClientDesk/hideEntryConfirmModal';
import PrivateClientDeskModal from 'src/components/PrivateClientDesk/modal';
import SendModal from 'src/components/Send';
import SendOrderProgressModal from 'src/components/SendProgress';
import SendV2 from 'src/components/SendV2';
import ShareModal from 'src/components/share/modal';
import SwapDataWarningModal from 'src/components/SwapDataWarning/warningModal';
import SwapPairInfoModal from 'src/components/SwapPair/infoModal';
import SwapPoolInfoModal from 'src/components/SwapPair/PoolInfoModal';
import SwapSettingsModal from 'src/components/SwapSettings';
import SwapSlippageModal from 'src/components/SwapSettings/slippage/modal';
import IntentErrorTips from 'src/components/TipsModal/IntentErrorTips';
import SignToViewTimeError from 'src/components/TipsModal/signToViewTimeErrorTips';
import SwapMinTips from 'src/components/TipsModal/SwapTipsMin';
import SyncDAsTips from 'src/components/TipsModal/SyncDAsTips';
import ThirdPartySite from 'src/components/TipsModal/thirdPartySite';
import UserInterview from 'src/components/TipsModal/userInterview';
import WrapUnwrapSite from 'src/components/TipsModal/wrapUnwrapSite';
import XStocksTips from 'src/components/TipsModal/XStocksTips';
import TurboRangeModals from 'src/components/TurboRange/modals';
import ConnectWalletModal from 'src/components/UEDDevTools/ConnectWalletModal';
import UsdcSuppliedChartModal from 'src/components/UsdcSupplied/chartModal';
import WalletModals from 'src/wallet/modals';

import ReceiveDetailModal from 'js/components/DetailModal/receiveDetailModal';
import DexAccountModal from 'js/components/DexAccount';
import ExportData from 'js/components/ExportData';
import SwitchNetworkModal from 'js/components/SwitchNetwork';
import TermsModal from 'js/components/terms/modal';
import AccountChangeTips from 'js/components/TipsModal/AccountChangeTips';
import BlacklistTips from 'js/components/TipsModal/BlacklistTips';
import TipsCommon from 'js/components/TipsModal/common';
import InsufficientBalance from 'js/components/TipsModal/insufficientBalance';
import InsufficientFee from 'js/components/TipsModal/insufficientFee';
import LocalTimeTips from 'js/components/TipsModal/LocalTimeTips';
import RegionTips from 'js/components/TipsModal/RegionTips';
import TipsWalletSign from 'js/components/TipsModal/walletSignTips';
import { useModals } from 'js/state/application/hooks';
import { ModalKeys } from 'js/state/application/reducer';

import BottomModals from './bottomModals';
export default function CommonModals() {
  const modals = useModals();
  return (
    <>
      <WalletModals />
      <ConnectWalletModal />
      <DexAccountModal />
      <TurboRangeModals />

      {modals[ModalKeys.err_insufficientFee]?.visible && <InsufficientFee />}
      {modals[ModalKeys.err_insufficientBalance]?.visible && (
        <InsufficientBalance />
      )}
      {modals[ModalKeys.tips_common]?.visible && <TipsCommon />}
      {modals[ModalKeys.switchNetwork]?.visible && <SwitchNetworkModal />}
      {modals[ModalKeys.exportData]?.visible && <ExportData />}

      {modals[ModalKeys.receiveDetail]?.visible && <ReceiveDetailModal />}
      {modals[ModalKeys.terms_of_service]?.visible && <TermsModal />}
      {modals[ModalKeys.tips_region]?.visible && <RegionTips />}
      {modals[ModalKeys.tips_blacklist]?.visible && <BlacklistTips />}
      {modals[ModalKeys.tips_accountChange]?.visible && <AccountChangeTips />}
      {modals[ModalKeys.swapPairCode]?.visible && <SwapPairInfoModal />}
      {modals[ModalKeys.tips_walletSign]?.visible && <TipsWalletSign />}
      {modals[ModalKeys.tips_localTime]?.visible && <LocalTimeTips />}
      {modals[ModalKeys.tips_wrap_wnwrap]?.visible && <WrapUnwrapSite />}
      {modals[ModalKeys.tips_thirdPartySite]?.visible && <ThirdPartySite />}
      {modals[ModalKeys.tips_excessiveBalance]?.visible && (
        <ExcessiveBalanceTips />
      )}

      {modals[ModalKeys.signToView]?.visible && <SignToViewModal />}
      {modals[ModalKeys.tips_signToViewTimeError]?.visible && (
        <SignToViewTimeError />
      )}
      {modals[ModalKeys.explanations]?.visible && <Explanations />}
      {modals[ModalKeys.privateClientDesk]?.visible && (
        <PrivateClientDeskModal />
      )}
      {modals[ModalKeys.privateClientDeskHideEntryConfirm]?.visible && (
        <PrivateClientDeskHideEntryConfirmModal />
      )}
      {modals[ModalKeys.tips_userInterview]?.visible && <UserInterview />}
      {modals[ModalKeys.share]?.visible && <ShareModal />}
      {modals[ModalKeys.earnMoreInfo]?.visible && <EarnMoreInfo />}
      {modals[ModalKeys.earnOrderProgress]?.visible && (
        <EarnOrderProgressModal />
      )}

      {modals[ModalKeys.APP_CREATE_EARN_ORDER]?.visible && (
        <AppCreateEarnOrderModal />
      )}
      {modals[ModalKeys.swapDataWarning]?.visible && <SwapDataWarningModal />}
      {modals[ModalKeys.fungibleUsdcModal]?.visible && <FungibleUsdcModal />}
      {modals[ModalKeys.assetModal]?.visible && <AssetModal />}
      {modals[ModalKeys.manageTokens]?.visible && <ManageTokens />}
      {modals[ModalKeys.manageTokensRemoveConfirm]?.visible && (
        <ManageTokensRemoveConfirmModal />
      )}
      {modals[ModalKeys.swapQuoteTokenBalance]?.visible && (
        <SwapQuoteTokenBalance />
      )}
      {modals[ModalKeys.swapSettings]?.visible && <SwapSettingsModal />}
      {modals[ModalKeys.sendOrderProgress]?.visible && (
        <SendOrderProgressModal />
      )}
      {modals[ModalKeys.tips_swap_slippage]?.visible && <SwapSlippageModal />}
      {modals[ModalKeys.tips_SwapMinTips]?.visible && <SwapMinTips />}
      {modals[ModalKeys.swapPoolInfo]?.visible && <SwapPoolInfoModal />}
      {modals[ModalKeys.kol_claim_history]?.visible && <ClaimHistoryModal />}
      {modals[ModalKeys.kol_claim]?.visible && <ClaimModal />}
      {modals[ModalKeys.kol_claim_success]?.visible && <ClaimSuccessModal />}
      {modals[ModalKeys.EARN_CLAIM_MODAL]?.visible && <EarnClaimModal />}
      {modals[ModalKeys.sync_da_tips]?.visible && <SyncDAsTips />}
      {modals[ModalKeys.usdc_supplied_chart_modal]?.visible && (
        <UsdcSuppliedChartModal />
      )}
      {modals[ModalKeys.tips_xstocks]?.visible && <XStocksTips />}
      {modals[ModalKeys.tokenSitesModal]?.visible && <TokenSitesModal />}
      {modals[ModalKeys.send]?.visible && <SendModal />}
      {modals[ModalKeys.sendV2]?.visible && <SendV2 />}
      {modals[ModalKeys.insufficientGasPayTokenBalanceTips]?.visible && (
        <InsufficientGasPayTokenBalanceTips />
      )}
      {modals[ModalKeys.insufficientGasPayTokenBalanceTipsForSwap]?.visible && (
        <InsufficientGasPayTokenBalanceTipsForSwap />
      )}
      {modals[ModalKeys.bridgeUsdcProgress]?.visible && (
        <BridgeUsdcProgressModal />
      )}
      {modals[ModalKeys.tips_intent_error]?.visible && <IntentErrorTips />}

      {modals[ModalKeys.bridgeUsdc]?.visible && <BridgeUsdcModal />}
      {modals[ModalKeys.tips_intent_error]?.visible && <IntentErrorTips />}
      <BottomModals />
    </>
  );
}
